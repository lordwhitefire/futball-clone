var user_device;
var iphone4s = {
    portrait: {
        full: {
            width: 320,
            height: 372
        },
        minimal: {
            width: 320,
            height: 441
        }
    },
    landscape: {
        full: {
            width: 480,
            height: 232
        },
        minimal: {
            width: 480,
            height: 320
        }
    }
};

var iphone5 = {
    portrait: {
        full: {
            width: 320,
            height: 460
        },
        minimal: {
            width: 320,
            height: 529
        }
    },
    landscape: {
        full: {
            width: 568,
            height: 320
        },
        minimal: {
            width: 568,
            height: 320
        }
    }
};

var iphone6 = {
    portrait: {
        full: {
            width: 375,
            height: 559
        },
        minimal: {
            width: 320,
            height: 529
        }
    },
    landscape: {
        full: {
         width: 568,
         height: 320
         },
        minimal: {
            width: 568,
            height: 320
        }
    }
};

function is_iphone(){
    return navigator.userAgent.match(/iPhone/i) ? true:false;
}
function is_ipad(){
    return navigator.userAgent.match(/iPod/i) ? true:false;
}

function is_iphone4s(width, height, orientation) {
    if(orientation == "portrait"){
        return (width === iphone4s.portrait.full.width && height === iphone4s.portrait.full.height || width === iphone4s.portrait.minimal.width && height === iphone4s.portrait.minimal.height);
    }
    return (width === iphone4s.landscape.full.width && height === iphone4s.landscape.full.height || width === iphone4s.landscape.minimal.width && height === iphone4s.landscape.minimal.height);
}

function is_iphone5(width, height, orientation) {
    if(orientation == "portrait"){
        return (width === iphone5.portrait.full.width && height === iphone5.portrait.full.height || width === iphone5.portrait.minimal.width && height === iphone5.portrait.minimal.height);
    }
    return (width === iphone5.landscape.full.width && height === iphone5.landscape.full.height || width === iphone5.landscape.minimal.width && height === iphone5.landscape.minimal.height);
}

function is_iphone6(width, height, orientation) {
    if(orientation == "portrait"){
        return (width === iphone6.portrait.full.width && height === iphone6.portrait.full.height || width === iphone6.portrait.minimal.width && height === iphone6.portrait.minimal.height);
    }
    return (width === iphone6.landscape.full.width && height === iphone6.landscape.full.height || width === iphone6.landscape.minimal.width && height === iphone6.landscape.minimal.height);
}

function detect_iphone_version(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    var orientation = (window.matchMedia("(orientation: portrait)").matches) ?  "portrait": "landscape";
    if(is_iphone4s(w, h, orientation)) {
        user_device = iphone4s;
    }
    else if(is_iphone5(w, h, orientation)){
        user_device = iphone5;
    }
    else if(is_iphone6(w, h, orientation)){
        user_device = iphone6;
    }
}

function is_fullscreen(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    if(typeof user_device == "undefined"){
        detect_iphone_version();
    }
    var orientation = (window.matchMedia("(orientation: portrait)").matches) ?  "portrait": "landscape";
    return (typeof user_device == "undefined") ? false:(w == user_device[orientation].minimal.width && h == user_device[orientation].minimal.height);
}