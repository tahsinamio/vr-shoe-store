import React from 'react'
import { Flex, Box, useReflow } from '@react-three/flex'
import { Text } from './Text'

export default function Prompt() {
    return (
        <Box position={[2, 0, 1]} rotation={[0, -0.5, 0]} flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap" width="100%">
            <Box margin={0.05}>
                <mesh position={[2.5 / 2, -1, 0]}>
                    <planeBufferGeometry args={[2.5, 2]} />
                    <meshStandardMaterial color={['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'][0 % 4]} />
                </mesh>
                <Box flexDirection="column" padding={0.1}>
                    <Box marginBottom={0.1} marginLeft={0.05}>
                        <Text fontSize={0.2} letterSpacing={0.1} textAlign="center">
                            OUR PRODUCTS
                            <meshStandardMaterial />
                        </Text>
                    </Box>
                    <Box flexDirection="row" flexWrap="wrap" width={2} flexGrow={1}>
                        {new Array(8).fill(0).map((k, i) => (
                            <Box margin={0.05} key={i}>
                                <mesh position={[0.3 / 2, -0.3 / 2, 0]}>
                                    <planeBufferGeometry args={[0.3, 0.3]} />
                                    <meshStandardMaterial />
                                </mesh>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
