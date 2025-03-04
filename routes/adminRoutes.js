import express from 'express';
import AdminController from '../controllers/adminController.js';

const router = express.Router();
const adminController = new AdminController();

router.post('/roles', adminController.createRole);
router.get('/roles', adminController.getRoles);
router.put('/roles/:id', adminController.updateRole);
router.delete('/roles/:id', adminController.deleteRole);

export default router;