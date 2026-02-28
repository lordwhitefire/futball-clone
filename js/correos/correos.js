var correos_oficinas = false;
var clicked = false;

Proj4js.defs = {
    'WGS84': "+title=long/lat:WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
    'EPSG:3875': "+title= Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
};

var source = new Proj4js.Proj('EPSG:3875');
var dest = new Proj4js.Proj('WGS84');

PuntosCorreos = Class.create();
PuntosCorreos.prototype = {

    initialize: function () {

        this.correosResultados = '';
        this.codigoPostalVal = '';
        this.correosMethod = '';

        Event.observe(window, 'load', function () {

            //$('opc-shipping_method').on('change', '.radio', function(e) 
            $$('body')[0].on('change', 'input:radio', function (e) {
                var element = e.element();
                if (!element.disabled && element.name) {
                    switch (element.getValue()) {
                        case 'recogeroficina48_recogeroficina48':
                        case 'recogeroficina72_recogeroficina72':
                            if (!clicked) {
                                clicked = true;
                                PuntosCorreos.getPuntosCorreos(element.getValue());
                            }
                            break;

                        case 'envio48_envio48':
                        case 'envio72_envio72':
                            if (!clicked) {
                                clicked = true;
                                PuntosCorreos.getAddressPhone(element.getValue());
                            }
                            break;

                        case 'correosinter_correosinter':
                            if (typeof ADDITIONAL_MSG_CORREOS_INTERNACIONAL != 'undefined') {
                                $('s_method_correosinter_correosinter').next().insert({ after: '<div class="additional_msg_correos" style="margin: 8px 0 8px 15px; clear: both; "><p>' + ADDITIONAL_MSG_CORREOS_INTERNACIONAL + '</p></div>' })
                            }
                            break;

                        case 'homepaq48_homepaq48':
                        case 'homepaq72_homepaq72':
                            if (!clicked) {
                                clicked = true;
                                PuntosCorreos.getPuntosHomepaq(element.getValue());
                            }
                            break;
                    }
                }
            });
        });
    },

    clearMethods: function () {
        if ($('content_4872_correos') != undefined) { $('content_4872_correos').remove(); }
        if ($('content_puntos_correos') != undefined) { $('content_puntos_correos').remove(); }
        if ($('content_homepaq_correos') != undefined) { $('content_homepaq_correos').remove(); }
    },

    showWaitLoader: function () {
        if ($('shipping-method-please-wait')) {
            Element.show('shipping-method-please-wait');
        }
    },

    hideWaitLoader: function () {
        if ($('shipping-method-please-wait')) {
            Element.hide('shipping-method-please-wait');
        }
        if ($('loading-mask')) {
            Element.hide('loading-mask');
        }
    },

    getAddressPhone: function (method) {
        this.clearMethods();
        this.correosMethod = method;
        this.showWaitLoader();
        this.reloadurl = BASE_URL_CORREOS + 'correos/checkout/getdomicilio/';

        new Ajax.Request(this.reloadurl, {
            method: 'post',
            parameters: {
                metodo: this.correosMethod
            },
            onComplete: this.reloadMethod.bind(this)
        });
    },

    getPuntosHomepaq: function (method) {
        this.clearMethods();
        clicked = false;
        this.correosMethod = method;
        this.showWaitLoader();
        this.reloadurl = BASE_URL_CORREOS + 'correos/checkout/gethomepaq/';

        new Ajax.Request(this.reloadurl, {
            method: 'post',
            parameters: {
                metodo: this.correosMethod
            },
            onComplete: this.reloadMethod.bind(this)
        });

    },

    searchPuntosHomepaq: function () {
        var homepaquser = '';
        if ($('homepaquser') != undefined) {
            homepaquser = $('homepaquser').value;
            this.homepaqUserVal = homepaquser;
        }
        this.clearMethods();

        this.showWaitLoader();
        this.reloadurl = BASE_URL_CORREOS + 'correos/checkout/searchhomepaq/';
        new Ajax.Request(this.reloadurl, {
            method: 'post',
            parameters: {
                user: homepaquser,
                metodo: this.correosMethod
            },
            onComplete: this.reloadMethod.bind(this)
        });
    },

    update_homepaq: function () {
        var puntoActual = $('homepaqs').value;
        this.correosHomepaqResultados.puntos.each(
            function (e) {
                if (e.code == puntoActual) {
                    $('selectedpaq_data').value = e.streetType + " " + e.address + " " + e.number + "|" + e.postalCode + "|" + e.city + "|" + e.state + "|" + e.alias;
                    $('selectedpaq_code').value = e.code;
                    var selected_paqs = e.alias;
                    if (typeof e.alias == 'undefined') {
                        selected_paqs = e.streetType + " " + e.address + " " + e.number + ", " + e.postalCode + " " + e.city + ", " + e.state;
                        selected_paqs = selected_paqs.replace("undefined", "");
                        if (e.city == e.state)
                            selected_paqs = selected_paqs.replace(e.city + ", " + e.state, e.city); //eg Madrid, Madrid 
                    }
                    $('selected_paq').update(selected_paqs);

                }
            }.bind(this));
    },

    getPuntosCorreos: function (method) {
        var codPostal = '';
        if ($('cp_oficina_correos') != undefined && $('cp_oficina_correos').value != '') {
            codPostal = $('cp_oficina_correos').value;
            this.codigoPostalVal = codPostal;
            //Omitsis: canviat del billing pel shipping
        } else if ($('shipping:postcode') != undefined) {
            codPostal = $('shipping:postcode').value;
            this.codigoPostalVal = codPostal;
        } else if ($('order-shipping_address_postcode') != undefined) {
            codPostal = $('order-shipping_address_postcode').value;
            this.codigoPostalVal = codPostal;
        }

        this.clearMethods();
        this.correosMethod = method;
        this.showWaitLoader();
        //Omitsis:Els mÃ©todes del onestep carreguen les dades a la part de la informaciÃ³ de l'enviament
        shippingAddressLoad(true);
        var me = this;
        //Fi Omitsis
        this.reloadurl = BASE_URL_CORREOS + 'correos/checkout/getdata/';

        new Ajax.Request(this.reloadurl, {
            method: 'post',
            parameters: {
                codigoPostal: codPostal,
                metodo: this.correosMethod
            },
            //Omitsis: Els mÃ¨todes del onestep carreguen les dades a la part de la informaciÃ³ de l'enviament
            //TambÃ© s'ha afegit el onFailure
            onComplete: //this.reloadMethod.bind(this)
                function (transport) {
                    if (transport.status === 200) {
                        afterPuntosCorreosSuccess(me, transport);
                    }
                },
            onFailure: function () {
                console.log('retrying ajax request');
                new Ajax.Request(me.reloadurl, {
                    method: 'post',
                    parameters: {
                        codigoPostal: codPostal,
                        metodo: me.correosMethod,
                        retry: 1
                    },
                    onComplete: //this.reloadMethod.bind(this)
                        function (transport) {
                            afterPuntosCorreosSuccess(me, transport);
                        },
                    onFailure: function () {
                        console.log('something went wrong in ajax request');
                    }
                });
            }
            //Fi Omitsis
        });
    },

    fillDropDownCorreos: function (field, data) {
        for (i = field.options.length - 1; i >= 0; i--) { field.remove(i); }
        data.oficinas.each(
            function (e) {
                field.options.add(new Option(e.direccion + " - " + e.cp + ' - ' + e.localidad, e.unidad));
            }
        );
        this.correosInfo();
    },

    correosInfo: function () {
        var puntoActual = $('oficinas_correos_content_select').value;
        this.correosResultados.oficinas.each(
            function (e) {
                if (e.unidad == puntoActual) {
                    //Omitsis - sense la funciÃ³ "update_shipping_info" no arriba la ciutat de l'oficina correctament a la shipping address
                    update_shipping_info(e);
                    if (this.correosResultados.options.show_map == 1) $('correos_info_map').setStyle({ display: 'block' });
                    $('correos_info_time').setStyle({ display: 'block' });

                    // info del punto
                    if (this.correosResultados.options.show_map == 1) this.infoGoogleMaps(e);
                    this.infoHorarios(e);

                }
            }.bind(this));
    },

    infoHorarios: function (e) {
        var tablaHorarios = '<ol>';
        tablaHorarios += '<li><strong>Oficina</strong></li>';
        tablaHorarios += '<li>' + e.nombre + '<li>';
        tablaHorarios += '<li><strong>Horarios</strong></li>';
        tablaHorarios += '<li>Horario de Lunes a Viernes: ' + e.horariolv + '</li>';
        tablaHorarios += '<li>Horario de S&aacute;bados: ' + e.horarios + '</li>';
        tablaHorarios += '<li>Horario de Festivos: ' + e.horariof + '</li>';
        tablaHorarios += '</ol>';
        $('correos_info_time').update(tablaHorarios);
    },

    infoGoogleMaps: function (e) {
        var p = new Proj4js.Point(e.coorx, e.coory);
        var pointDest = Proj4js.transform(source, dest, p);
        var latlng = new google.maps.LatLng(pointDest.y, pointDest.x);
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var imagen = new google.maps.MarkerImage(SKIN_URL_CORREOS + 'correos/images/correos.png', new google.maps.Size(60, 46), new google.maps.Point(0, 0), new google.maps.Point(10, 57));
        var map = new google.maps.Map(document.getElementById("correos_info_map"), myOptions);
        var beachMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: imagen
        });
    },

    insertContentOficina: function (text) {
        if ($('order-shipping-method-info') || $('order-shipping-method-choose')) {
            if ($('order-shipping_method-aditional') != undefined) { $('order-shipping_method-aditional').remove(); }
            text = '<div id="order-shipping_method-aditional" class="box-right"><div class="entry-edit"><div class="entry-edit-head"><div style="float: right;"></div><h4 class="fieldset-legend head-shipping-method icon-head">Adicional</h4></div><div class="fieldset">' + text;
            text += '</div></div></div>';
            //$('order-methods').next().insert({after: text});
        } else {
            //$('s_method_'+this.correosMethod).next().insert({after: text});
        }
        $('shipping-method-content').insert({ bottom: text });
        $('shipping-method-content').show();
        hideShippingAddress();
    },

    reloadChildren: function (transport) {
        var error;
        if ($('shipping-method-please-wait')) {
            Element.hide('shipping-method-please-wait');
        }
        clicked = false;
        try {
            var jsonResponse = transport.responseText.evalJSON(true);
            this.correosResultados = jsonResponse;
        } catch (e) {
            error = true;
        }
        if (!error) {
            jQuery('#shipping-method-content').empty();
            var shipping_method = jQuery('[name=shipping_method]:checked').val();
            if (isCorreosMethod(shipping_method)) {
                jQuery('shipping-method-content').show();
                this.insertContentOficina(this.correosResultados.code);
                if (this.correosResultados.oficinas)
                    this.fillDropDownCorreos($('oficinas_correos_content_select'), this.correosResultados);

                var text = Translator.translate('No results for');
                create_selects(jQuery('#content_puntos_correos'), text);

                jQuery('#cp_oficina_correos').val(jQuery('input[name="shipping[postcode]"]').val());
                if (typeof customer_email != 'undefined' && customer_email) {
                    jQuery('#correos_email').val(customer_email);
                }
                else jQuery('#correos_email').val(jQuery('input[name="shipping[email]"]').val());

                if (typeof customer_telephone != 'undefined' && customer_telephone) {
                    jQuery('#phone_correos').val(customer_telephone);
                }
                else jQuery('#phone_correos').val(jQuery('input[name="shipping[telephone]"]').val());

                checkIfResponsive();
                if (responsiveMode) {
                    setTimeout(go_to_id('shipping-method-content'), 500);

                }
                var regionId = get_region(this.codigoPostalVal);
                if (regionId != undefined) {
                    checkNIFField(regionId.toString());
                } else if (jQuery('#cp_oficina_correos').val() != undefined) {
                    checkNIFField(jQuery('#cp_oficina_correos').val());
                }


            }
        }
    },

    reloadMethod: function (transport, method) {
        this.hideWaitLoader();
        clicked = false;

        if (transport.responseText != '') {
            var htmlInicial = transport.responseText;
            try {
                if (transport.responseText.isJSON()) {
                    var jsonResponse = transport.responseText.evalJSON(true);
                    htmlInicial = jsonResponse.code;
                    this.correosHomepaqResultados = jsonResponse;
                    this.correosResultados = jsonResponse;
                }
            } catch (e) {
                this.correosHomepaqResultados = '';
            }

            if ($('order-shipping-method-info') || $('order-shipping-method-choose')) {
                if ($('order-shipping_method-aditional') != undefined) { $('order-shipping_method-aditional').remove(); }
                htmlInicial = '<div id="order-shipping_method-aditional" class="box-right"><div class="entry-edit"><div class="entry-edit-head"><div style="float: right;"></div><h4 class="fieldset-legend head-shipping-method icon-head">Adicional</h4></div><div class="fieldset">' + htmlInicial;
                htmlInicial += '</div></div></div>';
                $('order-methods').next().insert({ after: htmlInicial });
            } else {
                $('s_method_' + this.correosMethod).next().insert({ after: htmlInicial })
                this.correosInfo();
            }
        }

    },

}
var PuntosCorreos = new PuntosCorreos();




