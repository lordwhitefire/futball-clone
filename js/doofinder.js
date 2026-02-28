var buscado = false, buscadoquery = '', busqueda = 'Futbolmania', ord = 'doofinderorden', dir = 'asc', gen = 'Todo', totalfound, total, inputempty = false, mostrar = false, hp = 0,actualizarGeneros = true,actualPage = 1, cat = '', cat2 = '', totcat = 0;
var initialSubheaderHeight = 0, doResetLayerContent = false; // BUG4																
var filtros = new Array();

function showLog(txt){
	var showDebug = false;
	if(showDebug){
		console.log(txt);
	}
}

/* BEGIN moveOrder */			 
function moveOrder() {
	showLog("moveOrder [START]");
	var dfsortselect =  jQuery('#df-sort-select');
    if (jQuery('#df-results__wrapper__dffullscreen').length && dfsortselect.length) {
        var width = jQuery('[data-layout=grid][data-browser-support~=cssgrid] .df-cardc').outerWidth();
		showLog("cssgrid outerwidth " + width);
        var top = 27;
        dfsortselect.css('width', width);
        jQuery('.df-sort-select-options','#df-sort-select').css({"top":27, "width":width});
        jQuery('.df-sort-select-options','#df-mobile-order').css('width', 100);
        jQuery(".df-mobile-buttons,.desc-search").show();

        var distanceGridToTop = jQuery('#df-results__wrapper__dffullscreen').offset().top, elementsXRow = 0;
        jQuery('.df-cardc','#df-results__wrapper__dffullscreen').each(function () {
	    var el = jQuery(this);
            var distanceElemToTop = el.offset().top;
			showLog("distanceElemToTop " + distanceElemToTop);										 
            if (distanceElemToTop <= distanceGridToTop || (distanceElemToTop - distanceGridToTop) <= 10) {
                elementsXRow++; return true;
            } else {
                return false;
            }
        });
		
		showLog("Elements " + elementsXRow);								  
        var posorder = elementsXRow;
        posorder = posorder - 1; // Quitamos el ultimo, ya que no lo pasamos
        if (posorder){
			// Left es el ancho de cada producto x los que hay sin contar el ultimo
			// Hay que sumar los 4px de padding por lado menos del lado derecho del ultimo (que no llegamos a pasarlo)
			// Por tanto si hay 3 productos de 300px, sera 300px x 2 productos = 600px + 4px (por lado) x 5 = 620px
			var marg = ((2 * 4) * posorder) + 4; //Con esto calculamos el margen de cada lado x cada producto + 4de margen del ultimo producto (donde ponemos el selector)
			posorder = (jQuery("[data-layout=grid] .df-cardc").outerWidth() * posorder) + marg;
			showLog("marg " + marg);
			showLog("df-cardc outerwidth " + jQuery("[data-layout=grid] .df-cardc").outerWidth());
			showLog("posorder " + posorder);
			if(posorder > 0){ //BUG16
				dfsortselect.css('left', posorder);
				dfsortselect.css('visibility','visible');
			} else {
				dfsortselect.css('visibility','hidden');
			}
			jQuery('.header-filters','#df-subheader').css('max-width', (posorder + width) - 120);
		}
    }
	dfsortselect = undefined;
	showLog("moveOrder [END]");
}
/* END moveOrder */				   

/* BEGIN adjustTopFilters */
function adjustTopFilters(page){
	showLog("adjustTopFilters [START]");
	showLog("page " + page);
	var dfresults =  jQuery('.df-results');
    if (dfresults.is(':visible')) {
        if(page == 1){
			var hfilters = jQuery('#df-subheader .header-filters');
			var horder = jQuery('#df-subheader .header-filters');
        	if (hfilters.height() > 0) {
				showLog("if");
	            hp = hfilters.position();
				showLog("hp position " + hp);
	            hp = hp.top + (hfilters.height() + 5);
				showLog("hp height " + hfilters.height());
				showLog("hp " + hp);
        	} else {
				showLog("else");
				// BUG35 - cuando hay scroll y se busca de nuevo
				if(jQuery('.df-fullscreen').attr('data-scrolling') == 'true'){
					jQuery('.df-fullscreen').attr('data-scrolling','false');
					jQuery('#df-subheader').removeClass('fixed');
					jQuery('.df-mobile__wrapper .df-mobile__headertop').removeClass('fixed');
					jQuery(".df-mobile__content").removeClass("scroll");					
				}
				hp = jQuery('#df-subheader').height() + 5;
				showLog("hp height " + hp);				
				showLog("subheader height " +jQuery('#df-subheader').height());
        	}
			jQuery('#df-subheader').css({"left":dfresults.offset().left,"top":jQuery('#df-topbar__dffullscreen').outerHeight()});
        	jQuery('#df-results__wrapper__dffullscreen').css('margin-top', hp);
			showLog("adjustTopFilters - hp " + hp);
        }
    }
	dfresults = undefined;
	showLog("adjustTopFilters [END]");
}
/* END adjustTopFilters */

