/* eslint-disable react/react-in-jsx-scope */

import { Link } from "@tanstack/react-router";
import Logo from "../components/Logo";
import Dashboard from "../components/Dashboard";

export default function ProjectCard() {
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