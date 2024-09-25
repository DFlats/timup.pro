/* eslint-disable react/react-in-jsx-scope */
import { useClientUser } from "../../hooks/users";
import { TagEditor } from "../tags";

export function EditUserModal() {
    const {
        clientUser,
        addTagToClientUser,
        removeTagFromClientUser
    } = useClientUser();

    if (!clientUser) return;

    return (
        <>
            <dialog id={import.meta.env.VITE_CLIENT_USER_MODAL_ID} className="modal">
                <div className="modal-box max-w-[29rem] p-14 pt-2 bg-[#010624] border border-white border-opacity-10">
                    <h3
                        className="font-bold text-2xl text-white text-center pt-10">
                        Edit Profile
                    </h3>
                    <h4 className="font-bold text-xl text-center pt-2 pb-4">{clientUser.name}</h4>
                    <TagEditor
                        tags={clientUser.tags}
                        onAddTag={addTagToClientUser}
                        onRemoveTag={removeTagFromClientUser} />
                    <form method="dialog">
                        <button className="btn btn-lg btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}