import React from 'react'
import './styles.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';  // Criador de caixas de controle
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'


// SCENE
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0x000000 )
scene.background = new THREE.Color().setHSL(0.6, 0, 1)
scene.fog = new THREE.Fog( scene.background, 10000, 15000 ); // SOMBRA


// GROUP
const group = new THREE.Group();
scene.add(group);


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
const ambientLight = new THREE.AmbientLight(0x666666, 0.5)
scene.add(ambientLight)

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5)
hemisphereLight.color.setHSL(0.6, 1, 0.6)
hemisphereLight.groundColor.setHSL(0.095, 1, 0.75)
hemisphereLight.position.set(0, 3000, 0)
scene.add(hemisphereLight)

var hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 100)
scene.add(hemisphereLightHelper)

var directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.color.setHSL(0.1, 1, 0.95)
directionalLight.position.set(- 1, 1.75, 1).normalize()
directionalLight.position.multiplyScalar(1000)
scene.add(directionalLight)

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

var directionalLightHeper = new THREE.DirectionalLightHelper(directionalLight, 100)
scene.add(directionalLightHeper)


// GROUND
var groundTexture = new THREE.ImageUtils.loadTexture('models/mtl/Textures/Natures/Floor.png')
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping
groundTexture.repeat.set(25, 25)
// groundTexture.anisotropy = 160
groundTexture.encoding = THREE.sRGBEncoding

var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture })

var ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial)
ground.position.y = - 5
ground.rotation.x = - Math.PI / 2
ground.receiveShadow = true
scene.add(ground)



// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.shadowMap.enabled = true;


// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = false // retardo de movimento
// controls.dampingFactor = 0.05

controls.enableRotate = true // movimentação horizontal em circulo (Eixo X)
controls.screenSpacePanning = false  // movimentação baixo-cima (Eixo Y)
controls.enablePan = true // movimentação frente-tráz (Eixo Z)

controls.maxPolarAngle = Math.PI / 2  // não passar do plano do terreno
// controls.maxAzimuthAngle = Math.PI / 2

controls.minDistance = 1500  // efeito sobre a camera
controls.maxDistance = 20000  // efeito sobre a camera

controls.mouseButtons = { // defini o que cada botão do mause faz
   LEFT: THREE.MOUSE.PAN,  // padrão é ROTATE
   MIDDLE: THREE.MOUSE.DOLLY,  // padrão é ROTATE
   RIGHT: THREE.MOUSE.PAN  // padrão é PAN
}

controls.keys = {
   LEFT: 37, //left arrow
   UP: 38, // up arrow
   RIGHT: 39, // right arrow
   BOTTOM: 40 // down arrow
}

controls.touches = {
   ONE: THREE.TOUCH.ROTATE,
   TWO: THREE.TOUCH.DOLLY_PAN
}

controls.update()

// const gui = new GUI();
// gui.add( controls, 'screenSpacePanning' );

// DIVERSOS
window.addEventListener('resize', onWindowResize, false)  // controle do redimencionamento do browser
document.addEventListener('mousemove', onDocumentMouseMove, false);  // controle de mouse hover


// FUNCTIONS
function building(build, x, y, z) {
   const path = 'models/mtl/Models/Buildings/'
   const mtlLoader = new MTLLoader().setPath(path)
   const objLoader = new OBJLoader().setPath(path)
   const texture = new THREE.TextureLoader().load('models/mtl/Textures/Buildings/' + build + '.png')
   const material = new THREE.MeshPhongMaterial({ map: texture })

   mtlLoader.load(build + '.mtl', (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load(build + '.obj', (object) => {
         object.traverse((node) => node.isMesh ? node.material = material : '')
         object.position.set(x, y, z)
         scene.add(object)
      })
   })
}

