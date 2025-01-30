import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface PropType {
  objPath: string;
  parentId: string;
}

const useThree = ({ objPath, parentId }: PropType) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const loader = new GLTFLoader();
  let obj;
  loader.load(
    objPath,
    function (gltf) {
      obj = gltf.scene;
      obj.position.set(0, 0, 0);
      obj.scale.set(0.2, 0.2, 0.2);

      // Set the mesh to cast shadows
      obj.traverse((child) => {
        if (child.isObject3D) {
          // child.castShadow = true;
          // child.receiveShadow = true;
        }
      });

      scene.add(obj);

      renderer.render(scene, camera);
    },
    function (xhr) {
      console.log(((xhr.loaded / xhr.total) * 100).toFixed(0) + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );

  // Adding a ground mesh
  const groundGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
  groundGeometry.rotateX(-Math.PI / 2);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide,
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.position.set(0, -0.7, 0);
  // groundMesh.castShadow = true;
  // groundMesh.receiveShadow = true;
  // scene.add(groundMesh);

  // Adding light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.background = new THREE.Color("green")
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 50);
  directionalLight.position.set(10, 50, 10);
  // directionalLight.castShadow = true;
  scene.add(directionalLight);

  const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
  spotLight.position.set(0, 25, 0);
  scene.add(spotLight);

  camera.position.set(3, 5, 3);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Setting up the renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setPixelRatio(window.devicePixelRatio);

  // To enable shadows
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Set the orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.minDistance = 3;
  controls.maxDistance = 50;
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = 2.5;
  controls.autoRotate = false;
  controls.target = new THREE.Vector3(0, 0, 0);
  controls.update();

  useEffect(() => {
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    const canvasParent = document.getElementById(parentId);
    renderer.domElement.style.cursor = "grab";

    if (canvasParent?.children[0]?.nodeName === "CANVAS") {
      canvasParent.removeChild(canvasParent?.children[0]);
      canvasParent.appendChild(renderer.domElement);
    } else {
      canvasParent?.appendChild(renderer.domElement);
    }
  }, []);

  useEffect(() => {
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    // renderer.setAnimationLoop(animate);

    if (WebGL.isWebGL2Available()) {
      // Initiate function or other initializations here
      animate();
    } else {
      const warning = WebGL.getWebGL2ErrorMessage();
      document.getElementById(parentId)?.appendChild(warning);
    }

    function sum(a: number) {
      return (b: number) => {
        return (c: number) => {
          return a + b + c;
        };
      };
    }

    const sum1 = sum(1);
    const sum2 = sum1(2);

    const IsDivisible = (test: number) => (num: number) => num % test === 0;
    const testNos = [1, 2, 3, 4, 5, 6];
    console.log(testNos.filter(IsDivisible(2)));
  }, []);

  return;
};

export default useThree;
