import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from '@mui/material';
import config from "./../config.json";

const redirectUri = window.location.origin.indexOf("localhost") !== -1 ? window.location.origin : `${window.location.origin}${config.redirect}`;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="text" onClick={() => logout({ logoutParams: { returnTo: redirectUri } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;