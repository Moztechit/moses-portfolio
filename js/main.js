import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/postprocessing/UnrealBloomPass.js";

const page=document.body.getAttribute("data-page");
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z=6;

/* LIGHT */
const light=new THREE.PointLight(0x00f5d4,2);
light.position.set(2,3,4);
scene.add(light);

/* EFFECT COMPOSER */
const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloomPass=new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),1.5,0.4,0.85);
composer.addPass(bloomPass);

/* PARTICLES */
let particleCount=2000;
if(window.innerWidth<768) particleCount=800;
const geo=new THREE.BufferGeometry();
const pos=new Float32Array(particleCount*3);
for(let i=0;i<particleCount*3;i++){pos[i]=(Math.random()-0.5)*20;}
geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({size:0.02,color:0x00f5d4});
const particles=new THREE.Points(geo,mat);

/* PAGE SPECIFIC OBJECTS */
let object;
if(page==="index"){
  object=new THREE.Mesh(new THREE.TorusKnotGeometry(1.5,0.4,150,32),new THREE.MeshStandardMaterial({color:0x00f5d4,metalness:.9,roughness:.1}));
  scene.add(particles);
  scene.add(object);
}
if(page==="about"){
  object=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshStandardMaterial({color:0x00f5d4,wireframe:true}));
  scene.add(object);
}
if(page==="portfolio"){
  object=new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32),new THREE.MeshStandardMaterial({color:0x00f5d4,wireframe:true}));
  scene.add(particles);
  scene.add(object);
}
if(page==="contact"){
  object=new THREE.Mesh(new THREE.IcosahedronGeometry(1.5,1),new THREE.MeshStandardMaterial({color:0x00f5d4,wireframe:true}));
  scene.add(particles);
  scene.add(object);
}

/* MOUSE */
document.addEventListener("mousemove",(e)=>{
  object.rotation.y+=(e.clientX/window.innerWidth-0.5)*0.02;
});

/* ANIMATE */
function animate(){
  requestAnimationFrame(animate);
  if(particles) particles.rotation.y+=0.0005;
  if(object) object.rotation.z+=0.003;
  composer.render();
}
animate();

/* RESIZE */
window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
});
