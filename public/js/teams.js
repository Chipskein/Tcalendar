let displayModal = false;
let modal = document.getElementById('teams-create-bg');

const toggleModal = () => {
    displayModal = !displayModal;
    if(displayModal) modal.style.display = 'flex';
    else modal.style.display = 'none';
}