import { Request, Response } from 'express';
import Blog from '../models/Blog';
import User from '../models/User';

// Create a new blog post
export const createBlog = async (req: Request, res: Response) => {
  const { title, content }: any = req.body;
  const userId = req.user.id; // Assuming `req.user` contains authenticated user's info

  try {
    const blog = await Blog.create({ title, content, userId });
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Get all blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'email'] }],
    });
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get a single blog post
export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'email'] }],
    });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Update a blog post
export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete a blog post
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.destroy();
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting blog', error });
  }
};
