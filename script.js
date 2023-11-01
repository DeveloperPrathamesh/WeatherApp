let getweather = () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition)
    }
    else{
        document.getElementById('currentweather').innerText = 'geolocation not supported';
    }

    document.getElementById('cityweather').innerText = ''; 
}


    let showposition = (data) =>{
        console.log(data);
       let lat = data.coords.latitude;
        let lon = data.coords.longitude; 
        let url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
        fetch(url,{method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
            let cityname = data.city.name;
            let temp = data.list[0].temp.day;
            let desc = data.list[0].weather[0].description;
            document.getElementById('currentweather').innerText = `Current weather of ${cityname} is ${temp}°C and it seems to be ${desc}`;
        })
    }

   let getweatherbycity = () =>{
       let city = document.getElementById('defcity').value;
       let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
       fetch(url, {method: 'get'})
       .then((res) => res.json())
       .then((data) =>{
           console.log(data);
           if (data.cod == 200){
               let temp = data.list[0].temp.day;
               let desc = data.list[0].weather[0].description;
               let city = data.city.name;
               document.getElementById('cityweather').innerText = `The current temperature of ${city.charAt(0).toUpperCase()+city.slice(1).toLowerCase()} is ${temp}°C and it seems to be ${desc}` 
           }
           else {
            console.log(data)
            document.getElementById('cityweather').innerText = 'Please enter a valid city name';
           }
           
        })

        document.getElementById('currentweather').innerText = '';
    }

