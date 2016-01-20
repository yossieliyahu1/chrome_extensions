

// #[pop_msg_to_ct]   -- search for ui page message to the content script  
// #[pop_msg_to_bg]   -- search for ui page message to the background page 
// use "chrome.runtime.onMessage.addListener" to receive message from both


$(function () {

	// send message to the content script
	$('#msgToCt').click(function () {
        // #[pop_msg_to_ct] 
    	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    		chrome.tabs.sendMessage(tabs[0].id, { name : "msgfromuipage", type: "type1" });
    	});
    });

	// send message to the background page
	$('#msgToBg').click(function () {
        // #[pop_msg_to_bg]
		chrome.runtime.sendMessage({ name : "msgfromuipage", type: "type2" });
	});

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.name == "msgfromcontentscript") {
            switch (request.type){
                case "type1": 
                    alert("[ui-page] - receive message from content script - type1");
                    /* do something */
                    break;
                case "type2": 
                    alert("[ui-page] - receive message from content script - type2");
                    /* do something */
                    break;
            }
        }

        if (request.name == "msgfrombackgroundpage") {
            switch (request.type){
                case "type1": 
                    alert("[ui-page] - receive message from background page - type1");
                    /* do something */
                    break;
                case "type2": 
                    alert("[ui-page] - receive message from background page - type2");
                    break;
            }
        }
    });
});


/*

                var opt = {
                    type: "basic",
                    title: "Goal reached!",
                    message: "You reached your goal of " + items.goal + "!",
                    iconUrl: "icon.png"
                }

                chrome.notifications.create('goalReached', opt, function () { });

*/