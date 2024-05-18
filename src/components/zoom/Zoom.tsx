import { useState, useEffect, ReactNode } from "react"
import { styled, keyframes } from "@mui/system"
import Box from "@mui/material/Box"

// Define the zoom animation using keyframes
const zoomInOut = keyframes`
  15% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`

// Create a styled component with the zoom animation
const ZoomBox = styled(Box)(() => ({
  animation: `${zoomInOut} 1s infinite`,
}))

const ZoomAnimationComponent = ({ children }: { children: ReactNode }) => {
  const [trigger, setTrigger] = useState(false)

  // Toggle the trigger every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger((prev) => !prev)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <ZoomBox>{children}</ZoomBox>
}

export default ZoomAnimationComponent
