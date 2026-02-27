const mongoose = require('mongoose');
const User = require('./server/models/User');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hakkusu'; // Fallback if not in env

async function checkUsers() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            console.log('Admin already exists:', admin.email);
        } else {
            console.log('No admin found.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

checkUsers();
