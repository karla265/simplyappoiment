let timer;
let viewTimer = '05:00';
let duration = moment.duration({
    'minutes': 5,
    'seconds': 00
});
let temporizadorActivo = false;
let temporizadorPause = false;

document.getElementById('bntPlay').addEventListener('click', function() {
    let prueba = moment(300).millisecond();
    temporizador('play');
});
document.getElementById('btnPause').addEventListener('click', function() {
    temporizador('pause');
});
document.getElementById('btnStop').addEventListener('click', function() {
    temporizador('stop');
});

function temporizador(evento) {
    var timerTitle = document.getElementById('timer');
    if (evento === 'play') {
        temporizadorPause = false;
    } else if (evento === 'pause') {
        temporizadorPause = true;
    } else if (evento === 'stop') {
        temporizadorActivo = false;
        temporizadorPause = true;
        timerTitle.innerHTML = viewTimer;
        clearInterval(timer);
        duration = moment.duration({
            'minutes': 5,
            'seconds': 00
        });
    }

    var timestamp = new Date(0, 0, 0, 2, 10, 30);
    var interval = 1;
    if (!temporizadorActivo && evento !== 'stop') {
        timer = setInterval(function() {
            if (!temporizadorPause) {
                timestamp = new Date(timestamp.getTime() + interval * 1000);

                duration = moment.duration(duration.asSeconds() - interval, 'seconds');
                var min = duration.minutes();
                var sec = duration.seconds();

                // sec -= 1;
                if (min < 0) return clearInterval(timer);
                if (min < 10 && min.length != 2) min = '0' + min;
                if (sec < 0 && min != 0) {
                    min -= 1;
                    sec = 59;
                } else if (sec < 10 && sec.length != 2) sec = '0' + sec;

                timerTitle.innerHTML = min + ':' + sec;
                if (min == 0 && sec == 0)
                    clearInterval(timer);
            }
        }, 1000);

        if (evento === 'play' && !temporizadorActivo) {
            temporizadorActivo = true;
        }
    }
}