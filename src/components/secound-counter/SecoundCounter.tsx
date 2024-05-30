import { Box, Typography } from "@mui/material"
import ZoomAnimation from "../../components/zoom/Zoom"
import { TimeLeft } from "../../types"

function SecondsCounter({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <ZoomAnimation>
          <Typography sx={{ fontSize: 250 }}>{timeLeft.seconds}</Typography>
        </ZoomAnimation>
      </Box>
    </>
  )
}

export default SecondsCounter
