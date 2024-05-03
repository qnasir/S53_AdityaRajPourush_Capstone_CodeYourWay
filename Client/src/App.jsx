import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import { ThemeProvider } from "@/components/context/theme-provider";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage/>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
