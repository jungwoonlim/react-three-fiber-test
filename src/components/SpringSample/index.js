import React from "react";
import { useSpring, animated as anime } from "react-spring";
import "./styles.css";

function App() {
  const [greetingStatus, displayGreeting] = React.useState(false);
  const contentprops = useSpring({
    opacity: greetingStatus ? 1 : 0,
    marginTop: greetingStatus ? 0 : -500,
  });

  return (
    <div className="container">
      <div className="button-container">
        <button onClick={() => displayGreeting((a) => !a)} className="button">
          Click here
        </button>
      </div>
      {!greetingStatus ? (
        <div className="Intro">Click button below</div>
      ) : (
        <anime.div className="box" style={contentprops}>
          <h1>Hev there ! React spring is awesome.</h1>
        </anime.div>
      )}
    </div>
  );
}

export default App;
