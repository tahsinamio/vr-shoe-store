import React, { useRef } from 'react'
import { Interactive } from '@react-three/xr'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useShoeStore } from '../index'
import { Button, Selected } from './objects'
import Prompt from './prompt'

export const Shoe = () => {
    const ref = useRef()
    const { nodes, materials } = useGLTF('shoe-draco.glb')

    const items = useShoeStore((state) => state)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
        ref.current.rotation.x = Math.cos(t / 4) / 8
        ref.current.rotation.y = Math.sin(t / 4) / 8
    })

    const hovered = (item) => {
        useShoeStore.setState({ current: item })
        const color = '#' + (((1 << 24) * Math.random()) | 0).toString(16)
        items.setItemColor(item, color)
    }

    const onSelect = () => {
        useShoeStore.setState({ selected: items.current })
    }

    return (
        <group scale={[0.16, 0.16, 0.16]} position={[-0.18, 1.1, -0.4]}>
            <Button position={[-1, -1.7, 1]} rotation={[-0.7, 0, 0]} scale={[2, 2, 2]} item={'laces'} />
            <Selected position={[1, -1.7, 1]} rotation={[-0.7, 0, 0]} scale={[2, 2, 2]} item={'laces'} />
            {!items.prompt_hidden && <Prompt />}
            <group ref={ref}>
                <Interactive onSelect={onSelect}>
                    <Interactive onHover={() => hovered('laces')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces} material-color={items.laces} />
                    </Interactive>
                    <Interactive onHover={() => hovered('mesh')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={items.mesh} />
                    </Interactive>
                    <Interactive onHover={() => hovered('caps')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={items.caps} />
                    </Interactive>
                    <Interactive onHover={() => hovered('inner')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={items.inner} />
                    </Interactive>
                    <Interactive onHover={() => hovered('sole')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={items.sole} />
                    </Interactive>
                    <Interactive onHover={() => hovered('stripes')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={items.stripes} />
                    </Interactive>
                    <Interactive onHover={() => hovered('band')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} material-color={items.band} />
                    </Interactive>
                    <Interactive onHover={() => hovered('patch')}>
                        <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={items.patch} />
                    </Interactive>
                </Interactive>
            </group>
        </group>
    )
}
