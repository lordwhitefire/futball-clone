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

var clicking = false;
var homeType = "";
var isBlocked = 0;
var showMenu = 0;

/****************************
 *********CALCUL HEIGHT******
 ****************************/

function getItemsHeight(item,type,hovered){
    //item = item clicked
    jQuery('ol.list-categories').find('.isVisible').removeClass('isVisible');
    if(type == 'open'){
        if(!hovered){item.addClass('isVisible');}
        var id = item.attr('id');
        var level = parseInt(id.match(/\d+/));
        var selector = ' > ol > li';
        if (jQuery('#'+id+' > ol > div').length) selector = ' > ol > div > div > li';
        jQuery('#'+id+selector).each(function(){
            if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                jQuery(this).addClass('isVisible');
                if(level == 2){
                    var idChild = jQuery(this).attr('id');
                    if(jQuery(this).hasClass('opened') || hovered){
                        var selector2 = ' > ol > li';
                        if (jQuery('#'+idChild+' > ol > div').length) selector2 = ' > ol > div > div > li';
                        jQuery('#'+idChild+selector2).each(function(){
                            if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                                jQuery(this).addClass('isVisible');
                            }
                        });
                    }
                }
            }
        });
    }else if(type == 'close'){
        if(!hovered){item.addClass('isVisible');}
        var id = item.attr('id');
        var level = parseInt(id.match(/\d+/));
        var grandfather = item.parent().parent();
        if (grandfather.hasClass('mCustomScrollBox')) {
            grandfather = item.parent().parent().parent().parent();
        }
        if(level == 1){
            //Es l'unic punt on s'han de mostrar els siblings del grandfather
            grandfather.siblings().each(function(){
                if(!jQuery(this).hasClass('adulto') && !jQuery(this).hasClass('infantil')){
                    jQuery(this).addClass('isVisible');
                } // no volem posar isVisible als nivells 0 -> Adulto/Infantil
            });
        }
        if(!grandfather.hasClass('adulto') && !grandfather.hasClass('infantil')){
            if (grandfather.hasClass('mCustomScrollBox')) {
                item.parent().parent().parent().parent().addClass('isVisible');
            } else {
                grandfather.addClass('isVisible');
            }
        } // no volem posar isVisible als nivells 0 -> Adulto/Infantil
        item.siblings().each(function(){
            if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                jQuery(this).addClass('isVisible');
                if(level == 3){
                    var idChild = jQuery(this).attr('id');
                    var selector = ' > ol > li';
                    if (jQuery('#'+idChild+' > ol > div').length) selector = ' > ol > div > div > li';
                    jQuery('#'+idChild+selector).each(function(){
                        if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                            jQuery(this).addClass('isVisible');
                        }
                    });
                }
            }
        });
    }else if(type == 'first'){
        if(homeType == 1){
            jQuery('.amshopby-cat.level0.adulto > ol > li').each(function(){
                if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                    jQuery(this).addClass('isVisible');
                }
            });
        }else{
            jQuery('.amshopby-cat.level0.infantil > ol > li').each(function(){
                if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                    jQuery(this).addClass('isVisible');
                }
            });
        }
        jQuery('ol.list-categories > li').each(function(){
            if(!jQuery(this).hasClass('grouped') || jQuery(this).hasClass('grouped-opened')){
                if(!jQuery(this).hasClass('adulto') && !jQuery(this).hasClass('infantil')){
                    jQuery(this).addClass('isVisible');
                }
            }
        });
    }
//    setHeightItem();
}

