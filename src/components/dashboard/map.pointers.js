setInterval("initialize()", 360000);
var siteUrl = null;
var markers = new Array();
function displayMarkers(category,markers) {
  var i;
 console.log(markers);
  for (i = 0; i < markers.length; i++) {
    if (markers[i].category === category) {
      markers[i].setVisible(true);
    }
    else {
      markers[i].setVisible(false);
    }
  }
}
function GMControl(controlDiv, map,markers) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        //controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginTop = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'GM';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
         displayMarkers('GROUNDMOUNT',markers);
        });
}

function RFControl(controlDiv, map,markers) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        //controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginTop = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'RF';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
         displayMarkers('ROOFTOP',markers);
        });
      }
function loadScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //Live URL
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyAI31LCGBIPwuKueJX50PQ3dTZn-2Q2EaE&' + 'callback=initialize';
    //Local URL
    //script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyCTMy1ODJAXcmr149XRaRFUhHGxFvj4Giw&' + 'callback=initialize';

    document.body.appendChild(script);
    siteUrl = url;
}
var plantMarkers = [];
function initialize() {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(25.2820, 82.9563)
    };
    var apiName = "";
    var currentLocation = window.location.toString();
    var hubId = $("#hub_id").attr("value");
    if(currentLocation.indexOf("rtdashboard/hubPlants")!=-1)
    {
        apiName = "getAllPlantDetailWithInsolationByPlantAndHub/"+hubId;
    }
    else
    {
        apiName = "getAllPlantDetailWithInsolationByPlant";
    }
    var map = new google.maps.Map(document.getElementById('show_map'), mapOptions);
    var ajaxTime = new Date().getTime();
    $.ajax({
        type: 'POST',
        url: siteUrl + 'common/' + apiName,
        cache: false,
        dataType: "json",
        success: function (response) {
            if (response.status === 1) {
                var modelPowerIndex;
                var ModelPowerIconColor;
                var plantModelArray = {};
                if(response.availability === 1)
               { availability = ['GROUNDMOUNT'];}
                else if(response.availability === 2)
               { availability = ['ROOFTOP'];}
               else {
               availability = ['GROUNDMOUNT','ROOFTOP'];
               }
                plantModelArray['plant'] = [];
                plantModelArray['model_value'] = [];
                $.each(response.plantModelPower, function (i, value) {
                    //alert(value.plant_id+'>>>>Model Power = '+value.model_power+'>>>>Power = '+value.power);
                    plantModelArray['plant'][i] = value.plant_id;
                    plantModelArray['model_value'][i] = parseFloat(value.model_power) / parseFloat(value.power);
                });
                //console.log(plantModelArray);
                $.each(response.plantList, function (i, value) {
                   if($.inArray(value.type, availability) !== -1) {
                    if (value.plant_dashboard_status === 1 ){ //Bypass pinhead color based on the plant input data
                        ModelPowerIconColor = 'green';
                    } else if (value.plant_dashboard_status === 2 ){
                        ModelPowerIconColor = 'yellow';
                    } else if (value.plant_dashboard_status === 3 ){
                        ModelPowerIconColor = 'orange';
                    } else if (value.plant_dashboard_status === 4 ){
                        ModelPowerIconColor = 'red';
                    } else { //Actual pinhead color based on the inverter data
                        if (value.insolation_entries !== 0 && value.inverters_entries === 0) {
                            ModelPowerIconColor = 'red';
                        } else {
                            if (value.insolation_entries !== 0) {
                                if (value.total_no_Invt !== value.total_Invt_entry) {
                                    ModelPowerIconColor = 'orange';
                                } else {
                                    if (value.total_no_Invt === value.total_Invt_entry) {
                                        ModelPowerIconColor = 'green';
                                    }
                                }
                            } else {
                                ModelPowerIconColor = 'yellow';
                            }
                        }
                    }

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(value.lat, value.long),
                        map: map,
                        labelContent: value.plant_name,
                        labelAnchor: new google.maps.Point(22, 0),
                        labelClass: "labels",
                        icon: 'images/pin-' + ModelPowerIconColor + '.png',
                        animation: google.maps.Animation.DROP,
                        draggable: true,
                        title: value.plant_name,
                        category:value.type
                    });
                    plantMarkers[value.plant_id] = marker;
                    markers.push(marker);
                    /*  google.maps.event.addListener(marker, "click", function (e) {
                     window.location = siteUrl + 'analytics/index/'+window.btoa(value.plant_id);
                     });
                     */
                    var imagePath;
                    if (value.photo_url !== '' && value.photo_url !== null) {
                        imagePath = siteUrl + 'uploads/Thumb/' + value.photo_url;
                    } else {
                        imagePath = siteUrl + 'images/noImage.jpg';
                    }
                    var contentHtml = '<div class="mapDetailBox"><div class="mapDetThumb"><img src="' + imagePath + '"/></div><table cellspacing="3" cellpadding="0" class="mapAddSec">';
                    contentHtml = contentHtml + '<tr><td><b>Name</b></td><td><b>: </b></td><td>&nbsp;' + value.plant_name + '</td></tr>';
                    contentHtml = contentHtml + '<tr><td><b>Location</b></td><td><b>: </b></td><td>&nbsp;' + value.location + '</td></tr>';
                    var tariff = 'N/A';
                    if (value.tariff !== '') {
                        tariff = value.tariff;
                    }
                    contentHtml = contentHtml + '<tr><td><b>PPA Tariff (INR)</b></td><td><b>: </b></td><td>&nbsp;' + tariff + '</td></tr>';
                    var commissioningDate = 'N/A';
                    if (value.commissioning_date !== '') {
                        var splitDate = value.commissioning_date;
                        splitDate = splitDate.split('-');
                        commissioningDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
                    }
                    contentHtml = contentHtml + '<tr><td><b>COD</b></td><td><b>: </b></td><td>&nbsp;' + commissioningDate + '</td></tr>';
                    var projectLife = 'N/A';
                    if (value.project_life !== '') {
                        projectLife = value.project_life;
                    }
                    contentHtml = contentHtml + '<tr><td><b>Project Life (Year)</b></td><td><b>: </b></td><td>&nbsp;' + projectLife + '</td></tr>';
                    var plantCapicity;
                    if (value.plant_capacity_ac !== '' && value.plant_capacity_ac !== null) {
                        plantCapicity = value.plant_capacity_dc;
                    } else {
                        plantCapicity = 'N/A';
                    }
                    contentHtml = contentHtml + '<tr><td><b>Capacity (kW)</b></td><td><b>: </b></td><td>&nbsp;' + plantCapicity + '</td></tr>';
                    var plantArea = 'N/A';
                    if (value.area_plant_acres !== '') {
                        plantArea = value.area_plant_acres;
                    }
                    contentHtml = contentHtml + '<tr><td><b>Plant Area (Acres)</b></td><td><b>: </b></td><td>&nbsp;' + plantArea + '</td></tr>';
                    contentHtml = contentHtml + '<tr><td><b>Lat/Long</b></td><td><b>: </b></td><td>&nbsp;' + value.lat + 'N, ' + value.long + 'E</td></tr>';
                    contentHtml = contentHtml + '<tr><td colspan="3"><a href="' + siteUrl + 'analytics/index/' + window.btoa(value.plant_id) + '">Detail</a></td></tr>';
                    contentHtml = contentHtml + '</table></div>';
                    var iw = new google.maps.InfoWindow({
                        content: contentHtml,
                        closeclick: false,
                        disableAutoPan: 0
                    });
                    google.maps.event.addListener(marker, "click", function (e) {
                        iw.open(map, marker);
                    });
                    //  google.maps.event.addListener(marker, "mouseout", function (e) {iw.close(map, marker); });
                    if(value.todayicon !== null && value.tmwicon !== null)
                    {
                    var todaySrc = 'http://openweathermap.org/img/w/' + value.todayicon + '.png';
                    var tomorrowSrc = 'http://openweathermap.org/img/w/' + value.tmwicon+ '.png';
                    $("#weather_icon_today_" + value.plant_id).attr('src', todaySrc);
                    $("#weather_icon_today_" + value.plant_id).attr('width', '30');
                    $("#weather_icon_today_" + value.plant_id).attr('height', '30');
                    $("#weather_icon_tomorrow_" + value.plant_id).attr('src', tomorrowSrc);
                    $("#weather_icon_tomorrow_" + value.plant_id).attr('width', '30');
                    $("#weather_icon_tomorrow_" + value.plant_id).attr('height', '30');
                     }
                    else {
                      $("#weather_icon_today_" + value.plant_id).attr('src', '');
                      $("#weather_icon_tomorrow_" + value.plant_id).attr('src', '');
                    } }
                });
                /*var gmControlDiv = document.createElement('div');
                var gmControl = new GMControl(gmControlDiv, map,markers);
                var rfControlDiv = document.createElement('div');
                var rfControl = new RFControl(rfControlDiv, map,markers);

                gmControlDiv.index = 1;
                rfControlDiv.index = 2;
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(gmControlDiv);
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(rfControlDiv); */
                var inso;
                var total_insolation = 0;
                var gm_total_insolation = 0;
                var rt_total_insolation = 0;
                $.each(response.dataList, function (i, value) {
                    if (value.insolation !== null) {
                        inso = parseFloat(value.insolation);
                        if (value.type === 'ROOFTOP') {
                            rt_total_insolation += inso;
                        } else if (value.type === 'GROUNDMOUNT') {
                            gm_total_insolation += inso;
                        }
                        total_insolation += inso;
                        $("#inso_data_today_" + value.plant_id).html(inso.toFixed(2));
                    }
                });
                $("#gm_total_insolation").html(gm_total_insolation.toFixed(2));
                $("#gm_total_insolation_2").html($('#gm_total_insolation').text());
                $("#rt_total_insolation").html(rt_total_insolation.toFixed(2));
                $("#rt_sub_total_insolation_2").html($('#rt_total_insolation').text());
                $("#total_insolation").html(total_insolation.toFixed(2));
                $("#total_insolation_2").html($('#total_insolation').text());

                var ener;
                var carb;
                var totalTill = 0;
                var gmTotalTilldate = 0;
                var rfTotalTilldate = 0;
                $.each(response.allplantdataList, function (i, value) {
                    //console.log(value);
                    if (value.e_till_date !== null) {
                        ener = parseFloat(value.e_till_date/1000000);
                        carb = parseFloat(value.carbon_till_date);
                        if (value.type === 'ROOFTOP') {
                            rfTotalTilldate += ener;
                        } else if (value.type === 'GROUNDMOUNT') {
                            gmTotalTilldate += ener;
                        }
                        totalTill += ener;
                        $("#carbon_till_" + value.plant_id).html(carb.toFixed(2));
                        $("#energy_till_" + value.plant_id).html(ener.toFixed(2));
                    }
                });
                $("#gm_total_energy_till").html(gmTotalTilldate.toFixed(2));
                $("#gm_total_energy_till_2").html($('#gm_total_energy_till').text());
                $("#rt_total_energy_till").html(rfTotalTilldate.toFixed(2));
                $("#rt_sub_total_energy_till_2").html($('#rt_total_energy_till').text());
                $("#total_energy_till").html(totalTill.toFixed(2));
                $("#total_energy_till_2").html($('#total_energy_till').text());
            } else {
                window.location.href = siteUrl + 'user/logout';
            }
        }
    }).done(function () {
        var totalTime = new Date().getTime() - ajaxTime;
        $("#todayData tr").each(function () {
            var eachRow = $(this).find('td').eq(8).find('img');
            if (eachRow.attr('src') !== undefined) {
                $(this).find('td').eq(8).html('N/A');
            }

            var eachRow = $(this).find('td').eq(4).find('img');
            if (eachRow.attr('src') !== undefined) {
                $(this).find('td').eq(4).html('N/A');
            }

            var eachRow = $(this).find('td').eq(9).find('img');
            if (eachRow.attr('src') !== undefined) {
                $(this).find('td').eq(9).html('N/A');
            }

        });
    });

    //Gross total
    $("#gross_total_PPA_capacity_2").html($('#gross_total_PPA_capacity').text());
    $("#gross_total_energy_2").html($('#gross_total_energy').text());
    $("#gross_total_day_ahead_2").html($('#gross_total_day_ahead').text());

    //Groundmount sub total
    $("#gm_sub_total_PPA_capacity_2").html($('#gm_sub_total_PPA_capacity').text());
    $("#gm_sub_total_energy_2").html($('#gm_sub_total_energy').text());
    $("#gm_sub_total_day_ahead_2").html($('#gm_sub_total_day_ahead').text());

    //Rooftop sub total
    $("#rt_sub_total_PPA_capacity_2").html($('#rt_sub_total_PPA_capacity').text());
    $("#rt_sub_total_energy_2").html($('#rt_sub_total_energy').text());
    $("#rt_sub_total_day_ahead_2").html($('#rt_sub_total_day_ahead').text());
}
function getAllPlantInsolationValue(url) {
    $("#todayData tr").each(function (i) {
        if (i > 0) {
            $(this).find('td').eq(3).html('<img src="' + url + 'images/arbo-loader-grey.gif"/>');
        }
    })
    $.ajax({
        type: 'POST',
        url: siteUrl + 'common/getAllPlantDetailWithInsolationByPlant',
        cache: false,
        dataType: "json",
        success: function (response) {
            $.each(response.dataList, function (i, value) {
                if (value.insolation !== null) {
                    inso = parseFloat(value.insolation);
                    $("#inso_data_today_" + value.plant_id).html(inso.toFixed(2));
                }
            });

            var modelPowerIndex;
            var ModelPowerIconColor;
            var plantModelArray = {};
            plantModelArray['plant'] = [];
            plantModelArray['model_value'] = [];
            $.each(response.plantModelPower, function (i, value) {
                //alert(value.plant_id+'>>>>Model Power = '+value.model_power+'>>>>Power = '+value.power);
                plantModelArray['plant'][i] = value.plant_id;
                plantModelArray['model_value'][i] = parseFloat(value.model_power) / parseFloat(value.power);
            });
            //console.log(plantModelArray);
            $.each(response.plantList, function (i, value) {
                if (value.insolation_entries !== 0 && value.inverters_entries === 0) {
                    ModelPowerIconColor = 'red';
                } else {
                    if (value.insolation_entries !== 0) {
                        if (value.total_no_Invt !== value.total_Invt_entry) {
                            ModelPowerIconColor = 'orange';
                        } else {
                            if (value.total_no_Invt === value.total_Invt_entry) {
                                ModelPowerIconColor = 'green';
                            }
                        }
                    } else {
                        ModelPowerIconColor = 'yellow';
                    }
                }
                plantMarkers[value.plant_id].setIcon('images/pin-' + ModelPowerIconColor + '.png');
            });
        }
    }).done(function () {
        $("#todayData tr").each(function () {
            var eachRow = $(this).find('td').eq(4).find('img');
            if (eachRow.attr('src') !== undefined) {
                $(this).find('td').eq(4).html('N/A');
            }
        });
    });
}

