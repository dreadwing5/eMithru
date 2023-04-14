import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import Scrollbar from "../Scrollbar";
import ChatMessageItem from "./ChatMessageItem";

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default function ChatMessageList({ conversation, messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom();
    }
  }, [conversation.messages]);

  return (
    <>
      <Scrollbar sx={{ p: 3 }} ref={scrollRef}>
        {messages.map((message) => (
          <ChatMessageItem
            key={message._id}
            message={message}
            conversation={conversation}
          />
        ))}
      </Scrollbar>
    </>
  );
}
