import { ChatEngine } from "react-chat-engine";

import LoginForm from "./components/LoginForm";
import "./App.css";
import ChatSetter from "./components/ChatSetter";
const projectID = "6bf15b4a-14e7-46a0-b2a3-1e79454e4bdd";

const App = () => {
  if (!localStorage.getItem("username")) return <LoginForm />;

  return (
    <ChatEngine
      height="89vh"
      projectID={projectID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderNewMessageForm={(creds, chatID) => <ChatSetter />}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
    />
  );
};

// infinite scroll, logout, more customizations...

export default App;