function getAllPlantEnergyGeneratedValue(url)
{
    /*$("#todayData tr").each(function(i){
     if(i>0){
     $(this).find('td').eq(6).html('<img src="'+url+'images/arbo-loader-grey.gif"/>');
     }
     })*/
    $.ajax({
        type: 'POST',
        url: siteUrl + 'common/getAllPlantEnergyGenerateByPlant',
        cache: false,
        dataType: "json",
        success: function (response) {
            var totalTill = 0;
            $.each(response.allplantdataList, function (i, value) {
                if (value.e_till_date !== null) {
                    ener = parseFloat(value.e_till_date);
                    inso = parseFloat(value.carbon_till_date);
                    totalTill += ener;
                    $("#energy_till_" + value.plant_id).html(ener.toFixed(2));
                    $("#carbon_till_" + value.plant_id).html(inso.toFixed(2));
                }
            });
            $("#total_energy_till").html(totalTill.toFixed(2));
        }
    }).done(function () {
        $("#todayData tr").each(function () {
            var eachRow = $(this).find('td').eq(6).find('img');
            if (eachRow.attr('src') !== undefined) {
                $(this).find('td').eq(6).html('N/A');
            }

            var eachRow = $(this).find('td').eq(9).find('img');
            if (eachRow.attr('src') !== undefined) {
                $(this).find('td').eq(9).html('N/A');
            }
        });
    });
}

