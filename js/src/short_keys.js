

export default function() {
    let components = {};
    let me;
    let ShortKeys = {
        name: 'app',
        components: components,
        data: function() {
            return {
                searchString: '',
                // searchLookup: ['mp'],
                searchLookup: [
                    {
                        key: 'mp',
                        value: 'meine Programme'
                    },
                    {
                        key: 'ms',
                        value: 'meine Standorte'
                    }
                ],
            };
        },
        beforeCreate: function() {
            me = this;
            chrome.storage.sync.get(["toggleSitesActive","toggleSitesList","searchLookup"], function(result) {
                me.searchLookup = result.searchLookup;
            });
            // this.searchLookup = toggleSitesList;
            // alert("before create")
        },
        computed: {
            searchResult: function() {
                if (undefined === me.searchString) {
                    return me.searchLookup;
                }
                if ('' === me.searchString) {
                    return me.searchLookup;
                }
                let filtered = me.searchLookup.filter(function(entry) {
                    return -1 < entry.key.indexOf(me.searchString);
                });
                if (1 === filtered.length) {
                    // console.log(filtered[0].value);
                    // alert(filtered[0].value);
                    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
                        // alert(JSON.stringify(tab));
                        // alert(tab[0].active);
                        let url = new URL(tab[0].url);
                        url = url.protocol + '//' + url.host + '/' + filtered[0].value;
                        // console.log(filtered[0].value);
                        // alert(filtered[0].value);
                        chrome.tabs.update(tab.id, {url: url});
                        me.searchString = '';
                        window.close();
                    });                    // window.location.href = 'www.gmx.de';
                    // console.log(window.location.href);
                }
                // let filtered = me.searchLookup;
                console.log(filtered);
                return filtered;
            }
        },
        methods: {
            addEntry: function() {
               this.searchLookup.push({
                   key: '',
                   value: ''
               })
            },
            deleteEntryByKey: function(key) {
                alert(key);
                delete this.searchLookup[key];
                this.searchLookup = this.searchLookup.filter(function(entry) {
                    return entry !== null;
                });
            },
            saveState: function() {
                chrome.storage.sync.set({
                    toggleSitesActive: this.toggleSitesActive,
                    // toggleSitesList: "google.de"
                    toggleSitesList: this.toggleSitesList,
                    searchLookup: this.searchLookup
                }, function() {});
            }
        },
        'template': `
        <div>
            <input type="text" v-model="searchString" autofocus="autofocus">
            <input class="right" type="button" value="save" @click.prevent="saveState()">
            <div>{{ searchString }}</div>
            <div class="fields" v-for="entry, key in searchResult">
                <span><input type="text" v-model="entry.key"/></span>
                <span><input type="text" v-model="entry.value"/></span>
                <span><input type="button" value="x" @click.prevent="deleteEntryByKey(key)"/></span>
                <div class="clear"></div>
            </div>
            <input type="button" value="add" @click.prevent="addEntry()"/>
        </div>
        `
    }

    return ShortKeys;
}