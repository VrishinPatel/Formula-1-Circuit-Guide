import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const TrackVisualization = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add controls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera movements
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10).normalize();
    scene.add(directionalLight);

    // Load the track model
    const loader = new OBJLoader();
    loader.load(
      '/models/F1.obj', // Path relative to the public directory
      (object) => {
        object.scale.set(5, 5, 5); // Increase the scale to make the object larger
        object.position.set(0, 0, 0); // Center the object in the scene

        scene.add(object);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    camera.position.set(0, 0, 50); // Adjust the camera position to fit the object's size

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update(); // Only required if controls.enableDamping = true
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Safely remove the renderer's DOM element
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose of the renderer to release resources
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
};

export default TrackVisualization;
