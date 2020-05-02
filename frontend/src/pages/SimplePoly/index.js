import React from 'react'
import './styles.css'

import * as THREE from 'three'
import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls.js'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

// SCENE
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0x000000 )
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
// scene.fog = new THREE.Fog( scene.background, 10000, 15000 ); // SOMBRA

// CAMERA
const camera = new THREE.PerspectiveCamera( 
   50, // Foco
   window.innerWidth / window.innerHeight, // Proporção da imagem da câmera
   1, 
   30000 // Tamanho do mapa
)
camera.position.set( 
   0, //fundo (-) arco pro lado direito (+)
   3000, // fundo (-) arco pra cima (+) 
   6000, // Frente (-) e Costa (+)
)

// LIGHT
var ambientLight = new THREE.AmbientLight( 0x666666, 0.5 )
scene.add( ambientLight );

var hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
hemisphereLight.color.setHSL( 0.6, 1, 0.6 );
hemisphereLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemisphereLight.position.set( 0, 3000, 0 );
scene.add( hemisphereLight );

var hemisphereLightHelper = new THREE.HemisphereLightHelper( hemisphereLight, 100 );
scene.add( hemisphereLightHelper );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.color.setHSL( 0.1, 1, 0.95 );
directionalLight.position.set(- 1, 1.75, 1)
directionalLight.position.multiplyScalar( 1000 );
scene.add( directionalLight );

// dirLight.castShadow = true;
// dirLight.shadow.mapSize.width = 2048;
// dirLight.shadow.mapSize.height = 2048;

// var d = 50;

// dirLight.shadow.camera.left = - d;
// dirLight.shadow.camera.right = d;
// dirLight.shadow.camera.top = d;
// dirLight.shadow.camera.bottom = - d;

// dirLight.shadow.camera.far = 3500;
// dirLight.shadow.bias = - 0.0001;

var directionalLightHeper = new THREE.DirectionalLightHelper( directionalLight, 100 );
scene.add( directionalLightHeper );

// GROUND
var groundTexture = new THREE.ImageUtils.loadTexture( 'models/mtl/Textures/Natures/Floor.png' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 25, 25 )
// groundTexture.anisotropy = 160
groundTexture.encoding = THREE.sRGBEncoding

var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
ground.position.y =  - 5;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );



// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.shadowMap.enabled = true;


// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 1000;
controls.maxDistance = 20000;
controls.update();

// DIVERSOS
// window.addEventListener('resize', onWindowResize, false)

// FUNCTIONS
function Building (build, x, y, z) {
   const path = 'models/mtl/Models/Buildings/'
   const mtlLoader = new MTLLoader().setPath( path )
   const objLoader = new OBJLoader().setPath( path )
   const texture = new THREE.TextureLoader().load( 'models/mtl/Textures/Buildings/'+build+'.png' )
   const material = new THREE.MeshPhongMaterial({ map: texture })

   mtlLoader.load(build +'.mtl', ( materials ) => {
      materials.preload()
      objLoader.setMaterials( materials )
      objLoader.load(build +'.obj', ( object ) => {
         object.traverse(( node ) => node.isMesh ? node.material = material : '')
         object.position.set(x, y, z)
         scene.add( object )
      })
   })
}

function Road (build, x, y, z) {
   const path = 'models/mtl/Models/Road/'
   const mtlLoader = new MTLLoader().setPath( path )
   const objLoader = new OBJLoader().setPath( path )
   const texture = new THREE.TextureLoader().load( 'models/mtl/Textures/Road/Road.png' )
   const material = new THREE.MeshPhongMaterial({ map: texture })

   mtlLoader.load(build +'.mtl', ( materials ) => {
      materials.preload()
      objLoader.setMaterials( materials )
      objLoader.load(build +'.obj', ( object ) => {
         object.traverse(( node ) => node.isMesh ? node.material = material : '')
         object.position.set(x, y, z)
         object.rotation.y = 1.57 // virar 90° 1.57
         scene.add( object )
      })
   })
}

function moveHorizontalBuild (posicaoRua, addInicio = 0, addEspaco = 0) {
   const inicioRua = - 9000 + addInicio
   const espacoEntrePredios = 700 + addEspaco
   return inicioRua + ( espacoEntrePredios * posicaoRua )
}

function moveVerticalBuild (nrquadra, addInicio = 0, addEspaco = 0) {
   const inicioQuadra = - 9000 + addInicio
   const espacoEntreQuadras = 700 + addEspaco
   return inicioQuadra + ( espacoEntreQuadras * nrquadra )
}

function moveHorizontalRua (posicao, addInicio = 0, addEspaco = 0) {
   const inicioRua = - 9000 + addInicio
   const espacoEntrePredios = 700 + addEspaco
   return inicioRua + ( espacoEntrePredios * posicao )
}

function moveVerticalRua (nrquadra, addInicio = 0, addEspaco = 0) {
   const inicioQuadra = - 9000 + addInicio
   const espacoEntreQuadras = 700 + addEspaco
   return inicioQuadra + ( espacoEntreQuadras * nrquadra )
}

