import React from "react";
import { NewMessageForm } from "react-chat-engine";
import { PlayCircleOutlined, LogoutOutlined } from "@ant-design/icons";
const ChatSetter = () => {
  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    document.location.reload();
  };
  return (
    <>
      <NewMessageForm />
      <form
        className="form__video-button"
        action="https://justvideoit.netlify.app/"
        method="get"
        target="_blank"
      >
        <div className="logout-container">
          <LogoutOutlined className="logout-btn" onClick={logoutHandler} />
          <p onClick={logoutHandler} className="logout-text">
            &nbsp;Logout
          </p>
        </div>
        <button className="button-video">
          <PlayCircleOutlined /> Video Call
        </button>
      </form>
    </>
  );
};

export default ChatSetter;
