let videoStream;
let scene, camera, renderer, model;

function startSession() {
    const refNumber = document.getElementById('refNumber').value;
    if (/^\d{4}$/.test(refNumber)) {
        document.getElementById('refNumberInput').style.display = 'none';
        requestCameraPermission();
    } else {
        alert('Please enter a valid 4-digit reference number.');
    }
}

function requestCameraPermission() {
    const cameraPermissionDiv = document.getElementById('cameraPermission');
    const cameraFeed = document.getElementById('cameraFeed');

    cameraPermissionDiv.style.display = 'block';
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoStream = stream;
            cameraFeed.srcObject = stream;
        })
        .catch(error => {
            alert('Camera access is required for face scanning.');
            console.error('Error accessing camera:', error);
        });
}

function captureFace() {
    const canvas = document.createElement('canvas');
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { skinTone, hairColor } = analyzeSkinAndHairColor(imageData);

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }

    document.getElementById('cameraPermission').style.display = 'none';
    document.getElementById('container').style.display = 'flex';
   
    load3DModel(skinTone, hairColor);
}

function analyzeSkinAndHairColor(imageData) {
    // Placeholder for skin and hair color detection logic
    const skinTone = '#ffdbac'; // Example skin color
    const hairColor = '#4a2e2b'; // Example hair color
    return { skinTone, hairColor };
}

function load3DModel(skinTone, hairColor) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejsCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load('path-to-your-3d-model.glb', (gltf) => {
        model = gltf.scene;
       
        // Apply skin tone and hair color
        model.traverse((child) => {
            if (child.isMesh) {
                if (child.name.includes("Skin")) {
                    child.material.color.set(skinTone);
                } else if (child.name.includes("Hair")) {
                    child.material.color.set(hairColor);
                }
            }
        });
       
        scene.add(model);
        animate();
    });

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
