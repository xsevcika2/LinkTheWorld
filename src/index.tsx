import React from "react";
import theme from "./theme";
import ReactDOM from "react-dom/client";
import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router/Router";
import Header from "./components/Header/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Grid
          container
          textAlign={"center"}
          justifyContent={"center"}
          paddingBottom={10}
        >
          <Header />
          <Router />
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
