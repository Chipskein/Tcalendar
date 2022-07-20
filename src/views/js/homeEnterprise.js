const divCalendarWeek = document.getElementById('calendarWeek');

let date = new Date();

let days = [];

document.addEventListener("DOMContentLoaded", function(event) {
    generateDays(date, days);
    renderCalendar(days, divCalendarWeek, date);
});