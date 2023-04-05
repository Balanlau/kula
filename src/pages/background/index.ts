import { backgroundLog } from "../../logs";

backgroundLog();

// =========================== //
// Sidebar Background Script
// =========================== //

const toggleSidebar = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "open-sidebar" });
    }
  });
};

export const initSidebarListeners = () => {
  chrome.commands.onCommand.addListener(function (command) {
    if (command === "open-sidebar") {
      toggleSidebar();
    }
  });

  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.action === "close-sidebar") {
      toggleSidebar();
    }
    sendResponse({ action: "close-sidebar" });
  });
};

initSidebarListeners();
