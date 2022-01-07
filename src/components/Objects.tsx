import React, { useState } from 'react'
import { Interactive } from '@react-three/xr'
import { useMatcapTexture, Text } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useShoeStore } from '../index'

export const Box = ({ color, size, scale, children, ...rest }: any) => {
    return (
        <mesh scale={scale} {...rest}>
            <boxBufferGeometry attach="geometry" args={size} />
            <meshPhongMaterial attach="material" color={color} />
            {children}
        </mesh>
    )
}

export const Button = (props: any) => {
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState()
    const items = useShoeStore((state) => state)

    const onSelect = () => {
        useShoeStore.setState({ laces: '#321029' })
        setColor(321029)
    }

    return (
        <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
            <Box color={color} scale={hover ? [0.75, 0.75, 0.75] : [0.65, 0.65, 0.65]} size={[0.4, 0.1, 0.1]} {...props}>
                <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
                    {items.current}
                </Text>
            </Box>
        </Interactive>
    )
}

export const Selected = (props: any) => {
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState()
    const items = useShoeStore((state) => state)

    const onSelect = () => {
        useShoeStore.setState({ laces: '#321029' })
        setColor(321029)
    }

    return (
        <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
            <Box color={color} scale={hover ? [0.75, 0.75, 0.75] : [0.65, 0.65, 0.65]} size={[0.4, 0.1, 0.1]} {...props}>
                <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
                    {items.selected}
                </Text>
            </Box>
        </Interactive>
    )
}

export const Stand = ({ position, args = [6, 6, 6] }: any) => {
    const [boxRef] = useBox(() => ({ position, mass: 1, args }))
    const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270')

    return (
        <Box scale={[0.5, 3, 0.5]} position={[-0.18, -0.7, -0.45]} ref={boxRef} args={args as any} castShadow>
            <meshMatcapMaterial attach="material" matcap={tex as any} />
        </Box>
    )
}
