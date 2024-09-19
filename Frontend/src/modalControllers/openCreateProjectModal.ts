export function openCreateProjectModal() {
    const modal = document.getElementById(import.meta.env.VITE_CREATE_PROJECT_MODAL_ID) as HTMLDialogElement;

    if (!modal) {
        console.error('Could not find dialog element')
        return;
    }

    modal.showModal();
}