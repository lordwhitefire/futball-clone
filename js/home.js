/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    design
 * @package     rwd_futbolmania
 * @copyright   Copyright (c) 2006-2014 X.commerce, Inc. (http://www.magento.com)
 * @license     http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

function appendContentHome(itemElement, itemPhoto, baseUrl, itemTitle, itemPageUrl, itemSpecialBanner, itemDescription, itemRange, itemMore) {
    var htmlContent = '<article><figure>';
    if (itemPhoto) {
        htmlContent+='<img src="'+baseUrl+itemPhoto+'" alt="'+itemTitle+'" width="100%" height="100%">'
    }
	htmlContent+='<figcaption class="home-div-link">';
    if (itemTitle || itemDescription) {
        htmlContent+='<div class="home-div__overlay">';
        if (itemTitle) {
            htmlContent+='<h1 class="home-div__overlay__title">'+itemTitle+'</h1>';
        }
        if (itemDescription) {
            htmlContent+='<p class="home-div__overlay__content">'+itemDescription+'</p>';
        }
		htmlContent+='<p class="home-div__overlay__show_more">'+itemMore+'</p>';
        htmlContent+='</div>';
    }

    if (itemSpecialBanner != "0") {
        htmlContent+='<a class="special-banner" href="'+itemPageUrl+'">'+itemTitle+'</a>';
    } else {
        htmlContent+='<a href="'+itemPageUrl+'">'+itemTitle+'</a>';
    }
	htmlContent+='</figcaption></figure></article>';
    if (itemTitle || itemDescription) {
        jQuery('#elem'+itemElement+'-'+itemRange)
            .append(htmlContent)
            .addClass('overlay');
    } else {
        jQuery('#elem'+itemElement+'-'+itemRange)
            .append(htmlContent)
            .addClass('no-overlay');
    }
}

var found = false;
var firstElem;
var delay=300, setTimeoutConst;
var homeType = 1; // variable de sessio estat actual, per defecte la gran majoria de vegades sera Adulto
var selectRange = 'range'+homeType;
jQuery(window).load(function(){
    if(jQuery('.switch-home-links-container .switch-home-links .switch-home-link.kid.selected').length){
        homeType = 2;
        selectRange = 'range'+homeType;
    }
    var ww = jQuery(window).width();
    if (ww < 1200) {
        jQuery(".home-div-content").css("width","33.33333%");
        jQuery(".home-div-content2").css("width","66.66666%");

        /** ROW 1*/
        jQuery("#elem1-"+selectRange).appendTo("#r1c1");
        jQuery("#elem2-"+selectRange).appendTo("#r1c1");
        jQuery("#elem3-"+selectRange).appendTo("#r1c2");
        jQuery("#elem4-"+selectRange).appendTo("#r1c1");
        jQuery("#elem5-"+selectRange).appendTo("#r1c2").removeClass("home-div").addClass("home-div2");
        jQuery("#elem6-"+selectRange).appendTo("#r1c2").removeClass("home-div").addClass("home-div2");

        /** ROW 2*/
        jQuery("#elem7-"+selectRange).appendTo("#r2c3").removeClass("home-div").addClass("home-div2");
        jQuery("#elem8-"+selectRange).appendTo("#r2c3").removeClass("home-div").addClass("home-div2");
        jQuery("#elem9-"+selectRange).appendTo("#r2c4");
        jQuery("#elem10-"+selectRange).appendTo("#r2c3");
        jQuery("#elem11-"+selectRange).appendTo("#r2c4");

        /** ROW 3 - sin borde*/
        jQuery("#elem12-"+selectRange).appendTo("#r3c1");
        jQuery("#elem13-"+selectRange).appendTo("#r3c2");
        jQuery("#elem15-"+selectRange).appendTo("#r3c2");

        /** ROW 4*/
        jQuery("#r4").css("display","block");
        jQuery("#r4").css("border-top","none");
        jQuery("#elem14-"+selectRange).appendTo("#r4c2");
        jQuery("#elem16-"+selectRange).appendTo("#r4c1").removeClass("home-div2").addClass("home-div");

        /** ROW 5*/
        jQuery("#elem17-"+selectRange).appendTo("#r5c2").removeClass("home-div2").addClass("home-div");
        jQuery("#elem18-"+selectRange).appendTo("#r5c1");
        jQuery("#elem19-"+selectRange).appendTo("#r5c1").removeClass("home-div").addClass("home-div2");
        jQuery("#elem20-"+selectRange).appendTo("#r5c1");
        jQuery("#elem21-"+selectRange).appendTo("#r5c2").removeClass("home-div2").addClass("home-div");
        jQuery("#elem22-"+selectRange).appendTo("#r5c2");
        jQuery("#elem23-"+selectRange).appendTo("#r5c1");
        jQuery("#elem24-"+selectRange).appendTo("#r5c2").css("display","block");

    } else {
        jQuery(".home-div-content").css("width","20%");
        jQuery(".home-div-content2").css("width","40%");

        /** ROW 1*/
        jQuery("#elem1-"+selectRange).appendTo("#r1c1");
        jQuery("#elem2-"+selectRange).appendTo("#r1c1");
        jQuery("#elem3-"+selectRange).appendTo("#r1c2");
        jQuery("#elem4-"+selectRange).appendTo("#r1c3");
        jQuery("#elem5-"+selectRange).appendTo("#r1c4");
        jQuery("#elem6-"+selectRange).appendTo("#r1c3");
        jQuery("#elem7-"+selectRange).appendTo("#r1c4");

        /** ROW 2*/
        jQuery("#elem8-"+selectRange).appendTo("#r2c1");
        jQuery("#elem9-"+selectRange).appendTo("#r2c2");
        jQuery("#elem10-"+selectRange).appendTo("#r2c3");
        jQuery("#elem11-"+selectRange).appendTo("#r2c4");

        /** ROW 3*/
        jQuery("#elem12-"+selectRange).appendTo("#r3c1");
        jQuery("#elem13-"+selectRange).appendTo("#r3c2");
        jQuery("#elem14-"+selectRange).appendTo("#r3c3");
        jQuery("#elem15-"+selectRange).appendTo("#r3c2");
        jQuery("#elem16-"+selectRange).appendTo("#r3c3");
        jQuery("#elem17-"+selectRange).appendTo("#r3c3");

        /** ROW 4*/
        jQuery("#r4").css("display","none");

        /** ROW 5*/
        jQuery("#elem18-"+selectRange).appendTo("#r5c1");
        jQuery("#elem19-"+selectRange).appendTo("#r5c2");
        jQuery("#elem20-"+selectRange).appendTo("#r5c1");
        jQuery("#elem21-"+selectRange).appendTo("#r5c1");
        jQuery("#elem22-"+selectRange).appendTo("#r5c2");
        jQuery("#elem23-"+selectRange).appendTo("#r5c3");
        jQuery("#elem24-"+selectRange).css("display","none");
    }

    jQuery('.row-home > div > div').each(function(index){
        if (!found) {
            firstElem = this;
            found = true;
        }
        var rect = jQuery(this)[0].getBoundingClientRect();
        var w;
        if (rect.width) {
            // `width` is available for IE9+
            w = rect.width;
        } else {
            // Calculate width for IE8 and below
            w = rect.right - rect.left;
        }
        var h;
        if (jQuery(this).hasClass("cube")) {
            h = w;
        } else if (jQuery(this).hasClass("rectangule")){
            h = w/2;
        }
        var id = jQuery(this).attr('id');
        jQuery(this).css({'height':h+'px'});
    });
	
	/*
    jQuery('.row-home > div > div')
        .hover(function(){
            var element = jQuery(this);
            setTimeoutConst = setTimeout(function(){
                var overlay = element.find('.overlay').first();
                overlay.fadeIn();
                var content = element.find('.home-div__overlay__content').first();
                content.slideDown(500);
            },delay);
        }, function(){
            clearTimeout(setTimeoutConst);
        });
    jQuery('.row-home > div > div')
        .mouseleave(function(){
            jQuery(this).find('.overlay').first().fadeOut();
            var content = jQuery(this).find('.home-div__overlay__content').first();
            content.slideDown(200);
        });
	*/
});

/** Tambe cal modificar el resize al fitxer header.phtml per quan s'obre el menu*/
jQuery(window).resize(function(){
    jQuery('.row-home > div > div').removeClass('first-column');
    jQuery('.row-home > div > div').removeClass('last-column');
    var ww = jQuery(window).width();
    if (ww < 1200) {
        jQuery(".home-div-content").css("width","33.33333%");
        jQuery(".home-div-content2").css("width","66.66666%");

        /** ROW 1*/
        jQuery("#elem1-"+selectRange).appendTo("#r1c1");
        jQuery("#elem2-"+selectRange).appendTo("#r1c1");
        jQuery("#elem3-"+selectRange).appendTo("#r1c2");
        jQuery("#elem4-"+selectRange).appendTo("#r1c1");
        jQuery("#elem5-"+selectRange).appendTo("#r1c2").removeClass("home-div").addClass("home-div2");
        jQuery("#elem6-"+selectRange).appendTo("#r1c2").removeClass("home-div").addClass("home-div2");

        /** ROW 2*/
        jQuery("#elem7-"+selectRange).appendTo("#r2c3").removeClass("home-div").addClass("home-div2");
        jQuery("#elem8-"+selectRange).appendTo("#r2c3").removeClass("home-div").addClass("home-div2");
        jQuery("#elem9-"+selectRange).appendTo("#r2c4");
        jQuery("#elem10-"+selectRange).appendTo("#r2c3");
        jQuery("#elem11-"+selectRange).appendTo("#r2c4");

        /** ROW 3*/
        jQuery("#elem12-"+selectRange).appendTo("#r3c1");
        jQuery("#elem13-"+selectRange).appendTo("#r3c2");
        jQuery("#elem15-"+selectRange).appendTo("#r3c2");

        /** ROW 4*/
        jQuery("#r4").css("display","block");
        jQuery("#r4").css("border-top","none");
        jQuery("#elem14-"+selectRange).appendTo("#r4c2");
        jQuery("#elem16-"+selectRange).appendTo("#r4c1").removeClass("home-div2").addClass("home-div");

        /** ROW 5*/
        jQuery("#elem17-"+selectRange).appendTo("#r5c2").removeClass("home-div2").addClass("home-div");
        jQuery("#elem18-"+selectRange).appendTo("#r5c1");
        jQuery("#elem19-"+selectRange).appendTo("#r5c1").removeClass("home-div").addClass("home-div2");
        jQuery("#elem20-"+selectRange).appendTo("#r5c1");
        jQuery("#elem21-"+selectRange).appendTo("#r5c2").removeClass("home-div2").addClass("home-div");
        jQuery("#elem22-"+selectRange).appendTo("#r5c2");
        jQuery("#elem23-"+selectRange).appendTo("#r5c1");
        jQuery("#elem24-"+selectRange).appendTo("#r5c2").css("display","block");
    } else {
        jQuery(".home-div-content").css("width","20%");
        jQuery(".home-div-content2").css("width","40%");

        /** ROW 1*/
        jQuery("#elem1-"+selectRange).appendTo("#r1c1");
        jQuery("#elem2-"+selectRange).appendTo("#r1c1");
        jQuery("#elem3-"+selectRange).appendTo("#r1c2");
        jQuery("#elem4-"+selectRange).appendTo("#r1c3");
        jQuery("#elem5-"+selectRange).appendTo("#r1c4").removeClass("home-div2").addClass("home-div");
        jQuery("#elem6-"+selectRange).appendTo("#r1c3").removeClass("home-div2").addClass("home-div");
        jQuery("#elem7-"+selectRange).appendTo("#r1c4").removeClass("home-div2").addClass("home-div");

        /** ROW 2*/
        jQuery("#elem8-"+selectRange).appendTo("#r2c1").removeClass("home-div2").addClass("home-div");
        jQuery("#elem9-"+selectRange).appendTo("#r2c2");
        jQuery("#elem10-"+selectRange).appendTo("#r2c3");
        jQuery("#elem11-"+selectRange).appendTo("#r2c4");

        /** ROW 3*/
        jQuery("#elem12-"+selectRange).appendTo("#r3c1");
        jQuery("#elem13-"+selectRange).appendTo("#r3c2");
        jQuery("#elem14-"+selectRange).appendTo("#r3c3");
        jQuery("#elem15-"+selectRange).appendTo("#r3c2");
        jQuery("#elem16-"+selectRange).appendTo("#r3c3").removeClass("home-div").addClass("home-div2");
        jQuery("#elem17-"+selectRange).appendTo("#r3c3").removeClass("home-div").addClass("home-div2");

        /** ROW 4*/
        jQuery("#r4").css("display","none");

        /** ROW 5*/
        jQuery("#elem18-"+selectRange).appendTo("#r5c1");
        jQuery("#elem19-"+selectRange).appendTo("#r5c2").removeClass("home-div2").addClass("home-div");
        jQuery("#elem20-"+selectRange).appendTo("#r5c1");
        jQuery("#elem21-"+selectRange).appendTo("#r5c1").removeClass("home-div").addClass("home-div2");
        jQuery("#elem22-"+selectRange).appendTo("#r5c2");
        jQuery("#elem23-"+selectRange).appendTo("#r5c3");
        jQuery("#elem24-"+selectRange).css("display","none");
    }

    jQuery('.row-home > div > div').each(function(index){
        var rect = jQuery(this)[0].getBoundingClientRect();
        var w;
        if (rect.width) {
            // `width` is available for IE9+
            w = rect.width;
        } else {
            // Calculate width for IE8 and below
            w = rect.right - rect.left;
        }
        var h;
        if (jQuery(this).hasClass("cube")) {
            h = w;
        } else if (jQuery(this).hasClass("rectangule")){
            h = w/2;
        }
        var id = jQuery(this).attr('id');
        jQuery(this).css({'height':h+'px'});
    });
});

/* NEW HOME*/
var relatedCarouselSettings = {
    width: '100%',
    auto: false,
    circular: false,
    direction: "right",
    infinite: false,
    prev: "#prevRelatedDialog",
    next: "#nextRelatedDialog",
    swipe: true
};

var listBlocksData = {};
var pGridItemW = 0;

function calculateListBlocks() {
    jQuery('.category-products .prod-list-container .products-grid').each(function () {
        var pGrid = jQuery(this);
        if (!(pGrid.data('categ-id') in listBlocksData)) {
            listBlocksData[pGrid.data('categ-id')] = {};
            listBlocksData[pGrid.data('categ-id')]['currentCollectionPage'] = 1;
            listBlocksData[pGrid.data('categ-id')]['loading'] = false;
        }
        if (!responsiveMode) {
            var items = 6;
            if (pGrid.hasClass('has-banner')) {
                items = 5;
            }
            listBlocksData[pGrid.data('categ-id')]['itemsPerPage'] = items;
            listBlocksData[pGrid.data('categ-id')]['totalItems'] = pGrid.data('total-items');
            pGrid.find('.item.box-item').css('width','');
            pGrid.owlCarousel({
                items: items,
                margin: 10,
                loop: false,
                autoplay:false,
                nav: true,
                navText: ['',''],
                slideBy: items,
                stagePadding: 1,
                onTranslated: loadNextPageByAjax,
                onTranslate: checkIfShowLoadingOverlay,
                onInitialized: checkIfFirstSpecialAjaxLoadHome
            });
        } else {
            pGrid.trigger('destroy.owl.carousel').removeClass('owl-loaded');
            pGrid.find('.owl-stage-outer').children().unwrap();
            var innerW = window.innerWidth;
            if (innerW > 799) {
                pGridItemW = 210;
            } else if (innerW > 319 && innerW <= 360) {
                pGridItemW = 140;
            } else {
                pGridItemW = 160;
            }
            pGrid.find('.item.box-item').css('width',pGridItemW);
            pGrid.removeClass('needs-first-ajax');
        }
    });
}

function checkIfShowLoadingOverlay(e) {
    var currentCategory = e.currentTarget.attributes['data-categ-id'].value;
    var curGrid = jQuery('.category-products .prod-list-container .products-grid.categ-'+currentCategory);
    if (((e.page.index+1) == e.page.count) && listBlocksData[currentCategory]['loading']) {
        curGrid.siblings('.ajax-load-overlay').show();
    }
}

function loadNextPageByAjax(e) {
    var currentCategory = e.currentTarget.attributes['data-categ-id'].value;
    var currentLimit = e.currentTarget.attributes['data-limit'].value;
    var curGrid = jQuery('.category-products .prod-list-container .products-grid.categ-'+currentCategory);
    if ((e.page.index+1) >= (e.page.count-1)) {
        if (e.page.count*listBlocksData[currentCategory]['itemsPerPage'] < listBlocksData[currentCategory]['totalItems']) {
            if (!listBlocksData[currentCategory]['loading']) {
                var ajaxData = {
                    categoryId: currentCategory,
                    limit: currentLimit,
                    page: listBlocksData[currentCategory]['currentCollectionPage'],
                    isResponsive: false
                };
                jQuery.ajax({
                    url: loadProductListUrl,
                    data: ajaxData,
                    dataType: 'json',
                    method: "POST",
                    beforeSend: function () {
                        listBlocksData[currentCategory]['loading'] = true;
                        if ((e.page.index+1) == e.page.count) {
                            curGrid.siblings('.ajax-load-overlay').show();
                        }
                    },
                    success:function(response) {
                        if (!response.error) {
                            listBlocksData[currentCategory]['currentCollectionPage'] = response.page;
                            jQuery.each(response.items, function(index, elem){
                                curGrid.trigger('add.owl.carousel', elem);
                            });
                            curGrid.trigger('refresh.owl.carousel');
                        } else {
                            console.log(response.error);
                        }
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log("There was an error in the ajax call: ["+xhr.status+"] ["+thrownError+"]");
                    },
                    complete: function() {
                        listBlocksData[currentCategory]['loading'] = false;
                        curGrid.siblings('.ajax-load-overlay').hide();
                    }
                });
            }
        }
    }
}

var homeCarouselData = {};
function checkIfShowLoadingOverlayHomeCarousel(e) {
    var currentRow = e.currentTarget.attributes['data-row'].value;
    var curCarousel = jQuery('.home-carousel.row-'+currentRow);
    if (((e.page.index+1) == e.page.count) && homeCarouselData[currentRow]['loading']) {
        curCarousel.siblings('.ajax-load-overlay').show();
    }
}

function loadNextHomeCarouselPageByAjax(e) {
    var currentRow = e.currentTarget.attributes['data-row'].value;
    var currentLimit = e.currentTarget.attributes['data-limit'].value;
    var currentTypology = e.currentTarget.attributes['data-typology'].value;
    var currentInitialItems = e.currentTarget.attributes['data-initial-items'].value;
    var curCarousel = jQuery('.home-carousel.row-'+currentRow);
    if ((e.page.index+1) >= (e.page.count-1)) {
        if (e.page.count*e.relatedTarget.settings.items < homeCarouselData[currentRow]['totalItems']) {
            if (!homeCarouselData[currentRow]['loading']) {
                var ajaxData = {
                    row: currentRow,
                    limit: currentLimit,
                    page: homeCarouselData[currentRow]['currentCollectionPage'],
                    typology: currentTypology,
                    initialItems: currentInitialItems,
                };
                jQuery.ajax({
                    url: loadHomeCarouselUrl,
                    data: ajaxData,
                    dataType: 'json',
                    method: "POST",
                    beforeSend: function () {
                        homeCarouselData[currentRow]['loading'] = true;
                        if ((e.page.index+1) == e.page.count) {
                            curCarousel.siblings('.ajax-load-overlay').show();
                        }
                    },
                    success:function(response) {
                        if (!response.error) {
                            homeCarouselData[currentRow]['currentCollectionPage'] = response.page;
                            jQuery.each(response.items, function(index, elem){
                                curCarousel.trigger('add.owl.carousel', elem);
                            });
                            curCarousel.trigger('refresh.owl.carousel');
                        } else {
                            console.log(response.error);
                        }
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log("There was an error in the ajax call: ["+xhr.status+"] ["+thrownError+"]");
                    },
                    complete: function() {
                        homeCarouselData[currentRow]['loading'] = false;
                        curCarousel.siblings('.ajax-load-overlay').hide();
                    }
                });
            }
        }
    }
}

jQuery('.home-container .category-products .prod-list-container .grid-container .products-grid').on('scroll', function(){
    var curGrid = jQuery(this);
    var currentCategory = curGrid.data('categ-id');
    var loadedItems = curGrid.children().length;
    var totalWidth = pGridItemW * loadedItems;
    var scrollPercentage = 100 * curGrid.scrollLeft() / (totalWidth - curGrid.width());
    if (scrollPercentage >= 80 && loadedItems < curGrid.data('total-items') && !listBlocksData[currentCategory]['loading']) {
        var ajaxData = {
            categoryId: currentCategory,
            limit: curGrid.data('limit'),
            page: listBlocksData[currentCategory]['currentCollectionPage'],
            isResponsive: true,
            itemWidth: pGridItemW
        };
        jQuery.ajax({
            url: loadProductListUrl,
            data: ajaxData,
            dataType: 'json',
            method: "POST",
            beforeSend: function () {
                if (scrollPercentage > 95) {
                    curGrid.siblings('.ajax-load-overlay').show();
                }
                listBlocksData[currentCategory]['loading'] = true;
            },
            success:function(response) {
                if (!response.error) {
                    listBlocksData[currentCategory]['currentCollectionPage'] = response.page;
                    var newGridElements = '';
                    jQuery.each(response.items, function(index, elem){
                        newGridElements += elem;
                    });
                    curGrid.append(newGridElements);
                } else {
                    console.log(response.error);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("There was an error in the ajax call: ["+xhr.status+"] ["+thrownError+"]");
            },
            complete: function() {
                curGrid.siblings('.ajax-load-overlay').hide();
                listBlocksData[currentCategory]['loading'] = false;
            }
        });
    } else if (scrollPercentage > 95 && listBlocksData[currentCategory]['loading']) {
        curGrid.siblings('.ajax-load-overlay').show();
    }
});

function calculateOwlPosition(owl,jump) {
    var totalItems = owl.find('.owl-item').not('.cloned').length;
    var current = 0;
    owl.find('.owl-item').each(function(index,elem) {
        if (jQuery(elem).hasClass('active')) {
            current = jQuery(elem).find('.carousel-container').data('index');
            return false;
        }
    });
    var goTo = current+jump;
    if (goTo < 0) {
        goTo += totalItems;
    }
    if (goTo > totalItems-1) {
        goTo -= totalItems;
    }
    return goTo;
}

function checkIfFirstSpecialAjaxLoadHome(e) {
    var carouselLimit = parseInt(e.currentTarget.attributes['data-limit'].value);
    if ((carouselLimit < parseInt(e.currentTarget.attributes['data-total-items'].value)) && (carouselLimit === parseInt(e.page['size']))) {
        var currentCategory = e.currentTarget.attributes['data-categ-id'].value;
        var curGrid = jQuery('.category-products .prod-list-container .grid-container .products-grid.categ-'+currentCategory);
        curGrid.addClass('needs-first-ajax');
    }
}

jQuery('.main-container .home-columns .col-main').on('click', '.category-products .prod-list-container .grid-container .owl-carousel.owl-theme-product-carousel.needs-first-ajax .owl-nav > div.owl-next', function(){
    var curGrid = jQuery(this).closest('.products-grid');
    var currentCategory = curGrid.data('categ-id');
    var currentLimit = curGrid.data('limit');
    var ajaxData = {
        categoryId: currentCategory,
        limit: currentLimit,
        page: listBlocksData[currentCategory]['currentCollectionPage'],
        isResponsive: false
    };
    jQuery.ajax({
        url: loadProductListUrl,
        data: ajaxData,
        dataType: 'json',
        method: "POST",
        beforeSend: function () {
            listBlocksData[currentCategory]['loading'] = true;
            curGrid.siblings('.ajax-load-overlay').show();
        },
        success:function(response) {
            if (!response.error) {
                listBlocksData[currentCategory]['currentCollectionPage'] = response.page;
                jQuery.each(response.items, function(index, elem){
                    curGrid.trigger('add.owl.carousel', elem);
                });
                curGrid.trigger('refresh.owl.carousel');
                curGrid.removeClass('needs-first-ajax');
                curGrid.trigger('next.owl.carousel');
            } else {
                console.log(response.error);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("There was an error in the ajax call: ["+xhr.status+"] ["+thrownError+"]");
        },
        complete: function() {
            listBlocksData[currentCategory]['loading'] = false;
            curGrid.siblings('.ajax-load-overlay').hide();
        }
    });
});

jQuery(window).resize(function(){
    calculateListBlocks();
});

jQuery('.home-carousel').each(function () {
    var pGrid = jQuery(this);
    if (!(pGrid.data('row') in homeCarouselData)) {
        homeCarouselData[pGrid.data('row')] = {};
        homeCarouselData[pGrid.data('row')]['currentCollectionPage'] = 1;
        homeCarouselData[pGrid.data('row')]['loading'] = false;
        homeCarouselData[pGrid.data('row')]['totalItems'] = pGrid.data('total-items');
    }
    pGrid.owlCarousel({
        loop: false,
        // autoplay:true,
        autoplayTimeout: 6500,
        autoplaySpeed: 500,
        margin: 10,
        nav: true,
        navText: ['',''],
        onTranslated: loadNextHomeCarouselPageByAjax,
        onTranslate: checkIfShowLoadingOverlayHomeCarousel,
        responsive: {
            0: { // original
                slideBy: 1,
                items: 1
            },
            768: { // window >= 768px
                slideBy: 2,
                items: 2
            },
            1024: { // window >= 1024px
                slideBy: 3,
                items: 3
            }
        }
    });
});

calculateListBlocks();

jQuery('.main-container a').click(function(){
    jQuery('.main-container .overlay-loading').show();
});


/* Safari - que la back-forward cache no deixi el dialog obert */
jQuery(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload();
    }
});