import WebApp from "@twa-dev/sdk"
import { Avatar, Box, Icon } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PersonIcon from "@mui/icons-material/Person"
import { useState } from "react"

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  }
}

const AppBar = () => {
  const [heartCount, _] = useState(3)

  return (
    <Box
      sx={{ position: "absolute", top: 0, left: 0, right: 0, p: 2 }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex">
        <Avatar
          src={WebApp.initDataUnsafe.user?.photo_url}
          {...stringAvatar(
            `${WebApp.initDataUnsafe.user?.first_name} ${WebApp.initDataUnsafe.user?.last_name}`
          )}
        >
          <PersonIcon />
        </Avatar>
        {/* User profile picture would go here */}
        <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
          {Array.from({ length: heartCount }, (_, index) => (
            <Icon key={index}>
              <FavoriteIcon />
            </Icon>
          ))}
          {Array.from({ length: 5 - heartCount }, (_, index) => (
            <Icon key={index}>
              <FavoriteBorderIcon />
            </Icon>
          ))}
        </Box>
      </Box>
      <Box>
        <Icon>
          <MoreVertIcon />
        </Icon>
      </Box>
    </Box>
  )
}

export default AppBar
