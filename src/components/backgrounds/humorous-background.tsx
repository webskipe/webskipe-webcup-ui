"use client"

import { useEffect, useRef } from "react"

export default function HumorousBackground() {
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

    // Emoji objects
    const emojis: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      type: number
    }[] = []

    // Emoji types:
    // 0 = smile, 1 = laugh, 2 = wink, 3 = heart eyes, 4 = party face
    // 5 = cat, 6 = heart, 7 = star-struck, 8 = sparkles, 9 = rainbow
    for (let i = 0; i < 100; i++) {
      emojis.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 15, // Smaller size range
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        type: Math.floor(Math.random() * 10), // Now 10 types
      })
    }

    const drawEmoji = (emoji: (typeof emojis)[0]) => {
      ctx.save()
      ctx.translate(emoji.x, emoji.y)
      ctx.rotate(emoji.rotation)

      // Base circle for most emojis
      if (emoji.type !== 6 && emoji.type !== 8 && emoji.type !== 9) {
        ctx.beginPath()
        ctx.arc(0, 0, emoji.size, 0, Math.PI * 2)
        ctx.fillStyle = "#FFE15D"
        ctx.fill()
      }

      // Draw emoji features based on type
      switch (emoji.type) {
        case 0: // Smile
          // Eyes
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.arc(-emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.1, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.1, 0, Math.PI * 2)
          ctx.fill()

          // Smile
          ctx.beginPath()
          ctx.arc(0, emoji.size * 0.1, emoji.size * 0.5, 0, Math.PI)
          ctx.strokeStyle = "#000"
          ctx.lineWidth = emoji.size * 0.08
          ctx.stroke()
          break

        case 1: // Laugh
          // Eyes - squinting
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.arc(-emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.05, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.05, 0, Math.PI * 2)
          ctx.fill()

          // Laughing mouth
          ctx.beginPath()
          ctx.arc(0, emoji.size * 0.1, emoji.size * 0.4, 0, Math.PI)
          ctx.fillStyle = "#FF6B6B"
          ctx.fill()

          // Teeth
          ctx.fillStyle = "#FFF"
          ctx.fillRect(-emoji.size * 0.3, emoji.size * 0.1, emoji.size * 0.6, emoji.size * 0.15)
          break

        case 2: // Wink
          // Eyes - one open, one winking
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.arc(-emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.1, 0, Math.PI * 2)
          ctx.fill()

          // Wink
          ctx.beginPath()
          ctx.moveTo(emoji.size * 0.2, -emoji.size * 0.2)
          ctx.lineTo(emoji.size * 0.4, -emoji.size * 0.2)
          ctx.strokeStyle = "#000"
          ctx.lineWidth = emoji.size * 0.08
          ctx.stroke()

          // Smile
          ctx.beginPath()
          ctx.arc(0, emoji.size * 0.2, emoji.size * 0.4, 0, Math.PI)
          ctx.stroke()
          break

        case 3: // Heart eyes
          // Heart eyes
          ctx.fillStyle = "#FF6B6B"

          // Left heart
          ctx.save()
          ctx.translate(-emoji.size * 0.3, -emoji.size * 0.2)
          ctx.beginPath()
          ctx.moveTo(0, -emoji.size * 0.05)
          ctx.bezierCurveTo(
            emoji.size * 0.1,
            -emoji.size * 0.15,
            emoji.size * 0.15,
            -emoji.size * 0.05,
            0,
            emoji.size * 0.1,
          )
          ctx.bezierCurveTo(
            -emoji.size * 0.15,
            -emoji.size * 0.05,
            -emoji.size * 0.1,
            -emoji.size * 0.15,
            0,
            -emoji.size * 0.05,
          )
          ctx.fill()
          ctx.restore()

          // Right heart
          ctx.save()
          ctx.translate(emoji.size * 0.3, -emoji.size * 0.2)
          ctx.beginPath()
          ctx.moveTo(0, -emoji.size * 0.05)
          ctx.bezierCurveTo(
            emoji.size * 0.1,
            -emoji.size * 0.15,
            emoji.size * 0.15,
            -emoji.size * 0.05,
            0,
            emoji.size * 0.1,
          )
          ctx.bezierCurveTo(
            -emoji.size * 0.15,
            -emoji.size * 0.05,
            -emoji.size * 0.1,
            -emoji.size * 0.15,
            0,
            -emoji.size * 0.05,
          )
          ctx.fill()
          ctx.restore()

          // Smile
          ctx.beginPath()
          ctx.arc(0, emoji.size * 0.2, emoji.size * 0.3, 0, Math.PI)
          ctx.strokeStyle = "#000"
          ctx.lineWidth = emoji.size * 0.08
          ctx.stroke()
          break

        case 4: // Party face
          // Eyes
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.arc(-emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.1, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(emoji.size * 0.3, -emoji.size * 0.2, emoji.size * 0.1, 0, Math.PI * 2)
          ctx.fill()

          // Party hat
          ctx.beginPath()
          ctx.moveTo(0, -emoji.size)
          ctx.lineTo(-emoji.size * 0.4, -emoji.size * 0.4)
          ctx.lineTo(emoji.size * 0.4, -emoji.size * 0.4)
          ctx.closePath()
          ctx.fillStyle = "#FF6B6B"
          ctx.fill()

          // Party horn
          ctx.beginPath()
          ctx.moveTo(emoji.size * 0.4, emoji.size * 0.2)
          ctx.lineTo(emoji.size * 0.7, emoji.size * 0.4)
          ctx.strokeStyle = "#4361EE"
          ctx.lineWidth = emoji.size * 0.08
          ctx.stroke()

          // Smile
          ctx.beginPath()
          ctx.arc(0, emoji.size * 0.2, emoji.size * 0.4, 0, Math.PI)
          ctx.strokeStyle = "#000"
          ctx.lineWidth = emoji.size * 0.08
          ctx.stroke()
          break

        case 5: // Cat face
          // Eyes
          ctx.fillStyle = "#000"
          ctx.beginPath()
          ctx.ellipse(-emoji.size * 0.25, -emoji.size * 0.2, emoji.size * 0.15, emoji.size * 0.1, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.ellipse(emoji.size * 0.25, -emoji.size * 0.2, emoji.size * 0.15, emoji.size * 0.1, 0, 0, Math.PI * 2)
          ctx.fill()

          // Nose
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(-emoji.size * 0.1, emoji.size * 0.1)
          ctx.lineTo(emoji.size * 0.1, emoji.size * 0.1)
          ctx.closePath()
          ctx.fillStyle = "#FF6B6B"
          ctx.fill()

          // Mouth
          ctx.beginPath()
          ctx.moveTo(0, emoji.size * 0.1)
          ctx.lineTo(0, emoji.size * 0.2)
          ctx.strokeStyle = "#000"
          ctx.lineWidth = emoji.size * 0.05
          ctx.stroke()

          // Whiskers
          ctx.beginPath()
          ctx.moveTo(-emoji.size * 0.1, emoji.size * 0.1)
          ctx.lineTo(-emoji.size * 0.5, 0)
          ctx.moveTo(-emoji.size * 0.1, emoji.size * 0.1)
          ctx.lineTo(-emoji.size * 0.5, emoji.size * 0.2)
          ctx.moveTo(emoji.size * 0.1, emoji.size * 0.1)
          ctx.lineTo(emoji.size * 0.5, 0)
          ctx.moveTo(emoji.size * 0.1, emoji.size * 0.1)
          ctx.lineTo(emoji.size * 0.5, emoji.size * 0.2)
          ctx.lineWidth = emoji.size * 0.03
          ctx.stroke()

          // Ears
          ctx.beginPath()
          ctx.moveTo(-emoji.size * 0.4, -emoji.size * 0.5)
          ctx.lineTo(-emoji.size * 0.2, -emoji.size * 0.8)
          ctx.lineTo(0, -emoji.size * 0.5)
          ctx.fillStyle = "#FFE15D"
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(emoji.size * 0.4, -emoji.size * 0.5)
          ctx.lineTo(emoji.size * 0.2, -emoji.size * 0.8)
          ctx.lineTo(0, -emoji.size * 0.5)
          ctx.fill()
          break

        case 6: // Heart
          ctx.beginPath()
          ctx.moveTo(0, emoji.size * 0.3)
          ctx.bezierCurveTo(emoji.size * 0.3, -emoji.size * 0.3, emoji.size * 1, -emoji.size * 0.3, 0, emoji.size * 0.8)
          ctx.bezierCurveTo(
            -emoji.size * 1,
            -emoji.size * 0.3,
            -emoji.size * 0.3,
            -emoji.size * 0.3,
            0,
            emoji.size * 0.3,
          )
          ctx.fillStyle = "#FF6B6B"
          ctx.fill()
          break

        case 7: // Star-struck
          // Eyes as stars
          ctx.fillStyle = "#FFD700"

          // Left star eye
          ctx.save()
          ctx.translate(-emoji.size * 0.3, -emoji.size * 0.2)
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
            const outerX = Math.cos(angle) * emoji.size * 0.2
            const outerY = Math.sin(angle) * emoji.size * 0.2
            const innerAngle = angle + Math.PI / 5
            const innerX = Math.cos(innerAngle) * (emoji.size * 0.1)
            const innerY = Math.sin(innerAngle) * (emoji.size * 0.1)

            if (i === 0) {
              ctx.moveTo(outerX, outerY)
            } else {
              ctx.lineTo(outerX, outerY)
            }

            ctx.lineTo(innerX, innerY)
          }
          ctx.closePath()
          ctx.fill()
          ctx.restore()

          // Right star eye
          ctx.save()
          ctx.translate(emoji.size * 0.3, -emoji.size * 0.2)
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5 - Math.PI / 2
            const outerX = Math.cos(angle) * emoji.size * 0.2
            const outerY = Math.sin(angle) * emoji.size * 0.2
            const innerAngle = angle + Math.PI / 5
            const innerX = Math.cos(innerAngle) * (emoji.size * 0.1)
            const innerY = Math.sin(innerAngle) * (emoji.size * 0.1)

            if (i === 0) {
              ctx.moveTo(outerX, outerY)
            } else {
              ctx.lineTo(outerX, outerY)
            }

            ctx.lineTo(innerX, innerY)
          }
          ctx.closePath()
          ctx.fill()
          ctx.restore()

          // Open mouth
          ctx.beginPath()
          ctx.arc(0, emoji.size * 0.2, emoji.size * 0.2, 0, Math.PI * 2)
          ctx.fillStyle = "#000"
          ctx.fill()
          break

        case 8: // Sparkles
          // Draw multiple small sparkles
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2
            const x = Math.cos(angle) * emoji.size * 0.5
            const y = Math.sin(angle) * emoji.size * 0.5

            ctx.save()
            ctx.translate(x, y)

            // Draw a sparkle
            ctx.beginPath()
            for (let j = 0; j < 4; j++) {
              const sparkleAngle = (j * Math.PI) / 2
              const outerX = Math.cos(sparkleAngle) * emoji.size * 0.3
              const outerY = Math.sin(sparkleAngle) * emoji.size * 0.3
              const innerAngle = sparkleAngle + Math.PI / 4
              const innerX = Math.cos(innerAngle) * (emoji.size * 0.1)
              const innerY = Math.sin(innerAngle) * (emoji.size * 0.1)

              if (j === 0) {
                ctx.moveTo(outerX, outerY)
              } else {
                ctx.lineTo(outerX, outerY)
              }

              ctx.lineTo(innerX, innerY)
            }
            ctx.closePath()
            ctx.fillStyle = "#FFD700"
            ctx.fill()

            ctx.restore()
          }

          // Center sparkle
          ctx.beginPath()
          for (let j = 0; j < 4; j++) {
            const sparkleAngle = (j * Math.PI) / 2
            const outerX = Math.cos(sparkleAngle) * emoji.size * 0.2
            const outerY = Math.sin(sparkleAngle) * emoji.size * 0.2
            const innerAngle = sparkleAngle + Math.PI / 4
            const innerX = Math.cos(innerAngle) * (emoji.size * 0.07)
            const innerY = Math.sin(innerAngle) * (emoji.size * 0.07)

            if (j === 0) {
              ctx.moveTo(outerX, outerY)
            } else {
              ctx.lineTo(outerX, outerY)
            }

            ctx.lineTo(innerX, innerY)
          }
          ctx.closePath()
          ctx.fillStyle = "#FFFFFF"
          ctx.fill()
          break

        case 9: // Rainbow
          // Draw rainbow arcs
          const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]

          for (let i = 0; i < colors.length; i++) {
            const arcWidth = emoji.size * 0.15
            const radius = emoji.size * 0.5 + i * arcWidth

            ctx.beginPath()
            ctx.arc(0, emoji.size * 0.5, radius, Math.PI, 0)
            ctx.strokeStyle = colors[i]
            ctx.lineWidth = arcWidth
            ctx.stroke()
          }

          // Draw clouds at the ends
          ctx.fillStyle = "#FFFFFF"

          // Left cloud
          ctx.beginPath()
          ctx.arc(-emoji.size * 0.5, emoji.size * 0.5, emoji.size * 0.2, 0, Math.PI * 2)
          ctx.arc(-emoji.size * 0.7, emoji.size * 0.5, emoji.size * 0.15, 0, Math.PI * 2)
          ctx.arc(-emoji.size * 0.3, emoji.size * 0.5, emoji.size * 0.15, 0, Math.PI * 2)
          ctx.fill()

          // Right cloud
          ctx.beginPath()
          ctx.arc(emoji.size * 0.5, emoji.size * 0.5, emoji.size * 0.2, 0, Math.PI * 2)
          ctx.arc(emoji.size * 0.7, emoji.size * 0.5, emoji.size * 0.15, 0, Math.PI * 2)
          ctx.arc(emoji.size * 0.3, emoji.size * 0.5, emoji.size * 0.15, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#FDFFB6")
      gradient.addColorStop(1, "#FFC6FF")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw emojis
      emojis.forEach((emoji) => {
        drawEmoji(emoji)

        // Update position
        emoji.x += emoji.speedX
        emoji.y += emoji.speedY
        emoji.rotation += emoji.rotationSpeed

        // Bounce off walls
        if (emoji.x < -emoji.size) emoji.x = canvas.width + emoji.size
        if (emoji.x > canvas.width + emoji.size) emoji.x = -emoji.size
        if (emoji.y < -emoji.size) emoji.y = canvas.height + emoji.size
        if (emoji.y > canvas.height + emoji.size) emoji.y = -emoji.size
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
