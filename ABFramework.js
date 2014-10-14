var maxTablet = 720;

function loadAjax(id, url) {
    var timestamp = new Date().getTime();
    var connector = "?";

    if (url.indexOf("?") >= 0) {
        connector = "&";
    }

    $('#' + id).load(url + connector + 'ts=' + timestamp);

    //if (str.indexOf("Yes") >= 0)
}

function push(position, selector) {
    var margin = "";
    var element = selector.closest('.pushSlides');
    //element.attr('activeSlide', activeSlide);
    margin = "-" + (position * 100) + "%";
    element.css('margin-left', margin);

    $('.pushSlide').removeClass('active');
    $('#pushSlide-' + position).addClass('active');

    //hide master on select in sm view
    if (position > 0) {
        $('.master').removeClass('left-master-autohide-visible');
    }
    else {
        $('.master').addClass('left-master-autohide-visible');
    }
    
    slideView(0);
    checkForSameHeightProperties();

    scrollToTop();

}

function changeTab(selector, tab) {
    var element = selector.closest('.tabs');
    //console.log(element.attr('class'));
    $('.tab-buttons').children('a').removeClass('active');
    selector.addClass('active');
    $('.tabs .tab').removeClass('active');
    $('#tab-' + tab).addClass('active');

}

function slideView(s) {
    $('.slideView').css('opacity', '0');
    if (s == 0) {
        $('.slideViews').css('margin-left', '');
    }
    else {
        $('.slideViews').css('margin-left', -(s * 100) + '%');
    }
    $('#slideView-' + s).css('opacity', '1');
    $('.slideView-' + s).css('opacity', '1');

    scrollToTop();
}

function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
} //doesnt work

var sameHeightRowHeight = 0;
function checkForSameHeightProperties() {
    $('.same-height').css('height', '');
    $('.same-height-row').each(function () {

        var maxHeight = 0;
        $(this).find('.same-height').each(function () {

            var height = $(this).outerHeight();

            if (height > maxHeight) {
                maxHeight = height;
            }
        })
        //console.log('checking' + maxHeight);
        sameHeightRowHeight = maxHeight;
        $(this).find('.same-height').css('height', (maxHeight) + 'px');
    })
}

$(document).ready(function () {
    changeTab($('#tab-0-btn'), 0);
    push(0, $('#pushSlide-0'));

    $('.pushSlides').addClass('transitions1');
    $('.pushSlide').addClass('transitions1');

    $('.left-master-autohide').on('mouseover', function () {
        $(this).addClass('left-master-autohide-visible');
    });

    $('.left-master-autohide').on('mouseout', function () {
        $(this).removeClass('left-master-autohide-visible');
    });

    $('.right-master-autohide').on('mouseover', function () {
        $(this).addClass('right-master-autohide-visible');
    });
    $('.right-master-autohide').on('mouseout', function () {
        $(this).removeClass('right-master-autohide-visible');
    });

    $('.master').removeClass('left-master-autohide-visible');

    $('footer').click(function(){
        scrollToTop();
        return false;
    });
	
	(function ($) {
		$(document).ready(function () {
			$.slidebars({disableOver: 769});
		});
	})(jQuery);
	
	$(document).ready(function() {
		$(".imgLiquid").imgLiquid();
	});

    //$("transitions1 *").addClass("transitions1");

    //addAutoHideListener();
})

$(window).resize(function () {
    $('.resetHeightOnResize').css('height', '');
    checkForSameHeightProperties();
});

$(window).on('load', function () {
    checkForSameHeightProperties();
    setTabButtonsWidth();
});

setInterval(function () {
    checkForSameHeightProperties();
    setTabButtonsWidth();
}, 5000)

//$('body').bind('DOMNodeInserted', function (e) {
//    console.log('domnodeinserted');
//    checkForSameHeightProperties();
//});

var mouseDownPositionX = 0;
var sidebarWidth;

function addAutoHideListener() {
    //var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
    //var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
    sidebarWidth = $('.master').width();

    $('body').on('mousedown', function (mde) {
        $('.master').removeClass('transitions1');
        mouseDownPositionX = mde.clientX;
        //console.log('START' + mouseDownPositionX);
        $('body').bind('mousemove', function (e) {
            var moved = mouseDownPositionX - e.clientX

            // LEFT SIDEBAR
            if ($('.left-master-autohide').length > 0) {
                var left = parseInt($('.left-master-autohide').css('left'));
                //console.log(moved);
                if (((-sidebarWidth - moved) + 5) <= 0 && moved < 0) { // MOVED < 0 means right swipe
                    $('.left-master-autohide').css('left', ((-sidebarWidth - moved) + 5) + 'px');
                }

                if (moved > 0) { 
                    $('.left-master-autohide').css('left', ((-sidebarWidth - moved) + 5) + 'px');
                }
            }
        })
    })

    $('body').on('mouseup', function (e) {
        var moved = mouseDownPositionX - e.clientX;
        $('body').unbind('mousemove');
        $('.master').addClass('transitions1');

        $('.left-master-autohide').css('left', '');
        if (moved < 0 && moved < -100) {
            
            $('.left-master-autohide').addClass('left-master-autohide-visible');
            //$('.right-master-autohide').addClass('right-master-autohide-visible');
        }
        else if (moved > 0 && moved < sidebarWidth && moved > 100) {
            $('.left-master-autohide').removeClass('left-master-autohide-visible');
        }

        //console.log('END:' + (mouseDownPositionX - e.clientX));
        
    });
    
}


function setTabButtonsWidth() {
    $('.tab-buttons').each(function () {
        var no = $(this).children('a').length;
        var percent = 100 / no;
        $(this).children('a').css('width', percent + '%');
    });
}