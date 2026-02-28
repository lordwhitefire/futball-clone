//<![CDATA[
var minianimation;
var haveDescription;
var fromShow;
var isLogged;
var account_urls;
var logout_url;
var inResponsive = false;
var inDesktop = false;
var openedUserResponsiveMenu = false;
var showMenu;
var filtersTopWidth;
var cookieLawHeight;
var navbarHeight = 0;
var totalHeight;
var isMobile = false;
var searchFormHeight;
var didScroll;
var delta = 5;
var lastScrollTop = 0;
var isMenuHidden = false;
var animating = false;
var animatingButtons = false;
var distanceScrolledTop = 0;

/**
 * DOM ready
 */
jQuery(window).on("scroll", bindScrollAction);
document.addEventListener('touchmove', function (evt) {
    if (showMenu) {
        evt.preventDefault()
    }
});
jQuery(window).load(function () {
    //Inicialització menú
    haveDescription = jQuery('#grid').find('#descriptionCat');
    //Mostrem menú en la página de categoria i home

    let body = jQuery('body');
    let search = jQuery('#search');
    if (body.hasClass('cms-home') || body.hasClass('cms-homekids')) {
        if (!responsiveMode) {
            jQuery('div.amshopby-filters-left').addClass('border');
            jQuery(".main-container").addClass('has-opened');
            jQuery(".footer-container").addClass('has-opened');
            jQuery(".pre-footer").addClass('has-opened');
            if (showMenu) {
                jQuery(".hidden-menu").addClass('show');
                jQuery('.box-hidden-menu').addClass('has-opened');
                jQuery('.box-icon-close-menu').addClass('has-opened');
            }
        }
    }

    if (!body.hasClass('onestepcheckout-index-index') && !body.hasClass('checkout-cart-index')) {
        if (search.val().length > 0) {
            search.addClass('not-empty');
        } else {
            search.removeClass('not-empty');
        }

        if (responsiveMode) {
            inResponsive = true;
        } else {
            inDesktop = true;
        }
    }

    search.blur(function () {
        if (search.val().length > 0) {
            search.addClass('not-empty');
        } else {
            search.removeClass('not-empty');
        }
    });

    jQuery('.header-minicart').on('click', function () {
        if (jQuery('.header-minicart  > a').hasClass('skip-active')) {
            close_menu_responsive();
            minianimation = setTimeout(function () {
                jQuery('.header-minicart a').removeClass('skip-active');
                jQuery('.header-minicart div').removeClass('skip-active');
            }, 10000);
        } else {
            clearTimeout(minianimation);
        }
    });
});

