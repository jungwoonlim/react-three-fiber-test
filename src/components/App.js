// import FirstSample from "./FirstSample";
import SecondSample from "./SecondSample";
// import GltfLoaderSample from "./GltfLoaderSample";
// import SpringSample from "./SpringSample";
// import CloudEffect from "./CloudEffect";

import styled from "styled-components";

const Home = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <Home className="App">
      {/* <FirstSample /> */}
      <SecondSample />
      {/* <GltfLoaderSample /> */}
      {/* <SpringSample /> */}
      {/* <CloudEffect /> */}
    </Home>
  );
}

export default App;