function getStatesWithCitypaq() {
    var field = document.getElementById('citypaq_state');
    if (field.options.length == 0) {
        $("citypaq_searchtype_state_loading").show();
        $("citypaq_state").hide();
        new Ajax.Request(BASE_URL_CORREOS + 'correos/citypaq/getstates/', {
            method: 'post',
            parameters: { metodo: this.correosMethod },
            onComplete: function (transport) {
                $("citypaq_searchtype_state_loading").hide();
                $("citypaq_state").show();
                try {
                    var jsonStates = transport.responseText.evalJSON(true);
                } catch (e) {
                    var jsonStates = '';
                }
                if (jsonStates != '') {
                    for (i = $("citypaq_state").options.length - 1; i >= 0; i--) { $("citypaq_state").remove(i); }
                    jsonStates.states.each(
                        function (e) {
                            $("citypaq_state").options.add(new Option(e.name, e.code));
                        }
                    );
                } else {
                    $("citypaq_search_fail").update('Lo sentimos, ha ocurrido un error en la consulta.');
                }
            }
        });
    }
}
function citypaqsearch() {
    if (!$$('#citypaqs_options input[type="radio"][name="radio_citypaq_searchtype"]').length) {
        alert('Seleccione como quiere buscar los terminales de CityPaq.');
        return false;
    }

    var searchby = "stateCode";
    var searchvalue = $("citypaq_state").value;
    if ($("citypaq_searchtype_cp").checked) {
        searchby = "postalCode";
        searchvalue = $("citypaq_cp").value;
    }


    $("citypaq_search_loading").show();
    $("citypaqs_map_options").hide();


    var field = document.getElementById('citypaqs');
    $("citypaq_search_fail").hide();


    new Ajax.Request(BASE_URL_CORREOS + 'correos/citypaq/getcitypaqs/', {
        method: 'post',
        parameters: { searchby: searchby, searchvalue: searchvalue, user: PuntosCorreos.homepaqUserVal, phone: $('phone_correos').value },
        onComplete: function (result) {

            var correosCityPaq = result;

            $("citypaq_search_loading").hide();
            try {
                jsonCities = correosCityPaq.responseText.evalJSON(true);
            } catch (e) {
                jsonCities = '';
            }
            if (jsonCities.citypaqs == false) {
                $("citypaqs_map_options").hide();
                $("citypaq_search_fail").show();

                $("citypaq_search_fail").update('Lo sentimos, no se encontraron resultados');
            } else if (jsonCities != '') {
                for (i = $("citypaqs").options.length - 1; i >= 0; i--) { $("citypaqs").remove(i); }
                jsonCities.citypaqs.each(
                    function (e) {
                        if (typeof e.alias != 'undefined') {
                            var name = e.alias;
                        } else {
                            var name = e.streetType + " " + e.address + " " + e.number + " " + e.city;
                        }
                        $("citypaqs").options.add(new Option(name, e.code));
                    }
                );
                $("citypaqs_map_options").show();
                $("citypaq_search_fail").hide();
            } else {
                $("citypaqs_map_options").hide();
                $("citypaq_search_fail").show();

                $("citypaq_search_fail").update('Lo sentimos, no se encontraron resultados');
            }


            citypaq_infoGoogleMaps();
            setselectedpaq('citypaqs');

        }
    });
}

