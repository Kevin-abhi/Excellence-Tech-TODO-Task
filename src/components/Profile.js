import React from "react";
import {Box, Avatar,Typography} from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box 
      display="flex"
      flex-direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{margin: 1}}>          
          <Avatar src={user.picture} alt={user.name} sx={{ width: 56, height: 56 }}/>
          <Typography style={{ padding: 10 }} variant="inherit">
            {user.name}
          </Typography>
      </Box>  
    )
  );
};

export default Profile;