import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
import {
  TelegramShareButton,
  EmailShareButton,
  TelegramIcon,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Options = ({ themeValue }) => {
  const [idToCall, setIdToCall] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const {
    call,
    callAccepted,
    // myVideo,
    // userVideo,
    // stream,
    name,
    setName,
    // shareScreen,
    // callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    // otherUser,
    setOtherUser,
    leaveCall1,
    Record,
    isPresenting,
  } = useContext(VideoContext);

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall, callAccepted, call.from, setOtherUser]);

  return (
    <div>
      {callAccepted ? (
        <div className={classes.hungupbutton}>
          <Button
            variant="contained"
            onClick={leaveCall}
            className={classes.hang}
          >
            <img src={Hang} alt="hang up" style={{ height: "15px" }} />
            &nbsp; Hang up
          </Button>
          {isPresenting ? (
            <Button
              variant="contained"
              className={classes.record}
              id="stoprecord"
            >
              Stop Record
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={Record}
              className={classes.record}
              //  id="record"
            >
              Record
            </Button>
          )}

          {/* <---CHANGE THEME---> */}
        </div>
      ) : (
        <div
          className={`${classes.options} ${
            themeValue && classes.options__dark
          }`}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <h2 style={{ color: "#1890ff" }}>Username</h2>
            <Input
              size="large"
              placeholder="Your name"
              prefix={<UserOutlined />}
              maxLength={15}
              suffix={<small>{name.length}/15</small>}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                localStorage.setItem("name", e.target.value);
              }}
              className={classes.inputgroup}
            />

            <div className={classes.share_options}>
              <CopyToClipboard text={me}>
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  className={classes.btn}
                  tabIndex="0"
                  onClick={() => message.success("Code copied successfully!")}
                >
                  Meeting code
                </Button>
              </CopyToClipboard>

              {/* <---SHARE MEETING CODE ---> */}

              <div className={classes.share_social}>
                <WhatsappShareButton
                  url={`https://justvideoit.netlify.app/`}
                  title={`Join this meeting with the given code ${me}\n`}
                  separator="Link: "
                  className={classes.share_icon}
                >
                  <WhatsappIcon size={26} round />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={`https://justvideoit.netlify.app/\n Join this meeting with the given code ${me}\n`}
                  separator="Link: "
                  className={classes.share_icon}
                >
                  <TelegramIcon size={26} round />
                </TelegramShareButton>

                <EmailShareButton
                  url={`https://justvideoit.netlify.app/\n Join this meeting with the given code ${me}\n`}
                  separator="Link"
                  className={classes.share_icon}
                >
                  <EmailIcon size={26} round />
                </EmailShareButton>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <h2 style={{ color: "#1890ff" }}>New Meeting</h2>

            <Input
              placeholder="Enter a code "
              size="large"
              className={classes.inputgroup}
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter code of the other user">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />

            <div className={classes.btnParent}>
              <Button
                type="primary"
                icon={<PhoneOutlined />}
                onClick={() => {
                  if (name.length) callUser(idToCall);
                  else message.error("Please enter your name to call!");
                }}
                className={classes.btn}
                tabIndex="0"
              >
                Join
              </Button>
            </div>
          </div>

          {call.isReceivingCall && !callAccepted && (
            <>
              <audio src={Teams} loop ref={Audio} />
              <Modal
                title="Incoming Call"
                visible={isModalVisible}
                onOk={() => showModal(false)}
                onCancel={handleCancel}
                footer={null}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h1>
                    {call.name} is calling you:{" "}
                    <img
                      src={Phone}
                      alt="phone ringing"
                      className={classes.phone}
                      style={{ display: "inline-block" }}
                    />
                  </h1>
                </div>
                <div className={classes.btnDiv}>
                  <Button
                    variant="contained"
                    className={classes.answer}
                    color="#29bb89"
                    icon={<PhoneOutlined />}
                    onClick={() => {
                      answerCall();
                      Audio.current.pause();
                    }}
                    tabIndex="0"
                  >
                    Answer
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.decline}
                    icon={<PhoneOutlined />}
                    onClick={() => {
                      setIsModalVisible(false);
                      Audio.current.pause();
                    }}
                    tabIndex="0"
                  >
                    Decline
                  </Button>
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Options;
