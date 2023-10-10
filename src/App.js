// routes
// theme
// components
import React from "react";

import ThemeSettings from "./components/settings";
import ThemeProvider from "./theme";
import Router from "./routes";





function App() {




  return (

    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings>
    </ThemeProvider>




  );
}

export default App;