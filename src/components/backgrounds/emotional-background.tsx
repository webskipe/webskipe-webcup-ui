"use client"

import { useEffect, useRef } from "react"

export default function EmotionalBackground() {
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

    // Wave parameters
    const waves = [
      { amplitude: 50, frequency: 0.005, speed: 0.05, color: "rgba(103, 58, 183, 0.3)", y: canvas.height * 0.3 },
      { amplitude: 70, frequency: 0.008, speed: 0.07, color: "rgba(156, 39, 176, 0.3)", y: canvas.height * 0.5 },
      { amplitude: 40, frequency: 0.01, speed: 0.03, color: "rgba(233, 30, 99, 0.3)", y: canvas.height * 0.7 },
      { amplitude: 60, frequency: 0.006, speed: 0.06, color: "rgba(244, 67, 54, 0.3)", y: canvas.height * 0.9 },
    ]

    // Floating particles
    const particles: {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      color: string
    }[] = []

    const particleColors = ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.3)"]

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      })
    }

    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1A237E") // Deep indigo
      gradient.addColorStop(0.5, "#311B92") // Deep purple
      gradient.addColorStop(1, "#4A148C") // Purple
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Move particles upward slowly
        particle.y -= particle.speed

        // Add slight horizontal movement
        particle.x += Math.sin(time * 0.1 + particle.y * 0.01) * 0.3

        // Reset if out of bounds
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size
          particle.x = Math.random() * canvas.width
        }
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size
      })

      // Draw waves
      waves.forEach((wave) => {
        ctx.beginPath()

        // Start at the left edge
        ctx.moveTo(0, wave.y)

        // Draw the wave across the canvas
        for (let x = 0; x < canvas.width; x++) {
          const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, y)
        }

        // Complete the path to fill the area below the wave
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = wave.color
        ctx.fill()
      })

      // Add a subtle glow in the center
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 3,
      )
      radialGradient.addColorStop(0, "rgba(255, 255, 255, 0.1)")
      radialGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = radialGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update time for animation
      time += 0.1

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
