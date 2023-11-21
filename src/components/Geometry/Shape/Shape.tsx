import { Object3D } from 'three';
import {Vector3} from "@react-three/fiber";
import { Html } from "@react-three/drei"

interface ShapeProps {
    position: Vector3
    object: Object3D;
    onClick: () => void;
    isSelected: boolean;
}

const Shape = ({position, object, onClick, isSelected }: ShapeProps) => {

    return (
        <mesh position={position} onClick={onClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={isSelected ? 0xff0000 : 0x00ff00} />
            <Html distanceFactor={10}>
                <div style={{
                    paddingTop: '10px',
                    textAlign: 'left',
                    background: '#202035',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    userSelect: 'none'
                }}>
                    {object.name}
                </div>
            </Html>
        </mesh>
    );
};

export default Shape;