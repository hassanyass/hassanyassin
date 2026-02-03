const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const container = document.getElementById('canvas-container');
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Particles
const geometry = new THREE.BufferGeometry();
const count = 1500;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

const colorPalette = [
    new THREE.Color('#CCFBFE'), // Ice Cyan
    new THREE.Color('#1B998B'), // Persian Green
    new THREE.Color('#EC4067')  // Vibrant Pink
];

for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 5;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove);

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
}

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX * 2;
    targetY = mouseY * 2;

    const elapsedTime = clock.getElapsedTime();

    // Gentle floating
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    // Mouse influence with easing
    particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
    particles.rotation.x += 0.05 * (targetY - particles.rotation.x);

    // Wave effect
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Subtle breathing
        // positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.002;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
