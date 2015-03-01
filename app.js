$(function(){
  $("#search").on("keyup", function(e){
    e.preventDefault();
    var query = $("#search").val();
    $.ajax({
      url: "http://autocomplete.wunderground.com/aq?query="+query+"&cb=callback",
      type: "GET",
      dataType: 'jsonp',
      jsonpCallback:'callback',
      error : function(xhr, status, thrownError){
        console.log("oh noes!", thrownError);
      },
      success: function(data){
        $('#result').empty();
        $('#weather').empty();
        $.each(data, function(i, cities){
          cities.forEach(function(city){
            var $list = $("<li>").text(city.name);
            $list.appendTo('#result');
            $("li").on('click', function(){
              var selected_city = $(this).text();
              console.log(selected_city);
              $("#search").val(selected_city);
            });
          });
        });
      }
    });
  });

  $("form").on("submit", function(e){
    e.preventDefault();
    var query = $("#search").val();
    console.log('testing query', query)
    $.ajax({
      url : "http://api.wunderground.com/api/3dd04dd7212171a9/almanac/conditions/q/" + query + ".json?callback=jsonCallback",
      type: "GET",
      dataType : "jsonp",
      jsonpCallback:'callback',
      error : function(xhr, status, thrownError){
        console.log("oh noes!", thrownError);
      },
      success : function(data){
        $('#weather').empty();
        $('#result').empty();
        if(data.current_observation){
          var city_name = data.current_observation.display_location.city;
          var city_weather = data.current_observation.weather;
          var temp_high = data.almanac.temp_high.normal.C;
          var temp_low = data.almanac.temp_low.normal.C;

          $("<h3>").text(city_name).appendTo("#weather")
          $("<p>").text('Weather Type: '+ city_weather ).appendTo('#weather');
          $("<p>").text('High: '+ temp_high + 'C').appendTo('#weather');
          $("<p>").text('Low: '+ temp_low + 'C').appendTo('#weather');


        } else {
          $("<h3>").text('City data not found.').appendTo("#weather");
        }
      }
    });
  });
});

