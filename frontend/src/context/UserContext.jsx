import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // start with true

  // ✅ Fetch user profile on app load (auto-login)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("https://mernstack-dashboard.onrender.com/api/user/me", {
          withCredentials: true,
        });
        setUser(data);
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Register function
  async function registerUser(formdata, navigate, fetchPosts) {
    setLoading(true);
    try {
      const { data } = await axios.post("https://mernstack-dashboard.onrender.com/api/auth/register", formdata, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      navigate("/");
      if (fetchPosts) fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Login function
  async function loginUser(email, password, navigate, fetchPosts) {
    setLoading(true);
    try {
      const { data } = await axios.post("https://mernstack-dashboard.onrender.com/api/auth/login", {
        email,
        password,
      }, {
        withCredentials: true,
      });

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      navigate("/");
      if (fetchPosts) fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Logout function
  async function logoutUser(navigate) {
    try {
      const { data } = await axios.get("https://mernstack-dashboard.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      if (data.message) {
        toast.success(data.message);
        setUser(null);
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  // ✅ Update Avatar function
  async function updateAvatar(avatarUrl) {
    try {
      const { data } = await axios.put(
        "https://mernstack-dashboard.onrender.com/api/user/avatar",
        { avatar: avatarUrl },
        {
          withCredentials: true,
        }
      );
      toast.success("Avatar updated successfully");
      setUser(data.user); // update user state with new avatar
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  }

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        isAuth,
        setIsAuth,
        user,
        setUser,
        loading,
        updateAvatar, // ✅ now available throughout the app
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
