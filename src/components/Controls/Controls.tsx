import React, {Dispatch, SetStateAction} from "react";
import {Object3D, Object3DEventMap} from "three";
import * as THREE from "three";

interface ControlsProps {
    shapes: Object3D[],
    selectedShape: Object3D | null,
    setShapes: Dispatch<SetStateAction<Object3D<Object3DEventMap>[]>>,
    setSelectedShape: Dispatch<SetStateAction<Object3D<Object3DEventMap> | null>>,
}

export default function Controls ({shapes, selectedShape, setShapes, setSelectedShape}: ControlsProps) {

    const getRandomPosition = () => {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;

        return new THREE.Vector3(x, y, z);
    };


    const handleAddShape = () => {
        const newShape = new Object3D();
        const shapeCount = shapes.length + 1;
        const position = getRandomPosition();
        newShape.position.copy(position);
        newShape.name = `Shape${shapeCount}`;

        setShapes([...shapes, newShape]);
    };

    const handleDeleteShape = () => {
        if (selectedShape) {
            let removeIndex: number | undefined;
            const updatedShapes: Object3D<THREE.Object3DEventMap>[] = [];
            shapes.forEach((shape, i) => {
                if (removeIndex !== undefined && i > removeIndex) {
                    const renameShape = shape.clone();
                    renameShape.name = `Shape${i}`
                    updatedShapes.push(renameShape);
                }else if (shape !== selectedShape) {
                    updatedShapes.push(shape)
                } else {
                    removeIndex = i;
                }
            })
            setShapes(updatedShapes);
            setSelectedShape(null);
        }
    };

    return (
        <div>
            <button onClick={handleAddShape}>Add</button>
            <button onClick={handleDeleteShape} disabled={!selectedShape}>
                Delete
            </button>
        </div>
    )
}