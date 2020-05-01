import React from 'react';
import './styles.css';

import * as THREE from 'three';
import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// IMPORTE DAS IMAGENS
import cubo from '../../assets/cubo.jpg';

// script THREE
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 
   50, // Foco
   window.innerWidth / window.innerHeight, // Proporção da imagem da câmera
   1, 
   10000 // Tamanho do mapa
)
camera.position.set( 
   2000, //fundo (-) arco pro lado direito (+)
   2000, // fundo (-) arco pra cima (+) 
   2000, // Frente (-) e Costa (+)
)
camera.position.z = 5;

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

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1000;
controls.maxDistance = 5000;
controls.target.set( 0, 0, - 0.2 );
controls.update();

// // Cria a imagem do objeto, coloca a cor e a textura na imagem
const geometry = new THREE.BoxGeometry( 10, 250, 250 )
const cubeMaterials = [
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(cubo), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(cubo), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } )
]
const material = new THREE.MeshFaceMaterial( cubeMaterials )
const objeto = new THREE.Mesh( geometry, material )
objeto.position.set(-450, 300, -450)
scene.add( objeto )

const iluminacao = new THREE.AmbientLight( 0xffffff, 0.9)
scene.add( iluminacao )

const loader = new GLTFLoader()
const fileCity = 'models/gltf/city/Scene/scene.gltf'
loader.load(
   fileCity,
   function ( gltf  ) {
      scene.add( gltf.scene )
   }
)

const update = () => {
   objeto.rotation.x += 0.01;
   objeto.rotation.y += 0.01;
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

export default function City() {
  return (
    <body />
  );
}
