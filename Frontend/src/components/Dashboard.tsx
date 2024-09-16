/* eslint-disable react/react-in-jsx-scope */

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import ClientUserModal from "./ClientUserModal";

export default function Dashboard() {
    const openClientUserModal = () => {
        const modal = document.getElementById(import.meta.env.VITE_CLIENT_USER_MODAL_ID) as HTMLDialogElement;
        if (!modal) return;
        modal.showModal();
    }

    return (
        <div className="p-4 w-screen bg-slate-400 items-center justify-center">
            <SignedOut>
                <div className="ml-auto">
                    <SignInButton mode='modal'>
                        <button className="btn">
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
                <button className="btn mx-4" onClick={openClientUserModal}>
                    Profile
                </button>
                <ClientUserModal />
            </SignedIn>
        </div>
    );
}