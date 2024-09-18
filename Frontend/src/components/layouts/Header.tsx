/* eslint-disable react/react-in-jsx-scope */

import { Link } from "@tanstack/react-router";
import { Dashboard, Logo } from "../";

export function Header() {
    return (
        <header className="flex justify-between p-8">
            <Link to="/">
                <Logo />
            </Link>
            <div className="flex items-center justify-center gap-4">
                <Link className="text-white text-3xl" to="/">Home</Link>
                <Dashboard />
            </div>
        </header>
    );
}