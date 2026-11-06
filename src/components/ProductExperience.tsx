import { useEffect, useRef, useState } from 'react';
import type { ProductController, StoryUpdate } from '../lib/product-scene';
import { STORY_DURATION, STORY_STEPS } from '../lib/product-story';

const preview=`${import.meta.env.BASE_URL}models/freshcheck/preview.png`;
export function ProductExperience({reduced}:{reduced:boolean}) {
  const host=useRef<HTMLDivElement>(null),controller=useRef<ProductController|null>(null);
  const [state,setState]=useState<'loading'|'ready'|'fallback'>('loading');
  const [staticView,setStaticView]=useState(()=>new URLSearchParams(location.search).get('view')==='static');
  const [gentle,setGentle]=useState(false);
  const [story,setStory]=useState<StoryUpdate>({time:STORY_DURATION,playing:false,stage:3,open:false});
  const motionReduced=reduced||gentle;
  useEffect(()=>{
    const abort=new AbortController();let instance:ProductController|undefined;
    if(staticView){setState('fallback');return;}
    setState('loading');
    import('../lib/product-scene').then(({createProductScene})=>createProductScene(host.current!,{
      reduced:motionReduced,signal:abort.signal,
      update:s=>{if(!abort.signal.aborted)setStory(s);},fail:()=>{if(!abort.signal.aborted)setState('fallback');},
    })).then(c=>{instance=c;if(abort.signal.aborted)c.dispose();else{controller.current=c;setState('ready');}}).catch(e=>{if(!abort.signal.aborted){console.warn('FreshCheck 3D preview unavailable:',e instanceof Error?e.message:'load failed');setState('fallback');}});
    return()=>{abort.abort();instance?.dispose();controller.current=null;};
  },[motionReduced,staticView]);
  const ready=state==='ready';
  return <div className={`product-experience ${ready?'is-ready':''}`} aria-label="Explore FreshCheck in 3D">
    <div className="product-stage-heading"><span className="micro"><i/> FRESH, IN MOTION</span><span className="micro">{state==='loading'?'LOADING 3D':ready?'INTERACTIVE PRODUCT CONCEPT':'STATIC PRODUCT PREVIEW'}</span></div>
    <div className="product-canvas-wrap">
      <div className="product-halo" aria-hidden="true"/>
      <img className="product-fallback" src={preview} alt="Confirmed FreshCheck container with off-white smart lid and pasta inside" width="1000" height="850" hidden={ready}/>
      <div ref={host} className="product-canvas" hidden={!ready} data-lenis-prevent-touch/>
      {state==='loading'&&<span className="product-loading" role="status">Preparing your fresh perspective…</span>}
      {ready&&<span className="product-drag-hint">DRAG TO EXPLORE <span aria-hidden="true">↔</span></span>}
    </div>
    {ready?<>
      <div className="product-story-steps" role="group" aria-label="Product animation chapters">
        {STORY_STEPS.map((step,i)=><button key={step.label} aria-pressed={story.stage===i} onClick={()=>controller.current?.seek(step.time)}><small>0{i+1}</small>{step.label}</button>)}
      </div>
      <div className="product-controls">
        {!motionReduced&&<button className="product-play" onClick={()=>story.playing?controller.current?.pause():controller.current?.play()}>{story.playing?'Ⅱ Pause':story.time>=STORY_DURATION?'↻ Replay sequence':'▶ Play sequence'}</button>}
        <button onClick={()=>controller.current?.open()}>{story.open?'Close lid':'Open lid'}</button>
        <div className="product-zoom"><button aria-label="Zoom in on product" onClick={()=>controller.current?.zoom(.88)}>＋</button><button aria-label="Zoom out from product" onClick={()=>controller.current?.zoom(1.14)}>−</button></div>
        <button aria-label="Reset product view" onClick={()=>controller.current?.reset()}>Reset ↺</button>
      </div>
      <div className="product-access"><span>{motionReduced?'Motion reduced. Select a chapter to see a still.':'Spin. Lift. Fill. Ready for your next meal.'}</span><button aria-pressed={motionReduced} disabled={reduced} onClick={()=>setGentle(!gentle)}>{motionReduced?'Reduced motion':'Reduce motion'}</button><button onClick={()=>setStaticView(true)}>Static preview</button></div>
    </>:<div className="product-static-note"><p>{state==='loading'?'The confirmed product preview is shown while 3D loads.':'Static preview — interactive 3D is switched off or unavailable on this device.'}</p>{state==='fallback'&&<button onClick={()=>{setStaticView(false);if(!staticView)setGentle(v=>!v);}}>Try interactive 3D</button>}</div>}
  </div>;
}
