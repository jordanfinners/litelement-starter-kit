const customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
  if (!customElements.get(name)) {
    customElementsDefine.call(window.customElements, name, cl, conf);
  }
};
