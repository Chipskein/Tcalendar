let displayModalMember = false;
let modalMember = document.getElementById('add-member');

const toggleModalMember = () => {
    displayModalMember = !displayModalMember;
    if(displayModalMember) modalMember.style.display = 'flex';
    else modalMember.style.display = 'none';
}