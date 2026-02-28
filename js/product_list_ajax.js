var shortTextNormal = jQuery('.header-grid-text .text-box').html();
var showExtra = false; // estat actual
var fromResize = false;// from de l'ultima crida
var inEnoughHeight = true;
var responsiveMode = false;

function disableSeeAll(){
    jQuery('.button-change-state').addClass('disabled');
}

function enableSeeAll(){
    jQuery('.button-change-state').removeClass('disabled');
    // updateGrid(true,0,null);
}

function updateTallasFiltro(sizeType, attributeCode){
    jQuery('.tallas-filtro-column.'+attributeCode+' .tallas-filtro-title.active').removeClass('active');
    jQuery('.tallas-filtro-column.'+attributeCode+' .tallas-filtro-row.'+sizeType+' .tallas-filtro-title.'+sizeType).addClass('active');
    var active = jQuery('.tallas-filtro-column.'+attributeCode+' .tallas-filtro-title.active').index();
    jQuery('.tallas-filtro-column.'+attributeCode).css('display','none');
    jQuery('.tallas-filtro-column.'+attributeCode).eq(active).css('display','');
}

/* controlar los clicks sobre los carousels de producto */
jQuery(document).on('click', "a.carousel-link", function() {
	ga('send', {
		hitType: 'event',
		eventCategory: 'Carousel - Clic',
		eventAction: 'destination: ' + this.href,
		eventLabel: 'source: ' + window.location.href,
	});		
});