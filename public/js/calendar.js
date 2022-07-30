const divCalendarWeek = document.getElementById('calendarWeek');
const divCalendarMonth = document.getElementById('calendar-month-name');
const divCalendarYear = document.getElementById('calendar-year-number');

let date = new Date();

let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

console.log('currentMonth ',currentMonth);
console.log('currentYear ',currentYear);

let days = [];
let events = [
    { 
        id: 1,
        team: 1,
        title: 'Reunião do IF',
        description: 'Reunioão basicona asdasdsadas asdasd as dasd asd asd asdasdasdas das dasd asd',
        date: '2022-07-26T00:16:56.271Z',
        color: '#E77979'
    },
    { 
        id: 2,
        team: 1,
        title: 'Reunião do IF',
        description: 'Reunioão basicona asdasdsadas asdasd as dasd asd asd asdasdasdas das dasd asd',
        date: '2022-07-26T00:16:56.271Z',
        color: '#E77979'
    },
    { 
        id: 3,
        team: 1,
        title: 'Reunião do IF',
        description: 'Reunioão basicona asdasdsadas asdasd as dasd asd asd asdasdasdas das dasd asd',
        date: '2022-07-26T00:16:56.271Z',
        color: '#E77979'
    },
    { 
        id: 4,
        team: 1,
        title: 'Reunião do IF',
        description: 'Reunioão basicona asdasdsadas asdasd as dasd asd asd asdasdasdas das dasd asd',
        date: '2022-07-26T00:16:56.271Z',
        color: '#E77979'
    },
];

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

var teams = teams;

console.log('teams ',teams)

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
    // console.log(datesss);
    let newDaysACommin = [];
    
    datesss.map(day => {
        let obj = {day: null, week: '', events: [], date: day.toDateString()};
        obj.week = day.getDay();
        obj.day = day.getDate();
        
        newDaysACommin.push(obj);
    })

    // console.log('newDaysACommin[0].week ',newDaysACommin[0].week)
    let firstDayWeek = newDaysACommin[0].week;
    if(firstDayWeek != 0){
        for(let i = 0; i < firstDayWeek; i++){
            newDaysACommin.unshift({day: null, week: i, events: [], date: null});
        }
    }

    // console.log('newDaysACommin ',newDaysACommin);
    days = newDaysACommin;
}

const renderCalendar = (days) => {
    divCalendarWeek.innerHTML = '';
    divCalendarMonth.innerHTML = months[currentMonth].txt;
    divCalendarYear.innerHTML = currentYear;

    days.map(item => {     
        divCalendarWeek.innerHTML += `
            <div 
                class="calendar-day ${item.date == date.toDateString() ? 'today' : ''}" 
                onClick="addSchedule('${currentYear}-${currentMonth}-${item.day}')">
                <p>${item.day != null ? item.day : ''}</p>
            </div>`;
    })
}

const addSchedule = (date) => {
    console.log('date ',date);
    let form = document.getElementById('schedule-form');
    let hiddeninputs = document.getElementById('schedule-hidden-inputs');

    hiddeninputs.innerHTML = `<input type="hidden" id="schedule-form-inputdate" name="date" value="${date}">`;
    
    toggleModal();
}

let displayModal = false;
let modal = document.getElementById('schedule-create-bg');

const toggleModal = () => {
    displayModal = !displayModal;
    if(displayModal) modal.style.display = 'flex';
    else modal.style.display = 'none';
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