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

var checkRedirect = false;

function setAccountTypePost(type, urlRedirect){
    var dataPost = '&'+ type + '=' +urlRedirect;
    try{
        jQuery.ajax({
            url: accountTypeUrlPost,
            dataType: 'json',
            type : 'post',
            data: dataPost
        });
    }catch (e) {
    }
}

jQuery(window).load(function(){
    jQuery('#seeAccount').click(function(){
        var data = '&edit='+accountEditUrl;
        try{
            jQuery.ajax({
                url: accountTypeUrlPost,
                dataType: 'json',
                type : 'post',
                data: data
            });
        }catch (e) {
        }
    });
    jQuery('#becomePartner').click(function(){
        var data = '&becomePartner='+accountEditUrl;
        try{
            jQuery.ajax({
                url: accountTypeUrlPost,
                dataType: 'json',
                type : 'post',
                data: data
            });
        }catch (e) {
        }
    });

    /*************************************
     ***Set Tipologia (Adulto-Infantil)***
     *************************************/
    if(tipologiaHeader == 1){
        jQuery('.box-hidden-menu').addClass('adulto-selected');
        jQuery('.switch-home-links .switch-home-link.kid').removeClass('selected');
        jQuery('.home-links .home-link.kid').removeClass('selected');
        jQuery('.switch-home-links .switch-home-link.adult').addClass('selected');
        jQuery('.home-links .home-link.adult').addClass('selected');
    }else{
        jQuery('.box-hidden-menu').addClass('infantil-selected');
        jQuery('.switch-home-links .switch-home-link.kid').addClass('selected');
        jQuery('.home-links .home-link.kid').addClass('selected');
        jQuery('.switch-home-links .switch-home-link.adult').removeClass('selected');
        jQuery('.home-links .home-link.adult').removeClass('selected');
    }

    if(jQuery('body').hasClass('cms-home') || jQuery('body').hasClass('cms-homekids') || jQuery('body').hasClass('catalog-category-view')){
        checkRedirect = true;
    }else{
        checkRedirect = false;
    }

    jQuery(document).on('click', '.text-switch a', function(e){
        if(!jQuery(this).parent().hasClass('selected')){
            e.preventDefault();
            jQuery('.onoffswitch :checkbox').trigger('click');
        }
    });

    jQuery(document).on('click', '.switch-home-links-container .switch-home-links .switch-home-link', function(e){
        if(!jQuery(this).hasClass('selected')){
            jQuery('.switch-home-links-container .switch-home-links .switch-home-link').toggleClass('selected');
            jQuery('.home-links .home-link').toggleClass('selected');
        }
    });

    jQuery(document).on('click', '.home-links .home-link', function(e){
        if(!jQuery(this).hasClass('selected')){
            jQuery('.switch-home-links-container .switch-home-links .switch-home-link').toggleClass('selected');
            jQuery('.home-links .home-link').toggleClass('selected');
        }
    });

    jQuery('.onoffswitch-switch').draggable({
        containment: "parent",
        start: function(event, ui){
            jQuery(this).removeClass('animate');
        },
        stop: function(event, ui){
            jQuery(this).addClass('animate');
            jQuery('.onoffswitch-label').addClass('unclickable');
            jQuery('.text-switch').addClass('unclickable');
            if(ui.originalPosition.left > ui.position.left) {
                if (ui.originalPosition.left > ui.position.left+8) {
                    jQuery(this).css('left', 0);
                    jQuery('.upper-box-switch .text-switch').toggleClass('selected');
                    window.location.href = redirectAdulto;
                } else {
                    jQuery(this).css('left', "calc(100% - 29px)");
                    jQuery('.onoffswitch-label').removeClass('unclickable');
                    jQuery('.text-switch').removeClass('unclickable');
                }
            } else {
                if (ui.originalPosition.left < ui.position.left-8) {
                    jQuery(this).css('left', "calc(100% - 29px)");
                    jQuery('.upper-box-switch .text-switch').toggleClass('selected');
                    window.location.href = redirectInfantil;
                } else {
                    jQuery(this).css('left', 0);
                    jQuery('.onoffswitch-label').removeClass('unclickable');
                    jQuery('.text-switch').removeClass('unclickable');
                }
            }
        }
    });

    jQuery(document).on('change', '.onoffswitch :checkbox', function(){
        jQuery('.onoffswitch-label').addClass('unclickable');
        jQuery('.text-switch').addClass('unclickable');
        if(tipologiaHeader == 2){
            //Show Adulto
            jQuery('.onoffswitch-switch').css('left', 0);
            jQuery('.upper-box-switch .text-switch').toggleClass('selected');
            window.location.href = redirectAdulto;
        } else {
            //Show Infantil
            jQuery('.onoffswitch-switch').css('left', "calc(100% - 29px)");
            jQuery('.upper-box-switch .text-switch').toggleClass('selected');
            window.location.href = redirectInfantil;
        }
    });

    //Banners que redirigeixen a la home de la tipologia contraria
    jQuery('.row-home > div > div a').click(function(event){
        if(jQuery(this).hasClass('special-banner')){
            event.preventDefault();
            jQuery('.onoffswitch :checkbox').trigger('click');
        }
    });
});