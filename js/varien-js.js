function popWin(url, win, para) {
    var win = window.open(url, win, para);
    win.focus();
}

function setLocation(url) {
    window.location.href = encodeURI(url);
}

function setPLocation(url, setFocus) {
    if (setFocus) {
        window.opener.focus();
    }
    window.opener.location.href = encodeURI(url);
}

/**
 * @deprecated
 */
function setLanguageCode(code, fromCode) {
    //TODO: javascript cookies have different domain and path than php cookies
    var href = window.location.href;
    var after = '', dash;
    if (dash = href.match(/\#(.*)$/)) {
        href = href.replace(/\#(.*)$/, '');
        after = dash[0];
    }

    if (href.match(/[?]/)) {
        var re = /([?&]store=)[a-z0-9_]*/;
        if (href.match(re)) {
            href = href.replace(re, '$1' + code);
        } else {
            href += '&store=' + code;
        }

        var re = /([?&]from_store=)[a-z0-9_]*/;
        if (href.match(re)) {
            href = href.replace(re, '');
        }
    } else {
        href += '?store=' + code;
    }
    if (typeof (fromCode) != 'undefined') {
        href += '&from_store=' + fromCode;
    }
    href += after;

    setLocation(href);
}

/**
 * Add classes to specified elements.
 * Supported classes are: 'odd', 'even', 'first', 'last'
 *
 * @param elements - array of elements to be decorated
 * [@param decorateParams] - array of classes to be set. If omitted, all available will be used
 */
function decorateGeneric(elements, decorateParams) {
    var allSupportedParams = ['odd', 'even', 'first', 'last'];
    var _decorateParams = {};
    var total = elements.length;

    if (total) {
        // determine params called
        if (typeof (decorateParams) == 'undefined') {
            decorateParams = allSupportedParams;
        }
        if (!decorateParams.length) {
            return;
        }
        for (var k in allSupportedParams) {
            _decorateParams[allSupportedParams[k]] = false;
        }
        for (var k in decorateParams) {
            _decorateParams[decorateParams[k]] = true;
        }

        // decorate elements
        // elements[0].addClassName('first'); // will cause bug in IE (#5587)
        if (_decorateParams.first) {
            Element.addClassName(elements[0], 'first');
        }
        if (_decorateParams.last) {
            Element.addClassName(elements[total - 1], 'last');
        }
        for (var i = 0; i < total; i++) {
            if ((i + 1) % 2 == 0) {
                if (_decorateParams.even) {
                    Element.addClassName(elements[i], 'even');
                }
            } else {
                if (_decorateParams.odd) {
                    Element.addClassName(elements[i], 'odd');
                }
            }
        }
    }
}

/**
 * Decorate table rows and cells, tbody etc
 * @see decorateGeneric()
 */
function decorateTable(table, options) {
    var table = $(table);
    if (table) {
        // set default options
        var _options = {
            'tbody': false,
            'tbody tr': ['odd', 'even', 'first', 'last'],
            'thead tr': ['first', 'last'],
            'tfoot tr': ['first', 'last'],
            'tr td': ['last']
        };
        // overload options
        if (typeof (options) != 'undefined') {
            for (var k in options) {
                _options[k] = options[k];
            }
        }
        // decorate
        if (_options['tbody']) {
            decorateGeneric(table.select('tbody'), _options['tbody']);
        }
        if (_options['tbody tr']) {
            decorateGeneric(table.select('tbody tr'), _options['tbody tr']);
        }
        if (_options['thead tr']) {
            decorateGeneric(table.select('thead tr'), _options['thead tr']);
        }
        if (_options['tfoot tr']) {
            decorateGeneric(table.select('tfoot tr'), _options['tfoot tr']);
        }
        if (_options['tr td']) {
            var allRows = table.select('tr');
            if (allRows.length) {
                for (var i = 0; i < allRows.length; i++) {
                    decorateGeneric(allRows[i].getElementsByTagName('TD'), _options['tr td']);
                }
            }
        }
    }
}

/**
 * Set "odd", "even" and "last" CSS classes for list items
 * @see decorateGeneric()
 */
function decorateList(list, nonRecursive) {
    if ($(list)) {
        if (typeof (nonRecursive) == 'undefined') {
            var items = $(list).select('li');
        } else {
            var items = $(list).childElements();
        }
        decorateGeneric(items, ['odd', 'even', 'last']);
    }
}

/**
 * Set "odd", "even" and "last" CSS classes for list items
 * @see decorateGeneric()
 */
function decorateDataList(list) {
    list = $(list);
    if (list) {
        decorateGeneric(list.select('dt'), ['odd', 'even', 'last']);
        decorateGeneric(list.select('dd'), ['odd', 'even', 'last']);
    }
}

/**
 * Parse SID and produces the correct URL
 */
function parseSidUrl(baseUrl, urlExt) {
    var sidPos = baseUrl.indexOf('/?SID=');
    var sid = '';
    urlExt = (urlExt != undefined) ? urlExt : '';

    if (sidPos > -1) {
        sid = '?' + baseUrl.substring(sidPos + 2);
        baseUrl = baseUrl.substring(0, sidPos + 1);
    }

    return baseUrl + urlExt + sid;
}

/**
 * Formats currency using patern
 * format - JSON (pattern, decimal, decimalsDelimeter, groupsDelimeter)
 * showPlus - true (always show '+'or '-'),
 *      false (never show '-' even if number is negative)
 *      null (show '-' if number is negative)
 */

function formatCurrency(price, format, showPlus) {
    var precision = isNaN(format.precision = Math.abs(format.precision)) ? 2 : format.precision;
    var requiredPrecision = isNaN(format.requiredPrecision = Math.abs(format.requiredPrecision)) ? 2 : format.requiredPrecision;

    //precision = (precision > requiredPrecision) ? precision : requiredPrecision;
    //for now we don't need this difference so precision is requiredPrecision
    precision = requiredPrecision;

    var integerRequired = isNaN(format.integerRequired = Math.abs(format.integerRequired)) ? 1 : format.integerRequired;

    var decimalSymbol = format.decimalSymbol == undefined ? "," : format.decimalSymbol;
    var groupSymbol = format.groupSymbol == undefined ? "." : format.groupSymbol;
    var groupLength = format.groupLength == undefined ? 3 : format.groupLength;

    var s = '';

    if (showPlus == undefined || showPlus == true) {
        s = price < 0 ? "-" : (showPlus ? "+" : "");
    } else if (showPlus == false) {
        s = '';
    }

    var i = parseInt(price = Math.abs(+price || 0).toFixed(precision)) + "";
    var pad = (i.length < integerRequired) ? (integerRequired - i.length) : 0;
    while (pad) {
        i = '0' + i;
        pad--;
    }
    j = (j = i.length) > groupLength ? j % groupLength : 0;
    re = new RegExp("(\\d{" + groupLength + "})(?=\\d)", "g");

    /**
     * replace(/-/, 0) is only for fixing Safari bug which appears
     * when Math.abs(0).toFixed() executed on "0" number.
     * Result is "0.-0" :(
     */
    var r = (j ? i.substr(0, j) + groupSymbol : "") + i.substr(j).replace(re, "$1" + groupSymbol) + (precision ? decimalSymbol + Math.abs(price - i).toFixed(precision).replace(/-/, 0).slice(2) : "");
    var pattern = '';
    if (format.pattern.indexOf('{sign}') == -1) {
        pattern = s + format.pattern;
    } else {
        pattern = format.pattern.replace('{sign}', s);
    }

    return pattern.replace('%s', r).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

function expandDetails(el, childClass) {
    if (Element.hasClassName(el, 'show-details')) {
        $$(childClass).each(function (item) {
            item.hide();
        });
        Element.removeClassName(el, 'show-details');
    } else {
        $$(childClass).each(function (item) {
            item.show();
        });
        Element.addClassName(el, 'show-details');
    }
}

// Version 1.0
var isIE = navigator.appVersion.match(/MSIE/) == "MSIE";

if (!window.Varien)
    var Varien = new Object();

Varien.showLoading = function () {
    var loader = $('loading-process');
    loader && loader.show();
};
Varien.hideLoading = function () {
    var loader = $('loading-process');
    loader && loader.hide();
};
Varien.GlobalHandlers = {
    onCreate: function () {
        Varien.showLoading();
    },

    onComplete: function () {
        if (Ajax.activeRequestCount == 0) {
            Varien.hideLoading();
        }
    }
};

Ajax.Responders.register(Varien.GlobalHandlers);

/**
 * Quick Search form client model
 */
Varien.searchForm = Class.create();
Varien.searchForm.prototype = {
    initialize: function (form, field, emptyText) {
        this.form = $(form);
        this.field = $(field);
        this.emptyText = emptyText;

        Event.observe(this.form, 'submit', this.submit.bind(this));
        Event.observe(this.field, 'focus', this.focus.bind(this));
        Event.observe(this.field, 'blur', this.blur.bind(this));
        this.blur();
    },

    submit: function (event) {
        if (this.field.value == this.emptyText || this.field.value == '') {
            Event.stop(event);
            return false;
        }
        return true;
    },

    focus: function (event) {
        if (this.field.value == this.emptyText) {
            this.field.value = '';
        }

    },

    blur: function (event) {
        if (this.field.value == '') {
            this.field.value = this.emptyText;
        }
    },

    initAutocomplete: function (url, destinationElement) {
        new Ajax.Autocompleter(
            this.field,
            destinationElement,
            url,
            {
                paramName: this.field.name,
                method: 'get',
                minChars: 2,
                updateElement: this._selectAutocompleteItem.bind(this),
                onShow: function (element, update) {
                    if (!update.style.position || update.style.position == 'absolute') {
                        update.style.position = 'absolute';
                        Position.clone(element, update, {
                            setHeight: false,
                            offsetTop: element.offsetHeight
                        });
                    }
                    Effect.Appear(update, {duration: 0});
                }

            }
        );
    },

    _selectAutocompleteItem: function (element) {
        if (element.title) {
            this.field.value = element.title;
        }
        this.form.submit();
    }
};

Varien.Tabs = Class.create();
Varien.Tabs.prototype = {
    initialize: function (selector) {
        var self = this;
        $$(selector + ' a').each(this.initTab.bind(this));
    },

    initTab: function (el) {
        el.href = 'javascript:void(0)';
        if ($(el.parentNode).hasClassName('active')) {
            this.showContent(el);
        }
        el.observe('click', this.showContent.bind(this, el));
    },

    showContent: function (a) {
        var li = $(a.parentNode), ul = $(li.parentNode);
        ul.getElementsBySelector('li', 'ol').each(function (el) {
            var contents = $(el.id + '_contents');
            if (el == li) {
                el.addClassName('active');
                contents.show();
            } else {
                el.removeClassName('active');
                contents.hide();
            }
        });
    }
};

Varien.DateElement = Class.create();
Varien.DateElement.prototype = {
    initialize: function (type, content, required, format) {
        if (type == 'id') {
            // id prefix
            this.day = $(content + 'day');
            this.month = $(content + 'month');
            this.year = $(content + 'year');
            this.full = $(content + 'full');
            this.advice = $(content + 'date-advice');
        } else if (type == 'container') {
            // content must be container with data
            this.day = content.day;
            this.month = content.month;
            this.year = content.year;
            this.full = content.full;
            this.advice = content.advice;
        } else {
            return;
        }

        this.required = required;
        this.format = format;

        this.day.addClassName('validate-custom');
        this.day.validate = this.validate.bind(this);
        this.month.addClassName('validate-custom');
        this.month.validate = this.validate.bind(this);
        this.year.addClassName('validate-custom');
        this.year.validate = this.validate.bind(this);

        this.setDateRange(false, false);
        this.year.setAttribute('autocomplete', 'off');

        this.advice.hide();

        var date = new Date;
        this.curyear = date.getFullYear();
    },
    validate: function () {
        var error = false,
            day = parseInt(this.day.value, 10) || 0,
            month = parseInt(this.month.value, 10) || 0,
            year = parseInt(this.year.value, 10) || 0;
        if (this.day.value.strip().empty()
            && this.month.value.strip().empty()
            && this.year.value.strip().empty()
        ) {
            if (this.required) {
                error = 'This date is a required value.';
            } else {
                this.full.value = '';
            }
        } else if (!day || !month || !year) {
            error = 'Please enter a valid full date';
        } else {
            var date = new Date, countDaysInMonth = 0, errorType = null;
            date.setYear(year);
            date.setMonth(month - 1);
            date.setDate(32);
            countDaysInMonth = 32 - date.getDate();
            if (!countDaysInMonth || countDaysInMonth > 31) countDaysInMonth = 31;
            if (year < 1900) error = this.errorTextModifier(this.validateDataErrorText);

            if (day < 1 || day > countDaysInMonth) {
                errorType = 'day';
                error = 'Please enter a valid day (1-%d).';
            } else if (month < 1 || month > 12) {
                errorType = 'month';
                error = 'Please enter a valid month (1-12).';
            } else {
                if (day % 10 == day) this.day.value = '0' + day;
                if (month % 10 == month) this.month.value = '0' + month;
                this.full.value = this.format.replace(/%[mb]/i, this.month.value).replace(/%[de]/i, this.day.value).replace(/%y/i, this.year.value);
                var testFull = this.month.value + '/' + this.day.value + '/' + this.year.value;
                var test = new Date(testFull);
                if (isNaN(test)) {
                    error = 'Please enter a valid date.';
                } else {
                    this.setFullDate(test);
                }
            }
            var valueError = false;
            if (!error && !this.validateData()) {//(year<1900 || year>curyear) {
                errorType = this.validateDataErrorType;//'year';
                valueError = this.validateDataErrorText;//'Please enter a valid year (1900-%d).';
                error = valueError;
            }
        }

        if (error !== false) {
            try {
                error = Translator.translate(error);
            } catch (e) {
            }
            if (!valueError) {
                this.advice.innerHTML = error.replace('%d', countDaysInMonth);
            } else {
                this.advice.innerHTML = this.errorTextModifier(error);
            }
            this.advice.show();
            return false;
        }

        // fixing elements class
        this.day.removeClassName('validation-failed');
        this.month.removeClassName('validation-failed');
        this.year.removeClassName('validation-failed');

        this.advice.hide();
        return true;
    },
    validateData: function () {
        var year = this.fullDate.getFullYear();
        return (year >= 1900 && year <= this.curyear);
    },
    validateDataErrorType: 'year',
    validateDataErrorText: 'Please enter a valid year (1900-%d).',
    errorTextModifier: function (text) {
        text = Translator.translate(text);
        return text.replace('%d', this.curyear);
    },
    setDateRange: function (minDate, maxDate) {
        this.minDate = minDate;
        this.maxDate = maxDate;
    },
    setFullDate: function (date) {
        this.fullDate = date;
    }
};

Varien.DOB = Class.create();
Varien.DOB.prototype = {
    initialize: function (selector, required, format) {
        var el = $$(selector)[0];
        var container = {};
        container.day = Element.select(el, '.dob-day input')[0];
        container.month = Element.select(el, '.dob-month input')[0];
        container.year = Element.select(el, '.dob-year input')[0];
        container.full = Element.select(el, '.dob-full input')[0];
        container.advice = Element.select(el, '.validation-advice')[0];

        new Varien.DateElement('container', container, required, format);
    }
};

Varien.dateRangeDate = Class.create();
Varien.dateRangeDate.prototype = Object.extend(new Varien.DateElement(), {
    validateData: function () {
        var validate = true;
        if (this.minDate || this.maxValue) {
            if (this.minDate) {
                this.minDate = new Date(this.minDate);
                this.minDate.setHours(0);
                if (isNaN(this.minDate)) {
                    this.minDate = new Date('1/1/1900');
                }
                validate = validate && (this.fullDate >= this.minDate);
            }
            if (this.maxDate) {
                this.maxDate = new Date(this.maxDate);
                this.minDate.setHours(0);
                if (isNaN(this.maxDate)) {
                    this.maxDate = new Date();
                }
                validate = validate && (this.fullDate <= this.maxDate);
            }
            if (this.maxDate && this.minDate) {
                this.validateDataErrorText = 'Please enter a valid date between %s and %s';
            } else if (this.maxDate) {
                this.validateDataErrorText = 'Please enter a valid date less than or equal to %s';
            } else if (this.minDate) {
                this.validateDataErrorText = 'Please enter a valid date equal to or greater than %s';
            } else {
                this.validateDataErrorText = '';
            }
        }
        return validate;
    },
    validateDataErrorText: 'Date should be between %s and %s',
    errorTextModifier: function (text) {
        if (this.minDate) {
            text = text.sub('%s', this.dateFormat(this.minDate));
        }
        if (this.maxDate) {
            text = text.sub('%s', this.dateFormat(this.maxDate));
        }
        return text;
    },
    dateFormat: function (date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
});

Varien.FileElement = Class.create();
Varien.FileElement.prototype = {
    initialize: function (id) {
        this.fileElement = $(id);
        this.hiddenElement = $(id + '_value');

        this.fileElement.observe('change', this.selectFile.bind(this));
    },
    selectFile: function (event) {
        this.hiddenElement.value = this.fileElement.getValue();
    }
};

/**
 * Create form element. Set parameters into it and send
 *
 * @param url
 * @param parametersArray
 * @param method
 */
Varien.formCreator = Class.create();
Varien.formCreator.prototype = {
    initialize: function (url, parametersArray, method) {
        this.url = url;
        this.parametersArray = JSON.parse(parametersArray);
        this.method = method;
        this.form = '';

        this.createForm();
        this.setFormData();
    },
    createForm: function () {
        this.form = new Element('form', {'method': this.method, action: this.url});
    },
    setFormData: function () {
        for (var key in this.parametersArray) {
            Element.insert(
                this.form,
                new Element('input', {name: key, value: this.parametersArray[key], type: 'hidden'})
            );
        }
    }
};

Validation.addAllThese([
    ['validate-custom', ' ', function (v, elm) {
        return elm.validate();
    }]
]);

function truncateOptions() {
    $$('.truncated').each(function (element) {
        Event.observe(element, 'mouseover', function () {
            if (element.down('div.truncated_full_value')) {
                element.down('div.truncated_full_value').addClassName('show');
            }
        });
        Event.observe(element, 'mouseout', function () {
            if (element.down('div.truncated_full_value')) {
                element.down('div.truncated_full_value').removeClassName('show');
            }
        });

    });
}

if (typeof jQuery != 'undefined') {
    jQuery.noConflict();
}

Event.observe(window, 'load', function () {
    truncateOptions();
});

Element.addMethods({
    getInnerText: function (element) {
        element = $(element);
        if (element.innerText && !Prototype.Browser.Opera) {
            return element.innerText;
        }
        return element.innerHTML.stripScripts().unescapeHTML().replace(/[\n\r\s]+/g, ' ').strip();
    }
});

/**
 * Executes event handler on the element. Works with event handlers attached by Prototype,
 * in a browser-agnostic fashion.
 * @param element The element object
 * @param event Event name, like 'change'
 *
 * @example fireEvent($('my-input', 'click'));
 */
function fireEvent(element, event) {
    if (document.createEvent) {
        // dispatch for all browsers except IE before version 9
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true); // event type, bubbling, cancelable
        return element.dispatchEvent(evt);
    } else {
        // dispatch for IE before version 9
        var evt = document.createEventObject();
        return element.fireEvent('on' + event, evt);
    }
}

/**
 * Returns more accurate results of floating-point modulo division
 * E.g.:
 * 0.6 % 0.2 = 0.19999999999999996
 * modulo(0.6, 0.2) = 0
 *
 * @param dividend
 * @param divisor
 */
function modulo(dividend, divisor) {
    var epsilon = divisor / 10000;
    var remainder = dividend % divisor;

    if (Math.abs(remainder - divisor) < epsilon || Math.abs(remainder) < epsilon) {
        remainder = 0;
    }

    return remainder;
}

/**
 * createContextualFragment is not supported in IE9. Adding its support.
 */
if ((typeof Range != "undefined") && !Range.prototype.createContextualFragment) {
    Range.prototype.createContextualFragment = function (html) {
        var frag = document.createDocumentFragment(),
            div = document.createElement("div");
        frag.appendChild(div);
        div.outerHTML = html;
        return frag;
    };
}

function customFormSubmit(url, parametersArray, method) {
    var createdForm = new Varien.formCreator(url, parametersArray, method);
    Element.insert($$('body')[0], createdForm.form);
    createdForm.form.submit();
}

function customFormSubmitToParent(url, parametersArray, method) {
    new Ajax.Request(url, {
        method: method,
        parameters: JSON.parse(parametersArray),
        onSuccess: function (response) {
            var node = document.createElement('div');
            node.innerHTML = response.responseText;
            var responseMessage = node.getElementsByClassName('messages')[0];
            var pageTitle = window.document.body.getElementsByClassName('page-title')[0];
            pageTitle.insertAdjacentHTML('afterend', responseMessage.outerHTML);
            window.opener.focus();
            window.opener.location.href = response.transport.responseURL;
        }
    });
}


/** OMITSIS ALL PAGES */

/* DIALOG POP UP FUNCTIONS */
var keys = [37, 38, 39, 40];
var showDialog = 0;

var showExitModal = true;

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

//Listener que bloqueja el scroll a iPad i iPhone i el seu efecte rebot
document.addEventListener('touchmove', function (evt) {
    if (showDialog) {
        evt.preventDefault()
    }
});

function closeDialog(id){
    if(id == 'pin-validate'){
        enableTrField();
    }
    if(id == 'modal_exit_notice'){
        isCurrentLinkAjax = false;
        currentAjaxLinkUrl = "";
        currentAjaxLinkName = "";
        currentAjaxLInkDestUrl = "";
    }
    if(id == "modal_desestimar_order_confirm"){

    }
    showTable = 0;
    showDialog = 0;
    jQuery(".backdrop#" + id).hide();
    jQuery('body').css('overflow-x', '');
    jQuery('body').css('overflow-y', '');
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    if (id == 'size-related') {
        jQuery('.page .overlay-loading').hide();
    } else if (id == 'add-to-cart-info') {
        jQuery('.backdrop#' + id + ' .dialog-content .cart-dialog-wrapper').removeAttr('style');
        jQuery('.backdrop#' + id + ' .dialog-content #cart-dialog-error-message').removeAttr('style');
    }

    if(id == "modal_desestimar_iframe"){
        showAccountSectionLoading();
        //var extdocumentno = jQuery('.header-actions-cancel-apply').attr('data-extdocumentno');
        var order_num = jQuery('.header-actions-cancel-apply').attr('data-documentno');
        var backOpenedElems = getOpenedElemsParams();
        window.location.href = backToOrderUrl+backOpenedElems;
        return false;
    }
}

function openDialog(id) {
    showDialog = 1;
    jQuery(".backdrop#" + id).css("display", "flex");
    //fixOverflow(id); //Usando el Custom Scroll no hace falta
    jQuery('body').css('overflow-x', 'hidden');
    jQuery('body').css('overflow-y', 'hidden');
    if (id == 'add-to-cart-info') {
        jQuery('.domino-button .ripple').remove();
    }else if(id === 'box-forgotpassword' && jQuery('#email_address').length){
        const $mainEmail = jQuery('#email');
        // Solo si el campo principal tiene el atributo "readonly"
        if ($mainEmail.prop('readonly')) {
            const emailValue = $mainEmail.val();
            if (emailValue) {
                jQuery('#email_address').val(emailValue).focus();
            }
        }
    }
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;

    var maxWidth = Math.max.apply(Math, jQuery('.size-title').map(function () {
        return jQuery(this).width();
    }).get());
    jQuery(".size-title").width(maxWidth + 2);
    if(id != 'modal_desestimar_iframe'){
        if (jQuery(".backdrop#" + id + " .dialog").length) {
            jQuery(".backdrop#" + id + " .dialog").mCustomScrollbar('destroy');
            jQuery(".backdrop#" + id + " .dialog").mCustomScrollbar();
        }
    }
    
    if (id == 'product-info') {
        calculateDialogRelatedImgMinHeight();
    }
}

function closeDialogHeader(id) {
    jQuery(".backdrop#" + id).hide();
}

function openDialogHeader(id) {
    jQuery(".backdrop#" + id).css("display", "flex");
}

/** Talla el text del short description que es mostra a la graella de productes i diferents llistats (related, cross sell, etc.) */
function truncateText(extraOffset) {
    var w = jQuery('.item .wrapper-img.item').width();
    jQuery('.upper-box-normal .img-bot-icons').each(function () {
        var price = parseFloat(jQuery(this).find('.img-bot-prices').width());
        var name = jQuery(this).find('.img-bot-name .name-nohover');
        var max = w - (Math.ceil(price) + extraOffset); //10px de padding(5 per costat) + 5 el normal, open/close menu sumem mes(20)
        name.css('max-width', max);
    });
}

/* ONLY RESPONSIVE */

var responsiveMode = false;
var automaticScroll = false;

function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        return true;
    } else {			// Ipad PRO
        return navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);
    }
}