function citypaq_infoGoogleMaps() {

    var mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("citypaqs_map"), mapOptions);
    var markericon = new google.maps.MarkerImage(SKIN_URL_CORREOS + 'images/correos/globo_citypaq.png', new google.maps.Size(100, 47), new google.maps.Point(0, 0), new google.maps.Point(50, 47));
    var markersombra = new google.maps.MarkerImage(SKIN_URL_CORREOS + 'images/correos/globosombra.png', new google.maps.Size(100, 19), new google.maps.Point(0, 0), new google.maps.Point(31, 19));
    var marker = new google.maps.Marker({
        map: map,
        icon: markericon,
        shadow: markersombra
    });
    var selected = document.getElementById('citypaqs').value;
    jsonCities.citypaqs.each(function (e) {
        if (e.code == selected) {
            if (typeof e.latitude_wgs84 == 'undefined') {

                var address = e.streetType + " " + e.address + " " + e.number + ", " + e.postalCode;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        marker.setPosition(results[0].geometry.location);
                        map.setCenter(results[0].geometry.location);
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });

            } else {
                var position = new google.maps.LatLng(e.latitude_wgs84, e.longitude_wgs84);
                marker.setPosition(position);
                map.setCenter(position);
            }

            var show_address = e.streetType + " " + e.address + " " + e.number + " " + e.block + "<br>" + e.postalCode + " " + e.city + ", " + e.state;
            show_address = show_address.replace("undefined", "");

            if (e.city == e.state) {
                show_address = show_address.replace(e.city + ", " + e.state, e.city); //eg Madrid, Madrid 
            }

            $("citypaqs_address").update(show_address);
            if (typeof e.schedule != 'undefined') {
                if (e.schedule == "1") {
                    $("citypaqs_schedule").update('En horario de apertura');
                } else {
                    $("citypaqs_schedule").update('24 horas');
                }
            } else {
                $("citypaqs_schedule").update("");
            }
        }
    });

}
function addtofavorites() {
    $("addtofavorites_btn").hide();
    //$("addtofavorites_url").hide();
    $("addtofavorites_loading").show();

    new Ajax.Request(BASE_URL_CORREOS + 'correos/citypaq/addfavorite/', {
        method: 'post',
        parameters: { user: PuntosCorreos.homepaqUserVal, favorite: document.getElementById('citypaqs').value },
        onComplete: function (result) {
            //$("addtofavorites_url").show();
            $("addtofavorites_loading").hide();

            try {
                url = result.responseText.evalJSON(true);
            } catch (e) {
                url = '';
            }
            if (url != '') {
                //$("addtofavorites_url").href = url.url;
                //document.getElementById('addtofavorites_url').src = url.url;
                //$("iframe_homepaq").update('<iframe id="addtofavorites_url" src="'+url.url+'"></iframe>');
                //document.getElementById('addtofavorites_url').src += '';
                jQuery.fancybox.open({
                    padding: 0,
                    href: url.url,
                    width: '860px',
                    height: '320px',
                    autoScale: false,
                    type: 'iframe'
                });
            }
        }
    });

}

