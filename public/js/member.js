let displayModal = false;
let modal = document.getElementById('add-member');

const toggleModalMember = () => {
    displayModal = !displayModal;
    if(displayModal) modal.style.display = 'flex';
    else modal.style.display = 'none';
}