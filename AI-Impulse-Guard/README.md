# AI-Impulse-Guard
This project is a Node.js and Express-based web application designed to manage user authentication and provide a personalized financial or user-centric dashboard experience. It includes core features such as user registration, login, and session handling through a custom authentication controller. Once authenticated, users gain access to protected routes like a dashboard, insights page, transaction history, and an AI advisor module.

The system ensures access control by restricting sensitive pages to logged-in users only, improving security and user flow. Dynamic rendering is used to pass user-specific data (such as profile or transaction details) to views, enabling a personalized interface. Overall, the project demonstrates backend routing, authentication logic, and integration of multiple user-focused modules within a structured Express application.

module.exports = router;

const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/authController');

// Home page
router.get('/', (req, res) => {
    res.render('index');
});

// Login page
router.get('/login', (req, res) => {
    if (authController.isLoggedIn()) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

// Register page
router.get('/register', (req, res) => {
    if (authController.isLoggedIn()) {
        return res.redirect('/dashboard');
    }
    res.render('register', { error: null });
});

// Dashboard - Fetch user from memory/DB
router.get('/dashboard', (req, res) => {
    if (!authController.isLoggedIn()) return res.redirect('/login');
    const user = authController.getCurrentUser();
    res.render('dashboard', { user });
});

// Insights
router.get('/insight', (req, res) => {
    if (!authController.isLoggedIn()) return res.redirect('/login');
    res.render('insight');
});

// Transactions
router.get('/transactions', (req, res) => {
    if (!authController.isLoggedIn()) return res.redirect('/login');
    const user = authController.getCurrentUser();
    res.render('transactions', { user });
});

// AI Advisor
router.get('/ai-advisor', (req, res) => {
    if (!authController.isLoggedIn()) return res.redirect('/login');
    const user = authController.getCurrentUser();
    res.render('ai-advisor', { user });
});

module.exports = router;
