'use client'

import { useEffect, useRef } from 'react'

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const container = containerRef.current
    if (!container) return

    let animId: number
    let cleanup: (() => void) | undefined

    import('three').then((THREE) => {
      const W = container.clientWidth
      const H = container.clientHeight

      // ── Renderer ─────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 500)
      camera.position.set(0, 0, 28)

      // ── Morphing icosahedron wireframe ────────────────────────────
      const icoGeo = new THREE.IcosahedronGeometry(9, 5)
      const origPos = new Float32Array(icoGeo.attributes.position.array)
      const wireGeo = new THREE.WireframeGeometry(icoGeo)

      const wireMat = new THREE.LineBasicMaterial({
        color: 0xA08860,
        transparent: true,
        opacity: 0.35,
      })
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat)
      scene.add(wireMesh)

      // ── Inner glow sphere (solid, additive) ───────────────────────
      const glowGeo = new THREE.SphereGeometry(8.2, 32, 32)
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x5C4A30,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      })
      const glowMesh = new THREE.Mesh(glowGeo, glowMat)
      scene.add(glowMesh)

      // ── Outer orbit ring ──────────────────────────────────────────
      const ringGeo = new THREE.TorusGeometry(13.5, 0.04, 6, 160)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xC4A060,
        transparent: true,
        opacity: 0.5,
      })
      const ring1 = new THREE.Mesh(ringGeo, ringMat)
      ring1.rotation.x = Math.PI * 0.28
      ring1.rotation.z = Math.PI * 0.08
      scene.add(ring1)

      const ringGeo2 = new THREE.TorusGeometry(16, 0.025, 6, 200)
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x9A7840,
        transparent: true,
        opacity: 0.3,
      })
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
      ring2.rotation.x = Math.PI * 0.55
      ring2.rotation.y = Math.PI * 0.15
      scene.add(ring2)

      // ── Bright accent dots on sphere surface ──────────────────────
      // Use a canvas-based circular texture so they are round, not squares
      const dotCanvas = document.createElement('canvas')
      dotCanvas.width = 32
      dotCanvas.height = 32
      const dCtx = dotCanvas.getContext('2d')!
      const grad = dCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, 'rgba(240,200,120,1)')
      grad.addColorStop(0.4, 'rgba(200,160,80,0.8)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      dCtx.fillStyle = grad
      dCtx.fillRect(0, 0, 32, 32)
      const dotTex = new THREE.CanvasTexture(dotCanvas)

      const dotCount = 220
      const dotPositions = new Float32Array(dotCount * 3)
      for (let i = 0; i < dotCount; i++) {
        // Place on sphere surface using Fibonacci lattice
        const phi = Math.acos(1 - 2 * (i + 0.5) / dotCount)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const r = 9.4
        dotPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
        dotPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        dotPositions[i * 3 + 2] = r * Math.cos(phi)
      }
      const dotGeo = new THREE.BufferGeometry()
      dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3))
      const dotMat = new THREE.PointsMaterial({
        map: dotTex,
        size: 0.55,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        alphaTest: 0.01,
        depthWrite: false,
      })
      const dots = new THREE.Points(dotGeo, dotMat)
      scene.add(dots)

      // ── Mouse tracking ─────────────────────────────────────────────
      let mx = 0, my = 0, cx = 0, cy = 0
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // ── Resize ─────────────────────────────────────────────────────
      const onResize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      // ── Animation ──────────────────────────────────────────────────
      let t = 0
      const pos = icoGeo.attributes.position
      const posArr = pos.array as Float32Array

      const animate = () => {
        animId = requestAnimationFrame(animate)
        t += 0.006

        // Smooth mouse lerp
        cx += (mx - cx) * 0.03
        cy += (my - cy) * 0.03

        // Morph icosahedron vertices
        for (let i = 0; i < origPos.length; i += 3) {
          const ox = origPos[i], oy = origPos[i + 1], oz = origPos[i + 2]
          const noise =
            Math.sin(ox * 0.35 + t) *
            Math.cos(oy * 0.35 + t * 0.8) *
            Math.sin(oz * 0.35 + t * 0.6)
          const scale = 1 + noise * 0.18
          posArr[i]     = ox * scale
          posArr[i + 1] = oy * scale
          posArr[i + 2] = oz * scale
        }
        pos.needsUpdate = true
        wireGeo.dispose()
        // Re-derive wireframe from updated geo — lightweight trick
        wireMesh.geometry = new THREE.WireframeGeometry(icoGeo)

        // Rotate the whole group
        const baseRotY = t * 0.09 + cx * 0.25
        const baseRotX = -t * 0.04 + cy * 0.18
        wireMesh.rotation.y = baseRotY
        wireMesh.rotation.x = baseRotX
        glowMesh.rotation.y = baseRotY
        glowMesh.rotation.x = baseRotX
        dots.rotation.y = baseRotY
        dots.rotation.x = baseRotX

        // Rings orbit independently
        ring1.rotation.z += 0.002
        ring2.rotation.y += 0.0015

        // Camera subtle drift
        camera.position.x += (cx * 3 - camera.position.x) * 0.02
        camera.position.y += (-cy * 2 - camera.position.y) * 0.02

        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        icoGeo.dispose()
        wireGeo.dispose()
        wireMat.dispose()
        glowGeo.dispose()
        glowMat.dispose()
        ringGeo.dispose()
        ringMat.dispose()
        ringGeo2.dispose()
        ringMat2.dispose()
        dotGeo.dispose()
        dotMat.dispose()
        dotTex.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    })

    return () => cleanup?.()
  }, [])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
}
