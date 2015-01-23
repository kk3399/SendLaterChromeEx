//alert('content script loaded');

chrome.extension.onMessage.addListener(
function (request, sender, sendResponse) {

    //debugger;


    if (request.action == 'GET_URL') {
        var pageURL = document.URL;
        sendResponse(pageURL);
    }
});