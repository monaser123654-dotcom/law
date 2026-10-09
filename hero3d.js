(function(){
const cv=document.getElementById('c3d');if(!cv||!window.THREE)return;
const T=THREE,red=matchMedia('(prefers-reduced-motion: reduce)').matches;
let r;try{r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){return}
r.setPixelRatio(Math.min(devicePixelRatio,2));
const s=new T.Scene(),cam=new T.PerspectiveCamera(42,1,.1,100);cam.position.set(0,1.4,12);
s.add(new T.AmbientLight(0x8fa3c8,.8));const dl=new T.DirectionalLight(0xffe6bd,1.2);dl.position.set(4,7,6);s.add(dl);
const g=new T.Group();s.add(g);
const mat=new T.MeshStandardMaterial({color:0x17305a,metalness:.55,roughness:.4}),line=new T.LineBasicMaterial({color:0xb79b69});
const N=13;
for(let i=0;i<N;i++){const a=(i/(N-1)-.5)*Math.PI*1.25,h=2.6+Math.abs(Math.sin(i*1.9))*1.6;
 const geo=new T.BoxGeometry(.8,h,.8),m=new T.Mesh(geo,mat);m.position.set(Math.sin(a)*7.2,h/2-2.2,-Math.cos(a)*7.2+3);m.rotation.y=-a;
 m.add(new T.LineSegments(new T.EdgesGeometry(geo),line));g.add(m)}
const ring=new T.Mesh(new T.TorusGeometry(7.2,.02,8,200),new T.MeshBasicMaterial({color:0xb79b69}));ring.rotation.x=Math.PI/2;ring.position.set(0,-2.2,3);g.add(ring);
const fl=[];for(let i=0;i<14;i++){const o=new T.Mesh(new T.OctahedronGeometry(.12+Math.random()*.12),new T.MeshStandardMaterial({color:0xb79b69,metalness:.8,roughness:.25}));
 o.position.set((Math.random()-.5)*12,(Math.random()-.2)*5,(Math.random()-.5)*6);o.userData.p=Math.random()*6;g.add(o);fl.push(o)}
let mx=0,my=0,vis=true;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
function size(){const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.position.z=w<700?16:12;cam.updateProjectionMatrix()}
addEventListener('resize',size);size();
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
function frame(t){requestAnimationFrame(frame);if(!vis||document.hidden)return;t*=.001;
 g.rotation.y+=((mx*.5+Math.sin(t*.15)*.12)-g.rotation.y)*.04;g.rotation.x+=((my*.15)-g.rotation.x)*.04;
 fl.forEach(o=>{o.rotation.x+=.01;o.rotation.y+=.012;o.position.y+=Math.sin(t+o.userData.p)*.002});r.render(s,cam)}
if(red)r.render(s,cam);else requestAnimationFrame(frame);
})();
