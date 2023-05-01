import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {TextureLoader} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const Flight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight - 56);

    const fallbackGeometry = new THREE.BoxGeometry(1, 1, 1);
    const fallbackMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

    let airplane: THREE.Object3D = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
    scene.add(airplane);

    const loader = new GLTFLoader();

    loader.load('/models/airplane.gltf', (gltf) => {
      scene.remove(airplane);
      airplane = gltf.scene;
      airplane.scale.set(4, 4, 4);
      airplane.position.set(0, 0, 0);
      airplane.rotation.y = Math.PI;
      scene.add(airplane);
    });

    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({color: 0x87ceeb, side: THREE.BackSide});
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    const groundGeometry = new THREE.PlaneGeometry(1000, 1000, 32, 32);
    const textureLoader = new TextureLoader();

    const groundTexture = textureLoader.load('/models/textures/d35b3bcc0f4e167983fbe085e8dc0c6c51df006e.jpeg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(50, 50);

    const groundMaterial = new THREE.MeshPhongMaterial({map: groundTexture, side: THREE.DoubleSide});

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -10;
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 56;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!airplane || !ground) return;
      const rotationSpeed = 0.05;
      switch (event.key) {
        case 'ArrowUp':
          airplane.position.y += 1;
          ground.rotation.x -= rotationSpeed;
          break;
        case 'ArrowDown':
          airplane.position.y -= 1;
          ground.rotation.x += rotationSpeed;
          break;
        case 'ArrowLeft':
          airplane.position.x -= 1;
          ground.rotation.z += rotationSpeed;
          break;
        case 'ArrowRight':
          airplane.position.x += 1;
          ground.rotation.z -= rotationSpeed;
          break;
      }
    };

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', handleKeyDown);

    const animate = () => {
      requestAnimationFrame(animate);
      groundTexture.offset.y -= 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-screen h-[calc(100vh - 56px)]"></canvas>;
};

export default Flight;
