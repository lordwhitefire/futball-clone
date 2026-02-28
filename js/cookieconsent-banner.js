
document.addEventListener("DOMContentLoaded", function() {
	var overlay = document.getElementById('cookieOverlay');
    var banner = document.getElementById('cookieBanner');
    var modal = document.getElementById('cookieModal');

    document.getElementById('acceptAll').onclick = function() {
		deleteCookies();
		
		// Calcula la fecha de expiración a 30 días desde hoy
		const date = new Date();
		date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
		const expires = "expires=" + date.toUTCString();
		
		// Crea las cookies con expiración de 1 mes
		document.cookie = "cookie_consent_analytics=1; path=/; " + expires;
		document.cookie = "cookie_consent_thirdparty=1; path=/; " + expires;
		document.cookie = "cookie_consent=1; path=/; " + expires;
		
        banner.style.display = 'none';
		overlay.style.display = 'none';
    };

    document.getElementById('rejectAll').onclick = function() {
		deleteCookies();
		
        document.cookie = "cookie_consent_analytics=0; path=/";
        document.cookie = "cookie_consent_thirdparty=0; path=/";
		document.cookie = "cookie_consent=1; path=/";
        banner.style.display = 'none';
		overlay.style.display = 'none';
    };

    document.getElementById('configure').onclick = function() {
        modal.style.display = 'inline-flex';
        banner.style.display = 'none';		
    };
 
    document.getElementById('cookieSettings').onsubmit = function(e) {
		deleteCookies();
		
        e.preventDefault();
        var analytics = document.querySelector('input[name="analytics"]').checked;
        var thirdparty = document.querySelector('input[name="thirdparty"]').checked;
		
		// Calcula la fecha de expiración a 30 días desde hoy
		const date = new Date();
		date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
		const expires = "expires=" + date.toUTCString();

		// Crea las cookies con expiración de 1 mes
        document.cookie = "cookie_consent_analytics=" + (analytics ? '1' : '0') + "; path=/;" + expires;
        document.cookie = "cookie_consent_thirdparty=" + (thirdparty ? '1' : '0') + "; path=/;" + expires;
		document.cookie = "cookie_consent=1; path=/;" + expires;
		
        modal.style.display = 'none';
		overlay.style.display = 'none';
        //banner.style.display = 'none';
    };
});

function deleteCookies(){
	deleteCookie("cookie_consent_analytics", "/");
	deleteCookie("cookie_consent_thirdparty", "/");
	deleteCookie("cookie_consent", "/");
		
}
// Función para borrar una cookie
function deleteCookie(name, path = "/", domain) {
  let cookieStr = name + "=; path=" + path + "; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  if (domain) {
    cookieStr += " domain=" + domain + ";";
  }
  document.cookie = cookieStr;
}

function getCookieValue(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function toggleInfo(link, divName) {
	const el = document.getElementById(divName);
	var content = document.getElementById(divName);
  
	el.classList.toggle("expanded");
	el.classList.toggle("collapsed");
  
	var isVisible = content.classList.contains('collapsed');
	link.textContent = isVisible ? 'Más información' : 'Menos información';  
}


function ajustarCookieModalHeight() {
	const cookieBanner = document.getElementById('cookieBanner');
	const cookieModal = document.getElementById('cookieModal');
	const isVisible = window.getComputedStyle(cookieBanner).display !== 'none';

	if (cookieBanner && cookieModal && isVisible) {
		const bannerHeight = cookieBanner.offsetHeight;
		cookieModal.style.height = bannerHeight + 'px';
	}
}


jQuery(document).ready(function() {
    setTimeout(function() {
        jQuery('#cookieBanner').addClass('show');
        ajustarCookieModalHeight();
    }, 200);
});
   

// Ajustar cuando se cambie el tamaño de la ventana
window.addEventListener('resize', ajustarCookieModalHeight);