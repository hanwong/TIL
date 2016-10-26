(function(global) {
    'use strict';

    var mapContainer = document.querySelector('.info-location .map'), // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(37.4996692,127.0347623), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new daum.maps.Map(mapContainer, mapOption);
    map.setDraggable(false);
    map.setZoomable(false);

    var imageSrc = 'img/marker.png',
    imageSize = new daum.maps.Size(64, 69),
    imageOption = {offset: new daum.maps.Point(27, 69)};

    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new daum.maps.LatLng(37.4996692,127.0347623);

    var marker = new daum.maps.Marker({
        position: markerPosition,
        image: markerImage
    });

    marker.setMap(map);

}(this));
