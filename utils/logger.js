// This serves no purpose other than to make output log look pretty (U ᵕ U❁)
const NOW = () => {
    var date = new Date();

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
}

module.exports = NOW;