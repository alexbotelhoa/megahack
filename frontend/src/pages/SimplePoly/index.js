import React from 'react'
import './styles.css'

import * as THREE from 'three'
import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls.js'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

// SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x000000 )

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
const light = new THREE.DirectionalLight( 0xffffff, 1.0)
light.position.set(0, 3000, 6000)
scene.add( light )

// var light = new THREE.DirectionalLight( 0xaabbff, 1.0 );
// light.position.x = 3000;
// light.position.y = 2500;
// light.position.z = 5000;
// scene.add( light );

// scene.add( new THREE.AmbientLight( 0x666666 ) );

// var light = new THREE.DirectionalLight( 0xdfebff, 1 );
// light.position.set( 50, 200, 100 );
// light.position.multiplyScalar( 1.3 );

// light.castShadow = true;

// light.shadow.mapSize.width = 1024;
// light.shadow.mapSize.height = 1024;

// var d = 300;

// light.shadow.camera.left = - d;
// light.shadow.camera.right = d;
// light.shadow.camera.top = d;
// light.shadow.camera.bottom = - d;

// light.shadow.camera.far = 1000;

// scene.add( light );
            



// GROUND
var groundTexture = new THREE.ImageUtils.loadTexture( 'models/mtl/Textures/Natures/grasslight-big.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 25, 25 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
ground.position.y = - 250;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );



// RENDERER
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

window.addEventListener('resize', function() {
   const width = window.innerWidth
   const height = window.innerHeight
   renderer.setSize( width, height )
   camera.aspect = width / height
   camera.updateProjectionMatrix()
})

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1000;
controls.maxDistance = 20000;
controls.target.set( 0, 0, 0 );
controls.update();

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
         object.position.set(x, y + 6, z)
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
         object.position.set(x, y + 6, z)
         object.rotation.y = 1.55
         scene.add( object )
      })
   })
}

function moveHorizontalRua (posicao, adicional = 0) {
   const espacoEntrePredios = 700
   const inicioRua = - 7000 + adicional
   return inicioRua + ( espacoEntrePredios * posicao )
}

function moveVerticalQuadra (quadra, adicional = 0) {
   const espacoEntreQuadras = 700
   const inicioQuadra = - 7000 + adicional
   return inicioQuadra + ( espacoEntreQuadras * quadra )
}

// EXEMPLO EDIFICIOS = ( Lateral(Numero), Altura, Profundidade(Quadra) )
let nrQuadra = 1
Building( 'Building_Auto Service', moveHorizontalRua(1), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Bakery', moveHorizontalRua(2), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Bar', moveHorizontalRua(3), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Books Shop', moveHorizontalRua(4), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Chicken Shop', moveHorizontalRua(5), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Clothing', moveHorizontalRua(6), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Coffee Shop', moveHorizontalRua(7), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Drug Store', moveHorizontalRua(8), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Factory', moveHorizontalRua(9), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Fast Food', moveHorizontalRua(10), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Fruits  Shop', moveHorizontalRua(11, -550), 0, moveVerticalQuadra(nrQuadra, 600) )
Building( 'Building_Gas Station', moveHorizontalRua(12), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Gift Shop', moveHorizontalRua(13), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Music Store', moveHorizontalRua(14), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Pizza', moveHorizontalRua(15), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Restaurant', moveHorizontalRua(16), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Shoes Shop', moveHorizontalRua(17), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Super Market', moveHorizontalRua(18), 0, moveVerticalQuadra(nrQuadra) )

// EXEMPLOS RUAS
nrQuadra = 2
Road( 'Road Concrete Tile Small', moveHorizontalRua(1, -800), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Concrete Tile', moveHorizontalRua(2, -500), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Corner_01', moveHorizontalRua(3, -300), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Corner_02', moveHorizontalRua(4, 100), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Intersection_01', moveHorizontalRua(5, 400), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Intersection_02', moveHorizontalRua(6, 700), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Lane Bus Stop', moveHorizontalRua(7, 1000), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Lane Half', moveHorizontalRua(8, 1300), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Lane_01', moveHorizontalRua(9, 1600), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Lane_02', moveHorizontalRua(10, 1900), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Lane_03', moveHorizontalRua(11, 2200), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Lane_04', moveHorizontalRua(12, 2500), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Split Line', moveHorizontalRua(13, 2800), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road T_Intersection_01', moveHorizontalRua(13, 3100), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road T_Intersection_02', moveHorizontalRua(13, 3400), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Tile Small', moveHorizontalRua(13, 3800), 0, moveVerticalQuadra(nrQuadra) )
Road( 'Road Tile', moveHorizontalRua(13, 4600), 0, moveVerticalQuadra(nrQuadra) )

// QUADRA 1 - EDIFICIOS
nrQuadra = 10
Building( 'Building_Auto Service', moveHorizontalRua(5), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Bakery', moveHorizontalRua(6, 100), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Bar', moveHorizontalRua(7), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Chicken Shop', moveHorizontalRua(8, -100), 0, moveVerticalQuadra(nrQuadra, 100) )
Building( 'Building_Coffee Shop', moveHorizontalRua(9), 0, moveVerticalQuadra(nrQuadra, -100) )
Building( 'Building_Drug Store', moveHorizontalRua(10), 0, moveVerticalQuadra(nrQuadra) )
Building( 'Building_Fast Food', moveHorizontalRua(11), 0, moveVerticalQuadra(nrQuadra, -100) )
Building( 'Building_Gift Shop', moveHorizontalRua(12), 0, moveVerticalQuadra(nrQuadra, -100) )
Building( 'Building_Music Store', moveHorizontalRua(13), 0, moveVerticalQuadra(nrQuadra, -100) )
Building( 'Building_Pizza', moveHorizontalRua(14), 0, moveVerticalQuadra(nrQuadra, -80) )
Building( 'Building_Restaurant', moveHorizontalRua(15), 0, moveVerticalQuadra(nrQuadra, -100) )
Building( 'Building_Super Market', moveHorizontalRua(16), 0, moveVerticalQuadra(nrQuadra, -150) )

// QUADRA 1 - RUAS
nrQuadra = 11
Road( 'Road Lane_01', moveHorizontalRua(7), 0, moveVerticalQuadra(nrQuadra, 0) )
Road( 'Road Lane_01', moveHorizontalRua(8), 0, moveVerticalQuadra(nrQuadra, 0) )
Road( 'Road Lane_01', moveHorizontalRua(9), 0, moveVerticalQuadra(nrQuadra, 0) )
Road( 'Road Lane_01', moveHorizontalRua(10), 0, moveVerticalQuadra(nrQuadra, 0) )
Road( 'Road Lane_01', moveHorizontalRua(11), 0, moveVerticalQuadra(nrQuadra, 0) )
Road( 'Road Lane_01', moveHorizontalRua(12), 0, moveVerticalQuadra(nrQuadra, 0) )
Road( 'Road Lane_01', moveHorizontalRua(13), 0, moveVerticalQuadra(nrQuadra, 0) )







const update = () => {
   // scene.rotation.x += 0.01; // Giro Lateral
   // scene.rotation.y += 0.01; // Giro Horizontal
   // scene.rotation.z += 0.01; // Giro Vertical
}

const render = () => {
   renderer.render( scene, camera )
}

const GameLoop = () => {
   requestAnimationFrame( GameLoop )

   update()
   render()
}
GameLoop()

export default function SimplePoly() {
  return (
    <body />
  );
}