//If some skip-content is active, then we are in responsive deign
function checkIfResponsive() {
    responsiveMode = false;
    var is_iOS = isIOS();
    var is_Android = navigator.userAgent.match(/Android/i) != null;
    var is_BlackBerry = navigator.userAgent.match(/BlackBerry/i) != null;
    var is_OperaMini = navigator.userAgent.match(/Opera Mini/i) != null;
    var is_WindowsMobile = navigator.userAgent.match(/IEMobile/i) != null;

    if (is_iOS || is_Android || is_BlackBerry || is_OperaMini || is_WindowsMobile) {
        responsiveMode = true;
        return false;
    } else if (jQuery(window).width() < 1024) {
        responsiveMode = true;
        return false;
    }
}

function responsiveGridItemsHover(context) {
    jQuery('.box-item .upper-box-normal', context).on('click', function (event) {
        jQuery('.box-item .upper-box-hover', context).hide();
        var elem = jQuery(this).parent().find('.upper-box-hover').show().addClass('opened');
        scroll_if_not_visible(elem.children('.upper-box-hover-content'));
        jQuery(this).css({'box-shadow': 'none'});
    });
    jQuery(document).mouseup(function (e) {
        var container = jQuery(".upper-box-hover.opened");
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            hideHover(container);
        }
    });
}

