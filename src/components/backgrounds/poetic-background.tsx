"use client"

import { useEffect, useRef } from "react"

export default function PoeticBackground() {
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

    // Ink particles
    const inkDrops: {
      x: number
      y: number
      radius: number
      color: string
      alpha: number
      growing: boolean
      maxRadius: number
      growSpeed: number
    }[] = []

    const colors = [
      "rgba(25, 25, 112, 0.2)", // Midnight blue
      "rgba(72, 61, 139, 0.2)", // Dark slate blue
      "rgba(106, 90, 205, 0.2)", // Slate blue
      "rgba(123, 104, 238, 0.2)", // Medium slate blue
      "rgba(147, 112, 219, 0.2)", // Medium purple
    ]

    // Create initial ink drops
    const createInkDrop = () => {
      inkDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.3 + 0.1,
        growing: true,
        maxRadius: Math.random() * 150 + 50,
        growSpeed: Math.random() * 0.5 + 0.1,
      })
    }

    // Create initial ink drops
    for (let i = 0; i < 15; i++) {
      createInkDrop()
    }

    // Periodically add more ink drops
    const inkInterval = setInterval(() => {
      if (inkDrops.length < 30) {
        createInkDrop()
      }
    }, 2000)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dreamy gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#F8F9FA")
      gradient.addColorStop(1, "#E9ECEF")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ink drops
      inkDrops.forEach((drop, index) => {
        ctx.beginPath()
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2)
        ctx.fillStyle = drop.color.replace("0.2", drop.alpha.toString())
        ctx.fill()

        // Update radius
        if (drop.growing) {
          drop.radius += drop.growSpeed
          if (drop.radius >= drop.maxRadius) {
            drop.growing = false
          }
        } else {
          drop.alpha -= 0.001
          if (drop.alpha <= 0) {
            inkDrops.splice(index, 1)
          }
        }
      })

      // Add some subtle texture
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2
        ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
        ctx.fillRect(x, y, size, size)
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(inkInterval)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
