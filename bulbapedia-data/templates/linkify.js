const linkifyHref = str => {
  return str.replace(new RegExp(" ", "g"), "_");
};

module.exports = {
  linkifyHref,
  linkify: (href, linkText) => {
    return `<a class="link" href="https://bulbapedia.bulbagarden.net/wiki/${linkifyHref(
      href
    )}" target="_blank" rel="noopener">${linkText}</a>`;
  }
};
