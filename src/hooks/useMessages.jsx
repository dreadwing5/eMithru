import { useState, useEffect } from "react";
import api from "./api";

const conversationConfig = {
  group: {
    endpoint: (id) => `/groups/${id}/messages`,
    messageProps: (id) => ({ groupId: id }),
  },
  thread: {
    endpoint: (id) => `/threads/${id}/messages`,
    messageProps: (id) => ({ threadId: id }),
  },
  private: {
    endpoint: (id) => `/messages/${id}?type=private`,
    messageProps: () => ({}),
  },
};

const useMessages = (conversationType, conversationId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { endpoint } = conversationConfig[conversationType];
    const fetchMessages = async () => {
      try {
        const response = await api.get(endpoint(conversationId));
        const { data } = response.data;
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [conversationType, conversationId]);

  const sendMessage = async (newMessage) => {
    const { endpoint, messageProps } = conversationConfig[conversationType];
    const message = {
      body: newMessage,
      ...messageProps(conversationId),
    };

    try {
      const response = await api.post(endpoint(conversationId), message);
      const { data } = response.data;
      setMessages([...messages, data.message]);
    } catch (err) {
      console.log(err);
    }
  };

  return { messages, sendMessage };
};

export default useMessages;