jQuery(document).ready(function () {

    isMobile = (window.innerWidth < 768);
    recalculateHeaderPositions();
    var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();

    if (jQuery('body').hasClass('customer-account') && !jQuery('body').hasClass('sales-guest-order-view')) {
        jQuery('.col-main').css('padding-top', menuHeight);
    }
    jQuery('.col-left-menu-container.avoid-fixed-menu').css('padding-top', totalHeight + menuHeight);

    filtersTopWidth = jQuery('.col-main-menu').width();
    decorateDataList('narrow-by-list2');
    // starting index
    var i = 0;
    //var tempo = 10000000;
    var slideRefresh = 6000;
    var animateTempo = 500;
    var fadeTempo = 300;
    var intervalVar;
    // find all slides
    var slides = jQuery('.main-slide');

    jQuery('#main-slider-next').click(function () {
        //slideNext();
    });

    jQuery('#main-slider-prev').click(function () {
        //slidePrev();
    });

    function animation1() {
        if (jQuery('.slider-wrapper').length) {
            jQuery('.slider-wrapper').fadeOut(fadeTempo);
            jQuery('.slider-wrapper').animate(
                {'left': -(slides.eq(i).position().left)},
                animateTempo,
                function () {
                    jQuery('.slider-wrapper').fadeIn(fadeTempo);
                }
            );
        }
    }

    function animation2() {
        if (jQuery('.slider-wrapper').length) {
            jQuery('.slider-wrapper').animate(
                {opacity: 0.0, 'left': -(slides.eq(i).position().left)},
                animateTempo,
                function () {
                    jQuery('.slider-wrapper').animate({opacity: 1}, animateTempo);
                }
            );
        }
    }

    function animation3() {
        // highlight, shake, bounce
        if (jQuery('.slider-wrapper').length) {
            jQuery('.slider-wrapper').toggle('bounce', 600);
            jQuery('.slider-wrapper').animate(
                {'left': -(slides.eq(i).position().left)},
                500,
                function () {
                    //jQuery('.slider-wrapper').animate({width: "show"}, animateTempo);
                    jQuery('.slider-wrapper').fadeIn(600);
                }
            );
        }
    }

    function slideNext() {
        slideClear();

        // find next index
        // i + 1 or 0 if end of slides
        i = ++i % slides.length;
        // scroll to that index
        animation1();

        slideAuto();
    }

    function slidePrev() {
        slideClear();

        // find next index
        // i + 1 or 0 if end of slides
        i = --i % slides.length;

        // scroll to that index
        animation1();

        slideAuto();
    }

    function slideClear() {
        if (intervalVar) {
            clearTimeout(intervalVar);
        }
    }

    function slideAuto() {
        intervalVar = setTimeout(slideFunc, slideRefresh);
    }

    function slideFunc() {
        slideNext();
    }

    // slide begins
    slideAuto();
    var newsletter_id = jQuery('#newsletter-validate-detail-box > div').data('newsletter_id');
    jQuery('#newsletter_subs_box' + newsletter_id).click(function (e) {
        var valid_email = false;
        if (jQuery('#newsletter' + newsletter_id).val() == '') {
            jQuery('#empty-email-newsletter' + newsletter_id).show();
            jQuery('#newsletter' + newsletter_id).css('border', '1px red solid');
        } else if (!isValidEmail(jQuery('#newsletter' + newsletter_id).val())) {
            jQuery('#validate-email-newsletter' + newsletter_id).show();
            jQuery('#empty-email-newsletter' + newsletter_id).hide();
            jQuery('#newsletter' + newsletter_id).css('border', '1px red solid');
        } else {
            jQuery('#validate-email-newsletter' + newsletter_id).hide();
            jQuery('#empty-email-newsletter' + newsletter_id).hide();
            jQuery('#newsletter' + newsletter_id).css('border', 'none');
            valid_email = true;
        }

        if (!valid_email) {
            e.preventDefault();
            return false;
        }
    });
    var newsletterSubscriberFormDetailBox = new VarienForm('newsletter-validate-detail-box');
    if (isMobile) {
        jQuery('.toolbar').height(jQuery('.toolbar .sorter').height());
    }
    jQuery('.header-language-container .box-switch-menu .menu-groups .menu-group-select .menu-group-select-container').mouseover(function () {
        jQuery(this).addClass('opened');
        jQuery('.menu-group-select-options-container .menu-group-select-options .filter-input-container').removeClass('add-shadow');
    });

    jQuery('.header-language-container .box-switch-menu .menu-groups .menu-group-select .menu-group-select-container').mouseleave(function () {
        jQuery('.header-language-container .box-switch-menu .menu-groups .menu-group-select .menu-group-select-container').removeClass('opened');
    });

    jQuery('.header-language-container .box-switch-menu .menu-groups .menu-group-select .menu-group-select-container .menu-group-select-arrow .menu-group-select-options-container .menu-group-select-options input').on('keypress keyup', function () {
        var value = jQuery(this).val().toLowerCase();
        if (value != '') {
            jQuery(this).parent().parent().parent().find('ul li a').each(function () {
                var t = jQuery(this).text();
                var pos = t.toLowerCase().indexOf(value);
                if (pos > -1) {
                    var t = jQuery(this).text();
                    var first = t.substring(0, pos);
                    if (first) first = '<b>' + first + '</b>';
                    var middle = t.substring(pos, pos + value.length);
                    var last = t.substring(pos + value.length);
                    if (last) last = '<b>' + last + '</b>';
                    jQuery(this).html(first + middle + last);
                    jQuery(this).parent().removeClass('hide');
                } else {
                    jQuery(this).parent().addClass('hide');
                }
            });
        } else {
            jQuery(this).parent().parent().parent().find('ul li a').each(function () {
                var t = jQuery(this).text();
                jQuery(this).html(t);
            });
            jQuery(this).parent().parent().parent().find('ul li').removeClass('hide');
        }
    });

    jQuery('.menu-groups-responsive .menu-select-options .menu-group-select-options .filter-input-container .filter-input input').on('keypress keyup', function () {
        var value = jQuery(this).val().toLowerCase();
        if (value != '') {
            jQuery(this).parent().parent().parent().find('ul li a').each(function () {
                if (jQuery(this).text().toLowerCase().indexOf(value) > -1) {
                    jQuery(this).parent().removeClass('hide');
                } else {
                    jQuery(this).parent().addClass('hide');
                }
            });
        } else {
            jQuery(this).parent().parent().parent().find('ul li').removeClass('hide');
        }
    });

    jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories > li.level0 > div.menu-container > .filter-input-container > .filter-input > input').on('keypress keyup', function () {
        var value = jQuery(this).val().toLowerCase();
        if (value != '') {
            jQuery(this).parent().parent().parent().find('ol li a').each(function () {
                if (jQuery(this).text().toLowerCase().indexOf(value) > -1) {
                    jQuery(this).parent().removeClass('hide');
                } else {
                    jQuery(this).parent().addClass('hide');
                }
            });
        } else {
            jQuery(this).parent().parent().parent().find('ol li').removeClass('hide');
        }
    });

    // mostramos el subheader
    jQuery('.banner-fm-all').css('visibility', 'visible');

});

