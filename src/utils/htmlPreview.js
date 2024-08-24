export const fetchResource = url => fetch(url).then(res => res.text());

export const importHtmls = async html => {
  const template = document.createElement('div');
  template.innerHTML = html;
  const scripts = template.querySelectorAll('script');
  const getExternalScripts = () => {
    return Promise.all(
      Array.from(scripts).map(script => {
        const src = script.getAttribute('src');
        if (!src) {
          return Promise.resolve(script.innerHTML);
        } else {
          return fetchResource(src);
        }
      })
    );
  };
  async function execScripts() {
    let scripts = await getExternalScripts();
    const module = { exports: {} };
    const exports = module.exports;
    scripts.forEach(script => {
      // eval(script);
      setTimeout(script, 0);
    });
    return module.exports;
  }

  return { template, getExternalScripts, execScripts };
};
