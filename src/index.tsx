import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect, Fragment } from 'react'
import { VRCanvas, Hands, Interactive, DefaultXRControllers } from '@react-three/xr'
import { useThree, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Plane, Sphere, Sky, useMatcapTexture, Text } from '@react-three/drei'
import { usePlane, useBox, Physics, useSphere } from '@react-three/cannon'
import create from 'zustand'
import { joints } from './joints'
import { Shoe } from './components/Shoe'
import { Card } from './components/Card'
import { Stand } from './components/Objects'
import './styles.css'

export const useShoeStore = create((set) => ({
    current: 'Hover',
    selected: 'Selected',
    laces: '#0000ff',
    mesh: '#ffffff',
    caps: '#ffffff',
    inner: '#ffffff',
    sole: '#ffffff',
    stripes: '#ff0000',
    band: '#ffffff',
    patch: '#0000ff',
    setItemColor(item, color) {
        set({ [item]: color })
    }
}))

function JointCollider({ index, hand }: { index: number; hand: number }) {
    const { gl } = useThree()
    const handObj = (gl.xr as any).getHand(hand)
    const joint = handObj.joints[joints[index]] as any
    const size = joint.jointRadius ?? 0.0001
    const [tipRef, api] = useSphere(() => ({ args: size, position: [-1, 0, 0] }))
    useFrame(() => {
        if (joint === undefined) return
        api.position.set(joint.position.x, joint.position.y, joint.position.z)
    })

    return (
        <Sphere ref={tipRef} args={[size]}>
            <meshBasicMaterial transparent opacity={0} attach="material" />
        </Sphere>
    )
}

function HandsReady(props: any) {
    const [ready, setReady] = useState(false)
    const { gl } = useThree()
    useEffect(() => {
        if (ready) return
        const joint = (gl.xr as any).getHand(0).joints['index-finger-tip']
        if (joint?.jointRadius !== undefined) return
        const id = setInterval(() => {
            const joint = (gl.xr as any).getHand(0).joints['index-finger-tip']
            if (joint?.jointRadius !== undefined) {
                setReady(true)
            }
        }, 500)
        return () => clearInterval(id)
    }, [gl, ready])

    return ready ? props.children : null
}

const HandsColliders = (): any =>
    [...Array(25)].map((_, i) => (
        <Fragment key={i}>
            <JointCollider index={i} hand={0} />
            <JointCollider index={i} hand={1} />
        </Fragment>
    ))

function Scene() {
    const [floorRef] = usePlane(() => ({
        args: [10, 10],
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.9, 0],
        type: 'Static'
    }))
    return (
        <>
            <Sky distance={0} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.35} />
            <Hands />
            <HandsReady>
                <HandsColliders />
            </HandsReady>
            <Shoe />
            <Stand />
            <spotLight position={[1, 8, 1.4]} angle={0.3} penumbra={1} color={'#fff'} intensity={5} castShadow />
            <Plane ref={floorRef} args={[10, 10]} receiveShadow>
                <meshStandardMaterial attach="material" color="#fff" />
            </Plane>
            <OrbitControls minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 3} enableZoom={false} />
        </>
    )
}

const App = () => (
    <div className={'container'}>
        <div className={'logo'}>
            <span>loadplace</span>
        </div>
        <div className={'content'}>
            <div className={'containerXR'}>
                <VRCanvas shadowMap>
                    <Physics
                        gravity={[0, -2, 0]}
                        iterations={20}
                        defaultContactMaterial={{
                            friction: 0.09
                        }}>
                        <Scene />
                        <DefaultXRControllers />
                    </Physics>
                </VRCanvas>
            </div>
            <div className={'containerCard'}>
                <Card />
            </div>
        </div>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
