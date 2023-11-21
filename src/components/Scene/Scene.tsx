import React, { useState } from 'react';
import {Canvas} from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import { Object3D } from 'three';
import Controls from "../Controls/Controls";
import Shape from "../Geometry/Shape/Shape";
import * as THREE from "three";
const Scene = () => {
    const [shapes, setShapes] = useState<Object3D[]>([]);
    const [selectedShape, setSelectedShape] = useState<Object3D | null>(null);
    const handleShapeClick = (shape: Object3D) => {
        if(selectedShape === shape) {
            setSelectedShape(null);
        } else {
            setSelectedShape(shape);
        }
    };

    return (
        <>
        <div>
            <Controls
                shapes={shapes}
                selectedShape={selectedShape}
                setShapes={setShapes}
                setSelectedShape={setSelectedShape}
            />
        </div>
        <div style={{height: '800px'}}>
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 15] }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {shapes.map((shape, index) => {
                    let arrowHelperComponent = null;

                    if (index > 0) {
                        const direction = new THREE.Vector3().copy(shape.position).sub(shapes[index - 1].position);
                        const length = direction.length() - 0.6;

                        arrowHelperComponent = (
                            <arrowHelper args={[direction.normalize(), shapes[index - 1].position, length, 0x000000]} />
                        );
                    }
                    return (
                        <>
                            <Shape
                                key={index}
                                position={shape.position}
                                object={shape}
                                onClick={() => handleShapeClick(shape)}
                                isSelected={selectedShape === shape}
                            />
                            {arrowHelperComponent}
                        </>
                        )

                })}
                <OrbitControls />
            </Canvas>
        </div>
        </>
    );
};

export default Scene;