import React from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "react-native";
import { PerspectiveCamera } from "@react-three/drei";

// Metal vertical parking structure component
const MetalParkingStructure = ({ position = [0, 0, 0] }) => (
    <group position={position}>
        {/* Vertical Supports */}
        <mesh position={[-0.5, 2, 0]}>
            <boxGeometry args={[0.2, 4, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        <mesh position={[0.5, 2, 0]}>
            <boxGeometry args={[0.2, 4, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        /////////
        <mesh position={[-0.5, 0, 0]}>
            <boxGeometry args={[0.2, 4, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        <mesh position={[0.5, 0, 0]}>
            <boxGeometry args={[0.2, 4, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        /////////

        {/* Horizontal Supports */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.4, 0.2, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        <mesh position={[0, 2, 0]}>
            <boxGeometry args={[1.4, 0.2, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>
        <mesh position={[0, 4, 0]}>
            <boxGeometry args={[1.4, 0.2, 0.2]} />
            <meshStandardMaterial color="blue" />
        </mesh>

        {/* Top Rollers */}
        <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.3, 20]} />
            <meshStandardMaterial color="silver" />
        </mesh>
    </group>
);

const SingleHorizontalSupport = ({ position = [0, 0, 0] }) => (
    <mesh position={position} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[1.4, 0.2, 0.2]} />
        <meshStandardMaterial color="blue" />
    </mesh>
);

const SingleSupport = ({ position = [0, 0, 0] }) => (
    <mesh position={position} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[0.2, 2.6, 0.2]} />
        <meshStandardMaterial color="blue" />
    </mesh>
);

const VerticalParking3D: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <Canvas>
                {/* Fixed camera looking from above at an angle */}
                {/* Perspective camera with default settings */}
                <PerspectiveCamera
                    makeDefault
                    position={[28, 46, 18]} // Position the camera in the corner of the lot
                    rotation={[-Math.PI / 2.6, Math.PI / 6, 0.9]} // Adjust rotation to look down at an angle from the corner
                    fov={8} // Field of view for a pleasant view
                />

                {/* Lighting */}
                <ambientLight intensity={2} />
                <pointLight position={[10, 10, 10]} />

                {/* Original Metal Parking Structure */}
                <MetalParkingStructure position={[0, 0, 0]} />
                
                <SingleHorizontalSupport position={[0, 2, 0.7]} />
                <SingleHorizontalSupport position={[0, 0, 0.7]} />

                <SingleSupport position={[-1.2, -4, 0.7]} />

                {/* New Metal Parking Structure to the right */}
                <MetalParkingStructure position={[0, 0, 1.5]} />
            </Canvas>
        </View>
    );
};

export default VerticalParking3D;
