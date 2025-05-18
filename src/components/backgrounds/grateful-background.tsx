"use client"

import { useEffect, useRef } from "react"

export default function GratefulBackground() {
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

    // Leaf particles
    const leaves: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      color: string
    }[] = []

    const colors = [
      "#E8B87D", // Light amber
      "#D4A373", // Camel
      "#CCD5AE", // Light sage
      "#E9EDC9", // Cream
      "#FEFAE0", // Ivory
    ]

    for (let i = 0; i < 40; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const drawLeaf = (leaf: (typeof leaves)[0]) => {
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rotation)
      ctx.fillStyle = leaf.color

      // Draw a simple leaf shape
      ctx.beginPath()
      ctx.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, Math.PI * 2)
      ctx.fill()

      // Draw the stem
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, leaf.size)
      ctx.strokeStyle = "#7C6A0A"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw warm gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#FAEDCD")
      gradient.addColorStop(1, "#D4A373")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some soft light rays
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width
        const width = Math.random() * 100 + 50
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
        ctx.fillRect(x, 0, width, canvas.height)
      }

      // Draw leaves
      leaves.forEach((leaf) => {
        drawLeaf(leaf)

        // Update position with gentle floating motion
        leaf.x += leaf.speedX + Math.sin(Date.now() * 0.001 + leaf.x) * 0.3
        leaf.y += leaf.speedY
        leaf.rotation += leaf.rotationSpeed

        // Reset when out of view
        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size
          leaf.x = Math.random() * canvas.width
        }

        // Wrap horizontally
        if (leaf.x < -leaf.size) leaf.x = canvas.width + leaf.size
        if (leaf.x > canvas.width + leaf.size) leaf.x = -leaf.size
      })

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
