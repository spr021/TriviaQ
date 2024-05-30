import "./App.css"
import { ScreenMode } from "./types"
import AppBar from "./components/appbar/AppBar"
import useTimer from "./hooks/useTimer/useTimer"
import Timer from "./components/timer/Timer"
import SecondsCounter from "./components/secound-counter/SecoundCounter"

function App() {
  const { timeLeft, screenMode } = useTimer()

  return (
    <>
      <AppBar />
      {screenMode === ScreenMode.countDown && <Timer timeLeft={timeLeft} />}
      {screenMode === ScreenMode.secound && <SecondsCounter timeLeft={timeLeft} />}
      {screenMode === ScreenMode.quiz && <></>}
    </>
  )
}

export default App
