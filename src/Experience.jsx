import { useFrame } from '@react-three/fiber'
import { OrbitControls, useCursor, useGLTF, meshBounds } from '@react-three/drei'
import { useState, useRef } from 'react'
import { Perf } from 'r3f-perf'


export default function Experience()
{


    const cube = useRef()
    const hamburger = useGLTF("./hamburger.glb")

    const [hovered, setHovered] = useState()
    useCursor(hovered)
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandler = () => {
        
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        cube.current.rotation.y += 2
        
    }

    return <>

        <Perf position="top-left"/>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 } onClick={(event) => {event.stopPropagation()}}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } onClick={ eventHandler } 
            onPointerOver={ () => setHovered(true) } 
            onPointerOut={ () => setHovered(false) }
            raycast={ meshBounds } 
            //meshbounds takes the object as a sphere (used for complex geometries)
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <primitive 
            object={ hamburger.scene }
            position={ [ 0, -1, 3 ] }
            scale={ 0.2 }
            onClick={ (event) => {
                console.log(event.object.name);
                event.stopPropagation()
            } }
        />

    </>
}