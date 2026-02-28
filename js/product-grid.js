var afterFilter = false;
var totalListItems = 0;

//Check if the param "scrollTo" is in the hash to scroll to that product
var target = window.location.hash;
target = target.replace('#', '');
var scrollToProduct = false;
var scrollToProductArray = target.split("-");
if (scrollToProductArray.length == 2 && scrollToProductArray[0] == 'scrollTo') {
    scrollToProduct = scrollToProductArray[1];
}

function reloadDescription(){
    checkIfResponsive();
	// Si hay filtro aplicado y hay mensaje de no hay productos => no mostramos descripción
	if(jQuery('.filter-info-container .del-filters').length > 0 && jQuery('.amshopby-page-container .message-container').length > 0){
		var html = "";
		var html_title;
		if (jQuery('body').hasClass('catalogsearch-result-index')) {
			html_title = jQuery('.page-title .description-title:first')
		} else {
			html_title = jQuery('#filter-top-block .description-title:first')
		}		
	// Sino mostramos la descripción y el title
	} else {
		var html = jQuery('#filter-top-block .header-grid');
		var html_title;
		if (jQuery('body').hasClass('catalogsearch-result-index')) {
			html_title = jQuery('.page-title .description-title')
		} else {
			html_title = jQuery('#filter-top-block .description-title')
		}		
	}

    if (jQuery(window).width() <= 1024) {
        jQuery('.description-title').remove();
        jQuery('.header-grid').remove();
        jQuery('.toolbar').before(html_title);
        jQuery('.toolbar').before(html);
    } else {
        jQuery('.toolbar .description-title').remove();
        jQuery('.toolbar .header-grid').remove();
        jQuery('.toolbar .sorter').before(html_title);
        jQuery('.description-title').after(html);
    }
}

function fixFooterBottom() {
    jQuery('footer').css('margin-top','');
    var pageDiff = jQuery('.wrapper').height()-jQuery('.page').height();
    if (pageDiff > 0) {
        jQuery('footer').css('margin-top',pageDiff);
    }
}

function loadDocument(descriptionRestart) {
    /*Descripció categoria*/
    afterFilter = descriptionRestart;
    checkIfResponsive();
    if(descriptionRestart){
        jQuery('.extra-description').addClass('just-hide');
        reloadDescription();
    }
    /*Display dels elements*/
    jQuery('.category-products .img-bot-icons').css('display','table');
    jQuery('.category-products .img-top-left-icons').show();
    jQuery('.category-products .img-top-icons').show();
    // jQuery('#grid').removeAttr('class').addClass('products-grid');
    var gridItems = jQuery('.number_products_filter').attr('id');
    if(gridItems == undefined){gridItems = 0}
    totalListItems = jQuery('.grid-total-count').html();

    var barWidth = gridItems*100/totalListItems;
    jQuery('.products-count-bar').width(barWidth+'%');

    if (jQuery('.offset-top').length) {
        fixmeTop = jQuery('.offset-top').offset().top;
    }
    balanceScrollFilterColumn();
    calculateNewFilterPosition();
	moveFilters(currentScrollFilters);
    //jQuery('#filter-top-block').css('top',currentScrollFilters);
    //Hover
    hoverDesktopGrid();
    hoverMobileGrid();
    fixFooterBottom();
}

function inUseFilters(){
    return afterFilter;
}

function showFilters() {
    var sorter = jQuery('.toolbar-sorter');
    sorter.removeClass("opened");
    // sorter.children('.sort-by .filter-options').css('visibility','hidden');
    jQuery('.amshopby-filters-top').show();
    jQuery('body').css('overflow-y','hidden');
}

function setContainerInfo() {
    var countHtml = jQuery('.filter-info-container .products-count').html();
    jQuery('.filter-info-container-responsive .products-count').html('('+countHtml+')');
}

