chrome.browserAction.setTitle({
    title : "前端技术哪家强——影像产品找老王"
});

var gExEnabled = true;

chrome.browserAction.onClicked.addListener(function(){
	gExEnabled = !gExEnabled;
	
	if (gExEnabled) {
		chrome.browserAction.setIcon({path:"enable.png"});
	} else {
		chrome.browserAction.setIcon({path:"disable.png"});
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "getExEnabled") {
        sendResponse({exEnabled : gExEnabled});
        return true;
    }
});