jQuery(window).resize(function () {
    isMobile = (window.innerWidth < 768 ? true : false);
    filtersTopWidth = jQuery('.col-main-menu').width();
    if (jQuery('div.amshopby-filters-top').hasClass('scroll')) {
        jQuery('div.amshopby-filters-top').css('width', filtersTopWidth);
    }
    recalculateHeaderPositions();
    var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();

    if (jQuery('body').hasClass('customer-account') && !jQuery('body').hasClass('sales-guest-order-view')) {
        var level1Height = jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories li.level0 > .menu-container.listHover').outerHeight();
        jQuery('.col-main').css('padding-top', menuHeight + level1Height);
    }
    jQuery('.col-left-menu-container.avoid-fixed-menu').css('padding-top', totalHeight + menuHeight);

    if (!isMobile) {
        jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', '');
        jQuery('body.is-responsive .filters-top-buttons-responsive').removeClass('set-fixed');
        jQuery('body.is-responsive .toolbar .sorter').css('top', '');
        jQuery('body.is-responsive .toolbar').removeClass('set-fixed');
    }
    if (isMobile) {
        jQuery('.toolbar').height(jQuery('.toolbar .sorter').height());
    } else {
        jQuery('.toolbar').height('');
    }
});

/**
 * END DOM ready
 */

function unlock() {
    jQuery(".amshopby-filters-left .amshopby-advanced .list-categories").css('height', 'initial');
    if (fromShow) {
        jQuery('div.amshopby-filters-left').addClass('border');
    }
    isBlocked = 0;
}

function scrollbarWidth() {
    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
        $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
        inner = $inner[0],
        outer = $outer[0];

    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();
    return (width1 - width2);
}

function is_draggable(element) {
    return element.hasClass("ui-draggable") || element.find('.ui-draggable').length;
}


function recalculateHeaderPositions() {
    if (jQuery('#v-cookielaw').hasClass('is-showed')) {
        cookieLawHeight = jQuery('#v-cookielaw').innerHeight();
    } else {
        cookieLawHeight = 0;
    }
    if (jQuery('body.is-responsive .header-style .box-switch-menu .search-form').hasClass('opened')) {
        searchFormHeight = jQuery('body.is-responsive .header-style .box-switch-menu .search-form').innerHeight();
    } else {
        searchFormHeight = 0;
    }
    navbarHeight = jQuery('.header-language-background .header-language-container').outerHeight();
    // Para mobile sumamos el alto del cuadro de búsqueda
    if (isMobile) {
        if (jQuery(window).width() > 359) {
            searchHeight = 50;
        } else {
            searchHeight = 50;
        }
        //navbarHeight = navbarHeight + jQuery('#search_mini_form').innerHeight();
        navbarHeight = navbarHeight + searchHeight;
    }

    totalHeight = cookieLawHeight + navbarHeight;
    if (responsiveMode) {
        if (isMenuHidden) {
            jQuery('.header-language-background .header-language-container').css('top', '-' + navbarHeight + 'px');
            // jQuery('div.amshopby-filters-left').css('top',cookieLawHeight);
            if (jQuery('body').hasClass('faqs-faq-view')) {
                jQuery('.help-header.responsive-header').css('top', cookieLawHeight);
            }
        } else {
            jQuery('.header-language-background .header-language-container').css('top', cookieLawHeight);
            // jQuery('div.amshopby-filters-left').css('top',cookieLawHeight);
            if (jQuery('body').hasClass('faqs-faq-view')) {
                var headerHResponsive = jQuery('.header-language-container').height() + cookieLawHeight;
                jQuery('.help-header.responsive-header').css('top', headerHResponsive);
            }
        }
        //var userMenuPosition = cookieLawHeight + searchFormHeight + jQuery('body.is-responsive .header-style .box-right-menu').outerHeight();
        var userMenuPosition = cookieLawHeight + searchFormHeight + jQuery('body.is-responsive .header-style .box-right-menu #toplogin').outerHeight();
        if (jQuery(window).width() > 767) { // Para tablet
            jQuery('body.is-responsive #toplogin #loginform-box').css('top', userMenuPosition + 8);
        } else {
            jQuery('body.is-responsive #toplogin #loginform-box').css('top', userMenuPosition);
        }

        jQuery('body.is-responsive #toplogin #loginform-box').css('height', 'calc(100% - ' + userMenuPosition + ')');
        jQuery('div#logged-backdrop').css('top', userMenuPosition);
        jQuery('div#logged-backdrop').css('height', 'calc(100% - ' + userMenuPosition + ')');
    } else {
        if (isMenuHidden) {
            jQuery('.header-language-background .header-language-container').css('top', '-' + navbarHeight + 'px');
            jQuery('div.amshopby-filters-left').css('top', cookieLawHeight);
        } else {
            var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();
            var level1Height = jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories li.level0 > .menu-container.listHover').outerHeight();
            var totalH = totalHeight + menuHeight + level1Height;
            jQuery('.header-language-background .header-language-container').css('top', cookieLawHeight);
            jQuery('div.amshopby-filters-left').css('top', totalHeight);
        }
        jQuery('#toplogin .loginform.backdrop').css('top', cookieLawHeight);
    }
    if (jQuery('.header-language-background').hasClass('simple')) {
        jQuery('.onestepcheckout-index-index .main-container').css('padding-top', totalHeight);
        jQuery('.checkout-cart-index .main-container').css('padding-top', totalHeight);
    }
}

