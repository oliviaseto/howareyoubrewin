// $(document).ready(function() {
//     alert('jQuery is working!');
// });

$(document).ready(function() {
    // Add a click event handler to the 'span' element with the class "dot content"
    $('.dot.content').click(function() {
        // Change the CSS properties to create the dark circle effect
        $(this).css({
            'background-color': 'darkgray',  // Set the background color to dark gray
            'border-radius': '50%',          // Make it a circle with border-radius
            'width': '40px',                // Adjust the width to your desired size
            'height': '40px'                // Adjust the height to your desired size
        });
    });
    $('#happy').hover(function() {
        $('#boba_cup').attr('src', 'img/happy_boba_cup.jpg');
      }, function() {
        $('#boba_cup').attr('src', 'img/default.png');
    });
    $('#content').hover(function() {
        $('#boba_cup').attr('src', 'img/content_boba_cup.jpg');
      }, function() {
        $('#boba_cup').attr('src', 'img/default.png');
    });
    $('#tired').hover(function() {
        $('#boba_cup').attr('src', 'img/tired_boba_cup.jpg');
      }, function() {
        $('#boba_cup').attr('src', 'img/default.png');
    });
    $('#sad').hover(function() {
        $('#boba_cup').attr('src', 'img/sad_boba_cup.jpg');
      }, function() {
        $('#boba_cup').attr('src', 'img/default.png');
    });
    $('#frustrated').hover(function() {
        $('#boba_cup').attr('src', 'img/frustrated_boba_cup.jpg');
      }, function() {
        $('#boba_cup').attr('src', 'img/default.png');
    });
});
