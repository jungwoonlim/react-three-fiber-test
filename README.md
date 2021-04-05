# React Three Fiber Test

안녕하세요. 구름 개발자 jCloud 입니다.

## Test의 이유?

React에서 Three.js의 loader들을 사용하던 중 loader를 불러들이지 못하는 이슈가 있었습니다.
이 방법을 해결하려고 알아보던 중 react-three-fiber를 사용하여 loader 이슈를 해결하는 글을 확인하였고, 
Three.js를 사용하는데 큰 도움이 될 것이라 판단하여 공부 겸 테스트를 진행하게 되었습니다.

## react-three-fiber 란?

react-three-fiber는 웹 및 react-native에서 three.js를 사용하는 React 렌더러 입니다.

```
npm install three react-three-fiber
```

[ react-three-fiber | playground ](https://react-three-fiber-website-playground.now.sh/)
[ react-three-fiber | npmjs.com ](https://www.npmjs.com/package/react-three-fiber)
[ react-three-fiber | 자습서 ](https://www.digitalocean.com/community/tutorials/react-react-with-threejs)
[ react-hooks | hooks-section ](https://reactjs.org/docs/hooks-reference.html)

## react-three-fiber

### Canvas
```
<Canvas
  children                      // Threejs jsx elements or regular components
  gl                            // Props that go into the default renderer | or your own renderer
  camera                        // Props that go into the default camera | or your own THREE.Camera
  raycaster                     // Props that go into the default raycaster
  shadows                       // Props that go into gl.shadowMap, can also be set true for PCFsoft
  linear = false                // True by default for automatic sRGB encoding and gamma correction
  vr = false                    // Switches renderer to VR mode, then uses gl.setAnimationLoop
  mode = "blocking"             // React mode: legacy | blocking | concurrent
  resize = undefined            // Resize config, see react-use-measure's options
  orthographic = false          // Creates an orthographic camera if true
  dpr = undefined               // Pixel-ratio, use window.devicePixelRatio, or automatic: [min, max]
  frameloop = "always"          // Render-mode: always | demand | never
  onCreated                     // Callback when vdom is ready
  onPointerMissed />            // Response for pointer clicks that have missed a target
```

## Todo List

- [x] react-three-fiber 기본 샘플 구현
- [x] npmjs에 있는 샘플 다수 구현
- [x] gltf 로드하기
- [ ] playground 확인하며 이론 공부
- [ ] three.js의 Scene, Camera, Light, Mesh, Geometry, Material 다시 공부 
- [ ] hdr 등 캔버스 배경 로드하기