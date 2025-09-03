import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

function create3DCanvas(containerId, iconPath, mode = "doubleSide") {
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

    let mesh;

    if (mode === "doubleSide") {
        // Plano visible por ambos lados
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture, 
            transparent: true, 
            side: THREE.DoubleSide 
        });
        mesh = new THREE.Mesh(geometry, material);


    } else if (mode === "box") {
        // Tarjetica 3D delgada 
        const geometry = new THREE.BoxGeometry(1, 1, 0.08);
        const material = new THREE.MeshStandardMaterial({ 
            map: texture, 
            transparent: true 
        });
        mesh = new THREE.Mesh(geometry, material);
    }

    scene.add(mesh);

    // Animación (rotación ligera)
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    animate();
}

// Inicializar cada categoría con diferentes modos
create3DCanvas('js-category', 'javascript.png', "doubleSide");
create3DCanvas('php-category', 'php.png', "doubleSide");
create3DCanvas('laravel-category', 'Laravel.png', "doubleSide");
create3DCanvas('mysql-category', 'mysql.png', "doubleSide");
create3DCanvas('postgresql-category', 'Postgresql.svg', "doubleSide");




const container = document.getElementById("category-tags");
let draggedItem = null;

container.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("category")) {
        draggedItem = e.target;
        setTimeout(() => e.target.style.display = "none", 0); // se oculta mientras se arrastra
    }
});

container.addEventListener("dragend", (e) => {
    if (draggedItem) {
        draggedItem.style.display = "flex"; // se vuelve a mostrar
        draggedItem = null;
    }
});

container.addEventListener("dragover", (e) => {
    e.preventDefault(); // necesario para permitir drop
    const afterElement = getDragAfterElement(container, e.clientX);
    if (afterElement == null) {
        container.appendChild(draggedItem);
    } else {
        container.insertBefore(draggedItem, afterElement);
    }
});

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll(".category:not([style*='display: none'])")];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}


// Carrito
const cartCount = document.getElementById("cart-count");
let count = 0;

document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        count++;
        cartCount.textContent = count;

        if (btn.classList.contains("laravel")) {
            // Mostrar modal especial
            const modal = document.getElementById("laravelModal");
            modal.style.display = "block";
        }
    });
});

// Modal cerrar
const modal = document.getElementById("laravelModal");
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});



