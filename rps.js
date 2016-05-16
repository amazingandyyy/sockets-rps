'use strict';

var userCount = 0;
var selections = [];

exports.iniGame = function(io, socket){
    userCount++
    if (userCount === 1 || userCount == 2) {
        socket.emit('playerNum', userCount)
    }
    if (userCount == 2) {
        socket.emit('gameStart', null)
    }

    socket.on('disconnect', function(socket) {
        userCount--
    })
    console.log(userCount);
    socket.on('selection', function(selection) {
            console.log('selection:', selection);
            selections.push(selection);
            console.log(selections);
            var winner;
            if(selections.length == 2){
                console.log('start check');
                var same = selection[0] == selection[1];
                if (same) {
                    winner = null;
                } else if (selections.indexOf('paper') == -1 && !same) {
                    winner = 'rock'
                } else if (selections.indexOf('rock') == -1 && !same) {
                    winner = 'scissors'
                } else if (selections.indexOf('scissors') == -1 && !same) {
                    winner = 'paper'
                }
                io.emit('winner', winner)
                selections = [];
            }

    })
}
