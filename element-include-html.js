customElements.define(
  "include-html",
  class extends HTMLElement {
    async connectedCallback(
      // declare load method as sync so await can be used
      // call with parameter to *replace* SVG (of <load-file> persists)
      src = this.getAttribute("src"),

      // attach a shadowRoot if none exists (prevents displaying error when moving Nodes)
      root = this.getAttribute("shadow")
        ? this.shadowRoot || this.attachShadow({ mode: "open" })
        : this
    ) {

      // load file from src="" async, parse to text, add to shadowRoot.innerHTML
      root.innerHTML = await (await fetch(src)).text();

      // append optional <tag [shadowRoot]> Elements from inside <include-html> after loaded src
      root.append(...this.querySelectorAll("[shadowRoot]"));

      // if "replaceWith" attribute
      // then replace <load-svg> with loaded content <load-svg>
      // childNodes instead of children to include #textNodes also
      this.hasAttribute("replaceWith") && this.replaceWith(...root.childNodes);
    }

  }
);
