import React, { useEffect, useState } from "react";
import { MoodData } from "../context/MoodContext";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";

const avatars = [
  "/avatars/avatar.webp",
  "/avatars/avatar2.webp",
  "/avatars/avatar3.jpeg",
  "/avatars/avatar4.jpeg",
  "/avatars/avatar5.avif",
];

const Home = () => {
  const {
    selectedMood,
    setSelectedMood,
    emoji,
    setEmoji,
    summary,
    setSummary,
    createUpdateMood,
    getMoodHistory,
    moodHistory,
    loading,
  } = MoodData();

  const {
    user,
    logoutUser,
    setUser,
    updateAvatar,
  } = UserData();

  const navigate = useNavigate();
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "");

  useEffect(() => {
    getMoodHistory();
  }, []);

  const handleMoodSelect = (mood, emojiIcon) => {
    setSelectedMood(mood);
    setEmoji(emojiIcon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) return alert("Please select a mood.");
    createUpdateMood();
  };

  const handleAvatarSelect = async (avatar) => {
    await updateAvatar(avatar);
    setSelectedAvatar(avatar);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-mono py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#1a1a2e] bg-opacity-90 border border-cyan-500 shadow-[0_0_20px_#00f5c4] rounded-2xl p-6 relative">

        {/* Profile + Logout */}
        <div className="flex justify-end items-center gap-3 mb-6">
          <img
            src={user?.avatar || "/avatars/default.png"}
            onClick={() => setShowDashboard(!showDashboard)}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-cyan-300 hover:scale-105 transition"
            title="Profile"
          />
          <button
            onClick={() => logoutUser(navigate)}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Overlay */}
        {showDashboard && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-20 right-0 left-0 mx-auto bg-gradient-to-br from-[#1f1c2c] to-[#928dab] text-white shadow-[0_0_25px_#00f5c4] rounded-2xl p-6 w-full max-w-3xl z-20 border border-cyan-400"
          >
            <h2 className="text-2xl font-bold mb-4 tracking-wider text-cyan-300 border-b border-cyan-400 pb-2 text-center">
              🎮 Your Gaming Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div>
                <p><strong>👤 Name:</strong> {user?.name}</p>
                <p><strong>🎂 Date of Birth:</strong> {user?.dob}</p>
                <p><strong>💥 XP:</strong> {user?.xp}</p>
                <p><strong>⚡ Level:</strong> {user?.level}</p>
                <div className="w-full h-3 bg-gray-700 rounded mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    style={{
                      width: `${(user?.xp / (user?.level * 100)) * 100}%`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(user?.xp / (user?.level * 100)) * 100}%` }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <p className="font-medium mb-2 text-cyan-200">🎭 Your Avatar</p>
                <img
                  src={user?.avatar || "/avatars/default.png"}
                  className="w-24 h-24 rounded-full cursor-pointer border-4 border-cyan-400 shadow-[0_0_10px_#00f5c4] mb-4 hover:scale-105 transition"
                />
                <p className="font-medium mb-2 text-cyan-200">🖼️ Choose Avatar</p>
                <div className="flex gap-2 flex-wrap">
                  {avatars.map((a, idx) => (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      key={idx}
                      src={a}
                      className={`w-16 h-16 rounded-full cursor-pointer border-2 transition duration-300 ${
                        selectedAvatar === a
                          ? "border-cyan-400 shadow-[0_0_10px_#00f5c4]"
                          : "border-gray-600"
                      }`}
                      onClick={() => handleAvatarSelect(a)}
                      alt="avatar"
                    />
                  ))}
                </div>
              </div>

              {/* Calendar */}
              

              {/* Streak */}
              <div>
                <p className="text-lg text-cyan-300">
                  🔥 <strong>Current Streak:</strong> {user?.streak || 0} days
                </p>
              </div>

              {/* Recent Moods */}
              <div className="md:mt-[-180px] md:translate-x-[-370px]">
                <p className="font-medium mb-2 text-cyan-200">📜 Recent Moods</p>
                <ul className="text-sm space-y-1 max-h-32 overflow-y-auto bg-gray-800 p-2 rounded-lg border border-cyan-400">
                  {moodHistory.slice(0, 5).map((m) => (
                    <li key={m._id}>
                      {m.emoji} {m.mood} — {new Date(m.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mood Tracker UI */}
        <h2 className="text-3xl text-center font-bold text-cyan-300 mb-8 tracking-widest">
          🌟 How are you feeling today?
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {[
            { mood: "Good", emoji: "😊" },
            { mood: "Okay", emoji: "😐" },
            { mood: "Perfect", emoji: "😄" },
            { mood: "Bad", emoji: "😔" },
          ].map(({ mood, emoji }) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood, emoji)}
              className={`p-4 rounded-xl border-2 text-lg font-semibold shadow-md transform transition-all duration-300
                ${
                  selectedMood === mood
                    ? "bg-cyan-500 text-black border-cyan-400 scale-105"
                    : "bg-gray-800 border-gray-600 text-white hover:bg-cyan-700 hover:scale-105"
                }`}
            >
              {emoji} {mood}
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-4 border border-cyan-400 rounded-lg bg-[#0f172a] text-white mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner"
          rows={4}
          placeholder="📝 Write about your day..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg transition-all font-bold tracking-wider shadow-md"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "🚀 Track Mood"}
        </button>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-cyan-300 mb-4 border-b border-cyan-500 pb-1">
            📚 Your Mood History
          </h2>
          {moodHistory.length === 0 ? (
            <p className="text-gray-400">No moods tracked yet.</p>
          ) : (
            <ul className="space-y-4">
              {moodHistory.map((mood) => (
                <li
                  key={mood._id}
                  className="bg-gray-900 border border-cyan-600 p-4 rounded-xl shadow-md"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-lg font-semibold">
                      {mood.emoji} {mood.mood}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(mood.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300">{mood.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