function launchFullscreen(element, url) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
    /* Hide top menu
     $("#header").hide();
     //Map Height
     $(".weatherListBox").height("265px");
     $(".mapImgSec").height("650px");
     $(".dashArticle").height("650px");
     $(".da-slider").height("730px");
     $(".dashborad").height("650px");

     $.each($(".dashborad section"),function(){
     var sectionHeight = $(this).height();
     if(sectionHeight === 500){
     $(this).height(600);
     }else{
     $(this).height(290)
     }
     });
     onChangePlant(url);
     loadScript(url);
     */
}

function cancelFullscreen(url) {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    /*
     *  Hide top menu
     * $("#header").show();
     //Map Height
     $(".weatherListBox").height("220px");
     $(".mapImgSec").height("530px");
     $(".dashArticle").height("546px");
     $(".da-slider").height("630px");
     $(".dashborad").height("546px");
     $.each($(".dashborad section"),function(){
     var sectionHeight = $(this).height();
     if(sectionHeight === 600){
     $(this).height(500);
     }else{
     $(this).height(245)
     }
     });
     onChangePlant(url);
     loadScript(url);
     */
    //window.location.reload();
}

function dumpFullscreen() {
    console.log("document.fullScreenElement is: ", document.fullScreenElement || document.mozFullScreenElement || document.webkitFullScreenElement);
    console.log("document.fullScreenEnabled is: ", document.fullScreenEnabled || document.mozScreenEnabled || document.webkitScreenEnabled);
}

