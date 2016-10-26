(function(global, XHR) {
    'use strict';

    var createXHR = (function () {
        XHR = XHR || ActiveXObject('Microsoft.XMLHttp');
        return function () {
            return new XHR;
        }
    })();

    function buildingView () {
        xhr.open('GET', 'data/items.json');
        xhr.send();
    }

    var xhr = createXHR();
    var view = document.querySelector('.info-building .text-box');

    buildingView();

    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            console.log('통신 데이터 전송 성공 :) ');

            var buildingData = this.response;
            var currentData = JSON.parse(buildingData);

            var info = currentData.datas.building;

            var template =
            `<amp-img media="(min-width: 415px)" src="${info.img}" alt="building" width="240" height="240"></amp-img>
            <amp-img media="(max-width: 414px)" src="img/building.png" alt="building" width="138" height="138"></amp-img>
            <div class="detail-building">
                <p>${info.name}</p>
                <p>${info.address1} ${info.address2} ${info.address3}</p>
                <div class="line"></div>
                <p>${info.floor}</p>
                <p>${info.rooms}</p>
                <p>${info.established}</p>
            </div>`;

            view.innerHTML = template;
        }
        else {
            console.log('통신 데이터 전송 실패 :( ');
        }
    };

}(this, this.XMLHttpRequest));
