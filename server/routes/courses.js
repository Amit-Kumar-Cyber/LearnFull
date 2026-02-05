import express from 'express';
import Course from '../models/Course.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Get all courses (public or user specific)
router.get('/', async (req, res) => {
    try {
        // For now return all courses, later can filter by public/private
        // In Dashboard we need to know if user completed videos.
        // This simple CRUD might need aggregation if we want efficiently included progress.
        const courses = await Course.find().sort({ created_at: -1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create Course (Admin only)
router.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    try {
        const course = new Course({
            ...req.body,
            created_by: req.user.id
        });
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Course
router.put('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Course
router.delete('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
