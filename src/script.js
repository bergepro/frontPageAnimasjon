import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three'

// Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load("/textures/NormalMap.png")
// Debug



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5,64,64 )

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.2
material.roughness = 0

material.normalMap = normalTexture;
material.color = new THREE.Color(0x1F01B9)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xFF0000, 0.2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0x00AFB5, 2)

pointLight2.position.set(-1.86,1,-1,1.65)
pointLight2.intensity = 10

// gui.add(pointLight.position, "y",).min(-3).max(3).step(0.01)
// gui.add(pointLight.position, "x",).min(-6).max(6).step(0.01)
// gui.add(pointLight.position, "z",).min(-6).max(6 ).step(0.01)
// gui.add(pointLight, "intensity").min(0).max(10).step(0.01)

scene.add(pointLight2)

// gui.add(pointLight2.position, "y",).min(-3).max(3).step(0.01)
// gui.add(pointLight2.position, "x",).min(-6).max(6).step(0.01)
// gui.add(pointLight2.position, "z",).min(-6).max(6).step(0.01)
// gui.add(pointLight2, "intensity").min(0).max(10).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)

pointLight.position.set(1.86,-1,-1.3,-1.65)

pointLight.intensity = 10



const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowX) 
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener("scroll", updateSphere)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y) 
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x) 
    sphere.position.z += -.05 * (targetY - sphere.rotation.x) 

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()