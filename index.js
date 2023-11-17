$(document).ready(function() {
    
    // FADE IN -- UNCOMMENT THIS AFTER FINISHING
    // $('h1, .boba_cup, .journal_form, .mood_options, form, button, #date').hide();
    // let fadeDelay = 250; // 250 ms
    // setTimeout(function() {
    //     $('h1, .boba_cup, .journal_form, .mood_options, form, button, #date').fadeIn();
    // }, fadeDelay);


    let selectedMood = null;

    // Update the image
    function updateImage() {
        const bobaCup = $('#boba_cup');
        bobaCup.attr('src', selectedMood ? `img/${selectedMood}.png` : 'img/sparkles.png')
    }

    // Selected mood effects
    $('.dot').click(function() {
        $('.dot').css('border', '2px solid transparent');
        $(this).css('border', '2px solid darkgray');
        
        selectedMood = $(this).attr('id');
        updateImage();
    });

    // Hover effect for mood buttons (Image)
    $('.dot').hover(
        function() {
            // Change image source to corresponding mood when hovering
            let mood = $(this).attr('id');
            $('#boba_cup').attr('src', 'img/' + mood + '.png');
        },
        function() {
            // Reset image to sparkles.png when not hovering
            updateImage();
        }
    );

    // Prevent the click event from propagating within .dot elements
    $('.dot').click(event => event.stopPropagation());

    // Remove the selection border when clicking off
    $(document).click(function(event) {
        if (!$(event.target).hasClass('dot') && !$(event.target).is('textarea')) {
            selectedMood = null;
            updateImage();
            $('.dot').css('border', '2px solid transparent');
        }
    });

    const moodTextMap = {
        'happy': '.happy-text',
        'content': '.content-text',
        'tired': '.tired-text',
        'sad': '.sad-text',
        'frustrated': '.frustrated-text'
    };

    // Hover effect for mood buttons (Text)
    for (const mood in moodTextMap) {
        $(`#${mood}`).mouseover(() => $(moodTextMap[mood]).css('opacity', 1))
                      .mouseout(() => $(moodTextMap[mood]).css('opacity', 0))
    }

    // Get Date
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    $('#date').text(formattedDate);

    // Handle submission
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function () {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed
        const day = currentDate.getDate();
        const currentDateKey = `${year}-${month}-${day}`;
        const journalText = document.getElementById('journal').value;
        const storedData = localStorage.getItem(currentDateKey);

        if (storedData) {
            const moodData = JSON.parse(storedData);
            if (moodData.mood != null) {
                selectedMood = moodData.mood;
                selectedColor = moodData.color;
            }
        } 
        else {
            // If there is no stored mood, use the newly selected mood and its associated color
            selectedColor = getColorForMood(selectedMood);
        }
    
        // Store both the selected mood and its color
        const moodData = {
            mood: selectedMood,
            color: selectedColor,
            journalText: journalText
        };
    
        localStorage.setItem(currentDateKey, JSON.stringify(moodData));

        console.log(currentDateKey, JSON.stringify(moodData));
        // window.location.href = 'calendar.html';
        window.location.href = `calendar.html?mood=${selectedMood}&color=${selectedColor}`;

        // // setTimeout(function() {
        //     $('h1, .boba_cup, .journal_form, .mood_options, form, button, #date').fadeOut();
        // }, fadeDelay);
        // window.location.href = 'calendar.html';
    }); 
});

function getColorForMood(selectedMood) {
    const colorMap = {
        'happy': '#fbf8cc',
        'content': '#fde4cf',
        'tired': '#ffcfd2',
        'sad': '#f1c0e8',
        'frustrated': '#cfbaf0'
    };
    return colorMap[selectedMood];
}
