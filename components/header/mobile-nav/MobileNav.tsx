"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "@/lib/types/navtype";
import { AlignJustify } from "lucide-react";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";

interface MobileNavProps {
    links: NavLink[];
}

const MobileNav: React.FC<MobileNavProps> = ({ links }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mx-auto container">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <AlignJustify
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}
                    />
                </SheetTrigger>

                <SheetContent>
                    <div className="flex flex-col items-center justify-between h-full py-8">
                        <div className="flex flex-col items-center gap-y-32">
                            <Logo />

                            <Nav
                                links={links} // ✅ Using the passed links prop
                                containerStyles="flex flex-col items-center gap-y-6"
                                linkStyles="text-[min(4.5vw,1rem)] leading-normal"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNav;
