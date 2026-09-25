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

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080204, 0.018);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group to hold entire dynamic universe
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff1e42, 3, 50);
    redLight.position.set(-10, 8, 10);
    scene.add(redLight);

    const whiteLight = new THREE.PointLight(0xffffff, 2, 40);
    whiteLight.position.set(10, -5, 10);
    scene.add(whiteLight);

    const backGlowLight = new THREE.PointLight(0xe11d48, 2, 60);
    backGlowLight.position.set(0, -10, -15);
    scene.add(backGlowLight);

    // 2. Perspective Digital Grid Floor
    const gridHelper = new THREE.GridHelper(120, 60, 0xff1e42, 0x330810);
    gridHelper.position.y = -12;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    universeGroup.add(gridHelper);

    // Top subtle coordinate ceiling grid
    const topGrid = new THREE.GridHelper(120, 60, 0xffffff, 0x1f060c);
    topGrid.position.y = 22;
    topGrid.material.opacity = 0.15;
    topGrid.material.transparent = true;
    universeGroup.add(topGrid);

    // 3. Workflow Nodes Setup (TRIGGER -> CONDITION -> ACTION -> RESULT)
    const nodeDefinitions = [
      { id: 'trigger', name: 'Trigger', pos: new THREE.Vector3(-14, 4, 0), color: 0xff1e42, size: 1.4 },
      { id: 'condition', name: 'Condition', pos: new THREE.Vector3(-4, -1, 4), color: 0xff4d6d, size: 1.2 },
      { id: 'action', name: 'Action', pos: new THREE.Vector3(6, 3, 2), color: 0xe11d48, size: 1.3 },
      { id: 'result', name: 'Automation Log', pos: new THREE.Vector3(15, -2, -3), color: 0xffffff, size: 1.1 },
      
      // Secondary supporting branch nodes
      { id: 'filter', name: 'Priority Gate', pos: new THREE.Vector3(-2, 7, -5), color: 0xff3355, size: 0.9 },
      { id: 'alert', name: 'In-App Alert', pos: new THREE.Vector3(8, -6, 5), color: 0xff758f, size: 0.85 },
      { id: 'telemetry', name: 'Telemetry Stream', pos: new THREE.Vector3(18, 5, -8), color: 0xffffff, size: 0.95 },
    ];

    const nodesGroup = new THREE.Group();
    universeGroup.add(nodesGroup);

    const nodeMeshes = [];

    nodeDefinitions.forEach((def) => {
      // Core glowing sphere
      const geometry = new THREE.IcosahedronGeometry(def.size, 2);
      const material = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
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
        opacity: 0.35,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(haloMesh);

      // Pulsing Glow Ring
      const ringGeo = new THREE.RingGeometry(def.size * 1.5, def.size * 1.7, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: def.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      mesh.add(ringMesh);

      nodesGroup.add(mesh);
      nodeMeshes.push({ mesh, halo: haloMesh, ring: ringMesh, basePos: def.pos.clone(), def });
    });

    // 4. Connecting Workflow Energy Paths (Curves)
    const connections = [
      ['trigger', 'condition'],
      ['condition', 'action'],
      ['action', 'result'],
      ['condition', 'filter'],
      ['filter', 'action'],
      ['action', 'alert'],
      ['result', 'telemetry'],
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
      midPoint.y += (Math.random() - 0.5) * 4;
      midPoint.z += (Math.random() - 0.5) * 3;

      const curve = new THREE.QuadraticBezierCurve3(startNode.pos, midPoint, endNode.pos);
      connectionCurves.push(curve);

      // Glowing tube line
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.06, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xff1e42,
        transparent: true,
        opacity: 0.28,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubesGroup.add(tubeMesh);
    });

    // 5. Data Flow Signal Pulses (Travelling along curves)
    const pulseCount = 24;
    const pulseGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const pulses = [];
    for (let i = 0; i < pulseCount; i++) {
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      const curveIndex = i % connectionCurves.length;
      scene.add(pulseMesh);
      pulses.push({
        mesh: pulseMesh,
        curve: connectionCurves[curveIndex],
        progress: (i / pulseCount) + Math.random() * 0.1,
        speed: 0.003 + Math.random() * 0.003,
      });
    }

    // 6. Floating Constellation Data Particles
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xff1e42);
    const c2 = new THREE.Color(0xffffff);
    const c3 = new THREE.Color(0xe11d48);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 90;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 60;

      const mixedColor = Math.random() > 0.6 ? c2 : Math.random() > 0.3 ? c1 : c3;
      particleColors[i3] = mixedColor.r;
      particleColors[i3 + 1] = mixedColor.g;
      particleColors[i3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    universeGroup.add(particleSystem);

    // 7. Mouse & Scroll Interaction Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 5;

    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Main Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Scroll choreography transition
      const s = scrollRef.current || 0;

      // Parallax smooth interpolation
      targetCameraX = mouseX * 3.5;
      targetCameraY = 5 - mouseY * 2.5 - s * 14;

      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.position.z = 28 - s * 8;
      camera.lookAt(0, -s * 6, 0);

      // Rotate entire universe slowly
      if (!prefersReducedMotion) {
        universeGroup.rotation.y = elapsedTime * 0.03 + s * 1.5;
        particleSystem.rotation.y = -elapsedTime * 0.015;
      }

      // Animate workflow nodes (levitation & halo pulse)
      nodeMeshes.forEach((item, index) => {
        const offset = index * 1.2;
        if (!prefersReducedMotion) {
          item.mesh.position.y = item.basePos.y + Math.sin(elapsedTime * 1.5 + offset) * 0.4;
          item.halo.rotation.x = elapsedTime * 0.4 + offset;
          item.halo.rotation.y = elapsedTime * 0.6;
          item.ring.rotation.z = -elapsedTime * 0.5;
          item.ring.scale.setScalar(1 + Math.sin(elapsedTime * 2 + offset) * 0.1);
        }
      });

      // Animate signal pulses travelling along workflow pipelines
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const point = p.curve.getPoint(p.progress);
        p.mesh.position.copy(point);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
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
      style={{ opacity: 0.88 }}
      aria-hidden="true"
    />
  );
};