// BUG2
/* BEGIN isFunction */
function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/* BEGIN updateResults */						  
function updateResults(res) {
	showLog("updateResults[START]");
	//showLog(res);
    mostrar = true;
	//jQuery('.df-searchbox').removeClass('actived');
    jQuery('.df-mobile-filters .df-mobile__button').text("");
    var existConditionPromo = setInterval(function () {
        createbut();
    }, 200);

    function createbut() {
        jQuery("#df-aside__dffullscreen .df-panel .df-panel__title").append("<span class='but-open'></span>");
        if (jQuery("#df-aside__dffullscreen .df-panel .but-open").length) {
            clearInterval(existConditionPromo);
        }
    }
    if(mostrar == true){
        jQuery('.df-searchbox').removeClass('opened');
        jQuery('.df-subheader .df-sort-select').css('display', 'block');
		jQuery('#df-mobile__content__dffullscreen').removeClass('noresult');										// Mobile
		jQuery('#df-results__wrapper__dffullscreen,#df-aside__dffullscreen,.df-aside').removeClass('noresult');		// Desktop y tablet
        jQuery('.df-fullscreen .df-layer__content').attr('style', 'display: flex !important');
        jQuery('.df-fullscreen[data-facets=left] .df-header').attr('style', 'display: flex !important');
        jQuery('#df-results__wrapper__dffullscreen,#df-mobile__content__dffullscreen').css('display', 'grid');
        jQuery('#df-subheader').addClass('active');
        if(jQuery('#df-topbar__dffullscreen').outerHeight()){
        setTimeout(function () {
                jQuery('#df-subheader').css({"left":jQuery('.df-results').offset().left,"top":jQuery('#df-topbar__dffullscreen').outerHeight()});
            }, 250);
        }
    }

    updateBuscadoQuery(res);

    if(res.page == 1){
    	moveOrder();
    }

    buscado = true;
    if (jQuery('.title-filter').length < 2) {
        jQuery('#df-mobile__aside__content__dffullscreen').prepend('<div class="title-filter"><span class="title">Filtrar</span><img src="/skin/frontend/rwd/futbolmania/images/doofinder/icono-borrar.svg" class="close" data-role="toggle-filters"></div>');
    }
    //If has filters
    jQuery('.df-panel--collapse[data-facet="genero"] a.df-panel__title,.df-panel--collapse[data-facet="tipo"] a.df-panel__title,.df-panel--collapse[data-facet="promotion"] a.df-panel__title,.df-panel--collapse[data-facet="equipo"] a.df-panel__title,.df-panel--collapse[data-facet="brand"] a.df-panel__title,.df-panel--collapse[data-facet="age"] a.df-panel__title,.df-panel--collapse[data-facet="talla"] a.df-panel__title,.df-panel--collapse[data-facet="size"] a.df-panel__title,.df-panel--collapse[data-facet="color"] a.df-panel__title,.df-panel--collapse[data-facet="outlet"] a.df-panel__title').show();
    jQuery('.df-panel--collapse[data-facet="genero"], .df-panel--collapse[data-facet="genero"] .df-panel__content,.df-panel--collapse[data-facet="tipo"], .df-panel--collapse[data-facet="tipo"] .df-panel__content,.df-panel--collapse[data-facet="brand"], .df-panel--collapse[data-facet="brand"] .df-panel__content,.df-panel--collapse[data-facet="age"], .df-panel--collapse[data-facet="age"] .df-panel__content,.df-panel--collapse[data-facet="talla"], .df-panel--collapse[data-facet="talla"] .df-panel__content,.df-panel--collapse[data-facet="size"], .df-panel--collapse[data-facet="size"] .df-panel__content,.df-panel--collapse[data-facet="color"], .df-panel--collapse[data-facet="color"] .df-panel__content,.df-panel--collapse[data-facet="outlet"], .df-panel--collapse[data-facet="outlet"] .df-panel__content').removeClass('closed');

    var dftermcolor = jQuery('.df-term[data-facet="color"]');
    if (dftermcolor.find('.color').length === 0) {
        dftermcolor.prepend('<span class="color"></span>');
    }
     dftermcolor = undefined;

    //Full subheader with applied filters
    var headerfilters = jQuery(".header-filters");
    headerfilters.children().remove();
    jQuery('.df-mobile__close-filter').css('display', 'none');
    if (res.filter) {
        jQuery.each(res.filter.terms, function (index, value) {
            if (index != 'busqueda' && index != 'genero') {
                value = value + '';
                value = value.split(',');
                jQuery.each(value, function (i, v) {
                    jQuery('.df-term[data-value="'+v+'"]').addClass('selected');
                    if (index == 'outlet') {
                        v = 'Outlet';
                    } else if (index == 'grupo_precio') {
                        if (v == 1) {
                            v = "0€ - 50€";
                        } else if (v == 2) {
                            v = "50€ - 100€";
                        } else if (v == 3) {
                            v = "100€ - 150€";
                        } else if (v == 4) {
                            v = "+150€";
                        }
                    }

                    var pos = jQuery.inArray(v, filtros);
                    if(pos < 0){
                        filtros.push(v);
                    }
                });
		    jQuery('.df-mobile__close-filter').css('display', '');
            }
        });

	jQuery.each(filtros, function (ind, val) {
        	headerfilters.append("<div class='header-filter'><span class='filter-close'></span><span class='filter-name'>" + val + "</span></div>");
        });
    }

    if (jQuery(".header-filter").length) {
        headerfilters.append("<div class='header-filters-close remove-filters'>Borrar filtros</div>");
    }
    headerfilters = undefined;
    adjustTopFilters(res.page);

    //Update actual search for first option in suggestions
    jQuery('span.df-categories-first').text(res.query);
    var search_term = jQuery("#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen").val();
	if(search_term == ''){
		jQuery('.result_busqueda').text("productos");
		jQuery('.desc-search-word').css('display','none').text("");
	} else {
		jQuery('.result_busqueda').text("resultados de");
		jQuery('.desc-search-word').text(search_term).css('display','inline-block');
	}
	
    if (res.filter) {
        var n = 0; jQuery('.df-mobile__header__actions [data-role=toggle-filters]').html('<span class="tot-filtros">(' + n + ')</span> Filtrar');
    } else {
        jQuery('.header-button-clear').attr('style', 'display: none');
    }

    jQuery('.df-fullscreen .df-topbar .df-header .df-header-title span').html('');
    jQuery('#filtros').show();
    jQuery('.df-header .df-sort-select').hide();

    /* When close search, hide all divs*/
    jQuery('.df-fullscreen .df-topbar__content .df-icon.df-icon--close,.df-mobile .df-topbar__content .df-icon.df-icon--close').click(function () {
        hideResults();
        busqueda = '';
    });
    /* End close search*/

    /* Suggestion hover change category in first suggestion*/
    jQuery(".df-categories-list .suggestions-filters .suggestion").hover(function () {
        jQuery(".suggestion-first-category").text(jQuery(this).text().replace(/\s+/g, ''));
    }, function () {
        jQuery(".suggestion-first-category").text('Todo');
    });
    /* End */

    jQuery('.df-aside .df-term[data-facet="color"], .df-mobile__aside__content .df-term[data-facet="color"]').hover(
       function(){ jQuery(this).find('.df-term__value').addClass('active') },
       function(){ jQuery(this).find('.df-term__value').removeClass('active') }
    );

    jQuery('.header-filter').hover(
       function(){ jQuery(this).addClass('hover') },
       function(){ jQuery(this).removeClass('hover') }
    );

    /* Change suggestions url to relative */
    updateSuggestionUrls();
    /* End */

    jQuery(".lupa,.df-categories.first, .clear-or-category .category").click(function () {
        jQuery(".suggestions-filters .suggestion-all.suggestion").trigger("click");
	    mostrar = true;
    });
    /* END */

    jQuery(document).on('click tap touchstart', ".suggestions-filters .suggestion", function () {
    //showLog("suggestion click [START]");
	    mostrar = true;
        gen = jQuery(this).text().replace(/\s+/g, '');
        gene = "";

        if (gen == "Niños") {
            gene = "Infantil";
        } else {
            gene = gen;
        }

        jQuery(".desc-search").show();
        jQuery('.custom-category.active').removeClass('active');
        jQuery('.custom-category[data-category="' + gene + '"]').addClass('active');
        jQuery('.df-fullscreen[data-facets=left] .df-header').attr('style', 'display: flex !important');
        jQuery("#df-categories__dffullscreen").hide();
        jQuery('.df-searchbox,.df-mobile__searchbox').removeClass('opened');
        clickGender(gen);
        //showLog("suggestion click [END]");
    });

    jQuery(".df-card__main").click(function (event) { 
        jQuery("#dffullscreen").addClass("active");
    });

    /* Image functions */
    /* Change img when is hover */
    jQuery(".df-results .df-card__image_default").mouseover(function () {
        jQuery(this).attr('src', jQuery(this).data("hover"));
    }).mouseout(function () {
        jQuery(this).attr('src', jQuery(this).data("src"));
    });

    jQuery(".manage-hover-box img").click(function (event) {
        event.preventDefault();
	    var id = jQuery(this).data('id');
        var dfcardid = jQuery('.df-cardc[data-id="' + id + '"]');
	    id = dfcardid.find('.df-card__image');
	    dfcardid = dfcardid.find('.manage-hover-box img');
        if (jQuery(this).attr('class') == 'image_hover') {
            id.find('.image_default').hide();
            id.find('.image_hover').show();
            dfcardid.find('.image_default').removeClass('active-image');
            dfcardid.find('.image_hover').addClass('active-image');
        } else {
            id.find('.image_hover').hide();
            id.find('.image_default').show();
            dfcardid.find('.image_hover').removeClass('active-image');
            dfcardid.find('.image_default').addClass('active-image');
        }
        id = undefined;
        dfcardid = undefined;
		/*jQuery('#dffullscreen').addClass('click_hover');
		setTimeout(function(){ jQuery('#dffullscreen').removeClass('click_hover'); }, 2000);*/
		
    });
    /* End Image Functions */

    /* Change outlet text */
    jQuery('.df-term[data-facet="outlet"]').attr("termvalue", "Outlet");
    jQuery('.df-term[data-facet="outlet"] .df-term__value').text("Outlet");
    /* End */

    /*Sort divs by text*/
    jQuery.fn.sortDivs = function sortDivs(sel, data) {
        return jQuery(jQuery(sel).toArray().sort(function (a, b) {
            var nameA = a.getAttribute(data).toUpperCase();
            var nameB = b.getAttribute(data).toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }));
    }

    /*Sort divs by number*/ // BUG2 - función cambiada entera
    jQuery.fn.sortDivsN = function sortDivsN(sel, data) {
        return jQuery(jQuery(sel).toArray().sort(function (a, b) {
            var datA = a.getAttribute('data-value');
            var datB = b.getAttribute('data-value');
			//showLog(datA+' '+datB);
			//showLog(datA.match(/\d+/g)+' '+datB.match(/\d+/g));
	        if (datA == 'bebé') {
                datA = 0;
        } else if (datB == 'bebé' || datB == '+años') {
                datB = 0;
        } else {
				if(datA.match(/\d+/g) === null){
					datA = 0;
				} else {
					var val = datA.match(/\d+/g).map(Number);
					datA = val[0];
				}
				//showLog(datA);

				if(datB === null){
					datB = 0;
				} else {
					var val = datB.match(/\d+/g).map(Number);
					datB = val[0];
				}
				//showLog(datB);
            	
	        }
			//showLog("----");
            return +datA - +datB;
        }));
    }
    /* END */

//showLog("sorted [START]");

    sorted_items = jQuery('.df-panel--collapse[data-facet="tipo"] .df-panel__content').sortDivs('.df-term[data-facet="tipo"]', 'data-value').clone();
    jQuery('.df-panel--collapse[data-facet="tipo"] .df-panel__content').html(sorted_items);
	sorted_items = jQuery('.df-panel--collapse[data-facet="promotion"] .df-panel__content').sortDivs('.df-term[data-facet="promotion"]', 'data-value').clone();
    jQuery('.df-panel--collapse[data-facet="promotion"] .df-panel__content').html(sorted_items);
    sorted_items = jQuery('.df-panel--collapse[data-facet="equipo"] .df-panel__content').sortDivs('.df-term[data-facet="equipo"]', 'data-value').clone();
    jQuery('.df-panel--collapse[data-facet="equipo"] .df-panel__content').html(sorted_items);
    sorted_items = jQuery('.df-panel--collapse[data-facet="brand"] .df-panel__content').sortDivs('.df-term[data-facet="brand"]', 'data-value').clone();
    jQuery('.df-panel--collapse[data-facet="brand"] .df-panel__content').html(sorted_items);
    sorted_items = jQuery('.df-panel--collapse[data-facet="age"] .df-panel__content').sortDivsN('.df-term[data-facet="age"]', 'data-value').clone();
    jQuery('.df-panel--collapse[data-facet="age"] .df-panel__content').html(sorted_items);

    //Move bebe filter to first position in list age filter
    jQuery('.df-panel[data-facet=age] .df-panel__content').prepend(jQuery('.df-panel[data-facet=age] .df-panel__content .df-term[data-value="bebé"]'));

	var mapa_tallas = new Array(
						"talla 3 M",
						"talla 6 M",
						"talla 9 M",
						"talla 12 M",
						"talla 18 M",
						"talla 24 M",
						"talla 36 M",
						"talla 68",
						"talla 74",
						"talla 80",
						"talla 86",
						"talla 92",
						"talla 98",
						"talla 104",
						"talla 110",
						"talla 116",					
						"talla 128",
						"talla 140", 
						"talla 152", 
						"talla 164", 
						"talla 176", 
						"talla XXS", 
						"talla 2XS", 
						"talla XS", 
						"talla S", 
						"talla M", 
						"talla L", 
						"talla XL", 
						"talla 2XL", 
						"talla 3XL", 
						"talla 4XL", 
						"talla 5XL", 
						"talla mini", 
						"talla mini YTH", 
						"talla 2", 
						"talla 2 1/2", 
						"talla 3", 
						"talla 3 1/2", 
						"talla 4", 
						"talla 4 1/2", 
						"talla 5", 
						"talla 5 1/2", 
						"talla 6", 
						"talla 6 1/2", 
						"talla 7", 
						"talla 7 1/2", 
						"talla 8", 
						"talla 8 1/2", 
						"talla 9", 
						"talla 9 1/2", 
						"talla 10", 
						"talla 10 1/2", 
						"talla 11", 
						"talla 11 1/2", 
						"talla 12", 
						"talla 13", 
						"talla 14", 
						"talla 15", 
						"talla 16", 
						"talla 17", 
						"talla 18", 
						"talla 19", 
						"talla 20", 
						"talla 21", 
						"talla 22", 
						"talla 23", 
						"talla 24", 
						"talla 25", 
						"talla 25 1/2",
						"talla 26", 
						"talla 26 1/2",
						"talla 27", 
						"talla 27 1/2",
						"talla 28", 
						"talla 28 1/2", 
						"talla 29", 
						"talla 29 1/2", 
						"talla 30", 
						"talla 30 1/2", 
						"talla 31", 
						"talla 31 1/2", 
						"talla 32", 
						"talla 32 1/2", 
						"talla 33", 
						"talla 33 1/2", 
						"talla 34", 
						"talla 34 1/2", 
						"talla 35", 
						"talla 35 1/2", 
						"talla 36", 
						"talla 36 1/2", 
						"talla 36 2/3", 
						"talla 37", 
						"talla 37 1/3", 
						"talla 37 1/2" , 
						"talla 38", 
						"talla 38 1/2", 
						"talla 38 2/3", 
						"talla 39", 
						"talla 39 1/3", 
						"talla 39 1/2",
						"talla 40", 
						"talla 40 1/2", 
						"talla 40 2/3", 
						"talla 41", 
						"talla 41 1/3", 
						"talla 41 1/2", 
						"talla 42", 
						"talla 42 1/2", 
						"talla 42 2/3", 
						"talla 43", 
						"talla 43 1/3", 
						"talla 43 1/2", 
						"talla 44", 
						"talla 44 1/2", 
						"talla 44 2/3", 
						"talla 45", 
						"talla 45 1/3", 
						"talla 45 1/2" , 
						"talla 46", 
						"talla 46 1/2", 
						"talla 46 2/3", 
						"talla 47", 
						"talla 47 1/3", 
						"talla 47 1/2", 
						"talla 48", 
						"talla 48 1/2", 
						"talla 48 2/3", 
						"talla 49", 
						"talla 49 1/3", 
						"talla 49 1/2", 
						"talla 50", 
						"talla 50 1/2", 
						"talla 50 2/3", 
						"talla 51", 
						"talla 51 1/3", 
						"talla 51 1/2",
						"talla 52", 
						"talla 52 1/2", 
						"talla 52 2/3",						
						"talla 53", 
						"talla 53 1/2", 						
						"talla 54"
	);

    jQuery.fn.sortTallas = function sortTallas(sel, data) {
        return jQuery(jQuery(sel).toArray().sort(function (a, b) {
            var datA = a.getAttribute('order');
            var datB = b.getAttribute('order');
            return +datA - +datB;
        }));
    }

    jQuery('.df-term[data-facet="talla"]').each(function () {
		var el = jQuery(this);
        var val = el.data('value');
		if(typeof val === 'string' || val instanceof String){
			if(val.indexOf("talla") == - 1){
				val = "talla "+val;
			}
		} else {
			val = "talla "+val;
		}
        if(isNaN(val)){
			console.log(val + " NO es número");
			//val = val.replace("talla ", ""); // BUG DOOFINDER 20210531 Tallas que no son string
			val = val.trim();
		} else {
			console.log(val + " es número");
		}
		
		pos = mapa_tallas.indexOf(val);
        //pos = jQuery.inArray(val, mapa_tallas);
		console.log('talla - '+ val + ' - order '+ pos);
        el.attr('order', pos);
    });

    sorted_items = jQuery('.df-panel--collapse[data-facet="talla"] .df-panel__content').sortTallas('.df-term[data-facet="talla"]', 'data-order').clone();
    jQuery('.df-panel--collapse[data-facet="talla"] .df-panel__content').html(sorted_items);

	// BUG DOOFINDER 20210531 el filtro de precios no sale en orden
	sorted_items = jQuery('.df-panel--collapse[data-facet="grupo_precio"] .df-panel__content').sortDivs('.df-term[data-facet="grupo_precio"]', 'data-value').clone();
    jQuery('.df-panel--collapse[data-facet="grupo_precio"] .df-panel__content').html(sorted_items);
	
//showLog("sorted [END]");

    jQuery(".df-term").each(function (i) {
	var el = jQuery(this);
        var item = jQuery(this).parent().parent();
        item.find('.df-panel__title').removeClass('active');
        item.removeClass('active');

	if(el.data('facet') == 'color'){
		var html = el.html();
                html = "<figure>"+html+"</figure>";
                el.html(html);

                html = el.find('.df-term__value').html();
                html = "<figcaption>"+html+"</figcaption>";
                el.find('.df-term__value').html(html);
	}
    });

    jQuery(".df-term[data-selected]").each(function (i) {
	var el = jQuery(this);
        var item = el.parent().parent();
        item.find('.df-panel__title').addClass('active');
        item.addClass('active');
        if (item.find('.clear-filter').length == 0) {
            jQuery('.df-panel.df-panel--collapse[data-facet="' + item.data('facet') + '"]').find(".df-panel__title.active").after('<span class="clear-filter" data-facet="' + item.data('facet') + '"></span>');
        }
    });

    var options = { style: 'currency', currency: 'eur', minimumFractionDigits: 2, maximumFractionDigits: 2 };
    var formatter = new Intl.NumberFormat('es', options);

    jQuery('.df-cardc').each(function (index) {
	var el = jQuery(this);
        var val = jQuery(this).data('offer') + "";
        val = val.split('/');
        if (val[1]) {
            el.find('.df-card__prices .df-card__price-offer .df-offer').text('-' + val[1] + '%');
            el.attr('data-offer', val[1]);
        } else if (val[0] == 'FM') {
            el.attr('data-offer', 0);
        }

	val = el.find('.df-offerextra').text();
	if(val == 'black friday'){
		el.find('.df-offerextra').replaceWith( "black <span class='extra'>friday</span>" );
	}else if(val == 'cyber monday'){
		el.find('.df-offerextra').replaceWith( "cyber <span class='extra'>monday</span>" );
	}
	val = undefined;
    });

    jQuery('.currency').each(function (index) {
	    var el = jQuery(this);
        var cval = el.text();
	    if (cval.indexOf('€') == -1) {
            cval = formatter.format(el.text());
            el.text(cval);
        }
        el = undefined;
        cval = undefined;
    });
    /*Fin precio offer*/

    /* Actualizamos url */
    var lang = 'es';
    jQuery('.df-card__main').each(function (index) {
	    var el = jQuery(this);
        var url = jQuery(this).attr('href');
        var can = jQuery(this).find('.df-canonizacion').text();
        if (can === 'FutbolmaniaKids') {
            url = url.replace(lang + "/", lang + "/kids-producto/");
            el.attr('href', url);
        }
        el = undefined;
        url = undefined;
        can = undefined;
    });
    /* Fin url */

    var bus = jQuery('.df-term[data-facet="busqueda"][data-selected] .df-term__value').text();
    if (bus == 'Futbolmania' || bus == 'FutbolmaniaSala') {
        jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: none');
    }
    bus = undefined;

    jQuery("#df-mobile__searchbox__dffullscreen").focusout(function () {
        /*bug lupa
		if (!jQuery("#df-mobile__searchbox__dffullscreen").val()) {
            jQuery(".clear-or-category").hide();
        }
		*/
        jQuery('.df-mobile .df-mobile__searchbox button[data-role=clear]').removeAttr('style');
        jQuery('.df-mobile .df-mobile__searchbox .lupa').attr('style', 'display: block');
    });

    /* MOBILE Functions */
    jQuery(".view-results span.view-results-total").html('(<span class="grid-count">' + total + '</span>)');

    jQuery(".view-results").click(function () {
        jQuery('.header-button-clear').attr('style', 'display: block');
    });

    /*Cuando hacemos click en borrar filtros en mobile, recorremos los filtros seleccionados y los vamos desmarcando (Los de tipo busqueda y genero NO)*/
    jQuery(".remove-filters").click(function () {
        jQuery.each(filtros, function (ind, val) {
            var datafacet = "";
            removeFilters(val);
            var el = jQuery(".df-term[termvalue='"+val+"']");
            if(el[0]){
                datafacet = el.data("facet");
                val = el.data("value");
            }
            dfFullscreenLayers[0].layer.controller.params.filter = limpiarFiltros(val,datafacet);
        });
	    dfFullscreenLayers[0].layer.controller.refresh();
    });

    jQuery(".header-button-clear").click(function () {
        jQuery('.header-button-clear').attr('style', 'display: none');
    });

    jQuery('#df-mobile__header__actions__dffullscreen [data-role=toggle-filters]').removeClass('df-mobile__button--switch-on');

    /*Hide filter if has only a value*/
    jQuery('.df-panel--collapse').each(function (i, item) {
        var facet = jQuery(this).data('facet');
        if (facet != 'outlet' && facet != 'grupo_precio' && facet != 'busqueda') {
            var tot = jQuery('.df-term[data-facet="' + facet + '"]').length;
            if (tot != 1) {
                jQuery('.df-aside .df-panel--collapse[data-facet="' + facet + '"],.df-mobile__aside .df-panel--collapse[data-facet="' + facet + '"]').attr('style', 'display: block');
            }
        }
	facet = undefined;
	tot = undefined;
    });
    /*End hide filter*/

    jQuery('.df-aside .df-panel--collapse,.df-mobile__aside .df-panel--collapse').attr('data-collapse', false);
    jQuery('.df-panel--collapse[data-facet="tipo"] .df-term').slice(10).addClass("hide");
    if (jQuery('.list-categories-more[data-facet="tipo"]').length == 0 && jQuery('.df-panel--collapse[data-facet="tipo"] .df-term.hide').length > 0) {
        jQuery('.df-panel--collapse[data-facet="tipo"] .df-panel__content').append(jQuery("<div class='list-categories-more' data-facet='tipo'>Ver más</div><div class='list-categories-less' data-facet='tipo' style='display:none;'>Ver menos</div>"));
    }

    jQuery('.df-panel--collapse[data-facet="brand"] .df-term').slice(10).addClass("hide");
    if (jQuery('.list-categories-more[data-facet="brand"]').length == 0 && jQuery('.df-panel--collapse[data-facet="brand"] .df-term.hide').length > 0) {
        jQuery('.df-panel--collapse[data-facet="brand"] .df-panel__content').append(jQuery("<div class='list-categories-more' data-facet='brand'>Ver más</div><div class='list-categories-less' data-facet='brand' style='display:none;'>Ver menos</div>"));
    }

    jQuery('.df-panel--collapse[data-facet="age"] .df-term').slice(10).addClass("hide");
    if (jQuery('.list-categories-more[data-facet="age"]').length == 0 && jQuery('.df-panel--collapse[data-facet="age"] .df-term.hide').length > 0) {
        jQuery('.df-panel--collapse[data-facet="age"] .df-panel__content').append(jQuery("<div class='list-categories-more' data-facet='age'>Ver más</div><div class='list-categories-less' data-facet='age' style='display:none;'>Ver menos</div>"));
    }

    jQuery('.df-panel--collapse[data-facet="equipo"] .df-term').slice(10).addClass("hide");
    if (jQuery('.list-categories-more[data-facet="equipo"]').length == 0 && jQuery('.df-panel--collapse[data-facet="equipo"] .df-term.hide').length > 0) {
        jQuery('.df-panel--collapse[data-facet="equipo"] .df-panel__content').append(jQuery("<div class='list-categories-more' data-facet='equipo'>Ver más</div><div class='list-categories-less' data-facet='equipo' style='display:none;'>Ver menos</div>"));
    }

	jQuery('.df-panel--collapse[data-facet="promotion"] .df-term').slice(10).addClass("hide");
    if (jQuery('.list-categories-more[data-facet="promotion"]').length == 0 && jQuery('.df-panel--collapse[data-facet="promotion"] .df-term.hide').length > 0) {
        jQuery('.df-panel--collapse[data-facet="promotion"] .df-panel__content').append(jQuery("<div class='list-categories-more' data-facet='promotion'>Ver más</div><div class='list-categories-less' data-facet='promotion' style='display:none;'>Ver menos</div>"));
    }
	
    var el = jQuery('.df-term[data-facet="grupo_precio"][data-value="1"]');
    el.attr("termvalue", "0€ - 50€");
    el.find('.df-term__value').text("0€ - 50€");

    var el = jQuery('.df-term[data-facet="grupo_precio"][data-value="2"]');
    el.attr("termvalue", "50€ - 100€");
    el.find('.df-term__value').text("50€ - 100€");

    var el = jQuery('.df-term[data-facet="grupo_precio"][data-value="3"]');
    el.attr("termvalue", "100€ - 150€");
    el.find('.df-term__value').text("100€ - 150€");

    var el = jQuery('.df-term[data-facet="grupo_precio"][data-value="4"]');
    el.attr("termvalue", "+150€");
    el.find('.df-term__value').text("+150€");
    el = undefined;

    //Filters slider 
	if(isFunction("owlCarousel")){ // BUG2
		showLog("owlcarousel on");
		jQuery('.df-mobile__header .header-filters').owlCarousel({
			loop: false,
			margin: 10,
			responsiveClass: true,
			responsive: {
				0: {
					//items:3,
					nav: false
				},
				600: {
					//items:3,
					nav: false
				},
				1000: {
					//items:5,
					nav: false,
					loop: false
				}
			}
		});
	} else {
		showLog("owlcarousel off");
	}

   resetLayerContent();				  
   mostrar = false;

	adjustTopFilters(res.page); // BUG
	actualPage = res.page;
	if(jQuery('.desc-search.Todo').attr('style') == 'display: none;'){ // BUG31 mirar si esta con display:none y poner display:block
		jQuery('.desc-search.Todo').attr('style', 'display: block'); 
	}
	
	// Localizar los centimos de los precios y hacerlos span para darles otro estilo
	jQuery('.df-card__pricing .df-card__price .currency').each(function(){
		var content = jQuery(this).html();
		content = content.replace(",", "<span class='decimal-part'>,");
		content = content + "</span>";
		jQuery(this).html(content);
	});	
	
	// Cambiar el title a las marcas que estan filtradas
	jQuery('.df-term[data-facet="brand"]').each(function(){
		showLog("element "+jQuery(this).html());
		showLog(jQuery(this).attr('data-selected'));
		if(jQuery(this).attr('data-selected') === undefined){
		} else {
			var brand = jQuery(this).attr('data-value');
			showLog(brand);
			jQuery('div.df-card-brand div').each(function(){
				if(jQuery(this).attr('alt') == brand){
					jQuery(this).attr('title','Quitar productos '+ brand); // Cambiamos el title si la marca esta seleccionada
				}
			});
			//jQuery('.df-card-brand .df-brand-'+brand).addClass('no-clicable'); // Hacemos que sea no clicable
		}
	});
	
	showLog("updateResults[END]");
}
/* END updateResults */

