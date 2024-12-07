// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Function to fetch and display blog posts
async function fetchBlogPosts() {
    const blogContentDiv = document.querySelector('.blog-content');

    // Get blog posts from Firestore
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            const blogPost = doc.data();

            // Create blog post elements
            const blogPostElement = document.createElement('article');
            blogPostElement.classList.add('blog-post');
            
            blogPostElement.innerHTML = `
                <div class="post-image">
                    <img src="./images/blogsection.jpeg" alt="Post Image">
                </div>
                <div class="post-details">
                    <p class="date">${new Date(blogPost.timestamp).toLocaleString()}</p>
                    <h2>${blogPost.title}</h2>
                    <p class="summary">${blogPost.content}</p>
                    <div class="post-meta">
                        <span class="tag">Technology</span>
                        <span>By Admin</span>
                        <span>• 7 min read</span>
                    </div>
                </div>
            `;

            // Append the new blog post element to the blog content section
            blogContentDiv.appendChild(blogPostElement);
        });
    } catch (e) {
        console.error("Error fetching blog posts: ", e);
    }
}

// Call the function to fetch and display posts
fetchBlogPosts();
