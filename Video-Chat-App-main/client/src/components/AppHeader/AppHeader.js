import React, { useContext, useState, useEffect } from "react";
import { Menu, Dropdown, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classes from "./AppHeader.module.css";
import "antd/dist/antd.css";
import VideoContext from "../../context/VideoContext";
const AppHeader = ({ themeValue, themeHandler, filterHandler }) => {
  const { callAccepted } = useContext(VideoContext);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [calltime, setCallTime] = useState({ s: 0, m: 0, h: 0 });
  let updatedS = calltime.s,
    updatedM = calltime.m,
    updatedH = calltime.h;

  // <---REAL TIME DIGITAL CLOCK--->
  const updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };
  if (!callAccepted) {
    setInterval(updateTime, 1000);
  }
  //<--CALL DURATION --->
  useEffect(() => {
    if (callAccepted) {
      const run = () => {
        if (updatedM === 60) {
          updatedH++;
          updatedM = 0;
        }
        if (updatedS === 60) {
          updatedM++;
          updatedS = 0;
        }
        updatedS++;
        setCallTime({ s: updatedS, m: updatedM, h: updatedH });
      };
      setInterval(run, 1000);
    }
  }, [callAccepted]);

  //<--FILTERS--->

  const menu = (
    <Menu>
      <Menu.Item onClick={filterHandler} value="none">
        Normal
      </Menu.Item>
      <Menu.Item onClick={filterHandler} value="grayscale(100%)">
        Grayscale
      </Menu.Item>
      <Menu.Item onClick={filterHandler} value="sepia(100%)">
        Sepia
      </Menu.Item>
      <Menu.Item onClick={filterHandler} value="invert(100%)">
        Invert
      </Menu.Item>

      <Menu.Item onClick={filterHandler} value="hue-rotate(90deg)">
        Hue
      </Menu.Item>
      <Menu.Item onClick={filterHandler} value="contrast(200%)">
        Contrast
      </Menu.Item>
    </Menu>
  );

  const onToggle = (checked) => {
    themeHandler(checked);
  };
  // eslint-disable-next-line no-lone-blocks
  {
    if (themeValue) document.body.style.backgroundColor = "#303030";
    else document.body.style.backgroundColor = "#a5a5a57a";
  }
  return (
    <header
      className={`${classes.header} ${themeValue && classes.header__dark}`}
    >
      <Dropdown overlay={menu}>
        <span
          className={`ant-dropdown-link ${classes.nav} `}
          onClick={(e) => e.preventDefault()}
        >
          Filter <DownOutlined />
        </span>
      </Dropdown>
      {!callAccepted && <div style={{ fontSize: "17px" }}>Time: {time}</div>}

      {callAccepted && (
        <div style={{ fontSize: "17px" }}>
          <span>Call Duration: </span>
          <span>{updatedH}</span>&nbsp;:&nbsp;
          <span>{updatedM}</span>&nbsp;:&nbsp;
          <span>{updatedS}</span>
        </div>
      )}
      <Switch
        onChange={onToggle}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </header>
  );
};

export default AppHeader;
