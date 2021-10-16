chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        toggleSitesActive: true,
        toggleSitesList: "google.de",
        searchLookup: [
            {
                key: 'mp',
                // value: 'meine Programme'
                value: 'insurance.html'
            },
            {
                key: 'ms',
                // value: 'meine Standorte'
                value: 'index.html'
            },
            {
                key: 'ma',
                value: 'mandant.html'
            },
            {
                key: 'cc',
                value: 'contentreator.html'
            },
            {
                key: 'so',
                value: 'screensonline.html'
            },
            {
                key: 'su',
                value: 'screenuebersicht.html'
            },
            {
                key: 'ad',
                value: 'administration.html'
            },
            {
                key: 'be',
                value: 'benutzer.html'
            },
            {
                key: 'ei',
                value: 'einstellung.html'
            },
            {
                key: 'st',
                value: 'standortverwaltung.html'
            },
            {
                key: 'mt',
                value: 'meinetags.html'
            },
            {
                key: 'pl',
                value: 'playercontenterror.html'
            }
        ]
    }, function() {});
});
let toggleSitesActive = true;
// let toggleSitesList = 'google.de';
let toggleSitesList = '';
let searchLookup = [];
chrome.storage.sync.get(["toggleSitesActive","toggleSitesList","searchLookup"], function(result) {
    toggleSitesActive=result.toggleSitesActive;
    toggleSitesList=result.toggleSitesList;
    searchLookup = result.searchLookup;
});
chrome.webRequest.onBeforeRequest.addListener(function(details) {
        // if the toggle is inactive continue like normal
        if (!toggleSitesActive) {
            return { cancel: false };
        }

        // // go through list of blocked sites
        // let cancel = toggleSitesList.split(/\n/).some(function(url) {
        //     return -1 < details.url.indexOf(url);
        // });

        // return { cancel: cancel };
        return { cancel: false };
    },
    {
        urls: ['https://*/*', 'http://*/*']
    },
    [
        "blocking"
    ]
);

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ('sync' === namespace) {
        if (changes.toggleSitesActive) {
            toggleSitesActive = changes.toggleSitesActive.newValue;
        }
        if (changes.toggleSitesList) {
            toggleSitesList = changes.toggleSitesList.newValue;
        }
        if (changes.searchLookup) {
            searchLookup = changes.searchLookup.newValue;
        }
    }
});