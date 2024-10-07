import React from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from 'react-native';
import { PerspectiveCamera } from '@react-three/drei';

// Parking spot component
const ParkingSpot = ({ position, occupied }: { position: [number, number, number], occupied: boolean }) => (
  <mesh position={position}>
    {/* Car body */}
    <boxGeometry args={[1, 0.6, 2]} />
    <meshStandardMaterial color={occupied ? 'red' : 'green'} />
    
    {/* Car roof */}
    {occupied && (
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.9, 0.3, 1.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    )}
    
    {/* Car wheels */}
    {occupied && (
      <>
        <mesh position={[-0.4, -0.3, 0.8]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.4, -0.3, 0.8]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.4, -0.3, -0.8]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.4, -0.3, -0.8]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </>
    )}
  </mesh>
);

// Entry/Exit component
const EntryExit = ({ position, type }: { position: [number, number, number], type: 'entry' | 'exit' }) => (
  <mesh position={position}>
    <boxGeometry args={[2, 0.5, 2]} />
    <meshStandardMaterial color={type === 'entry' ? 'blue' : 'orange'} />
  </mesh>
);

const ParkingLot3D: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Canvas>
        {/* Fixed camera looking from above at an angle */}
        {/* Perspective camera with default settings */}
        <PerspectiveCamera 
          makeDefault 
          position={[19, 31, 19.9]}  // Position the camera in the corner of the lot
          rotation={[-Math.PI / 3, Math.PI / 6, 0.9]}  // Adjust rotation to look down at an angle from the corner
          fov={35}  // Field of view for a pleasant view
        />

        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Parking spots - Row 2 */}
        <ParkingSpot position={[-5, 0, 0]} occupied={true} />
        <ParkingSpot position={[-3, 0, 0]} occupied={false} />
        <ParkingSpot position={[-1, 0, 0]} occupied={true} />
        <ParkingSpot position={[1, 0, 0]} occupied={false} />
        <ParkingSpot position={[3, 0, 0]} occupied={true} />

        {/* Parking spots - Row 3 */}
        <ParkingSpot position={[-5, 0, 3]} occupied={false} />
        <ParkingSpot position={[-3, 0, 3]} occupied={true} />
        <ParkingSpot position={[-1, 0, 3]} occupied={false} />
        <ParkingSpot position={[1, 0, 3]} occupied={true} />
        <ParkingSpot position={[3, 0, 3]} occupied={false} />

        {/* Entry and Exit - Positioned next to each other */}
        <EntryExit position={[-4, 0, 5.5]} type="entry" />
        <EntryExit position={[-1, 0, 5.5]} type="exit" />

      </Canvas>
    </View>
  );
};

export default ParkingLot3D;
