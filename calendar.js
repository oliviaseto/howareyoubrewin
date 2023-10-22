$(document).ready(function() {
    const currentMonthElement = document.getElementById('current-month');
    const gridContainer = document.querySelector('.grid-container');
    const currentDate = new Date();
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    let currentMonth = currentDate.getMonth();

    function updateMonthDisplay() {
        currentMonthElement.textContent = `${months[currentMonth]} ${currentDate.getFullYear()}`;
        // Clear existing grid items
        gridContainer.innerHTML = '';

        // Get the number of days in the current month
        const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();

        // Generate grid items based on the number of days in the month
        for (let i = 1; i <= daysInMonth; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.textContent = `${currentMonth + 1},${i}`;
            gridContainer.appendChild(gridItem);
        }
    }

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    prevMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12; // Cycle through months
        updateMonthDisplay();
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12; // Cycle through months
        updateMonthDisplay();
    });

    // initialize the calendar display when the page loads
    updateMonthDisplay();

    // go back to index
    $('#back-to-index-button').click(function () {
        window.location.href = 'index.html';
    });


    const selectedMood = localStorage.getItem('selectedMood');

    


});


function getColorForMood(selectedMood) {
    if (selectedMood === 'happy') {
        return '#fbf8cc';
    } 
    else if (selectedMood === 'content') {
        return '#fde4cf';
    }
    else if (selectedMood === 'tired') {
        return '#ffcfd2';
    } 
    else if (selectedMood === 'sad') {
        return '#f1c0e8'; 
    }
    else if (selectedMood === 'frustrated') {
        return '#cfbaf0';
    }
    else {
        return 'white'; // default
    }
}