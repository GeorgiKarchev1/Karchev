'use client'

import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const container = containerRef.current
    if (!container) return

    let animId: number
    let cleanup: (() => void) | undefined

    import('three').then((THREE) => {
      const width = container.clientWidth
      const height = container.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
      camera.position.z = 35

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // ── Main particle cloud ──────────────────────────────────────
      const count = 900
      const positions = new Float32Array(count * 3)
      const opacities = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 90
        positions[i * 3 + 1] = (Math.random() - 0.5) * 70
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50
        opacities[i] = Math.random()
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const mat = new THREE.PointsMaterial({
        color: 0x9A8060,
        size: 0.28,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      })

      const particles = new THREE.Points(geo, mat)
      scene.add(particles)

      // ── Brighter accent particles ────────────────────────────────
      const accentCount = 180
      const aPos = new Float32Array(accentCount * 3)
      for (let i = 0; i < accentCount; i++) {
        aPos[i * 3]     = (Math.random() - 0.5) * 60
        aPos[i * 3 + 1] = (Math.random() - 0.5) * 50
        aPos[i * 3 + 2] = (Math.random() - 0.5) * 30
      }
      const aGeo = new THREE.BufferGeometry()
      aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3))
      const aMat = new THREE.PointsMaterial({
        color: 0xC4A97A,
        size: 0.5,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      })
      const accentParticles = new THREE.Points(aGeo, aMat)
      scene.add(accentParticles)

      // ── Mouse tracking ───────────────────────────────────────────
      let targetX = 0
      let targetY = 0
      let currentX = 0
      let currentY = 0

      const onMouse = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth  - 0.5) * 2
        targetY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── Resize ──────────────────────────────────────────────────
      const onResize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      // ── Animation loop ───────────────────────────────────────────
      let t = 0
      const animate = () => {
        animId = requestAnimationFrame(animate)
        t += 0.0008

        currentX += (targetX - currentX) * 0.025
        currentY += (targetY - currentY) * 0.025

        particles.rotation.y = t + currentX * 0.12
        particles.rotation.x = currentY * 0.06

        accentParticles.rotation.y = -t * 0.7 + currentX * 0.08
        accentParticles.rotation.x = -currentY * 0.04

        camera.position.x += (currentX * 3 - camera.position.x) * 0.015
        camera.position.y += (-currentY * 2 - camera.position.y) * 0.015

        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        geo.dispose()
        mat.dispose()
        aGeo.dispose()
        aMat.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    })

    return () => cleanup?.()
  }, [])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
}
