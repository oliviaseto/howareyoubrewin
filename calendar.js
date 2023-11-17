let selectedMood = null;
let selectedColor = null;
let selectedJournalText = '. . .';

const urlParams = new URLSearchParams(window.location.search);
const storedMood = urlParams.get('mood');
const storedColor = urlParams.get('color');

if (storedMood && storedColor) {
    selectedMood = storedMood;
    selectedColor = storedColor;
}

$(document).ready(function () {
    const currentMonthElement = document.getElementById('current-month');
    const gridContainer = document.querySelector('.grid-container');
    const currentDate = new Date();
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    let currentMonth = currentDate.getMonth();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();
    const currentDateKey = `${year}-${month}-${day}`;
    const storedData = localStorage.getItem(currentDateKey);

    // Parse the stored JSON data that stored our selection
    if (storedData) {
        const { mood, color, journalText } = JSON.parse(storedData);
        selectedMood = mood;
        selectedColor = color;
        selectedJournalText = journalText;
    }

    // Handles calendar display
    function updateMonthDisplay() {
        currentMonthElement.textContent = `${months[currentMonth]} ${currentDate.getFullYear()}`;
        gridContainer.innerHTML = '';

        const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.textContent = `${i}`;

            const clickedDateKey = `${year}-${currentMonth + 1}-${i}`;
            const storedData = localStorage.getItem(clickedDateKey);

            if (storedData) {
                const { color } = JSON.parse(storedData);
                gridItem.style.backgroundColor = color;
            } else if (currentDate.getMonth() === currentMonth && currentDate.getDate() === i && selectedMood !== null) {
                gridItem.style.backgroundColor = selectedColor;
            }

            gridContainer.appendChild(gridItem);
        }

        initializeGridItems();
    }

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    prevMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12;
        updateMonthDisplay();
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12;
        updateMonthDisplay();
    });

    updateMonthDisplay();

    let clickCounter = 0;

    // Handles grid item click
    function onGridItemClick(event) {
        const gridItem = event.target;

        if (gridItem.classList.contains('grid-item')) {
            const day = parseInt(gridItem.textContent);
            const clickedDateKey = `${year}-${currentMonth + 1}-${day}`;

            const moods = ['happy', 'content', 'tired', 'sad', 'frustrated', 'default'];
            const colors = ['#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#FFFFFF'];

            let moodIndex = moods.indexOf(selectedMood);
            let colorIndex = colors.indexOf(selectedColor);

            moodIndex = (moodIndex + 1) % moods.length;
            colorIndex = (colorIndex + 1) % colors.length;

            selectedMood = moods[moodIndex];
            selectedColor = colors[colorIndex];

            gridItem.style.backgroundColor = selectedColor;
            clickCounter++;

            if (clickCounter >= 6) {
                selectedMood = 'default';
                selectedColor = '#FFFFFF';
                clickCounter = 0;
            }

            const moodData = {
                mood: selectedMood,
                color: selectedColor
            };

            console.log(clickedDateKey, JSON.stringify(moodData));
            localStorage.setItem(clickedDateKey, JSON.stringify({ ...moodData, journalText: selectedJournalText }));
        }
    }

    gridContainer.addEventListener('click', onGridItemClick);

    
    function initializeGridItems() {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(gridItem => {
            const day = parseInt(gridItem.textContent);
            const clickedDateKey = `${year}-${currentMonth + 1}-${day}`;
            const storedData = localStorage.getItem(clickedDateKey);

            gridItem.addEventListener('mouseenter', () => {
                const journalText = storedData ? JSON.parse(storedData).journalText : '. . .';
                document.getElementById('journal-text').textContent = journalText;
            });

            if (storedData) {
                const { color } = JSON.parse(storedData);
                gridItem.style.backgroundColor = color;
            }
        });
    }

    initializeGridItems();

    $(".grid-item").mouseover(function () {
        $(".journal-content").css("opacity", 1);
    });

    $(".grid-item").mouseout(function () {
        $(".journal-content").css("opacity", 0);
    });

    $('#back-to-index-button').click(function () {
        window.location.href = 'index.html';
    });
});
