// Firebase konfiguratsiyasi
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA00yNe11WH_P8w-w-tZ9Zx9a5Q8ZCxXRc",
    authDomain: "fotweb-87144.firebaseapp.com",
    projectId: "fotweb-87144",
    storageBucket: "fotweb-87144.appspot.com",
    messagingSenderId: "651794825397",
    appId: "1:651794825397:web:a863b531ace3f1dddebefc",
    measurementId: "G-NLWMHBY5BE"
};

// Firebase dasturini boshlash
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ma'lumotlarni ko'rsatish funksiyasi
const displayMessages = async () => {
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = ""; // Avvalgi ma'lumotlarni tozalash

    try {
        const querySnapshot = await getDocs(collection(db, 'messages')); // `messages` kolleksiyasini o'qing
        if (querySnapshot.empty) {
            messagesContainer.innerHTML = "<p>Hech qanday xabar topilmadi.</p>";
        } else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const messageCard = document.createElement('div');
                messageCard.classList.add('message-card');
                messageCard.innerHTML = `
                    <h3>${data.name}</h3>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Mavzu:</strong> ${data.subject}</p>
                    <p>${data.message}</p>
                `;
                messagesContainer.appendChild(messageCard);
            });
        }
    } catch (error) {
        console.error("Xato yuz berdi:", error);
        messagesContainer.innerHTML = `<p>Xato: ${error.message}</p>`;
    }
};

// Sahifa yuklanganda ma'lumotlarni ko'rsatish
window.onload = displayMessages;
