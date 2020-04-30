const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 
   50, // Foco
   window.innerWidth / window.innerHeight, // Proporção da imagem da câmera
   1, 
   5000 // Tamanho do mapa
)
camera.position.set( 
   2000, //fundo (-) arco pro lado direito (+)
   2000, // fundo (-) arco pra cima (+) 
   2000, // Frente (-) e Costa (+)
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

const controls = new THREE.OrbitControls(camera, renderer.domElement)

// // Cria a imagem do objeto, coloca a cor e a textura na imagem
const geometry = new THREE.BoxGeometry( 10, 250, 250 )
const cubeMaterials = [
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 000000, side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 000000, side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 000000, side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { color: 000000, side: THREE.DoubleSide } )
]
const material = new THREE.MeshFaceMaterial( cubeMaterials )
const objeto = new THREE.Mesh( geometry, material )
objeto.position.set(-450, 300, -450)
scene.add( objeto )

const iluminacao = new THREE.AmbientLight( 0xffffff, 0.9)
scene.add( iluminacao )

const loader = new THREE.GLTFLoader()
const fileCity = 'public/img/city/scene.gltf'
loader.load(
   fileCity,
   function ( objeto  ) {
      scene.add( objeto.scene )
   }
)

const update = () => {
   // objeto.rotation.x += 0.01;
   // objeto.rotation.y += 0.005;
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

