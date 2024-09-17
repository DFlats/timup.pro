/* eslint-disable react/react-in-jsx-scope */

import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import ClientUserModal from "./ClientUserModal";
import useClientUserModal from "../hooks/useClientUserModal";

export default function Dashboard() {
    const { openClientUserModal } = useClientUserModal();

    return (
        <div className="flex items-center justify-center">
            <SignedOut>
                <SignInButton mode='modal'>
                    <button className="btn text-3xl">
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <SignOutButton>
                    <button className='btn text-3xl'>Sign Out</button>
                </SignOutButton>
                <button className="btn text-3xl" onClick={openClientUserModal}>
                    Profile
                </button>
                <ClientUserModal />
            </SignedIn>
        </div>
    );
}