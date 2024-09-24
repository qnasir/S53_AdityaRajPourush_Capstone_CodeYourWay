import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { AuthContext } from "@/components/context/authContext";

const LogInPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const {login} = useContext(AuthContext)
  const navigate = useNavigate();
  

  async function onSubmit(values) {
    console.log(values);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        values
      );
      console.log(response);

      // Store the access token and refresh token in the local storage or session storage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      login(response.data.loggedInUser.username, response.data.loggedInUser._id);

      toast.success(`${response.data.loggedInUser.username}, ${response.data.message}`);
      navigate("/", {replace: true});
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    }
  }

  

  return (
    <div className="w-full min-h-[100vh]">
      <Toaster closeButton="true" richColors="true" position="top-center"/>
      <div className="auth-top-nav w-[100%] flex justify-between px-[3vw] py-[2vh] items-center">
        <Link to={"/"}>
          <Button variant="outline" size="icon">
            <HomeIcon />
          </Button>
        </Link>
        <ModeToggle />
      </div>

      <div>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Fill in Username or Email
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        <Link
                          to={"/"}
                          className="underline hover:decoration-sky-600"
                        >
                          Forgot Password ?
                        </Link>
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Log In
                </Button>
              </CardFooter>
            </form>
          </Form>
          <CardFooter>
            <Button className="w-full">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/fluency/48/google-logo.png"
                alt="google-logo"
              />
              Log In with Google
            </Button>
          </CardFooter>
        </Card>
        <p className="text-center m-[1vh]">
          Not have an account?
          <Link to={"/signup"} className="hover:underline">
            {" "}
            SignUp Here{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