// Hacer los iconos de marca filtros en parrilla
document.addEventListener('click', function(e){ 
	if (e.target.matches('[class^="df-brand-"]')) {
		var brand = e.target.title;
		brand = brand.replace('Ver productos ','');
		brand = brand.replace('Quitar productos ','');
		filterByBrand(brand);
		if(responsiveMode){ /* para tablet y mobile */
			e.target.style.backgroundImage = "url('/media/wysiwyg/Marcas/Iconos/"+brand+"-hover.png')"; 
			setTimeout(function(){ e.target.style.backgroundImage = "url('/media/wysiwyg/Marcas/Iconos/"+brand+"-gris.png')" }, 100); 
		}		
		e.stopPropagation(); 
	} 
}, true);

// Aplicar el filtro de marca
function filterByBrand(brand){
	// Añadir filtro de marca --------------------------------
	if(jQuery('.df-term[data-facet="brand"][data-value="'+brand+'"]').attr('data-selected') === undefined) {
		showLog("filtro "+brand+ " no aplicado");
		//jQuery('.df-term[data-facet="brand"][data-value="'+brand+'"]')[0].click(); // no funciona
		//mostrar = true;
		//actualizarGeneros = false;
	    //dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["Futbolmania"];
        //dfFullscreenLayers[0].layer.controller.params.filter.genero = ["Unisex","Hombre"];
		//dfFullscreenLayers[0].layer.controller.params.filter.brand = [brand];
		dfFullscreenLayers[0].layer.controller.addFilter("brand", brand);
        dfFullscreenLayers[0].layer.controller.refresh();		
	// Quitar filtro de marca -------------------------------------
	} else {
		showLog("filtro "+brand+ " ya aplicado");
		//mostrar = true;
		//actualizarGeneros = false;		
		removeFilters(brand);
		dfFullscreenLayers[0].layer.controller.removeFilter("brand", brand);
		dfFullscreenLayers[0].layer.controller.refresh();
		showLog("filtro "+brand+ " quitado");
	}
}

