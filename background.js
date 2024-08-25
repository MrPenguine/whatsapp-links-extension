let verifiedLinks = new Map();
let fullPageTabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in background script:", request);

  if (request.action === "verifyLinks") {
    verifyLinks(request.links);
    sendResponse({ status: "Verification started" });
  } else if (request.action === "getLinks") {
    sendResponse(Array.from(verifiedLinks.values()));
  } else if (request.action === "openFullPage") {
    openFullPageTab();
  }

  return true;
});

async function verifyLinks(links) {
  console.log("Verifying links:", links);

  for (const link of links) {
    if (!verifiedLinks.has(link)) {
      try {
        const response = await fetch(link);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const element = doc.querySelector("h3._9vd5._9scr");
        if (element && element.textContent.trim()) {
          const groupName = element.textContent.trim();
          verifiedLinks.set(link, { groupName, link });
          console.log("New verified link:", { groupName, link });
          updateAllViews();
        }
      } catch (error) {
        console.error("Error verifying link:", error);
      }
    }
  }
}

function updateAllViews() {
  const links = Array.from(verifiedLinks.values());
  chrome.runtime.sendMessage({ action: "updateLinks", links: links });
  if (fullPageTabId) {
    chrome.tabs.sendMessage(fullPageTabId, {
      action: "updateLinks",
      links: links,
    });
  }
}

function openFullPageTab() {
  chrome.tabs.create({ url: "fullpage.html" }, (tab) => {
    fullPageTabId = tab.id;
  });
}
