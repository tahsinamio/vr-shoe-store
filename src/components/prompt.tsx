import React from 'react'
import { Interactive } from '@react-three/xr'
import { Flex, Box } from '@react-three/flex'
import { Text } from './Text'
import { useShoeStore } from '../index'

export default function Prompt() {
    const promptColor = useShoeStore((state) => state.prompt_color)

    const onSelect = () => {
        console.log('dpayed?')
    }

    const onHover = () => {
        useShoeStore.setState({ prompt_color: '#00a7ff' })
    }

    const onBlur = () => {
        useShoeStore.setState({ prompt_color: '#007cff' })
    }

    return (
        <Flex justifyContent="center" alignItems="center" position={[1.5, 1.4, 1]} rotation={[0, -0.3, 0]}>
            <Box centerAnchor>
                <Interactive onSelect={onSelect} onHover={onHover} onBlur={onBlur}>
                    <group>
                        <mesh position={[0.45, -0.7, 0]}>
                            <planeBufferGeometry args={[1, 0.3]} />
                            <meshStandardMaterial color={promptColor} />
                        </mesh>
                    </group>
                </Interactive>
                <Box flexDirection="column" padding={0}>
                    <Box marginTop={0} marginRight={1}>
                        <Text fontSize={0.1} letterSpacing={0.1} textAlign="center">
                            $DESO
                            <meshStandardMaterial />
                        </Text>
                    </Box>
                    <Box marginTop={-0.13} marginRight={1}>
                        <Text fontSize={0.4} letterSpacing={0.1} textAlign="center">
                            2.04
                            <meshStandardMaterial />
                        </Text>
                    </Box>
                    <Box marginTop={0.1} marginLeft={0.13}>
                        <Text fontSize={0.2} letterSpacing={0.1} textAlign="center">
                            dPAY
                            <meshStandardMaterial />
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}
