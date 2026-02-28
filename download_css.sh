#!/bin/bash
# Download CSS files from Futbolmania

cd /home/lordwhitefire/athletica/frontends/css

# Main CSS files
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/jquery-ui/jquery-ui.css" -o jquery-ui.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/jquery-ui/jquery-ui-slider-pips.css" -o jquery-ui-slider-pips.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/jquery.mCustomScrollbar.min.css" -o jquery.mCustomScrollbar.min.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/chosen.css" -o chosen.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/customSelect.css" -o customSelect.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/bubble/elasticsearch.css" -o elasticsearch.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/amshopby.css" -o amshopby.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/cookieconsent/banner.css" -o cookieconsent-banner.css
curl -sL "https://www.futbolmania.com/skin/frontend/base/default/css/magestore/fblogin.css" -o fblogin.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/correos.css" -o correos.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/styles-2_v0.1.css" -o styles-2.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/doofinder.css" -o doofinder.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/footer.css" -o footer.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/responsive_v0.1.css" -o responsive.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/popups.css" -o popups.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/static-cms.css" -o static-cms.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/menu.css" -o menu.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/js/video-js/css/video-js.css" -o video-js.css
curl -sL "https://www.futbolmania.com/skin/frontend/base/default/js/amasty/amconf/css/tooltipster.css" -o tooltipster.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/home.css" -o home.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/products-grid.css" -o products-grid.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/owlcarousel/owl.carousel.min.css" -o owl.carousel.min.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/owlcarousel/owl.theme.default.min.css" -o owl.theme.default.min.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/styles.css" -o styles.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/madisonisland.css" -o madisonisland.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/styles-ie8.css" -o styles-ie8.css
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/css/madisonisland-ie8.css" -o madisonisland-ie8.css

echo "CSS download complete!"
ls -la
