import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

const PhoneModel: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const { nodes, materials } = useGLTF('/nothing-phone.glb');

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Subtle rotation
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={nodes.Scene} />
    </group>
  );
};

useGLTF.preload('/nothing-phone.glb');

export default PhoneModel;