function zoomPlantInMap(plantId,siteUrl) {
    $.ajax({
        type: 'POST',
        url: siteUrl + 'common/getPlantdetails' ,
        cache: false,
        dataType: "json",
        data : {plant_id:plantId},
        success: function (response)
        {
            if (response.status === 1)
            {
                var latitude = response.PlantdetailsList.lat;
                var longitude = response.PlantdetailsList.long;
                var plantName = response.PlantdetailsList.plant_name;
                var plantDashboardStatus = response.PlantdetailsList.plant_dashboard_status;
                var modelPowerIconColor = "";
                var liveData = "";
                $.ajax({
                        type: 'POST',
                        url: siteUrl + 'common/getPlantLiveDataGenerationById' ,
                        cache: false,
                        dataType: "json",
                        data : {plant_id:plantId},
                }).done(function(response) {
                    liveData = response;
                });
                //Actual pinhead color based on the inverter data
                var modelPowerIconColor = "";
                if(plantDashboardStatus === 1)
                {
                    modelPowerIconColor = 'green';
                }
                else if(plantDashboardStatus === 2)
                {
                    modelPowerIconColor = 'yellow';
                }
                else if(plantDashboardStatus === 3)
                {
                    modelPowerIconColor = 'orange';
                }
                else if(plantDashboardStatus === 4)
                {
                    modelPowerIconColor = 'red';
                }
                else
                {
                    // Actual pinhead color based on the inverter data
                    if (liveData.insolation_entries !== 0 && liveData.inverters_entries === 0)
                    {
                        modelPowerIconColor = 'red';
                    }
                    else
                    {
                        if (liveData.insolation_entries !== 0)
                        {
                            if (liveData.total_no_Invt !== liveData.total_Invt_entry)
                            {
                                modelPowerIconColor = 'orange';
                            }
                            else
                            {
                                if (liveData.total_no_Invt === liveData.total_Invt_entry)
                                {
                                    modelPowerIconColor = 'green';
                                }
                            }
                        }
                        else
                        {
                            modelPowerIconColor = 'yellow';
                        }
                    }
                }
                var mapOptions =
                {
                    zoom: 10,
                    center: new google.maps.LatLng(latitude, longitude)
                };
                var map = new google.maps.Map(document.getElementById('show_map'), mapOptions);
                var marker = new google.maps.Marker
                ({
                    position: new google.maps.LatLng(latitude,longitude),
                    map: map,
                    labelContent: plantName,
                    labelAnchor: new google.maps.Point(22, 0),
                    labelClass: "labels",
                    icon: 'images/pin-' + modelPowerIconColor + '.png',
                    animation: google.maps.Animation.DROP,
                    draggable: true,
                    title: plantName
                });
            }
        }
    });

}
