console.log("Bullshit Blocker Running");

// List of blocked channels: add the channel handle (without '@') in lowercase.
const blockedChannels = 
[
    "drjamestour",
    "justxashton",
    "sabinehossenfelder", 
    "subboorahmadabbasi",
    "thunderboltsproject",
    "prageru",
    "hasanabi",
    "cc4561",
    "amessengeroftruth",
    "discoveryinstitute",
    "therealansweringmachine",
    "mattpowellofficial",
    "tesla", "spacex",
    "bruhvideoproduction",
    "willspencerpod",
    "undecidedmf",
    "neonadejo",
    "answersingenesis",
    "kevinthechristian",
    "joerogan",
    "testifyapologetics",
    "hoodmystic",
    "daverightnow",
    "apostoliczoomer",
    "thereactionarychristian",
    "realcandaceO",
    "pbdpodcast",
    "dedunking",
    "restoredcog",
    "TheDrDerek",

    //Media
    "skynewsaustralia"
];

// Extracts the channel handle from a URL that uses the new format.
function getChannelIdentifier(url) {
  const urlString = String(url); // Ensure the URL is a string.
  if (urlString.includes("/@")) {
    const parts = urlString.split("/@");
    if (parts[1]) {
      // Extract only the handle part (ignoring any additional path segments)
      return parts[1].split('/')[0].toLowerCase();
    }
  }
  return null;
}

function blockSearchResults()
{
  const links = document.querySelectorAll('a[href*="/@"]');
  links.forEach(link => 
  {
    const href = String(link.getAttribute('href'));
    const id = getChannelIdentifier(href);
    if (id)
    {
      if (blockedChannels.includes(id))
      {
        const videoContainer = link.closest('ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer');
  
        if (videoContainer)
          videoContainer.remove();
      }
    }
  });

}

// Run the blocking code when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => 
{
  setInterval(() => {
      blockSearchResults();
  }, 1000);
});
