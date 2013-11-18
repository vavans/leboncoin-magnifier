// ==UserScript==
// @name        vans
// @namespace   vans
// @description Outils de localisation pour leboncoin
// @include     http://www.leboncoin.fr/ventes_immobilieres/offres/*
// @version     1
// @grant       none
// ==/UserScript==

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

function cleanLocation(location) {
    var i = 0;
    var res = "";
    for (i = 0; i < location.length; i++) {
        if (location[i] !== ' ' && location[i] !== '\n' && location[i] !== '\r' && location[i] !== '\c') 
        {
            if (location[i] === '/') 
                res+='+';
            else
                res+=location[i];
        }            
    }
    return res;
}

loadjscssfile("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", "js");

function newGMap(place) 
{
    return '<div>https://maps.google.fr/maps?q='+place+
    '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.fr/maps?q='+place+'&amp;ie=UTF8&amp;hq=&amp;hnear='+place+'&amp;t=m&amp;z=10&amp;iwloc=B&amp;output=embed"></iframe><br /><small><a href="https://maps.google.fr/maps?q='+place+'&amp;ie=UTF8&amp;hq=&amp;hnear='+place+'&amp;t=m&amp;ll=48.580241,7.713776&amp;spn=0.317985,0.583649&amp;z=10&amp;source=embed" style="color:#0000FF;text-align:left">Agrandir le plan</a></small>'
    +'</div>';
}

$("body").append('<div id="gmap"></div>');

$('.placement').each(function () {
    var location = cleanLocation($(this).html());
    $(this).append(newGMap(location));
});
