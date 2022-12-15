
let currentLat =''
let currentLog =''
fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage =`url('${data.urls.regular}')`
        document.getElementById('author').innerText = `By: ${data.user.name}`
    })

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(response => response.json())
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `<img src='${data.image.small}'><p>${data.name}</p>`

        document.getElementById('crypto').innerHTML += `
        <div> 🎯 : ${data.market_data.current_price.usd}</div>
        <div> 👆 : ${data.market_data.high_24h.usd}</div>
        <div> 👇 : ${data.market_data.low_24h.usd}</div>`
        
    })
    .catch(err => console.log(err))


    function getCurrentTime(){
    const date = new Date()
    document.getElementById('time').innerHTML = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    }
    getCurrentTime()
    setInterval(getCurrentTime, 1000)
 
    navigator.geolocation.getCurrentPosition((position) => {
        currentLat = position.coords.latitude
        currentLog  =position.coords.longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLog}&units=metric&appid=ce42558c0a7571323fdea7387b7b0034
        `)
            .then(res => {
                if((!res.ok)){
                    throw Error ("Weather data not available")
                } 
                return res.json()
            })
            .then(data => {
                document.getElementById('weather-top').innerHTML =`
                <img id ="weathericon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <p id ="temp">${Math.round(data.main.temp)}°C</p>`

                document.getElementById('weather').innerHTML +=`<p id="location">${data.name}</p>`
                
                
            })
            .catch(error => console.error(error))
      });
   
   
    

    
    
