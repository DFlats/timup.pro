/* eslint-disable react/react-in-jsx-scope */

import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react";
import { ClientUserModal } from ".";
import { useClientUserModal } from "../hooks";

export function Dashboard() {
    const { openClientUserModal } = useClientUserModal();

    return (
        <div className="flex items-center justify-center">
            <SignedIn>
                <button className="btn text-3xl" onClick={openClientUserModal}>
                    Profile
                </button>
                <SignOutButton>
                    <button className='btn text-3xl'>Sign Out</button>
                </SignOutButton>

                <ClientUserModal />
            </SignedIn>
            <SignedOut>
                <SignInButton mode='modal'>
                    <button className="btn text-3xl">
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton mode='modal'>
                    <button className="btn text-3xl">
                        Sign Up
                    </button>
                </SignUpButton>
            </SignedOut>

        </div>
    );
}