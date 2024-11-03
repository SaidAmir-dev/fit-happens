
let videoStream;
let currentLanguage = 'en';
let refNumber;
let scene, camera, renderer;
let baseModel;
let clothingModels = {};
let modelGroup = new THREE.Group();

const translations = {
    en: {
        greeting: "Hello!",
        refNumberLabel: "Enter reference number:",
        faceScanTitle: "Face Scan Required",
        faceScanPrompt: "Please position your face in front of the camera.",
        loadingMessage: "Please stand still, you are being scanned by LiDAR scanners...",
        modelTitle: "Your 3D Model",
        cartTitle: "Your Scanned Items",
        captureModelButton: "Capture 3D Model",
        finishSessionButton: "Finish Session",
        takePhotoButton: "Take Photo",
        finishSessionMessage: "Thank you for using the Virtual Fitting Room! Your session is now complete.",
        items: {
            item1: "T-Shirt - Size M",
            item2: "Jeans - Size 32",
            item3: "Hat - One Size"
        }
    },
    es: {
        greeting: "¡Hola!",
        refNumberLabel: "Ingrese el número de referencia:",
        faceScanTitle: "Se requiere escaneo facial",
        faceScanPrompt: "Por favor, coloque su cara frente a la cámara.",
        loadingMessage: "Por favor, manténgase quieto, está siendo escaneado por escáneres LiDAR...",
        modelTitle: "Su modelo 3D",
        cartTitle: "Sus artículos escaneados",
        captureModelButton: "Capturar modelo 3D",
        finishSessionButton: "Finalizar sesión",
        takePhotoButton: "Tomar foto",
        finishSessionMessage: "¡Gracias por usar el probador virtual! Su sesión ha terminado.",
        items: {
            item1: "Camiseta - Talla M",
            item2: "Vaqueros - Talla 32",
            item3: "Sombrero - Talla Única"
        }
    },
    fr: {
        greeting: "Bonjour!",
        refNumberLabel: "Entrez le numéro de référence :",
        faceScanTitle: "Scan du visage requis",
        faceScanPrompt: "Veuillez positionner votre visage devant la caméra.",
        loadingMessage: "Veuillez rester immobile, vous êtes scanné par des scanners LiDAR...",
        modelTitle: "Votre modèle 3D",
        cartTitle: "Vos articles scannés",
        captureModelButton: "Capturer le modèle 3D",
        finishSessionButton: "Terminer la session",
        takePhotoButton: "Prendre une photo",
        finishSessionMessage: "Merci d'avoir utilisé le cabines virtuelles ! Votre session est maintenant terminée.",
        items: {
            item1: "T-shirt - Taille M",
            item2: "Jean - Taille 32",
            item3: "Chapeau - Taille Unique"
        }
    },
    zh: {
        greeting: "你好！",
        refNumberLabel: "请输入参考编号：",
        faceScanTitle: "需要面部扫描",
        faceScanPrompt: "请将您的面部放在相机前。",
        loadingMessage: "请保持静止，您正在被LiDAR扫描仪扫描...",
        modelTitle: "您的3D模型",
        cartTitle: "您扫描的商品",
        captureModelButton: "捕获3D模型",
        finishSessionButton: "完成会话",
        takePhotoButton: "拍照",
        finishSessionMessage: "感谢您使用虚拟试衣间！您的会话已完成。",
        items: {
            item1: "T恤 - 尺码 M",
            item2: "牛仔裤 - 尺码 32",
            item3: "帽子 - 均码"
        }
    },
    pt: {
        greeting: "Olá!",
        refNumberLabel: "Digite o número de referência:",
        faceScanTitle: "Escaneamento facial necessário",
        faceScanPrompt: "Por favor, posicione seu rosto na frente da câmera.",
        loadingMessage: "Por favor, fique parado, você está sendo escaneado por scanners LiDAR...",
        modelTitle: "Seu modelo 3D",
        cartTitle: "Seus itens escaneados",
        captureModelButton: "Capturar modelo 3D",
        finishSessionButton: "Finalizar sessão",
        takePhotoButton: "Tirar foto",
        finishSessionMessage: "Obrigado por usar o Vestiário Virtual! Sua sessão está agora completa.",
        items: {
            item1: "Camiseta - Tamanho M",
            item2: "Jeans - Tamanho 32",
            item3: "Chapéu - Tamanho Único"
        }
    },
    ar: {
        greeting: "مرحبا!",
        refNumberLabel: "أدخل رقم المرجع:",
        faceScanTitle: "مسح الوجه مطلوب",
        faceScanPrompt: "يرجى وضع وجهك أمام الكاميرا.",
        loadingMessage: "يرجى الثبات، يتم مسحك بواسطة ماسحات ليزر ثلاثية الأبعاد...",
        modelTitle: "نموذجك ثلاثي الأبعاد",
        cartTitle: "عناصر المسح الخاصة بك",
        captureModelButton: "التقاط نموذج ثلاثي الأبعاد",
        finishSessionButton: "إنهاء الجلسة",
        takePhotoButton: "التقاط الصورة",
        finishSessionMessage: "شكرًا لاستخدامك غرفة القياس الافتراضية! تم الآن إنهاء جلستك.",
        items: {
            item1: "قميص - المقاس M",
            item2: "جينز - المقاس 32",
            item3: "قبعة - مقاس واحد"
        }
    },
    ru: {
        greeting: "Здравствуйте!",
        refNumberLabel: "Введите номер тэга:",
        faceScanTitle: "Необходим скан лица",
        faceScanPrompt: "Пожалуйста, расположите свое лицо перед камерой.",
        loadingMessage: "Пожалуйста, оставайтесь неподвижными, вас сканируют LiDAR-сканеры...",
        modelTitle: "Ваша 3D модель",
        cartTitle: "Ваши отсканированные предметы",
        captureModelButton: "Сохранить 3D модель",
        finishSessionButton: "Завершить сессию",
        takePhotoButton: "Сделать фото",
        finishSessionMessage: "Спасибо за использование виртуальной примерочной! Ваша сессия завершена.",
        items: {
            item1: "Футболка - Размер M",
            item2: "Джинсы - Размер 32",
            item3: "Шляпа - Один размер"
        }
    },
    hi: {
        greeting: "नमस्ते!",
        refNumberLabel: "संदर्भ संख्या दर्ज करें:",
        faceScanTitle: "चेहरे का स्कैन आवश्यक है",
        faceScanPrompt: "कृपया अपने चेहरे को कैमरे के सामने रखें।",
        loadingMessage: "कृपया स्थिर रहें, आपका LiDAR स्कैनर द्वारा स्कैन किया जा रहा है...",
        modelTitle: "आपका 3D मॉडल",
        cartTitle: "आपकी स्कैन की गई वस्तुएं",
        captureModelButton: "3D मॉडल कैप्चर करें",
        finishSessionButton: "सत्र समाप्त करें",
        takePhotoButton: "फोटो लें",
        finishSessionMessage: "वर्चुअल फिटिंग रूम का उपयोग करने के लिए धन्यवाद! आपका सत्र अब समाप्त हो गया है।",
        items: {
            item1: "टी-शर्ट - साइज़ M",
            item2: "जींस - साइज़ 32",
            item3: "टोपी - एक साइज़"
        }
    }
};

