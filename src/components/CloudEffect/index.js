import { Component } from "react";
import CloudEffect from "./CloudEffect";

class App extends Component {
  componentDidMount() {
    const backgroundEffect = new CloudEffect();
    backgroundEffect.startEffect();
  }

  render() {
    return (
      <div className="ImageArea fixed">
        <div
          className="CloudEffect absolute top-0 left-0 z-10"
          id="CloudEffect"
        ></div>
      </div>
    );
  }
}

export default App;
