import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import Scrollbar from "../Scrollbar";
import ChatMessageItem from "./ChatMessageItem";

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default function ChatMessageList({ conversation }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{ ref: scrollRef }}
        sx={{ p: 3, height: 1 }}
      >
        {conversation.messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            conversation={conversation}
          />
        ))}
      </Scrollbar>
    </>
  );
}
