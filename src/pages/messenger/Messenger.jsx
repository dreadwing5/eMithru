import './messenger.css';

import { io } from 'socket.io-client';
import axios from 'axios';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { BASE_URL, SOCKET_URL } from '../../config';

import Navbar from '../../components/navbar/Navbar';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        senderId: data.sender,
        text: data.text,
        sendTime: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getCustomerConversation = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/conversations/${user.data.user.userID}`
        );
        setCurrentChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getConversations = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/conversations/`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    user.data.user.role === 'agent'
      ? getConversations()
      : getCustomerConversation();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/messages/${currentChat?.conversationId}`
        );
        setMessages(res.data);
        currentChat &&
          socket.current.emit('join_room', currentChat.conversationId);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    return () => {
      socket.current.emit('leave_room', currentChat?.conversationId);
    };
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user.data.user.userID,
      text: newMessage,
      conversationId: currentChat.conversationId,
    };
    socket.current.emit('sendMessage', {
      sender: user.data.user.userID,
      text: newMessage,
      room: currentChat.conversationId,
    });

    try {
      const res = await axios.post(`${BASE_URL}/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className='messenger'>
        {user.data.user.role === 'agent' && (
          <div className='chatMenu'>
            <div className='chatMenuWrapper'>
              <input placeholder='Search for Users' className='chatMenuInput' />
              {conversations.map((c, i) => (
                <div key={i} onClick={() => setCurrentChat(c)}>
                  <Conversation key={i} conversation={c} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat && (
              <>
                <div className='chatBoxTop'>
                  {messages.map((m, i) => (
                    <div key={i} ref={scrollRef}>
                      <Message
                        key={i}
                        message={m}
                        own={m.senderId === user.data.user.userID}
                      />
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='chatBoxBottom'>
                    <input
                      className='chatMessageInput'
                      placeholder='write something...'
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    />
                    <button className='chatSubmitButton'>Send</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
