// $(document).ready(function() {
//     alert('jQuery is working!');
// });

$(document).ready(function() {
    
    // FADE IN -- UNCOMMENT THIS AFTER FINISHING
    // $('h1, .boba_cup, .journal_form, .mood_options, form, button, #date').hide();

    // let fadeDelay = 250; // 250 ms

    // setTimeout(function() {
    //     $('h1, .boba_cup, .journal_form, .mood_options, form, button, #date').fadeIn();
    // }, fadeDelay);


    // MOOD STUFF
    var selectedMood = null;

    function updateImage() {
        if (selectedMood) {
            $('#boba_cup').attr('src', 'img/' + selectedMood + '.png');
        }
        else {
            $('#boba_cup').attr('src', 'img/sparkles.png');
        }
    }

    // SELECT MOOD
    $('.dot').click(function() {
        // resetImage();
        $('.dot').css('border', '2px solid transparent');
        $(this).css('border', '2px solid darkgray');
        
        selectedMood = $(this).attr('id');
        updateImage();
    });

    // Hover effect for mood buttons
    $('.dot').hover(function() {
            // Change image source to corresponding mood when hovering
            var mood = $(this).attr('id');
            $('#boba_cup').attr('src', 'img/' + mood + '.png');
        },
        function() {
            // Reset image to sparkles.png when not hovering
            updateImage();
        }
    );

    // prevent the click event from propagating within .dot elements
    $('.dot').click(function(event) {
        event.stopPropagation();
    });

    // remove the border when clicking off
    $(document).click(function(event) {
        if (!$(event.target).hasClass('dot') && !$(event.target).is('textarea')) {
            selectedMood = null;
            updateImage();
            $('.dot').css('border', '2px solid transparent');
        }
    });

    // HOVER OVER MOOD
    $("#happy").mouseover(function(){
        $(".happy-text").css("opacity", 1);
    });
    
    $("#happy").mouseout(function(){
        $(".happy-text").css("opacity", 0);
    });

    $("#content").mouseover(function(){
        $(".content-text").css("opacity", 1);
    });
    
    $("#content").mouseout(function(){
        $(".content-text").css("opacity", 0);
    });

    $("#tired").mouseover(function(){
        $(".tired-text").css("opacity", 1);
    });
    
    $("#tired").mouseout(function(){
        $(".tired-text").css("opacity", 0);
    });

    $("#sad").mouseover(function(){
        $(".sad-text").css("opacity", 1);
    });
    
    $("#sad").mouseout(function(){
        $(".sad-text").css("opacity", 0);
    });

    $("#frustrated").mouseover(function(){
        $(".frustrated-text").css("opacity", 1);
    });
    
    $("#frustrated").mouseout(function(){
        $(".frustrated-text").css("opacity", 0);
    });

    // GET DATE
    var currentDate = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString('en-US', options);
    $('#date').text(formattedDate);



    // SUBMIT BUTTON
    let submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function () {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed
        const day = currentDate.getDate();
        const currentDateKey = `${year}-${month}-${day}`;

        const storedData = localStorage.getItem(currentDateKey);
        if (storedData) {
            const moodData = JSON.parse(storedData);
            if (moodData.mood != null) {
                selectedMood = moodData.mood;
                selectedColor = moodData.color;
            }
            else {
                selectedColor = getColorForMood(selectedMood);
            }
        } else {
            // If there is no stored mood, use the newly selected mood and its associated color
            selectedColor = getColorForMood(selectedMood);
        }
    
        // Store both the selected mood and its color
        const moodData = {
            mood: selectedMood,
            color: selectedColor
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
    // else {
    //     return 'white'; // default
    // }
}
