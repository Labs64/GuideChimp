function loadScript(url, onLoad, location) {
    var script = document.createElement('script');
    script.src = url;
    if (onLoad) {
        script.onload = onLoad;
    }
    location = location || document.head;
    location.appendChild(script);

    return script;
}

function loadStyles(href, location) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;

    location = location || document.head;
    location.appendChild(link);
    return link;
}

// load GuideChimp script
loadScript('https://cdn.jsdelivr.net/npm/guidechimp@2/dist/guidechimp.min.js');
// load GuideChimp styles
loadStyles('https://cdn.jsdelivr.net/npm/guidechimp@2/dist/guidechimp.min.css');
