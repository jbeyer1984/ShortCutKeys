chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        toggleSitesActive: true,
        toggleSitesList: "google.de",

        searchLookup: [
            {
                key: 'mp',
                value: 'programme'
            },
            {
                key: 'ms',
                value: 'standorte'
            },
            {
                key: 'me',
                value: 'mediathek'
            },
            {
                key: 'ma',
                value: 'administration/clients'
            },
            {
                key: 'cc',
                value: 'contentCreator'
            },
            {
                key: 'so',
                value: 'administration/screenActivity'
            },
            {
                key: 'su',
                value: 'administration/screenOverview'
            },
            {
                key: 'ad',
                value: 'administration'
            },
            {
                key: 'be',
                value: 'administration/specificUserList'
            },
            {
                key: 'ei',
                value: 'settings/user'
            },
            {
                key: 'st',
                value: 'settings/locations'
            },
            {
                key: 'mt',
                value: 'settings/tags'
            },
            {
                key: 'qe',
                value: 'administration/queue'
            },
            {
                key: 'pl',
                value: 'administration/player/download/error/dashboard'
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