/**
 * Let's control what information.js script should be loaded based on the domain
 */

function informationSource(){
    let prodDomain = 'eow.alc.co.jp';
    let stagingDomain = 'eow2.alc.co.jp';
    let scriptByDomain = new Array();
    scriptByDomain[prodDomain] = '//cdn2.alc.co.jp/eow/eow/js/information.js';
    scriptByDomain[stagingDomain] = '//cdn2.alc.co.jp/eow/eow-st/js/information.js';

    let infoSource = scriptByDomain[window.location.hostname.trim()];
    return (infoSource && infoSource != null && infoSource.length > 0) ? infoSource : scriptByDomain[stagingDomain];
}

(function(){
    let scriptTag = document.createElement('script');
    let parentElement = document.querySelector("head");
    scriptTag.src = informationSource();
    parentElement.insertBefore(scriptTag, parentElement.firstChild);

    scriptTag.onload = function(){
        $(function(){
            document.querySelector("section.info-area").insertAdjacentHTML('afterbegin', info_box);
        });
    }
})();
