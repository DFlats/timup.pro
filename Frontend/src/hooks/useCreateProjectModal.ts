export function useCreateProjectModal() {

    const openCreateProjectModal = () => {
        const modal = document.getElementById(import.meta.env.VITE_CREATE_PROJECT_MODAL_ID) as HTMLDialogElement;
        if (!modal) return;
        modal.showModal();
    }

    return {
        openCreateProjectModal
    }
}