function setHeightMenu(ref) {
    var headerSearchResponsiveHeight = 0;
    if (jQuery('body.is-responsive #header-search2').hasClass('is-showed')) {
        headerSearchResponsiveHeight = jQuery('body.is-responsive #header-search2').outerHeight();
    }
    var windowH;
    if (ref == '.amshopby-filters-left.block-layered-nav') {
        windowH = jQuery(window).height() - jQuery('body.is-responsive div.col-left-menu .responsive-menu-header').outerHeight() - headerSearchResponsiveHeight - cookieLawHeight;
        jQuery(ref).height(windowH);
        jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories > li.level0 > ol.lvl1 > li.level1 > ol.lvl2').each(function () {
            if (responsiveMode) {
                var siblingLinkHeight = jQuery(this).parent().find('a.has-child').outerHeight();
                jQuery(this).height(windowH - siblingLinkHeight);
            }
        });
    } else if (ref == '.left-help-menu .help-menu .help-menu-container ol') {
        windowH = jQuery(window).height() - jQuery('.header-language-background .header-language-container').outerHeight() - cookieLawHeight;
        if (!responsiveMode) {
            windowH -= jQuery('div.amshopby-filters-left').outerHeight();
        }
        if (jQuery('.help-header').length) {
            windowH -= jQuery('.help-header').outerHeight();
        }
        jQuery(ref).height(windowH);
    } else if (ref== '.menu-wishlist') {
        windowH = jQuery(window).height() - jQuery('.header-language-background .header-language-container').outerHeight() - cookieLawHeight;
        if (!responsiveMode) {
            windowH -= jQuery('div.amshopby-filters-left').outerHeight();
        }
        var mainContainerH = jQuery('.main-container').outerHeight();
        if (mainContainerH < windowH) {
            windowH = mainContainerH;
        }
        jQuery(ref).height(windowH);
    }
}

function design_marquee(open) {
    if (open) {
        jQuery('.marqueze').removeClass("marqueze-menu-closed");
    } else {
        jQuery('.marqueze').addClass("marqueze-menu-closed");
    }
}

function open_menu_responsive() {
    if (!showMenu) {
        jQuery('div.col-left-menu').css('top',cookieLawHeight);
        design_marquee(true);
        jQuery('.col-left-menu').toggle('slide', function() {
        // jQuery('.amshopby-filters-left').toggle('slide', function() {
            jQuery(this).addClass('opened');
        });
        jQuery('.box-hidden-menu').toggleClass('has-opened');
        jQuery('.box-right-menu').toggleClass('has-opened');
        showMenu = 1;
        isBlocked = 0;
        //jQuery('body').css('overflow-x','hidden');
        //jQuery('body').css('overflow-y','hidden');
        //jQuery('html').css('overflow-y','hidden');
        //jQuery('html').css('position','fixed');
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;

        openDialog('menu-backdrop');
        /* Fem que al obrir el menu en responsive poguem escriure directament el cercador*/
        // jQuery('#search_r').focus();
    }
}

function close_menu_responsive(){
    if (showMenu) {
        design_marquee(false);
        jQuery('.col-left-menu').toggle('slide', function() {
            jQuery(this).removeClass('opened');
            jQuery(this).css('display','');
        });
        jQuery('.box-hidden-menu').toggleClass('has-opened');
        jQuery('.box-right-menu').toggleClass('has-opened');
        showMenu = 0;
        isBlocked = 0;
        //jQuery('body').css('overflow-x','');
        //jQuery('body').css('overflow-y','');
        //jQuery('html').css('overflow-y','');
        //jQuery('html').css('position','');
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }
}

function delayHover (element) {
    timer = setTimeout ( function () {
        if (jQuery(element).is(':hover')) {
            element.addClass('hovered');
            element.find('ol').first().addClass('listHover');
            jQuery(window).off('scroll',bindScrollAction);
            if (isMenuHidden) {
                jQuery('body:not(.is-responsive) .col-left-menu-container.avoid-fixed-menu').css('padding-top',cookieLawHeight);
                jQuery('body.customer-account .page .main-container').css('padding-top',cookieLawHeight);
            }
            jQuery('html, body').scrollTop(0);
            jQuery('body div.amshopby-filters-left').addClass('opened-option');
            // jQuery('body .main-container').css('margin-top',0);
            //jQuery('body.customer-account .page .main-container .col-main').css('padding-top',0);
            jQuery('.col-left-menu-container.avoid-fixed-menu').css('padding-top',totalHeight);
            maxWidthMenuContainer();
        }
    }, 300);
}

function maxWidthMenuContainer(){
    var w = jQuery('.list-categories').outerWidth();
    // jQuery('.menu-options-container').css('max-width',w);
    jQuery('.custom-category-link-container').css('max-width',w);
}

