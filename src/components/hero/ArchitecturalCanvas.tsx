import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Camera, Sun, Sparkles, Compass } from 'lucide-react';

// Brand Palette Hex Codes
const PALETTE = {
  white: '#FFFFFF',
  warmWhite: '#F6F4F0',
  rust: '#8C432E',
  lightGray: '#EDEAE4',
  stoneDark: '#D8D1C6',
  stoneJoint: '#D8D1C6',
  lightWood: '#D8C9A8',
  woodAccent: '#C4B291'
};

// ============================================================================
// LIGHT WOOD FURNITURE SILHOUETTES
// ============================================================================

/** Minimalist Scandinavian / Japanese inspired Lounge Chair in Light Wood & Rust Cushion */
const MinimalLoungeChair: React.FC<{ position?: [number, number, number]; rotation?: [number, number, number] }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Light Wood Framing */}
      {/* Front Left Leg */}
      <mesh position={[-0.32, 0.22, 0.28]} castShadow>
        <boxGeometry args={[0.04, 0.44, 0.04]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Front Right Leg */}
      <mesh position={[0.32, 0.22, 0.28]} castShadow>
        <boxGeometry args={[0.04, 0.44, 0.04]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Back Left Leg (Angled backward) */}
      <mesh position={[-0.32, 0.38, -0.28]} rotation={[0.18, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.8, 0.04]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Back Right Leg (Angled backward) */}
      <mesh position={[0.32, 0.38, -0.28]} rotation={[0.18, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.8, 0.04]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.45} metalness={0.05} />
      </mesh>

      {/* Seat Base Plinth in Light Wood */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.66, 0.04, 0.6]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.4} />
      </mesh>

      {/* Upholstered Seat Cushion in Brand Rust Palette */}
      <mesh position={[0, 0.45, 0.02]} castShadow>
        <boxGeometry args={[0.62, 0.08, 0.58]} />
        <meshStandardMaterial color={PALETTE.rust} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Floating Curved Backrest in Light Wood */}
      <mesh position={[0, 0.72, -0.26]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.66, 0.22, 0.04]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.4} />
      </mesh>

      {/* Inner Lumbar Cushion in Warm White */}
      <mesh position={[0, 0.71, -0.24]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.58, 0.18, 0.03]} />
        <meshStandardMaterial color={PALETTE.warmWhite} roughness={0.8} />
      </mesh>
    </group>
  );
};

/** Sculptural Light Wood Low Coffee Table with Organic Chamfer */
const LightWoodCoffeeTable: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* Circular Light Oak Tabletop */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.46, 0.04, 48]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Tripod Sculptural Splayed Wooden Legs */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.28, 0.15, Math.sin(angle) * 0.28]}
          rotation={[0.1 * Math.cos(angle), -angle, 0.1 * Math.sin(angle)]}
          castShadow
        >
          <cylinderGeometry args={[0.03, 0.025, 0.3, 16]} />
          <meshStandardMaterial color={PALETTE.woodAccent} roughness={0.4} />
        </mesh>
      ))}

      {/* Minimalist Ceramic Vessel on table */}
      <mesh position={[0.08, 0.38, -0.06]} castShadow>
        <cylinderGeometry args={[0.06, 0.09, 0.14, 24]} />
        <meshStandardMaterial color={PALETTE.rust} roughness={0.5} />
      </mesh>
    </group>
  );
};

/** Cantilevered Light Wood Floating Credenza along stone wall */
const FloatingCredenza: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      {/* Main Wood Body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.35, 0.42]} />
        <meshStandardMaterial color={PALETTE.lightWood} roughness={0.4} />
      </mesh>
      {/* Subtle Rust Accent Shadow-Line underneath */}
      <mesh position={[0, 0.27, 0]}>
        <boxGeometry args={[2.36, 0.02, 0.4]} />
        <meshStandardMaterial color={PALETTE.rust} roughness={0.6} />
      </mesh>
      {/* Decorative Ceramic Artifacts on Credenza */}
      <mesh position={[-0.6, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshPhysicalMaterial color={PALETTE.white} roughness={0.2} clearcoat={0.6} />
      </mesh>
      <mesh position={[0.4, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.18, 16]} />
        <meshStandardMaterial color={PALETTE.rust} roughness={0.4} />
      </mesh>
    </group>
  );
};