function setselectedpaq(selectId) {
    var select = document.getElementById(selectId);
    var paqs = PuntosCorreos.correosHomepaqResultados;
    if (selectId == "citypaqs") {
        paqs = jsonCities;
        $("addtofavorites").show();
    } else {
        $("addtofavorites").hide();
    }
    //$("addtofavorites_url").hide();
    $("addtofavorites_btn").show();

    paqs.citypaqs.each(function (e) {
        if (select.value == e.code) {
            $('selectedpaq_data').setValue(e.streetType + " " + e.address + " " + e.number + "|" + e.postalCode + "|" + e.city + "|" + e.state + "|" + e.alias);
            $("selectedpaq_code").setValue(e.code);
            var selected_paqs = e.alias;

            if (typeof e.alias == 'undefined') {
                selected_paqs = e.streetType + " " + e.address + " " + e.number + ", " + e.postalCode + " " + e.city + ", " + e.state;
                selected_paqs = selected_paqs.replace("undefined", "");
                if (e.city == e.state)
                    selected_paqs = selected_paqs.replace(e.city + ", " + e.state, e.city); //eg Madrid, Madrid 
            }

            $('selected_paq').update(selected_paqs);

        }
    });
}


Validation.add('required-correos', 'Debe rellenar al menos uno de los campos.', function (v) {

    var correosElements = $$('.required-correos');
    var pass = false;
    for (var i = 0; i < correosElements.size(); i++) {
        var correosElement = correosElements[i];

        result = !Validation.get('IsEmpty').test(correosElement.value);

        if (result !== false) {
            pass = true;
        }
    }

    return pass;

});

