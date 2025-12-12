'use client';
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {Input} from "@heroui/input";
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@heroui/react";
import React, {useEffect, useRef} from 'react';
import clsx from "clsx";
import apiRouter from "@/api/router";
import { useRouter } from "next/navigation";
import {siteConfig} from "@/config/site";
import { useQueryClient } from "@tanstack/react-query";


interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    strokeWidth?: number;
    width?: number;
    height?: number;
}

export const SearchIcon = ({
                               size = 24,
                               strokeWidth = 1.5,
                               width,
                               height, ...props
                           }: SearchIconProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={height || size}
            role="presentation"
            viewBox="0 0 24 24"
            width={width || size}
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();


    const handleLogout = async () => {
        await apiRouter.sessions.destroySession();
        queryClient.clear();
        router.push("/");
    };

    return (
        <HeroUINavbar isMenuOpen={isMenuOpen}
                      onMenuOpenChange={setIsMenuOpen} maxWidth="xl" position="static" shouldHideOnScroll>
            <NavbarContent className="flex-1 justify-start items-center gap-4">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link className="flex justify-start items-center gap-1" href="/dashboard">
                        <p className="text-white font-bold text-inherit">Ticket Management</p>
                    </Link>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link
                                className={clsx(
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </ul>

            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    <Input
                        classNames={{
                            base: "h-10 w-[200px]",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search..."
                        size="sm"
                        startContent={<SearchIcon size={18}/>}
                        type="search"
                    />
                </NavbarItem>

                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>


            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link
                                className={clsx(
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href={item.href}
                                onPress={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};