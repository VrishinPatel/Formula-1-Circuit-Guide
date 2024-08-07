import React, { useRef, useEffect } from 'react';
import Globe from 'three-globe';
import * as THREE from 'three';

const GlobeVisualization = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Ensure that the mountRef.current is not null before proceeding
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const globe = new Globe();
    globe.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg');
    globe.pointsData([
      { lat: 43.7347, lng: 7.4205, size: 0.5, color: 'red', raceName: 'Monaco Grand Prix', history: 'The Monaco Grand Prix is one of the oldest and most prestigious races in Formula 1.' },
      { lat: 52.0786, lng: -1.0169, size: 0.5, color: 'red', raceName: 'Silverstone Grand Prix', history: 'Silverstone is the home of British motorsport, hosting the first F1 race in 1950.' }
      // Add more races with coordinates
    ]);
    globe.pointAltitude(0.1);
    globe.pointColor('color');

    scene.add(globe);

    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 250;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(globe.children, true);

      if (intersects.length > 0) {
        const point = intersects[0].object.userData;
        alert(`Race: ${point.raceName}\nHistory: ${point.history}`);
      }
    };

    window.addEventListener('click', onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.001; // Rotate the globe
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Safely remove the renderer's DOM element
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('click', onMouseClick);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
};

export default GlobeVisualization;
