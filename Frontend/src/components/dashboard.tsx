/* eslint-disable react/react-in-jsx-scope */
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { CreateProjectModal } from "./projects";
import { openCreateProjectModal } from "../modalControllers";
import { useClientUser } from "../hooks/users";


export function Dashboard() {
    const { clientUser } = useClientUser();

    const profileLink = clientUser ? (
        <Link to={`/profile/${clientUser.id}`}>
            <button className="btn text-3xl">
                Profile
            </button>
        </Link>
    ) : null;

    return (
        <div className="flex items-center justify-center">
            <SignedIn>
                {profileLink}
                <button className='btn' onClick={openCreateProjectModal}>Create Project</button>
                <CreateProjectModal />

                <SignOutButton>
                    <button className='mx-4 btn text-3xl'>Sign Out</button>
                </SignOutButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode='modal'>
                    <button className="btn">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton mode='modal'>
                    <button className="btn">
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>
        </div>
    );
}
