import { useState, useEffect } from "react";
import axios from "axios";

const useUnreadNotifications = () => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications/unread");
        setUnreadNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    };

    fetchUnreadNotifications();
  }, []);

  const markAllAsRead = () => {
    setUnreadNotifications(
      unreadNotifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return { unreadNotifications, markAllAsRead };
};

export default useUnreadNotifications;
