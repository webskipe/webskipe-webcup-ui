"use client"

import { useEffect, useRef } from "react"

export default function ReflectiveBackground() {
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

    // Ripple parameters
    const ripples: {
      x: number
      y: number
      radius: number
      maxRadius: number
      opacity: number
      speed: number
    }[] = []

    // Floating objects that will be reflected
    const floatingObjects: {
      x: number
      y: number
      size: number
      type: number
      color: string
      speed: number
    }[] = []

    const colors = ["#7B68EE", "#9370DB", "#BA55D3", "#C71585", "#DB7093"]

    // Create initial floating objects
    for (let i = 0; i < 15; i++) {
      floatingObjects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2 - 50),
        size: Math.random() * 20 + 10,
        type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.3 + 0.1,
      })
    }

    // Function to create a new ripple
    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 100 + 50,
        opacity: 0.7,
        speed: Math.random() * 2 + 1,
      })
    }

    // Create initial ripples
    for (let i = 0; i < 5; i++) {
      createRipple(Math.random() * canvas.width, canvas.height / 2 + Math.random() * (canvas.height / 2))
    }

    // Periodically create new ripples
    const rippleInterval = setInterval(() => {
      if (ripples.length < 20) {
        createRipple(Math.random() * canvas.width, canvas.height / 2 + Math.random() * (canvas.height / 2))
      }
    }, 1000)

    const drawFloatingObject = (obj: (typeof floatingObjects)[0]) => {
      ctx.fillStyle = obj.color

      switch (obj.type) {
        case 0: // Circle
          ctx.beginPath()
          ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case 1: // Square
          ctx.fillRect(obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size)
          break
        case 2: // Triangle
          ctx.beginPath()
          ctx.moveTo(obj.x, obj.y - obj.size / 2)
          ctx.lineTo(obj.x + obj.size / 2, obj.y + obj.size / 2)
          ctx.lineTo(obj.x - obj.size / 2, obj.y + obj.size / 2)
          ctx.closePath()
          ctx.fill()
          break
      }

      // Draw reflection
      ctx.save()
      ctx.scale(1, -1) // Flip vertically
      ctx.translate(0, -canvas.height) // Adjust for the flip

      // Draw the reflection with reduced opacity
      ctx.globalAlpha = 0.4

      switch (obj.type) {
        case 0: // Circle
          ctx.beginPath()
          ctx.arc(obj.x, canvas.height - obj.y, obj.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case 1: // Square
          ctx.fillRect(obj.x - obj.size / 2, canvas.height - obj.y - obj.size / 2, obj.size, obj.size)
          break
        case 2: // Triangle
          ctx.beginPath()
          ctx.moveTo(obj.x, canvas.height - obj.y - obj.size / 2)
          ctx.lineTo(obj.x + obj.size / 2, canvas.height - obj.y + obj.size / 2)
          ctx.lineTo(obj.x - obj.size / 2, canvas.height - obj.y + obj.size / 2)
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
      gradient.addColorStop(0, "#2C3E50") // Dark blue-gray
      gradient.addColorStop(0.5, "#3498DB") // Medium blue
      gradient.addColorStop(1, "#2980B9") // Slightly darker blue
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw a horizontal line to represent water surface
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw ripples
      ripples.forEach((ripple, index) => {
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Update ripple
        ripple.radius += ripple.speed
        ripple.opacity -= 0.005

        // Remove faded ripples
        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(index, 1)
        }
      })

      // Draw floating objects and their reflections
      floatingObjects.forEach((obj) => {
        drawFloatingObject(obj)

        // Move objects horizontally with a gentle wave
        obj.x += Math.sin(Date.now() * 0.001 + obj.y) * 0.5 + obj.speed

        // Wrap around edges
        if (obj.x > canvas.width + obj.size) {
          obj.x = -obj.size
        }
      })

      // Add water distortion effect
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, canvas.height / 2, canvas.width, canvas.height / 2)
      ctx.clip()

      // Draw wavy lines to simulate water
      for (let y = canvas.height / 2; y < canvas.height; y += 10) {
        ctx.beginPath()
        ctx.moveTo(0, y)

        for (let x = 0; x < canvas.width; x += 20) {
          const waveHeight = Math.sin(x * 0.01 + Date.now() * 0.001) * 3
          ctx.lineTo(x, y + waveHeight)
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
        ctx.stroke()
      }

      ctx.restore()

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      clearInterval(rippleInterval)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
}
