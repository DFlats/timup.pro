export default function useClientUserModal() {
    const openClientUserModal = () => {
        const modal = document.getElementById(import.meta.env.VITE_CLIENT_USER_MODAL_ID) as HTMLDialogElement;
        if (!modal) return;
        modal.showModal();
    }
    return {
        openClientUserModal
    }
}