"use client"

import { useEffect, useRef } from "react"

export default function ProfessionalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", resizeCanvas)

    // Create gradient colors
    const colors = ["#0f2027", "#203a43", "#2c5364", "#203a43", "#0f2027"]

    let colorIndex = 0
    let transitionProgress = 0
    const transitionSpeed = 0.005

    // Reflection particles
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate current and next color
      const currentColor = colors[colorIndex]
      const nextColor = colors[(colorIndex + 1) % colors.length]

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Interpolate between current and next color
      const r1 = Number.parseInt(currentColor.slice(1, 3), 16)
      const g1 = Number.parseInt(currentColor.slice(3, 5), 16)
      const b1 = Number.parseInt(currentColor.slice(5, 7), 16)

      const r2 = Number.parseInt(nextColor.slice(1, 3), 16)
      const g2 = Number.parseInt(nextColor.slice(3, 5), 16)
      const b2 = Number.parseInt(nextColor.slice(5, 7), 16)

      const r = Math.floor(r1 + (r2 - r1) * transitionProgress)
      const g = Math.floor(g1 + (g2 - g1) * transitionProgress)
      const b = Math.floor(b1 + (b2 - b1) * transitionProgress)

      const interpolatedColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`

      gradient.addColorStop(0, currentColor)
      gradient.addColorStop(0.5, interpolatedColor)
      gradient.addColorStop(1, nextColor)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update transition progress
      transitionProgress += transitionSpeed
      if (transitionProgress >= 1) {
        transitionProgress = 0
        colorIndex = (colorIndex + 1) % colors.length
      }

      // Draw reflection particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()

        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
      })

      // Add mirror-like reflection effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      for (let i = 0; i < 5; i++) {
        const y = Math.random() * canvas.height
        const height = Math.random() * 2 + 1
        ctx.fillRect(0, y, canvas.width, height)
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
