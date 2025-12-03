'use client';
import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@heroui/navbar";
import {Button} from "@heroui/button";
import {Kbd} from "@heroui/kbd";
import {Link} from "@heroui/link";
import {Input} from "@heroui/input";
import React, { useEffect, useRef } from 'react';
import clsx from "clsx";

import {siteConfig} from "@/config/site";

export const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    /*const searchInput = (
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    );*/

    return (
        <HeroUINavbar isMenuOpen={isMenuOpen}
                      onMenuOpenChange={setIsMenuOpen} maxWidth="xl" position="static" shouldHideOnScroll>
            <NavbarContent className="basis-1/5 lg:basis-full" justify="center">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link className="flex justify-start items-center gap-1" href="/">
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
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                </NavbarItem>
            </NavbarContent>


            <NavbarMenu>
                {/*searchInput*/}
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