function hideHover(element) {
    element.hide().removeClass('opened');
    element.parent().find('.upper-box-normal').css({
        'box-shadow': '0px 0px 2px #ADAFB1',
        '-webkit-box-shadow': '0px 0px 2px #ADAFB1',
        '-moz-box-shadow': '0px 0px 2px #ADAFB1'
    });
}

function responsiveGridCarouselItemsHover(id) {
    jQuery(id + ' .block-content .upper-box-normal').click(function (e) {
        jQuery('.mini-grid-products .upper-box-hover').css('visibility', 'hidden');
        jQuery('.mini-grid-products .upper-box-normal').css('display', 'block');
        jQuery(this).parent().find('.upper-box-normal').css('display', 'none');
        jQuery(this).parent().find('.upper-box-hover').show().addClass('opened');
        jQuery(this).parent().find('.upper-box-hover').css('visibility', 'visible');
    });

    jQuery(document).mouseup(function (e) {
        if (isAnyHoverOpen()) {
            var container = jQuery(".upper-box-hover");

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.css('visibility', 'hidden');
                container.parent().find('.upper-box-normal').css('display', 'block');
            }
        }
    });
}

function isAnyHoverOpen() {
    return jQuery('.upper-box-hover.opened').length ? true : false;
}

var id2;

function closeOnScroll() {
    if (!automaticScroll && isAnyHoverOpen()) {
        hideHover(jQuery('.upper-box-hover.opened'));
        jQuery('.mini-grid-products .upper-box-hover').css('visibility', 'hidden');
        jQuery('.mini-grid-products .upper-box-normal').css('display', 'block');
    }
    setTimeout(function () {
        automaticScroll = false;
    }, 450);
}

/** End Mini products list **/

var check_iphone_resize = false;
var is_chrome;
var is_explorer;
var is_firefox;
var is_safari;
var is_opera;

function check_user_agent() {
    is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    is_safari = navigator.userAgent.indexOf("Safari") > -1;
    is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome) && (is_safari)) {
        is_safari = false;
    }
    if ((is_chrome) && (is_opera)) {
        is_chrome = false;
    }
}

function checkResponsiveDesign() {
    checkIfResponsive();
    if (responsiveMode) {
        jQuery('body').addClass("is-responsive");
    }
}

let isRegisterPage = false;
let isSalesOrderView = false;
let updateActiveClassOnMenu = true;
let isCurrentLinkAjax = false;
let currentAjaxLinkUrl = "";
let currentAjaxLinkName = "";
let currentAjaxLInkDestUrl = "";



console.log("isSalesOrderView)"+isSalesOrderView);


async function showPaginationContent(dataSource,pagination) {
    return new Promise((resolve) => {
        var html= '';
        /*var html = '<ul>';
        jQuery.each(data, function(index, item){
            html += '<li>'+ item.ExternalDocNo +'</li>';
        });
        html += '</ul>';*/
        jQuery('.loading').show();
        
        dataContainer.hide();
        jQuery.ajax({
            url: urlPagination,
            type: 'POST',
            data: {items: JSON.stringify(dataSource),page: pagination.pageNumber,limit: pagination.pageSize},
            error: function(response){
                jQuery('.loading').hide();
                resolve();
            },
            success: function(response){
                jQuery('.loading').hide();
                if(response.trim() == ""){
                    dataContainer.html("<p class='history-empty-results'>No se han encontrado pedidos</p>");
                    jQuery("#pagination-container").hide();
                    dataContainer.show();
                }else{
                    html = response;
                    dataContainer.html(html);
                    jQuery("#pagination-container").show();
                    dataContainer.show();
                }
                resolve();
            }
        });
        
    });
    
}

