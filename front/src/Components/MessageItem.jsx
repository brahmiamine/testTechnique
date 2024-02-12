import React from "react";
import { formatDate, getNextPart, truncate } from "../Utils/FunctionUtils";

function MessageItem({ msg, index, selectMessage, userEmail, toggleMessage }) {
  /**
   * The handleClickMessage function selects a message and toggles its visibility if the window width is less than or equal to 480 pixels.
   */
  const handleClickMessage = () => {
    selectMessage(msg, index);
    if (window.innerWidth <= 480) {
      toggleMessage();
    }
  };

  return (
    <div className="message" onClick={handleClickMessage}>
      <div className={msg.isRead ? "readed" : "unread"} />
      <div className="name-para">
        <div className="name">{msg.from === userEmail ? "moi" : msg.senderName}</div>
        <div className="message-preview">
          {truncate(msg.content, 60)}
          <br />
          {getNextPart(msg.content, 60, 10)}
        </div>
      </div>
      <div className="time">{formatDate(msg.createdAt)}</div>
    </div>
  );
}

export default MessageItem;
