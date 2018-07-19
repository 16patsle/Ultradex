const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

const linkifyHref = str => {
  return fixedEncodeURIComponent(str.replace(new RegExp(" ", "g"), "_"));
};

module.exports = {
  linkifyHref,
  linkify: (href, linkText) => {
    return `<a class="link" href="https://bulbapedia.bulbagarden.net/wiki/${linkifyHref(
      href
    )}" target="_blank" rel="noopener">${linkText}</a>`;
  }
};
