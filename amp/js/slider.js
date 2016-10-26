(function(global) {
    'use strict';

    var slider = document.querySelector('.slider'),
        img1 = document.querySelector('.img1'),
        img2 = document.querySelector('.img2'),
        img3 = document.querySelector('.img3'),
        btnX = document.querySelector('.btn-x'),
        toggle = 0;

    function moveLeft() {
        var posImg1 = window.getComputedStyle(img1).left;
        var posImg2 = window.getComputedStyle(img2).left;
        var posImg3 = window.getComputedStyle(img3).left;

        posImg1 = parseInt(posImg1) - 720;
        posImg2 = parseInt(posImg2) - 720;
        posImg3 = parseInt(posImg3) - 720;

        img1.style.left = posImg1 + 'px';
        img2.style.left = posImg2 + 'px';
        img3.style.left = posImg3 + 'px';
    }

    function moveRight() {
        var posImg1 = window.getComputedStyle(img1).left;
        var posImg2 = window.getComputedStyle(img2).left;
        var posImg3 = window.getComputedStyle(img3).left;

        posImg1 = parseInt(posImg1) + 720;
        posImg2 = parseInt(posImg2) + 720;
        posImg3 = parseInt(posImg3) + 720;

        img1.style.left = posImg1 + 'px';
        img2.style.left = posImg2 + 'px';
        img3.style.left = posImg3 + 'px';
    }

    var touchstartX;

    slider.addEventListener('touchstart', function(e){
        var touch = e.touches[0];
        touchstartX = touch.clientX;
        // touchstartY = touch.clientY;
    });

    slider.addEventListener('touchend', function(e){

        var touch = e.changedTouches[e.changedTouches.length - 1],
        touchendX = touch.clientX;
        // touchendY = touch.clientY;

        var touchoffsetX = touchendX - touchstartX;
        // touchoffsetY = touchendY - touchstartY;

        if(touchoffsetX < 0 && window.getComputedStyle(img3).left !== '0px') {
            moveLeft();
        }
        else if(touchoffsetX > 0 && window.getComputedStyle(img1).left !== '0px') {
            moveRight();
        }
        else if(touchoffsetX === 0 && toggle === 0 ) {
            slider.classList.add('modal');
            btnX.style.display = 'block';
            toggle = 1;
        }

    });



    //
    // slider.onclick = function(){
    //     slider.classList.add('modal');
    //     btnX.style.display = 'block';
    // };

    btnX.addEventListener('touchstart', function(e){
        slider.classList.remove('modal');
        btnX.style.display = 'none';
        toggle = 0;
    });

}(this));
