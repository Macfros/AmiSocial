import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// /*BrowserRouter:-  wraps the entire application and enabes client side routing. when navigated to different route. Browserrouter
//                    detects the change and make changes in the UI
// Navigate: -It is used to navigate to a specific loaction in the application it is used with Routes
// Routes: - defines multiple routes. containes multiple 'Route'
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";  //import useMemo hook - it saves the time and saves us the function to get rexecuted in case of any change
import { useSelector } from "react-redux";     //useSelctor hook :- used to extract data from redux store
import { CssBaseline, ThemeProvider } from "@mui/material"; //CssBaseline :- sets default styles.   ThemeProvider:- allows application to use custom theme
import { createTheme } from "@mui/material/styles"; //used to set various theme variables such as palette,typography, etc.
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);   //retreiveing the value of mode from redux store and storing it in mode variable
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);   //used to set the theme
  const isAuth = Boolean(useSelector((state) => state.token));    //if state.token exist then isauth will be true otherwise false

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;




















// import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
// /*BrowserRouter:-  wraps the entire application and enabes client side routing. when navigated to different route. Browserrouter
//                    detects the change and make changes in the UI
// Navigate: -It is used to navigate to a specific loaction in the application it is used with Routes
// Routes: - defines multiple routes. containes multiple 'Route'
// Route:- defines a single route.*/
// import HomePage from 'scenes/homePage';
// import LoginPage from 'scenes/loginPage';
// import ProfilePage from 'scenes/profilePage';
// import {useMemo} from "react";  //import useMemo hook - it saves the time and saves us the function to get rexecuted in case of any change
// import {useSelector} from "react-redux";   //useSelctor hook :- used to extract data from redux store
// import {CssBaseline, ThemeProvider} from "@mui/material"; //CssBaseline :- sets default styles.   ThemeProvider:- allows application to use custom theme
// import { createTheme } from "@mui/material/styles"; //used to set various theme variables such as palette,typography, etc.
// import {themeSettings} from "./theme";
//
//
//
// function App() {
//
//   const mode  = useSelector((state)=> state.mode);  //retreiveing the value of mode from redux store and storing it in mode variable
//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  //
//   const isAuth = Boolean(useSelector((state)=>state.token));  //if state.token exist then isauth will be true otherwise false
//
//   return (
//     <div className="app">
//      <BrowserRouter>
//      <ThemeProvider theme={theme}>
//        <CssBaseline />
//        <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
//           <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
//
//        </Routes>
//        </ThemeProvider>
//      </BrowserRouter>
//     </div>
//   );
// }
//
// export default App;
