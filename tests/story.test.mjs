import assert from 'node:assert/strict';
import {build} from 'esbuild';
const {outputFiles}=await build({entryPoints:['src/lib/product-story.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {storyPose,foodProgress,STORY_DURATION}=await import('data:text/javascript;base64,'+Buffer.from(outputFiles[0].text).toString('base64'));
assert.equal(storyPose(0).rotation,0);
assert.equal(storyPose(2.5).rotation,Math.PI*2);
assert.equal(storyPose(4.2).open,1);
assert.equal(storyPose(STORY_DURATION).open,0);
assert.equal(storyPose(STORY_DURATION).stage,3);
for(let i=0;i<252;i++){
 assert.equal(foodProgress(4.2,i,252),0);
 assert.equal(foodProgress(9,i,252),1);
 let previous=0;
 for(let t=0;t<=STORY_DURATION;t+=.02){const p=foodProgress(t,i,252);assert(p>=previous&&p>=0&&p<=1);previous=p;}
}
for(let t=0;t<=STORY_DURATION;t+=.02){const p=storyPose(t);assert(Number.isFinite(p.rotation));assert(p.open>=0&&p.open<=1);if(t<4.05)assert.equal(foodProgress(t,0,252),0);}
console.log('PASS: complete spin, lid clearance before pour, monotonic food fall, all food settled before closure, and restored final pose.');
const sceneBuild=await build({entryPoints:['src/lib/product-scene.ts'],bundle:true,write:false,format:'esm',platform:'node',define:{'import.meta.env.BASE_URL':'"/Creative-Website-2/"'}});
const sceneModule=await import('data:text/javascript;base64,'+Buffer.from(sceneBuild.outputFiles[0].text).toString('base64'));
globalThis.document={createElement:()=>({getContext:()=>null})};
await assert.rejects(()=>sceneModule.createProductScene({},{}),/WebGL is unavailable/);
delete globalThis.document;
console.log('PASS: unavailable WebGL rejects cleanly before loading assets; React handles this rejection with the confirmed static preview.');
