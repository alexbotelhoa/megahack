import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
const scene = new THREE.Scene()

function build (build, x, y, z) {
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

function moveHorizontalBuild (nrPredio, addInicio = 0, addEspaco = 0) {
   const primeiroPredio = - 9000 + addInicio
   const espacoEntrePredios = 700 + addEspaco
   return primeiroPredio + ( espacoEntrePredios * nrPredio )
}

function moveVerticalBuild (nrQuadra, addInicio = 0, addEspaco = 0) {
   const primeiraQuadra = - 9000 + addInicio
   const espacoEntreQuadras = 700 + addEspaco
   return primeiraQuadra + ( espacoEntreQuadras * nrQuadra )
}

export function Building() { 
   build( 'Building_Auto Service', moveHorizontalBuild(1), 0, moveVerticalBuild(1) )
}