function setRange(min, max){
    var prefix = 'amshopby-price';
    var a = prefix + '-from';
    var b = prefix + '-to';
    var sliderMin = jQuery('#amshopby-price-responsive').data('min');
    var sliderMax = jQuery('#amshopby-price-responsive').data('max');

    var url =  jQuery('#' + prefix + '-url').val().replace(a, min).replace(b, max);
    if (min == sliderMin && max == sliderMax) {
        if (location.pathname.indexOf('catalogsearch') != -1) {
            url = url.replace(/&?price=([^&]$|[^&]*)/i, "");
        } else {
            if (location.pathname.indexOf('price') != -1) {
                //Si al amasty esta configurada la URL com "Long with URL key"
                if (filterType == 1) {
                    var urlArray = url.split("/");
                    var filtersStarts = -1;
                    var pricePosition = -1;
                    urlArray.forEach(function(currentValue, index){
                        //filterSeoKey esta assignat al list.phtml agafant el camp "Clave URL" de la config. de l'Amasty
                        if (currentValue == filterSeoKey) filtersStarts = index;
                        if (currentValue.indexOf('price') != -1) {
                            pricePosition = index;
                        }
                    });
                    urlArray.splice(pricePosition,1);
                    if (urlArray.length == filtersStarts+1) urlArray.splice(filtersStarts,1);
                    url = urlArray.join("/");
                //Si al amasty esta configurada la URL com "Short without URL key"
                } else if (filterType == 2) {
                    var urlArray = url.split("-");
                    var pricePosition = -1;
                    urlArray.forEach(function(currentValue, index){
                        //filterSeoKey esta assignat al list.phtml agafant el camp "Clave URL" de la config. de l'Amasty
                        if (currentValue.indexOf('price') != -1) {
                            pricePosition = index;
                        }
                     });
                    if (urlArray[pricePosition] == "price") {
                        urlArray.splice(pricePosition,3);
                        url = urlArray.join("-");
                    } else {
                        //Quan es el primer element filtrat que es troba a la URL fem un tractament especial
                        urlArray.splice(pricePosition+1,2);
                        var priceItemSplice = urlArray[pricePosition];
                        urlArray[pricePosition] = priceItemSplice.replace("price","");
                        url = urlArray.join("-");
                        if (url.substr(url.length-1) == "/") {
                            url = url.slice(0,-1);
                        }
                    }
                }
            }
        }
    }
    if(responsiveMode){
        jQuery('#filters-container .filter-content.price-column').addClass('filtering');
    }else{
        jQuery(".overlay-loading").show();
    }
    
    if (typeof amshopby_working != 'undefined' && !amshopby_ajax_fallback_mode()) {
        amshopby_ajax_push_state(url);
        return amshopby_ajax_request(url);
    }
    return setLocation(url);
}

function getUrlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return results[1];
    } else {
        return -1;
    }
}

function getUrlRange(){
    if (location.pathname.indexOf('catalogsearch') != -1) {
        var existPriceFilter = getUrlParam('price');
        if (existPriceFilter != -1) {
            var values = existPriceFilter.split('-');
            if(values.length == 2){
                return values;
            }
        }
    } else {
        if(location.pathname.indexOf('price') != -1){
            var index = location.pathname.lastIndexOf('price');
            if(index != -1){
                if(responsiveMode){
                    jQuery('.filter-content.price-column').addClass('opened');
                }
                index += 'price-'.length;
                var range = (location.pathname.substr(index, location.pathname.length));
                var values = range.split('-');
                if(values.length == 2){
                    return values;
                }
            }
        }
    }
    return null;
}

function hoverDesktopGrid(){
    checkIfResponsive();
    if(!responsiveMode) {
        jQuery('.manage-hover-container .manage-hover-box').click(function(e) {
            e.preventDefault();
        });

        jQuery('.manage-hover-container .manage-hover-box').mouseover(function () {
            jQuery(this).parent().find('img').removeClass('active-image');
            var imgHover = jQuery(this).find('img')
            imgHover.addClass('active-image');
            if (imgHover.hasClass('default-image')) {
                jQuery(this).parent().parent().find('.hover-img-grid').hide();
                jQuery(this).parent().parent().find('.img-grid').show();
            } else {
                jQuery(this).parent().parent().find('.img-grid').hide();
                jQuery(this).parent().parent().find('.hover-img-grid').show();
            }
        });
    }
}

