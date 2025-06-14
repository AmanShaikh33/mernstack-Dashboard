import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const MoodContext = createContext();

export const MoodContextProvider = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState("");
  const [emoji, setEmoji] = useState("");
  const [summary, setSummary] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Create or update mood with token
  const createUpdateMood = async () => {
  setLoading(true);
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/mood/track",
      { mood: selectedMood, emoji, summary },
      { withCredentials: true }
    );

    toast.success(data.message);
    await getMoodHistory(); // ✅ fetch updated history instead of pushing
    setSummary("");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setLoading(false);
  }
};
  // ✅ Get mood history with token
  const getMoodHistory = async () => {
    setLoading(true);
    try {
    

      const { data } = await axios.get(
        "http://localhost:8000/api/mood/history",
         {
  withCredentials: true, // 🔴 This sends the cookie with the request
}
      );

      setMoodHistory(data.moods);
    } catch (error) {
      toast.error("Failed to fetch mood history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoodContext.Provider
      value={{
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
      }}
    >
      {children}
      <Toaster />
    </MoodContext.Provider>
  );
};

export const MoodData = () => useContext(MoodContext);
