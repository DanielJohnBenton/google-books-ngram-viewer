/*
	Example link:
	https://books.google.com/ngrams/graph?content=a%2Cb%2Cc&year_start=1800&year_end=2000&corpus=15&smoothing=3&share=&direct_url=t1%3B%2Ca%3B%2Cc0%3B.t1%3B%2Cb%3B%2Cc0%3B.t1%3B%2Cc%3B%2Cc0
	
	Note - case INsensitivity is either "on" or absent:
	https://books.google.com/ngrams/graph?content=a%2Cb%2Cc&case_insensitive=on&year_start=1800&year_end=2000&corpus=15&smoothing=3&share=&direct_url=t4%3B%2Ca%3B%2Cc0%3B%2Cs0%3B%3Ba%3B%2Cc0%3B%3BA%3B%2Cc0%3B.t4%3B%2Cb%3B%2Cc0%3B%2Cs0%3B%3BB%3B%2Cc0%3B%3Bb%3B%2Cc0%3B.t4%3B%2Cc%3B%2Cc0%3B%2Cs0%3B%3BC%3B%2Cc0%3B%3Bc%3B%2Cc0
*/
function copyGenerateFileNameFromUrl(tabUrl)
{
	var url = new URL(tabUrl);
	var searchParams = new URLSearchParams(url.search);
	
	var content = searchParams.get("content");
	var year_start = searchParams.get("year_start");
	var year_end = searchParams.get("year_end");
	var corpus = searchParams.get("corpus");
	var smoothing = searchParams.get("smoothing");
	
	var case_insensitive = "off";
	if(searchParams.has("case_insensitive") && searchParams.get("case_insensitive") == "on")
	{
		case_insensitive = "on";
	}
	
	// the content chars won't always be safe for a filename. This can be edited manually but some might have some standard replacements suggested here
	var replaceChars = {
		"_": "[UNDERSCORE]",
		"*": "[ASTERISK]"
	};
	var saferContent = "";
	var contentChars = content.split("");
	for(var i = 0, n = contentChars.length; i < n; i++)
	{
		if(typeof(replaceChars[contentChars[i]]) !== "undefined")
		{
			saferContent += replaceChars[contentChars[i]] +" ";
		}
		else
		{
			saferContent += contentChars[i];
		}
	}
	
	// best to join by comma as this will always be escaped in the content itself and is filename-friendly
	// url encoding remains at this point for the sake of being more likely to be filename-friendly while retaining information; will decode in Python https://docs.python.org/3/library/urllib.parse.html#urllib.parse.unquote
	var fileName = [encodeURIComponent(saferContent), case_insensitive, year_start, year_end, corpus, smoothing].join(",");
	
	// https://stackoverflow.com/a/18455088
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = fileName;
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
	   copyGenerateFileNameFromUrl(tab.url);
	}
);