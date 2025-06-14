import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String,
    enum: ['Good', 'Okay', 'Perfect', 'Bad'],
    required: true,
  },
  emoji: {
    type: String,
    required: false, // optional if you want a visual emoji along with mood
  },
  summary: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

export default mongoose.model('Mood', moodSchema);