jQuery(document).ready(function () {

    if(jQuery("body").hasClass("customer-account-create")){
        isRegisterPage = true;
    }else if(jQuery("body").hasClass("sales-order-view")){
        isSalesOrderView = true;
    }
    console.log("isSalesOrderView)"+isSalesOrderView);
    checkIfResponsive();
    if (responsiveMode) {
        jQuery('body').addClass("is-responsive");
        check_user_agent();
        initial_mobile_size = jQuery(window).width() * jQuery(window).height();
        if (typeof is_iphone !== 'undefined') {
            if (is_iphone()) {
                jQuery('body').addClass('iphone');
                if (is_safari) {
                    check_iphone_resize = true;
                    onresize_safari();
                }
            }
        }
        jQuery(window).on('scroll', function () {
            clearTimeout(id2);
            id2 = setTimeout(closeOnScroll, 100); // si el usuari va molt ràpid se li pot tancar el hover. Però així evitem tantes crides
        });

        
    }

    jQuery(document).on('click', '.domino-button', function(e) {
        createRipple(e);
    });
        
    jQuery('.backdrop').click(function (e) {
        if (jQuery(e.target).hasClass('ripple')) {
            return; // No hagas nada si el clic fue en el span.ripple
        }
        let target = jQuery(e.target);
        let body = jQuery('body');
        if (jQuery(this).is('#stock-change')) {
            if (target.attr('class') !== "dialog" && target.parents(".dialog").size() === 0) {
                modifyqty(productsQty, urlModify);
            }
        } else if (!jQuery(this).hasClass('loginform')) { // Para no cruzar con el backdrop del account
            if (target.attr('class') !== "dialog" && target.parents(".dialog").size() === 0) {
                let backdropId = target.closest('.backdrop').attr('id');
                closeDialog(backdropId);
                if (backdropId === 'menu-backdrop') {
                    if (showMenu) {
                        isBlocked = 1;
                        close_menu_responsive();
                    }
                }
            }
        }

        // sidebar menu mobile close
        if (target.attr('class') !== 'login-sidebar' && target.parents('.login-sidebar ').size() === 0 && target.attr('class')!="btn btn-primary btn-cac") {
            let menuMobile = jQuery('#login-sidebar-mobile');
            let menuMobileAccount = jQuery('#login-sidebar-mobile-account');
            menuMobile.hide('slide', function () {
                jQuery('#menu-backdrop').hide();
                body.removeClass('stop-scrolling');
                body.unbind('touchmove');
            });
            menuMobileAccount.hide('slide', function () {
                jQuery('#menu-backdrop').hide();
                body.removeClass('stop-scrolling');
                body.unbind('touchmove');
            });
        }
    });
    /* Todos los dialog, si necesitan scroll debe ser el Custom */
    // jQuery('.backdrop .dialog').mCustomScrollbar();

    // Login validation button
    let loginForm = jQuery('#login-form');
    let loginEmail = loginForm.find('#email');
    loginForm.bind('propertychange change click keyup input paste', function () {
        validationLoginEmailAndPassword(loginForm);
    });

    loginForm.on('submit', function (e) {
        showMainContainerLoading();
        //jQuery('.overlay-loading').show();
    });

    jQuery(document).on('click', '.order-actions a[id^="order-view"]', function(e) {
        //showMainContainerLoading();
        showAccountSectionLoading();
    });

    jQuery(document).on('click', '.order-actions button[id^="order-tracking"]', function(e) {
        //showMainContainerLoading();
        //jQuery('.overlay-loading').show();
        showAccountSectionLoading();
    });

    jQuery(document).on('click', '.order-actions button[id^="order-invoice"]', function(e) {
        //showMainContainerLoading();
        showAccountSectionLoading();
    });

    if(isRegisterPage || isSalesOrderView){
        jQuery('a').on('click', function (e) {
            if(jQuery('.is-responsive').length > 0){
                if(jQuery(e.target).closest('a').is('.level1.has-child')){
                    return false;
                }
            }
            if(jQuery(e.target).is('.menu-span') || jQuery(e.target).is('.menu-span-opened')){
                return false;
            }
            /*if(jQuery(this).parent().parent().is("#toplogin") && responsiveMode){
                return false;
            }*/
            if(jQuery(this).attr('class') == "v-button v-accept"){
                return false;
            }
            if(jQuery(this).attr('href') != undefined && jQuery(this).attr('href') != ''){
                if(isRegisterPage){
                    if(!allFieldsEmpty() && showExitModal){
                        jQuery("#redirect_url").val(jQuery(this).attr('href'));
                        openDialog('modal_exit_notice');
                        updateActiveClassOnMenu = false;
                        return false;
                    }
                }else if(isSalesOrderView){
                    if(someReturnSelected() && showExitModal){
                        jQuery("#redirect_url").val(jQuery(this).attr('href'));
                        openDialog('modal_exit_notice');
                        updateActiveClassOnMenu = false;
                        return false;
                    }else if(jQuery(this).attr('href')!="#" && jQuery(this).attr('href')!="javascript:void(0)" && jQuery(this).attr('target') != "target='_blank'" && jQuery(this).attr('target') != "_blank"){
                        //if(jQuery(this).attr('href').indexOf('sales/order/history') !== -1){
                        if(!(jQuery(this).parent().parent().is("#toplogin") && responsiveMode)){
                            showAccountSectionLoading();
                        }
                        //}
                    }

                }
                
                
            }
        });

        
    }

    //if(!isSalesOrderView){


        jQuery(".col-left.login-sidebar a").on('click', function(e) {
            //showMainContainerLoading();
            if(jQuery("#modal_exit_notice").css('display') == 'none' || jQuery("#modal_exit_notice").css('display') == undefined){
                showAccountSectionLoading();
            }
        });
        
        jQuery("#login-sidebar-mobile-account a").on('click', function(e) {
            //showMainContainerLoading();
            showAccountSectionLoading();
        })
    //}
    

    
    

    
    
    // Show clear button if email is readonly
    if (loginForm.find('#email').is('[readonly]')) {
        loginEmail.parent().find('.login-container-inner-email-clear').show();
    }

    // Reset password validation button
    let resetPasswordForm = jQuery('#form-validate');
    resetPasswordForm.bind('propertychange change click keyup input paste', function () {
        validationResetPassword(resetPasswordForm);
    });

    // Forgot password form
    let forgotPasswordBox = jQuery('#forgot-password-box');
    forgotPasswordBox.bind('propertychange change click keyup input paste', function () {
        validationResetPassword(forgotPasswordBox, true);
    });

    // Reset password validation button
    let createAccount = jQuery('#register-form-validate');
    createAccount.bind('propertychange change click keyup input paste', function () {
        validationEmail(createAccount);
        showClearButton(createAccount);
    });



    let createAccountPassword = jQuery('#register-password-form-validate');
    createAccountPassword.bind('propertychange change click keyup input paste', function () {
        validationPassword(createAccountPassword);
    });

    // Add active class to sidebar menu on reload
    setActiveClassOnReload();


    

    

    // set active class on sidebar menu
    setActiveClassOnMenu(null, true);
    jQuery('#login-sidebar .login-sidebar-sections').click(function () {
        if(updateActiveClassOnMenu){
            setActiveClassOnMenu(jQuery(this), true);
        }
    });

    // set active class on account menu
    setActiveClassOnMenu();
    // mobile menu active class get the active class of the account menu
    jQuery('#login-sidebar-mobile-account .login-sidebar-sections').click(function () {
        if(updateActiveClassOnMenu){
            setActiveClassOnMenu(jQuery(this));
        }
    });

    jQuery('#confirm_exit_notice').on('click', function () {
        if(jQuery("#redirect_url").val().indexOf('sales/order/history') !== -1){
            //showMainContainerLoading();
            closeDialog('modal_exit_notice');
            showAccountSectionLoading();
        }
        window.location.href = jQuery("#redirect_url").val();
        //updateActiveClassOnMenu = true;
    });

    jQuery('#confirm_return_order_exit_notice').on('click', function () {
        if(isCurrentLinkAjax){
            ajaxCustomerLink(currentAjaxLinkUrl, currentAjaxLinkName, currentAjaxLInkDestUrl,true);
            closeDialog('modal_exit_notice');
            showAccountSectionLoading();
        }else{
            //if(jQuery("#redirect_url").val().indexOf('sales/order/history') !== -1){
                //showMainContainerLoading();
                closeDialog('modal_exit_notice');
                showAccountSectionLoading();
            //}
            window.location.href = jQuery("#redirect_url").val();
        }
        
        //updateActiveClassOnMenu = true;
    });
    
    
    if (window.innerWidth <= 767) {
        let body = jQuery('body');
        let closeMobileMenu = jQuery('.close-menu-mobile');
        let mobileMenu = jQuery('#login-sidebar-mobile');
        let mobileMenuAccount = jQuery('#login-sidebar-mobile-account');

        // close mobile menu
        closeMobileMenu.click(function () {
            mobileMenu.hide('slide', function () {
                jQuery('#menu-backdrop').hide();
            });
            body.removeClass('stop-scrolling');
        });
        closeMobileMenu.click(function () {
            mobileMenuAccount.hide('slide', function () {
                jQuery('#menu-backdrop').hide();
            });
            body.removeClass('stop-scrolling');
        });

        // open mobile menu
        jQuery('#login_icon').click(function (e) {
            e.preventDefault();
            mobileMenu.show('slide', function () {
                jQuery('#menu-backdrop').show();
            });
            body.addClass('stop-scrolling');
            body.bind('touchmove', function(e){e.preventDefault()});

        });
        jQuery('.myaccountbutton').click(function (e) {
            e.preventDefault();
            mobileMenuAccount.show('slide', function () {
                jQuery('#menu-backdrop').show();
            });
            body.addClass('stop-scrolling');
            body.bind('touchmove', function(e){e.preventDefault()});
        });

        // set active class menu
        jQuery('#login-sidebar-mobile .login-sidebar-sections').click(function () {
            if(updateActiveClassOnMenu){
                setActiveClassOnMenu(jQuery(this));
            }
        });

        // Add active class to mobile sidebar menu
        setActiveClassOnReload(true)

        // set account menu to top 0 on scroll on desktop and tablet
        jQuery(document.body).on('touchmove', mainMenuTopScroll);
        jQuery(window).on('scroll', mainMenuTopScroll);

        // fix the bug of not showing the account menu in 768px
        if (window.innerWidth > 767) {
            let accountMenu = jQuery('.col-left.sidebar .block-content');
            let accountContent = jQuery('.main-container.col2-left-layout .col-main');
            if (accountMenu.hasClass('no-display')) {
                accountMenu.removeClass('no-display');
            }
            accountContent.css('width', 'calc(100% - 265px)');
        }
    }

    // Soy socio after submit
    let form = jQuery('.soy-socio-member-check');
    form.on('submit', function () {
        localStorage.setItem('soySocio', 'soySocio');

        // save the value of the checkbox to local storage
        let cardIdValue = jQuery('#socio_card_id').val();
        let emailValue = jQuery('#socio_card_email').val();

        let isByCard = jQuery('#is_socio_card_id_check').val();

        if(isByCard){
            if (cardIdValue && isByCard) {
                localStorage.setItem('soySocioValue', cardIdValue);
            }
        }else{
            if (emailValue) {
                localStorage.setItem('soySocioValue', emailValue);
            }
        }
        
        
    });

    if (localStorage.getItem('soySocio')) {
        //afterSocioSubmit();
        localStorage.removeItem('soySocio');
    }

    //Make the checkbox radio style
    let cardIdBox = form.find('#socio_card_id_check');
    let cardIText = form.find('.socio-form-number-text-inner-2');
    let cardIdButton = form.find('#button-soy-number');
    //let reCaptchaCard = jQuery('#recaptcha-card .g-recaptcha-response');

    let emailBox = form.find('#socio_email_check');
    let emailText = form.find('.socio-form-number-text-inner');
    let emailButton = form.find('#button-soy-email');
    //let reCaptchaEmail = jQuery('#recaptcha-email .g-recaptcha-response');

    cardIdBox.click(function () {
        cardIText.toggle(100);
        cardIdButton.toggle(100);

        emailText.hide(100);
        emailButton.hide(100);
        emailBox.attr('checked', false);

        //reCaptchaEmail.prop('required', false);
        //reCaptchaCard.prop('required', true);
    });

    emailBox.click(function () {
        emailText.toggle(100);
        emailButton.toggle(100);

        cardIText.hide(100);
        cardIdButton.hide(100);
        cardIdBox.attr('checked', false);

        //reCaptchaEmail.prop('required', true);
        //reCaptchaCard.prop('required', false);
    });

    //Make the checkbox radio style register page
    let formRegister = jQuery('#register-form-validate');
    let socioYesCheckBox = formRegister.find('#socio-yes-check');
    let socioYesCheckBoxText = formRegister.find('.socio-yes-check-text-inner');
    //let cardIdButton = form.find('#button-soy-number');

    let socioNoCheckBox = formRegister.find('#socio-no-check');
    //let emailText = form.find('.socio-form-number-text-inner');
    //let emailButton = form.find('#button-soy-email');

    socioYesCheckBox.click(function () {
        socioYesCheckBoxText.toggle(100);
        //cardIdButton.toggle(100);

        //emailText.hide(100);
        //emailButton.hide(100);
        socioNoCheckBox.attr('checked', false);
        jQuery('#socio-yes-check').removeClass('validate-one-required-by-name');
        jQuery('#socio-no-check').removeClass('validate-one-required-by-name');
        jQuery("#check-socio-no").val("0");
        jQuery("#check-socio-yes").val("1");
    });

    socioNoCheckBox.click(function () {
        socioYesCheckBoxText.hide(100);
        //emailButton.toggle(100);

        //cardIText.hide(100);
        //cardIdButton.hide(100);
        socioYesCheckBox.attr('checked', false);
        jQuery('#socio-yes-check').removeClass('validate-one-required-by-name');
        jQuery('#socio-no-check').removeClass('validate-one-required-by-name');
        jQuery("#check-socio-no").val("1");
        jQuery("#check-socio-yes").val("0");
    });


    //My account page socios section
    let beMemberCheck = jQuery('#my_account_be_member_check');
    let beMemberText = jQuery('.be-member-text-section');
    let beMemberdButton = jQuery('#button-be-member');

    beMemberCheck.click(function () {
        beMemberText.toggle(100);
        if (!beMemberCheck.is(':checked')) {
            beMemberdButton.attr('disabled', true);
        }else{
            enableBeMemberButton();
        }
        //beMemberdButton.toggle(100);

        //emailText.hide(100);
        //emailButton.hide(100);
        //emailBox.attr('checked', false);

        //reCaptchaEmail.prop('required', false);
        //reCaptchaCard.prop('required', true);
    });

    jQuery('.sales-order-history').on('click', '.filter-arrow-container', function(e){
        jQuery(this).closest(".order-element").toggleClass('closed');
        jQuery(this).closest(".order-element").find(".order-relateds").slideToggle();
    });

    
    let timeout;
    //jQuery('.sales-order-history').on('input', '#searchInput', function(e){
    jQuery('.sales-order-history').on('click', '#searchButton', function(e){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let searchTerm = jQuery('#searchInput').val().toLowerCase();
            searchTerm = searchTerm.trim();
            jQuery('#searchInput').val(searchTerm);
            const filteredData = dataSources.filter(item => {
                const allDocNos = [
                    item.order?.DocumentNo,
                    ...Object.values(item.devos || {}).map(dev => dev.DocumentNo),
                    ...Object.values(item.invoices || {}).map(inv => inv.DocumentNo),
                    ...Object.values(item.creditMemos || {}).map(credit => credit.DocumentNo)
                ].filter(Boolean); // Elimina valores undefined o null
            
                return allDocNos.some(docNo => 
                    docNo.toLowerCase().includes(searchTerm)
                );
            });
            jQuery('#pagination-container').pagination({
                dataSource: filteredData,
                showSizeChanger: true,
                pageSize: jQuery(".J-paginationjs-size-select").val(),
                callback: async function(data, pagination) {
                    //const html = data.map(item => `<div>${item.name} - ${item.age} años</div>`).join('');
                    //jQuery('#pagination-container').html(html);
                    jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
                    
				    var html = await showPaginationContent(data,pagination);
                    jQuery('.history_total_records').text("("+pagination.totalNumber+")");
                }
            });
        }, 100); // Retardo de 300ms
    });

    jQuery('.sales-order-history').on('keydown', '#searchInput', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault(); // Evita que se envíe un formulario si lo hay
            jQuery('#searchButton').trigger('click');
        }
    });

    Validation.add('validate-nif', 'El NIF/CIF/NIE no es válido', function(value) {
        return validarNifCifNie(value);
    });

    

    jQuery("#enviar_factura").on('click', function(e){
        e.preventDefault();

        // Asegúrate de usar el ID correcto del formulario
        var form = new VarienForm('formulario_factura', true);

        if (form.validator.validate()) {
            jQuery('#formulario_factura').submit();
        }
    });

    if (!responsiveMode && !jQuery('body').hasClass("is-responsive")) {
        jQuery('#billing\\:region_id').addClass('has-chosen');
    }

    //let sectionContactVisible = false;
    jQuery(document).on('input','input, textarea, select', function () {
        jQuery(this).removeClass('validation-failed');
        jQuery(this).next('.validation-advice').remove(); // Elimina el mensaje de error si existe
        jQuery(this).next('.custom-validation-advice').hide(); // Elimina el mensaje de error si existe
        jQuery(this).next('#zip-validation-message').hide(); // Elimina el mensaje de error si existe
        jQuery(this).next('#mobile-custom-validation').hide(); // Elimina el mensaje de error si existe   
        if((jQuery(this).attr('id') == 'shipping:email' || jQuery(this).attr("id") == "confirmemail") && jQuery("#confirmemail").length > 0){
            if(jQuery("#confirmemail").val() == jQuery("#shipping\\:email").val()){
                jQuery("#confirmemail-validation-message").hide();
                jQuery("#confirmemail").removeClass('validation-failed');
                jQuery("#shipping\\:email").removeClass('validation-failed');
            }
        }
    });

    /*jQuery(document).on('click', '.invoice-link', function (e) {
        //jQuery("#invoice_docno").val(jQuery(this).attr('data-invoice'));
        e.preventDefault();
        
        var docNumber = jQuery(this).data('invoice');
        var pos = jQuery(this).data('position');
        var addressRegion = dataSources[pos].order.County
        showAccountSectionLoading();
        jQuery.ajax({
            url: urlInvoiceForm,
            method: 'POST',
            data: { doc_number: docNumber,
                    data: JSON.stringify(dataSources[pos].order),
             },
            success: function(response) {
                jQuery('.overlay-loading').hide();
                jQuery('.billing-form-ajax').html(response);
                // Mostrar el modal (ajusta según cómo uses el modal)
                // Extrae el JSON desde un elemento del HTML si está en el bloque
                var regionsJsonScript = jQuery('#billing-regions-json').html(); // este ID lo definimos abajo
                if (regionsJsonScript) {
                    var regionsJson = JSON.parse(regionsJsonScript);
                    initializeBillingRegionUpdater(regionsJson);
                }
                var text = Translator.translate('No results for');
                create_selects(jQuery("#modal_invoice"), text);

                let region_id = search_region_id(jQuery('#billing\\:country_id').val(),addressRegion,regionsJson);
                if(region_id){
                    jQuery('#billing\\:region_id').val(region_id);
                    jQuery('#billing\\:region_id').trigger('chosen:updated');
                    jQuery('#billing\\:region_id').trigger('change');

                }else{
                    jQuery('#billing\\:region').val(addressRegion);
                }

                openDialog('modal_invoice');
            },
            error: function(xhr, status, error) {
                console.error('Error al cargar el formulario de factura:', error);
            }
        });
        
    });*/
    
});