function hoverMobileGrid(){
    checkIfResponsive();
    if(responsiveMode) {
        jQuery('.manage-hover-container .manage-hover-box').click(function(e) {
            e.preventDefault();
            jQuery(this).parent().find('img').removeClass('active-image');
            var imgHover = jQuery(this).find('img')
            imgHover.addClass('active-image');
            if (imgHover.hasClass('default-image')) {
                jQuery(this).parent().parent().find('.hover-img-grid').hide();
                jQuery(this).parent().parent().find('.img-grid').show();
            } else {
                jQuery(this).parent().parent().find('.img-grid').hide();
                jQuery(this).parent().parent().find('.hover-img-grid').show();
            }
        });
        jQuery('.products-grid.swipeable .container-product .product-image').swipe({fingers:'all', swipeLeft:swipeL, swipeRight:swipeR, allowPageScroll:"vertical"});
    }
}

//Swipe handlers.
function swipeL(event, direction, distance, duration, fingerCount) {
//    $(this).text( "You have swiped " + direction +' with ' + fingerCount +' fingers' );
    jQuery(this).parent().parent().find('.default-image').removeClass('active-image');
    jQuery(this).parent().parent().find('.hover-image').addClass('active-image');
    jQuery(this).parent().find('.img-grid').hide();
    jQuery(this).parent().find('.hover-img-grid').show();
}

function swipeR(event, phase, direction, distance) {
    jQuery(this).parent().parent().find('.hover-image').removeClass('active-image');
    jQuery(this).parent().parent().find('.default-image').addClass('active-image');
    jQuery(this).find('.hover-img-grid').hide();
    jQuery(this).find('.img-grid').show();
//    $(this).text( phase +" you have swiped " + distance + "px in direction:" + direction );
}

var buttonMore = 'mas';
function changeStateButton(buttonObject){
    if(!buttonObject.hasClass('disabled')){
        jQuery('.extra-description').toggleClass('visibility');
        if(buttonObject.hasClass('read-more')){
            buttonObject.html('mostrar menos');
        }else if(buttonObject.hasClass('read-less')){
            buttonObject.html('mostrar más');
        }
        buttonObject.toggleClass('read-more');
        buttonObject.toggleClass('read-less');
    }
}

function changeStateButton_old(buttonObject, src_img){
	if(buttonMore == 'mas')
	{
		buttonMore = 'menos';
	}
	else
	{
		buttonMore = 'mas';
	}
	jQuery('#more-view-img-src').attr('src',src_img +'flecha-'+ buttonMore +'-gris.png');
    if(!buttonObject.hasClass('disabled')){
        jQuery('.extra-description').toggleClass('visibility');
        if(buttonObject.hasClass('read-more')){
            updateGrid(true,0,true);
            buttonObject.html('mostrar menos');
        }else if(buttonObject.hasClass('read-less')){
            updateGrid(true,0,false);
            buttonObject.html('mostrar más');
        }
        buttonObject.toggleClass('read-more');
        buttonObject.toggleClass('read-less');
    }
}

var baseColumnPosFilters = 0; //Posició on començen els filtres a dalt de tot
var lastScrollTopFilters = 0;
var needScrollFilters;
var currentScrollFilters = 0; // Posició absoluta de la capsa de filtres (s'ha de sumar el header, marquee i tot el que sigui un marge superior)

function filtersColumnNeedScroll() {
    var totalHeight = jQuery(window).height() - jQuery('.breadcrumbs').innerHeight() - jQuery('.header-language-container').innerHeight() - jQuery('.mainMarqueze').innerHeight(); // Alçada que es mostra al window respecte la capsa dels filtrats (sense header, marquee, etc.)
    var contentHeight = jQuery('#filter-top-block .block-content').height(); // Alçada total del container de filtres
    return (contentHeight > totalHeight);
}

