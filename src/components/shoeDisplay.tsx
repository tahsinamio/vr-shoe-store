import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useShoeStore } from '../index'

export const ShoeDisplay = () => {
    const ref = useRef()
    const { nodes, materials } = useGLTF('shoe-draco.glb')

    const items = useShoeStore((state) => state)

    return (
        <group scale={[2, 2, 2]} position={[0, 0, 0]}>
            <group ref={ref}>
                <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={items.laces} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={items.mesh} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={items.caps} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={items.inner} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={items.sole} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={items.stripes} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={items.band} />
                <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={items.patch} />
            </group>
        </group>
    )
}
