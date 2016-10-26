(function() {
    'use strict';

    function callAgent(num) {
        location.href = 'tel:'+num;
    }

    var callBtn = document.querySelector('.call button');

    callBtn.onclick = function() {
        callAgent('010-5228-7825');
    };


}());
