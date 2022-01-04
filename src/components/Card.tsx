import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ShoeDisplay } from './ShoeDisplay'

export const Card = () => {
    return (
        <div>
            <div className={'canvas'}>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
                    <ambientLight intensity={0.7} />
                    <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                    <Suspense fallback={null}>
                        <ShoeDisplay />
                    </Suspense>
                </Canvas>
            </div>
            <div className={'instructions'}>
                <p>Enter VR and customize your shoe</p>
                <p>Checkout once you are happy with your creation</p>
            </div>
            <button className={'checkoutButton'}>Checkout</button>
        </div>
    )
}