function changeLanguage(event) {
    currentLanguage = event.target.value;
    localStorage.setItem('currentLanguage', currentLanguage)
    updateText();

    //Reload cart items with new language if cart is visible
    if (document.getElementById('container').style.display !== 'none') {
        loadCartItems(refNumber);
    }
}

function updateText() {
    document.getElementById("greeting").innerText = translations[currentLanguage].greeting;
    document.getElementById("refNumberLabel").innerText = translations[currentLanguage].refNumberLabel;
    document.getElementById("faceScanTitle").innerText = translations[currentLanguage].faceScanTitle;
    document.getElementById("faceScanPrompt").innerText = translations[currentLanguage].faceScanPrompt;
    document.getElementById("loadingMessage").innerText = translations[currentLanguage].loadingMessage;
    document.getElementById("modelTitle").innerText = translations[currentLanguage].modelTitle;
    document.getElementById("cartTitle").innerText = translations[currentLanguage].cartTitle;
    //document.getElementById("captureModelButton").innerText = translations[currentLanguage].captureModelButton;
    //document.getElementById("finishSessionButton").innerText = translations[currentLanguage].finishSessionButton;
    //document.getElementById("takePhotoButton").innerText = translations[currentLanguage].takePhotoButton;
    const finishSessionButton = document.getElementById("finishSessionButton");
    if (finishSessionButton) {
        finishSessionButton.innerText = translations[currentLanguage].finishSessionButton;
    }
    // Update 'Take Photo' button if it exists
    const takePhotoButton = document.getElementById("takePhotoButton");
    if (takePhotoButton) {
        takePhotoButton.innerText = translations[currentLanguage].takePhotoButton;
    }
}

