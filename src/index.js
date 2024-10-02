async function getWeather(name) {
    try {
        let result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}?unitGroup=us&key=5BU9UM6734TCH3L8BC8DHMDJM&contentType=json`);
        if (!result.ok) {
            alert("can't find the Location");
            throw new Error(`Error: ${result.status} ${result.statusText}`);
        }
        let data = await result.json();
        return data;
    } catch (error) {
        console.error("An error occurred while fetching the weather data:", error);
        return { error: "Failed to fetch weather data. Please try again." };
    }
}

function fill(days, address) {
    let h1 = document.querySelector("h1");
    h1.textContent = address;
    let divs = document.querySelectorAll(".day");
    for (let i = 0; i < 7; i++) {
        divs[i].textContent = days[i].temp;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let btn = document.querySelector("button");
    btn.addEventListener("click", async () =>{
        let input = document.querySelector("input");
        let result = await getWeather(input.value);
        console.log(result);
        fill(result.days, result.address);
    });
});