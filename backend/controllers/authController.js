const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Organizer = require('../models/Organizer');
const Participant = require('../models/Participant');

const signup = async (req, res) => {
    try {
        const { email, name, mobile, password, role } = req.body;
        console.log("Signup Request:", req.body);

        if (!email || !name || !mobile || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const roleModels = { admin: Admin, organizer: Organizer, participant: Participant };
        const UserModel = roleModels[role];

        if (!UserModel) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if user exists in any role
        const existingUser = await Promise.all([
            Admin.findOne({ email }),
            Organizer.findOne({ email }),
            Participant.findOne({ email })
        ]);

        if (existingUser.some(user => user)) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({ email, name, mobile, password: hashedPassword });
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token, role });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log("Login Request:", { email, role });

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const roleModels = { admin: Admin, organizer: Organizer, participant: Participant };
        const UserModel = roleModels[role];

        if (!UserModel) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful:', email);
        res.json({ message: 'Login successful', token, role });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signup, login };
