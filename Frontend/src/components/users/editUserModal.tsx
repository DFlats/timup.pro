/* eslint-disable react/react-in-jsx-scope */
import { useClientUser } from "../../hooks";
import { TagEditor } from "../tags";

export function EditUserModal() {
    const { clientUser, addTag, removeTag } = useClientUser();

    if (!clientUser) return;

    return (
        <>
            <dialog id={import.meta.env.VITE_CLIENT_USER_MODAL_ID} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{clientUser.name}</h3>
                    <TagEditor
                        tags={clientUser.skillTags}
                        tagType='skill'
                        onAddTag={addTag}
                        onRemoveTag={removeTag} />
                    <TagEditor
                        tags={clientUser.interestTags}
                        tagType='interest'
                        onAddTag={addTag}
                        onRemoveTag={removeTag} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export function openEditUserModal() {
    const modal = document.getElementById(import.meta.env.VITE_CLIENT_USER_MODAL_ID) as HTMLDialogElement;

    if (!modal) {
        console.error('Could not find dialog element')
        return;
    }

    modal.showModal();
}