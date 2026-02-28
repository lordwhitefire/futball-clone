#!/bin/bash
# Download JS files from Futbolmania

cd /home/lordwhitefire/athletica/frontends/js

# Core libraries
curl -sL "https://www.futbolmania.com/js/prototype/prototype.js" -o prototype.js
curl -sL "https://www.futbolmania.com/js/lib/jquery/jquery-1.12.1.min.js" -o jquery-1.12.1.min.js
curl -sL "https://www.futbolmania.com/js/lib/jquery/ui/1.11.2/jquery-ui.js" -o jquery-ui.js
curl -sL "https://www.futbolmania.com/js/lib/jquery/noconflict.js" -o noconflict.js
curl -sL "https://www.futbolmania.com/js/lib/ccard.js" -o ccard.js
curl -sL "https://www.futbolmania.com/js/prototype/validation.js" -o validation.js

# Scriptaculous
curl -sL "https://www.futbolmania.com/js/scriptaculous/builder.js" -o scriptaculous-builder.js
curl -sL "https://www.futbolmania.com/js/scriptaculous/effects.js" -o scriptaculous-effects.js
curl -sL "https://www.futbolmania.com/js/scriptaculous/dragdrop.js" -o scriptaculous-dragdrop.js
curl -sL "https://www.futbolmania.com/js/scriptaculous/controls.js" -o scriptaculous-controls.js
curl -sL "https://www.futbolmania.com/js/scriptaculous/slider.js" -o scriptaculous-slider.js

# Mobile
curl -sL "https://www.futbolmania.com/js/mobile/ios-helper.js" -o ios-helper.js
curl -sL "https://www.futbolmania.com/js/mobile/jquery.ui.touch-punch.min.js" -o jquery.ui.touch-punch.min.js

# Varien & Mage
curl -sL "https://www.futbolmania.com/js/varien/js.js" -o varien-js.js
curl -sL "https://www.futbolmania.com/js/varien/form.js" -o varien-form.js
curl -sL "https://www.futbolmania.com/js/mage/translate.js" -o mage-translate.js
curl -sL "https://www.futbolmania.com/js/mage/cookies.js" -o mage-cookies.js

# Amasty
curl -sL "https://www.futbolmania.com/js/amasty/amshopby/amshopby.js" -o amshopby.js
curl -sL "https://www.futbolmania.com/js/amasty/amshopby/amshopby-ajax.js" -o amshopby-ajax.js

# Correos
curl -sL "https://www.futbolmania.com/js/correos/proj4js-compressed.js" -o proj4js-compressed.js
curl -sL "https://www.futbolmania.com/js/correos/correos.js" -o correos.js

# Skin JS
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/modernizr.custom.min.js" -o modernizr.custom.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/selectivizr.js" -o selectivizr.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/matchMedia.js" -o matchMedia.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/matchMedia.addListener.js" -o matchMedia.addListener.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/enquire.js" -o enquire.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/app.js" -o app.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/jquery.cycle2.min.js" -o jquery.cycle2.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/jquery.cycle2.swipe.min.js" -o jquery.cycle2.swipe.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/slideshow.js" -o slideshow.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/imagesloaded.js" -o imagesloaded.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/minicart.js" -o minicart.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/jquery.mCustomScrollbar.concat.min.js" -o jquery.mCustomScrollbar.concat.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/base/default/js/z_amasty/plugins/jquery.carouFredSel-6.2.1.js" -o jquery.carouFredSel-6.2.1.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/chosen.jquery.js" -o chosen.jquery.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/header.js" -o header.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/menu.js" -o menu.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/product_list_ajax.js" -o product_list_ajax.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/cookieconsent/banner.js" -o cookieconsent-banner.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/doofinder.js" -o doofinder.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/amasty/plugins/jquery.touchSwipe.min.js" -o jquery.touchSwipe.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/footer.js" -o footer.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/video-js/videojs-ie8.min.js" -o videojs-ie8.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/base/default/js/z_amasty/plugins/jquery.tooltipster.min.js" -o jquery.tooltipster.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/product-grid.js" -o product-grid.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/owlcarousel/owl.carousel.min.js" -o owl.carousel.min.js
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/jquery.touchSwipe.min.js" -o jquery.touchSwipe2.min.js

echo "JS download complete!"
ls -la
