function updateTable(links) {
  const table = document.getElementById("linkTable");
  // Clear existing rows except the header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  links.forEach((link) => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = link.groupName;
    cell2.textContent = link.link;
  });
}

function saveAsCSV() {
  chrome.runtime.sendMessage({ action: "getLinks" }, (links) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Group Name,Link\n" +
      links.map((link) => `"${link.groupName}","${link.link}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "whatsapp_groups.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

document.getElementById("saveCSV").addEventListener("click", saveAsCSV);

chrome.runtime.sendMessage({ action: "getLinks" }, updateTable);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateLinks") {
    updateTable(request.links);
  }
});
