/* eslint-disable react/react-in-jsx-scope */
import { Link } from "@tanstack/react-router";
import { Dashboard, Logo } from "../../components";

export function Header() {
    return (
        <header className="flex justify-between p-10 pl-14 pr-14">
            <Link to="/">
                <Logo />
            </Link>
            <div className="flex items-center justify-center gap-4">
                <Dashboard />
            </div>
        </header>
    );
}
