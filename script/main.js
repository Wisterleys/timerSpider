let meses = document.querySelector('#meses');
let dias = document.querySelector('#dias');
let horas = document.querySelector('#horas');
let minutos = document.querySelector('#minutos');
let segundos = document.querySelector('#segundos');
let clock;
let input_date = false;

function zero(value) {
    return value < 10 ? "0" + value : value;
}

function format(json) {
    return `${json.Ano}-${zero(json['Mês'])}-${zero(json.Dia)}T${zero(json.Hora)}:${zero(json.Minutos)}:00`;
}

function getJson() {
    const AJAX = new XMLHttpRequest();
    AJAX.open("GET", "lancamento.json");
    AJAX.send();
    AJAX.onload = function () {
        input_date = format(JSON.parse(AJAX.responseText));
    }
}

function timer() {
    if (input_date) {
        let duration = new Date(input_date) - new Date();
        if (duration <= 0) {
            clearInterval(clock);
            segundos.innerHTML = '00';
            minutos.innerHTML = '00';
            horas.innerHTML = '00';
            dias.innerHTML = '00';
            meses.innerHTML = '00';
            meses.parentNode.querySelector("p").innerHTML = "Tempo Expirado";
            return;
        }
        let format = formatsDate(duration);
        segundos.innerHTML = format[4];
        minutos.innerHTML = format[3];
        horas.innerHTML = format[2];
        dias.innerHTML = format[1];
        meses.innerHTML = format[0];
        meses.parentNode.querySelector("p").innerHTML = format[0] < 2 ? "Mês" : "Meses";
    }
}

function formatsDate(duration) {
    let s = parseInt((duration / 1000) % 60);
    let m = parseInt((duration / (1000 * 60)) % 60);
    let h = parseInt((duration / (1000 * 60 * 60)) % 24);
    let d = parseInt((duration / (1000 * 60 * 60 * 24)) % 30);
    let mes = parseInt(duration / (1000 * 60 * 60 * 24 * 30));
    return [mes, d, zero(h), zero(m), zero(s)];
}

(function (){
    clock = setInterval(timer, 1000);
    getJson();
})();
