function copyMetaUrl(metaUrl)
{
	// https://stackoverflow.com/a/18455088
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = metaUrl;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(copyFrom);
	copyFrom.select();
	document.execCommand("Copy");
	body.removeChild(copyFrom);
}

// https://stackoverflow.com/a/34553860
chrome.browserAction.onClicked.addListener(
	function(tab)
	{
	   // https://stackoverflow.com/a/19758800
	   chrome.tabs.sendMessage(tab.id, {text: "report_back"}, copyMetaUrl);
	}
);