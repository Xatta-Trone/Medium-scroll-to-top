/** @format */

/* Medium-scroll-to-top extension.
   Author: Xatta-Trone (https://github.com/Xatta-Trone)
   It was annoying & time consuming for me to scroll to top repetitively. Therefore, this extension was born.
*/

const ignoreURLs = [
  // "/me/lists",
  // "/me/lists/saved",
  // "/me/list/highlights",
  // "/me/lists/reading-history",
  // "/me/stories/public",
  // "/me/stories/responses",
  // "/me/stories/drafts",
  // "/me/stats",
  // "/me/settings",
  // "/me/following",
  // "/me/settings",
  // "/me/settings/publishing",
  // "/me/settings/notifications",
  // "/me/settings/membership",
  // "/me/settings/security",
  // "/me/notifications",
  // "/plans",
  // "/mastodon",
  // "/verified-authors",
  // "/partner-program",
  // "/gift-plans",
  // "/new-story",
  // "/m/signin",
];

function init() {
  // console.log("checking medium");
  checkIfItIsMediumBlog();
}

init();

// if it is a medium blog then run the script
function checkIfItIsMediumBlog() {
  console.log("it is medium");
  const e = /https?:\/\/cdn-(?:static|client)(?:-\d)?\.medium\.com\//;

  if (
    [...document.querySelectorAll("script")].filter((r) => e.test(r.src))
      .length > 0 ||
    e.test(window.location.hostname)
  ) {
    // console.log("Is a medium blog !", handleURLChange());
    addScrollToTopBtn();
  } else {
    // console.log("Not a medium blog :( ");
  }
}

function addScrollToTopBtn() {
  // check if btn already exists
  const el = document.getElementById("medium-scroll-to-top");

  if (el != undefined || el != null) {
    return;
  }

  // check if it is a page
  const root = document.getElementById("root");
  root.style.position = "relative";

  // add smooth scroll behavior
  const html = document.querySelector("html");
  html.setAttribute("style", "scroll-behavior:smooth;");

  // create btn element
  btn = document.createElement("div");
  btn.id = "medium-scroll-to-top";
  btn.innerHTML = `<span title="Scroll to top" style='font-size:2rem;background:#242424;padding:5px 10px;border-radius:0.5rem;'>&#11205;</span>`;
  btn.setAttribute(
    "style",
    `display: none;
  position: fixed;
  bottom: 20px;
  right: 50px;
  z-index: 99;
  outline: none;
  color: white;
  cursor: pointer;
  `
  );

  btn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  root.appendChild(btn);

  // When the user scrolls down 40% of screen height from the top of the document, show the button
  window.onscroll = function () {
    const offset = screen.height * 0.4;
    if (
      document.body.scrollTop > offset ||
      document.documentElement.scrollTop > offset
    ) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
}
