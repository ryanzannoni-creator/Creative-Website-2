import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { STORY_DURATION, foodProgress, smooth, storyPose } from './product-story';

export type ProductController = {
  play: () => void; pause: () => void; seek: (time: number) => void;
  open: () => void; reset: () => void; zoom: (factor: number) => void;
  dispose: () => void;
};
export type StoryUpdate = {time: number; playing: boolean; stage: number; open: boolean};
type Options = {reduced: boolean; signal: AbortSignal; update: (s: StoryUpdate) => void; fail: () => void};
type Manifest = {schemaVersion:string; camera:{position:number[];target:number[];fov:number};dimensions:{units:string};integrity:{checksum:string};};

export async function createProductScene(host: HTMLElement, options: Options): Promise<ProductController> {
  const probe = document.createElement('canvas');
  const context = probe.getContext('webgl2', {alpha:true,antialias:true,preserveDrawingBuffer:true});
  if (!context) throw new Error('WebGL is unavailable.');
  const renderer = new T.WebGLRenderer({canvas:probe,context,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000,0);
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  const scene=new T.Scene(), product=new T.Group(); scene.add(product);
  let frame=0,disposed=false, env:T.WebGLRenderTarget|undefined;
  const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>();
  const release=()=>{
    scene.traverse(o=>{if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);Object.values(m).forEach(v=>{if(v instanceof T.Texture)textures.add(v);});}}});
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());env?.dispose();renderer.dispose();probe.remove();
  };
  try {
    const base=`${import.meta.env.BASE_URL}models/freshcheck/`;
    const [manifestResponse,modelResponse]=await Promise.all([fetch(`${base}model-manifest.json`,{signal:options.signal}),fetch(`${base}model.glb`,{signal:options.signal})]);
    if(!manifestResponse.ok||!modelResponse.ok)throw Error('The product files could not be loaded.');
    const manifest=await manifestResponse.json() as Manifest, bytes=await modelResponse.arrayBuffer();
    if(manifest.schemaVersion!=='1.0.0'||manifest.dimensions.units!=='meters')throw Error('Unsupported confirmed model.');
    const checksum=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(n=>n.toString(16).padStart(2,'0')).join('');
    if(checksum!==manifest.integrity.checksum)throw Error('The confirmed model checksum does not match.');
    const gltf=await new GLTFLoader().parseAsync(bytes,'');
    product.add(gltf.scene);
    if(options.signal.aborted)throw new DOMException('Aborted','AbortError');
    const bounds=new T.Box3().setFromObject(gltf.scene),center=bounds.getCenter(new T.Vector3());
    gltf.scene.position.sub(center);
    const find=(text:string)=>{let found:T.Object3D|undefined;gltf.scene.traverse(o=>{if(o.name.replace(/_/g,' ').toLowerCase()===text)found=o;});if(!found)throw Error(`Confirmed component missing: ${text}`);return found;};
    const lidParts=['silicone seal','rounded smart lid','display bezel','fresh check display'].map(find);
    const parent=lidParts[0].parent!;
    const assembly=new T.Group();assembly.name='Presentation lid assembly';assembly.position.set(0,10,0);parent.add(assembly);
    scene.updateMatrixWorld(true);lidParts.forEach(o=>assembly.attach(o));
    const pasta=find('farfalle pasta');
    const pieces=pasta.children.map((o,index)=>({o,position:o.position.clone(),quaternion:o.quaternion.clone(),index})).sort((a,b)=>a.position.y-b.position.y);
    if(!pieces.length)throw Error('The confirmed food geometry is missing.');
    gltf.scene.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=!Array.isArray(o.material)&&o.material.opacity>.9;o.receiveShadow=true;}});
    const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment();env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.6;room.dispose();pmrem.dispose();
    scene.add(new T.HemisphereLight('#fffaf0','#6d8773',1));
    const light=new T.DirectionalLight('#fff5df',2.1);light.position.set(-.3,.8,.5);light.castShadow=true;light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-.5,right:.5,top:.5,bottom:-.5,near:.01,far:3});light.shadow.bias=-.0003;light.shadow.normalBias=.001;light.shadow.radius=5;scene.add(light);
    const fill=new T.DirectionalLight('#d9e9dc',1.2);fill.position.set(.5,.3,-.4);scene.add(fill);
    const floor=new T.Mesh(new T.PlaneGeometry(3,3),new T.ShadowMaterial({opacity:.13}));floor.rotation.x=-Math.PI/2;floor.position.y=-center.y-.004;floor.receiveShadow=true;scene.add(floor);
    const camera=new T.PerspectiveCamera(Math.max(30,Math.min(45,manifest.camera.fov||38)),1,.005,10);
    const direction=new T.Vector3().fromArray(manifest.camera.position).sub(new T.Vector3().fromArray(manifest.camera.target)).normalize();
    // A small three-quarter offset reveals depth without changing the model.
    if(Math.abs(direction.x)<.2)direction.x=.43;direction.normalize();
    const controls=new OrbitControls(camera,probe);controls.enableDamping=!options.reduced;controls.dampingFactor=.09;controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.15;controls.maxPolarAngle=Math.PI*.8;
    const target=new T.Vector3(0,.047,0);let fitDistance=.67,dirty=true;
    const fit=()=>{dirty=true;camera.position.copy(target).addScaledVector(direction,fitDistance);controls.target.copy(target);controls.update();};
    const resize=()=>{dirty=true;const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();fitDistance=Math.max(.61,.57/Math.max(.65,camera.aspect));};
    resize();fit();const observer=new ResizeObserver(()=>{const old=fitDistance;resize();if(Math.abs(old-fitDistance)>.03)fit();});observer.observe(host);
    let visible=true;
    let time=STORY_DURATION,playing=false,opened=false,last=performance.now(),lastNotify=0,autoDelay=.75;
    const axis=new T.Vector3(0,1,0),q=new T.Quaternion();
    const apply=()=>{
      dirty=true;const pose=storyPose(time);product.rotation.y=pose.rotation;
      controls.target.set(.045*pose.open,.047+.035*pose.open,0);camera.position.copy(controls.target).addScaledVector(direction,fitDistance*(1+.28*pose.open));controls.update();
      assembly.position.set(14*pose.open,10+13*pose.open,-2*pose.open);assembly.rotation.z=-.22*pose.open;
      pieces.forEach((p,i)=>{const progress=foodProgress(time,i,pieces.length);p.o.visible=progress>0;if(progress<=0)return;
        if(progress>=1){p.o.position.copy(p.position);p.o.quaternion.copy(p.quaternion);return;}
        const fall=progress*progress;
        p.o.position.set(T.MathUtils.lerp(-5+(i%5)*.5,p.position.x,smooth(progress)),T.MathUtils.lerp(28,p.position.y,fall),T.MathUtils.lerp(-2,p.position.z,smooth(progress)));
        q.setFromAxisAngle(axis,(1-progress)*(2+(i%4))*Math.PI);p.o.quaternion.copy(p.quaternion).multiply(q);
      });
    };
    const notify=()=>options.update({time,playing,stage:storyPose(time).stage,open:opened});
    const pause=()=>{playing=false;autoDelay=0;notify();};
    const seek=(t:number)=>{pause();time=Math.max(0,Math.min(STORY_DURATION,t));opened=false;apply();notify();};
    const reset=()=>{seek(STORY_DURATION);fit();};
    const play=()=>{opened=false;autoDelay=0;if(time>=STORY_DURATION)time=0;playing=true;notify();};
    const open=()=>{opened=!opened;playing=false;autoDelay=0;time=opened?8.85:STORY_DURATION;apply();notify();};
    const start=()=>pause();const changedView=()=>{dirty=true;};controls.addEventListener('start',start);controls.addEventListener('change',changedView);
    probe.style.touchAction='pan-y';probe.setAttribute('aria-label','FreshCheck interactive 3D container. Drag to rotate; use the buttons to zoom.');probe.setAttribute('role','img');probe.tabIndex=0;
    const keyboard=(e:KeyboardEvent)=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();pause();dirty=true;const offset=camera.position.clone().sub(controls.target),sphere=new T.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')sphere.theta-=.12;if(e.key==='ArrowRight')sphere.theta+=.12;if(e.key==='ArrowUp')sphere.phi=Math.max(.15,sphere.phi-.12);if(e.key==='ArrowDown')sphere.phi=Math.min(Math.PI*.8,sphere.phi+.12);camera.position.copy(controls.target).add(new T.Vector3().setFromSpherical(sphere));controls.update();}};
    probe.addEventListener('keydown',keyboard);
    const lost=(e:Event)=>{e.preventDefault();playing=false;options.fail();};probe.addEventListener('webglcontextlost',lost);
    host.appendChild(probe);apply();notify();
    const tick=(now:number)=>{if(disposed)return;frame=requestAnimationFrame(tick);const dt=Math.min(.05,(now-last)/1000);last=now;const rect=host.getBoundingClientRect();visible=rect.bottom>0&&rect.top<innerHeight&&rect.right>0&&rect.left<innerWidth;if((!visible&&!dirty)||document.hidden)return;
      if(visible&&autoDelay>0&&!options.reduced){autoDelay-=dt;if(autoDelay<=0){time=0;play();}}
      if(visible&&playing){time=Math.min(STORY_DURATION,time+dt);apply();if(time>=STORY_DURATION){playing=false;notify();}}
      const changed=controls.update();if(changed||dirty||playing){renderer.render(scene,camera);dirty=false;}
      if(playing&&now-lastNotify>130){lastNotify=now;notify();}
    };frame=requestAnimationFrame(tick);
    return {play:options.reduced?()=>seek(STORY_DURATION):play,pause,seek,open,reset,zoom:(factor:number)=>{pause();dirty=true;const offset=camera.position.clone().sub(controls.target);offset.setLength(Math.max(.35,Math.min(1.2,offset.length()*factor)));camera.position.copy(controls.target).add(offset);controls.update();},dispose:()=>{if(disposed)return;disposed=true;cancelAnimationFrame(frame);observer.disconnect();controls.removeEventListener('start',start);controls.removeEventListener('change',changedView);controls.dispose();probe.removeEventListener('keydown',keyboard);probe.removeEventListener('webglcontextlost',lost);release();}};
  } catch(e) {release();throw e;}
}