// ============================================================================
// MINIMAL ARCHITECTURAL SPACE (STONE-TEXTURED GEOMETRIC WALLS & DAYLIGHT)
// ============================================================================

const ArchitecturalRoom: React.FC = () => {
  return (
    <group>
      {/* 1. Floor Slab: Large-format Stone / Warm White Microcement */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial
          color={PALETTE.warmWhite}
          roughness={0.75}
          metalness={0.02}
        />
      </mesh>

      {/* Architectural Floor Reveal Joints (Tile Seams) */}
      <gridHelper
        args={[14, 14, PALETTE.stoneDark, PALETTE.stoneJoint]}
        position={[0, 0.005, 0]}
      />

      {/* 2. Rear Stone Geometric Wall */}
      <mesh position={[0, 2.2, -4.2]} receiveShadow castShadow>
        <boxGeometry args={[12, 4.4, 0.3]} />
        <meshStandardMaterial
          color={PALETTE.lightGray}
          roughness={0.8}
          metalness={0.04}
        />
      </mesh>

      {/* Recessed Geometric Architectural Niche in Back Wall */}
      <mesh position={[0, 2.2, -4.04]} receiveShadow>
        <boxGeometry args={[3.2, 2.4, 0.05]} />
        <meshStandardMaterial
          color={PALETTE.stoneDark}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* 3. Left Wall with High Daylight Portal Window */}
      <mesh position={[-4.2, 2.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 4.4, 12]} />
        <meshStandardMaterial
          color={PALETTE.lightGray}
          roughness={0.8}
          metalness={0.04}
        />
      </mesh>

      {/* Deep Window Ledge / Cantilevered Portal Frame */}
      <group position={[-4.04, 2.2, -0.6]}>
        {/* Recessed Daylight Window Aperture */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[0.1, 2.2, 3.2]} />
          <meshStandardMaterial color={PALETTE.white} roughness={0.1} />
        </mesh>
        {/* Stone Ledge Shelf */}
        <mesh position={[0.18, -1.12, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.42, 0.08, 3.4]} />
          <meshStandardMaterial color={PALETTE.warmWhite} roughness={0.6} />
        </mesh>
      </group>

      {/* 4. Monolithic Stepped Stone Podium / Plinth */}
      <mesh position={[-0.2, 0.08, 0.4]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.16, 3.4]} />
        <meshStandardMaterial
          color={PALETTE.lightGray}
          roughness={0.7}
          metalness={0.03}
        />
      </mesh>

      {/* Architectural Column Element with Rust Accent Capital */}
      <group position={[2.6, 2.2, -2.4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 4.4, 32]} />
          <meshStandardMaterial color={PALETTE.warmWhite} roughness={0.7} />
        </mesh>
        {/* Subtle Rust Capital Band */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 32]} />
          <meshStandardMaterial color={PALETTE.rust} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};

// ============================================================================
// CAMERA CONTROLLER & GENTLE ROTATION
// ============================================================================

interface SceneControllerProps {
  viewPreset: 'overview' | 'vignette' | 'window';
  autoRotate: boolean;
}

const SceneController: React.FC<SceneControllerProps> = ({ viewPreset, autoRotate }) => {
  const controlsRef = useRef<any>(null);
  const targetPos = useRef(new THREE.Vector3(3.6, 2.2, 4.6));
  const targetLook = useRef(new THREE.Vector3(-0.2, 0.9, -0.4));

  useFrame((state, delta) => {
    if (viewPreset === 'overview') {
      targetPos.current.set(3.4, 2.1, 4.4);
      targetLook.current.set(-0.1, 0.85, -0.4);
    } else if (viewPreset === 'vignette') {
      targetPos.current.set(1.4, 1.4, 2.2);
      targetLook.current.set(-0.25, 0.65, 0.1);
    } else if (viewPreset === 'window') {
      targetPos.current.set(2.8, 2.4, 1.8);
      targetLook.current.set(-2.6, 1.8, -0.8);
    }

    state.camera.position.lerp(targetPos.current, delta * 2.5);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, delta * 2.5);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2.6}
      maxDistance={8.0}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2 - 0.04}
      autoRotate={autoRotate}
      autoRotateSpeed={0.8}
      dampingFactor={0.06}
    />
  );
};

// ============================================================================
// MAIN EXPORTED R3F CANVAS COMPONENT
// ============================================================================

