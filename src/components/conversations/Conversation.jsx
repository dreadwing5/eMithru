import "./conversation.css";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation({ conversation }) {
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <span className="conversationName">{conversation._id}</span>
    </div>
  );
}
