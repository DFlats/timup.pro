export function useEditUserModal() {

    const openEditUserModal = () => {
        const modal = document.getElementById(import.meta.env.VITE_CLIENT_USER_MODAL_ID) as HTMLDialogElement;
        if (!modal) return;
        modal.showModal();
    }

    return {
        openEditUserModal
    }
}