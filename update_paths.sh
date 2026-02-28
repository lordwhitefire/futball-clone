#!/bin/bash
# Update index.html to use local CSS/JS files

cd /home/lordwhitefire/athletica/frontends

# Create backup
cp index.html index.html.backup

# Update CSS references
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/jquery-ui/jquery-ui.css|css/jquery-ui.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/jquery-ui/jquery-ui-slider-pips.css|css/jquery-ui-slider-pips.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/jquery.mCustomScrollbar.min.css|css/jquery.mCustomScrollbar.min.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/chosen.css|css/chosen.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/customSelect.css|css/customSelect.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/bubble/elasticsearch.css|css/elasticsearch.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/amshopby.css|css/amshopby.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/cookieconsent/banner.css|css/cookieconsent-banner.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/base/default/css/magestore/fblogin.css|css/fblogin.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/correos.css|css/correos.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/styles-2_v0.1.css|css/styles-2.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/doofinder.css|css/doofinder.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/footer.css|css/footer.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/responsive_v0.1.css|css/responsive.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/popups.css|css/popups.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/static-cms.css|css/static-cms.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/menu.css|css/menu.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/video-js/css/video-js.css|css/video-js.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/base/default/js/amasty/amconf/css/tooltipster.css|css/tooltipster.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/home.css|css/home.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/products-grid.css|css/products-grid.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/owlcarousel/owl.carousel.min.css|css/owl.carousel.min.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/owlcarousel/owl.theme.default.min.css|css/owl.theme.default.min.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/styles.css|css/styles.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/madisonisland.css|css/madisonisland.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/styles-ie8.css|css/styles-ie8.css|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/madisonisland-ie8.css|css/madisonisland-ie8.css|g' index.html

# Update JS references
sed -i 's|https://www.futbolmania.com/js/prototype/prototype.js|js/prototype.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/lib/jquery/jquery-1.12.1.min.js|js/jquery-1.12.1.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/lib/jquery/ui/1.11.2/jquery-ui.js|js/jquery-ui.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/lib/jquery/noconflict.js|js/noconflict.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/lib/ccard.js|js/ccard.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/prototype/validation.js|js/validation.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/scriptaculous/builder.js|js/scriptaculous-builder.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/scriptaculous/effects.js|js/scriptaculous-effects.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/scriptaculous/dragdrop.js|js/scriptaculous-dragdrop.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/scriptaculous/controls.js|js/scriptaculous-controls.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/scriptaculous/slider.js|js/scriptaculous-slider.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/mobile/ios-helper.js|js/ios-helper.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/mobile/jquery.ui.touch-punch.min.js|js/jquery.ui.touch-punch.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/varien/js.js|js/varien-js.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/varien/form.js|js/varien-form.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/mage/translate.js|js/mage-translate.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/mage/cookies.js|js/mage-cookies.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/amasty/amshopby/amshopby.js|js/amshopby.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/amasty/amshopby/amshopby-ajax.js|js/amshopby-ajax.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/correos/proj4js-compressed.js|js/proj4js-compressed.js|g' index.html
sed -i 's|https://www.futbolmania.com/js/correos/correos.js|js/correos.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/modernizr.custom.min.js|js/modernizr.custom.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/selectivizr.js|js/selectivizr.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/matchMedia.js|js/matchMedia.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/matchMedia.addListener.js|js/matchMedia.addListener.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/enquire.js|js/enquire.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/app.js|js/app.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/jquery.cycle2.min.js|js/jquery.cycle2.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/jquery.cycle2.swipe.min.js|js/jquery.cycle2.swipe.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/slideshow.js|js/slideshow.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/lib/imagesloaded.js|js/imagesloaded.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/minicart.js|js/minicart.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/jquery.mCustomScrollbar.concat.min.js|js/jquery.mCustomScrollbar.concat.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/base/default/js/z_amasty/plugins/jquery.carouFredSel-6.2.1.js|js/jquery.carouFredSel-6.2.1.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/chosen.jquery.js|js/chosen.jquery.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/header.js|js/header.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/menu.js|js/menu.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/product_list_ajax.js|js/product_list_ajax.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/cookieconsent/banner.js|js/cookieconsent-banner.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/doofinder.js|js/doofinder.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/amasty/plugins/jquery.touchSwipe.min.js|js/jquery.touchSwipe.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/footer.js|js/footer.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/video-js/videojs-ie8.min.js|js/videojs-ie8.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/base/default/js/z_amasty/plugins/jquery.tooltipster.min.js|js/jquery.tooltipster.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/product-grid.js|js/product-grid.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/owlcarousel/owl.carousel.min.js|js/owl.carousel.min.js|g' index.html
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/jquery.touchSwipe.min.js|js/jquery.touchSwipe2.min.js|g' index.html

# Update favicon
sed -i 's|https://www.futbolmania.com/skin/frontend/rwd/futbolmania/favicon.ico|favicon.ico|g' index.html

# Update image paths for Doofinder SVGs
sed -i 's|/skin/frontend/rwd/futbolmania/images/doofinder/|images/doofinder/|g' index.html
sed -i 's|/skin/frontend/rwd/futbolmania/images/catalog/product/placeholder/image.jpg|images/doofinder/placeholder.jpg|g' index.html

# Update media/wysiwyg paths
sed -i 's|/media/wysiwyg/ImagenesHeader/|media/wysiwyg/ImagenesHeader/|g' index.html
sed -i 's|/media/wysiwyg/personalizacion/|media/wysiwyg/personalizacion/|g' index.html

echo "index.html updated successfully!"
echo ""
echo "Checking for remaining futbolmania.com references..."
grep -c "futbolmania.com" index.html || echo "0 references remaining"
