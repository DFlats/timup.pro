export function openEditUserModal() {
    const modal = document.getElementById(import.meta.env.VITE_CLIENT_USER_MODAL_ID) as HTMLDialogElement;

    if (!modal) {
        console.error('Could not find dialog element')
        return;
    }

    modal.showModal();
}