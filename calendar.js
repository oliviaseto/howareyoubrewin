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

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();
    const currentDateKey = `${year}-${month}-${day}`;
    
    const storedData = localStorage.getItem(currentDateKey);

    console.log(storedData);
    
    if (storedData) {
        const moodData = JSON.parse(storedData);
        selectedMood = moodData.mood;
        selectedColor = moodData.color;
        selectedJournalText = moodData.journalText;
    }

    console.log(selectedJournalText);

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
            gridItem.textContent = `${i}`;

            // const currentDate = new Date();
            const clickedDateKey = `${year}-${currentMonth + 1}-${i}`;
            const storedData = localStorage.getItem(clickedDateKey);

            if (storedData) {
                const moodData = JSON.parse(storedData);
                gridItem.style.backgroundColor = moodData.color;
            }
            else if (currentDate.getMonth() === currentMonth && currentDate.getDate() === i && selectedMood != null) {
                // Set background color based on selectedMood variable
                gridItem.style.backgroundColor = selectedColor;
            }

            gridContainer.appendChild(gridItem);
        }

        initializeGridItems();
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

    let clickCounter = 0;

    function onGridItemClick(event) {
        const gridItem = event.target;

        if (gridItem.classList.contains('grid-item')) {
            const day = parseInt(gridItem.textContent);
            const clickedDateKey = `${year}-${currentMonth + 1}-${day}`;
    
            // Show a rotating list of predefined moods and colors
            const moods = ['happy', 'content', 'tired', 'sad', 'frustrated', 'default'];
            const colors = ['#fbf8cc', '#fde4cf', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#FFFFFF'];
    
            // Get the current mood and color index from the grid item
            let moodIndex = moods.indexOf(selectedMood);
            let colorIndex = colors.indexOf(selectedColor);
    
            // Increment the mood and color index
            moodIndex = (moodIndex + 1) % moods.length;
            colorIndex = (colorIndex + 1) % colors.length;
    
            // Update selected mood and color
            selectedMood = moods[moodIndex];
            selectedColor = colors[colorIndex];
    
            // Set background color of the clicked grid item
            gridItem.style.backgroundColor = selectedColor;
            clickCounter++;
            // check if it's the 6th click, reset to default
            if (clickCounter >= 6){
                selectedMood = 'default';
                selectedColor = 'FFFFFF';
                clickCounter = 0;
            }
            const moodData = {
                mood: selectedMood,
                color: selectedColor
            };
    
            console.log(clickedDateKey, JSON.stringify(moodData));
            localStorage.setItem(clickedDateKey, JSON.stringify(moodData));
        }
    }

    gridContainer.addEventListener('click', onGridItemClick);

    function initializeGridItems() {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(gridItem => {
            const day = parseInt(gridItem.textContent);
            const clickedDateKey = `${year}-${currentMonth + 1}-${day}`;
            const storedData = localStorage.getItem(clickedDateKey);

            if (storedData) {
                const moodData = JSON.parse(storedData);
                gridItem.style.backgroundColor = moodData.color;

                gridItem.addEventListener('mouseenter', () => {
                    if (moodData.journalText) {
                        document.getElementById('journal-text').textContent = moodData.journalText;
                    } else {
                        document.getElementById('journal-text').textContent = '. . .';
                    }
                });
            } else {
                gridItem.addEventListener('mouseenter', () => {
                    document.getElementById('journal-text').textContent = '. . .';
                });
            }
        });
    }

    // Call the function to initialize grid items with stored values
    initializeGridItems();

    $(".grid-item").mouseover(function(){
        $(".journal-content").css("opacity", 1);
    });

    $(".grid-item").mouseout(function(){
        $(".journal-content").css("opacity", 0);
    });
    

    // go back to index
    $('#back-to-index-button').click(function () {
        window.location.href = 'index.html';
    });

});


// function getColorForMood(selectedMood) {
//     if (selectedMood === 'happy') {
//         return '#fbf8cc';
//     } 
//     else if (selectedMood === 'content') {
//         return '#fde4cf';
//     }
//     else if (selectedMood === 'tired') {
//         return '#ffcfd2';
//     } 
//     else if (selectedMood === 'sad') {
//         return '#f1c0e8'; 
//     }
//     else if (selectedMood === 'frustrated') {
//         return '#cfbaf0';
//     }
//     // else {
//     //     return 'white'; // default
//     // }
// }