var triggerOnMouseLeave = function() {
    jQuery('body div.amshopby-filters-left').removeClass('opened-option');
    var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();
    if (jQuery('.help-header').length) {
        menuHeight += jQuery('.help-header').outerHeight();
    }
	// BUG SHAREN margin-top
    //jQuery('body:not(.customer-account) .main-container').css('margin-top',menuHeight); 
    //jQuery('body.customer-account .page .main-container .col-main').css('margin-top',menuHeight);
    jQuery('body.customer-account .page .main-container').css('padding-top','');
    jQuery('.list-categories').find('.hovered').removeClass('hovered');
    jQuery('.list-categories').find('.listHover').removeClass('listHover');
    jQuery(window).on('scroll',bindScrollAction);
    bindScrollAction();
	console.log("HEADER triggerOnMouseLeave totalHeight " + (totalHeight + menuHeight));
    jQuery('.col-left-menu-container.avoid-fixed-menu').css('padding-top', totalHeight + menuHeight);
};

/** HELP MENU **/
function calculateHelpMenuPosition() {
    var scrollTop = jQuery(window).scrollTop();
    var headerHeight = jQuery('.header-language-container').height() + cookieLawHeight;
    if (!responsiveMode) {
        headerHeight += jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
    }
    if (jQuery('.help-header').length) {
        headerHeight += jQuery('.help-header').outerHeight();
    }
    var contentHeight = jQuery('.col-main-menu').height();
    var minH = jQuery('div.left-help-menu .help-menu ol.lvl0').outerHeight();
    if (minH > contentHeight) {
        contentHeight = minH;
    }
    var windowHeight = jQuery(window).height();
    if (((windowHeight+scrollTop) > (headerHeight+contentHeight)) && !isMobile) {
        var dif = (windowHeight+scrollTop) - (headerHeight+contentHeight);
        return dif;
    } else {
        return 0
    }
}
function setHeightItem(elem,isFirstRender){
    var headerH = jQuery('.header-language-container').height() + cookieLawHeight;
    if (!responsiveMode) {
        headerH += jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
    }
    if (jQuery('.help-header').length) {
        headerH += jQuery('.help-header').outerHeight();
    }
    var hTotal = jQuery('body').height() - headerH - jQuery(elem).siblings('div.go-back:not(.level0)').outerHeight();
    var childrenElements = jQuery(elem).children('li');
    if (!responsiveMode) {
        childrenElements = jQuery(elem).children().children().children('li');
    }
    var nItems = childrenElements.length;
    var hItem = hTotal/nItems;
    var lastHeight = hItem;
    if (hItem%1 != 0) {
        hItem = parseInt(hItem);
        lastHeight = (hTotal - (nItems * hItem)) + hItem;
    }
    /** Alçada mínima = 50 **/
    if (hItem < 50) hItem = 50;
    if (lastHeight < 50) lastHeight = 50;
    var dif = 0;
    if (!isFirstRender) {
        dif = calculateHelpMenuPosition();
    }
    jQuery(elem).height(hTotal);
    jQuery(elem).parent().css('top',headerH-dif);
    childrenElements.outerHeight(hItem);
    childrenElements.last().outerHeight(lastHeight);
}

function renderHelpMenu(isFirstRender) {
    setHeightMenu('.left-help-menu .help-menu .help-menu-container ol');
    jQuery('.left-help-menu .help-menu ol .elements-container').each(function(){setHeightItem(this,isFirstRender)});
}

function setHelpHeaderPos(){
    var headerHResponsive = jQuery('.header-language-container').height() + cookieLawHeight;
    var headerHDesktop = headerHResponsive + jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
    jQuery('.help-header.responsive-header').css('top',headerHResponsive);
    jQuery('.help-header.desktop-header').css('top',headerHDesktop);
}

