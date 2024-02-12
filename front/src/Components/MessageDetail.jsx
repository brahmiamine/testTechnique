import React from "react";
import moment from "moment";

function MessageDetail({ selectedMessage, messages, user, onShowPreviousMessage, onShowNextMessage }) {
  const messageIndex = selectedMessage ? messages.findIndex((message) => message._id === selectedMessage._id) + 1 : 0;

  /**
   * The function finds the index of the currently selected message in an array of messages, and if the index is greater than
   * 0, it retrieves the previous message and calls a function to display it.
   */
  const handleShowPreviousMessage = () => {
    const currentIndex = messages.findIndex((message) => message._id === selectedMessage._id);
    if (currentIndex > 0) {
      const previousMessage = messages[currentIndex - 1];
      onShowPreviousMessage(previousMessage);
    }
  };

  /**
   * The function finds the index of the currently selected message in an array of messages, and if there is a next message, it
   * calls the `onShowNextMessage` function with the next message as an argument.
   */
  const handleShowNextMessage = () => {
    const currentIndex = messages.findIndex((message) => message._id === selectedMessage._id);
    if (currentIndex < messages.length - 1) {
      const nextMessage = messages[currentIndex + 1];
      onShowNextMessage(nextMessage);
    }
  };

  if (!selectedMessage) {
    return (
      <div className="message-detail">
        <i className="fa-regular fa-envelope" />
      </div>
    );
  }

  return (
    <div className="message-detail">
      <div className="right">
        <div className="box">
          <div className="box1">
            <p className="page-number">
              {messageIndex} sur {messages?.length}
            </p>
            <i className="fa-solid fa-angle-left" onClick={handleShowPreviousMessage}></i>
            <i className="fa-solid fa-angle-right" onClick={handleShowNextMessage}></i>
          </div>
        </div>
        <div className="message-con">
          <div className="con">
            <p className="heading2" style={{ color: "black" }}>
              {selectedMessage.subject}
            </p>
            <p className="heading2">{moment(selectedMessage.createdAt).format("DD MMMM, HH:mm")}</p>
          </div>
          <div className="con1">
            <p className="heading4">
              {selectedMessage.senderName} <span>{selectedMessage.from}</span>
            </p>
            <p className="heading3">
              a <span>{user?.user?.name}</span> {user?.user?.email}
            </p>
            <div className="para2">{selectedMessage.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;
