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

const getAllDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

export function generateDays (date, days) {
    let datesss = getAllDaysInMonth(date.getFullYear(), date.getMonth());
    console.log(datesss);
    let newDaysACommin = [];
    
    datesss.map(day => {
        let obj = {day: null, week: '', events: [], date: day.toDateString()};
        obj.week = day.getDay();
        obj.day = day.getDate();
        
        newDaysACommin.push(obj);
    })

    console.log('newDaysACommin[0].week ',newDaysACommin[0].week)
    let firstDayWeek = newDaysACommin[0].week;
    if(firstDayWeek != 0){
        for(let i = 0; i < firstDayWeek; i++){
            newDaysACommin.unshift({day: null, week: i, events: [], date: null});
        }
    }

    console.log('newDaysACommin ',newDaysACommin);
    days = newDaysACommin;
}

export function renderCalendar (days, divCalendarWeek, date){
    divCalendarWeek.innerHTML = '';

    days.map(item => {                
        divCalendarWeek.innerHTML += `<div class="calendar-day ${item.date == date.toDateString() ? 'today' : ''}"><p>${item.day != null ? item.day : ''}</p></div>`;
    })
}