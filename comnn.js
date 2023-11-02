const NUM_LETTERS_TO_KEEP = 40;

const changeText = (name) => {
  const allText = window[name].innerHTML;

  // replace text urls with formatted anchor tags
  const pattern = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  let fixedText = allText;

  // replace square brackets w/ item div
  fixedText = fixedText.replace(/(\[)([\s\S]+?)(\])/g, (match, p1, p2) => {
    return `<div class='item'><div>${p2.trim()}</div></div>`;
  });

  fixedText = fixedText.replace(pattern, (url) => {
    // make matches prettier
    let shortUrl = url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "");
    if (shortUrl.endsWith("/")) shortUrl = shortUrl.slice(0, -1);
    return `<a href="${url}" target="_blank">${
      shortUrl.length > NUM_LETTERS_TO_KEEP
        ? ".." + shortUrl.slice(-NUM_LETTERS_TO_KEEP)
        : shortUrl
    }</a>`;
  });

  // replace stuff inside () with styling span
  fixedText = fixedText.replace(
    /(\()([\s\S]*?)(\))/g,
    '<span class="comment">$2</span>'
  );

  // replace stuff inside {} with styling span
  fixedText = fixedText.replace(
    /(\{)([\s\S]*?)(\})/g,
    '<span class="highlight">$2</span>'
  );

  // update html
  window[name].innerHTML = fixedText;
};

// simplest filter
const myFilter = () => {
  const defaultItemDisplay = "grid";
  const defaultContainerDisplay = "flex";

  filter = window.myFilter.value.trim().toUpperCase();
  containers = document.getElementsByClassName("container");

  for (const container of containers) {
    container.style.display = "none";
    title = container.previousElementSibling;
    title.classList.add("minime");

    const titleMatch = title.innerHTML.toUpperCase().indexOf(filter) != -1;

    // for each container div check match with title, otherwise items
    for (const item of container.childNodes) {
      const itemMatch = item.innerHTML?.toUpperCase().indexOf(filter) != -1;

      if (item.innerHTML) {
        if (titleMatch || itemMatch) {
          container.style.display = defaultContainerDisplay;
          title.classList.remove("minime");
          item.style.display = defaultItemDisplay;
        } else {
          item.style.display = "none";
        }
      }
    }
  }
};

const resetFiltersOnTitleClick = () => {
  const resetItems = [
    ...document.getElementsByTagName("h3"),
    ...document.getElementsByTagName("sub")
  ];

  for (const item of resetItems) {
    item.onclick = () => {
      window.myFilter.value = "";
      myFilter();
      item.scrollIntoView({ block: "center" });
    };
  }
};

window.onload = () => {
  // apply replacing function to following id
  changeText("main");
  changeText("other");

  resetFiltersOnTitleClick();
};
