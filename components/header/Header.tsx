"use client";

import Breadcrumbs from "@/components/bread-crumbs/Breadcrumbs";
import { adminLinks, userLinks } from "@/lib/links/NavLinks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "../theme/theme-toggler/ThemeToggler";
import HeaderOne from "./header-one/HeaderOne";
import Logo from "./logo/Logo";
import MobileNav from "./mobile-nav/MobileNav";
import Nav from "./nav/Nav";

const Header: React.FC = () => {
    const [header, setHeader] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setHeader(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <header
            className={`${
                header ? "py-4  dark:bg-accent/100" : "py-6 dark:bg-transparent"
            } sticky top-0 z-30 transition-all ${
                pathname === "/" ? "bg-[#fef9f5]" : "bg-white dark:bg-accent"
            }`}
        >
            <div className="container mx-auto">
                <div className="-mt-4">
                    <HeaderOne />
                </div>

                <div className="flex items-center justify-between">
                    <Logo
                        title="SANTUSHT"
                        description="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                    />
                    <div className="flex items-center gap-x-3">
                        {/* ✅ Admin and User Navigation Toggle */}
                        <Nav
                            links={isAdminRoute ? adminLinks : userLinks}
                            containerStyles="hidden xl:flex gap-x-8 items-center"
                            linkStyles="relative hover:text-primary transition-all"
                            underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
                        />
                        <ThemeToggler />
                        {/* ✅ Mobile Navigation */}
                        <div className="xl:hidden mr-4">
                            <MobileNav
                                links={isAdminRoute ? adminLinks : userLinks}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Fix Breadcrumbs alignment */}
            <div className="flex justify-center mt-2">
                <Breadcrumbs />
            </div>
        </header>
    );
};

export default Header;
