/**
 * This has to match with backend. Whenever there's an update on backend smooth scroll implementation, it should reflect here also
 * TODO: Create an endpoint in backend as the source of smooth scroll - have them centralized
 */
 (function(){
    let defaultScrollFactor = 0.70;
    // Add pages here where it needs this behavior
    let allowedPaths = [ '/help/guide/faq.html', '/setting.html' ];
    let targetInputs = [ // node: BODY - trigger on body, INPUT - trigger on input, ANY - trigger on any focused elements 
        { node: "BODY", code: "SPACE", key: "SPACEBAR", altKey: false, shiftKey: false, scroll: "DOWN" },
        { node: "DIV", code: "SPACE", key: "SPACEBAR", altKey: false, shiftKey: false, scroll: "DOWN" },
        { node: "ANY", code: "ARROWDOWN", key: "N/A", altKey: true, shiftKey: false, scroll: "DOWN" },
        { node: "ANY", code: "PAGEDOWN", key: "PAGEDOWN", altKey: false, shiftKey: false, scroll: "DOWN" },
        { node: "BODY", code: "SPACE", key: "SPACEBAR", altKey: false, shiftKey: true, scroll: "UP" },
        { node: "DIV", code: "SPACE", key: "SPACEBAR", altKey: false, shiftKey: true, scroll: "UP" },
        { node: "ANY", code: "ARROWUP", key: "N/A", altKey: true, shiftKey: false, scroll: "UP" },
        { node: "ANY", code: "PAGEUP", key: "PAGEUP", altKey: false, shiftKey: false, scroll: "UP" },
    ];
    let scrollFactors = [
        { max: 99999, min: 750, percent: 0.77 },
        { max: 749, min: 540, percent: 0.70 },
        { max: 539, min: 0, percent: 0.65 },
    ];
    
    let customScroll = function (event) {
        //console.log(event); //Enable this for debugging
        if(allowedPaths.filter(function(e){return e == window.location.pathname}).length <= 0) return;
        
        let altKey = event.altKey;
        let shiftKey = event.shiftKey;
        let code = event.code ? event.code.toUpperCase() : event.key.toUpperCase();
        let node = event.target.nodeName.toUpperCase();
        let filtered = targetInputs.filter(function(input){
            let pass = true;
            pass = !pass ? pass : input.node == node || input.node == "ANY";
            pass = !pass ? pass : input.code == code || input.key == code;
            pass = !pass ? pass : input.altKey == altKey;
            pass = !pass ? pass : input.shiftKey == shiftKey;
            return pass;
        });
        if(filtered.length > 0){
            event.preventDefault();
            let height = top.window.innerHeight;
            let filterPercent = scrollFactors.filter(function(range){return height <= range.max && height >= range.min});
            let percentFactor = filterPercent.length > 0 ? filterPercent[0].percent : defaultScrollFactor;
            let direction = (window.innerHeight * percentFactor) * (filtered[0].scroll == "DOWN" ? 1 : -1);
            let yScrollOffset = window.scrollY ? window.scrollY : window.pageYOffset;
            
            if(window.scrollY){
                window.scrollTo({
                    top: (yScrollOffset + direction),
                    behavior: 'smooth'
                });
            } else {
                let newTargetYOffset = yScrollOffset + direction;
                let increment = 25;
                let incremented = yScrollOffset;
                let remaining = 0;
                let scrollInterval = setInterval(function(){
                    if(direction < 0 ? incremented <= newTargetYOffset : incremented >= newTargetYOffset){
                        clearInterval(scrollInterval);
                    }else{
                        remaining = direction < 0 ? incremented - newTargetYOffset : newTargetYOffset - incremented;
                        incremented += (remaining > increment ? increment : remaining) * (direction < 0 ? -1 : 1);
                    }
                    window.scrollTo(0, incremented);
                },17);
            }
        }
    };
    window.addEventListener("keydown", customScroll, true);
})();
