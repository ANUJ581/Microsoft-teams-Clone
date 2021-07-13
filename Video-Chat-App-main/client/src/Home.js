import { useState } from "react";

import Video from "./components/Video/Video";
import VideoState from "./context/VideoState";
import AppHeader from "./components/AppHeader/AppHeader";
import Options from "./components/options/Options";

const Home = () => {
  const [theme, setTheme] = useState(false);
  const [filter, setFilter] = useState("none");

  const themeHandler = (checked) => {
    setTheme(checked);
  };
  const filterHandler = (e) => {
    setFilter(e.item.props.value);
  };

  return (
    <VideoState filter={filter}>
      <div className="App" style={{ height: "100%", width: "100%" }}>
        <AppHeader
          themeHandler={themeHandler}
          themeValue={theme}
          filterHandler={filterHandler}
        />
        <Video filter={filter} />
        <Options themeValue={theme} />
      </div>
    </VideoState>
  );
};

export default Home;
