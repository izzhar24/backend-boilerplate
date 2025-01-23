import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController';
import { authenticate } from '../middleware/authMiddleware'; // Assuming middleware to authenticate user

const router = express.Router();

// Blog routes
router.post('/', authenticate, createBlog); // Create a new blog post
router.get('/', getAllBlogs); // Get all blog posts
router.get('/:id', getBlogById); // Get a single blog post by ID
router.put('/:id', authenticate, updateBlog); // Update a blog post
router.delete('/:id', authenticate, deleteBlog); // Delete a blog post

export default router;
