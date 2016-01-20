

// #[bg_msg_to_ct]   -- search for background page message to the content script  
// #[bg_msg_to_ui]   -- search for background page message to the ui page
// use "chrome.runtime.onMessage.addListener" to receive message from both


// Manage persistant storage
// ===========================

// when the background page loads .. it loads the last state of the app.
chrome.storage.sync.get('appState2', function (state) {
	// state - is a javascript object literal
    
    /* do something with the loaded state */
    app.init(state);

    if(state){
    	console.log(state.msg);
    }

});

/*
chrome.storage.onChanged.addListener(function (changes) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() });
});
*/

// The actual app
// ================

var app = {

	state : null,

	init : function (state){
		console.log("[background-page] - app::init with the state");
		app.state = state.msg ? state : { msg : 0 };
		app.state.msg += 1;	
		app.save();
	},

	save : function (){
		// save the app state in the persistant storage
		chrome.storage.sync.set('appState2', app.state);
	}

};


// listen to messages from UI pages or content script
// ====================================================

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name == "msgfromcontentscript") {
    	switch (request.type){
    		case "type1": 
    			console.log("[background-page] - receive message from content script - type1");

    			// this is how you send messages from the background page to the content script and ui page
    			// be careful not to have debug window on focus when using this mechanism ... because it takes 
    			// the focus and tabs[0] is undefined.

    			// message to the content script
    			// #[bg_msg_to_ct]
    			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    				chrome.tabs.sendMessage(tabs[0].id, { "name" : "msgfrombackgroundpage", "type": "type1" });
    			});
    			
    			// message to the ui page
    			// #[bg_msg_to_ui]
    			chrome.extension.sendMessage({ "name" : "msgfrombackgroundpage", "type": "type2" }, function(response) {
			        // console.log(response);
			    });

    			break;
    		case "type2": 
    			console.log("[background-page] - receive message from content script - type2");
    			/* do something */
    			break;
    	}

    	// ??
        //chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //    	chrome.pageAction.show(tabs[0].id);
        // 		chrome.tabs.sendMessage(tabs[0].id, { mntr_sender: "background", mntr_msg: "Hello from background page" });
        // 		chrome.tabs.sendMessage(tabs[0].id, { mntr_sender: "background", mntr_msg: { url: "https://montiera.hs.llnwd.net/e2/coms/1.4.3/js/mng.js", prms: "coms_prdct=coms001&pos=l&v=1.0&serp=1&pname=test" } } );
        //});
    }

    if (request.name == "msgfromuipage") {
    	switch (request.type){
    		case "type1": 
    			console.log("[background-page] - receive message from ui page - type1");
    			/* do something */
    			break;
    		case "type2": 
    			console.log("[background-page] - receive message from ui page - type2");
    			/* do something */
    			break;
    	}
    }
});


// If needed, the app can load a context menu
// ============================================

var menuItem = {
    "id": "myappcontextmenu", // use your own name 
    "title": "My App Context", // use your own title
    "contexts":["selection"]
}

chrome.contextMenus.create(menuItem);

// the user mark a portion inside the page, click the right mouse button, and our app menu
chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "myappcontextmenu" && clickData.selectionText) {
        
        /* the user clicked on our context menu, do something about that */
    }
});


