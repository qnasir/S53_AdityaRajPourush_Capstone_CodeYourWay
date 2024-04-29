import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

import { useTheme } from "@/components/context/theme-provider";
import { Link } from "react-router-dom";

const Navbar_1 = () => {
  const { theme } = useTheme();

  const navbarBgColor = theme === "dark" ? "bg-fuchsia-800" : "bg-violet-400";
  const navbarTextColor =
    theme === "dark" ? "text-slate-300" : "text-slate-800";

  return (
    <div
      className={`navbar flex items-center p-[1vh] ${navbarBgColor} ${navbarTextColor}`}
    >
      <div className="logo w-[20vw] flex justify-center items-center">
        <h1>CodeYourWay</h1>
      </div>
      <div className="flex items-center justify-between w-[80vw] px-[1vw]">
        <div className="nav-links">
          <ul className="flex justify-evenly w-[20vw]">
            <li>Problems</li>
            <li>Discuss</li>
          </ul>
        </div>
        <div className="flex justify-around w-[20vw]">
          <ModeToggle />
          <div className="flex justify-around">
            <Link to={"/signup"}>
              <Button variant="ghost">Register</Button>
            </Link>
            <Button variant="ghost">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar_1;
