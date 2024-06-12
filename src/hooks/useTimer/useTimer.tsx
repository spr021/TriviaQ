import { useEffect, useState } from "react"
import { ScreenMode, TimeLeft } from "../../types"

function getTimeUntil10PM(): TimeLeft {
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
  const formattedHours = hours.toString().padStart(2, "0")
  const formattedMinutes = minutes.toString().padStart(2, "0")
  const formattedSeconds = seconds.toString().padStart(2, "0")

  return {
    hours: formattedHours,
    minutes: formattedMinutes,
    formattedSeconds,
    seconds,
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

function useTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeUntil10PM())
  const [screenMode, setScreenMode] = useState<ScreenMode>(getMood())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntil10PM())
      setScreenMode(getMood())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { timeLeft, screenMode }
}

export default useTimer
