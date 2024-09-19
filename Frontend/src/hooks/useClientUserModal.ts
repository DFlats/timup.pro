export function useEditUserModal() {

    const openEditUserModal = () => {
        console.log("!");
        const modal = document.getElementById(import.meta.env.VITE_CLIENT_USER_MODAL_ID) as HTMLDialogElement;
        if (!modal) return;
        console.log(modal);
        modal.showModal();
    }

    return {
        openEditUserModal
    }
}