function balanceScrollFilterColumn() {
    // checkIfResponsive();
    if (jQuery(window).width() > 1024){
        //Fem una finestra suficientment gran per a que hi capiguen els filtrats
        jQuery('.amshopby-page-container').css('height','');
        var filtersHeight = jQuery('#filter-top-block .block-content').height();
        var contentHeight = jQuery('.toolbar').height() + jQuery('.amshopby-page-container').height();
        var diffHeight = filtersHeight-contentHeight;
        if (diffHeight > 0) {
            jQuery('.amshopby-page-container').css('height',jQuery('.amshopby-page-container').height()+diffHeight);
        }
    }
}

function moveFilters(topPX){
	//jQuery('#filter-top-block').animate({ top: topPX, }, 500);
}

function calculateNewFilterPosition() {
    if (!responsiveMode) {
        var st = jQuery(this).scrollTop(); //scroll actual de tota la pàgina
        var windowHeight = jQuery(window).height();
        var filtersHeight = jQuery('#filter-top-block .block-content').height();
        var headerHeight = jQuery('.breadcrumbs').innerHeight() + jQuery('.header-language-container').innerHeight() + jQuery('.mainMarqueze').innerHeight();
        var gridContent = jQuery('.amshopby-page-container').height() + jQuery('.toolbar').height();
        var filtersBottomPos = currentScrollFilters+filtersHeight+headerHeight;
        var aux = st+windowHeight;
        if (filtersBottomPos<aux) { // Si el final de la capsa dels filtrats es troba al final de la finestra
            var aux2 = headerHeight+gridContent;
            if (filtersBottomPos >= aux2) { // En el cas de sobrepasar el footer hem d'aturar el scroll
                currentScrollFilters = aux2-filtersHeight-headerHeight;
                //jQuery('#filter-top-block').css('top',currentScrollFilters);
				moveFilters(currentScrollFilters)
            }
        }
    }
}

function recalculateFilterScroll() {
    needScrollFilters = filtersColumnNeedScroll();
    var st = jQuery(this).scrollTop();
    if (st > lastScrollTopFilters){
        // downscroll code
        var windowHeight = jQuery(window).height();
        var filtersHeight = jQuery('#filter-top-block .block-content').height();
        var headerHeight = jQuery('.breadcrumbs').innerHeight() + jQuery('.header-language-container').innerHeight() + jQuery('.mainMarqueze').innerHeight();
        var gridContent = jQuery('.amshopby-page-container').height() + jQuery('.toolbar').height();
        var filtersBottomPos = currentScrollFilters+filtersHeight+headerHeight;
        var aux = st+windowHeight;
        if (filtersBottomPos<aux) { // Si el final de la capsa dels filtrats es troba al final de la finestra
            var aux2 = headerHeight+gridContent;
            if (filtersBottomPos >= aux2) { // En el cas de sobrepasar el footer hem d'aturar el scroll
                currentScrollFilters = aux2-filtersHeight-headerHeight;
            } else {
                currentScrollFilters = currentScrollFilters+st-lastScrollTopFilters;
            }
        }
    } else if (st < lastScrollTopFilters) {
        // upscroll code
        var scrollDiff = st-currentScrollFilters;
        if (scrollDiff < 0) currentScrollFilters += scrollDiff;
    }
	moveFilters(currentScrollFilters);
    //jQuery('#filter-top-block').css('top',currentScrollFilters);

    lastScrollTopFilters = st;
}

function elementsPerRow() {
    var distanceGridToTop = jQuery('.products-grid').offset().top;
    var elementsXRow = 0;
    jQuery('.products-grid li').each(function(){
        var distanceElemToTop = jQuery(this).offset().top;
        if (distanceElemToTop <= distanceGridToTop) {
            elementsXRow++;
            return true; // continue;
        } else {
            return false; // break;
        }
    });
    return elementsXRow;
}

function moveOrderButton() {
    if (jQuery('.products-grid').length) {
        var elementsXRow = elementsPerRow();
        var elementsWidth = jQuery('.products-grid li').width()+10;
        jQuery('.sorter').css('width',(elementsWidth*elementsXRow)-5);
    }
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];6
        }
    }
    return false;
}