function noResults(res) {
	showLog("noResults[START]");
	
    jQuery('#df-results__wrapper__dffullscreen,#df-aside__dffullscreen, #df-mobile__content__dffullscreen,.df-aside').addClass('noresult');
    jQuery('#df-subheader').attr('style', 'display: none');
	// BUG 23 - se muestra siempre el mensaje, cuando tecleas, 
	// en mobile hacer que solo se muestre si el usuario le da a buscar
    jQuery('#df-results__wrapper__dffullscreen').attr('style', 'display: block');						// tablet y desktop
	if(mostrar == true && jQuery('#df-mobile__content__dffullscreen').length){
		jQuery('#df-mobile__content__dffullscreen').attr('style', 'position:relative;display: block');		// mobile
	}
    jQuery(".df-results, #df-mobile__content__dffullscreen").html("<div class='no-results todo'><div class='no-results-box-container'><p class='bold-paragraph'><span class='ups-face'></span> Lo sentimos,<br>no hay resultados para ’" + res.query + "’</p><p>Comprueba la ortografía o utiliza un término más general de búsqueda</p></div><div class='no-results-container'><p class='bold-paragraph'><span class='frustrated-face'></span>Si sigues teniendo problemas:</p><ul class='black-colour'><li>· Ponte en <a href='https://www.futbolmania.com/es/contacts/'>contacto</a> con nosotros</li></ul></div></div>");

    jQuery('#df-results__wrapper__dffullscreen .no-results, #df-mobile__content__dffullscreen .no-results').removeAttr('style');
    jQuery('.no-results.todo').css('display', 'grid');

    if(mostrar == true){
		jQuery('.df-fullscreen .df-layer__content').attr('style', 'display: flex !important');
    }
    jQuery('#df-subheader').removeClass('active');
    mostrar = false;
    jQuery('#filtros').hide();
	showLog("noResults[END]");
}

/* BEGIN noResults BUG23 */ 		
/*
function noResults(res) {
	showLog("noResults[START]");
	showLog("res ", res);
	
	if(res.total_found == 0){
		jQuery('#df-results__wrapper__dffullscreen,#df-aside__dffullscreen, #df-mobile__content__dffullscreen,.df-aside').addClass('noresult');
		jQuery('#df-subheader').attr('style', 'display: none');
		jQuery('#df-results__wrapper__dffullscreen,#df-mobile__content__dffullscreen').attr('style', 'display: block');
		
		jQuery(".df-results,#df-mobile__content__dffullscreen").html("<div class='no-results todo'><div class='no-results-box-container'><p class='bold-paragraph'><span class='ups-face'></span> Lo sentimos,<br>no hay resultados para ’" + res.query + "’</p><p>Comprueba la ortografía o utiliza un término más general de búsqueda</p></div><div class='no-results-container'><p class='bold-paragraph'><span class='frustrated-face'></span>Si sigues teniendo problemas:</p><ul class='black-colour'><li>· Ponte en <a href='https://www.futbolmania.com/es/contacts/'>contacto</a> con nosotros</li></ul></div></div>");
		
		noResultsGen(gen);
		if(mostrar == true){
			jQuery('.df-fullscreen .df-layer__content').attr('style', 'display: flex !important');
		}
		jQuery('#df-subheader').removeClass('active');
		mostrar = false;
		jQuery('#filtros').hide();
	}
	showLog("noResults[END]");
}
*/
/* END noResults */


/* BEGIN noResultsGen BUG23 */
/*
function noResultsGen(gen) {
	showLog("noResultsGen[BEGIN]");
    jQuery('#df-results__wrapper__dffullscreen .no-results, #df-mobile__content__dffullscreen .no-results').removeAttr('style');
	jQuery('.df-results .no-results.todo').css('display', 'grid');								// desktop y tablet
    jQuery('#df-mobile__content__dffullscreen .no-results.todo').css('display', 'block');		// tablet
	showLog("noResultsGen[END]");
}
*/
/* END noResultsGen BUG23 */

/* BEGIN updateBuscadoQuery */		 
function updateBuscadoQuery(res){
	if (buscado == false) {
        buscadoquery = res.query;
        total = res.total_found;
        totalfound = res.total_found;
    } else {
        if (buscadoquery != res.query) {
            buscadoquery = res.query;
            total = res.total_found;
            totalfound = res.total_found;
            filtros.length = 0;
        } else {
            if (res.total > res.total_found) {
                total = res.total; totalfound = res.total_found;
            } else {
                total = res.total_found;
            }
        }
    }

    var dfsortselect = jQuery('.df-sort-select');
    if (res.total_found < 4) {
        dfsortselect.addClass('hide');
    }else{
        dfsortselect.removeClass('hide');
    }

    jQuery('.desc-search-text .desc-total,#desc-search .desc-total').text(res.total_found);
    dfsortselect = undefined;
}
/* END updateBuscadoQuery */	 

