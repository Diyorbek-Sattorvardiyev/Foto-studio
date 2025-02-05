// Firebase konfiguratsiyasi
const firebaseConfig = {
    apiKey: "AIzaSyA00yNe11WH_P8w-w-tZ9Zx9a5Q8ZCxXRc",
    authDomain: "fotweb-87144.firebaseapp.com",
    projectId: "fotweb-87144",
    storageBucket: "fotweb-87144.appspot.com",
    messagingSenderId: "651794825397",
    appId: "1:651794825397:web:a863b531ace3f1dddebefc",
    measurementId: "G-NLWMHBY5BE"
};

// Firebase ilovasini boshlash
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submit hodisasi
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Sahifa qayta yuklanishini oldini olish

    // Form ma'lumotlarini olish
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Firestore'da saqlash
    try {
        const docRef = await addDoc(collection(db, 'messages'), {
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        alert("Xabar muvaffaqiyatli yuborildi!");
        contactForm.reset(); // Formani tozalash
    } catch (error) {
        console.error("Xato yuz berdi:", error);
        alert("Xabarni yuborishda xato yuz berdi.");
    }
});
