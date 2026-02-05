import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learnfull');
        console.log('Connected to MongoDB');

        // Clear existing data (optional, but good for idempotent seeding)
        // await User.deleteMany({});
        // await Course.deleteMany({});

        // Check if admin exists
        const adminEmail = 'admin@learnfull.com';
        let adminUser = await User.findOne({ email: adminEmail });

        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            adminUser = new User({
                email: adminEmail,
                password: hashedPassword,
                full_name: 'Admin User',
                role: 'admin',
                preferences: { notification_time: '09:00', daily_reminder: true }
            });
            await adminUser.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        // Seed Courses
        const courseCount = await Course.countDocuments();
        if (courseCount === 0) {
            const courses = [
                {
                    title: 'Python for Beginners',
                    description: 'Learn Python from scratch with this comprehensive course.',
                    category: 'Coding',
                    thumbnail_url: 'https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg', // Placeholder
                    created_by: adminUser._id,
                    is_public: true
                },
                {
                    title: 'Web Design Fundamentals',
                    description: 'Master the basics of UI/UX and visual design.',
                    category: 'Design',
                    thumbnail_url: 'https://img.youtube.com/vi/B-ytMSuwbf8/maxresdefault.jpg', // Placeholder
                    created_by: adminUser._id,
                    is_public: true
                },
                {
                    title: 'Full Stack Development',
                    description: 'Become a full stack developer with MERN stack.',
                    category: 'Coding',
                    thumbnail_url: 'https://img.youtube.com/vi/Nu_pQ8X-xAA/maxresdefault.jpg', // Placeholder
                    created_by: adminUser._id,
                    is_public: true
                }
            ];

            await Course.insertMany(courses);
            console.log('Initial courses created');
        } else {
            console.log('Courses already exist');
        }

        console.log('Database seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
