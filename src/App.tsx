import TimerAnimation from "./assets/TimerAnimation.json"
import "./App.css"
import Lottie from "lottie-react"
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ScreenMode } from "./types"
import ZoomAnimation from "./components/zoom/Zoom"

function getTimeUntil10PM() {
  const now = new Date()
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    22,
    0,
    0,
    0
  ) // 10 PM today

  // If the current time is past 10 PM, set the target to 10 PM tomorrow
  if (now > target) {
    target.setDate(target.getDate() + 1)
  }

  const difference = target.getTime() - now.getTime() // Difference in milliseconds
  const hours = Math.floor(difference / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  // Add leading zeros to single-digit numbers
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return {
    hours: formattedHours,
    minutes: formattedMinutes,
    formattedSeconds,
    seconds
  }
}

function getMood() {
  const now = new Date()
  const target10PM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    22,
    0,
    0,
    0
  ) // 10 PM today
  const targetMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    24,
    0,
    0,
    0
  ) // 12 AM (midnight)

  // If the current time is past 10 PM, set the target to 10 PM tomorrow
  if (now > target10PM) {
    target10PM.setDate(target10PM.getDate() + 1)
  }

  const thirtySecondsBefore10PM = new Date(target10PM.getTime() - 30000) // 30 seconds before 10 PM

  if (now >= thirtySecondsBefore10PM && now < target10PM) {
    return ScreenMode.secound // 30 seconds before 10 PM
  } else if (now >= target10PM && now < targetMidnight) {
    return ScreenMode.quiz // 10 PM until 12 AM
  } else {
    return ScreenMode.countDown // All other times
  }
}

function App() {
  const [screenMode, setScreenMode] = useState<ScreenMode>(getMood())
  const [timeLeft, setTimeLeft] = useState(getTimeUntil10PM())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntil10PM())
      setScreenMode(getMood())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {screenMode === ScreenMode.countDown && (
        <>
          <div>
            <Lottie animationData={TimerAnimation} loop={true} />
          </div>
          <Typography variant="h2" align="left">
            Come Back <b>Tonight</b>
          </Typography>
          <Box
            display="flex"
            sx={{ mt: 2, width: "full" }}
            justifyContent="space-evenly"
          >
            <Box display="flex" alignItems="end">
              <Typography variant="h3" sx={{ fontWeight: "bold", mr: 3 }}>
                {timeLeft.hours}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                :
              </Typography>
            </Box>
            <Box display="flex" alignItems="end">
              <Typography variant="h3" sx={{ fontWeight: "bold", mr: 3 }}>
                {timeLeft.minutes}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                :
              </Typography>
            </Box>
            <Box display="flex" alignItems="end">
              <Typography variant="h3" sx={{ fontWeight: "bold", mr: 3 }}>
                {timeLeft.formattedSeconds}
              </Typography>
            </Box>
          </Box>
        </>
      )}
      {screenMode === ScreenMode.secound && (
        <>
          <Box display="flex" alignItems="center" justifyContent="center">
            <ZoomAnimation><Typography sx={{fontSize: 250}}>{timeLeft.seconds}</Typography></ZoomAnimation>
          </Box>
        </>
      )}
      {screenMode === ScreenMode.quiz && <></>}
    </>
  )
}

export default App