function validarNifCifNie(valor) {
    valor = valor.toUpperCase().trim();
    // Validar NIF (8 números + 1 letra)
    if (/^[0-9]{8}[A-Z]$/.test(valor)) {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const numero = parseInt(valor.substring(0, 8), 10);
        const letra = valor.charAt(8);
        return letra === letras.charAt(numero % 23);
    }
    // Validar NIE (X, Y, Z + 7 números + 1 letra)
    if (/^[XYZ][0-9]{7}[A-Z]$/.test(valor)) {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        let nie = valor;
        nie = nie.replace('X', '0').replace('Y', '1').replace('Z', '2');
        const numero = parseInt(nie.substring(0, 8), 10);
        const letra = valor.charAt(8);
        return letra === letras.charAt(numero % 23);
    }
    // Validar CIF (1 letra + 7 números + 1 dígito o letra)
    if (/^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/.test(valor)) {
        const letraInicial = valor.charAt(0);
        const numeros = valor.substring(1, 8);
        const control = valor.charAt(8);
        let sumaPares = 0;
        for (let i = 1; i < 7; i += 2) {
            sumaPares += parseInt(numeros.charAt(i), 10);
        }
        let sumaImpares = 0;
        for (let i = 0; i < 7; i += 2) {
            let doble = parseInt(numeros.charAt(i), 10) * 2;
            if (doble > 9) doble = 1 + (doble % 10);
            sumaImpares += doble;
        }
        const sumaTotal = sumaPares + sumaImpares;
        const unidad = (10 - (sumaTotal % 10)) % 10;
        const letrasControl = 'JABCDEFGHI';
        if (/[ABEH]/.test(letraInicial)) {
            // El control debe ser numérico
            return control == unidad;
        } else if (/[KPQS]/.test(letraInicial)) {
            // El control debe ser una letra
            return control === letrasControl.charAt(unidad);
        } else {
            // Puede ser un número o una letra
            return control == unidad || control === letrasControl.charAt(unidad);
        }
    }
    return false; // No coincide con ningún formato
}

function ajaxCustomerLink(url,paramName, urlR,forceRedirect = false) {
    isCurrentLinkAjax = true;
    currentAjaxLinkUrl = url;
    currentAjaxLinkName = paramName;
    currentAjaxLInkDestUrl = urlR;
    if(!forceRedirect){
        if(isRegisterPage){
            if(!allFieldsEmpty() && showExitModal){
                jQuery("#redirect_url").val(jQuery(this).attr('href'));
                openDialog('modal_exit_notice');
                updateActiveClassOnMenu = false;
                return false;
            }
        }else if(isSalesOrderView){
            if(someReturnSelected() && showExitModal){
                jQuery("#redirect_url").val(jQuery(this).attr('href'));
                openDialog('modal_exit_notice');
                updateActiveClassOnMenu = false;
                return false;
            }

        }
    }
    //if(jQuery("#modal_exit_notice").css('display') == 'none' || jQuery("#modal_exit_notice").css('display') == undefined){
        var data = '&' + paramName + '=' + urlR;
        try {
            jQuery.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                data: data,
                success: function () {
                    window.location.href = urlR;
                },
                error: function (xhr, status, error) {
                    alert('Ha habido un error.');
                }
            });
        } catch (e) {
        }
    //}
}


jQuery(window).on('resize', responsiveFnDelay);

function responsiveFnDelay() {
    if (check_resize_flag) {
        mobile_resize_result = check_resize();
    }
    if (check_iphone_resize) {
        onresize_safari();
    }
    checkIfResponsive();
    if (responsiveMode && !jQuery('body').hasClass("is-responsive")) {
        jQuery('body').addClass("is-responsive");
    } else if (!responsiveMode && jQuery('body').hasClass("is-responsive")) {
        jQuery('body').removeClass("is-responsive");
    }
    if(!jQuery('body').hasClass("onestepcheckout-index-index") && !jQuery('body').hasClass("sales-order-view")){
        jQuery('.backdrop .dialog').mCustomScrollbar('destroy');
        jQuery('.backdrop .dialog').mCustomScrollbar();
    }
    
}

/** MOBILE HELPER FUNCTIONS **/

var initial_mobile_size;
var EQUAL_SIZE = 0;
var GREATER_SIZE = 1;
var SMALLER_SIZE = -1;
var mobile_resize_result;
var check_resize_flag = false;

function hideMobileKeyboard() {
    if (document.activeElement && document.activeElement.blur && document.activeElement !== document.body) {
        var el = document.activeElement;
        if (el && (el.tagName.toLowerCase() == 'input' &&
            el.type == 'text' ||
            el.tagName.toLowerCase() == 'textarea')) {
            jQuery("input").blur();
            document.activeElement.blur();
        }
    }
}

function check_resize() {
    var _newSize = jQuery(window).width() * jQuery(window).height();
    if (_newSize > initial_mobile_size) {
        return GREATER_SIZE;
    } else if (_newSize == initial_mobile_size) {
        return EQUAL_SIZE;
    } else {
        return SMALLER_SIZE;
    }
}

function onresize_safari() {
    if (!is_fullscreen()) jQuery('html').addClass('safari-navigation');
    else jQuery('html').removeClass('safari-navigation');
}

function scroll_if_not_visible(elem) {
    var header_size = 60; //55px + 5px de padding
    var docViewTop = jQuery(window).scrollTop() + header_size;
    var docViewBottom = docViewTop - header_size + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height() + 35;
    var scroll = false;
    if (docViewBottom < elemBottom) {
        scroll = jQuery(window).scrollTop() + (elemBottom - docViewBottom);
    } else if (docViewTop > elemTop) {
        scroll = elem.offset().top - header_size;
    }
    if (scroll) {
        automaticScroll = true;
        var body = jQuery("html, body");
        body.stop().animate({scrollTop: scroll}, '450', 'easeOutCubic', function () {
            automaticScroll = true;
        });
    }
}

