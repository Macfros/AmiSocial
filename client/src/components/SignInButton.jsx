import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import {Button, useTheme} from "@mui/material";



/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { palette } = useTheme();
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    
    return (
        <Button fullWidth
        type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
        onClick={() => handleLogin("popup")}>Authenticate yourself with Microsoft account</Button>
    );
}