/** WISHLIST MENU **/
function setWishlistMenuPosition() {
    var scrollTop = jQuery(window).scrollTop();
    var headerHeight = jQuery('.header-language-container').height() + cookieLawHeight;
    if (!responsiveMode) {
        headerHeight += jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
    }
    var contentHeight = jQuery('body.customer-account .page .main-container').height();
    var windowHeight = jQuery(window).height();
    var dif = 0;
    var difBottom = 0;
    if ((headerHeight+contentHeight) < windowHeight) {
        difBottom = headerHeight+contentHeight-windowHeight;
    }
    if (((windowHeight+scrollTop) > (headerHeight+contentHeight)) && !isMobile) {
        dif = (windowHeight+scrollTop) - (headerHeight+contentHeight) + difBottom;
    }
    return headerHeight-dif;
}

function renderWishlistMenu() {
    setHeightMenu('.menu-wishlist');
    var wishListMenuPos = setWishlistMenuPosition();
    jQuery('.menu-wishlist').css('top',wishListMenuPos);
}

function sizesMenuScroll() {
    if (jQuery(".custom-category-link-container.sizes-menu").length) {
        jQuery(".custom-category-link-container.sizes-menu").mCustomScrollbar({
            axis:"x",
            theme:"dark-3",
            scrollbarPosition:"outside",
            advanced:{autoExpandHorizontalScroll:true}
        });
    }
}

/*****************************
 **********RESIZE*************
 ****************************/
jQuery(window).resize(function(){
    checkIfResponsive();
    if (responsiveMode) {
        if (jQuery('.left-help-menu .help-menu ol .elements-container').length) {
            if(!jQuery('body').hasClass("onestepcheckout-index-index")){
                jQuery('.left-help-menu .help-menu ol .elements-container').mCustomScrollbar('destroy');
            }
        }
        jQuery('.amshopby-cat > ol > li.level1').unbind('mouseover');
        jQuery('.amshopby-advanced').unbind('mouseleave');
        setHeightMenu('.amshopby-filters-left.block-layered-nav');
        if (jQuery(".custom-category-link-container.sizes-menu").length) {
            jQuery(".custom-category-link-container.sizes-menu").mCustomScrollbar('destroy').removeAttr('style');
        }
    } else {
        if (jQuery('.left-help-menu .help-menu ol .elements-container').length) {
            if(!jQuery('body').hasClass("onestepcheckout-index-index")){
                jQuery('.left-help-menu .help-menu ol .elements-container').mCustomScrollbar({
                    theme:  "dark-thin",
                    callbacks:{
                        whileScrolling:function () {
                            if (this.mcs.top == 0) {
                                jQuery(this).removeClass('add-shadow');
                            } else {
                                jQuery(this).addClass('add-shadow');
                            }
                        }
                    }
                });
            }
        }
        jQuery('.amshopby-filters-left.block-layered-nav').height('');
        jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories > li.level0 > ol.lvl1 > li.level1 > ol.lvl2').each(function() {
            jQuery(this).height('');
        });
        if (showMenu) {
            close_menu_responsive();
            closeDialog('menu-backdrop');
        }
        jQuery('.amshopby-cat > ol > li.level1').mouseover(function () {
            var itemLi = jQuery(this);
            if (!itemLi.hasClass('hovered')) {
                //SIBLINGS
                itemLi.siblings().removeClass('hovered');
                itemLi.siblings().find('.listHover').removeClass('listHover');
                itemLi.siblings().find('.hovered').removeClass('hovered');
                //HOVER de la categoria
                delayHover(itemLi);
            }
        });
        jQuery('.amshopby-advanced').bind('mouseleave',triggerOnMouseLeave);
        jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories > li.level0 > ol.lvl1 > li.level1 > ol.lvl2').css('top',jQuery('div.amshopby-filters-left .amshopby-advanced').height());
        sizesMenuScroll();
    }
    var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();

	// BUG SHAREN margin-top
    //jQuery('body:not(.is-responsive) .main-container').css('margin-top',menuHeight);
    //jQuery('body.is-responsive .main-container').css('margin-top','');
    if (jQuery('.help-header').length) {
        menuHeight += jQuery('.help-header').outerHeight();
    }
    setTimeout(function() {
        if (jQuery(window).width() >= 1025){
            if(menuHeight == null || menuHeight == 0){
                    //Si es null o 0, le anadimso 50px para que salga el banner
                    menuHeight = jQuery('.list-categories').height();
            }
        }else{
            if(menuHeight == null || menuHeight == 0){
                    //Si es null o 0, le anadimso 50px para que salga el banner
                    menuHeight = jQuery('.header-style').height();
            }
        }
		// BUG SHAREN margin-top
        //jQuery('body:not(.customer-account) .main-container').css('margin-top',menuHeight);
    },500);

    /** HELP MENU **/
    if (responsiveMode) {
        jQuery('.left-help-menu .help-menu ol.opened li').unbind('mouseover');
        jQuery('.left-help-menu .help-menu ol.opened').unbind('mouseleave');
        jQuery('.left-help-menu .help-menu ol.opened li').click(function () {
            jQuery(this).siblings().removeClass('hovered');
            jQuery(this).addClass('hovered');
        });
    } else {
        jQuery('.left-help-menu .help-menu ol.opened li').mouseover(function () {
            jQuery(this).siblings().removeClass('hovered');
            jQuery(this).addClass('hovered');
        });

        jQuery('.left-help-menu .help-menu ol.opened').mouseleave(function () {
            jQuery(this).find('li').removeClass('hovered');
        });
    }

    // setHelpHeaderPos();
    renderHelpMenu(false);
    renderWishlistMenu();
    var minH = jQuery('div.left-help-menu .help-menu ol.lvl0').outerHeight();
    jQuery('.col-main-menu').css('min-height',minH);
});

