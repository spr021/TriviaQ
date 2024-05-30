import TimerAnimation from "../../assets/TimerAnimation.json"
import Lottie from "lottie-react"
import { Box, Typography } from "@mui/material"
import { TimeLeft } from "../../types"

function Timer({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
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
  )
}

export default Timer
