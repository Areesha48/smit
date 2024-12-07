// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Replace with your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyB363FG7ivx8Y2bz0ue6OdisHLX4PWbsWQ",
    authDomain: "smit-dc372.firebaseapp.com",
    projectId: "smit-dc372",
    storageBucket: "smit-dc372.firebasestorage.app",
    messagingSenderId: "1042276788134",
    appId: "1:1042276788134:web:afa44f80067d340bad5167",
    measurementId: "G-5MEHG9C43W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Blog Form Submission
const blogForm = document.getElementById("blogForm");

blogForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get input values
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const timestamp = new Date().toLocaleString(); // Time & Date

    // Function to save a blog post to Firestore
    async function saveBlogPost(title, content) {
        const blogPost = {
            title: title,
            content: content,
            timestamp: timestamp
        };

        // Save to Firestore Database
        try {
            // Add blog post to Firestore collection
            const docRef = await addDoc(collection(db, "blogs"), blogPost);
            console.log("Blog post saved to Firestore with ID: ", docRef.id);
        } catch (e) {
            console.error("Error saving blog post: ", e);
        }

        // Save to Local Storage
        let localBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
        localBlogs.push(blogPost);
        localStorage.setItem("blogs", JSON.stringify(localBlogs));

        // Clear form fields
        blogForm.reset();

        // Optional: Redirect or show success message
        alert("Blog posted successfully!");
    }

    // Call the function to save blog post
    saveBlogPost(title, content);
});
// Check if the user is logged in when accessing the blog page
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // If not logged in, redirect to signup page
      window.location.href = 'signup.html';
    }
  });
  