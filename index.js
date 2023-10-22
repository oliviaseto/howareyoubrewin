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
        localStorage.setItem('selectedMood', selectedMood);
        // setTimeout(function() {
        //     $('h1, .boba_cup, .journal_form, .mood_options, form, button, #date').fadeOut();
        // }, fadeDelay);
        window.location.href = 'calendar.html';
    });
});
