// eslint-disable-next-line import/no-unassigned-import
// import './options-storage.js';

const Browser = require("webextension-polyfill");

let index = null;

Browser.tabs.onUpdated.addListener((id, info, tab) => {
    Browser.tabs.query({index: tab.index}).then((tabs) => {
        let tab = tabs[0];
        
        if (tab.url.match(/youtube\.com\/shorts\/([^?&=/]+)/)) {
            if (index == null) {
                index = tab.index;
                let match = tab.url.match(/youtube\.com\/shorts\/([^?&=/]+)/);

                Browser.tabs.update(tab.id, {
                    url: `https://www.youtube.com/watch/${match[1]}`
                });

                setTimeout(() => {
                    index = null;
                }, 500);
            }
        }
    });
});

