/* eslint-disable react/react-in-jsx-scope */
import { useUsers } from "../../hooks";
import { TagEditor } from "../tags";

export function EditUserModal() {
    const {
        clientUser,
        addTagToClientUser,
        removeTagFromClientUser
    } = useUsers({ type: 'clientUser' });

    if (!clientUser) return;

    return (
        <>
            <dialog id={import.meta.env.VITE_CLIENT_USER_MODAL_ID} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{clientUser.name}</h3>
                    <TagEditor
                        tags={clientUser.skillTags}
                        tagType='skill'
                        onAddTag={addTagToClientUser}
                        onRemoveTag={removeTagFromClientUser} />
                    <TagEditor
                        tags={clientUser.interestTags}
                        tagType='interest'
                        onAddTag={addTagToClientUser}
                        onRemoveTag={removeTagFromClientUser} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}