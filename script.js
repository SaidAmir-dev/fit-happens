let videoStream;
let currentLanguage = 'en';

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
        finishSessionMessage: "Thank you for using the Virtual Fitting Room! Your session is now complete."
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
        finishSessionMessage: "¡Gracias por usar el probador virtual! Su sesión ha terminado."
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
        finishSessionMessage: "Merci d'avoir utilisé le cabines virtuelles ! Votre session est maintenant terminée."
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
        finishSessionMessage: "感谢您使用虚拟试衣间！您的会话已完成。"
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
        finishSessionMessage: "Obrigado por usar o Vestiário Virtual! Sua sessão está agora completa."
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
        finishSessionMessage: "شكرًا لاستخدامك غرفة القياس الافتراضية! تم الآن إنهاء جلستك."
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
        finishSessionMessage: "Спасибо за использование виртуальной примерочной! Ваша сессия завершена."
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
        finishSessionMessage: "वर्चुअल फिटिंग रूम का उपयोग करने के लिए धन्यवाद! आपका सत्र अब समाप्त हो गया है।"
    }
};

function changeLanguage(event) {
    currentLanguage = event.target.value;
    updateText();
}

function updateText() {
    document.getElementById("greeting").innerText = translations[currentLanguage].greeting;
    document.getElementById("refNumberLabel").innerText = translations[currentLanguage].refNumberLabel;
    document.getElementById("faceScanTitle").innerText = translations[currentLanguage].faceScanTitle;
    document.getElementById("faceScanPrompt").innerText = translations[currentLanguage].faceScanPrompt;
    document.getElementById("loadingMessage").innerText = translations[currentLanguage].loadingMessage;
    document.getElementById("modelTitle").innerText = translations[currentLanguage].modelTitle;
    document.getElementById("cartTitle").innerText = translations[currentLanguage].cartTitle;
    document.getElementById("captureModelButton").innerText = translations[currentLanguage].captureModelButton;
    document.getElementById("finishSessionButton").innerText = translations[currentLanguage].finishSessionButton;
    document.getElementById("takePhotoButton").innerText = translations[currentLanguage].takePhotoButton;
}

async function startSession() {
    const refNumber = document.getElementById('refNumber').value;
    if (refNumber.length === 4) {
        document.getElementById('refNumberInput').style.display = 'none';
        document.getElementById('cameraPermission').style.display = 'flex';
        await initializeCamera();
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

    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('container').style.display = 'contents';
    }, 3000);
}

function capture3DModel() {
    alert("3D Model captured!");
}

function finishSession() {
    alert(translations[currentLanguage].finishSessionMessage);
}
