'use strict';

// connects to socket server
var socket;
// socket is the connection
$(() => {
    $('.buttonContainer').hide();

    $('.startGame').click(function() {
        socket = io();
        socket.on('playerNum', playerNum => {
            $('#status small').text(`You are player ${playerNum}`)
            if(playerNum){
                $(this).hide();
                $('.buttonContainer').show();
                socket.emit('');
            }
        })
        socket.on('winner', winner => {
            if(winner){
                $('#status small').text(`Winner is ${winner}, try agian`)
                $(this).hide();
                $('.buttonContainer').show();
                socket.emit('');
            }else{
                $('#status small').text(`Draw, try agian`)
            }
            $('.rpsButton').on('click', makeSelection);
            $('.rpsButton').removeClass('active');
        });
    });

    $('.rpsButton').click(makeSelection)

    function makeSelection(e) {
        $('.rpsButton').off('click');
        $(this).addClass('active');
        var selection = $(e.target).attr('data-rps');
        socket.emit('selection', selection);
    }

})
