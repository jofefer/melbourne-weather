$(document).ready(function(){
    $('.short').hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentPosition = position;
            //set latitude and longitude
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;

            //the API I'm using is https://www.apixu.com/my/
            var url = 'http://api.apixu.com/v1/current.json?key=9350caaa2d6c4367a8723422181708&q=';
            $.getJSON(url + latitude + ',' +longitude,function(data){
                //console.log(data);
                //JSON.stringify it  stores JSON text in a string
                var data = JSON.stringify(data);
                //JSON.parse turns a JSON string into JS object
                var json = JSON.parse(data);

                console.log(json);
                //GETIN THE VARIABLES
                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var temp = json.current.temp_c;
                var temp_f = json.current.temp_f;
                var last_updated = json.current.last_updated.replace('-', ' ');
                var wind = json.current.wind_kph;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloud;

                //show some background picture to make it nicer
                if (temp < 18) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2013/10/27/17/14/frozen-201495_1280.jpg)'

                    });

                    $('#temp').html("<h1>It is a cold day..<hr></h1>");
                } else if(temp <28){
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/09/13/22/31/sunrise-1668423_1280.jpg)'
                    });
                    $('#temp').html("<h1>It is a Good day!<hr></h1>");
                }

                //show the data into the webpage info1-2-3
                $('#weather').html(city+ ', '+ state + ', ' + country);
                $('#info1').html(time);
                $('#info2').html('Wind ' +wind + ' hph');
                $('#info3').html(temp + '&#8451');

                $('.short').show();

                //implement the button
                var yes = true;
                $('#switch').on('click',function(){
                    if (yes){
                        $('#info3').html(temp_f + '&#8457');
                        $('#switch').html('Show in Celsius');
                        yes = false;
                    } else {
                        $('#info3').html(temp + '&#8451');
                        $('#switch').html('Show in Farenheight');
                        yes = true;
                    }
                });
                //show data into info5-6
                if(cloud <= 30){
                    $('#info5').html('Clear Sky');
                } else {
                    $('#info5').html('Cloudy Sky');
                }
                $('#info6').html('Humidity '+ humidity +'%' );

            });

        })
    }
});
