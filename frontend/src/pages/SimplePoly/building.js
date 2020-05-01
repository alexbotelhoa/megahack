import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

export default function Building (build, x, y, z) {
   const scene = new THREE.Scene()
   const mtlLoader = new MTLLoader().setPath( 'models/mtl/Models/Buildings/' )
   const objLoader = new OBJLoader().setPath( 'models/mtl/Models/Buildings/' )

   mtlLoader.load(build +'.mtl', ( materials ) => {
      const texture = new THREE.TextureLoader().load( 'models/mtl/Textures/'+build+'.png' )
      const material = new THREE.MeshPhongMaterial({ map: texture })
      materials.preload()
      objLoader.setMaterials( materials )
      objLoader.load(build +'.obj', ( object ) => {
         object.traverse(( node ) => node.isMesh ? node.material = material : '')
         return scene.add( object )
      })
   })
}