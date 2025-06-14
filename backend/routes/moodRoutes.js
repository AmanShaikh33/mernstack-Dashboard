import express from 'express';
import { createOrUpdateMood,getMoodHistory } from '../controllers/moodController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/track', isAuth, createOrUpdateMood);
router.get('/history', isAuth, getMoodHistory);

export default router;
