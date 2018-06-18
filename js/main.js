$(window).bind("load", function () {
    console.log("Hello World!")
    var url = 'https://api.openweathermap.org/data/2.5/weather?zip=94040&units=metric&appid=8635226b794909555b12ff82c871e360';
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        updateDesc(request.response);
        console.log(request.response);
    }
});

function updateDesc(response) {
    var summary = createSpan("summary swap", response.main.temp);
    $(".desc").append(summary);
    var summary_high_low = createSpan("summary-high-low", null);
    for (var i = 0; i < 3; i++) {
        var feel_high_low;
        var valueSpan;
        var normalSpan;
        if (i === 0) {
            feel_high_low = createSpan("high-low-label", null);
            feel_high_low.textContent = "Feels Like: ";
            valueSpan = createSpan(null, response.main.temp)
            normalSpan = createSpan(null, null);
            normalSpan.appendChild(feel_high_low);
            normalSpan.appendChild(valueSpan);
        } else if (i === 1) {
            feel_high_low = createSpan("high-low-label", null);
            feel_high_low.textContent = "Low: ";
            valueSpan = createSpan(null, response.main.temp_min);
            normalSpan = createSpan(null, null);
            normalSpan.appendChild(feel_high_low);
            normalSpan.appendChild(valueSpan);
        } else if (i === 2) {
            feel_high_low = createSpan("high-low-label", null);
            feel_high_low.textContent = "High: ";
            valueSpan = createSpan(null, response.main.temp_max);
            normalSpan = createSpan(null, null);
            normalSpan.appendChild(feel_high_low);
            normalSpan.appendChild(valueSpan);
        }
        summary_high_low.appendChild(normalSpan);
    }
    $(".desc").append(summary_high_low);
}

function createSpan(className, html) {
    var span = document.createElement("span");
    if (className) {
        span.className = className;
    }
    if (html) {
        span.textContent = html + "\xB0C";
    }
    return span;
}