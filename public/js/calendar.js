const divCalendarWeek = document.getElementById('calendarWeek');
const divCalendarMonth = document.getElementById('calendar-month-name');
const divCalendarYear = document.getElementById('calendar-year-number');

let date = new Date();

let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let days = [];

const months = [
    {id: 0, txt: 'Janeiro', days: 31},
    {id: 1, txt: 'Fevereiro', days: 28},
    {id: 2, txt: 'Março', days: 31},
    {id: 3, txt: 'Abril', days: 30},
    {id: 4, txt: 'Maio', days: 31},
    {id: 5, txt: 'Junho', days: 30},
    {id: 6, txt: 'Julho', days: 31},
    {id: 7, txt: 'Agosto', days: 31},
    {id: 8, txt: 'Setembro', days: 30},
    {id: 9, txt: 'Outubro', days: 31},
    {id: 10, txt: 'Novembro', days: 30},
    {id: 11, txt: 'Dezembro', days: 31},
];

const getRandomColor = () => {
    let colors = ['#8F79E7', '#B0E779', '#79E7A5', '#E79A79'];
    let index = Math.floor(Math.random()*colors.length);

    return colors[index];
}

const getAllDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

const generateDays = (date) => {
    let datesss = getAllDaysInMonth(date.getFullYear(), date.getMonth());
    let newDaysACommin = [];
    
    datesss.map(day => {
        let obj = {day: null, week: '', events: [], date: day.toDateString()};
        obj.week = day.getDay();
        obj.day = day.getDate();
        
        newDaysACommin.push(obj);
    })

    let firstDayWeek = newDaysACommin[0].week;
    if(firstDayWeek != 0){
        for(let i = 0; i < firstDayWeek; i++){
            newDaysACommin.unshift({day: null, week: i, events: [], date: null});
        }
    }

    days = newDaysACommin;
}

const showEvent = (event) => {
    // console.log('event ',event)
    let groupname = document.getElementById('schedule-group');
    let title = document.getElementById('schedule-title');
    let datetime = document.getElementById('schedule-date');
    let description = document.getElementById('schedule-descriptionn');

    if(groupname){
        groupname.innerHTML = teams.find(item => item.id == event.id_team).name+" -  ";
    }

    let time = event.date.split('T')[1].split(':');

    title.innerHTML = event.title;
    datetime.innerHTML = time[0]+":"+time[1]+" hrs";
    description.innerHTML = event.description;

    displayModal1 = false;
    if(modal) {
        modal.style.display = 'none';
    }
    toggleModal2();
}

const renderCalendar = (days) => {
    divCalendarWeek.innerHTML = '';
    divCalendarMonth.innerHTML = months[currentMonth].txt;
    divCalendarYear.innerHTML = currentYear;

    days.map(item => {
        let eventsString = "";
        schedules.filter(item2 => new Date(item2.date).toISOString().split('T')[0] == new Date(item.date).toISOString().split('T')[0]).map(item2 => {
            let color = getRandomColor();
            eventsString += `<hr class='calendar-event-btn' style='border-color: ${color}' onclick='showEvent(${JSON.stringify(item2)})'></hr>`;
        })
        
        divCalendarWeek.innerHTML += `
            <div 
                class="calendar-day ${item.date == date.toDateString() ? 'today' : ''}" >
                <div onClick="addSchedule('${currentYear}-${currentMonth+1}-${item.day}')">
                    <p>${item.day != null ? item.day : ''}</p>
                </div>

                <div class="calendar-events">
                    ${eventsString}
                </div>
            </div>`;
    })
}

const addSchedule = (date) => {
    if(selectedTeam){
        console.log('date ',date);
        let form = document.getElementById('schedule-form');
        let hiddeninputs = document.getElementById('schedule-hidden-inputs');
    
        hiddeninputs.innerHTML = `<input type="hidden" id="schedule-form-inputdate" name="date" value="${date}">`;
        
        displayModal2 = false;
        modal2.style.display = 'none';
        toggleModal1();
    }
}

let displayModal1 = false;
let modal = document.getElementById('schedule-create-bg');
let displayModal2 = false;
let modal2 = document.getElementById('schedule-show-bg');

const toggleModal1 = () => {
    displayModal2 = false;
    if(modal2) { modal2.style.display = 'none'; }

    displayModal1 = !displayModal1;

    if(displayModal1) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

const toggleModal2 = () => {
    displayModal1 = false;
    if(modal) { modal.style.display = 'none'; }

    displayModal2 = !displayModal2;
    
    if(displayModal2) {
        modal2.style.display = 'flex';
    } else {
        modal2.style.display = 'none';
    }
}

const nextMonth = () => {
    if(currentMonth+1 == 12) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }

    let newDate = new Date(`${currentYear}-${currentMonth+1}-1`);
    generateDays(newDate);
    renderCalendar(days)
}

const prevMonth = () => {
    if(currentMonth-1 == -1) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    
    let newDate = new Date(`${currentYear}-${currentMonth+1}-1`);
    generateDays(newDate);
    renderCalendar(days)
}

const nextYear = () => {
    currentYear++;
    divCalendarYear.innerHTML = currentYear;

    let newDate = new Date(`${currentYear}-${currentMonth+1}-1`);
    generateDays(newDate);
    renderCalendar(days)
}

const prevYear = () => {
    currentYear--;
    divCalendarYear.innerHTML = currentYear;
    
    let newDate = new Date(`${currentYear}-${currentMonth+1}-1`);
    generateDays(newDate);
    renderCalendar(days)
}

document.addEventListener("DOMContentLoaded", function(event) {
    generateDays(date);
    renderCalendar(days);
});