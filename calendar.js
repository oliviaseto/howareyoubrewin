$(document).ready(function() {
    const currentMonthElement = document.getElementById('current-month');
    const currentDate = new Date();
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    let currentMonth = currentDate.getMonth();

    function updateMonthDisplay() {
        currentMonthElement.textContent = `${months[currentMonth]} ${currentDate.getFullYear()}`;
    }

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    prevMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12; // Cycle through months
        updateMonthDisplay();
        // You can add more code to update your grid here
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12; // Cycle through months
        updateMonthDisplay();
        // You can add more code to update your grid here
    });

    // initialize the calendar display when the page loads
    updateMonthDisplay();

    // go back to index
    $('#back-to-index-button').click(function () {
        window.location.href = 'index.html';
    });
});