function bindScrollAction() {
    didScroll = true;
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    var currentScroll = jQuery(window).scrollTop();
    if (currentScroll == 0) {
        jQuery('div.amshopby-filters-left .amshopby-advanced').removeClass('add-shadow');
        jQuery('body:not(.is-responsive) div.amshopby-filters-left .amshopby-advanced ol.list-categories > li.level0 > div.menu-container').removeClass('add-shadow');
        jQuery('.header-language-background .header-language-container').removeClass('responsive-shadow');
        jQuery('.help-header').removeClass('show-shadow');
    }
    filtersTopWidth = jQuery('.col-main-menu').width();
}

function hasScrolled() {
    var minDistanceTopToShow = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();
    var st = jQuery(this).scrollTop();
    if (st < 0) st = 0;		/* upgrade iphone */

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st && jQuery('.help-header').length) {
        jQuery('.help-header').addClass('show-shadow');
    }
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    //if (st > lastScrollTop && st > navbarHeight){
    var headerLanguageContainer = jQuery('.header-language-container').outerHeight(true);
    if (!responsiveMode) {
        minDistanceTopToShow += headerLanguageContainer;
    }
    if (jQuery('body').hasClass('checkout-cart-index') || jQuery('body').hasClass('onestepcheckout-index-index') || responsiveMode) {
        minDistanceTopToShow = headerLanguageContainer;
    }
    if ((st > lastScrollTop) && (minDistanceTopToShow > st) && !isMenuHidden)
        return;

    // --------------------------------------------------
    // RESPONSIVE : TABLET Y MOBILE
    // --------------------------------------------------
    if (responsiveMode && !jQuery('body').hasClass('cms-home') && !jQuery('body').hasClass('cms-homekids')) {
        if (!showMenu) {
            if (st > lastScrollTop) {
                // Scroll Down
                distanceScrolledTop = 0;
                if (!animating) {
                    /* OMITSIS - Start remove animation */
                    // animating = true;
                    // jQuery('.header-language-background .header-language-container').animate({
                    //     'top': '-'+(navbarHeight+searchFormHeight)+'px'},
                    //     150,
                    //     function(){
                    //         animating = false;
                    //         jQuery(this).addClass('is-hidden');
                    //         if (!jQuery('body.is-responsive .toolbar').hasClass('set-fixed')) {
                    //             jQuery(this).addClass('responsive-shadow');
                    //         }
                    //         if (jQuery('.header-style .box-switch-menu .search-form').hasClass('opened') && !jQuery('.header-style .box-switch-menu .search-form').hasClass('is-hide')) {
                    //             jQuery('.header-style .box-switch-menu .search-form').addClass('is-hide');
                    //             // jQuery('.header-style .box-switch-menu .search-form').slideToggle('150');
                    //         }
                    //     }
                    // );
                    // jQuery('div.amshopby-filters-left .amshopby-advanced').addClass('add-shadow');
                    // if (jQuery('body').hasClass('faqs-faq-view')) {
                    //     /* Mou també el header de la zona d'ajuda */
                    //     jQuery('.help-header.responsive-header').animate({
                    //         'top': cookieLawHeight}, 200, function(){ animating = false; }
                    //     );
                    //     if (isMobile) {
                    //         if (jQuery('body').hasClass('faqs-faq-view')) {
                    //             /* Mou també el header de la zona d'ajuda */
                    //             var helpMenuFixed = jQuery('.help-header.responsive-header').outerHeight() + cookieLawHeight;
                    //             jQuery('.left-help-menu .help-menu ol.opened').animate({
                    //                 'top': helpMenuFixed}, 200, function(){ animating = false; }
                    //             );
                    //         }
                    //     }
                    // }
                    // isMenuHidden = true;
                    jQuery('.header-language-background .header-language-container').css({'top': '-' + (navbarHeight + searchFormHeight) + 'px'});
                    jQuery('.header-language-background .header-language-container').addClass('is-hidden');
                    if (!jQuery('body.is-responsive .toolbar').hasClass('set-fixed')) {
                        jQuery('.header-language-background .header-language-container').addClass('responsive-shadow');
                    }
                    if (jQuery('.header-style .box-switch-menu .search-form').hasClass('opened') && !jQuery('.header-style .box-switch-menu .search-form').hasClass('is-hide')) {
                        jQuery('.header-style .box-switch-menu .search-form').addClass('is-hide');
                        // jQuery('.header-style .box-switch-menu .search-form').slideToggle('150');
                    }
                    jQuery('div.amshopby-filters-left .amshopby-advanced').addClass('add-shadow');
                    if (jQuery('body').hasClass('faqs-faq-view')) {
                        /* Mou també el header de la zona d'ajuda */
                        jQuery('.help-header.responsive-header').css({'top': cookieLawHeight});
                        if (isMobile) {
                            if (jQuery('body').hasClass('faqs-faq-view')) {
                                /* Mou també el header de la zona d'ajuda */
                                var helpMenuFixed = jQuery('.help-header.responsive-header').outerHeight() + cookieLawHeight;
                                jQuery('.left-help-menu .help-menu ol.opened').css({'top': helpMenuFixed});
                            }
                        }
                    }
                    isMenuHidden = true;
                    /* OMITSIS - End remove animation */
                }
                if (isMobile) {
                    if (st > (jQuery('body h1.description-title').outerHeight() + jQuery('body .header-grid').outerHeight() + jQuery('.col-left-menu-container.avoid-fixed-menu').outerHeight()) - cookieLawHeight) {
                        if (animatingButtons) {
                            jQuery('body.is-responsive .filters-top-buttons-responsive').finish();
                            jQuery('body.is-responsive .toolbar .sorter').finish();
                        }
                        jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', cookieLawHeight - 11);
                        jQuery('body.is-responsive .filters-top-buttons-responsive').addClass('set-fixed');
                        jQuery('body.is-responsive .toolbar .sorter').css('top', cookieLawHeight - 1);
                        jQuery('body.is-responsive .toolbar').addClass('set-fixed');
                        jQuery('.header-language-background .header-language-container').removeClass('responsive-shadow');
                    } else {
                        if (animatingButtons) {
                            jQuery('body.is-responsive .filters-top-buttons-responsive').finish();
                            jQuery('body.is-responsive .toolbar .sorter').finish();
                        }
                        jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', '');
                        jQuery('body.is-responsive .filters-top-buttons-responsive').removeClass('set-fixed');
                        jQuery('body.is-responsive .toolbar').removeClass('set-fixed');
                        jQuery('body.is-responsive .toolbar .sorter').css('top', '');
                        if (jQuery('.header-language-background .header-language-container').hasClass('is-hidden')) {
                            jQuery('.header-language-background .header-language-container').addClass('responsive-shadow');
                        }
                    }
                } else {
                    if (animatingButtons) {
                        jQuery('body.is-responsive .filters-top-buttons-responsive').finish();
                        jQuery('body.is-responsive .toolbar .sorter').finish();
                    }
                    jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', '');
                    jQuery('body.is-responsive .filters-top-buttons-responsive').removeClass('set-fixed');
                    jQuery('body.is-responsive .toolbar .sorter').css('top', '');
                    jQuery('body.is-responsive .toolbar').removeClass('set-fixed');
                    if (jQuery('.header-language-background .header-language-container').hasClass('is-hidden') && responsiveMode) {
                        jQuery('.header-language-background .header-language-container').addClass('responsive-shadow');
                    }
                }
            } else if (st + jQuery(window).height() < jQuery(document).height()) {
                // Scroll Up
                distanceScrolledTop += lastScrollTop - st;
                if (!animating && (distanceScrolledTop > 1000 || st < minDistanceTopToShow)) {
                    /* OMITSIS - Start remove animation */
                    // animating = true;
                    // jQuery('.header-language-background .header-language-container').animate({
                    //     'top': cookieLawHeight},
                    //     200,
                    //     function(){
                    //         animating = false;
                    //         jQuery(this).removeClass('is-hidden');
                    //         jQuery(this).removeClass('responsive-shadow');
                    //         if (jQuery('.header-style .box-switch-menu .search-form').hasClass('opened') && jQuery('.header-style .box-switch-menu .search-form').hasClass('is-hide')) {
                    //             jQuery('.header-style .box-switch-menu .search-form').removeClass('is-hide');
                    //             // jQuery('.header-style .box-switch-menu .search-form').slideToggle('150');
                    //         }
                    //     }
                    // );
                    // if (jQuery('body').hasClass('faqs-faq-view')) {
                    //     /* Mou també el header de la zona d'ajuda */
                    //     jQuery('div.amshopby-filters-left .amshopby-advanced').removeClass('add-shadow'); // Eliminem l'ombra del menú
                    //     var headerHMobile = jQuery('.header-language-container').height() + cookieLawHeight;
                    //     jQuery('.help-header.responsive-header').animate({
                    //         'top': headerHMobile}, 200, function(){ animating = false; }
                    //     );
                    //     if (isMobile) {
                    //         var helpMenuFixed = jQuery('.header-language-container').height() + jQuery('.help-header.responsive-header').outerHeight() + cookieLawHeight;
                    //         jQuery('.left-help-menu .help-menu ol.opened').animate({
                    //             'top': helpMenuFixed}, 200, function(){ animating = false; }
                    //         );
                    //         jQuery('.help-header.responsive-header').removeClass('show-shadow');
                    //     }
                    // }
                    // if (isMobile) {
                    //     if (st > (jQuery('body h1.description-title').outerHeight() + jQuery('body .header-grid').outerHeight() + jQuery('.col-left-menu-container.avoid-fixed-menu').outerHeight()) - cookieLawHeight - navbarHeight - searchFormHeight) {
                    //         animatingButtons = true;
                    //         jQuery('body.is-responsive .filters-top-buttons-responsive').animate({
                    //                 'top': cookieLawHeight + navbarHeight + searchFormHeight - 11
                    //             },
                    //             200,
                    //             function () {
                    //                 jQuery(this).addClass('set-fixed');
                    //                 animatingButtons = false;
                    //             }
                    //         );
                    //         jQuery('body.is-responsive .toolbar .sorter').animate({
                    //                 'top': cookieLawHeight + navbarHeight + searchFormHeight - 1
                    //             },
                    //             200,
                    //             function () {
                    //                 jQuery(this).parent().addClass('set-fixed');
                    //                 animatingButtons = false;
                    //             }
                    //         );
                    //     }
                    // }
                    // isMenuHidden = false;
                    jQuery('.header-language-background .header-language-container').css({'top': cookieLawHeight});
                    jQuery('.header-language-background .header-language-container').removeClass('is-hidden');
                    jQuery('.header-language-background .header-language-container').removeClass('responsive-shadow');
                    if (jQuery('.header-style .box-switch-menu .search-form').hasClass('opened') && jQuery('.header-style .box-switch-menu .search-form').hasClass('is-hide')) {
                        jQuery('.header-style .box-switch-menu .search-form').removeClass('is-hide');
                        // jQuery('.header-style .box-switch-menu .search-form').slideToggle('150');
                    }
                    if (jQuery('body').hasClass('faqs-faq-view')) {
                        /* Mou també el header de la zona d'ajuda */
                        jQuery('div.amshopby-filters-left .amshopby-advanced').removeClass('add-shadow'); // Eliminem l'ombra del menú
                        var headerHMobile = jQuery('.header-language-container').height() + cookieLawHeight;
                        jQuery('.help-header.responsive-header').css({'top': headerHMobile});
                        if (isMobile) {
                            var helpMenuFixed = jQuery('.header-language-container').height() + jQuery('.help-header.responsive-header').outerHeight() + cookieLawHeight;
                            jQuery('.left-help-menu .help-menu ol.opened').css({'top': helpMenuFixed});
                            jQuery('.help-header.responsive-header').removeClass('show-shadow');
                        }
                    }
                    if (isMobile) {
                        if (st > (jQuery('body h1.description-title').outerHeight() + jQuery('body .header-grid').outerHeight() + jQuery('.col-left-menu-container.avoid-fixed-menu').outerHeight()) - cookieLawHeight - navbarHeight - searchFormHeight) {
                            animatingButtons = true;
                            jQuery('body.is-responsive .filters-top-buttons-responsive').css({'top': cookieLawHeight + navbarHeight + searchFormHeight - 11});
                            jQuery('body.is-responsive .filters-top-buttons-responsive').addClass('set-fixed');
                            jQuery('body.is-responsive .toolbar .sorter').css({'top': cookieLawHeight + navbarHeight + searchFormHeight - 1});
                            jQuery('body.is-responsive .toolbar .sorter').parent().addClass('set-fixed');
                        }
                    }
                    isMenuHidden = false;
                    /* OMITSIS - End remove animation */
                }
                if (isMobile) {
                    if (st > (jQuery('body h1.description-title').outerHeight() + jQuery('body .header-grid').outerHeight() + jQuery('.col-left-menu-container.avoid-fixed-menu').outerHeight()) - cookieLawHeight - navbarHeight - searchFormHeight) {
                        if (!animating && (distanceScrolledTop > 1000 || st < minDistanceTopToShow)) {
                            jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', cookieLawHeight + navbarHeight + searchFormHeight - 11);
                            jQuery('body.is-responsive .filters-top-buttons-responsive').addClass('set-fixed');
                            jQuery('body.is-responsive .toolbar .sorter').css('top', cookieLawHeight + navbarHeight + searchFormHeight - 1);
                            jQuery('body.is-responsive .toolbar').addClass('set-fixed');
                        }
                    } else {
                        if (animatingButtons) {
                            jQuery('body.is-responsive .filters-top-buttons-responsive').finish();
                            jQuery('body.is-responsive .toolbar .sorter').finish();
                        }
                        jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', '');
                        jQuery('body.is-responsive .filters-top-buttons-responsive').removeClass('set-fixed');
                        jQuery('body.is-responsive .toolbar .sorter').css('top', '');
                        jQuery('body.is-responsive .toolbar').removeClass('set-fixed');
                    }
                } else {
                    if (animatingButtons) {
                        jQuery('body.is-responsive .filters-top-buttons-responsive').finish();
                        jQuery('body.is-responsive .toolbar .sorter').finish();
                    }
                    jQuery('body.is-responsive .filters-top-buttons-responsive').css('top', '');
                    jQuery('body.is-responsive .filters-top-buttons-responsive').removeClass('set-fixed');
                    jQuery('body.is-responsive .toolbar .sorter').css('top', '');
                    jQuery('body.is-responsive .toolbar').removeClass('set-fixed');
                }
            }
        }
        // -------------------------
        // DESKTOP
        // -------------------------
    } else if (!jQuery('body').hasClass('cms-home') && !jQuery('body').hasClass('cms-homekids')) {
        if (st > lastScrollTop) {
            distanceScrolledTop = 0;
            // Scroll Down
            if (!animating) {
                /* OMITSIS - Start remove animation */
                // animating = true;
                // var headerNewPos = navbarHeight - cookieLawHeight;
                // jQuery('.header-language-background .header-language-container').animate({
                //         'top': '-'+headerNewPos+'px'}, 200, function(){ animating = false; jQuery(this).addClass('is-hidden'); }
                // );
                // var menuNewPos = cookieLawHeight + jQuery('div.amshopby-filters-left').outerHeight();
                // jQuery('div.amshopby-filters-left').animate({
                //         'top': '-'+menuNewPos}, 200, function(){ animating = false; }
                // );
                // if (!jQuery('body').hasClass('customer-account')) {
                //     jQuery('body .main-container').css('margin-top','');
                // }
                // // jQuery('div.amshopby-filters-left .amshopby-advanced').addClass('add-shadow');
                // /* Mou també el menú de la zona d'usuari */
                // if (jQuery('body').hasClass('faqs-faq-view')) {
                //     /* Mou també el header de la zona d'ajuda */
                //     jQuery('div.amshopby-filters-left .amshopby-advanced').removeClass('add-shadow'); // Eliminem l'ombra del menú
                //     var headerHDesktop = cookieLawHeight;
                //     jQuery('.help-header.desktop-header').animate({
                //         'top': headerHDesktop}, 200, function(){ animating = false; }
                //     );
                // }
                // jQuery("#search").blur();
                // isMenuHidden = true;
                var headerNewPos = navbarHeight + cookieLawHeight;
                jQuery('.header-language-background .header-language-container').css({'top': '-' + headerNewPos + 'px'});
                jQuery('.header-language-background .header-language-container').addClass('is-hidden');
                var menuNewPos = cookieLawHeight + jQuery('div.amshopby-filters-left').outerHeight();
                jQuery('div.amshopby-filters-left').css({'top': '-' + menuNewPos + 'px'});
                if (!jQuery('body').hasClass('customer-account')) {
                    jQuery('body .main-container').css('margin-top', '');
                }
                // jQuery('div.amshopby-filters-left .amshopby-advanced').addClass('add-shadow');
                /* Mou també el menú de la zona d'usuari */
                if (jQuery('body').hasClass('faqs-faq-view')) {
                    /* Mou també el header de la zona d'ajuda */
                    jQuery('div.amshopby-filters-left .amshopby-advanced').removeClass('add-shadow'); // Eliminem l'ombra del menú
                    var headerHDesktop = cookieLawHeight;
                    jQuery('.help-header.desktop-header').css('top', headerHDesktop);
                }
                jQuery("#search").blur();
                isMenuHidden = true;
                /* OMITSIS - End remove animation */
            }
        } else if (st + jQuery(window).height() < jQuery(document).height()) {
            // Scroll Up
            distanceScrolledTop += lastScrollTop - st;
            if (!animating && (distanceScrolledTop > 1000 || st < minDistanceTopToShow)) {
                /* OMITSIS - Start remove animation */
                // animating = true;
                // jQuery('.header-language-background .header-language-container').animate({
                //         'top': cookieLawHeight}, 200, function(){ animating = false; jQuery(this).removeClass('is-hidden'); }
                // );
                // jQuery('div.amshopby-filters-left').animate({
                //         'top': totalHeight+'px'}, 200, function(){ animating = false; }
                // );
                // var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();
                // var level1Height = jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories li.level0 > .menu-container.listHover').outerHeight();
                // var blockAccountPos = totalHeight+menuHeight+level1Height;
                // if (jQuery('body').hasClass('faqs-faq-view')) {
                //     /* Mou també el header de la zona d'ajuda */
                //     var headerHDesktop = jQuery('.header-language-container').height() + cookieLawHeight + jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
                //     jQuery('.help-header.desktop-header').animate({
                //         'top': headerHDesktop}, 200, function(){ animating = false; }
                //     );
                // }
                // isMenuHidden = false;
                jQuery('.header-language-background .header-language-container').css({'top': cookieLawHeight});
                jQuery('.header-language-background .header-language-container').removeClass('is-hidden');
                jQuery('div.amshopby-filters-left').css({'top': totalHeight + 'px'});
                var menuHeight = jQuery('div.amshopby-filters-left .amshopby-advanced').outerHeight();
                var level1Height = jQuery('div.amshopby-filters-left .amshopby-advanced ol.list-categories li.level0 > .menu-container.listHover').outerHeight();
                var blockAccountPos = totalHeight + menuHeight + level1Height;
                if (jQuery('body').hasClass('faqs-faq-view')) {
                    /* Mou també el header de la zona d'ajuda */
                    var headerHDesktop = jQuery('.header-language-container').height() + cookieLawHeight + jQuery('.col-left-menu .block-layered-nav.amshopby-filters-left').height();
                    jQuery('.help-header.desktop-header').css({'top': headerHDesktop});
                }
                isMenuHidden = false;
                /* OMITSIS - End remove animation */
            }
        }
    }

    lastScrollTop = st;
}

function toggleSizes(sizeColumn) {
    jQuery('.sizes .tallas-filtro-column').addClass('hide-column');
    jQuery('.sizes .tallas-filtro-column.' + sizeColumn).removeClass('hide-column');
    jQuery('.sizes-options li').removeClass('opened');
    jQuery('.sizes-options li.' + sizeColumn).addClass('opened');
}

function toggleSelection(attributeCode, optionId) {
    if (attributeCode == "toolbar-sorter") {
        jQuery('.toolbar-sorter .filter-options li').removeClass('selected');
        jQuery('.toolbar-sorter .filter-options #id-'+optionId).addClass('selected');
        jQuery(".overlay-loading").show();
    } else {
        if (attributeCode == 'fm_tallas_filtro') {
            var filterOption = jQuery('.filter-options #id-' + optionId + ' > a');
        } else {
            var filterOption = jQuery('.filter-options #id-' + optionId);
        }
        if (filterOption.hasClass('selected')) {
            filterOption.removeClass('selected');
        } else {
            filterOption.addClass('selected');
        }
    }
    return false;
}

function openLoginFromWishlistDialog(id) {
    closeDialog(id);
    if (responsiveMode) {
        var linkBlock = jQuery('body.is-responsive #toplogin .login-menu .container .link-block.login');
        linkBlock.addClass('opened');
        linkBlock.siblings().css('display', 'block');
    }
}

//]]>