import * as React from "react";

import * as ReactDOM from "react-dom";
import { useMousePosition } from "./useMousePosition";
import { Global } from "@emotion/core"
import { Main, css, Styled } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"
import useNavigation from "../hooks/use-navigation"
import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//
var uniforms;
uniforms = {
   time: { value: 1.0 },
   mouseX: { value: 1.0 },
   mouseY: { value: 1.0 }
 };
const style = {
  position: `absolute`,
  width: "100%",
  height: "100%",
  zIndex: 0,
  opacity:"1",
  // background: "white",
};

var timestamp = 1;

      var x = null;
      var y = null;
export class App extends React.Component<{}> {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( 0xffffff, 0);
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref

       // geo.onAfterRender = onAfterRender



  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {


  var vertex = `
  varying vec2 vUv;
              void main()    {
                  vUv = uv;
                  gl_Position = vec4( position, 1.0 );
              }
  `;

  var frag = `varying vec2 vUv;
              uniform float time;
              uniform float mouseX;
              uniform float mouseY;
              float hash(in vec2 p)
              {
                  p = fract(p * vec2(821.35, 356.17));
                  p += dot(p, p+23.5);
                  return fract(p.x*p.y);
              }

              float noise(in vec2 p)
              {
                  vec2 ipos = floor(p);
                  vec2 fpos = fract(p);

                  float a = hash(ipos + vec2(0, 0));
                  float b = hash(ipos + vec2(1, 0));
                  float c = hash(ipos + vec2(0, 1));
                  float d = hash(ipos + vec2(1, 1));

                  vec2 t = smoothstep(0.0, 1.0, fpos);
                  return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
              }

              float fbm(in vec2 p)
              {
                  p += 1.13;

                  float res = 0.0;
                  vec2  m  = vec2(mouseX , mouseY);
                  m*=.0001075;
                  float amp = .64+m.x;
                  float freq = 2.0;
                  for (int i = 0; i < 6; ++i)
                  {
                      res += amp*noise(freq*p);
                      amp *= 0.5;
                      freq *= 2.0;
                  }
                  return res;
              }
              vec3 palette(float t)
              {
                  vec3 a = vec3(1, 1, 1);
                  vec3 b = vec3(0, 0.3, 0);
                  vec3 c = vec3(1, 0.7, 0);
                  vec3 d = vec3(1, 0, 0);

                  if (t < 0.333)
                  {
                      return mix(a, b, 3.0*t);
                  }
                  else if (t < 0.666)
                  {
                      return mix(b, c, 3.0*(t - 0.3333));
                  }
                  else
                  {
                      return mix(c, d, 3.0*(t - 0.6666));
                  }
              }



    void main()	{
      vec2 uv = vUv;


      float x = fbm(uv);
      x = fbm(uv + x - 0.01*time);
      x = fbm(uv + x + 0.03*time);

      vec3 col = palette(x);
      gl_FragColor = vec4(x,x,x,1.0)*1.25;
    //  gl_FragColor = vec4(col,1.0);
    }

  // `;


      document.addEventListener("mousemove", onMouseUpdate, false);
      document.addEventListener("mouseenter", onMouseUpdate, false);

      function onMouseUpdate(e) {
        x = e.pageX;
        y = e.pageY;

      }

      function getMouseX() {
        return x;
      }

      function getMouseY() {
        return y;
      }
    const geo = new THREE.PlaneBufferGeometry(2, 2);
    const geometry = new THREE.CubeGeometry(2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: frag,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.mesh = new THREE.Mesh(geo, mat);

    this.scene.add(this.mesh);
    this.scene.background = new THREE.Color( 0xffffff );
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    timestamp += 0.0095;

    uniforms["time"].value = timestamp;
          uniforms["mouseX"].value = x;
          uniforms["mouseY"].value = y;
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className }: LayoutProps) => {
  const meta = useSiteMetadata()
  const nav = useNavigation()

  return (
    <Styled.root data-testid="theme-root">

      <Global
        styles={css({
          "*": {
            boxSizing: `inherit`,
          },
          body: {
            margin: 0,
            padding: 0,
            boxSizing: `border-box`,
            textRendering: `optimizeLegibility`,
          },
          "::selection": {
            backgroundColor: `primary`,
            color: `background`,
          },
          a: {
            transition: `all 0.3s ease-in-out`,
          },
        })}
      />

      <SEO />
      <App/>
      <Header meta={meta} nav={nav} />

      <Main className={className}>{children}</Main>



    </Styled.root>
  )
}

export default Layout