/* BEGIN configureLayer */
function configureLayer(instance, busqueda) {
//showLog("ConfigureLayer[START]");

    var isDoofinderMobile = false;
    if (window.location.pathname == "/es/kids") {
        busqueda = 'FutbolmaniaKids';
        jQuery('.logo-kids').addClass('active');
        jQuery('.logo-futbolmania').removeClass('active');
    } else if (window.location.pathname == "/es/woman") {
        busqueda = 'FutbolmaniaWoman';
    } else if (window.location.pathname == "es/futsal") {
        busqueda = 'FutbolmaniaSala';
    } else {
        jQuery('.logo-kids').removeClass('active');
        jQuery('.logo-futbolmania').addClass('active');
    }

    const mainContainerId = instance.layerOptions.mainContainerId;
	
	/*
	QUITAMOS LAS CATEGORIAS
    instance.layer.addController('categories', {
        rpp: 150,
        type: ['categories'],
        //filter: { 'busqueda': [busqueda] }
	filter: { 'busqueda':["Futbolmania", "FutbolmaniaKids"]}
    });

    instance.layer.categoriesController.registerWidget(instance.layer.queryInputWidget);
    instance.layer.categoriesController.refresh();
    instance.layer.categoriesController.registerWidget(new doofinder.core.widgets.Display('#df-categories__' + mainContainerId, {
        template: document.getElementById('categories').innerHTML
    }));

    instance.layer.categoriesController.registerWidget(new doofinder.core.widgets.Display('#df-categories__sidebar,#df-mobile__aside__content__categories', {
        template: document.getElementById('categoriessidebar').innerHTML
    }));

    instance.layer.categoriesController.search(instance.layer.queryInputWidget.value);
    instance.layer.categoriesController.on("df:results:success", function (response) {
	totcat = response.total;
        updateSuggestionUrls();
        jQuery('span.df-categories-first').text(instance.layer.queryInputWidget.value);
    });
	*/ 
	
    /* Suggestions */
    jQuery('.df-fullscreen .df-searchbox #df-searchbox__dffullscreen,.df-mobile .df-mobile__searchbox #df-mobile__searchbox__dffullscreen').keydown(function () {
        displaySuggestions();
    });
    jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').click(function () {
        if (buscado === true) {
            displaySuggestions();
        }
    });
    /* END Suggestions */
    /* Disable autocomplete */
    jQuery('.df-searchbox,#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').attr('autocomplete', 'off');
	
	/* BEGIN listado de sugerencia de categorias - clic */
    jQuery(document).on('click', "a.df-categories.into .df-categories", function (event) {
		mostrar = true;
		filtros.length = 0;
		// Clic sobre una categoria de sugerencias => realizar la búsqueda
        if (jQuery(event.target).attr('class') != 'link-suggestions') {
            jQuery(".df-categories-list").hide();
			jQuery(".desc-search").show();
            jQuery('.df-fullscreen[data-facets=left] .df-header').attr('style', 'display: flex !important');
            if (jQuery(this).parent().hasClass('into')){
                jQuery("#dffullscreen").addClass("active");
                var text = jQuery(this).parent().text().split('|');
                text = jQuery.trim(text[0]);
				setTimeout(function () {
                    jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').val(text);
                    instance.layer.categoriesController.search(text);
                    instance.layer.categoriesController.refresh();
                    instance.layer.categoriesController.on("df:results:success", function (response) {
						totcat = response.total;
                        updateSuggestionUrls();
                    });
                    jQuery('span.df-categories-first,.desc-search-word').text(text);
                    //instance.layer.controller.setParam('type', ['products', 'categories']);
					instance.layer.controller.setParam('type', ['products']);
                    instance.layer.controller.query = text;
                    instance.layer.controller.refresh();
					doResetLayerContent = true; // BUG4												 
                }, 500);
				
				// Simulamos el comportamiento de google y quitamos el foco y el teclado
				//jQuery("#df-mobile__searchbox__dffullscreen").focus();
				showLog("clic texto sugerencia - log focus searchbox");
                //Keyboard.show();
            }
        } else { // BUG21 - Clic sobre la flecha de una categoria de sugerencias => buscar nuevas sugerencias en mobile y tablet
			showLog("ES LINK SUGGESTIONS");
            jQuery('.df-fullscreen[data-facets=left] .df-header').attr('style', 'display: flex !important');
            if (jQuery(this).parent().hasClass('into')) {
                jQuery("#dffullscreen").addClass("active");
                var text = jQuery(this).parent().text().split('|');
                text = jQuery.trim(text[0]);
                setTimeout(function () {
                    jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').val(text);
                    instance.layer.categoriesController.search(text);
                    instance.layer.categoriesController.refresh();
                    instance.layer.categoriesController.on("df:results:success", function (response) {
						totcat = response.total;
                        updateSuggestionUrls();
                    });
                    jQuery('span.df-categories-first,.desc-search-word').text(text);
                }, 500);
				// Para mobile
				if(jQuery("#df-mobile__searchbox__dffullscreen").length){
					jQuery("#df-mobile__searchbox__dffullscreen").focus();
					showLog("Click flecha sugerencia - log focus searchbox"); 
				// Para tablet y desktop
				} else {
					jQuery("#df-searchbox__dffullscreen").focus();
				}
                Keyboard.show();
            }
        }
    });
	/* END listado de sugerencia de categorias - clic */
	
    jQuery(document).on('click', ".box-hidden-menu,.box-icon-hidden,.doofinder-hidden-menu", function () {
        jQuery(".hideContent,.menuLogos,.doofinder-hidden-menu").toggleClass('active');
        jQuery('.df-fullscreen[data-facets=left] .df-header').removeAttr('style');
    });
    jQuery(document).on('click', "#hideContent", function () {
        jQuery(".hideContent,.menuLogos,.doofinder-hidden-menu").removeClass('active');
    });
    jQuery(document).on('click', "img.flecha-doofinder", function () {
        hideResults();
        busqueda = '';
        jQuery('#dffullscreen').removeAttr('visible');
        jQuery('#dffullscreen').attr("hidden", true);
        jQuery("#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen").val("");
        jQuery('.df-mobile__headertop .df-topbar__logo').hide();
	history.replaceState({}, document.title, window.location.href.split('#')[0]);
	mostrar = false;
    });

    jQuery("#df-mobile__aside__content__dffullscreen,#df-mobile__aside_categories").scroll(function () {
        if (jQuery(this).scrollTop() > 30) {
            jQuery(this).find(".title-filter").addClass('fixed');
        } else {
            jQuery(this).find(".title-filter").removeClass('fixed');
        }
    });

    jQuery(".df-aside__content").scroll(function () {
	if (jQuery(this).scrollTop() > 30) {
            jQuery(".df-fullscreen[data-facets][data-wide=true] .df-aside").addClass('scroll');
        } else {
            jQuery(".df-fullscreen[data-facets][data-wide=true] .df-aside").removeClass('scroll');
        }
    });

    jQuery(".df-results,.df-mobile").scroll(function () {
		showLog("scroll detected");
        if (jQuery(this).scrollTop() > 70) {
			var move_content = jQuery('.df-mobile__headertop').outerHeight() + jQuery('#df-subheader').outerHeight() + 5;
            jQuery(".df-categories-list").hide();
            jQuery("#df-subheader .df-sort-select").css('margin-top', '25');
            jQuery('.df-searchbox,.df-mobile__searchbox').removeClass('opened');
            jQuery('.df-mobile__wrapper #df-subheader').addClass("fixed"); 
			jQuery('.df-mobile__wrapper .df-mobile__headertop').addClass("fixed"); 
            jQuery('#dffullscreen #to-top').addClass('df-in'); // BUG11 - scroll para todo: desktop, tablet, mobile
			if(!(jQuery(".df-mobile__content").hasClass("scroll"))){
				jQuery(".df-mobile__content").addClass("scroll");
				jQuery(".df-mobile .df-mobile__content.scroll").css('padding-top', move_content);
			}				
			if(jQuery(this).scrollTop() + jQuery(this).innerHeight() >= jQuery(this)[0].scrollHeight - 250) {
				if(actualPage < instance.layer.controller.lastPage){
					addloading();
				}
        	}
			showLog("addClass df-in");
        } else {
            jQuery(".desc-search").show();
            jQuery("#df-subheader .df-sort-select").css('margin-top', '');
            jQuery('.df-mobile__wrapper #df-subheader').removeClass("fixed"); 
			jQuery('.df-mobile__wrapper .df-mobile__headertop').removeClass("fixed");
            jQuery('#dffullscreen #to-top').removeClass('df-in'); // BUG11 - scroll para todo: desktop, tablet, mobile
			jQuery(".df-mobile .df-mobile__content.scroll").css('padding-top', '0px');
            jQuery(".df-mobile__content").removeClass("scroll");
			showLog("removeClass df-in");
        }
    });

    jQuery('.df-sort-select-options li').click(function () {
        ordenar(jQuery(this));
	jQuery(".df-sort-select-options").removeClass('active');
    });

	function iOS() {
	  return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	  ].includes(navigator.platform)
	  // iPad on iOS 13 detection
	  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	}
	
    var orderList = false;
    jQuery('.df-mobile-order .df-sort-select-options').click(function () {
		showLog("click");
		if(orderList == false){
			orderList = true;			
			jQuery(".df-sort-select-options").addClass('active');
			showLog("show");
		} else {
			orderList = false;
			if(iOS()){
				jQuery(".df-sort-select-options").blur();			
			}
			jQuery(".df-sort-select-options").removeClass('active');
			showLog("hide");
		}
    });

    jQuery('.df-sort-select-options').change(function () {
        ordenar(jQuery(this).find('option').filter(':selected'));
    });

    function ordenar(item) {
        //Cambiamos opción seleccionada
        jQuery('.df-sort-select-options,.filter-arrow').removeClass('opened');
        jQuery('.df-sort-select-options li,.df-sort-select-options option').removeClass('active');
        item.addClass('active');

        //Proceso de ordenación
        ord = item.attr('data-field');
        dir = item.attr('data-sort');

        data = "";
        if (ord == 'title') {
            data = 'data-value';
        } else if (ord == 'offer') {
            data = 'data-offer';
        } else if (ord == 'price') {
            data = 'data-price';
        } else {
            data = 'data-important';
            //dir = 'asc';
			dir = 'desc';
        }
        /* Relanzamos consulta con el orden seleccionado */
        if (ord == 'price' && dir == 'asc') {
            instance.layer.controller.setParam('sort', { 'sale_price': 'asc' });
            instance.layer.controller.refresh();
        } else if (ord == 'price' && dir == 'desc') {
            instance.layer.controller.setParam('sort', { 'sale_price': 'desc' });
            instance.layer.controller.refresh();
        } else if (ord == 'offer') {
            instance.layer.controller.setParam('sort', { 'offerval': 'desc' });
            instance.layer.controller.refresh();
        } else {
            //instance.layer.controller.setParam('sort', { 'importancia': 'asc' });
			instance.layer.controller.setParam('sort', {});		// Deja el valor vacío y ordena por el orden definido en doofinder
            instance.layer.controller.refresh();
        }
        /* END */
    }

	/* control de barra de search activada al coger el foco */
	jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').on("focus", function (e) {
		showLog("focus");
		if(jQuery('.df-searchbox,.df-mobile__searchbox').hasClass("unactived")){
			jQuery('.df-searchbox,.df-mobile__searchbox').removeClass("unactived");
			showLog("class added");
		}
		showLog("focus end");
	});
	
	/* control de barra de search desactivada - al perder el foco */
	jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').on("blur", function (e) {
		jQuery('.df-searchbox,.df-mobile__searchbox').addClass("unactived");
	});
	
    jQuery('.df-searchbox,#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').on("change paste keyup keypress", function (e) {
	//escribimos
	filtros.length = 0;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {	// Presionamos el boton de ENTER
            var text = jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').val();
            if (text != "") {
                //instance.layer.controller.setParam('type', ['products', 'categories']);
				instance.layer.controller.setParam('type', ['products']);
                instance.layer.controller.query = text;
                jQuery(".df-categories-list").hide();
                instance.layer.controller.refresh();
				doResetLayerContent = true; // BUG4
				mostrar = true;
				if(jQuery("body").hasClass("is-responsive")){	// Si estamos en tablet, entonces escondemos el teclado al darle al enter
					this.blur();
					console.log("tablet");
				} else {
					console.log("desktop");
				}
            }
        }else if(keycode === 27){	// Presionamos el boton ESC 
			history.replaceState({}, document.title, window.location.href.split('#')[0]);
			mostrar = false;
		}
    });

    jQuery(".lupa, .lupa-negra,.clear-or-category .category,.clear-or-category .buscar,.df-mobile .btn.buscar").click(function () {
	 var text = jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').val();
        if (text != "") {
            //instance.layer.controller.setParam('type', ['products', 'categories']);
			instance.layer.controller.setParam('type', ['products']);
            instance.layer.controller.query = text;
            jQuery(".df-categories-list").hide();
            instance.layer.controller.refresh();
			doResetLayerContent = true; // BUG4
			mostrar = true;
        }
    });

	/* Listado sugerencia categorias - 1a entrada - clic */
    jQuery(document).on('click', "a.df-categories.first", function (e) {
        var text = jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').val();
        if (text != "") {
            //instance.layer.controller.setParam('type', ['products', 'categories']);
			instance.layer.controller.setParam('type', ['products']);
            instance.layer.controller.query = text;
            jQuery(".df-categories-list").hide();
            instance.layer.controller.refresh();
			doResetLayerContent = true; // BUG4
			mostrar = true;
        }
    });	

	// BUG 24
	/* function volver al estado inicial de entrar a doofinder */
	function resetSearch(){
		jQuery(".df-mobile-buttons,.desc-search,.custom-categories,.clear-or-category .clear").hide();	
		//jQuery('.df-searchbox,.df-mobile__searchbox').removeClass('actived');
		jQuery('.clear-or-category .buscar').removeClass('actived');
        jQuery(".lupa-negra").show();
        jQuery("#df-mobile__searchbox__dffullscreen,#df-searchbox__dffullscreen").val("");
        jQuery("#df-mobile__searchbox__dffullscreen,#df-searchbox__dffullscreen").focus();
        jQuery(".df-categories-list").hide();
		jQuery('.df-searchbox').removeClass('opened');	// BUG10
		showLog("borrar contorno");
		hideResults();
	}
	
	/* BORRAR TEXTO CON LA X */
   jQuery(".clear-or-category .clear").click(function () {
        resetSearch(); 
    });

    /* Click subheader options */
    jQuery(".custom-categories .custom-category").unbind().click(function () {
		showLog("Custom categories click() [START]");
        var el = jQuery(this);
        jQuery('.custom-category.active').removeClass('active');
        el.addClass('active');
        gen = el.attr('data-category');

        clickGender(gen);
        el = undefined;
		showLog("Custom categories click() [END]");
    });

    /* Suggestions */
    jQuery(document).on('click', function (e) {
            if (jQuery(e.target).closest("#df-categories__dffullscreen,#df-searchbox__dffullscreen").length === 0) {
                jQuery("#df-categories__dffullscreen").hide();
                jQuery('.df-searchbox').removeClass('opened');
                jQuery('.df-mobile__searchbox').removeClass('opened');
            }
            if (jQuery(e.target).attr('id') == 'dffullscreen') {
                if (!jQuery('#df-results__wrapper__dffullscreen').is(':visible') && !jQuery('#df-mobile__content__dffullscreen').is(':visible')) {
                    jQuery('#df-searchbox__dffullscreen').val('');
                }
            }
       
            if (jQuery(e.target).attr('class') == 'list-categories-more') {
                e.preventDefault();
                var tipofiltro = jQuery(e.target).data('facet');
                if (tipofiltro == 'category') {
					/* old 
                    var min = jQuery(".df-list-categories a.df-categoriessidebar.hide:not('.filtered')").index();
                    var item = ".df-list-categories a.df-categoriessidebar:not('.filtered')";
                    var max = min + 10;
	
                    jQuery(item).slice(min, max).removeClass("hide");
					*/
					showMoreCategories(10);
                    var hides = jQuery(".df-list-categories a.df-categoriessidebar.hide:not('.filtered')").length;
                } else {
                    var min = jQuery(".df-panel--collapse[data-facet='" + tipofiltro + "'] .df-term.hide").index();
                    var item = ".df-panel--collapse[data-facet='" + tipofiltro + "'] .df-term";
                    var max = min + 10;
    
                    jQuery(item).slice(min, max).removeClass("hide");
                    var hides = jQuery(".df-panel--collapse[data-facet='" + tipofiltro + "'] .df-term.hide").length;
                }
                if (hides == 0) {
                    jQuery(".list-categories-more[data-facet='" + tipofiltro + "']").hide();
                    jQuery(".list-categories-less[data-facet='" + tipofiltro + "']").show();
                }
            } else if (jQuery(e.target).attr('class') == 'list-categories-less') {
                e.preventDefault();
                var tipofiltro = jQuery(e.target).data('facet');
                if (tipofiltro == 'category') {
                    var item = ".df-list-categories a.df-categoriessidebar:not('.filtered')";
                } else {
                    var item = ".df-panel--collapse[data-facet='" + tipofiltro + "'] .df-term";
                }
                jQuery(item).slice(10).addClass("hide");
                jQuery(".list-categories-less[data-facet='" + tipofiltro + "']").hide();
                jQuery(".list-categories-more[data-facet='" + tipofiltro + "']").show();
            }
        });
        /* END Suggestions */

    //showLog("ConfigureLayer[END]")
}
/* END configureLayer */

