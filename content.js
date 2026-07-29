console.log("Bullshit Blocker Running");

const blockedChannels = new Set(
  globalThis.blockedChannels.map(handle =>
    handle.trim().replace(/^@/, "").toLowerCase()
  )
);

const videoContainerSelector = [
  "ytd-video-renderer",
  "ytd-grid-video-renderer",
  "ytd-compact-video-renderer",
  "ytd-rich-item-renderer",
  "ytd-reel-item-renderer",
  "ytd-playlist-video-renderer",
  "yt-lockup-view-model"
].join(",");

function getChannelIdentifier(href) {
  if (!href) return null;

  try {
    const url = new URL(href, location.origin);
    const match = url.pathname.match(/^\/@([^/]+)/i);

    return match
      ? decodeURIComponent(match[1]).toLowerCase()
      : null;
  } catch {
    return null;
  }
}

function checkContainer(container) {
  if (!(container instanceof Element)) return;

  const channelLinks = container.matches('a[href*="/@"]')
    ? [container]
    : container.querySelectorAll('a[href*="/@"]');

  for (const link of channelLinks) {
    const id = getChannelIdentifier(link.getAttribute("href"));

    if (id && blockedChannels.has(id)) {
      console.log("Blocking channel:", id);

      const videoContainer = link.closest(videoContainerSelector);

      if (videoContainer) {
        videoContainer.remove();
      }

      return;
    }
  }
}

function blockSearchResults(root = document) {
  if (!(root instanceof Document || root instanceof Element)) {
    return;
  }

  // Handle the root itself if it is a video container.
  if (root instanceof Element && root.matches(videoContainerSelector)) {
    checkContainer(root);
  }

  // Handle video containers inside the root.
  root.querySelectorAll(videoContainerSelector).forEach(checkContainer);
}

// Scan content already on the page.
blockSearchResults();

// Watch for newly loaded content.
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if (addedNode instanceof Element) {
        blockSearchResults(addedNode);
      }
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});