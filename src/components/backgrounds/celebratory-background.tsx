"use client"

import { useEffect, useRef } from "react"

export default function CelebratoryBackground() {
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

    // Confetti particles
    const confetti: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      type: number
    }[] = []

    const colors = [
      "#FF595E", // Red
      "#FFCA3A", // Yellow
      "#8AC926", // Green
      "#1982C4", // Blue
      "#6A4C93", // Purple
      "#FF99C8", // Pink
    ]

    // Create initial confetti
    const createConfetti = (count: number) => {
      for (let i = 0; i < count; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          type: Math.floor(Math.random() * 3), // 0: rectangle, 1: circle, 2: triangle
        })
      }
    }

    createConfetti(150)

    // Periodically add more confetti
    const confettiInterval = setInterval(() => {
      createConfetti(10)
    }, 1000)

    const drawConfetti = (particle: (typeof confetti)[0]) => {
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)
      ctx.fillStyle = particle.color

      switch (particle.type) {
        case 0: // Rectangle
          ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2)
          break
        case 1: // Circle
          ctx.beginPath()
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
        case 2: // Triangle
          ctx.beginPath()
          ctx.moveTo(0, -particle.size / 2)
          ctx.lineTo(particle.size / 2, particle.size / 2)
          ctx.lineTo(-particle.size / 2, particle.size / 2)
          ctx.closePath()
          ctx.fill()
          break
      }

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#001233")
      gradient.addColorStop(1, "#023E8A")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw confetti
      confetti.forEach((particle, index) => {
        drawConfetti(particle)

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Add some wobble
        particle.x += Math.sin(Date.now() * 0.001 + index) * 0.5

        // Remove if out of view or add back to top
        if (particle.y > canvas.height + particle.size) {
          if (Math.random() > 0.3) {
            // Remove some particles
            confetti.splice(index, 1)
          } else {
            // Reset others
            particle.y = -particle.size
            particle.x = Math.random() * canvas.width
          }
        }
      })

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(confettiInterval)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