/* BEGIN displaySuggestions */
function displaySuggestions() {
	if(jQuery('#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen').val() && totcat > 1){
	    jQuery('.df-categories-list').css('display', 'block');
	    jQuery('.df-searchbox,.df-mobile__searchbox').addClass('opened');
	    updateSuggestionUrls();
	    if (jQuery('.df-fullscreen[data-facets=left] .df-header').hasClass('active')) {
	        jQuery('.df-fullscreen[data-facets=left] .df-header').removeAttr('style');
	    }
	    jQuery('.buscar,.clear-or-category .lupa-negra').addClass('active');
	}
}

/* BEGIN hideResults */
function hideResults() {
	showLog("hideResults [START]");
	var descsearch = jQuery('#desc-search');
    jQuery('.df-fullscreen[data-facets=left] .df-header,#df-subheader,.df-fullscreen .df-layer__content,#df-results__wrapper__dffullscreen,#df-mobile__content__dffullscreen,.df-mobile__headertop .custom-categories').removeAttr('style');
    descsearch.removeClass();
    descsearch.addClass('desc-search');
    jQuery('.desc-search-category').text('Todo');
    jQuery('.desc-search-text.Gen').hide();
    jQuery('.desc-search-text.Todo').show();
    descsearch.addClass("Todo");
    jQuery('.custom-category.active').removeClass('active');
    jQuery('.custom-category[data-category="Todo"]').addClass('active');
    jQuery('.logo-kids,.logo-women,.logo-futsal').removeClass('active');
    jQuery('.logo-futbolmania').addClass('active');
    jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: block');
    jQuery('.df-mobile .df-mobile__header .box-hidden-menu').show();
    jQuery('nav.box-hidden-menu').removeAttr('style');
    buscadoquery = "";
    jQuery('#df-subheader').removeClass('active');
	jQuery('.df-mobile__content').removeClass('scroll');
	jQuery('#df-subheader').removeClass('fixed');
	jQuery('.df-mobile__wrapper .df-mobile__headertop').removeClass('fixed');
    descsearch = undefined;
    jQuery('html').removeClass('df-fix-layout');
	showLog("hideResults [END]");
}
/* END hideResults */			   

