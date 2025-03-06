import express from 'express';
import { isAdmin, isEmployee, isUser } from '../middelware/authmiddleware.js'

const router = express.Router();

router.get('/admin-dashboard', isAdmin, (req, res) => {
  // Admin only route
  res.status(200).json({ message: 'Admin Dashboard' });
});

router.get('/employee-dashboard', isEmployee, (req, res) => {
  // Employee or Admin can access this route
  res.status(200).json({ message: 'Employee Dashboard' });
});

router.get('/user-page', isUser, (req, res) => {
  // All users, employees, and admins can access this route
  res.status(200).json({ message: 'User Page' });
});

export default router;