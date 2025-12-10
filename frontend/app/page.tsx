"use client";

import React from "react";
import {Button, Input, Checkbox, Link, Form, Divider} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useMutation} from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function Component() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // 🔥 useMutation for login
    const loginMutation = useMutation({
        mutationFn: apiRouter.sessions.createSession,
        onSuccess: (data) => {
            console.log("Login Success:", data);
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };


        loginMutation.mutate(payload);
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-large flex w-full max-w-sm flex-col gap-4">
                <div className="flex flex-col items-center pb-6">
                    <p className="text-xl font-medium">Welcome</p>
                    <p className="text-small text-default-500">Log in to your account to continue</p>
                </div>

                <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        label="Email Address"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        variant="bordered"
                    />

                    <Input
                        isRequired
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon className="text-default-400 pointer-events-none text-2xl" icon="solar:eye-closed-linear" />
                                ) : (
                                    <Icon className="text-default-400 pointer-events-none text-2xl" icon="solar:eye-bold" />
                                )}
                            </button>
                        }
                    />

                    <div className="flex w-full items-center justify-between px-1 py-2">
                        <Checkbox name="remember" size="sm">
                            Remember me
                        </Checkbox>
                        <Link className="text-default-500" href="#" size="sm">
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        className="w-full"
                        color="primary"
                        type="submit"
                        isLoading={loginMutation.isPending}
                    >
                        Sign In
                    </Button>
                </Form>

                {/* 🔥 Show errors or success */}
                {loginMutation.isError && (
                    <p className="text-red-500 text-small">Login failed. Please try again.</p>
                )}

                {loginMutation.isSuccess && (
                    <p className="text-green-500 text-small">Login successful!</p>
                )}

                <div className="flex items-center gap-4 py-2">
                    <Divider className="flex-1" />
                    <p className="text-tiny text-default-500 shrink-0">OR</p>
                    <Divider className="flex-1" />
                </div>

                <p className="text-small text-center">
                    Need to create an account?&nbsp;
                    <Link href="#" size="sm">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
