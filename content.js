function extractWhatsAppLinks() {
  const regex = /https:\/\/chat\.whatsapp\.com\/[^"<\s]+/g;
  const pageContent = document.body.innerHTML;
  const newLinks = pageContent.match(regex) || [];

  if (newLinks.length > 0) {
    chrome.runtime.sendMessage({ action: "verifyLinks", links: newLinks });
  }
}

setInterval(extractWhatsAppLinks, 1000);

const observer = new MutationObserver(extractWhatsAppLinks);
observer.observe(document.body, { childList: true, subtree: true });
