let displayModalTeam = false;
let modalTeam = document.getElementById('teams-create-bg');

const toggleModalTeam = () => {
    displayModalTeam = !displayModalTeam;
    if(displayModalTeam) modalTeam.style.display = 'flex';
    else modalTeam.style.display = 'none';
}