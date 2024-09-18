/* eslint-disable react/react-in-jsx-scope */

import { useClientUser } from "../hooks";
import ClientUserForm from "./ClientUserForm";

export default function ClientUserModal() {
    const { clientUser } = useClientUser();

    if (!clientUser) return;

    return (
        <>
            <dialog id={import.meta.env.VITE_CLIENT_USER_MODAL_ID} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{clientUser.name}</h3>
                    <ClientUserForm />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}