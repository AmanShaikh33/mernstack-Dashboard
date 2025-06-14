import Mood from '../models/Mood.js';
import { User } from '../models/userModel.js'

// Create or update mood for the day
export const createOrUpdateMood = async (req, res) => {
  const { mood, emoji, summary } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user on request' });
  }

  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ✅ XP Calculation Function
  const calculateXp = (mood) => {
    switch (mood.toLowerCase()) {
      case "perfect": return 20;
      case "good": return 15;
      case "okay": return 10;
      case "bad": return 5;
      default: return 0;
    }
  };

  try {
    let moodData;
    let existingMood = await Mood.findOne({ user: userId, date: { $gte: today } });

    const user = await User.findById(userId);

    if (existingMood) {
      // Only update mood, don't award XP again
      existingMood.mood = mood;
      existingMood.emoji = emoji;
      existingMood.summary = summary;
      await existingMood.save();
      moodData = existingMood;
    } else {
      // New mood entry => award XP
      const newMood = new Mood({ user: userId, mood, emoji, summary });
      await newMood.save();
      moodData = newMood;

      const xpEarned = calculateXp(mood);
      user.xp += xpEarned;

      // Level up logic
      while (user.xp >= user.level * 100) {
        user.level += 1;
      }

      await user.save(); // Only save user if XP was updated
    }

    return res.status(200).json({
      message: 'Mood saved!',
      mood: moodData,
      xp: user.xp,
      level: user.level
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save mood', error: error.message });
  }
};



// Get mood history or today's mood
export const getMoodHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const moods = await Mood.find({ user: userId }).sort({ date: -1 });
    res.status(200).json({ moods });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get mood history', error: error.message });
  }
};
