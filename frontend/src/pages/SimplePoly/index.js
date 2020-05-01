import React from 'react'
import './styles.css'

import * as THREE from 'three'
import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls.js'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 
   50, // Foco
   window.innerWidth / window.innerHeight, // Proporção da imagem da câmera
   1, 
   1000000 // Tamanho do mapa
)
camera.position.set( 
   10000, //fundo (-) arco pro lado direito (+)
   10000, // fundo (-) arco pra cima (+) 
   10000, // Frente (-) e Costa (+)
)

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
controls.maxDistance = 500000;
controls.target.set( 0, 0, - 0.2 );
controls.update();





function Building (build, x, y, z) {
   const path = 'models/mtl/Models/Buildings/'
   const mtlLoader = new MTLLoader().setPath( path )
   const objLoader = new OBJLoader().setPath( path )
   const texture = new THREE.TextureLoader().load( 'models/mtl/Textures/'+build+'.png' )
   const material = new THREE.MeshPhongMaterial({ map: texture })

   mtlLoader.load(build +'.mtl', ( materials ) => {
      materials.preload()
      objLoader.setMaterials( materials )
      objLoader.load(build +'.obj', ( object ) => {
         object.traverse(( node ) => node.isMesh ? node.material = material : '')
         object.position.set(x, y, z)
         scene.add( object )
         // return object
      })
   })
}

// .position.set(x, y, z)
Building('Building_Bar', -1500, 0, -2550)
Building('Building_Stadium', -1500, 0, -250)
Building('Building_Auto Service', -1000, 0, 600)

var groundGeometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
				var groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4 } );
				var ground = new THREE.Mesh( groundGeometry, groundMaterial );
				ground.rotation.x = Math.PI * - 0.5;
				scene.add( ground );



const iluminacao = new THREE.AmbientLight( 0xffffff, 0.9)
scene.add( iluminacao )


const update = () => {
   // scene.rotation.x += 0.01; // Giro Lateral
   scene.rotation.y += 0.01; // Giro Horizontal
   // scene.rotation.z += 0.01; // Giro VErtical
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
