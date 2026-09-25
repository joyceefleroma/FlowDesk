import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const WorkflowUniverseCanvas = ({ scrollProgress = 0 }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.02);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 65 : 50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Desktop: Shift camera slightly left so the 3D network sits on the right side of the screen
    camera.position.set(isMobile ? 0 : -2, 2, isMobile ? 26 : 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const universeGroup = new THREE.Group();
    // Offset network toward right on desktop to align beside hero text
    if (!isMobile) {
      universeGroup.position.set(6.5, 0, 0);
    }
    scene.add(universeGroup);

    // 2. Lighting (Red + Warm Gold + Crisp White)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const amberGoldLight = new THREE.PointLight(0xfbbf24, 4.0, 50);
    amberGoldLight.position.set(8, 6, 8);
    scene.add(amberGoldLight);

    const redAccentLight = new THREE.PointLight(0xef4444, 3.5, 45);
    redAccentLight.position.set(-8, -5, 6);
    scene.add(redAccentLight);

    const whiteCoreLight = new THREE.PointLight(0xffffff, 2.5, 35);
    whiteCoreLight.position.set(0, 4, 10);
    scene.add(whiteCoreLight);

    // 3. Subtle Digital Coordinate Grid
    const gridHelper = new THREE.GridHelper(100, 50, 0xf59e0b, 0x1f140e);
    gridHelper.position.y = -10;
    gridHelper.material.opacity = 0.12;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // 4. Central Workflow Network Hierarchy (Flow Engine at Center with Red + Yellow + White Palette)
    const nodeDefinitions = [
      // Central Flow Engine Node (Primary Focal Point: Warm Radiant Gold)
      { id: 'engine', name: 'Flow Engine', pos: new THREE.Vector3(0, 0, 0), color: 0xfbbf24, size: isMobile ? 1.4 : 1.8, isCenter: true },
      // Core Workflow Pipeline Nodes
      { id: 'trigger', name: 'Trigger', pos: new THREE.Vector3(-6, 3.5, 1), color: 0xef4444, size: 1.1 },
      { id: 'condition', name: 'Condition', pos: new THREE.Vector3(-1, -4.5, 2), color: 0xf59e0b, size: 1.0 },
      { id: 'action', name: 'Action', pos: new THREE.Vector3(6, 3, -1), color: 0xdc2626, size: 1.15 },
      { id: 'automation', name: 'Automation', pos: new THREE.Vector3(6.5, -3.5, 1.5), color: 0xfcd34d, size: 1.0 },
      { id: 'notification', name: 'Notification', pos: new THREE.Vector3(10, 0.5, -2), color: 0xffffff, size: 0.9 },
      { id: 'task', name: 'Task', pos: new THREE.Vector3(-6.5, -2.5, -2), color: 0xfef08a, size: 0.95 },
    ];

    const nodesGroup = new THREE.Group();
    universeGroup.add(nodesGroup);

    const nodeMeshes = [];

    nodeDefinitions.forEach((def) => {
      // Core Node Sphere
      const geometry = new THREE.IcosahedronGeometry(def.size, def.isCenter ? 3 : 2);
      const material = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: def.isCenter ? 0.95 : 0.65,
        roughness: 0.15,
        metalness: 0.85,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(def.pos);

      // Outer Wireframe Halo
      const haloGeo = new THREE.IcosahedronGeometry(def.size * 1.35, 1);
      const haloMat = new THREE.MeshBasicMaterial({
        color: def.color,
        wireframe: true,
        transparent: true,
        opacity: def.isCenter ? 0.5 : 0.25,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(haloMesh);

      // Orbiting Equatorial Ring
      const ringGeo = new THREE.RingGeometry(def.size * 1.45, def.size * 1.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: def.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: def.isCenter ? 0.4 : 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      mesh.add(ringMesh);

      nodesGroup.add(mesh);
      nodeMeshes.push({ mesh, halo: haloMesh, ring: ringMesh, basePos: def.pos.clone(), def });
    });

    // 5. Connection Lines & Splines
    const connections = [
      ['task', 'trigger'],
      ['trigger', 'engine'],
      ['condition', 'engine'],
      ['engine', 'action'],
      ['engine', 'automation'],
      ['action', 'notification'],
      ['automation', 'notification'],
      ['trigger', 'condition'],
    ];

    const connectionCurves = [];
    const tubesGroup = new THREE.Group();
    universeGroup.add(tubesGroup);

    connections.forEach(([startId, endId]) => {
      const startNode = nodeDefinitions.find((n) => n.id === startId);
      const endNode = nodeDefinitions.find((n) => n.id === endId);
      if (!startNode || !endNode) return;

      const midPoint = new THREE.Vector3()
        .addVectors(startNode.pos, endNode.pos)
        .multiplyScalar(0.5);
      midPoint.y += (Math.random() - 0.5) * 1.8;
      midPoint.z += (Math.random() - 0.5) * 1.5;

      const curve = new THREE.QuadraticBezierCurve3(startNode.pos, midPoint, endNode.pos);
      connectionCurves.push(curve);

      // Glowing tube connection in warm gold
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.045, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.3,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubesGroup.add(tubeMesh);
    });

    // 6. Flowing Signal Data Pulses
    const pulseCount = isMobile ? 12 : 20;
    const pulseGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const pulses = [];
    for (let i = 0; i < pulseCount; i++) {
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      const curveIndex = i % connectionCurves.length;
      universeGroup.add(pulseMesh);
      pulses.push({
        mesh: pulseMesh,
        curve: connectionCurves[curveIndex],
        progress: (i / pulseCount) + Math.random() * 0.1,
        speed: 0.0025 + Math.random() * 0.002,
      });
    }

    // 7. Ambient Particle Dust (Red + Gold/Yellow + White)
    const particleCount = isMobile ? 120 : 260;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colGold = new THREE.Color(0xfbbf24);
    const colRed = new THREE.Color(0xef4444);
    const colWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 60;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 40;

      const mixed = Math.random() > 0.6 ? colWhite : Math.random() > 0.3 ? colGold : colRed;
      particleColors[i3] = mixed.r;
      particleColors[i3 + 1] = mixed.g;
      particleColors[i3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    universeGroup.add(particleSystem);

    // 8. Mouse & Scroll Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = isMobile ? 0 : -2;
    let targetCameraY = 2;

    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mobile = window.innerWidth < 1024;
      camera.aspect = w / h;
      camera.fov = mobile ? 65 : 50;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const s = scrollRef.current || 0;

      // Parallax smooth interpolation
      targetCameraX = (isMobile ? 0 : -2) + mouseX * 2.0;
      targetCameraY = 2 - mouseY * 1.5 - s * 10;

      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;
      camera.position.z = (isMobile ? 26 : 24) - s * 6;
      camera.lookAt(isMobile ? 0 : 3, -s * 5, 0);

      // Slow orbital rotation
      if (!prefersReducedMotion) {
        universeGroup.rotation.y = elapsedTime * 0.025 + s * 1.2;
        particleSystem.rotation.y = -elapsedTime * 0.01;

        // Node Levitation & Halo Pulse
        nodeMeshes.forEach((item, index) => {
          const offset = index * 0.9;
          const amp = item.def.isCenter ? 0.25 : 0.35;
          item.mesh.position.y = item.basePos.y + Math.sin(elapsedTime * 1.2 + offset) * amp;
          item.halo.rotation.x = elapsedTime * 0.3 + offset;
          item.halo.rotation.y = elapsedTime * 0.4;
          item.ring.rotation.z = -elapsedTime * 0.35;
        });

        // Pulse Traversal
        pulses.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
          const point = p.curve.getPoint(p.progress);
          p.mesh.position.copy(point);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.92 }}
      aria-hidden="true"
    />
  );
};

