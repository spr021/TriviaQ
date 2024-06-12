import "./App.css"
import { ScreenMode } from "./types"
import AppBar from "./components/appbar/AppBar"
import useTimer from "./hooks/useTimer/useTimer"
import Timer from "./components/timer/Timer"
import SecondsCounter from "./components/secound-counter/SecoundCounter"
import { useEffect } from "react"
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore"
import WebApp from "@twa-dev/sdk"
import { db } from "./Firebase"

function App() {
  const { timeLeft, screenMode } = useTimer()

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("id", "asc"))
    let isUserExist = false
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().id === WebApp.initDataUnsafe.user?.id) {
          isUserExist = true
        }
      })
      if (!isUserExist) {
        addDoc(collection(db, "users"), {
          id: WebApp.initDataUnsafe.user?.id,
          username: WebApp.initDataUnsafe.user?.username,
          heart: 3,
        })
      }
    })
  }, [])

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