window.onload = function() {
    if (localStorage.getItem('currentLanguage')) {
        currentLanguage = localStorage.getItem('currentLanguage');
        document.getElementById('languageSelector').value = currentLanguage
    }
    updateText();
};

async function startSession() {
    refNumber = document.getElementById('refNumber').value;
    if (/^\d{4}$/.test(refNumber)) {
        document.getElementById('refNumberInput').style.display = 'none';
        document.getElementById('cameraPermission').style.display = 'flex';
        await initializeCamera();
        updateText();
    } else {
        alert("Please enter a valid 4-digit reference number.");
    }
}

async function initializeCamera() {
    const constraints = { video: { facingMode: "user" } };
    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        document.getElementById('cameraFeed').srcObject = videoStream;
    } catch (error) {
        console.error("Error accessing the camera:", error);
        alert("Unable to access the camera. Please check your settings.");
    }
}

function captureFace() {
    document.getElementById('cameraPermission').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'block';

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('container').style.display = 'contents';
        init3DModel();
        loadCartItems(refNumber);
        updateText();
    }, 3000);
}

function capture3DModel() {
    alert("3D Model captured!");
}

function finishSession() {
    alert(translations[currentLanguage].finishSessionMessage);

    // Hide the main container and show the reference number input
    document.getElementById('container').style.display = 'none';
    document.getElementById('refNumberInput').style.display = 'flex';

    // Reset the reference number input
    document.getElementById('refNumber').value = '';

    // Clear cart items
    document.getElementById('cartItems').innerHTML = '<p>No items scanned yet.</p>';

    // Reset the 3D model scene
    if (renderer && scene) {
        renderer.dispose();
        scene = null;
        renderer = null;
        camera = null;
    }

    // Reset other variables if necessary
    // For example, reset clothing models visibility
    clothingModels = {};
    modelGroup = new THREE.Group();

    // Optionally reinitialize the language settings
    updateText();
}


// Initialize the 3D model display
function init3DModel() {
    const canvas = document.getElementById("3dModelCanvas");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Scene and camera setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Basic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(ambientLight);
    scene.add(directionalLight);

    // Basic 3D model
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const body = new THREE.Mesh(geometry, material);
    scene.add(body);

    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.y = 1.5;
    scene.add(head);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        body.rotation.y += 0.01;
        head.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Call the init3DModel function when the model view is displayed
function captureFace() {
    document.getElementById('cameraPermission').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'block';

    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('container').style.display = 'contents';
        init3DModel();  // Initialize the 3D model display
        loadCartItems(refNumber);  // Load scanned items into cart
    }, 3000);
}


// Function to load scanned items into cart
function loadCartItems(refNumber) {
    // Sample items; replace with actual data loading logic if needed
    const items = [
        { id: "item1" },
        { id: "item2" },
        { id: "item3" }
    ];

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Clear previous items

    // Populate cart items with checkboxes
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.id;
        checkbox.value = item.id;
        checkbox.onchange = () => toggleItemOnModel(item.id, checkbox.checked);

        const label = document.createElement('label');
        label.htmlFor = item.id;
        label.innerText = translations[currentLanguage].items[item.id];

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        cartItems.appendChild(itemDiv);
    });
}

function goBack() {
    // Determine the current visible section and show the previous one
    if (document.getElementById('container').style.display === 'contents') {
        document.getElementById('container').style.display = 'none';
        document.getElementById('cameraPermission').style.display = 'flex';
    } else if (document.getElementById('cameraPermission').style.display === 'flex') {
        document.getElementById('cameraPermission').style.display = 'none';
        document.getElementById('refNumberInput').style.display = 'flex';
    }
}
