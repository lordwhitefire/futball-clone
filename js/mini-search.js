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
if(jQuery('.header-minicart a').hasClass('have-items')){
    jQuery('.header-minicart').addClass('have-items');
}
else{
    jQuery('.header-minicart').removeClass('have-items');
}

jQuery(document).ready(function(){

    jQuery('#search').on("change textInput input", function(){
        jQuery('#search_mini_form .clearable__clear .clearable__clear-img').toggleClass('remove-text',!!jQuery('#search').val());
    });

    jQuery('#search_mini_form .clearable__clear .clearable__clear-img').click(function() {
        jQuery('#search').val('');
        jQuery('#search_mini_form .clearable__clear .clearable__clear-img').toggleClass('remove-text',!!jQuery('#search').val());
    });

	jQuery('#search_r').on("change textInput input", function(){
		jQuery('#search_mini_form_responsive .clearable__clear .clearable__clear-img').toggleClass('remove-text',!!jQuery('#search_r').val());
    });

	jQuery('#search_mini_form_responsive .clearable__clear .clearable__clear-img').click(function() {
		jQuery('#search_r').val('');
        jQuery('#search_mini_form_responsive .clearable__clear .clearable__clear-img').toggleClass('remove-text',!!jQuery('#search_r').val());
    });

    var searchForm = new Varien.searchForm('search_mini_form', 'search', '');
    searchForm.initAutocomplete(catalogSuggestUrl, 'search_autocomplete');

    jQuery('#search').keydown(function (e) {
        if (e.which == 13) {// When key pressed is "Enter" key.
            e.preventDefault();
            if (jQuery(this).val().length >= minLength && jQuery(this).val() != searchDefault) {
                jQuery('#search_mini_form').submit();
            }
        }
    });

    var searchForm = new Varien.searchForm('search_mini_form_responsive', 'search_r', '');
    searchForm.initAutocomplete(catalogSuggestUrlResponsive, 'search_autocomplete_responsive');

    jQuery('#search_r').keydown(function(e) {
        if (e.which == 13) {
            // When key pressed is "Enter" key.
            e.preventDefault();
            if (jQuery(this).val().length >= minLength && jQuery(this).val() != searchDefault) {
                jQuery('#search_mini_form_responsive').submit();
            }
        }
    });

    jQuery('#search_mini_form .search-button-container button').click(function(e) {
        e.preventDefault();
        if (jQuery('#search_mini_form #search').val().length >= minLength && jQuery('#search_mini_form #search').val() != searchDefault) {
            jQuery('#search_mini_form').submit();
        }
    });
    jQuery('#search_mini_form .age-select .age-select-container').click(function() {
        jQuery(this).parent().toggleClass('opened');
    });
    jQuery('#search_mini_form_responsive .search_r_wrapper button').click(function(e) {
        e.preventDefault();
        if (jQuery('#search_mini_form_responsive #search_r').val().length >= minLength && jQuery('#search_mini_form_responsive #search_r').val() != searchDefault) {
            jQuery('#search_mini_form_responsive').submit();
        }
    });
    jQuery('#search_mini_form_responsive .age-select .age-select-container').click(function() {
        jQuery(this).parent().toggleClass('opened');
        jQuery('.responsive-search-overlay').toggleClass('opened');
    });
    jQuery('#search_mini_form_responsive #search_r').focus(function() {
        jQuery('body.is-responsive div.amshopby-filters-left').css('top',0);
    });
    jQuery('#search_mini_form_responsive #search_r').focusout(function() {
        window.setTimeout(function() { jQuery('body.is-responsive div.amshopby-filters-left').css('top',''); }, 100);
    });
});

function selectSearchType(tipology) {
    if (tipology!=tipologiaSearch) {
        jQuery('#search_mini_form .age-select .age-select-values .age-select-table .age-select-table-row').toggleClass('selected');
        var text = jQuery('#search_mini_form .age-select .age-select-values .age-select-table .age-select-table-row.selected .age-select-table-cell .age-select-cell-text').html();
        jQuery('#search_mini_form .age-select .age-select-container #age-select-text').html(text);
        tipologiaSearch = tipology;
        jQuery('#search_mini_form .age-search-select option:eq('+tipologiaSearch+')').prop('selected',true);
        jQuery('#search_mini_form .age-select .age-select-triangle').toggleClass('white-triangle');
    }
    jQuery('#search_mini_form .age-select').toggleClass('opened');
}

function selectSearchTypeResponsive(tipology) {
    if (tipology!=tipologiaSearchResponsive) {
        jQuery('#search_mini_form_responsive .age-select .age-select-values .age-select-table .age-select-table-row').toggleClass('selected');
        var text = jQuery('#search_mini_form_responsive .age-select .age-select-values .age-select-table .age-select-table-row.selected .age-select-table-cell .age-select-cell-text').html();
        jQuery('#search_mini_form_responsive .age-select .age-select-container #age-select-text').html(text);
        tipologiaSearchResponsive = tipology;
        jQuery('#search_mini_form_responsive .age-search-select option:eq('+tipologiaSearchResponsive+')').prop('selected',true);
        jQuery('#search_mini_form_responsive .age-select .age-select-triangle').toggleClass('white-triangle');
    }
    jQuery('#search_mini_form_responsive .age-select').toggleClass('opened');
    jQuery('.responsive-search-overlay').toggleClass('opened');
}