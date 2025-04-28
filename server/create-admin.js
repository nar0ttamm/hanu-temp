const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hanu-sports', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Import the User model
const User = require('./models/User');

// Function to create an admin user
const createAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        
        if (adminExists) {
            console.log('Admin user already exists');
            return mongoose.disconnect();
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Password123!', salt);
        
        const admin = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');
        mongoose.disconnect();
    } catch (err) {
        console.error('Error creating admin user:', err);
        mongoose.disconnect();
    }
};

createAdmin(); 