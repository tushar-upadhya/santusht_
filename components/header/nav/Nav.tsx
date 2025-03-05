"use client";
import { NavLink } from "@/lib/types/navtype";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
    links: NavLink[] | undefined;
    containerStyles?: string;
    linkStyles?: string;
    underlineStyles?: string;
    onClick?: () => void; // ✅ Fix: Add onClick prop to close menu on item click
}

const Nav = ({
    links = [],
    containerStyles = "",
    linkStyles = "",
    underlineStyles = "",
    onClick, // ✅ Accept the onClick function from parent
}: NavProps) => {
    const path = usePathname();

    if (!links || links.length === 0) {
        return null; // ✅ Prevent rendering if links are undefined or empty
    }

    return (
        <nav className={containerStyles}>
            {links.map((link) => (
                <Link
                    href={link.path}
                    key={link.path}
                    className={`capitalize ${linkStyles}`}
                    onClick={onClick}
                >
                    {link.path === path && <span className={underlineStyles} />}
                    {link.name}
                </Link>
            ))}
        </nav>
    );
};

export default Nav;
