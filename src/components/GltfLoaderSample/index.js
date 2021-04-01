import { useEffect } from "react";
import Loader from "./Loader";

function App() {
  useEffect(() => {
    const data = new Loader();
    data.init();
    data.render();
  });
  return <div id="canvas"></div>;
}

export default App;
