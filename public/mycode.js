$ (function () {

    var url = "https://sunshine-boys.herokuapp.com/api/messages"
    $.ajax({//get message
        url: url,
        method: 'GET',
        dataType: 'json'
        
      }).then(data => {
        //jquery, set the html of id = content1 to empty
        $('#content1').html("")

        var result = ""
        var count = 1
        //iterate through the message
        for (var i in data) {
            result += "<br>"
            $.each(data[i], function(key, value) {
              //result saves all the messages
             result += "<span> " + key +": <span/>" + "<span> " + value + "; <span/>"
            });
            result += "<br/>"
        }
        $('#content1').html(` 
            <div class="comments-section">
            <div class="comments">
              <h4>Public Message Box</h4>
            <div id="comments-container" >
                <div class="comment">
                  <div class="comment-user">
                    <span class="user-details"><span class="username"> Messages </span><span>  </span><span> </span></span>
                  </div>
                  <div class="comment-text" id="public"> 
                  `+ result + `
                  </div>
                </div>
              </div>
              </div>
            </div>`)
      }).catch(err => {
        console.log(err);
        alert('failed to retrieve');
      });

    $("#a1").on("click", function () { getStation('finch_station', { label: 'Finch Station', lat: 43.781588, lng: -79.415640 }) })
    $("#a2").on("click", function () { getStation('north_york_centre_station', { label: 'North York Centre Station', lat: 43.768679, lng: -79.412549 }) })
    $("#a3").on("click", function () { getStation('sheppard-yonge_station', { label: 'Sheppard-Yonge Station', lat: 43.762005, lng: -79.411912 }) })
    $("#a4").on("click", function () { getStation('york_mills_station', { label: 'York Mills Station', lat: 43.744764, lng: -79.406546 }) })
    $("#a5").on("click", function () { getStation('lawrence_station', { label: 'Lawrence Station', lat: 43.725290, lng: -79.402456 }) })
    $("#a6").on("click", function () { getStation('eglinton_station', { label: 'Eglinton Station', lat: 43.705329, lng: -79.398944}) })
    $("#a7").on("click", function () { getStation('davisville_station', { label: 'Davisville Station', lat: 43.697705, lng: -79.397182 }) })
    $("#a8").on("click", function () { getStation('st_clair_station', { label: 'St Clair Station', lat: 43.687625, lng: -79.393080 }) })
    $("#a9").on("click", function () { getStation('summerhill_station', { label: 'Summerhill Station', lat: 43.682311, lng: -79.390761 }) })
    $("#a10").on("click", function () { getStation('rosedale_station', { label: 'Rosedale Station', lat: 43.676891, lng: -79.388675 }) })
    $("#a11").on("click", function () { getStation('bloor-yonge_station', { label: 'Bloor-Yonge Station', lat: 43.670914, lng: -79.385594 }) })
    $("#a12").on("click", function () { getStation('wellesley_station', { label: 'Wellesley Station', lat: 43.665467, lng: -79.383856}) })
    $("#a13").on("click", function () { getStation('college_station', { label: 'College Station', lat: 43.661332, lng: -79.383075 }) })
    $("#a14").on("click", function () { getStation('dundas_station', { label: 'Dundas Station', lat: 43.656281, lng: -79.380428 }) })
    $("#a15").on("click", function () { getStation('queen_station', { label: 'Queen Station', lat: 43.652438, lng: -79.379232 }) })
    $("#a16").on("click", function () { getStation('king_station', { label: 'King Station', lat: 43.648998, lng: -79.377798 }) })
    $("#a17").on("click", function () { getStation('union_station', { label: 'Union Station', lat: 43.645216, lng: -79.380582 }) })
    $("#a18").on("click", function () { getStation('st_andrew_station', { label: 'St Andrew Station', lat: 43.647540, lng: -79.384470 }) })
    $("#a19").on("click", function () { getStation('osgoode_station', { label: 'Osgoode Station', lat: 43.650630, lng: -79.386831 }) })
    $("#a20").on("click", function () { getStation('st_patrick_station', { label: 'St Patrick Station', lat: 43.654862, lng: -79.388359 }) })
    $("#a21").on("click", function () { getStation('queens_park_station', { label: "Queen's Park Station", lat: 43.659880, lng: -79.390477 }) })
    $("#a22").on("click", function () { getStation('museum_station', { label: 'Museum Station', lat: 43.667131, lng: -79.393478}) })
    $("#a23").on("click", function () { getStation('st_george_station', {label : 'St George Station', lat : 43.668270, lng : -79.399824}) }) 
    $("#a24").on("click", function () { getStation('spadina_station', { label: 'Spadina Station', lat: 43.670376, lng: -79.405317 }) })
    $("#a25").on("click", function () { getStation('dupont_station', { label: 'Dupont Station', lat: 43.674878, lng: -79.407070 }) })
    $("#a26").on("click", function () { getStation('st_clair_west_station', {label : 'St Clair West Station', lat : 43.684119, lng: -79.415558}) }) 
    $("#a27").on("click", function () { getStation('eglinton_west_station', { label: 'Eglinton West Station', lat: 43.705298, lng: -79.398922 }) })
    $("#a28").on("click", function () { getStation('glencairn_station', { label: 'Glencairn Station', lat: 43.708763, lng: -79.440708 }) })
    $("#a29").on("click", function () { getStation('lawrence_west_station', { label: 'Lawrence West Station', lat: 43.715611, lng: -79.444067}) })
    $("#a30").on("click", function () { getStation('yorkdale_station', { label: 'Yorkdale Station', lat: 43.724633, lng: -79.447532 }) })
    $("#a31").on("click", function () { getStation('wilson_station', { label: 'Wilson Station', lat: 43.734477, lng: -79.450083 }) })
    $("#a33").on("click", function () { getStation('downsview_station', { label: 'Downsview Station', lat: 43.749676, lng: -79.461883 }) })

    $("#b1").on("click", function () { getStation('kennedy_station', { label: 'Kennedy Station', lat: 43.732170, lng: -79.264093 }) })
    $("#b2").on("click", function () { getStation('warden_station', { label: 'Warden Station', lat: 43.711412, lng: -79.279008}) })
    $("#b3").on("click", function () { getStation('victoria_park_station', { label: 'Victoria Park Station', lat: 43.694657, lng: -79.289074 }) })
    $("#b4").on("click", function () { getStation('main_street_station', { label: 'Main Street Station', lat: 43.688983, lng: -79.301696 }) })
    $("#b5").on("click", function () { getStation('woodbine_station', { label: 'Woodbine Station', lat: 43.686377, lng: -79.312565 }) })
    $("#b6").on("click", function () { getStation('coxwell_station', { label: 'Coxwell Station', lat: 43.684253, lng: -79.323060 }) })
    $("#b7").on("click", function () { getStation('greenwood_station', { label: 'Greenwood Station', lat: 43.682578, lng: -79.330422 }) })
    $("#b8").on("click", function () { getStation('donlands_station', { label: 'Donlands Station', lat: 43.681077, lng: -79.338024 }) })
    $("#b9").on("click", function () { getStation('pape_station', { label: 'Pape Station', lat: 43.679925, lng: -79.344856}) })
    $("#b10").on("click", function () { getStation('chester_station', { label: 'Chester Station', lat: 43.67822, lng: -79.352605 }) })
    $("#b11").on("click", function () { getStation('broadview_station', { label: 'Broadview Station', lat: 43.676886, lng: -79.358344 }) })
    $("#b12").on("click", function () { getStation('castle_frank_station', { label: 'Castle Frank Station', lat: 43.673819, lng:  -79.368546 }) })
    $("#b13").on("click", function () { getStation('sherbourne_station', { label: 'Sherbourne Station', lat: 43.67216, lng: -79.376432 }) })
    $("#b14").on("click", function () { getStation('bloor-yonge_station', { label: 'Bloor-Yonge Station', lat: 43.670921, lng: -79.385659 }) })
    $("#b15").on("click", function () { getStation('bay_station', { label: 'Bay Station', lat: 43.670147, lng:  -79.390695 }) })
    $("#b16").on("click", function () { getStation('st_george_station', { label: 'St George Station', lat: 43.668289, lng: -79.399791 }) })
    $("#b17").on("click", function () { getStation('spadina_station', { label: 'Spadina Station', lat: 43.667357, lng: -79.403810 }) })
    $("#b18").on("click", function () { getStation('bathurst_station', { label: 'Bathurst Station', lat: 43.666379, lng: -79.411254 }) })
    $("#b19").on("click", function () { getStation('christie_station', { label: 'Christie Station', lat: 43.664120, lng: -79.418298 }) })
    $("#b20").on("click", function () { getStation('ossington_station', { label: 'Ossington Station', lat: 43.662372, lng: -79.426146 }) })
    $("#b21").on("click", function () { getStation('dufferin_station', { label: 'Dufferin Station', lat: 43.660082, lng: -79.435559 }) })
    $("#b22").on("click", function () { getStation('lansdowne_station', { label: 'Lansdowne Station', lat: 43.659267, lng: -79.442153 }) })
    $("#b23").on("click", function () { getStation('dundas_west_station', { label: 'Dundas West Station', lat: 43.656992, lng: -79.452821 }) })
    $("#b24").on("click", function () { getStation('keele_station', { label: 'Keele Station', lat: 43.655548, lng: -79.459845 }) })
    $("#b25").on("click", function () { getStation('high_park_station', { label: 'High Park Station', lat: 43.653889, lng: -79.466820 }) })
    $("#b26").on("click", function () { getStation('runnymede_station', { label: 'Runnymede Station', lat: 43.651712, lng: -79.476001 }) })
    $("#b27").on("click", function () { getStation('jane_station', { label: 'Jane Station', lat: 43.649930, lng: -79.483853 }) })
    $("#b28").on("click", function () { getStation('old_mill_station', { label: 'Old Mill Station', lat: 43.650100, lng: -79.494928 }) })
    $("#b29").on("click", function () { getStation('royal_york_station', { label: 'Royal York Station', lat: 43.648436, lng: -79.509746 }) })
    $("#b30").on("click", function () { getStation('islington_station', { label: 'Islington Station', lat: 43.645460, lng: -79.523984 }) })
    $("#b31").on("click", function () { getStation('kipling_station', { label: 'Kipling Station', lat: 43.636998, lng: -79.536329 }) })

    $("#c1").on("click", function () { getStation('kennedy_station', { label: 'Kennedy Station', lat: 43.732170, lng: -79.264093 }) })
    $("#c2").on("click", function () { getStation('lawrence_east_station', { label: 'Lawrence East Station', lat: 43.750534, lng: -79.270305 }) })
    $("#c3").on("click", function () { getStation('ellesmere_station', { label: 'Ellesmere Station', lat: 43.766941, lng: -79.276289 }) })
    $("#c4").on("click", function () { getStation('midland_station', { label: 'Midland Station', lat: 43.770420, lng: -79.272243 }) })
    $("#c5").on("click", function () { getStation('scarborough_centre_station', { label: 'Scarborough Centre Station', lat: 43.774400, lng: -79.258051 }) })
    $("#c6").on("click", function () { getStation('mccowan_station', { label: 'McCowan Station', lat: 43.774916, lng: -79.251797}) })

    $("#d1").on("click", function () { getStation('sheppard-yonge_station', { label: 'Sheppard-Yonge Station', lat: 43.762005, lng: -79.411912 }) })
    $("#d2").on("click", function () { getStation('bayview_station', { label: 'Bayview Station', lat: 43.766882, lng: -79.386315 }) })
    $("#d3").on("click", function () { getStation('bessarion_station', { label: 'Bessarion Station', lat: 43.769099, lng: -79.375898 }) })
    $("#d4").on("click", function () { getStation('leslie_station', { label: 'Leslie Station', lat: 43.771023, lng: -79.366048 }) })
    $("#d5").on("click", function () { getStation('don_mills_station', { label: 'Don Mills Station', lat: 43.775455, lng: -79.345594 }) })

    $("#back").click(
      function() {
        $('html,body').animate({
        scrollTop: $("#sign").offset().top},
        'slow');
      });


    $("#content2").hide();
    $("#btn1").hide();
    $("#btn2").hide();
    $("#btn1").click(function(){
        $("#content2").hide();
        $("#content1").show();
    });
    $("#btn2").click(function(){
        $("#content1").hide();
        $("#content2").show();
    });

  });

  function getStation(stn, coord) {
    $( "#stn" ).html("")
    $( "#stn" ).append(coord.label)
    $( "#stn2" ).html("")
    $( "#stn2" ).append(coord.label)
    $('#sendbtn').prop('disabled', false);
    changeMap(coord)
    $("#btn1").show();
    $("#btn2").show();

    var url = "https://api.mlab.com/api/1/databases/wufenglun/collections/users?apiKey=VbP032z_C8byrkpftxpXb2lv5LEExypq"
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json"
      }).then(data => {

        var results = {}
        var times = []
        //iterate through each user
        for (var i in data) {
            //get the feedback information of each user
            var feedbacks = data[i].feedback;
            for (var j = 0; j < feedbacks.length; j++) {
                //feedback text
                var f_index = feedbacks[j].indexOf("$")
                var feedback = feedbacks[j].slice(0, f_index)

                //time of the station
                var time_stn = feedbacks[j].slice(f_index+1)
                
                var s_index = time_stn.indexOf("%")
                var time = time_stn.slice(0, s_index)
                //station name
                var stn_name = time_stn.slice(s_index+1)

                if (stn_name == coord.label) {
                    // results.push({key: new Date(time.slice(20)), value:[data[i].username, feedback]})
                    results[new Date(time.slice(20))] = [data[i].username, feedback]
                    times.push(new Date(time.slice(20)));
                }
            }
        }

            var three = []
            var count = 0;
            while (count < 3) {
                if (times.length > 0) {
                    var max_time = new Date(Math.max.apply(null, times));
                    three.push(results[max_time][0])
                    three.push(results[max_time][1])
                    three.push(max_time)
                    var index = -1;
                    for (var k=0; k < times.length; k++) {
                        if (times[k].toString() == max_time.toString()) {
                            index = k
                        }
                    }
                    if (index != -1) times.splice(index, 1);
                } else {
                    three.push('')
                    three.push('')
                    three.push('')
                }
                count = count + 1
            }
            
            $('#content2').html(three)
            $('#content2').html(`<div class="comments-section">
            <div class="comments">
              <h4>Feedbacks</h4>
              <div id="comments-container">
                <div class="comment">
                  <div class="comment-user">
                    <span class="user-details"><span class="username" onclick="{location.href='/feedback/view/` + three[0] + `'}"> ` + three[0] + ` </span><span>on </span><span> ` + three[2] + ` </span></span>
                  </div>
                  <div class="comment-text"> 
                    ` + three[1] + `
                  </div>
                </div>
                <div class="comment">
                  <div class="comment-user">
                    <span class="user-details"><span class="username" onclick="{location.href='/feedback/view/` + three[3] + `'}"> ` + three[3] + ` </span><span>on </span><span> ` + three[5] + ` </span></span>
                  </div>
                  <div class="comment-text"> 
                    ` + three[4] + `
                  </div>
                </div>
                <div class="comment">
                  <div class="comment-user">
                    <span class="user-details"><span class="username" onclick="{location.href='/feedback/view/` + three[6] + `'}"> ` + three[6] + ` </span><span>on </span><span> ` + three[8] + `</span></span>
                  </div>
                  <div class="comment-text">
                    ` + three[7] + `
                  </div>
                </div>
              </div>
              </div>
            </div> `)
      }).catch(err => {
        console.log(err);
        alert('failed to retrieve');
      });    


      //get the station information via ttc api
      $.ajax({
        url: 'https://myttc.ca/' + stn + '.json',
        method: 'GET',
        dataType: 'jsonp'
      }).then(data => {//data is the station information
        console.log('Success ' + data);
        $( "#stn" ).html("")
        $( "#stn" ).append(data.name)
        $('#content1').html("")
        $.each(data.stops,function(i,item){
          if (item.routes.length != 0) {
                $('<li id="plat">')
                .text(item.name)
                .appendTo('#content1')
          var i
          for (i = 0; i < item.routes.length; i++) {
            // $( "#content1" ).append(item.routes[i].name + ": ")
            var j
            var time = "";
            for (j = 0; j < item.routes[i].stop_times.length; j++) {
                // $( "#content1" ).append(" " + item.routes[i].stop_times[j].departure_time)
                time += item.routes[i].stop_times[j].departure_time + " "
              }
             $('#content1').append('<table width="480" border="1" ><tr><td colspan="2" rowspan="1">' + item.routes[i].name + '</td></tr><tr><td width="480">' + time + '</td></tr></table>');
             $( "#content1" ).append("<br><br>")
            } 
          } 
        })
        changeMap(coord)
      }).catch(err => {
        console.log(err);
        alert('failed to retrieve');
      }); 
    
    }

  function initMap() {
    var uluru = {label : 'Toronto', lat : 43.651566, lng : -79.384068};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  function changeMap(coord) {
    var uluru = coord;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }



