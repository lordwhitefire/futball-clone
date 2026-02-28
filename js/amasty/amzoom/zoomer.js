if ('undefined' != typeof (jQuery)) {
    jQuery.noConflict();
}
var stopVideo = function (element) {
    var iframe = element.querySelector('iframe');
    var video = element.querySelector('video');
    if (iframe) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if (video) {
        video.pause();
    }
};
var AmZoomer = Class.create();
AmZoomer.prototype = ({
    zoomSettings: [],
    generalSettings: [],
    carouselSettings: [],
    lightboxSettings: [],

    initialize: function (settings) {
        if (settings['zoom'] || settings['general']) {
            this.zoomSettings = settings['zoom'];
            this.generalSettings = settings['general'];
            this.carouselSettings = settings['carousel'];
            this.lightboxSettings = settings['lightbox'];
        }
    },

    loadZoom: function () {
        if (this.generalSettings['zoom_enable'] === "1" || this.generalSettings['lightbox_enable'] === "1") {
            jQuery("#amasty_zoom").elevateZoom(this.zoomSettings);
        }
        //jQuery("#amasty_zoom").data('elevateZoom', this.zoomSettings);/*
        if (this.generalSettings['change_image'] != "0" && $("amasty_zoom") && $("amasty_gallery")) {
            var self = this;
            jQuery("#amasty_gallery a").bind(self.generalSettings['change_image'], function (e) {

                /*
                if (jQuery("#iframe-video").length) {
                    if(window.innerWidth > 1024){
                        
                            if(this.id == "iframe-video"){
                                jQuery("#file-image iframe").css("display", "block");
                                jQuery("#file-image #amasty_zoom").css("display", "none");
                                jQuery("#file-image .zoomContainer").css("display", "none");  
                            }
                            else{
                                jQuery("#file-image iframe").css("display", "none");
                                jQuery("#file-image #amasty_zoom").css("display", "block");
                                jQuery(".catalog-product-view .zoomContainer").css("display", "block");
                                jQuery("#file-image iframe").each(function() { 
                                    var src= jQuery(this).attr('src');
                                    jQuery(this).attr('src',src);  
                                });
                            } 
                    }else{
                        if(this.id == "iframe-video"){
                            jQuery("#file-image iframe").css("display", "block");
                            jQuery("#file-image iframe").css("width", "100%");
                            jQuery("#file-image iframe").css("left", "0");
                            jQuery("#file-image iframe").css("margin-left", "0");
                        }
                        else{
                            jQuery("#file-image iframe").css("display", "none");
                            jQuery("#file-image iframe").each(function() { 
                                var src= jQuery(this).attr('src');
                                jQuery(this).attr('src',src);  
                            });
                        } 
                    }
                }*/
                if (jQuery("#iframe-video").length) {
                    if (this.id == "iframe-video") {
                    } else {
                        // Example of using Active Gallery
                        jQuery('#amasty_gallery a').removeClass('active');
                        jQuery(this).addClass('active');
                        jQuery("#iframe-video").attr("data-image", jQuery(this).attr("data-image")).attr("data-zoom-image", jQuery(this).attr("data-zoom-image"));
                    }
                } else {
                    jQuery('#amasty_gallery a').removeClass('active');
                    jQuery(this).addClass('active');
                }
                var ez = jQuery('#amasty_zoom').data('elevateZoom');
                ez.swaptheimage(jQuery(this).attr("data-image"), jQuery(this).attr("data-zoom-image"));
                if (!self.generalSettings['thumbnail_lignhtbox'] === "1") {
                    return false;
                }
            });
        }

        if (this.generalSettings['lightbox_enable'] === "1" && $("amasty_zoom")) {
            jQuery("#amasty_zoom").bind("click", function (e) {
                var ez = jQuery("#amasty_zoom").data('elevateZoom');
                jQuery.fancybox(ez.getGalleryList(), AmZoomerObj.lightboxSettings);
                return false;
            });
            //fix mobile scroll issue
            var windowWidth = jQuery("body").width();
            if (560 > windowWidth) {
                var width = jQuery("#amasty_zoom").width();
                var height = jQuery("#amasty_zoom").height();
                jQuery("#amasty_zoom").parent().append('<div id="amasty_zoom_fix" style="position: absolute;top:0; background-color: transparent; z-index:9999; width: ' + width + 'px; height: ' + height + 'px;"></div>')
                jQuery("#amasty_zoom_fix").click(function () {
                    jQuery("#amasty_zoom").trigger("click");
                });
            }

        }
        if (this.generalSettings['thumbnail_lignhtbox'] === "1") {
            jQuery('.fancybox').fancybox(AmZoomerObj.lightboxSettings);
        }
        this.loadCarousel();
    },

    loadCarousel: function () {
        if (this.generalSettings['carousel_enable'] === "1" && $("amasty_zoom") && $("amasty_gallery")) {
            AmcarouFredSelObject.load();
            var auxSettings = this.carouselSettings;
            checkIfResponsive();
            if (!this.carouselSettings['items']) {
                var thumbsElements = jQuery("#amasty_gallery > a").length;
                var navWidth = jQuery('#prevGallery').outerWidth(true) + jQuery('#nextGallery').outerWidth(true);
                var navHeight = jQuery('#prevGallery').outerHeight(true) + jQuery('#nextGallery').outerHeight(true);
                var thumbSize = 56;
                if (this.carouselSettings['thumb']) {
                    thumbSize = this.carouselSettings['thumb'];
                }
                if (responsiveMode) {
                    if (this.carouselSettings['thumb_responsive'] && this.carouselSettings['thumb_responsive'] < thumbSize) {
                        thumbSize = this.carouselSettings['thumb_responsive'];
                    }
                    var numElements = (jQuery('.grancontenedor .columnayfoto .columnafotos').outerWidth() - 10) / (thumbSize + 10 + 5);
                    if ((thumbsElements < numElements) || (jQuery('#amasty_gallery img').css('display') == 'none')) {
                        numElements = thumbsElements;
                    } else {
                        //Si el numero d'elements que mostrarem no caben, hem de sumar els botons de navegacio
                        numElements = (jQuery('.grancontenedor .columnayfoto .columnafotos').outerWidth() - navWidth - 10) / (thumbSize + 10 + 5);
                    }
                    // RESPONSIVE - si existe el video de youtube, se debe ampliar el ancho del carouselWrapper, contamos 2 elementos mÃ¡s
                    if (jQuery(".videoIcoSheet")[0]) numElements = numElements + 4;

                    auxSettings['items'] = Math.floor(numElements);
                } else {
                    var numElements = (jQuery('.grancontenedor .columnayfoto .foto img').outerHeight()) / (thumbSize + 10 + 5); //hem de sumar el padding i el marge de les imatges
                    if (thumbsElements < numElements) {
                        numElements = thumbsElements;
                    } else {
                        //Si el numero d'elements que mostrarem no caben, hem de sumar els botons de navegacio
                        numElements = (jQuery('.grancontenedor .columnayfoto .foto img').outerHeight() - navHeight) / (thumbSize + 10 + 5);
                    }
                    auxSettings['items'] = Math.floor(numElements);
                }
            }
            jQuery('#amasty_gallery a img').width(thumbSize);
            jQuery('#amasty_gallery a img').height(thumbSize);
            jQuery("#amasty_gallery").carouFredSel(auxSettings);
            if (!responsiveMode) {
                var carouselWrapper = jQuery("#amasty_gallery").parent();
                carouselWrapper.height(carouselWrapper.height() + 5);
                /*
                console.log("GALLERY HEIGHT "+ carouselWrapper.height());					
                console.log("PADDING " + parseInt(jQuery('#amasty_gallery a').css('margin-top')));
                console.log("ITEMS " + this.carouselSettings['items']);
                console.log("AUX ITEMS " + auxSettings['items']);
                console.log("THUMB HEIGHT " + this.carouselSettings['thumb']);
                */
            }
            calculateCustomRelatedsLists();
        }

        if (this.carouselSettings['direction'] === "down" && $("amasty_gallery")) {
            var moveview = $$('.more-views.amvertical')[0];
            if (moveview && moveview.parentNode) {
                moveview.parentNode.setStyle({
                    position: 'relative'
                });
            }

        }
    }

});

Event.observe(window, 'load', function () {
    if ('undefined' != typeof (AmZoomerObj)) {
        AmZoomerObj.loadZoom();
    }
});

jQuery(document).ready(function () {
    if ('undefined' != typeof (AmZoomerObj)) {
        AmZoomerObj.loadCarousel();
    }
    if (jQuery("#iframe-video").length) {
        jQuery("#iframe-video").attr("data-image", jQuery("#amasty_gallery a.active").attr("data-image")).attr("data-zoom-image", jQuery("#amasty_gallery a.active").attr("data-zoom-image"));
    }
});