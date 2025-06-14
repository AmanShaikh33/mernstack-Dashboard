import express from 'express';
import { myProfile, updateAvatar } from '../controllers/userController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.put("/avatar", isAuth, updateAvatar);

export default router;