/**-----------------------------------------------------------------------------------**/
jQuery(document).ready(function(){
    homeType = 1;
    jQuery('.amshopby-filters-left.block-layered-nav').on('scroll',function(){
        var scrollPos = jQuery(this).scrollTop();
        if (scrollPos > 0) jQuery('#header-search2').addClass('add-shadow');
        else jQuery('#header-search2').removeClass('add-shadow');
    });
    jQuery('ol.list-categories').find('li.outlet').appendTo('ol.list-categories');
    if(!jQuery('.onoffswitch :checkbox').is(':checked')){
        homeType = 2;
    }
//    setHeightOptionFirstTime(homeType)

    /****************************
     **********HOVER*************
     ****************************/
    checkIfResponsive();
    if(!responsiveMode) {
        jQuery('.amshopby-cat > ol > li.level1').mouseover(function () {
            var itemLi = jQuery(this);
            if (!itemLi.hasClass('hovered')) {
                //SIBLINGS
                itemLi.siblings().removeClass('hovered');
                itemLi.siblings().find('.listHover').removeClass('listHover');
                itemLi.siblings().find('.hovered').removeClass('hovered');
                //HOVER de la categoria
                delayHover(itemLi);
            }
        });
        jQuery('div.left-help-menu .help-menu ol .go-back').mouseover(function() {
            jQuery('div.left-help-menu .help-menu ol li').removeClass('hovered');
        });
        jQuery('.amshopby-advanced').bind('mouseleave',triggerOnMouseLeave);

        jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories > li.level0 > ol.lvl1 > li.level1 > ol.lvl2').css('top',jQuery('div.amshopby-filters-left .amshopby-advanced').height());
        sizesMenuScroll();
    } else {
        jQuery('.amshopby-cat > ol > li.level1').unbind('mouseover');
        jQuery('.amshopby-advanced').unbind('mouseleave');
        setHeightMenu('.amshopby-filters-left.block-layered-nav');
    }

    /****************************
     **********CLICK*************
     ****************************/
    jQuery('li.amshopby-cat.level1.has-child > a').click(function(e){
        if (responsiveMode) {
            var liParent = jQuery(this).parent();
            e.preventDefault();
            if (liParent.hasClass('opened')) {
                jQuery('body.is-responsive #header-search2').addClass('is-showed');
                liParent.removeClass('opened');
                liParent.find('ol.lvl2').slideUp("slow",function() {
                    jQuery(this).removeClass('opened');
                    jQuery(this).css('display','');
                    setHeightMenu('.amshopby-filters-left.block-layered-nav');
                });
                liParent.siblings().slideDown("slow",function() { jQuery(this).removeClass('closed'); jQuery(this).css('display',''); });
                jQuery('.list-categories .custom-links').slideDown("slow",function() { jQuery(this).removeClass('closed'); jQuery(this).css('display',''); });
                jQuery('body.is-responsive div.col-left-menu .responsive-menu-header .show-search-bar-container .show-search-bar').css('display','');
                jQuery('body.is-responsive div.col-left-menu .responsive-menu-header .show-search-bar-container .show-search-bar').removeClass('opened');
            } else {
                jQuery('body.is-responsive #header-search2').removeClass('is-showed');
                liParent.addClass('opened');
                liParent.find('ol.lvl2').on('scroll',function(){
                    var scrollPos = jQuery(this).scrollTop();
                    if (scrollPos > 0) jQuery(this).siblings('a').addClass('add-shadow');
                    else jQuery(this).siblings('a').removeClass('add-shadow');
                });
                setHeightMenu('.amshopby-filters-left.block-layered-nav');
                liParent.find('ol.lvl2').slideDown("slow",function() { jQuery(this).addClass('opened'); jQuery(this).css('display',''); });
                liParent.siblings().slideUp("slow",function() { jQuery(this).addClass('closed'); jQuery(this).css('display',''); });
                jQuery('.list-categories .custom-links').slideUp("slow",function() { jQuery(this).addClass('closed'); jQuery(this).css('display',''); });
                jQuery('body.is-responsive div.col-left-menu .responsive-menu-header .show-search-bar-container .show-search-bar').css('display','block');
            }
        }
    });

    jQuery('li.amshopby-cat.level1.has-child > div.link-disabled').click(function(e){
        if (responsiveMode) {
            var liParent = jQuery(this).parent();
            e.preventDefault();
            if (liParent.hasClass('opened')) {
                liParent.removeClass('opened');
                liParent.find('ol.lvl2').slideUp("slow",function() { jQuery(this).removeClass('opened'); jQuery(this).css('display',''); });
                liParent.siblings().slideDown("slow",function() { jQuery(this).css('display',''); });
                jQuery('.list-categories .custom-links').slideDown("slow",function() { jQuery(this).css('display',''); });
            } else {
                liParent.addClass('opened');
                liParent.find('ol.lvl2').slideDown("slow",function() { jQuery(this).addClass('opened'); jQuery(this).css('display',''); });
                liParent.siblings().slideUp("slow",function() { jQuery(this).css('display',''); });
                jQuery('.list-categories .custom-links').slideUp("slow",function() { jQuery(this).css('display',''); });
            }
        }
    });

    jQuery(".hidden-menu").click(function(){
        if (!isBlocked){
            setHeightMenu('.amshopby-filters-left.block-layered-nav');
            if (showMenu==0) {
                isBlocked = 1;
                open_menu_responsive();
            }
        }
    });

    jQuery(".close-hidden-menu").click(function(){
        if (!isBlocked){
            setHeightMenu('.amshopby-filters-left.block-layered-nav');
            if (showMenu) {
                isBlocked = 1;
                close_menu_responsive();
                closeDialog('menu-backdrop');
            }
        }
    });

    jQuery(".show-search-bar").click(function(){
        if (jQuery(this).hasClass('opened')) {
            jQuery('body.is-responsive #header-search2').removeClass('is-showed');
            jQuery(this).removeClass('opened');
        } else {
            jQuery('body.is-responsive #header-search2').addClass('is-showed');
            jQuery(this).addClass('opened');
        }
        setHeightMenu('.amshopby-filters-left.block-layered-nav');
    });

    jQuery('.menu-options-container div div.text-grouped').click(function(){
        jQuery(this).parent().find('.is-grouped').toggleClass('is-visible');
        jQuery(this).parent().find('.text-grouped').toggleClass('is-hidden');
    });

    jQuery(document).on('click','.link-disabled',function(event){
        event.preventDefault();
    });

    var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();
	// BUG SHAREN margin-top
    //jQuery('body:not(.is-responsive) .main-container').css('margin-top',menuHeight);
    //jQuery('body.is-responsive .main-container').css('margin-top','');

    // if (jQuery(".custom-category-link-container.sizes-menu").length) {
    //     jQuery(".custom-category-link-container.sizes-menu").mCustomScrollbar({
    //         axis:"x",
    //         theme:"dark-3",
    //         scrollbarPosition:"outside",
    //         advanced:{autoExpandHorizontalScroll:true}
    //     });
    // }

    jQuery('#toplogin .mobile-search-container .mobile-search').click(function(){
        jQuery(this).toggleClass('opened');
        jQuery('.header-style .box-switch-menu .search-form').slideToggle(300, function(){
            jQuery(this).toggleClass('opened');
            jQuery(this).css('display','');
            if (jQuery(this).hasClass('opened')) {
                searchFormHeight = jQuery('body.is-responsive .header-style .box-switch-menu .search-form').innerHeight();
            } else {
                searchFormHeight = 0;
            }
            var st = jQuery(window).scrollTop();
            if(st < 0) st = 0;		/* upgrade iphone */
            if (st > (jQuery('body h1.description-title').outerHeight() + jQuery('body .header-grid').outerHeight() + jQuery('.col-left-menu-container.avoid-fixed-menu').outerHeight()) - cookieLawHeight - navbarHeight - searchFormHeight) {
                jQuery('body.is-responsive .filters-top-buttons-responsive').css('top',cookieLawHeight+navbarHeight+searchFormHeight-11);
                jQuery('body.is-responsive .filters-top-buttons-responsive').addClass('set-fixed');
                jQuery('body.is-responsive .toolbar .sorter').css('top',cookieLawHeight+navbarHeight+searchFormHeight-1);
                jQuery('body.is-responsive .toolbar').addClass('set-fixed');
                jQuery('.header-language-background .header-language-container').removeClass('responsive-shadow');
            } else {
                jQuery('body.is-responsive .filters-top-buttons-responsive').css('top','');
                jQuery('body.is-responsive .filters-top-buttons-responsive').removeClass('set-fixed');
                jQuery('body.is-responsive .toolbar').removeClass('set-fixed');
                jQuery('body.is-responsive .toolbar .sorter').css('top','');
                if (jQuery('.header-language-background .header-language-container').hasClass('is-hidden') && responsiveMode) {
                    jQuery('.header-language-background .header-language-container').addClass('responsive-shadow');
                }
            }
            //Afegueix efecte rebot al obrir el cercador a mobile
            // if (jQuery(this).hasClass('opened')) {
            //     jQuery(this).effect('bounce', { direction: "up", distance: "5", times: 3 }, 50, function () {
            //         jQuery(this).css('display','');
            //     });
            // }
            recalculateHeaderPositions();
        });
    });

    if (jQuery('.help-header').length) {
        menuHeight += jQuery('.help-header').outerHeight();
    }
    setTimeout(function() {
        if(menuHeight == null || menuHeight == 0){
                menuHeight = jQuery('.amshopby-advanced').outerHeight();
        }
		// BUG SHAREN margin-top
        //jQuery('body:not(.customer-account) .main-container').css('margin-top',menuHeight);
    },500);

    /** HELP MENU **/
    if (responsiveMode) {
        jQuery('.left-help-menu .help-menu ol.opened li').click(function () {
            jQuery(this).siblings().removeClass('hovered');
            jQuery(this).addClass('hovered');
            jQuery('div.left-help-menu .help-menu ol .go-back.level0').removeClass('displayed');
//            jQuery('.left-help-menu .help-menu ol .elements-container').removeClass('add-shadow');
        });
    } else {
        jQuery('.left-help-menu .help-menu ol.opened li').mouseover(function () {
            jQuery(this).siblings().removeClass('hovered');
            jQuery(this).addClass('hovered');
        });

        jQuery('.left-help-menu .help-menu ol.opened').mouseleave(function () {
            jQuery(this).find('li').removeClass('hovered');
        });
    }

    function helpMenuBack(elem) {
        if (jQuery(elem).hasClass('level0')) {
            jQuery('div.help-header .help-header-title h1').removeClass('hide-mobile');
            jQuery('.help-menu-container div.go-back').removeClass('current');
            jQuery('.help-menu-container ol:not(.lvl0)').removeClass('opened');
            jQuery('.help-menu-container ol li').removeClass('hovered');
            jQuery('body').addClass('show-faqs-menu');
            jQuery(elem).removeClass('displayed');
            jQuery(elem).parent().child('.elements-container').removeClass('add-shadow');
            renderHelpMenu(false);
        } else {
            jQuery(elem).removeClass('current');
            jQuery(elem).parent().removeClass('opened');
            jQuery(elem).parent().parent().removeClass('hovered');
            jQuery(elem).parent().parent().parent().parent().parent().parent().children('.go-back').addClass('current');
            jQuery('body').addClass('show-faqs-menu');
            jQuery(elem).parent().children('.elements-container').removeClass('add-shadow');
            renderHelpMenu(false);
            if (!jQuery('div.left-help-menu .help-menu ol.lvl1').hasClass('opened')) {
                jQuery('div.help-header .help-header-back').css('display','none');
                jQuery('div.help-header .help-header-title h1').removeClass('hide-mobile');
            }
        }
    }

    jQuery('.go-back').click(function(e) {
        e.stopPropagation();
        var currentScroll = jQuery(window).scrollTop();
        var elem = this;
        if (currentScroll > 0) {
            jQuery('html, body').animate({scrollTop:0}, '300', function() {
                helpMenuBack(elem);
            });
        } else {
            helpMenuBack(elem);
        }
    });

    jQuery('.help-header .help-header-back').click(function() {
        jQuery(this).css('display', 'none');
        jQuery('div.help-header .help-header-title h1').removeClass('hide-mobile');
        jQuery('.help-menu-container div.go-back').removeClass('current');
        jQuery('.help-menu-container ol:not(.lvl0)').removeClass('opened');
        jQuery('.help-menu-container ol li').removeClass('hovered');
        jQuery('body').addClass('show-faqs-menu');
        jQuery('.left-help-menu .help-menu ol .elements-container').removeClass('add-shadow');
        renderHelpMenu(false);
    });

    setHelpHeaderPos();

    if (!jQuery('div.left-help-menu .help-menu ol.lvl1').hasClass('opened')) {
        jQuery('div.help-header .help-header-back').css('display','none');
        jQuery('div.help-header .help-header-title h1').removeClass('hide-mobile');
    }

    if (!responsiveMode) {
        if(!jQuery('body').hasClass("onestepcheckout-index-index")){
            jQuery('.left-help-menu .help-menu ol .elements-container').mCustomScrollbar({
                theme:  "dark-thin",
                callbacks:{
                    whileScrolling:function () {
                        if (this.mcs.top == 0) {
                            jQuery(this).removeClass('add-shadow');
                        } else {
                            jQuery(this).addClass('add-shadow');
                        }
                    }
                }
            });
        }
    }
    renderHelpMenu(true);
    var minH = jQuery('div.left-help-menu .help-menu ol.lvl0').outerHeight();
    jQuery('.col-main-menu').css('min-height',minH);

    renderWishlistMenu();
});

/**-----------------------------------------------------------------------------------**/
jQuery(window).scroll(function(){
    if (jQuery('body').hasClass('faqs-faq-view') && !isMobile) {
        var headerH = jQuery('.header-language-container').height() + cookieLawHeight;
        if (!responsiveMode) {
            headerH += jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
        }
        if (jQuery('.help-header').length) {
            headerH += jQuery('.help-header').outerHeight();
        }
        var dif = calculateHelpMenuPosition();
        jQuery('.left-help-menu .help-menu ol').each(function(){jQuery(this).css('top',headerH-dif);});
        if (jQuery('body').hasClass('faqs-faq-view') && jQuery(window).scrollTop()) {
            jQuery('div.left-help-menu .help-menu ol.opened').addClass('add-shadow');
        } else {
            jQuery('div.left-help-menu .help-menu ol.opened').removeClass('add-shadow');
        }
    } else if (jQuery('body').hasClass('wishlist-index-index')) {
        var wishListMenuPos = setWishlistMenuPosition();
        jQuery('.menu-wishlist').css('top',wishListMenuPos);
    }
});