function roads(build, x, y, z) {
   const path = 'models/mtl/Models/Road/'
   const mtlLoader = new MTLLoader().setPath(path)
   const objLoader = new OBJLoader().setPath(path)
   const texture = new THREE.TextureLoader().load('models/mtl/Textures/Road/Road.png')
   const material = new THREE.MeshPhongMaterial({ map: texture })

   mtlLoader.load(build + '.mtl', (materials) => {
      materials.preload()
      objLoader.setMaterials(materials)
      objLoader.load(build + '.obj', (object) => {
         object.traverse((node) => node.isMesh ? node.material = material : '')
         object.position.set(x, y, z)
         // object.scale.y = 1  // Espessura da Rua
         object.rotation.y = 1.57 // virar 90° 1.57
         group.add(object)
      })
   })
}

function moveHorizontalBuild(nrPredio, addInicio = 0, addEspaco = 0) {
   const primeiroPredio = - 9000 + addInicio
   const espacoEntrePredios = 700 + addEspaco
   return primeiroPredio + (espacoEntrePredios * nrPredio)
}

function moveVerticalBuild(nrQuadra, addInicio = 0, addEspaco = 0) {
   const primeiraQuadra = - 9000 + addInicio
   const espacoEntreQuadras = 700 + addEspaco
   return primeiraQuadra + (espacoEntreQuadras * nrQuadra)
}

function moveHorizontalRua(nrRua, addInicio = 0, addEspaco = 0) {
   const primeiraRua = - 9000 + addInicio
   const espacoEntreRuas = 700 + addEspaco
   return primeiraRua + (espacoEntreRuas * nrRua)
}

function moveVerticalRua(nrAvenida, addInicio = 0, addEspaco = 0) {
   const primeiraAvenida = - 9000 + addInicio
   const espacoEntreAvenidas = 700 + addEspaco
   return primeiraAvenida + (espacoEntreAvenidas * nrAvenida)
}