/* BEGIN updateSuggestionUrls */				 
function updateSuggestionUrls() {
	if(totcat > 1){
		jQuery("div#filtros span:first-child").css("display","inline");
		jQuery("div#filtros #df-categories__sidebar").css("display","block");
		jQuery("div.df-mobile-categories.df-mobile-column").css("display","table");
		
		var host = jQuery(location).attr('protocol') + "//" + jQuery(location).attr('host')
		var totcategories = 1
		var showcategories = 0;	// BUG19					 
		var buscamos = jQuery("#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen").val().toLowerCase();
		cat = jQuery(".df-categories-list #list-suggestions a.df-categories")[1];
		cat2 = jQuery(".df-categories-list #list-suggestions a.df-categories")[2];

		jQuery(".df-categories-list #list-suggestions a.df-categories").each(function () {
			var el = jQuery(this);
			var url = jQuery(this).attr('href').replace("/index.php/admin", "");
			var url = url.replace("http://pre-futbolmania.bumon-web.com/es", "");

				if (totcategories > 7) {
					el.remove();
				} else if(!el.hasClass("last")){
					var url = "#";
					if (totcategories != 1) {
						el.addClass('into');
						if (el.find('.df-suggestion-text').text().toLowerCase() === buscamos) {
							el.addClass("hide");
						}
					}
				}

			el.attr('href', url);
			showLog("cat url "+ totcategories + ") " + url);					
			totcategories++;
		});
		showLog("cat founds " + showcategories);
		if(showcategories == 0){	// BUG19 - cuando no hay listado de categorias sugeridas
			jQuery('#df-categories__dffullscreen').css('padding-top','0px'); // Podemos hacer una class noresult
		} else {
			jQuery('#df-categories__dffullscreen').css('padding-top','');
		}					  
		if(cat != 'undefined' && jQuery(".df-categories-list #list-suggestions a.df-categories").length > 1 && jQuery("#list-suggestions").children(".last").length < 1){
			var html = jQuery( "#list-suggestions" ).html();
			cat = jQuery(cat);
			cat.addClass('last');
			cat.removeClass('into');
				cat.children().children().addClass('last');
				cat.addClass('firstlast');

			if(cat[0].href){
				cat[0].href = cat.children().children().children().text();
			}
			cat2 = jQuery(cat2);
			cat2.addClass('last');
			cat2.removeClass('into');
				cat2.children().children().addClass('last');

			if(cat2[0].href){
				cat2[0].href = cat2.children().children().children().text();
			}
			jQuery( "#list-suggestions" ).html(html + cat[0].outerHTML + cat2[0].outerHTML);
		}

		jQuery(".extra-url").each(function () {
			var el = jQuery(this);
			var t = el.text().replace(host, "");
			el.text(t);
		});
		jQuery('.into img.lupa.link-gris.external,.df-categories.into .extra,.last img.lupa.lupa-gris').remove();
		buscamos = buscamos.split(" ");
		jQuery('.df-categories[data-type="categories"] .df-suggestion-text,.df-categories span.extra.last .extra-url').wrapInTag({ tag: 'span', words: buscamos });
		if (jQuery('.extcategories').length == 0) {
			jQuery("<span class='extcategories'>Categorías</span>").insertBefore(jQuery('.firstlast'));
		}
		/* BEGIN filtered categories */
		//jQuery(".df-list-categories a").slice(10).addClass("hide");
		resetCategories();
		showMoreCategories(10);	/* show the first 10 */
		
		if(jQuery(".list-categories-more").length > 0){		// Si ya existen los botones de ver más y ver menos
			var tipofiltro = "category";
			jQuery(".list-categories-less[data-facet='" + tipofiltro + "']").hide();
			if(jQuery(".df-list-categories a.df-categoriessidebar.hide:not('.filtered')").index() > 0){	// Si hay más categorias
				//resetCategories();
				//showMoreCategories(10);	// show the first 10 
				jQuery(".list-categories-more[data-facet='" + tipofiltro + "']").show();				
			} else {		// Si no hay más categorias
				jQuery(".list-categories-more[data-facet='" + tipofiltro + "']").hide();		
			}
			// Control cuando no hay categorías relacionadas y se muestran los botones de ver más
			if(jQuery(".df-list-categories a.df-categoriessidebar:not('.hide')").length < 1 && jQuery(".df-list-categories a.df-categoriessidebar.filtered:not('.hide')").length < 1) {
				hideCategories();
			}		
		} else {
			if (jQuery(".list-categories-more[data-facet='category']").length == 0 && jQuery(".df-list-categories a.df-categoriessidebar.hide:not('.filtered')").length > 0) {
				jQuery(".df-list-categories").append(jQuery("<div class='list-categories-more' data-facet='category'>Ver más</div><div class='list-categories-less' data-facet='category' style='display:none;'>Ver menos</div>"));
				showCategories();
			} else if(jQuery(".df-list-categories a.df-categoriessidebar:not('.filtered')").length < 1) {
				hideCategories();
			}
		}
		/* END filtered categories */
	} else {
		showLog("updateSuggestionUrls "+totcat);
		jQuery("div#filtros span:first-child").css("display","none");
		jQuery("div#filtros #df-categories__sidebar").css("display","none");
		jQuery("div.df-mobile-categories.df-mobile-column").css("display","none");
	}
}
/* END updateSuggestionUrls */


/* BEGIN clickGender */		  
function clickGender(gen) {
	showLog("clickGender[START]");
	mostrar = true;
	actualizarGeneros = false;
    jQuery("#dffullscreen").addClass("active");
    jQuery('.custom-categories').show();
	
/*
	// Llamadas EXTRA en genero TODO HOMBRE MUJER Y NIÑO
	// Llamada de búsqueda en búsqueda - futbolmania / futbolmania
    jQuery('.df-term[data-facet="busqueda"][data-selected]').each(function (index) {
        if (gen != jQuery(this).data('value')) {
			showLog("busqueda: " + jQuery(this).data('value'));
            jQuery('.df-term[data-facet="busqueda"][data-selected]')[0].click();
        }
    });
	
	// Llamada de búsqueda en género : unisex, hombre, mujer
    jQuery('.df-term[data-facet="genero"][data-selected]').each(function () {
		showLog("genero: " + jQuery(this).data('value'));
    	jQuery(this)[0].click();
    });
*/
    if (gen === 'Hombre') {
		showLog("gender: hombre");
        //setTimeout(function () {
            jQuery('#desc-search').removeClass();
            jQuery('#desc-search').addClass('desc-search');
            jQuery('.desc-search-category').text(gen);
            jQuery('.desc-search-text.Todo').hide();
            jQuery('.desc-search-text.Gen').show();
            jQuery('#desc-search').addClass('Adultos');
            busqueda = 'Futbolmania';

	    dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["Futbolmania"];
            dfFullscreenLayers[0].layer.controller.params.filter.genero = ["Unisex","Hombre"];
            dfFullscreenLayers[0].layer.controller.refresh();

            jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: none');
            jQuery('.desktop-logos,.df-topbar__logo').show();
        //}, 250);
    } else if (gen === 'Mujer') {
		showLog("gender: Mujer");
        //setTimeout(function () {
            jQuery('#desc-search').removeClass();
            jQuery('#desc-search').addClass('desc-search');
            jQuery('.desc-search-category').text(gen);
            jQuery('.desc-search-text.Todo').hide();
            jQuery('.desc-search-text.Gen').show();
            jQuery('#desc-search').addClass('Adultos');
            busqueda = 'Futbolmania';

	    dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["Futbolmania"];
            dfFullscreenLayers[0].layer.controller.params.filter.genero = ["Unisex","Mujer"];
            dfFullscreenLayers[0].layer.controller.refresh();

            jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: none');
            jQuery('.desktop-logos,.df-topbar__logo').show();
       // }, 250);
    } else if (gen === 'Niños' || gen === 'Infantil') {
		showLog("gender: Niños");
        //setTimeout(function () {
            jQuery('#desc-search').removeClass();
            jQuery('#desc-search').addClass('desc-search');
            jQuery('.desc-search-category').text(gen);
            jQuery('.desc-search-text.Todo').hide();
            jQuery('.desc-search-text.Gen').show();
            jQuery('#desc-search').addClass('Infantil');
            busqueda = 'FutbolmaniaKids';

	    dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["FutbolmaniaKids"];
	    delete dfFullscreenLayers[0].layer.controller.params.filter.genero;

            dfFullscreenLayers[0].layer.controller.refresh();

            jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: block');
            jQuery('.desktop-logos,.df-topbar__logo').show();
        //}, 250);
    } else if (gen === 'Adultos') {
		showLog("gender: Adultos");
        //setTimeout(function () {
            jQuery('#desc-search').removeClass();
            jQuery('#desc-search').addClass('desc-search');
            jQuery('.desc-search-category').text(gen);
            jQuery('.desc-search-text.Todo').hide();
            jQuery('.desc-search-text.Gen').show();
            jQuery('#desc-search').addClass('Adultos');
            busqueda = 'Futbolmania';

	    dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["Futbolmania"];
            dfFullscreenLayers[0].layer.controller.refresh();

            jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: none');
            jQuery('.desktop-logos,.df-topbar__logo').show();
        //}, 250);
    } else if (gen === 'Todo') {
		showLog("gender: Todo");
        //setTimeout(function () {
            jQuery('#desc-search').removeClass();
            jQuery('#desc-search').addClass('desc-search');
            jQuery('.desc-search-category').text('Todo');
            jQuery('.desc-search-text.Gen').hide();
            jQuery('.desc-search-text.Todo').show();
            jQuery('#desc-search').addClass(gen);

	    dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["Futbolmania","FutbolmaniaKids"];
	    delete dfFullscreenLayers[0].layer.controller.params.filter.genero;
            dfFullscreenLayers[0].layer.controller.refresh();

            jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: block');
            jQuery('.df-mobile .df-mobile__header .box-hidden-menu').show();
            busqueda = '';
        //}, 250);
    } else if (gen === 'Futsal') {
		showLog("gender: Futsal");
		dfFullscreenLayers[0].layer.controller.params.filter.busqueda = ["FutbolmaniaSala"];
        dfFullscreenLayers[0].layer.controller.refresh();

        jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: none');
        jQuery('.desktop-logos,.df-topbar__logo').show();
    } else {
		showLog("gender: " + gen);
        //setTimeout(function () {
            jQuery('#desc-search').removeClass();
            jQuery('#desc-search').addClass('desc-search');
            jQuery('.desc-search-category').text(gen);
            jQuery('.desc-search-text.Todo').hide();
            jQuery('.desc-search-text.Gen').show();
            jQuery('#desc-search').addClass(gen);
			busqueda = '';
            jQuery('.df-aside .df-panel--collapse[data-facet="age"],.df-mobile__aside .df-panel--collapse[data-facet="age"]').attr('style', 'display: none');
            jQuery('.desktop-logos,.df-topbar__logo').show();
        //}, 250);
    }

	/* BEGIN filtered categories */
	/* Mostramos solo las categorias relacionadas con el gender: todos, hombre, mujer o niños */
	jQuery(".df-list-categories a.df-categoriessidebar").each(function () {
		jQuery(this).removeClass('filtered');	//  Quitamos la marca de filtrada
		if(busqueda != ''){
			showLog(busqueda + "==" +jQuery(this).data('categoria'));
			if(busqueda != jQuery(this).data('categoria')){
				jQuery(this).addClass('filtered')
				var cat_name = jQuery(this).find(".df-suggestion-text").text();;
				showLog("filtered "+ cat_name);
			}
		}
	});
	/* END filtered categories */
	
	descsearch = undefined;
	showLog("clickGender[END]");
}
/* END clickGender */																								

jQuery(document).on('click tap keypress keyup', function (e) {
    if (jQuery("#dffullscreen").is(":visible")) {
        if (jQuery('.df-searchbox').is(":visible")) {
            var offset = jQuery('.df-searchbox').offset();
            var left = offset.left;
	   jQuery('.df-categories-list').css({'width':jQuery('.df-searchbox').outerWidth(),'margin-left':left,'max-width':'none'});
        }
    }
});

jQuery(document).on('click', "#list-suggestions a", function (e) {
    jQuery('.custom-categories').show();
});

jQuery(document).on('click', ".df-topbar__content .box-hidden-menu, img.logo.active", function (e) {
    hideResults();
    busqueda = '';
    jQuery('#dffullscreen').removeAttr('visible');
    jQuery('#dffullscreen').attr("hidden", true);
    jQuery("#df-searchbox__dffullscreen,#df-mobile__searchbox__dffullscreen").val("");
    jQuery('.df-mobile__headertop .df-topbar__logo,.clear-or-category .clear').hide();
	jQuery('.clear-or-category .buscar').removeClass('actived');
	//jQuery('.df-searchbox,.df-mobile__searchbox').removeClass('actived');
});

