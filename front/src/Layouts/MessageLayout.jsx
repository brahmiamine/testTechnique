import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { GlobalContext } from "../Context/Global";
import { getMyOwnMessage, sendMessage, setMessageRead } from "../Services/MessageApi";
import { useUser } from "../Auth/useUser";
import moment from "moment";
import Header from "../Components/Shared/Header";
import MessageForm from "../Components/MessageForm";
import MessageItem from "../Components/MessageItem";
import MessageDetail from "../Components/MessageDetail";

const socket = io(process.env.REACT_APP_BASE_URL);

function MessageLayout() {
  const { messages, setMessages } = useContext(GlobalContext);
  const user = useUser();
  const userEmail = user?.user?.email;
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  const [initialMessages, setInitialMessages] = useState([]);
  const [showUnread, setShowUnread] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  useEffect(() => {
    if (!showUnread) {
      setInitialMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    getMyOwnMessage(user?.user?.email).then((response) => {
      setMessages(response?.data);
    });
  }, []);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL);

    if (userEmail) {
      socket.emit("registerEmail", userEmail);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [msg, ...prevMessages]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.close();
    };
  }, [userEmail]);

  /**
   * The function toggleMessage toggles the visibility of the left component.
   */
  const toggleMessage = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  /**
   * The function sends a message with a subject, content, and
   * recipient email address, and updates the state to indicate that the
   * user is no longer composing a message.
   */
  const handleSendMessage = (subject, content, toEmail, userEmail) => {
    if (subject.trim() && content.trim() && toEmail && userEmail) {
      const message = { subject, content, from: userEmail, to: toEmail, createdAt: moment().format("YYYY-MM-DD HH:mm:ss") };
      socket.emit("sendMessage", message);
      sendMessage(subject, content, toEmail, userEmail).then((res) => {
        setIsComposing(false);
      });
    }
  };

  /**
   * The function  updates the state variables `showUnread` and `messages` based on the value of a checkbox.
   */
  const handleCheckboxChange = (e) => {
    setShowUnread(e.target.checked);
    if (e.target.checked) {
      setMessages(messages.filter((message) => !message.isRead));
    } else {
      setMessages(initialMessages);
    }
  };

  /**
   * The function
   * updates the read status of a message, sets the selected message, and toggles the composing state.
   */
  const selectMessage = (msg, index) => {
    if (msg.isRead === false) {
      setMessageRead(msg._id);
    }
    setMessages((prevMessages) => prevMessages.map((msg, msgIndex) => (msgIndex === index ? { ...msg, isRead: true } : msg)));
    setSelectedMessage(messages[index]);
    setIsComposing(false);
  };

  /**
   * The function  sets the state variables `isComposing` to true and `selectedMessage` to undefined, and
   *  calls the `toggleMessage` function.
   */
  const handleComposeNewMessage = () => {
    setIsComposing(true);
    setSelectedMessage(undefined);
    if (window.innerWidth <= 480) {
      toggleMessage();
    }
  };

  /**
   * The function `onShowPreviousMessage` sets the selected message to the previous message.
   */
  const onShowPreviousMessage = (previousMessage) => {
    setSelectedMessage(previousMessage);
  };

  /**
   * The function `onShowNextMessage` updates the selected message with the next message.
   */
  const onShowNextMessage = (nextMessage) => {
    setSelectedMessage(nextMessage);
  };

  return (
    <div>
      <Header></Header>
      <i className="fa-solid fa-bars toggle-menu" onClick={toggleMessage} />
      <div className="body">
        <div className="main">
          <i className="fa-solid fa-bar" />

          {isLeftVisible && (
            <div className="left">
              <div className="boite">
                <div className="one">Boite de reception (96)</div>
                <div className="two">
                  <input type="checkbox" id="checkbox" checked={showUnread} onChange={handleCheckboxChange} />
                  <p className="Afficher">Afficher uniquement les mails non-lus</p>
                </div>
              </div>
              {messages?.map((msg, index) => (
                <MessageItem key={index} msg={msg} index={index} selectMessage={selectMessage} userEmail={userEmail} toggleMessage={toggleMessage} />
              ))}

              <div style={{ textAlign: "center" }}>
                <button className="connecter" onClick={handleComposeNewMessage}>
                  Composer
                </button>
              </div>
            </div>
          )}
          <div className="right">
            {isComposing ? (
              <div className="right">
                <div className="message-compose">
                  <MessageForm onSendMessage={handleSendMessage} userEmail={userEmail} toggleMessage={toggleMessage} />
                </div>
              </div>
            ) : selectedMessage !== undefined ? (
              <MessageDetail
                selectedMessage={selectedMessage}
                messages={messages}
                user={user}
                onShowPreviousMessage={onShowPreviousMessage}
                onShowNextMessage={onShowNextMessage}
              />
            ) : (
              <i className="fa-regular fa-envelope" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageLayout;
