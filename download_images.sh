#!/bin/bash
# Download image assets from Futbolmania

cd /home/lordwhitefire/athletica/frontends

# Favicon
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/favicon.ico" -o favicon.ico

# Doofinder images
mkdir -p images/doofinder
cd images/doofinder
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/images/doofinder/icono-lupa-gris-buscador.svg" -o icono-lupa-gris-buscador.svg
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/images/doofinder/flecha-doofinder.svg" -o flecha-doofinder.svg
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/images/doofinder/icono-borrar.svg" -o icono-borrar.svg
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/images/doofinder/external-link-gris.svg" -o external-link-gris.svg
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/images/doofinder/sugerencia-flecha.png" -o sugerencia-flecha.png
curl -sL "https://www.futbolmania.com/skin/frontend/rwd/futbolmania/images/catalog/product/placeholder/image.jpg" -o placeholder.jpg

# Logos
cd /home/lordwhitefire/athletica/frontends
mkdir -p media/wysiwyg/ImagenesHeader
cd media/wysiwyg/ImagenesHeader
curl -sL "https://www.futbolmania.com/media/wysiwyg/ImagenesHeader/logo-df-futbolmania.svg" -o logo-df-futbolmania.svg
curl -sL "https://www.futbolmania.com/media/wysiwyg/ImagenesHeader/logo-df-futbolmaniaKids.svg" -o logo-df-futbolmaniaKids.svg
curl -sL "https://www.futbolmania.com/media/wysiwyg/ImagenesHeader/logo-futbolmaniaKids.svg" -o logo-futbolmaniaKids.svg

# Personalization icon
cd /home/lordwhitefire/athletica/frontends
mkdir -p media/wysiwyg/personalizacion
curl -sL "https://www.futbolmania.com/media/wysiwyg/personalizacion/personalizacion_30x30.png" -o media/wysiwyg/personalizacion/personalizacion_30x30.png

echo "Image download complete!"
ls -laR images/
ls -laR media/
