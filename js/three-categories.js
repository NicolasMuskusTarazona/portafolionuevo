import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

function create3DCanvas(containerId, iconPath) {
    const container = document.getElementById(containerId);
    const canvas = container.querySelector('canvas');

    // Escena
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Textura del icono
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(iconPath);

    // Geometría y material
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animación (rotación ligera)
    function animate() {
        requestAnimationFrame(animate);
        plane.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Inicializar cada categoría con su icono
create3DCanvas('js-category', 'javascript.png');
create3DCanvas('php-category', 'php.png');
create3DCanvas('laravel-category', 'Laravel.png');
create3DCanvas('mysql-category', 'mysql.png');
create3DCanvas('postgresql-category', 'Postgresql.svg');