var afterLoad = false;
jQuery(window).load(function() {
    jQuery('.catalog-category-view .overlay').click(function(){
        if(!jQuery('.amshopby-filters-left').is(':animated')){
            if(jQuery('.hidden-menu').hasClass('show')){
                close_menu();
            }
        }
    });
    var body_height = jQuery('body').height();
    var width_scroll = scrollbarWidth();
    var width_window = jQuery(window).width() + width_scroll;
    if(width_window <= 922){
        var aux = body_height - 55;
        aux = aux - 50;  // treiem els 50 px de margin que ocupa el header de la vista del producte
        jQuery('#filter-top-block').height(aux);
    }
    currentScrollFilters = baseColumnPosFilters;
    needScrollFilters = filtersColumnNeedScroll();
    balanceScrollFilterColumn();
    recalculateFilterScroll();
    afterLoad = true;
    moveOrderButton();
});

var fixmeTop;
jQuery(document).ready(function() {
    if (jQuery('.offset-top').length) {
        fixmeTop = jQuery('.offset-top').offset().top;
    }
    checkIfResponsive();
    var html = jQuery('#filter-top-block .header-grid');
    var html_title;
    if (jQuery('body').hasClass('catalogsearch-result-index')) {
        html_title = jQuery('.page-title .description-title')
    } else {
        html_title = jQuery('#filter-top-block .description-title')
    }
    if (jQuery(window).width() <= 1024) {
        jQuery('.toolbar').before(html_title);
        jQuery('.toolbar').before(html);
    } else {
        jQuery('.toolbar .sorter').before(html_title);
        jQuery('.toolbar .description-title').after(html);
    }
    setContainerInfo();
    if(responsiveMode){
        if(inUseFilters()){
            showFilters();
            var opened = jQuery('.filter-content.opened').removeClass('opened');
            jQuery('.filter-title',opened).trigger('click');
        }
    }

    jQuery('.backdrop#product-info .dialog .dialog-content').on('mouseover', '.related-products .related-carousel-container .related-carousel a', function(){
        if (!responsiveMode) {
            //Replace img
            jQuery('.backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image .related-image').remove();
            jQuery(".backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image img.main-img").css('display','');
            var imgClass = "related-image";
            var elem = jQuery(this).children('.thumb-related-img');
            var src = elem.attr('data-replace-img');
            jQuery('.backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image').append('<img class="'+imgClass+'" src="'+src+'"/>');
            jQuery(".backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image img.main-img").css('display','none');
            if (!jQuery(this).hasClass('current-product')) {
                //Add text
                var html = '';
                var title = elem.attr('data-replace-title');
                var sku = elem.attr('data-replace-ref');
                var basePrice = elem.attr('data-replace-base-price');
                var specialPrice = elem.attr('data-replace-special-price');
                var groupPrice = elem.attr('data-replace-group-price');
                var cssDiscount = elem.attr('data-replace-css-discount');
                var extraText = elem.attr('data-replace-extra-text');
                var oferta = elem.attr('data-replace-discount-type');
                var txtOferta = elem.attr('data-replace-discount-text');
                var subtitle = elem.attr('data-replace-subtitle');
                html += '<div class="textinformation onlydesktop">';
                html += '<div class="product-name">'+title+'</div>';
                html += '<p class="product_ref"><abbr title="'+Translator.translate('product reference')+'">'+Translator.translate('ref')+'</abbr>: <b>'+sku+'</b></p>';
                if (subtitle != '') html += '<p>'+subtitle+'</p>';
                html += '</div>';

                html += '<div class="price-container">';
                if (cssDiscount != "") {
                    html += '<div class="discount-container">';
                    html += '<div class="discount '+cssDiscount+'">';
                    if (extraText.length && oferta.toUpperCase()!="FM") {
                        if (cssDiscount == 'black-friday') {
                            html += 'black <span class="friday">friday</span>';
                        } else if (cssDiscount == 'cyber-monday') {
                            html += '<span class="monday">cyber monday</span>';
                        } else {
                            html += extraText;
                        }
                    }
                    html += "<span class='discount-label'>" + txtOferta + "</span>";
                    html += '</div>';
                    html += '</div>';
                }
                html += '<div class="product-price-box">';
                if (parseFloat(specialPrice) < parseFloat(basePrice)) {
                    html += '<div class="base-price sale"><span class="base-price-sale-inner">'+formatCurrency(basePrice, priceFormat)+'</span></div>';
                } else {
                    html += '<div class="base-price"><acronym title="'+Translator.translate('recommended retail price')+'">'+Translator.translate('RRP')+'</acronym>&nbsp;'+formatCurrency(basePrice, priceFormat)+'</div>';
                }
                html += '<div class="partner-price'; if(parseFloat(specialPrice) < parseFloat(basePrice)) html+= ' sale'; html += '">';
                if (parseFloat(specialPrice) < parseFloat(basePrice)) {
                    html += Translator.translate('Sale')+'&nbsp'+formatCurrency(specialPrice, priceFormat);
                } else if (parseFloat(groupPrice) < parseFloat(basePrice)) {
                    html += Translator.translate('Member')+' '+formatCurrency(groupPrice, priceFormat);
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';
                hoverRelatedDialog = true;
                jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.basic-info-container').css('opacity','0');
                jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.hover-info-container').html(html);
                jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.hover-info-container').show();
            } else {
                jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.basic-info-container').css('opacity','');
                jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.hover-info-container').hide();
                hoverRelatedDialog = false;
            }
        }
    });

    jQuery('.backdrop#product-info .dialog .dialog-content').on('mouseleave', '.related-products .related-carousel-container .related-carousel a', function(){
        if (!responsiveMode) {
            hoverRelatedDialog = false;
            setTimeout(function(){
                if (!hoverRelatedDialog) {
                    jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.basic-info-container').css('opacity','');
                    jQuery('.backdrop#product-info .dialog .dialog-content > div.info-container div.hover-info-container').hide();
                    jQuery('.backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image .related-image').remove();
                    jQuery(".backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image img.main-img").css('display','');
                }
            }, 500);
        }
    });

    jQuery('.category-products .products-grid .box-item.item').on('mousedown',function(e) {
        if ((jQuery(e.target).attr('class') != "wishlist-container") && (jQuery(e.target).parents(".wishlist-container").size() == 0)) {
            jQuery(this).addClass('active');
        }
    });

    jQuery('.category-products .products-grid .box-item.item').on('mouseup',function() {
        jQuery(this).removeClass('active');
    });

    jQuery('.category-products .products-grid .box-item.item').on('mouseleave',function() {
        jQuery(this).removeClass('active');
    });

    jQuery('.category-products .products-grid .box-item.item').on('touchstart',function(e) {
        jQuery('.category-products .products-grid .box-item.item').removeClass('active');
        if ((jQuery(e.target).attr('class') != "wishlist-container") && (jQuery(e.target).parents(".wishlist-container").size() == 0)) {
            jQuery(this).addClass('active');
        }
    });

    jQuery('body').on('touchmove',function() {
        jQuery('.category-products .products-grid .box-item.item').removeClass('active');
    });

    jQuery('body').on('touchend',function(){
        jQuery('.category-products .products-grid .box-item.item').removeClass('active');
    });

    jQuery("body").on('click',".pages :not(.desactivado) > a", function(e){
        jQuery(".overlay-loading").show();
    });
});

jQuery(window).on('scroll',function(){
    checkIfResponsive();
    if (afterLoad && !responsiveMode) {
        recalculateFilterScroll();
    }
});

jQuery(window).resize(function(){
    moveOrderButton();
    if (jQuery('.offset-top').length) {
        fixmeTop = jQuery('.offset-top').offset().top;
    }
    fixFooterBottom();
});

function toggleFilter(filterColumn){
    if (responsiveMode) {
        if (jQuery('.'+filterColumn).hasClass("opened")) {
            jQuery('.'+filterColumn).removeClass("opened");
            jQuery('.'+filterColumn).addClass("closed");
        } else {
            jQuery('.'+filterColumn).removeClass("closed");
            jQuery('.'+filterColumn).addClass("opened");
        }
        var item = jQuery('.'+filterColumn);
        var filterPos = item.position().top;
        if (item.hasClass('last-filtered')) {
            jQuery('#filter-top-block .block-content').animate({
                scrollTop: filterPos
            }, 500);
            item.removeClass('last-filtered');
        }
    } else {
        if (jQuery('.'+filterColumn).hasClass("closed")) {
            jQuery('.'+filterColumn).removeClass("closed");
            jQuery('.'+filterColumn).addClass("opened");
        } else {
            jQuery('.'+filterColumn).removeClass("opened");
            jQuery('.'+filterColumn).addClass("closed");
        }
    }

    if (filterColumn=='toolbar-sorter') {
        eraseFilter();
    }
    balanceScrollFilterColumn();
    calculateNewFilterPosition();
}

function createPriceSliderMobile(){
    var min = jQuery('#amshopby-price-responsive').data('min');
    var max = jQuery('#amshopby-price-responsive').data('max');
    var dragTapSlider = document.getElementById('amshopby-price-responsive');
    if(min == max || min + 1 == max){
        jQuery(dragTapSlider).parents('.filter-content').hide();
        return;
    }
    jQuery(dragTapSlider).parents('.filter-content').show();
    var values = getUrlRange();
    var minSelected = values ? parseInt(values[0]):min;
    var maxSelected = values ? parseInt(values[1]):max;
    if(typeof dragTapSlider.noUiSlider !== 'undefined') {
        dragTapSlider.noUiSlider.set([ minSelected, maxSelected ]);
        jQuery(dragTapSlider).data('values', [ minSelected, maxSelected ]);
    }
    else{
        noUiSlider.create(dragTapSlider, {
            start: [ minSelected, maxSelected ],
            animate: true,
            step: 1,
            tooltips: [ true, true ],
            format: {
                to: function (value) {
                    return Math.floor(value) + '€';
                },
                from: function (value) {
                    return value.replace(',-', '');
                }
            },
            behaviour: 'tap',
            connect: true,
            range: {
                'min': min,
                'max': max
            }
        });
        dragTapSlider.noUiSlider.on('change', function( values, handle ){
            filter_element = jQuery(this).parents('.filter-options');
            addFilterWaiting();
            setRange(parseInt(values[0]), parseInt(values[1]));
        });
    }
}

function eraseFilter() {
    var url = jQuery('.sort-by ul .ajax-filter').attr('href');
    var baseUrl = url.split('?');
    jQuery('.sort-by .clear-filter-container .ajax-filter').attr('href',baseUrl[0]);
}

decorateDataList('narrow-by-list3');
decorateGeneric($$('ul.products-grid'), ['odd','even','first','last']);

/** RESPOSIVE ONLY */
checkIfResponsive();
if(responsiveMode) {
    responsiveGridItemsHover(jQuery('.products-grid'));
}
/** END RESPONSIVE*/

function reloadNumberFilter() {
    var prodListItems = jQuery('.number_products_filter').attr('id');
    if (prodListItems == undefined) { prodListItems = 0; }
    else { prodListItems = prodListItems.replace('_filter',''); }
    jQuery('.products-count .grid-count').html(prodListItems);
    totalListItems = jQuery('.products-count .grid-total-count').html();
    if(totalListItems == prodListItems){
        jQuery('.filters-top-button.filter-by-btn').addClass('filtered');
        if(jQuery('.filters-top-button.filter-by-btn').hasClass('filtered')){
            jQuery('.filters-top-button.filter-by-btn').removeClass('filtered');
        }
    } else {
        if(jQuery('.filters-top-button.filter-by-btn').hasClass('filtered') == false){
            jQuery('.filters-top-button.filter-by-btn').addClass('filtered');
        }
    }
}

var beforeResponsiveMode = responsiveMode;
function resizeDocument(fromDescription){
    //Title description
    checkIfResponsive();
    beforeResponsiveMode = responsiveMode;
    var w = jQuery('.category-products').width();
    if(w != jQuery('.products-grid').data('width')){
        truncateText(15);
    }
    jQuery('.products-grid').data('width', w);
}


jQuery(window).load( function () {
    enableSeeAll();
    loadDocument(false);
    // reloadNumberFilter();
    truncateText(15);
    var st = jQuery(window).scrollTop();
    if (scrollToProduct) {
        var scrollTo = jQuery("#prod-"+scrollToProduct).offset().top;
        if (!responsiveMode) {
            scrollTo = scrollTo - cookieLawHeight - jQuery('div.amshopby-filters-left').outerHeight() - 5;
        } else {
            scrollTo -= jQuery('.filters-top-buttons-responsive').outerHeight();
        }
        if (scrollTo < st) {
            scrollTo -= jQuery('.header-language-container').innerHeight();
        }
        jQuery('html, body').animate({
            scrollTop: scrollTo
        });
    }
});

jQuery( window ).resize(function() {
    resizeDocument(false);
});

var showTop = false;
jQuery( window ).scroll(function() {
    if(jQuery(document).scrollTop() >= 500 && !showTop){
        jQuery('#to-top').show();
        showTop=true;
    }else if(jQuery(document).scrollTop() < 500 && showTop){
        jQuery('#to-top').hide();
        showTop=false;
    }
});

var isChecked = 0;
jQuery(".show-info-checkbox").click(function(){
    if (!isChecked) {
        isChecked=1;
        jQuery(".chB").addClass("checked");
        jQuery(".show-info").css('display','block');
    } else {
        isChecked=0;
        jQuery(".chB").removeClass("checked");
        jQuery(".show-info").css('display','none');
    }
});

jQuery('.grid-icons').hover(function(){
    jQuery(this).parent().toggleClass('hovered');
});

jQuery('#to-top').click(function(){
    jQuery('html, body').animate({ scrollTop: 0 }, 500);
    return false;
});

jQuery(window).resize(function() {
    var html = jQuery('.header-grid');
    var html_title = jQuery('.description-title');
    if (jQuery(window).width() <= 1024) {
        jQuery('.description-title').remove();
        jQuery('.header-grid').remove();
        jQuery('.toolbar').before(html_title);
        jQuery('.toolbar').before(html);
    } else {
        jQuery('.toolbar .description-title').remove();
        jQuery('.toolbar .header-grid').remove();
        jQuery('.toolbar .sorter').before(html_title);
        jQuery('.description-title').after(html);
    }
});

function calculateOwlPosition(owl,jump) {
    var totalItems = owl.find('.owl-item').not('.cloned').length;
    var totalActive = owl.find('.owl-item.active').not('.cloned');
    var current = 0;
    if (totalActive.length) {
        owl.find('.owl-item').each(function(index,elem) {
            if (jQuery(elem).hasClass('active')) {
                current = jQuery(elem).find('.carousel-container').data('index');
                return false;
            }
        });
    }
    var goTo = current+jump;
    if (goTo < 0) {
        goTo += totalItems;
    }
    if (goTo > totalItems-1) {
        goTo -= totalItems;
    }
    return goTo;
}

function calculateRelatedImgMinHeight() {
    if (!responsiveMode) {
        var minImgH = jQuery('#amasty_zoom').outerHeight();
        jQuery('.product-view-main .main-image .main-image-wrapper .main-image').css('min-height',minImgH);
    } else {
        jQuery('.product-view-main .main-image .main-image-wrapper .main-image').css('min-height','');
    }
}

function calculateDialogRelatedImgMinHeight() {
    setTimeout(
        function () {
            var minImgH = jQuery('.backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image img.main-img').outerHeight();
            jQuery('.backdrop#product-info .dialog .dialog-content .image-container a.related-dialog-image').css('min-height', minImgH);
            if (!minImgH) calculateDialogRelatedImgMinHeight();
        }, 5
    );
}

function addToWishList(e,addUrl,productId) {
    e.preventDefault();
    jQuery('.page .overlay-loading').show();
    window.location.href = addUrl+'?productId='+productId;
}

function removeFromWishList(e,removeUrl,productId) {
    e.preventDefault();
    jQuery('.page .overlay-loading').show();
    if (productId) {
        removeUrl+='?productId='+productId;
    }
    window.location.href = removeUrl;
}

function openWishListDialog(e,dialogId) {
    e.preventDefault();
    openDialog(dialogId);
}
