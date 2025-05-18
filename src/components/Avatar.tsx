import type React from "react"

interface AvatarProps {
  src?: string | null
  username?: string
  size?: number
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ src, username = "", size = 40, className = "" }) => {
  // Fonction pour générer une couleur de fond basée sur le nom d'utilisateur
  const getColorFromUsername = (name: string): string => {
    const colors = [
      "#6D28D9", // Violet
      "#EC4899", // Rose
      "#0D9488", // Teal
      "#F97316", // Orange
      "#10B981", // Vert
      "#3B82F6", // Bleu
      "#EF4444", // Rouge
      "#8B5CF6", // Indigo
    ]

    // Utiliser la somme des codes de caractères pour choisir une couleur
    const charCodeSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return colors[charCodeSum % colors.length]
  }

  // Obtenir les initiales (jusqu'à 2 caractères)
  const getInitials = (name: string): string => {
    if (!name) return "?"

    // Diviser le nom en mots et prendre les premières lettres
    const words = name.trim().split(/\s+/)

    if (words.length === 1) {
      // Si un seul mot, prendre les deux premières lettres ou la première si le mot est court
      return words[0].substring(0, Math.min(2, words[0].length)).toUpperCase()
    } else {
      // Sinon prendre la première lettre des deux premiers mots
      return (words[0][0] + words[1][0]).toUpperCase()
    }
  }

  // Si une image est fournie et valide, l'afficher
  if (src) {
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={username || "User avatar"}
        className={`rounded-full object-cover ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        onError={(e) => {
          // En cas d'erreur de chargement, remplacer par les initiales
          e.currentTarget.style.display = "none"
          const next = e.currentTarget.nextElementSibling as HTMLElement | null
          if (next) {
            next.style.display = "flex"
          }
        }}
      />
    )
  }

  // Sinon, afficher les initiales
  const backgroundColor = username ? getColorFromUsername(username) : "#6D28D9"
  const initials = username ? getInitials(username) : "?"

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor,
        fontSize: `${size * 0.4}px`,
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  )
}

export default Avatar