interface ArchitecturalCanvasProps {
  className?: string;
}

export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({ className = '' }) => {
  const [viewPreset, setViewPreset] = useState<'overview' | 'vignette' | 'window'>('overview');
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* React Three Fiber Canvas */}
      <Canvas
        shadows
        camera={{ position: [3.4, 2.1, 4.4], fov: 38 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        onPointerDown={() => setAutoRotate(false)}
      >
        {/* Soft Daylight Lighting Setup */}
        <color attach="background" args={[PALETTE.warmWhite]} />
        <ambientLight color={PALETTE.warmWhite} intensity={1.1} />

        {/* Primary Soft Architectural Daylight streaming through window */}
        <directionalLight
          position={[-6, 7, 3]}
          intensity={2.4}
          color={PALETTE.white}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0001}
        />

        {/* Subtle Sky Bounce Fill Light */}
        <directionalLight position={[5, 4, 4]} intensity={0.9} color={PALETTE.lightGray} />

        {/* Warm Architectural Accent Accentuation */}
        <pointLight position={[0, 2.4, -3.8]} intensity={0.65} color={PALETTE.rust} distance={6} />

        {/* The Minimal Architectural Stone Space */}
        <ArchitecturalRoom />

        {/* Light Wood Furniture Vignettes */}
        <group position={[-0.2, 0.16, 0.4]}>
          {/* Minimalist Lounge Chair with Rust Cushion */}
          <MinimalLoungeChair position={[-0.6, 0, 0.3]} rotation={[0, Math.PI * 0.15, 0]} />

          {/* Sculptural Light Wood Low Table */}
          <LightWoodCoffeeTable position={[0.5, 0, 0.1]} />
        </group>

        {/* Floating Light Wood Credenza along rear stone wall */}
        <FloatingCredenza position={[-0.8, 0, -3.9]} />

        {/* Soft Contact Shadows for grounded realism */}
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={12}
          blur={1.8}
          far={3.5}
          color={PALETTE.rust}
        />

        {/* Interactive Camera & Damping Controller */}
        <SceneController viewPreset={viewPreset} autoRotate={autoRotate} />
      </Canvas>

      {/* Floating Architectural HUD Controls */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1 sm:gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-xl border border-line shadow-xs text-xs max-w-[calc(100%-24px)] overflow-x-auto scrollbar-none">
        <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-tight text-rust uppercase shrink-0 flex items-center gap-1 font-semibold">
          <Camera className="w-3 h-3 text-rust" />
          VIGNETTE:
        </span>
        <button
          type="button"
          onClick={() => setViewPreset('overview')}
          className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
            viewPreset === 'overview'
              ? 'bg-rust text-white shadow-xs'
              : 'text-rust hover:bg-surface-muted'
          }`}
        >
          Stone Sanctuary
        </button>
        <button
          type="button"
          onClick={() => setViewPreset('vignette')}
          className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
            viewPreset === 'vignette'
              ? 'bg-rust text-white shadow-xs'
              : 'text-rust hover:bg-surface-muted'
          }`}
        >
          Light Wood Lounge
        </button>
        <button
          type="button"
          onClick={() => setViewPreset('window')}
          className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer ${
            viewPreset === 'window'
              ? 'bg-rust text-white shadow-xs'
              : 'text-rust hover:bg-surface-muted'
          }`}
        >
          Daylight Portal
        </button>
      </div>

      {/* Bottom Right: Auto-Orbit Toggle */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-xl border border-line shadow-xs text-xs">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
            autoRotate
              ? 'bg-rust text-white shadow-xs'
              : 'text-rust hover:bg-surface-muted'
          }`}
        >
          <Compass className="w-3 h-3" />
          <span>{autoRotate ? 'Auto Orbit: On' : 'Orbit: Paused'}</span>
        </button>
      </div>

      {/* Bottom Left Badge: Architectural Palette Verification */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-line text-[10px] font-mono uppercase tracking-wider text-rust shadow-xs">
        <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
        <span>R3F Stone & Light Wood Space · Soft Daylight</span>
      </div>

      {/* Top Right: Drag Hint */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden xl:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-rust bg-white/85 px-2.5 py-1 rounded-lg border border-line">
        <Sparkles className="w-3 h-3 text-rust" />
        <span>Drag to Orbit · Real-Time 3D</span>
      </div>
    </div>
  );
};
