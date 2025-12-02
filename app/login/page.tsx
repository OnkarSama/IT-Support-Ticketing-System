"use client";

import React from "react";
import {Button, Input, Checkbox, Link, Form, Divider} from "@heroui/react";
import {Icon} from "@iconify/react";

//JavaScript Part
export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);   

    const submission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submission successful!");
    };

    //HTML Part
    return (
        //Tailwind CSS to center all elements. Login card and header CSS.
        <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
                <div className="flex flex-col items-center pb-6">
                    <p className="text-3xl font-medium">Welcome</p>
                    <p className="text-small text-default-500">Log in to your account to continue</p>
                </div>

                <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={submission}>
                    {/*Email Textfield*/}
                    <Input
                        isRequired
                        label="Email Address"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        variant="bordered"
                    />

                    {/*Password Textfield*/}
                    <Input
                        isRequired
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        variant="bordered"
                    />

                    <br></br>
                    {/*Login Button*/}
                    <Button className="w-full" color="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}