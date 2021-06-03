import * as THREE from 'three'
import { PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 200, 200);

const floodLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, floodLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls( camera, renderer.domElement );
// const controls = new FirstPersonControls( camera, renderer.domElement );
// controls.movementSpeed = 150;
// controls.lookSpeed = 0.1;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.24, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const pointLightStar = new THREE.PointLight(0xffffff);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  pointLightStar.position.set(x, y, z);
  scene.add(star);

}
Array(20).fill().forEach(addStar);

function animate(){
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  // torus.rotation.z += 0.01;
  controls.update( );
  renderer.render( scene, camera );
}
 
animate();
