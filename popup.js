// $(document).ready(function() {
//     alert('jQuery is working!');
// });

$(document).ready(function() {
    // SELECT MOOD
    $('.dot').click(function() {
        $('.dot').css('border', '2px solid transparent');
        $(this).css('border', '2px solid darkgray');
    });
    // remove the border when clicking off
    $(document).click(function(event) {
        if (!$(event.target).hasClass('dot')) {
            $('.dot').css('border', '2px solid transparent');
        }
    });
    // prevent the click event from propagating within .dot elements
    $('.dot').click(function(event) {
        event.stopPropagation();
    });

    // HOVER OVER MOOD
    $('#happy').hover(function() {
        $('#boba_cup').attr('src', 'img/happy.png');
      }, function() {
        $('#boba_cup').attr('src', 'img/sparkles.png');
      }
    );
    $('#content').hover(function() {
        $('#boba_cup').attr('src', 'img/content.png');
      }, function() {
        $('#boba_cup').attr('src', 'img/sparkles.png');
    });
    $('#tired').hover(function() {
        $('#boba_cup').attr('src', 'img/tired.png');
      }, function() {
        $('#boba_cup').attr('src', 'img/sparkles.png');
    });
    $('#sad').hover(function() {
        $('#boba_cup').attr('src', 'img/sad.png');
      }, function() {
        $('#boba_cup').attr('src', 'img/sparkles.png');
    });
    $('#frustrated').hover(function() {
        $('#boba_cup').attr('src', 'img/frustrated1.png');
      }, function() {
        $('#boba_cup').attr('src', 'img/sparkles.png');
    });

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
});