/* Remove bold suggestions text */
jQuery.fn.wrapInTag = function (opts) {
    var tag = opts.tag || 'b', words = opts.words || [], regex = RegExp(words.join('|'), 'gi');
    var replacement = '<' + tag + ' class="find">$&</' + tag + '>';
    return this.html(function () {
        return jQuery(this).text().replace(regex, replacement);
    });
};
/* END Remove bold suggestions text */

/* BUG4 reset parrilla al buscar de nuevo */
function resetLayerContent(){
	if(doResetLayerContent){
		// Movemos los scrolls a la posicion 0
		jQuery('.df-layer__content .df-aside__content').scrollTop(0);
		jQuery('.df-layer__content .df-results').scrollTop(0);
		moveOrder();
		adjustTopFilters(1);
		doResetLayerContent = false;
		if(initialSubheaderHeight == 0){
			initialSubheaderHeight = jQuery('#df-subheader').height(); // Guardamos la altura original del subheader
		}
		jQuery('.df-results').css('margin-top', initialSubheaderHeight);
		showLog('Initial Height '+ initialSubheaderHeight);
	}
}

/* JQUERY EVENTS */
jQuery(document).on('change paste keypress keyup touchend', function (e) { // BUG 24 touchend para iphone
    var buscador = '';
    if (jQuery('#df-searchbox__dffullscreen').is(":visible")) {
        buscador = jQuery('#df-searchbox__dffullscreen');
    } else {
        buscador = jQuery('#df-mobile__searchbox__dffullscreen');
    }

    if (buscador.val() == '') {
		inputempty = true;
        jQuery('.df-categories-list, .clear').hide();
        jQuery('.df-searchbox').removeClass('opened');
        jQuery('.df-mobile__searchbox').removeClass('opened');
        jQuery('.buscar').removeClass('active');
		jQuery('.clear-or-category .clear').hide(); // BUG9
		jQuery('.clear-or-category .buscar').removeClass('actived');
		//jQuery('.df-searchbox,.df-mobile__searchbox').removeClass('actived');
		showLog("clear hide");										   
    } else {
        inputempty = false;
        jQuery('.clear-or-category,.clear-or-category .clear').show();
		jQuery('.clear-or-category .buscar').addClass('actived');
		//jQuery('.df-searchbox,.df-mobile__searchbox').addClass('actived');
		showLog("clear show");
		if (jQuery(e.target).closest(buscador).length == 1 && buscador !== '#df-mobile__searchbox__dffullscreen') {
			if(buscado === true){
				// DESATIVADO AL QUITAR LA SUGERENCIAS
				//hideResults();
			}
		}
    }
    jQuery('span.df-categories-first').text(buscador.val());
    buscador = undefined;
});

jQuery(document).on('click', function (e) {
    if (jQuery(e.target).closest(".menuLogos,.box-icon-hidden").length === 0) {
        jQuery(".hideContent,.menuLogos,.doofinder-hidden-menu").removeClass('active');
    }
});

jQuery(document).on('click', ".df-mobile-categories", function (e) {
    jQuery("#dffullscreen.df-mobile .df-mobile__aside_categories").css('display', 'flex');
    jQuery(".df-mobile__overlay-categories").css('display', 'block');
    jQuery(".df-mobile").css('overflow-y', 'hidden');
});

jQuery(document).on('click', "[data-role='toggle-categories']", function (e) {
    jQuery("#dffullscreen.df-mobile .df-mobile__aside_categories,.df-mobile__overlay-categories").css('display', '');
    jQuery(".df-mobile").css('overflow-y', '');
});

jQuery(document).on('click', ".df-sort-selected", function (e) {
    if (jQuery('.df-sort-select-options').hasClass('opened')) {
        jQuery('.df-sort-select-options,.filter-arrow,.df-sort-selected').removeClass('opened');
    } else {
        jQuery('.df-sort-select-options,.filter-arrow,.df-sort-selected').addClass('opened');
    }
});

jQuery(document).on('click', ".url-noresults-kids", function (e) {
    jQuery('.custom-category[data-category="Infantil"]')[0].click();
});

jQuery(document).on('click', ".url-noresults-adultos", function (e) {
    jQuery('.custom-category[data-category="Adultos"]')[0].click();
});

function removeFilters(clicked){
	filtros = jQuery.grep(filtros, function(value) {
                return value != clicked;
        });
	actualizarGeneros = true;
}

jQuery(document).on('click tap touchstart', ".clear-filter", function (e) {
    jQuery(".df-term[data-facet='" + jQuery(this).data('facet') + "'][data-selected]").each(function (i) {
	var el = jQuery(this);
        el[0].click();
	removeFilters(el.data('value'));
    });
});


/* BEGIN BUG29 */
/* DRAG FILTROS aplicados MOBILE */
 // how many milliseconds is a long press?
	var esclickCloseFilter = false;

	/*jQuery(document).on("click tap touchstart mousedown",".header-filter .filter-close", function( e ) {
		esclickCloseFilter = true;
    } );*/

	jQuery(document).on("touchstart mousedown",".header-filter .filter-close", function( e ) {
		esclickCloseFilter = true;
    } );
	
	jQuery(document).on("touchmove mouseleave",".header-filter .filter-close", function( e ) {
		esclickCloseFilter = false;
	});		

	jQuery(document).on("touchend mouseup",".header-filter .filter-close", function( e ) {	
		if(esclickCloseFilter){
			borrarFiltroAplicado(jQuery(this));
		} else {
			showLog("es arrastre");
		}
		esclickCloseFilter = false;
    } );
	

/* function borrarFiltroAplicado */
function borrarFiltroAplicado(elemento){
	showLog("borrando filtro");
	var el = elemento.parent().text();
	var datafacet = "";
	removeFilters(el);
	//Para los filtros de outlet y precio
	if(jQuery(".df-term[termvalue='"+el+"']")[0]){
		datafacet = jQuery(".df-term[termvalue='"+el+"']").data("facet");
		el = jQuery(".df-term[termvalue='"+el+"']").data("value");
	}

	dfFullscreenLayers[0].layer.controller.params.filter = limpiarFiltros(el,datafacet);
	dfFullscreenLayers[0].layer.controller.refresh();
}	

/* filter-close click ANULAMOS EL EVENTO */	
jQuery(document).on('click tap touchstart', ".header-filter .filter-close", function (e) {
	//borrarFiltroAplicado(jQuery(this));
	//showLog("borrarFiltroAplicado");
});
/* END BUG29 */

/* function limpiarFiltros */	 
function limpiarFiltros(removeValue,tipo = ""){
	var array = dfFullscreenLayers[0].layer.controller.params.filter;
	jQuery.each(array, function(i,val) {
        //Controlamos el tipo para el filtro outlet y filtros de precio
        if(tipo != "" && i == tipo){
            var newArray = jQuery.grep(val, function(valor) {
                return valor != removeValue;
            });
            array[i] = newArray;
        }else if(tipo == ""){
            var newArray = jQuery.grep(val, function(valor) {
                            return valor != removeValue;
                    });
                    array[i] = newArray;
        }
	});
	return array;
}

jQuery(document).on('click tap touchstart', ".df-term:not('.selected')", function (e) {
	e.preventDefault();
	if(jQuery(this).data('facet') != 'genero' && jQuery(this).data('facet') != 'busqueda'){
		actualizarGeneros = true;
	}
});

jQuery(document).on('click tap touchstart', ".df-term.selected", function (e) {
	e.preventDefault();
	if(jQuery(this).attr('termvalue')){
		removeFilters(jQuery(this).attr('termvalue'));
	}else{
		removeFilters(jQuery(this).data('value'));
	}
});

jQuery(document).on('click tap touchstart focus blur', "#search,#search_r,.show-search-bar-container", function (e) {
		jQuery('.clear-or-category .clear').removeAttr("style"); // bug37
		if(jQuery(window).width() > 1024){
			var left = jQuery('#search').offset();
    			left = left.left;
    			jQuery('.df-searchbox').offset({left: left});
    			left = undefined;
		}else if(jQuery(window).width() < 768){
			setTimeout(function(){
				jQuery("#df-mobile__searchbox__dffullscreen").focus();
			},0);
		}
});

jQuery(document).on('click tap touchstart', ".group-logo", function (e) {
	history.replaceState({}, document.title, window.location.href.split('#')[0]);
	mostrar = false;
});

moveOrder();

jQuery(document).ready(function (jQuery) {
	
	function isIphone() {
	  return [
		'iPhone Simulator',
		'iPhone',
	  ].includes(navigator.platform)
	  // iPad on iOS 13 detection
	  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	}
	
	if(isIphone()){
		jQuery('body').addClass('iphone-detected');
		showLog("iphone detected");
	} else {
		showLog("no iphone detected");
	}
	
    var existConditionPromo = setInterval(function () {
        createbut();
    }, 200);
    function createbut() {
        jQuery("#df-aside__dffullscreen .df-panel .df-panel__title").append("<span class='but-open'></span>");
        if (jQuery("#df-aside__dffullscreen .df-panel .but-open").length) {
            clearInterval(existConditionPromo);
        }
    }

    jQuery(window).resize(function () {
        moveOrder();
        adjustTopFilters(dfFullscreenLayers[0].layer.controller.params.page);
    });

   if(jQuery(window).width() > 1025){
        jQuery("#search_mini_form #search,#df-searchbox__dffullscreen").attr("placeholder","");
   }
});

/* BEGIN filtered categories */
function resetCategories(){
	jQuery(".df-list-categories a.df-categoriessidebar:not('.hide')").addClass('hide'); /* reset add hide */	
}
function showMoreCategories(limit){
	jQuery(".df-list-categories a.df-categoriessidebar.hide:not('.filtered')").each(function(){
		if(limit > 0){
			jQuery(this).removeClass("hide");
			limit = limit - 1;
		}
	});		
}

function hideCategories(){
	jQuery("div#filtros span:first-child").css("display","none");
	jQuery("div#filtros #df-categories__sidebar").css("display","none");
	jQuery("div.df-mobile-categories.df-mobile-column").css("display","none");
}

function showCategories(){
	jQuery("div#filtros span:first-child").css("display","inline");
	jQuery("div#filtros #df-categories__sidebar").css("display","block");
	jQuery("div.df-mobile-categories.df-mobile-column").css("display","table");	
}
/* END filtered categories */