function isCorreosMethod(method) {
    switch (method) {
        case 'recogeroficina48_recogeroficina48':
            return true;
            break;
        case 'recogeroficina72_recogeroficina72':
            return true;
            break;
        case 'envio48_envio48':
            return true;
            break;
        case 'envio72_envio72':
            return true;
            break;
        case 'homepaq48_homepaq48':
            return true;
            break;
        case 'homepaq72_homepaq72':
            return true;
            break;
        default:
            return false;
    }
}

function afterPuntosCorreosSuccess(me, transport) {
    jQuery('#correos-loading').hide();
    me.reloadChildren(transport);
    shippingAddressShow();
    correos_oficinas = JSON.parse(transport.responseText).oficinas;
}

function get_region(cp) {
    var code = cp.substr(0, 2);
    if (code > regions_es.length) {
        return false;
    }
    return regions_es[parseInt(code) - 1];
}

var regions_es = [
    131, //Alava
    132, //Albacete
    133, //Alicante
    134, //AlmerÃ­a
    136, //Avila
    137, //Badajoz
    138, //Baleares
    139, //Bacelona
    140, //Burgos
    141, //Caceres
    142, //Cadiz
    144, //Castellon
    146, //Ciudad Real
    147, //Cordoba
    130, //A CoruÃ±a
    148, //Cuenca
    149, //Girona
    150, //Granada
    151, //Guadalajara
    152, //Guipuzcuoa
    153, //Huelva
    154, //Huesca
    155, //Jaen
    158, //Leon
    159, //Lleida
    156, //La rioja
    160, //Lugo
    161, //Madrid
    162, //Malaga
    164, //Murcia
    165, //Navarra
    166, //Ourense
    135, //Asturias
    167, //Palencia
    157, //Las Palmas
    168, //Pontevedra
    169, //Salamanca
    170, //Santa Cruz de Tenerife
    143, //Cantabria
    171, //Segovia
    172, //Sevilla
    173, //Soria
    174, //Tarragona
    175, //Teruel
    176, //Toledo
    177, //Valencia
    178, //Valladolid
    179, //Vizcaya
    180, //Zamora
    181, //Zaragoza
    145, //Ceuta
    163 //Melilla
];

function update_shipping_info(oficina) {
    jQuery('#shipping\\:street1').val(oficina.direccion);
    jQuery('#shipping\\:city').val(oficina.localidad);
    jQuery('#shipping\\:postcode').val(oficina.cp);
    var regionId = get_region(oficina.cp);
    if (regionId != undefined) {
        jQuery('#shipping\\:region_id').val(regionId);
    }
}