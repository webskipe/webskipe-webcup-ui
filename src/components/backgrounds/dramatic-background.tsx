"use client"

import { useEffect, useRef } from "react"

export default function DramaticBackground() {
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

    // Raindrop properties
    const raindrops: {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 200; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Window streaks
    const streaks: {
      x: number
      y: number
      width: number
      height: number
      speed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 15; i++) {
      streaks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 2 + 1,
        height: Math.random() * 100 + 50,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const drawRain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dark blue background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1a1a2e")
      gradient.addColorStop(1, "#16213e")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw window frame
      ctx.fillStyle = "rgba(30, 30, 50, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw raindrops
      raindrops.forEach((drop) => {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x, drop.y + drop.length)
        ctx.strokeStyle = `rgba(200, 200, 255, ${drop.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        drop.y += drop.speed
        if (drop.y > canvas.height) {
          drop.y = 0
          drop.x = Math.random() * canvas.width
        }
      })

      // Draw window streaks
      streaks.forEach((streak) => {
        ctx.fillStyle = `rgba(200, 200, 255, ${streak.opacity})`
        ctx.fillRect(streak.x, streak.y, streak.width, streak.height)

        streak.y += streak.speed
        if (streak.y > canvas.height) {
          streak.y = -streak.height
          streak.x = Math.random() * canvas.width
        }
      })

      // Add some fog effect
      ctx.fillStyle = "rgba(200, 200, 255, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(drawRain)
    }

    drawRain()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
