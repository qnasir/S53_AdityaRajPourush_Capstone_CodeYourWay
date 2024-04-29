import React from "react";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SignUpPage = () => {
  return (
    <div>
      <div className="auth-top-nav w-[100%] flex justify-between px-[3vw] py-[2vh] items-center">
        <Link to={"/"}>
          <Button variant="outline" size="icon">
            <HomeIcon />
          </Button>
        </Link>
        <ModeToggle />
      </div>

      <div className="m-[2vw]">
        <Card className={cn("max-w-lg m-auto")}>
          <CardHeader>
            <CardTitle className={cn("text-lg")}>Sign Up</CardTitle>
            <CardDescription>Enter Your Credentials to sign Up</CardDescription>
          </CardHeader>
          <CardContent>
            
          </CardContent>
          <CardFooter>
            <Button>Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
