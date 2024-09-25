/* eslint-disable react/react-in-jsx-scope */
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { CreateProjectModal } from "./projects";
import { openCreateProjectModal } from "../modalControllers";
import { useClientUser } from "../hooks/users";
import { InvitesDropdown } from "./transactions";


export function Dashboard() {
    const { clientUser } = useClientUser();

    const profileLink = clientUser ? (
        <Link to={`/profile/${clientUser.id}`}>
            <button className="text-slate-50 text-3xl mr-8">
                Profile
            </button>
        </Link>
    ) : null;

    return (
        <div className="flex items-center justify-center">
            <SignedIn>
                <InvitesDropdown />
                {profileLink}
                <button className='text-slate-50 text-3xl mr-8' onClick={openCreateProjectModal}>Create Project</button>
                <CreateProjectModal />

                <SignOutButton>
                    <button className='text-slate-50 text-3xl mr-8'>Sign Out</button>
                </SignOutButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode='modal'>
                    <button className="text-slate-50 text-3xl mr-8">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton mode='modal'>
                    <button className="btn h-14 w-48 btn-accent text-slate-50 text-3xl">
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>
        </div>
    );
}