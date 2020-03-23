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

// load GuideChimp plugins
loadScript('https://cdn.jsdelivr.net/npm/guidechimp@1/dist/plugins/removeAttribution.min.js');
