import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Sun, Moon, RotateCcw, Maximize2, Sparkles } from 'lucide-react';

interface Hero3DCanvasProps {
  className?: string;
}

type CameraViewPreset = 'photo' | 'skylight' | 'chair' | 'orbit';
type LightingMode = 'day' | 'ambient';

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeView, setActiveView] = useState<CameraViewPreset>('photo');
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');
  const [isInteracting, setIsInteracting] = useState(false);

  const activeViewRef = useRef<CameraViewPreset>('photo');
  const lightingModeRef = useRef<LightingMode>('day');
  activeViewRef.current = activeView;
  lightingModeRef.current = lightingMode;

  const lightsRef = useRef<{
    skylightSpot?: THREE.SpotLight;
    skylightMesh?: THREE.Mesh;
    ambient?: THREE.AmbientLight;
    sunlight?: THREE.DirectionalLight;
    mirrorHalo?: THREE.Mesh;
  }>({});

  const cameraTargetRef = useRef<{
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
  }>({
    position: new THREE.Vector3(1.1, 1.45, 4.8),
    lookAt: new THREE.Vector3(-0.35, 0.95, -0.6)
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number | null = null;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F4F0);

    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.copy(cameraTargetRef.current.position);

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      const handleContextLost = (e: Event) => {
        e.preventDefault();
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
      const canvasEl = renderer.domElement;
      canvasEl.addEventListener('webglcontextlost', handleContextLost);
      container.appendChild(canvasEl);
    } catch {
      setWebglSupported(false);
      return;
    }

    // ========================================================
    // LIGHTING SYSTEM (MATCHING USER'S PHOTO DOME ILLUMINATION)
    // ========================================================
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.4);
    scene.add(ambientLight);

    const skylightSpot = new THREE.SpotLight(0xffffff, 4.8, 12, Math.PI / 2.8, 0.45, 1.0);
    skylightSpot.position.set(-1.1, 3.4, -0.8);
    skylightSpot.target.position.set(-1.1, 0, -0.8);
    scene.add(skylightSpot);
    scene.add(skylightSpot.target);

    const sunlight = new THREE.DirectionalLight(0xfffaea, 1.8);
    sunlight.position.set(4, 7, 5);
    scene.add(sunlight);

    const fillLight = new THREE.DirectionalLight(0xe8edf5, 1.1);
    fillLight.position.set(-5, 2, 2);
    scene.add(fillLight);

    lightsRef.current.ambient = ambientLight;
    lightsRef.current.skylightSpot = skylightSpot;
    lightsRef.current.sunlight = sunlight;

    // ========================================================
    // MATERIALS PALETTE (IDENTICAL TO UPLOADED CLINIC PHOTO)
    // ========================================================
    // 1. Warm Architectural Micro-Cement Wall
    const wallMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xE4E1D9),
      roughness: 0.65,
      metalness: 0.05,
      clearcoat: 0.05
    });

    // 2. Crisp Medical White Shells & Bases
    const whiteShellMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xFAFAFC),
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.4
    });

    // 3. Signature Contoured Sky-Blue Clinical Upholstery
    const blueCushionMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x5696D6),
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.25
    });

    // 4. Polished Porcelain Tile Floor
    const floorMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xF7F6F2),
      roughness: 0.16,
      metalness: 0.06,
      clearcoat: 0.35
    });

    // 5. Luminous Giant Ceiling Skylight Dome
    const skylightGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
    });

    // 6. Brushed Chrome / Metallic Hardware
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xD8DDE4),
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.6
    });

    // 7. Warm Backlit Mirror Glow
    const mirrorHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFE2A0,
      transparent: true,
      opacity: 0.85
    });
    lightsRef.current.mirrorHalo = new THREE.Mesh(
      new THREE.PlaneGeometry(1.28, 1.68),
      mirrorHaloMaterial
    );

    // ========================================================
    // ROOM ARCHITECTURE
    // ========================================================
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // 1. Floor with subtle tile seams
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floor = new THREE.Mesh(floorGeo, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    roomGroup.add(floor);

    // Floor tile grid lines (fine architectural joints)
    const gridHelper = new THREE.GridHelper(12, 10, 0xDAD5CB, 0xE2DDD4);
    gridHelper.position.y = 0.005;
    roomGroup.add(gridHelper);

    // 2. Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(12, 12);
    const ceiling = new THREE.Mesh(ceilingGeo, wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3.6;
    roomGroup.add(ceiling);

    // 3. Iconic Giant Circular Ceiling Daylight Skylight (Center-Left)
    const skylightDomeGroup = new THREE.Group();
    skylightDomeGroup.position.set(-1.1, 3.58, -0.8);
    roomGroup.add(skylightDomeGroup);

    // Outer recessed beveled trim ring
    const domeTrimGeo = new THREE.TorusGeometry(1.48, 0.08, 16, 64);
    const domeTrim = new THREE.Mesh(domeTrimGeo, wallMaterial);
    domeTrim.rotation.x = Math.PI / 2;
    skylightDomeGroup.add(domeTrim);

    // Luminous glowing circular disc
    const skylightDiscGeo = new THREE.CircleGeometry(1.44, 64);
    const skylightDisc = new THREE.Mesh(skylightDiscGeo, skylightGlowMaterial);
    skylightDisc.rotation.x = Math.PI / 2;
    skylightDomeGroup.add(skylightDisc);
    lightsRef.current.skylightMesh = skylightDisc;

    // Linear AC Ceiling Diffusers (as in photo)
    const acDiffuserGeo = new THREE.BoxGeometry(1.3, 0.04, 0.32);
    const acDiffuser1 = new THREE.Mesh(acDiffuserGeo, whiteShellMaterial);
    acDiffuser1.position.set(1.5, 3.56, -0.6);
    roomGroup.add(acDiffuser1);

    const acDiffuser2 = new THREE.Mesh(acDiffuserGeo, whiteShellMaterial);
    acDiffuser2.position.set(2.8, 3.56, 1.4);
    roomGroup.add(acDiffuser2);

    // 4. Back Wall
    const backWallGeo = new THREE.BoxGeometry(12, 3.8, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, wallMaterial);
    backWall.position.set(0, 1.8, -4.6);
    roomGroup.add(backWall);

    // 5. Left Window Wall with Curved Column
    const leftWallGeo = new THREE.BoxGeometry(0.2, 3.8, 12);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMaterial);
    leftWall.position.set(-4.6, 1.8, 0);
    roomGroup.add(leftWall);

    // Curved Corner Pillar (as seen on far left of photo)
    const curvedColumnGeo = new THREE.CylinderGeometry(0.7, 0.7, 3.6, 32, 1, false, 0, Math.PI / 2);
    const curvedColumn = new THREE.Mesh(curvedColumnGeo, wallMaterial);
    curvedColumn.position.set(-4.1, 1.8, 2.2);
    curvedColumn.rotation.y = Math.PI;
    roomGroup.add(curvedColumn);

    // Recessed Left Window with Roller Blind
    const windowFrameGeo = new THREE.BoxGeometry(0.12, 2.4, 3.8);
    const windowBlindMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xB6BAC4),
      roughness: 0.6,
      metalness: 0.05
    });
    const windowBlind = new THREE.Mesh(windowFrameGeo, windowBlindMaterial);
    windowBlind.position.set(-4.45, 2.1, -1.2);
    roomGroup.add(windowBlind);

    // Window sill ledge beneath blind
    const sillGeo = new THREE.BoxGeometry(0.35, 0.06, 4.0);
    const sill = new THREE.Mesh(sillGeo, whiteShellMaterial);
    sill.position.set(-4.32, 0.88, -1.2);
    roomGroup.add(sill);

    // 6. Rear Vanity Cabinetry with Backlit Mirror & Plant Shelf (Right Side)
    const vanityGroup = new THREE.Group();
    vanityGroup.position.set(2.6, 0, -4.4);
    roomGroup.add(vanityGroup);

    // Lower storage cabinet
    const cabinetGeo = new THREE.BoxGeometry(2.1, 0.92, 0.65);
    const cabinet = new THREE.Mesh(cabinetGeo, wallMaterial);
    cabinet.position.set(0, 0.46, 0);
    vanityGroup.add(cabinet);

    // Countertop slab
    const counterGeo = new THREE.BoxGeometry(2.14, 0.05, 0.68);
    const counter = new THREE.Mesh(counterGeo, whiteShellMaterial);
    counter.position.set(0, 0.94, 0);
    vanityGroup.add(counter);

    // Backlit Vanity Mirror
    const mirrorBackGeo = new THREE.BoxGeometry(1.2, 1.55, 0.04);
    const mirrorGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xF0F4F8),
      roughness: 0.05,
      metalness: 0.9,
      clearcoat: 1.0
    });
    const mirrorMesh = new THREE.Mesh(mirrorBackGeo, mirrorGlassMat);
    mirrorMesh.position.set(0, 2.0, 0.3);
    vanityGroup.add(mirrorMesh);

    // Halo light mesh behind mirror
    lightsRef.current.mirrorHalo.position.set(0, 2.0, 0.28);
    vanityGroup.add(lightsRef.current.mirrorHalo);

    // Upper display shelf
    const upperShelfGeo = new THREE.BoxGeometry(2.1, 0.06, 0.35);
    const upperShelf = new THREE.Mesh(upperShelfGeo, whiteShellMaterial);
    upperShelf.position.set(0, 2.95, 0.2);
    vanityGroup.add(upperShelf);

    // Cascading vine plant on upper shelf
    const plantPotGeo = new THREE.CylinderGeometry(0.12, 0.09, 0.16, 16);
    const plantPot = new THREE.Mesh(plantPotGeo, whiteShellMaterial);
    plantPot.position.set(0.6, 3.1, 0.2);
    vanityGroup.add(plantPot);

    const foliageMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x3B6B38),
      roughness: 0.5,
      metalness: 0.05
    });
    for (let f = 0; f < 5; f++) {
      const vineLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), foliageMat);
      vineLeaf.scale.set(0.6, 1.2, 0.4);
      vineLeaf.position.set(0.6 + (f % 2 === 0 ? 0.05 : -0.05), 3.0 - f * 0.1, 0.35);
      vanityGroup.add(vineLeaf);
    }

    // ========================================================
    // BUILD OPERATORY CLINICAL SUITE CHAIRS (IDENTICAL TO PHOTO)
    // ========================================================
    const createOperatoryStation = (stationX: number, stationZ: number, isEdge = false) => {
      const station = new THREE.Group();
      station.position.set(stationX, 0, stationZ);
      station.rotation.y = Math.PI * 0.14; // Matches the chair perspective in the photo

      // 1. Heavy Rectangular Base Pedestal with Bevel
      const baseGeo = new THREE.BoxGeometry(1.2, 0.12, 1.6);
      const baseMesh = new THREE.Mesh(baseGeo, whiteShellMaterial);
      baseMesh.position.set(0, 0.06, 0);
      station.add(baseMesh);

      // Angled hydraulic lift pedestal
      const columnGeo = new THREE.BoxGeometry(0.38, 0.65, 0.42);
      const columnMesh = new THREE.Mesh(columnGeo, whiteShellMaterial);
      columnMesh.position.set(0, 0.4, -0.15);
      station.add(columnMesh);

      // 2. Seat Cradle Armature
      const cradleGeo = new THREE.BoxGeometry(0.65, 0.14, 0.85);
      const cradleMesh = new THREE.Mesh(cradleGeo, whiteShellMaterial);
      cradleMesh.position.set(0, 0.72, 0.1);
      station.add(cradleMesh);

      // 3. Ergonomic Contoured Seat Cushion (Signature Sky Blue)
      const seatCushionGeo = new THREE.BoxGeometry(0.64, 0.12, 0.75);
      const seatCushion = new THREE.Mesh(seatCushionGeo, blueCushionMaterial);
      seatCushion.position.set(0, 0.82, 0.15);
      station.add(seatCushion);

      // 4. White Molded Backrest Shell (Tilted Backwards like Photo)
      const backrestGroup = new THREE.Group();
      backrestGroup.position.set(0, 0.82, -0.22);
      backrestGroup.rotation.x = -Math.PI * 0.16; // Slight comfortable recline
      station.add(backrestGroup);

      // Sleek White Shell backing
      const backShellGeo = new THREE.BoxGeometry(0.68, 0.95, 0.08);
      const backShell = new THREE.Mesh(backShellGeo, whiteShellMaterial);
      backShell.position.set(0, 0.45, 0);
      backrestGroup.add(backShell);

      // Contoured Sky-Blue Cushion nested in shell
      const backCushionGeo = new THREE.BoxGeometry(0.62, 0.88, 0.07);
      const backCushion = new THREE.Mesh(backCushionGeo, blueCushionMaterial);
      backCushion.position.set(0, 0.45, 0.05);
      backrestGroup.add(backCushion);

      // Ergonomic Contoured Headrest
      const headrestStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.28, 12);
      const headrestStem = new THREE.Mesh(headrestStemGeo, chromeMaterial);
      headrestStem.position.set(0, 0.98, -0.02);
      backrestGroup.add(headrestStem);

      const headrestShellGeo = new THREE.BoxGeometry(0.34, 0.24, 0.06);
      const headrestShell = new THREE.Mesh(headrestShellGeo, whiteShellMaterial);
      headrestShell.position.set(0, 1.12, 0);
      backrestGroup.add(headrestShell);

      const headrestCushionGeo = new THREE.BoxGeometry(0.3, 0.2, 0.06);
      const headrestCushion = new THREE.Mesh(headrestCushionGeo, blueCushionMaterial);
      headrestCushion.position.set(0, 1.12, 0.04);
      backrestGroup.add(headrestCushion);

      // 5. Contoured Leg Extension / Footrest
      const legrestGeo = new THREE.BoxGeometry(0.58, 0.1, 0.65);
      const legrest = new THREE.Mesh(legrestGeo, blueCushionMaterial);
      legrest.position.set(0, 0.74, 0.75);
      legrest.rotation.x = Math.PI * 0.12;
      station.add(legrest);

      // Armrests (Left & Right)
      [-0.4, 0.4].forEach((armX) => {
        const armPostGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 12);
        const armPost = new THREE.Mesh(armPostGeo, chromeMaterial);
        armPost.position.set(armX, 0.85, 0);
        station.add(armPost);

        const armPadGeo = new THREE.BoxGeometry(0.1, 0.05, 0.45);
        const armPad = new THREE.Mesh(armPadGeo, blueCushionMaterial);
        armPad.position.set(armX, 1.02, 0.05);
        station.add(armPad);
      });

      // 6. Instrument Delivery Console & Articulated Arm (on Left of chair)
      const deliveryArmGroup = new THREE.Group();
      deliveryArmGroup.position.set(-0.65, 0.6, 0.2);
      station.add(deliveryArmGroup);

      // Vertical pivot column
      const pivotGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 16);
      const pivotMesh = new THREE.Mesh(pivotGeo, whiteShellMaterial);
      pivotMesh.position.set(0, 0.35, 0);
      deliveryArmGroup.add(pivotMesh);

      // Horizontal articulated arm
      const armGeo = new THREE.BoxGeometry(0.55, 0.06, 0.06);
      const armMesh = new THREE.Mesh(armGeo, chromeMaterial);
      armMesh.position.set(-0.25, 0.72, 0);
      deliveryArmGroup.add(armMesh);

      // Instrument Delivery Tray Unit (White console)
      const trayGeo = new THREE.BoxGeometry(0.42, 0.08, 0.32);
      const trayMesh = new THREE.Mesh(trayGeo, whiteShellMaterial);
      trayMesh.position.set(-0.52, 0.75, 0);
      deliveryArmGroup.add(trayMesh);

      // 4 Precision Hanging Tubing Lines (exact detail from photo!)
      for (let t = 0; t < 4; t++) {
        const tubeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.42 - t * 0.06, 0.72, 0.12),
          new THREE.Vector3(-0.44 - t * 0.06, 0.35, 0.16 + t * 0.02),
          new THREE.Vector3(-0.40 - t * 0.06, 0.15, 0.12)
        ]);
        const tubeGeo = new THREE.TubeGeometry(tubeCurve, 20, 0.012, 8, false);
        const tubeMesh = new THREE.Mesh(tubeGeo, chromeMaterial);
        deliveryArmGroup.add(tubeMesh);
      }

      // 7. Clinical Operator / Dentist Stool (Mobile 5-Star Base, Blue Cushion)
      if (!isEdge) {
        const stoolGroup = new THREE.Group();
        stoolGroup.position.set(0.9, 0, 0.55);
        station.add(stoolGroup);

        // 5-Star Castor Base
        for (let b = 0; b < 5; b++) {
          const angle = (b * Math.PI * 2) / 5;
          const legGeo = new THREE.BoxGeometry(0.32, 0.03, 0.04);
          const legMesh = new THREE.Mesh(legGeo, chromeMaterial);
          legMesh.position.set(Math.cos(angle) * 0.18, 0.06, Math.sin(angle) * 0.18);
          legMesh.rotation.y = -angle;
          stoolGroup.add(legMesh);

          // Small wheel
          const wheelGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.03, 8);
          const wheel = new THREE.Mesh(wheelGeo, chromeMaterial);
          wheel.position.set(Math.cos(angle) * 0.32, 0.03, Math.sin(angle) * 0.32);
          stoolGroup.add(wheel);
        }

        // Center lift cylinder
        const cylinderGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.42, 16);
        const cylinder = new THREE.Mesh(cylinderGeo, chromeMaterial);
        cylinder.position.set(0, 0.25, 0);
        stoolGroup.add(cylinder);

        // Round Blue Seat Cushion
        const stoolSeatGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.09, 32);
        const stoolSeat = new THREE.Mesh(stoolSeatGeo, blueCushionMaterial);
        stoolSeat.position.set(0, 0.48, 0);
        stoolGroup.add(stoolSeat);

        // Ergonomic Lumbar Backrest
        const stoolBackStemGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.35, 12);
        const stoolBackStem = new THREE.Mesh(stoolBackStemGeo, chromeMaterial);
        stoolBackStem.position.set(0, 0.65, -0.2);
        stoolGroup.add(stoolBackStem);

        const stoolBackPadGeo = new THREE.BoxGeometry(0.28, 0.14, 0.05);
        const stoolBackPad = new THREE.Mesh(stoolBackPadGeo, blueCushionMaterial);
        stoolBackPad.position.set(0, 0.8, -0.2);
        stoolGroup.add(stoolBackPad);
      }

      return station;
    };

    // Instantiate Station 1 (Foreground Left - Matches Photo)
    const station1 = createOperatoryStation(-1.45, -0.2);
    roomGroup.add(station1);

    // Instantiate Station 2 (Midground Center - Matches Photo)
    const station2 = createOperatoryStation(0.65, -0.85);
    roomGroup.add(station2);

    // Instantiate Station 3 (Partial right edge - Matches Photo)
    const station3 = createOperatoryStation(2.8, -1.5, true);
    roomGroup.add(station3);

    // ========================================================
    // INTERACTION & ORBIT CONTROL
    // ========================================================
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let sphericalTheta = 0.25;
    let sphericalPhi = 1.35;
    let sphericalRadius = 5.2;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;

        sphericalTheta -= deltaX * 0.007;
        sphericalPhi -= deltaY * 0.007;
        sphericalPhi = Math.max(0.35, Math.min(Math.PI / 2 - 0.05, sphericalPhi));

        previousMouseX = clientX;
        previousMouseY = clientY;

        // Custom orbit update
        cameraTargetRef.current.position.set(
          cameraTargetRef.current.lookAt.x + sphericalRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta),
          cameraTargetRef.current.lookAt.y + sphericalRadius * Math.cos(sphericalPhi),
          cameraTargetRef.current.lookAt.z + sphericalRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta)
        );
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards view targets
      if (!isDragging) {
        if (activeViewRef.current === 'photo') {
          // Photo perspective: low-mid angle showing both operatory suites and the giant dome
          cameraTargetRef.current.position.set(1.15, 1.48, 4.8);
          cameraTargetRef.current.lookAt.set(-0.35, 0.95, -0.6);
        } else if (activeViewRef.current === 'skylight') {
          // Looking up directly towards the giant luminous skylight dome
          cameraTargetRef.current.position.set(-1.1, 0.6, 0.2);
          cameraTargetRef.current.lookAt.set(-1.1, 3.5, -0.8);
        } else if (activeViewRef.current === 'chair') {
          // Intimate focus on the foreground treatment chair
          cameraTargetRef.current.position.set(-0.4, 1.25, 1.8);
          cameraTargetRef.current.lookAt.set(-1.45, 0.85, -0.2);
        }
      }

      if (camera) {
        camera.position.lerp(cameraTargetRef.current.position, 0.06);
        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt);
        camera.lookAt(cameraTargetRef.current.lookAt);
      }

      // Dynamic lighting adjustments
      if (lightingModeRef.current === 'ambient') {
        if (ambientLight) ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, 0.7, 0.05);
        if (skylightSpot) skylightSpot.intensity = THREE.MathUtils.lerp(skylightSpot.intensity, 2.2, 0.05);
        if (sunlight) sunlight.intensity = THREE.MathUtils.lerp(sunlight.intensity, 0.4, 0.05);
        if (lightsRef.current.mirrorHalo) {
          (lightsRef.current.mirrorHalo.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
            (lightsRef.current.mirrorHalo.material as THREE.MeshBasicMaterial).opacity,
            1.0,
            0.05
          );
        }
      } else {
        if (ambientLight) ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, 1.4, 0.05);
        if (skylightSpot) skylightSpot.intensity = THREE.MathUtils.lerp(skylightSpot.intensity, 4.8, 0.05);
        if (sunlight) sunlight.intensity = THREE.MathUtils.lerp(sunlight.intensity, 1.8, 0.05);
        if (lightsRef.current.mirrorHalo) {
          (lightsRef.current.mirrorHalo.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
            (lightsRef.current.mirrorHalo.material as THREE.MeshBasicMaterial).opacity,
            0.75,
            0.05
          );
        }
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      wallMaterial.dispose();
      whiteShellMaterial.dispose();
      blueCushionMaterial.dispose();
      floorMaterial.dispose();
      skylightGlowMaterial.dispose();
      chromeMaterial.dispose();
      mirrorHaloMaterial.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}>
      {webglSupported ? (
        <>
          <div
            ref={mountRef}
            className={`w-full h-full flex items-center justify-center transition-opacity duration-700 ${
              isInteracting ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          />

          {/* Top Bar: Camera Presets (Photo Angle / Skylight / Chair Unit / Orbit) */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1 sm:gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE1E6] shadow-xs text-xs max-w-[calc(100%-24px)] overflow-x-auto scrollbar-none">
            <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-tight text-[#767E8C] uppercase shrink-0 flex items-center gap-1">
              <Camera className="w-3 h-3 text-[#8E3514]" />
              VIEW:
            </span>
            <button
              type="button"
              onClick={() => setActiveView('photo')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                activeView === 'photo'
                  ? 'bg-[#8E3514] text-white shadow-xs'
                  : 'text-[#6E260E] hover:bg-[#F6F7F9]'
              }`}
            >
              Exact Photo View
            </button>
            <button
              type="button"
              onClick={() => setActiveView('skylight')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                activeView === 'skylight'
                  ? 'bg-[#8E3514] text-white shadow-xs'
                  : 'text-[#6E260E] hover:bg-[#F6F7F9]'
              }`}
            >
              Ceiling Dome
            </button>
            <button
              type="button"
              onClick={() => setActiveView('chair')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
                activeView === 'chair'
                  ? 'bg-[#8E3514] text-white shadow-xs'
                  : 'text-[#6E260E] hover:bg-[#F6F7F9]'
              }`}
            >
              Chair Suite
            </button>
          </div>

          {/* Bottom Right Dock: Atmosphere Lighting Toggle */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE1E6] shadow-xs text-xs max-w-[calc(100%-24px)] overflow-x-auto scrollbar-none">
            <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-tight text-[#767E8C] uppercase shrink-0">
              LIGHT:
            </span>
            <button
              type="button"
              onClick={() => setLightingMode('day')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                lightingMode === 'day'
                  ? 'bg-[#D49B28] text-white shadow-xs'
                  : 'text-[#6E260E] hover:bg-[#F6F7F9]'
              }`}
            >
              <Sun className="w-3 h-3" />
              Daylight Dome
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('ambient')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                lightingMode === 'ambient'
                  ? 'bg-[#8E3514] text-white shadow-xs'
                  : 'text-[#6E260E] hover:bg-[#F6F7F9]'
              }`}
            >
              <Moon className="w-3 h-3" />
              Evening Ambient
            </button>
          </div>

          {/* Model Match Badge Indicator (Bottom Left) */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#DDE1E6] text-[10px] font-mono uppercase tracking-wider text-[#6E260E] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5696D6] animate-pulse" />
            <span>Modeled 1:1 from Studio Operatory Suite</span>
          </div>

          {/* Top-right hint */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none hidden xl:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#767E8C] bg-white/80 px-2.5 py-1 rounded-lg border border-[#DDE1E6]">
            <span>Drag to Orbit · 360° Real-Time</span>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F6F7F9] rounded-2xl border border-[#DDE1E6]">
          <p className="mt-4 text-xs font-mono tracking-wider text-[#767E8C] uppercase">
            SD DESIGN STUDIO · Operatory Suite 3D Model
          </p>
        </div>
      )}
    </div>
  );
};