function is_visible_on_screen(elem) {
    var header_size = 60; //55px + 5px de padding
    var docViewTop = jQuery(window).scrollTop() + header_size;
    var docViewBottom = docViewTop - header_size + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height() + 35;
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

/**
 * Set active class on landing page
 */
function setActiveClassOnReload(mobile = false) {
    let url = window.location.href;
    let clickedSection = localStorage.getItem('clickedSection');
    let loginSidebarClassName = localStorage.getItem('loginSidebarClassName');

    if (!clickedSection || !loginSidebarClassName) {
        if (url.includes('login') || url.includes('changeforgotten')) {
            url = 'login';
        } else if (url.includes('member')) {
            url = 'socio';
        } else if (url.includes('guestOrders') || url.includes('order_view')) {
            url = 'guest-orders';
        } else if (url.includes('create')) {
            url = 'create';
        } else {
            url = '';
        }

        let activeClass = jQuery('.login-sidebar-' + url + '');
        if (mobile) {
            activeClass = jQuery('#login-sidebar-mobile-' + url + '');
        }

        let siblings = activeClass.siblings();
        let nietos = siblings.find('.login-sidebar-right-arrow');

        activeClass.addClass('login-sidebar-sections-active');
        siblings.removeClass('login-sidebar-sections-active');

        activeClass.find('.login-sidebar-right-arrow').addClass('right-arrow-white');
        activeClass.find('.login-sidebar-right-arrow').removeClass('right-arrow-black');

        nietos.addClass('right-arrow-black');
        nietos.removeClass('right-arrow-white');
    }
}

/**
 * Add active class to sidebar on reload
 */
function setActiveClassOnMenu(activeClass = null, login = false) {

    // login is for the sidebar login menu
    if (login) {
        if (!activeClass) {
            activeClass = localStorage.getItem('loginSidebarClassName');
            localStorage.removeItem('loginSidebarClassName');
        } else {
            activeClass = activeClass.attr('class').split(' ')[0];
            localStorage.setItem('loginSidebarClassName', activeClass);
        }
    } else {
        if (!activeClass) {
            activeClass = localStorage.getItem('clickedSection');
            localStorage.removeItem('clickedSection');
        } else {
            activeClass = activeClass.attr('id');
            localStorage.setItem('clickedSection', activeClass);
        }
    }

    let clickedIdElement = login ? jQuery('.' + activeClass) : jQuery('#' + activeClass);

    let siblings = clickedIdElement.siblings();
    let nietos = siblings.find('.login-sidebar-right-arrow');

    clickedIdElement.addClass('login-sidebar-sections-active');
    siblings.removeClass('login-sidebar-sections-active');

    clickedIdElement.find('.login-sidebar-right-arrow').addClass('right-arrow-white');
    clickedIdElement.find('.login-sidebar-right-arrow').removeClass('right-arrow-black');

    nietos.addClass('right-arrow-black');
    nietos.removeClass('right-arrow-white');
}

/**
 * Validate email and password(7 car min)
 */
function validationLoginEmailAndPassword(loginForm) {
    let passwordError = loginForm.find('#advice-validate-admin-password-pass');
    let passwordEmailInvalid = loginForm.find('.invalid-password-email');
    let loginEmail = loginForm.find('#email');
    let loginPassword = loginForm.find('#pass');
    let loginSubmit = loginForm.find('#send2');

    if (passwordError.length) {
        passwordError.css('position', 'absolute');
        passwordError.css('top', '28px');
        jQuery('.login-container-inner-forgot-password').css('margin-top', '30px');
    }

    if (loginEmail.val()) {
        loginEmail.parent().find('.login-container-inner-email-clear').show();
    } else {
        loginEmail.parent().find('.login-container-inner-email-clear').hide();
    }
    if (loginPassword.val()) {
        loginPassword.parent().find('.login-container-inner-email-clear').show();
    } else {
        loginPassword.parent().find('.login-container-inner-email-clear').hide();
    }

    // focus red border
    if (passwordEmailInvalid.length) {
        loginEmail.focus(function () {
            jQuery(this).removeClass('border-red-1');
            jQuery(this).addClass('border-red-2');
        });
        loginEmail.blur(function () {
            jQuery(this).removeClass('border-red-2');
            jQuery(this).addClass('border-red-1');
        });

        loginPassword.focus(function () {
            jQuery(this).removeClass('border-red-1');
            jQuery(this).addClass('border-red-2');
        });
        loginPassword.blur(function () {
            jQuery(this).removeClass('border-red-2');
            jQuery(this).addClass('border-red-1');
        });
    }

    if (loginEmail.val() && loginPassword.val()) {
        loginSubmit.prop('disabled', false);
        loginSubmit.removeClass('login-send-button-disabled');
        loginSubmit.addClass('login-send-button-enabled');
        //jQuery('.main-container-loading .overlay-loading').show();
    } else {
        loginSubmit.prop('disabled', true);
        loginSubmit.addClass('login-send-button-disabled');
        loginSubmit.removeClass('login-send-button-enabled');
    }
}

/**
 * Validate form for the reset password
 *
 * @param resetPasswordForm #id if the form
 * @param forgotPasswordBox
 */
function validationResetPassword(resetPasswordForm, forgotPasswordBox = false) {
    let password = resetPasswordForm.find('#password');

    // show clear button if input is not empty for forgot password
    if (forgotPasswordBox) {
        let emailAddressForgotPassword = resetPasswordForm.find('#email_address');
        if (emailAddressForgotPassword.val()) {
            resetPasswordForm.find('.login-container-inner-email-clear').show();
        } else {
            resetPasswordForm.find('.login-container-inner-email-clear').hide();
        }

        return;
    }

    let passwordValue = password.val();
    let passwordLength = passwordValue.length;

    let confirmation = resetPasswordForm.find('#confirmation');
    let confirmationValue = confirmation.val();
    let confirmationLength = confirmationValue.length;

    let buttonReset = resetPasswordForm.find('.forgot-button-submit');
    let passwordsMatch = false;

    if (passwordValue === confirmationValue) {
        passwordsMatch = true;
    }

    // show clear button if input is not empty
    if (passwordValue) {
        password.parent().find('.login-container-inner-email-clear').show();
    } else {
        password.parent().find('.login-container-inner-email-clear').hide();
    }
    if (confirmationValue) {
        confirmation.parent().find('.login-container-inner-email-clear').show();
    } else {
        confirmation.parent().find('.login-container-inner-email-clear').hide();
    }

    // add green check if passwords are valid
    if (passwordsMatch && passwordLength >= 7 && confirmationLength >= 7) {
        password.parent().find('.login-container-inner-email-clear').addClass('reset-password-green-check');
        password.parent().find('.login-container-inner-email-clear').attr('onclick', '').unbind('click');

        confirmation.parent().find('.login-container-inner-email-clear').addClass('reset-password-green-check');
        confirmation.parent().find('.login-container-inner-email-clear').attr('onclick', '').unbind('click');
        confirmation.addClass('background-color-BBBBBB');

        // enable button
        buttonReset.prop('disabled', false);
        buttonReset.removeClass('login-custom-send-button-disabled');
    } else {
        password.parent().find('.login-container-inner-email-clear').removeClass('reset-password-green-check');
        password.parent().find('.login-container-inner-email-clear').attr('onclick', "clearField('#password', '#confirmation')");

        confirmation.parent().find('.login-container-inner-email-clear').removeClass('reset-password-green-check');
        confirmation.parent().find('.login-container-inner-email-clear').attr('onclick', "clearField('#confirmation')");
        confirmation.removeClass('background-color-BBBBBB');

        // disable button
        buttonReset.prop('disabled', true);
        buttonReset.addClass('login-custom-send-button-disabled');
    }

    if (
        !passwordsMatch &&
        (passwordLength >= 7) &&
        (confirmationLength >= passwordLength)
    ) {
        confirmation.addClass('border-red-1');
        jQuery(".incorrect_password").show();
    } else {
        confirmation.removeClass('border-red-1');
        jQuery(".incorrect_password").hide();
    }
}

/**
 * Validate form for the reset email
 *
 * @param createAccountForm #id if the form
 * @param forgotemailBox
 */
function validationEmail(createAccountForm) {
    let email = createAccountForm.find('#email');

    let emailValue = email.val();
    let emailLength = emailValue.length;

    let confirmemail = createAccountForm.find('#confirmemail');
    let confirmemailValue = confirmemail.val();
    let confirmemailLength = confirmemailValue.length;

    let buttonReset = createAccountForm.find('.forgot-button-submit');
    let emailsMatch = false;

    let emailCharsToCompare = emailValue.substring(0, confirmemailLength);
    if (emailCharsToCompare === confirmemailValue) {
        emailsMatch = true;
    }

    // show clear button if input is not empty
    if (emailValue) {
        email.parent().find('.login-container-inner-email-clear').show();
    } else {
        email.parent().find('.login-container-inner-email-clear').hide();
    }
    if (confirmemailValue) {
        confirmemail.parent().find('.login-container-inner-email-clear').show();
    } else {
        confirmemail.parent().find('.login-container-inner-email-clear').hide();
    }

    // add green check if emails are valid
    if (emailsMatch && confirmemailLength == emailLength) {
        email.parent().find('.login-container-inner-email-clear').addClass('reset-email-green-check');
        email.parent().find('.login-container-inner-email-clear').attr('onclick', '').unbind('click');

        confirmemail.parent().find('.login-container-inner-email-clear').addClass('reset-email-green-check');
        confirmemail.parent().find('.login-container-inner-email-clear').attr('onclick', '').unbind('click');
        confirmemail.addClass('background-color-BBBBBB');

        // enable button
        buttonReset.prop('disabled', false);
        buttonReset.removeClass('login-custom-send-button-disabled');
    } else {
        email.parent().find('.login-container-inner-email-clear').removeClass('reset-email-green-check');
        email.parent().find('.login-container-inner-email-clear').attr('onclick', "clearField('#email')");

        confirmemail.parent().find('.login-container-inner-email-clear').removeClass('reset-email-green-check');
        confirmemail.parent().find('.login-container-inner-email-clear').attr('onclick', "clearField('#confirmemail')");
        confirmemail.removeClass('background-color-BBBBBB');

        // disable button
        buttonReset.prop('disabled', true);
        buttonReset.addClass('login-custom-send-button-disabled');
    }

    if (
        !emailsMatch ||
        (confirmemailLength > emailLength)
    ) {
        confirmemail.addClass('border-red-1');
    } else {
        confirmemail.removeClass('border-red-1');
    }
}


/**
 * Validate form for the reset email
 *
 * @param createAccountForm #id if the form
 * @param forgotemailBox
 */
function validationPassword(createAccountPasswordForm) {
    let password = createAccountPasswordForm.find('#password');

    let passwordValue = password.val();
    let passwordLength = passwordValue.length;

    let confirmpassword = createAccountPasswordForm.find('#confirmpassword');
    let confirmpasswordValue = confirmpassword.val();
    let confirmpasswordLength = confirmpasswordValue.length;

    let buttonSave = createAccountPasswordForm.find('.button-save-password');
    let correctPasswordsHidden = createAccountPasswordForm.find('#correct-passwords-hidden');
    let passwordsMatch = false;

    let passwordCharsToCompare = passwordValue.substring(0, confirmpasswordLength);
    if (passwordCharsToCompare === confirmpasswordValue) {
        passwordsMatch = true;
    }

    // show clear button if input is not empty
    if (passwordValue) {
        password.parent().find('.login-container-inner-email-clear').show();
    } else {
        password.parent().find('.login-container-inner-email-clear').hide();
    }
    if (confirmpasswordValue) {
        confirmpassword.parent().find('.login-container-inner-email-clear').show();
    } else {
        confirmpassword.parent().find('.login-container-inner-email-clear').hide();
    }

    // add green check if passwords are valid
    if (passwordsMatch && confirmpasswordLength == passwordLength) {
        password.parent().find('.login-container-inner-email-clear').addClass('reset-password-green-check');
        password.parent().find('.login-container-inner-email-clear').attr('onclick', '').unbind('click');

        confirmpassword.parent().find('.login-container-inner-email-clear').addClass('reset-password-green-check');
        confirmpassword.parent().find('.login-container-inner-email-clear').attr('onclick', '').unbind('click');
        confirmpassword.addClass('background-color-BBBBBB');

        // enable button
        //buttonSave.prop('disabled', false);
        if(passwordLength >= 7){
            correctPasswordsHidden.val("1");
        }else{
            correctPasswordsHidden.val("0");
        }
        buttonSave.removeClass('login-custom-send-button-disabled');
    } else {
        password.parent().find('.login-container-inner-email-clear').removeClass('reset-password-green-check');
        password.parent().find('.login-container-inner-email-clear').attr('onclick', "clearField('#password', '#confirmpassword')");

        confirmpassword.parent().find('.login-container-inner-email-clear').removeClass('reset-password-green-check');
        confirmpassword.parent().find('.login-container-inner-email-clear').attr('onclick', "clearField('#confirmpassword')");
        confirmpassword.removeClass('background-color-BBBBBB');
        correctPasswordsHidden.val("0");
        // disable button
        //buttonSave.prop('disabled', true);
        buttonSave.addClass('login-custom-send-button-disabled');
    }

    if (
        !passwordsMatch ||
        (confirmpasswordLength > passwordLength)
    ) {
        confirmpassword.addClass('border-red-1');
    } else {
        confirmpassword.removeClass('border-red-1');
    }
}

function showClearButton(form) {
    let fullname = form.find('#fullname');
    let fullnameValue = fullname.val();
    if(fullnameValue){
        fullname.parent().find('.login-container-inner-fullname-clear').show();
    }else{
        fullname.parent().find('.login-container-inner-fullname-clear').hide();
    }
}

/**
 * Empty field
 *
 * @param field
 * @param other
 */
function clearField(field, other = null) {
    let body = jQuery('body');

    if (field === '#email') {
        body.find(field).removeClass('background-color-BBBBBB read-only');
        body.find(field).prop('readonly', false);
    }

    field = body.find(field);
    field.val('');

    if (other) {
        other = body.find(other);
        other.val('');
    }
}

/**
 * Show Hide password in the input
 */
function showPassword(input) {
    let x = jQuery(input);
    if (x.attr('type') === 'password') {
        x.attr("type", "text");
    } else {
        x.attr("type", "password");
    }
}

/**
 * Add account menu on top when the menu is hidden
 */
function mainMenuTopScroll() {
    let mainMenuTop = jQuery('.header-language-container');
    let accountMenu = jQuery('.customer-account .block-account');

    if (mainMenuTop.hasClass('is-hidden')) {
        accountMenu.css('top', 0);
    } else {
        if (inDesktop) {
            accountMenu.css('top', '150px');
        } else {
            accountMenu.css('top', totalHeight);
        }
    }
}

/**
 *
 * Effect to hide/show soy socio form
 *
 * @param clicked
 * @param toToggle
 * @param elementToHide
 */
function showHideSoySocio(clicked, toToggle, elementToHide) {
    let soySocio = jQuery(clicked);
    let arrow = soySocio.find('.socio-inner-header-arrow');
    let soySocioForm = jQuery(toToggle);
    let hideElement = jQuery(elementToHide);

    hideElement.hide(100);
    arrow.toggleClass('arrow-up');
    
    soySocioForm.toggle(100);
    if(jQuery(clicked).attr('class') === 'socio-inner-no-soy'){
        var $height = jQuery(window).scrollTop();
        if($height > 360){
            jQuery('html, body').animate({
                scrollTop: 0
            }, 100);
        }
        
        jQuery('.socio-inner-soy .socio-inner-header-arrow').removeClass('arrow-up');
    }else{
        jQuery('.socio-inner-no-soy .socio-inner-header-arrow').removeClass('arrow-up');
    }
}

/**
 * Open soy socio form and check the checkbox numero de socio
 */
function openSoySocio() {
    let noSoySocio = jQuery('.socio-inner-no-soy-div');
    let soySocio = jQuery('.soy-container');

    noSoySocio.hide(100);
    soySocio.show(100);
    noSoySocio.removeClass('arrow-up');

    soySocio.find('#socio_card_id_check').prop('checked', true);
    soySocio.find('#socio_email_check').prop('checked', false);
    jQuery('.socio-form-number-text-inner').hide();
    jQuery('#button-soy-email').hide();
    jQuery('.socio-form-number-text-inner-2').show(100);
    jQuery('#button-soy-number').show(100);
    
}

/**
 * After submit the form Soy Socio
 */
function afterSocioSubmit() {
    let containerSoyOne = jQuery('.socio-inner-soy-form-1');
    let containerSoyTwo = jQuery('.socio-inner-soy-form-2');

    jQuery('.socio-inner-soy-dropdown-1').hide();
    containerSoyOne.css('background', '#BDBDBD');
    containerSoyOne.find('p').removeClass('socio-inner-soy-form-title');

    jQuery('.socio-inner-soy-dropdown-2').show();
    containerSoyTwo.find('.socio-outer-soy-title').addClass('socio-inner-soy-form-title').removeClass('color-C3C3C3');

    jQuery('.soy-container').show();
}


function afterCreateAccountSubmit() {
    let containerSoyOne = jQuery('.socio-inner-soy-form-1');
    let containerSoyTwo = jQuery('.socio-inner-soy-form-2');

    jQuery('.socio-inner-soy-dropdown-1').hide();
    containerSoyOne.css('background', '#BDBDBD');
    containerSoyOne.find('p').removeClass('socio-inner-soy-form-title');

    jQuery('.socio-inner-soy-dropdown-2').show();
    containerSoyTwo.find('.socio-outer-soy-title').addClass('socio-inner-soy-form-title').removeClass('color-C3C3C3');

    jQuery('.soy-container').show();
    showExitModal = false;
}

function afterConfirmEmailSubmit() {
    let containerSoyOne = jQuery('.socio-inner-soy-form-1');
    let containerSoyTwo = jQuery('.socio-inner-soy-form-2');
    let containerSoyThree = jQuery('.socio-inner-soy-form-3');

    jQuery('.socio-inner-soy-dropdown-1').hide();
    jQuery('.socio-inner-soy-dropdown-2').hide();
    containerSoyOne.css('background', '#BDBDBD');
    containerSoyOne.find('p').removeClass('socio-inner-soy-form-title');

    containerSoyTwo.css('background', '#BDBDBD');
    containerSoyTwo.find('p').removeClass('socio-inner-soy-form-title');
    containerSoyTwo.find('p').removeClass('color-C3C3C3');

    jQuery('.socio-inner-soy-dropdown-3').show();
    containerSoyThree.find('.socio-outer-soy-title').addClass('socio-inner-soy-form-title').removeClass('color-C3C3C3');

    jQuery('.soy-container').show();
}


function afterGuestOrdersEmailSubmit() {
    let containerSoyOne = jQuery('.form-step1');
    let pageDescription = jQuery('.page-description');
    let containerSoyTwo = jQuery('.form-step2');
    
    containerSoyOne.hide();
    pageDescription.hide();
    containerSoyTwo.show();
    //jQuery('.socio-inner-soy-dropdown-1').hide();
    //jQuery('.socio-inner-soy-dropdown-2').hide();
    //containerSoyOne.css('background', '#BDBDBD');
    //containerSoyOne.find('p').removeClass('socio-inner-soy-form-title');

    //containerSoyTwo.css('background', '#BDBDBD');
    //containerSoyTwo.find('p').removeClass('socio-inner-soy-form-title');
    //containerSoyTwo.find('p').removeClass('color-C3C3C3');

    //jQuery('.soy-container').show();
}

function showRedBackground(){
    // Agregar la clase highlight
    jQuery('.soy-form-messages').removeClass('no-highlight');
    jQuery('.soy-form-messages').addClass('highlight');
    //Haz scroll hasta soy-form-messages no-highlight
    jQuery('html, body').animate({
        scrollTop: jQuery('.soy-form-messages').offset().top - 100
    }, 500);

    // Quitar la clase después de 2 segundos
    setTimeout(function(){
        jQuery('.soy-form-messages').removeClass('highlight');
        jQuery('.soy-form-messages').addClass('no-highlight');
    }, 2000);
}

function hideRedBackground(){
    jQuery('.soy-form-messages').addClass('no-highlight');
}

/**
 * Try again the form Soy Socio
 */
function modifySocio(isByCard) {
    let drpopdown1 = jQuery('.socio-inner-soy-dropdown-1');
    let drpopdown2 = jQuery('.socio-inner-soy-dropdown-2');
    let title1 = jQuery('.socio-inner-soy-form-1');
    let title2 = jQuery('.socio-outer-soy-title');

    let cardIdBox = jQuery('#socio_card_id_check');
    let cardIText = jQuery('.socio-form-number-text-inner-2');
    let cardIdButton = jQuery('#button-soy-number');
    let cardIdInput = jQuery('#socio_card_id');

    let emailBox = jQuery('#socio_email_check');
    let emailText = jQuery('.socio-form-number-text-inner');
    let emailButton = jQuery('#button-soy-email');
    let emailInput = jQuery('#socio_card_email');

    let soySocioValue = localStorage.getItem('soySocioValue') ? localStorage.getItem('soySocioValue') : '';

    let reCaptchaCard = jQuery('#recaptcha-card textarea.g-recaptcha-response');
    let reCaptchaEmail = jQuery('#recaptcha-email textarea.g-recaptcha-response');

    if (isByCard) {
        cardIText.toggle(100);
        cardIdButton.toggle(100);

        emailText.hide(100);
        emailButton.hide(100);

        cardIdInput.val(soySocioValue);
        cardIdBox.attr('checked', true);

        /*reCaptchaCard.prop('required', true);
        reCaptchaEmail.prop('required', false);*/
    } else {
        emailText.toggle(100);
        emailButton.toggle(100);

        cardIText.hide(100);
        cardIdButton.hide(100);

        emailInput.val(soySocioValue);
        emailBox.attr('checked', true);

        /*reCaptchaEmail.prop('required', true);
        reCaptchaCard.prop('required', false);*/
    }

    localStorage.removeItem('soySocioValue');

    drpopdown2.hide();
    drpopdown1.show();
    title2.removeClass('socio-inner-soy-form-title').addClass('color-C3C3C3');
    title1.css('background', '#FFFFFF');
}

/**
 * Scroll to bottom
 */
function scrollToBottom() {
    let body = jQuery('body');
    let height = body.height();

    jQuery('html, body').animate({
        scrollTop: height
    }, 1000);
}

/**
 * Ajax call to re-send the email
 *
 * @param url
 * @param email
 */
function reSendMailAjax(url, data) {
    //let loader = jQuery('.main-container-loading');
    if(data.length == 0){
        data = {};
    }
    data['reSendMail'] = true;
    jQuery.ajax({
        url: url,
        type: 'POST',
        dataType : 'json',
        data: data,
        beforeSend: function(){
           //loader.show();
           //showMainContainerLoading();
           showAccountNotLoggedSectionLoading();
       },
        complete: function (data) {
            if (data.status === 200) {
                jQuery('.email-send-result-text').text('El correo ha sido enviado correctamente.');
                openDialog('email-send-result');
            } else {
                jQuery('.email-send-result-text').text('El correo no se ha podido enviar.');
                openDialog('email-send-result');
            }
            //loader.hide();
            jQuery('.page .overlay-loading').hide();
        },
    });
}

/**
 * Partialy hide an email
 *
 * @param email
 * @param isByCard
 * @returns {*}
 */
function hideEmail(email, isByCard) {
    if (email) {
        if (isByCard) {
            let emailFirst = email.split('@')[0];
            let emailSecond = email.split('@')[1];
            let beforeDot = emailSecond.split('.')[0];
            let afterDot = emailSecond.split('.')[1];

            // Hide the first part of the email
            for (let i = 0; i < emailFirst.length; i++) {
                if (i > 1) {
                    emailFirst = emailFirst.replace(emailFirst[i], 'x');
                }
            }
            // Hide the second part of the email
            for (let i = 0; i < beforeDot.length; i++) {
                if (i > 1) {
                    beforeDot = beforeDot.replace(beforeDot[i], 'x');
                }
            }

            return emailFirst + '@' + beforeDot + '.' + afterDot
        } else {
            return email;
        }
    }
}


function generateEan13Barcode(url, data) {
    let loader = jQuery('.page .overlay-loading');
    if(data.length == 0){
        return false;
    }
    jQuery.ajax({
        url: url,
        type: 'POST',
        dataType : 'json',
        data: data,
        beforeSend: function(){
           loader.show();
       },
        complete: function (data) {
            if (data.status === 200) {
                alert('Enviado!');
            } else {
                alert('Error!');
            }
            loader.hide();
        },
    });
}

function validateEmailFormat(email){
    if(email.length == 0){
        return false;
    }
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function enableBeMemberButton(){
    var socio_yes_check_add_card_to_cart = jQuery('#socio-yes-check-add-card-to-cart').is(':checked');
    var socio_yes_check_accept_conditions = jQuery('#socio-yes-check-accept-conditions').is(':checked');
    if(socio_yes_check_add_card_to_cart && socio_yes_check_accept_conditions){
        jQuery('#button-be-member').attr("disabled", false);
    }else{
        jQuery('#button-be-member').attr("disabled", true);
    }
}

function checkBirthday(showErrors = true) {
    var resultado = true;
    var d = jQuery('.day-select').val();
    if (d == null) {
        if(showErrors){
            jQuery('.day-select').parent().find('.birthday-input').addClass('incorrect-input');
        }
        resultado = false;
    } else {
        if(showErrors){
            jQuery('.day-select').parent().find('.birthday-input').removeClass('incorrect-input');
        }
    }
    var m = jQuery('.month-select').val();
    if (m == null) {
        if(showErrors){
            jQuery('.month-select').parent().find('.birthday-input').addClass('incorrect-input');
        }
        resultado = false;
    } else {
        if(showErrors){
            jQuery('.month-select').parent().find('.birthday-input').removeClass('incorrect-input');
        }
    }
    var y = jQuery('.year-select').val();
    if (y == null) {
        if(showErrors){
            jQuery('.year-select').parent().find('.birthday-input').addClass('incorrect-input');
        }
        resultado = false;
    } else {
        if(showErrors){
            jQuery('.year-select').parent().find('.birthday-input').removeClass('incorrect-input');
        }
    }
    if (d != null && m != null && y != null) {
        var aux = d + '/' + m + '/' + y;
        jQuery('#dob').val(aux);
    }
    return resultado;
}

function refreshDob(){
    var d = jQuery('.day-select').val();
    var m = jQuery('.month-select').val();
    var y = jQuery('.year-select').val();
    if (d != null && m != null && y != null) {
        var aux = d + '/' + m + '/' + y;
        jQuery('#dob').val(aux);
    }
}

function allFieldsEmpty(){
    var resultado = true;
    if(jQuery('#fullname').val() != ''){
        return false;
    }

    if(jQuery('#email').val() != ''){
        return false;
    }

    if(jQuery('#confirmemail').val() != ''){
        return false;
    }
    
    if(jQuery('.day-select').val() != null){
        return false;
    }

    if(jQuery('.month-select').val() != null){
        return false;
    }

    if(jQuery('.year-select').val() != null){
        return false;
    }

        
    return resultado;
}

function someReturnSelected(){
    let someSelected = false;
    jQuery("select[id^='return-item-options']").each(function(){
        if(jQuery(this).val() != "0" ){
            someSelected = true;
        }
    });
    return someSelected;
}

function showMainContainerLoading(){
    if(isMainContainerHigerThanWindow()){
        jQuery('.main-container-loading .overlay-loading-main').css('height','100vh');
    }
    jQuery('.main-container-loading').show();
    jQuery('.main-container-loading .overlay-loading-main').show();
}
function isMainContainerHigerThanWindow(){
    return getMainContainerHeight() > jQuery(window).height();
}

function getMainContainerHeight(){
    return jQuery('.col-main').height();
}

function showAccountSectionLoading(){
    jQuery('.overlay-loading-text p').hide();
    if(isMainContainerHigerThanWindow()){
        jQuery('.overlay-loading .fixed-loading').css('height','100vh');
    }
    jQuery('.overlay-loading').show();

    setTimeout(function() {
        jQuery('.overlay-loading-text p').fadeIn(500);
    }, 3000);
}

function isSocioContainerHigerThanWindow(){
    return jQuery('.socio-container').height() > jQuery(window).height();
}

function showAccountNotLoggedSectionLoading(){
    if(isSocioContainerHigerThanWindow()){
        jQuery('.overlay-loading .fixed-loading').css('height','100vh');
    }
    jQuery('.overlay-loading').show();
}

function validarNifCifNie(valor) {
    valor = valor.toUpperCase().trim();
    // Validar NIF (8 números + 1 letra)
    if (/^[0-9]{8}[A-Z]$/.test(valor)) {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const numero = parseInt(valor.substring(0, 8), 10);
        const letra = valor.charAt(8);
        return letra === letras.charAt(numero % 23);
    }

    // Validar NIE (X, Y, Z + 7 números + 1 letra)
    if (/^[XYZ][0-9]{7}[A-Z]$/.test(valor)) {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        let nie = valor;
        nie = nie.replace('X', '0').replace('Y', '1').replace('Z', '2');
        const numero = parseInt(nie.substring(0, 8), 10);
        const letra = valor.charAt(8);
        return letra === letras.charAt(numero % 23);
    }

    // Validar CIF (1 letra + 7 números + 1 dígito o letra)
    if (/^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/.test(valor)) {
        const letraInicial = valor.charAt(0);
        const numeros = valor.substring(1, 8);
        const control = valor.charAt(8);

        let sumaPares = 0;
        for (let i = 1; i < 7; i += 2) {
            sumaPares += parseInt(numeros.charAt(i), 10);
        }

        let sumaImpares = 0;
        for (let i = 0; i < 7; i += 2) {
            let doble = parseInt(numeros.charAt(i), 10) * 2;
            if (doble > 9) doble = 1 + (doble % 10);
            sumaImpares += doble;
        }

        const sumaTotal = sumaPares + sumaImpares;
        const unidad = (10 - (sumaTotal % 10)) % 10;

        const letrasControl = 'JABCDEFGHI';

        if (/[ABEH]/.test(letraInicial)) {
            // El control debe ser numérico
            return control == unidad;
        } else if (/[KPQS]/.test(letraInicial)) {
            // El control debe ser una letra
            return control === letrasControl.charAt(unidad);
        } else {
            // Puede ser un número o una letra
            return control == unidad || control === letrasControl.charAt(unidad);
        }
    }

    return false; // No coincide con ningún formato
}

function create_selects(context, no_results_text) {
    /** Convertim tots els selects en un div per poder personalitzar-lo per css **/
    jQuery('select', context).each(function (element) {
        /** El select del cercador no cal canviar-lo **/
        if (!jQuery(this).hasClass("age-search-select") && !jQuery(this).hasClass("not-customizable")) {
            jQuery(this).addClass('custom-select').chosen({
                no_results_text: no_results_text,
                width: "100%",
                search_contains: true,
                auto_scroll: false
            });
            /** Afegim la clase custom-select per personalitzar-lo **/
            jQuery(this).css('display', '').nextAll('.chosen-container').addClass('custom-select');
        }
    });
}

function initializeBillingRegionUpdater(regionsJson) {
    if (typeof RegionUpdater !== 'undefined') {
        RegionIsASelect = true;

        billingRegionUpdater = new RegionUpdater(
            'billing:country_id',
            'billing:region',
            'billing:region_id',
            regionsJson
        );

        var countrySelect = jQuery('#billing\\:country_id');
        if (countrySelect && countrySelect.val()) {
            countrySelect.trigger('change');

            // Espera a que RegionUpdater actualice la región
            setTimeout(function () {
                var regionSelect = jQuery('#billing\\:region_id');
                if (regionSelect.length && regionSelect.find('option').length <= 1) {
                    // No hay regiones válidas
                    disableRegionSelect("billing");
                    RegionIsASelect = false;
                    change_required_region("billing");
                } else {
                    enableRegionSelect("billing");
                    RegionIsASelect = true;
                    change_required_region("billing");
                }
            }, 100); // pequeño retraso para dejar actuar a RegionUpdater
        }
    } else {
        console.error("RegionUpdater no está definido");
    }
}


function change_required_region(type) {
    //if(jQuery('#'+type+'\\:country_id').val() === 'ES'){
    if (RegionIsASelect) {	// Si la región es un select, entonces el campo es obligatorio
        jQuery('#' + type + '\\:region').addClass('required-entry');
        jQuery('#' + type + '\\:region_id').addClass('validate-select');
        jQuery('[for=' + type + '\\:region_id] span.symbol').show();
    } else {
        jQuery('#' + type + '\\:region').addClass('required-entry');
        jQuery('#' + type + '\\:region_id').removeClass('validate-select');
        jQuery('[for=' + type + '\\:region_id] span.symbol').hide();
    }

}

function disableRegionSelect(type) {
    jQuery('billing#shipping\\:region_id').removeClass('visible');
    var select = jQuery('#' + type + '\\:region_id');
    jQuery('option', select).remove();
    jQuery(select).trigger("chosen:updated");
    jQuery('div#' + type + '_region_id_chosen').hide();
    jQuery('#' + type + '\\:region').fadeIn(800).val('');
}

function enableRegionSelect(type) {
    jQuery('select#shipping\\:region_id').addClass('visible');
    var label = jQuery('label[for="' + type + "\\:region_id" + '"]');
    jQuery('#' + type + '\\:region').data('value', '').hide();
    jQuery('div#' + type + '_region_id_chosen').fadeIn();
}

function search_region_id(country_id, region_name,regions){
    //var regions = regions_json;
    var region_id = 0;
    if (regions[country_id]) {
        for (var key in regions[country_id]) {
            var region = regions[country_id][key];
            if (region.name === region_name) {
                region_id = key; // puede ser string
                break;
            }
        }
    }
    return region_id;
}
function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    var currentButton = jQuery(button);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - currentButton.offset().left - radius}px`;
    circle.style.top = `${event.pageY - currentButton.offset().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

