/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Floopglb.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[1.29, 0.89, 2.29]} rotation={[Math.PI / 2, 0, 0]} scale={0.43}>
        <mesh geometry={nodes.Sphere002_1.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Sphere002_2.geometry} material={materials['Material.003']} />
      </group>
    </group>
  )
}

useGLTF.preload('/Floopglb.glb')
