import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useTheme } from "@/components/context/theme-provider";

const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Username can only contain alphanumeric characters and underscores",
    })
    .trim()
    .toLowerCase(),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }
    ),

  fullname: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(30, { message: "Full name must be at most 30 characters long" })
    .trim(),
});

const SignUpPage = () => {
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullname: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div className="w-full min-h-[100vh]">
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
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Fill in Credentials to sign up</CardDescription>
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Fullname" {...field} />
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
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        <Link to={"/"} className="underline hover:decoration-sky-600">Forgot Password ?</Link>
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Sign Up
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
              Sign Up with Google
            </Button>
          </CardFooter>
        </Card>
        <p className="text-center m-[1vh]">Already have an account? 
          <Link to={"/login"} className="hover:underline"> Login Here </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
