const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )

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

// Cria a imagem do objeto, coloca a cor e a textura na imagem
const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const cubeMaterials = [
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } ),
   new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('public/img/cubo.jpg'), side: THREE.DoubleSide } )
]
const material = new THREE.MeshFaceMaterial( cubeMaterials )
const objeto = new THREE.Mesh( geometry, material )
scene.add( objeto )

camera.position.set( 0, 0, 2 );
controls.update();

const update = () => {
   objeto.rotation.x += 0.01;
   objeto.rotation.y += 0.005;
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