// EXEMPLO EDIFICIOS
function build(nr, nrBuild, nrRoad) {
   switch (nr) {
      case 1: building('Building_Auto Service', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 2: building('Building_Bakery', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 3: building('Building_Bar', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 4: building('Building_Books Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 5: building('Building_Chicken Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 6: building('Building_Clothing', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 7: building('Building_Coffee Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 8: building('Building_Drug Store', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 9: building('Building_Factory', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 10: building('Building_Fast Food', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 11: building('Building_Fruits  Shop', moveHorizontalBuild(nrBuild++, -550), 0, moveVerticalBuild(nrRoad, 600)); break
      case 12: building('Building_Gas Station', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 13: building('Building_Gift Shop', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 14: building('Building_Music Store', moveHorizontalBuild(nrBuild++), 155, moveVerticalBuild(nrRoad)); break
      case 15: building('Building_Pizza', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
      case 16: building('Building_Restaurant', moveHorizontalBuild(nrBuild++), 215, moveVerticalBuild(nrRoad)); break
      case 17: building('Building_Shoes Shop', moveHorizontalBuild(nrBuild++), 215, moveVerticalBuild(nrRoad)); break
      case 18: building('Building_Super Market', moveHorizontalBuild(nrBuild++), 0, moveVerticalBuild(nrRoad)); break
   }
}

let b = 0
let edificio = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
for (let i in edificio) {
   if (i > 1) build(edificio[i], edificio[0] + b++, edificio[1])
}

// EXEMPLOS RUAS
function road(nr, nrBuild, nrRoad) {
   switch (nr) {
      case 1: roads('Road Concrete Tile Small', moveHorizontalRua(nrBuild++, -800), 0, moveVerticalRua(nrRoad))
      case 2: roads('Road Concrete Tile', moveHorizontalRua(nrBuild++, -500), 0, moveVerticalRua(nrRoad))
      case 3: roads('Road Corner_01', moveHorizontalRua(nrBuild++, -300), 0, moveVerticalRua(nrRoad))
      case 4: roads('Road Corner_02', moveHorizontalRua(nrBuild++, 100), 0, moveVerticalRua(nrRoad))
      case 5: roads('Road Intersection_01', moveHorizontalRua(nrBuild++, 400), 0, moveVerticalRua(nrRoad))
      case 6: roads('Road Intersection_02', moveHorizontalRua(nrBuild++, 700), 0, moveVerticalRua(nrRoad))
      case 7: roads('Road Lane Bus Stop', moveHorizontalRua(nrBuild++, 1000), 0, moveVerticalRua(nrRoad))
      case 8: roads('Road Lane Half', moveHorizontalRua(nrBuild++, 1300), 0, moveVerticalRua(nrRoad))
      case 9: roads('Road Lane_01', moveHorizontalRua(nrBuild++, 1600), 0, moveVerticalRua(nrRoad))
      case 10: roads('Road Lane_02', moveHorizontalRua(nrBuild++, 1900), 0, moveVerticalRua(nrRoad))
      case 11: roads('Road Lane_03', moveHorizontalRua(nrBuild++, 2200), 0, moveVerticalRua(nrRoad))
      case 12: roads('Road Lane_04', moveHorizontalRua(nrBuild++, 2500), 0, moveVerticalRua(nrRoad))
      case 13: roads('Road Split Line', moveHorizontalRua(nrBuild++, 2800), 0, moveVerticalRua(nrRoad))
      case 14: roads('Road T_Intersection_01', moveHorizontalRua(nrBuild++, 3100), 0, moveVerticalRua(nrRoad))
      case 15: roads('Road T_Intersection_02', moveHorizontalRua(nrBuild++, 3400), 0, moveVerticalRua(nrRoad))
      case 16: roads('Road Tile Small', moveHorizontalRua(nrBuild++, 3800), 0, moveVerticalRua(nrRoad))
      case 17: roads('Road Tile', moveHorizontalRua(nrBuild++, 4600), 0, moveVerticalRua(nrRoad))
   }
}

let rua = [1, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
for (let i in rua) {
   (i > 1) ? road(rua[i], rua[0] + b++, rua[1]) : b = 0
}




// POSICAO 5 - AVENIDA 13
edificio = [7, 13, 1, 2, 3, 5, 7, 8, 10, 13, 14, 15, 16, 18]
for (let i in edificio) (i > 1) ? build(edificio[i], edificio[0] + b++, edificio[1]) : b = 0

// rua = [2, 14, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
// for (let i in rua) {
//    (i > 1) ? road(rua[i], rua[0] + b++, rua[1]) : b = 0
// }

// QUADRA 1 - RUAS
let nrBuild = 6
let nrRoad = 14
for (let i = nrBuild++; i < 17; i++) {
   roads('Road Lane_01', moveHorizontalRua(i, 0, 87), 0, moveVerticalRua(nrRoad, 0))
}











function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
}





let selectedObject = null;

function onDocumentMouseMove(event) {
   event.preventDefault()

   if (selectedObject) {
      selectedObject.scale.y = 1
      selectedObject = null
   }

   const intersects = getIntersects(event.layerX, event.layerY)

   if (intersects.length > 0) {
      const res = intersects.filter(function (res) {
         return res && res.object
      })[0]

      if (res && res.object) {
         selectedObject = res.object
         selectedObject.scale.y = 5
      }
   }
}

const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector3();

function getIntersects(x, y) {
   x = (x / window.innerWidth) * 2 - 1
   y = - (y / window.innerHeight) * 2 + 1

   mouseVector.set(x, y, 0.5)
   raycaster.setFromCamera(mouseVector, camera)
   return raycaster.intersectObject(group, true)
}






const update = () => {
   // scene.rotation.x += 0.01; // Giro Lateral
   // scene.rotation.y += 0.01; // Giro Horizontal
   // scene.rotation.z += 0.01; // Giro Vertical
}

const render = () => {
   renderer.render(scene, camera)
}

const animate = () => {
   requestAnimationFrame(animate)

   // controls.update();

   update()
   render()
}
animate()

export default function SimplePoly() {
   return (
      <body />
   )
}