// EXEMPLO EDIFICIOS = ( Lateral(Numero), Altura, Profundidade(Quadra) )
let nrBuild = 1
let nrRoad = 1
Building( 'Building_Auto Service', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Bakery', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Bar', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Books Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Chicken Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Clothing', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Coffee Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Drug Store', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Factory', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Fast Food', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Fruits  Shop', moveHorizontalBuild(nrBuild++, -550), 0, moveVerticalBuild(nrRoad, 600) )
Building( 'Building_Gas Station', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Gift Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Music Store', moveHorizontalBuild(nrBuild++), 155, moveVerticalBuild(nrRoad) )
Building( 'Building_Pizza', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Restaurant', moveHorizontalBuild(nrBuild++), 215, moveVerticalBuild(nrRoad) )
Building( 'Building_Shoes Shop', moveHorizontalBuild(nrBuild++), 215, moveVerticalBuild(nrRoad) )
Building( 'Building_Super Market', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )

// EXEMPLOS RUAS
nrBuild = 1
nrRoad = 2
Road( 'Road Concrete Tile Small', moveHorizontalRua(nrBuild++, -800), 0, moveVerticalRua(nrRoad) )
Road( 'Road Concrete Tile', moveHorizontalRua(nrBuild++, -500), 0, moveVerticalRua(nrRoad) )
Road( 'Road Corner_01', moveHorizontalRua(nrBuild++, -300), 0, moveVerticalRua(nrRoad) )
Road( 'Road Corner_02', moveHorizontalRua(nrBuild++, 100), 0, moveVerticalRua(nrRoad) )
Road( 'Road Intersection_01', moveHorizontalRua(nrBuild++, 400), 0, moveVerticalRua(nrRoad) )
Road( 'Road Intersection_02', moveHorizontalRua(nrBuild++, 700), 0, moveVerticalRua(nrRoad) )
Road( 'Road Lane Bus Stop', moveHorizontalRua(nrBuild++, 1000), 0, moveVerticalRua(nrRoad) )
Road( 'Road Lane Half', moveHorizontalRua(nrBuild++, 1300), 0, moveVerticalRua(nrRoad) )
Road( 'Road Lane_01', moveHorizontalRua(nrBuild++, 1600), 0, moveVerticalRua(nrRoad) )
Road( 'Road Lane_02', moveHorizontalRua(nrBuild++, 1900), 0, moveVerticalRua(nrRoad) )
Road( 'Road Lane_03', moveHorizontalRua(nrBuild++, 2200), 0, moveVerticalRua(nrRoad) )
Road( 'Road Lane_04', moveHorizontalRua(nrBuild++, 2500), 0, moveVerticalRua(nrRoad) )
Road( 'Road Split Line', moveHorizontalRua(nrBuild++, 2800), 0, moveVerticalRua(nrRoad) )
Road( 'Road T_Intersection_01', moveHorizontalRua(nrBuild++, 3100), 0, moveVerticalRua(nrRoad) )
Road( 'Road T_Intersection_02', moveHorizontalRua(nrBuild++, 3400), 0, moveVerticalRua(nrRoad) )
Road( 'Road Tile Small', moveHorizontalRua(nrBuild++, 3800), 0, moveVerticalRua(nrRoad) )
Road( 'Road Tile', moveHorizontalRua(nrBuild++, 4600), 0, moveVerticalRua(nrRoad) )

// QUADRA 1 - EDIFICIOS
nrBuild = 5
nrRoad = 13
Building( 'Building_Auto Service', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Bakery', moveHorizontalBuild(nrBuild++, 100), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Bar', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Chicken Shop', moveHorizontalBuild(nrBuild++, -100), 0, moveVerticalBuild(nrRoad, 100) )
Building( 'Building_Coffee Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad, -100) )
Building( 'Building_Drug Store', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad) )
Building( 'Building_Fast Food', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad, -100) )
Building( 'Building_Gift Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad, -100) )
Building( 'Building_Music Store', moveHorizontalBuild(nrBuild++), 155, moveVerticalBuild(nrRoad, -100) )
Building( 'Building_Pizza', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad, -80) )
Building( 'Building_Restaurant', moveHorizontalBuild(nrBuild++), 215, moveVerticalBuild(nrRoad, -100) )
Building( 'Building_Super Market', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad, -150) )

// QUADRA 1 - RUAS
nrBuild = 4
nrRoad = 14
for (let i = nrBuild++; i < 16; i++) {
   Road( 'Road Lane_01', moveHorizontalRua(i, 0, 88), 0, moveVerticalRua(nrRoad, 0) )
}








const update = () => {
   // scene.rotation.x += 0.01; // Giro Lateral
   // scene.rotation.y += 0.01; // Giro Horizontal
   // scene.rotation.z += 0.01; // Giro Vertical
}

function onWindowResize () {
   renderer.setSize( window.innerWidth, window.innerHeight )
   camera.updateProjectionMatrix()
   camera.aspect = window.innerWidth / window.innerHeight
}

const render = () => {
   renderer.render( scene, camera )
}

const animate = () => {
   requestAnimationFrame( animate )

   update()
   render()
}
animate()

export default function SimplePoly() {
  return (
    <body />
  );
}
