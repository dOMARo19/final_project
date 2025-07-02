import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserSessions,
  revokeUserSession,
  getProfile
} from '../controllers/users.js';
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, admin, deleteUser);
router.get('/:id/sessions', protect, getUserSessions);
router.delete('/:userId/sessions/:sessionId', protect, revokeUserSession);

export default router;