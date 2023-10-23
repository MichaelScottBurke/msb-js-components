class HubHeader extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this)); // Create the ResizeObserver
  }
  get containerId() {
    return this.getAttribute('container-id');
  }

  get gridSize() {
    return this.getAttribute("grid-size");
  }

  get icon() {
    return this.getAttribute("icon");
  }

  get title() {
    return this.getAttribute("title");
  }

  get subtitle() {
    return this.getAttribute("subtitle");
  }

  set containerId(val) {
    this.setAttribute('container-id', val);
  }

  set gridSize(val) {
    this.setAttribute("grid-size", val);
  }

  set icon(val) {
    this.setAttribute("icon", val);
  }

  set title(val) {
    this.setAttribute("title", val);
  }

  set subtitle(val) {
    this.setAttribute("subtitle", val);
  }

  static get observedAttributes() {
    return ["grid-size", "icon", "title", "subtitle"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "grid-size" || prop === "icon" || prop === "title" || prop === "subtitle") {
      this.render();
    }
  }

  connectedCallback() {
    // Add the ResizeObserver to monitor the size of the element
    this.resizeObserver.observe(this);
    this.render();
  }

  disconnectedCallback() {
    // Disconnect the ResizeObserver when the element is removed
    this.resizeObserver.disconnect();
  }

  handleResize(entries) {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;

      // Use width and height to adjust as needed
      console.log(`Width: ${width}px, Height: ${height}px`);
      this.changeHubHeaderStyles();
    }
  }

  changeHubHeaderStyles() {
    const hubHeader = this.shadow.querySelector(".ukg-hub-header"); // Use shadow DOM to query the element
    let containerWidth = this.offsetWidth;
    if (containerWidth < 1366) {
      hubHeader.className = 'ukg-hub-header', 'icon-indented';
    } else if (containerWidth >= 1366) {
      hubHeader.className = 'ukg-hub-header', 'icon-outdented';
    }
    else {
      hubHeader.className = 'ukg-hub-header';
    }
  }

  render() {
    // Render your component content based on attributes
    this.shadow.innerHTML = `
    <style>
:host {
  --ukg_sys_color_surface_light: #fff;
  --icon-size: 112px;
  --ukg_ref_spacing_56: 3.5rem;
  --ukg_ref_spacing_40: 2.5rem;
  --ukg_ref_spacing_32: 2rem;
  --ukg_ref_spacing_16: 1rem;
  --ukg_sys_color_text_highEmphasis_onLight: rgba(0, 0, 0, 0.87);
  --ukg_sys_color_border_midEmphasis_onLight: rgba(0, 0, 0, 0.15);
  --icon-margin: var(--ukg_ref_spacing_16);
  --icon-total-spacing: calc(var(--icon-size) + var(--icon-margin));
  --icon-total-spacing-negative: calc(var(--icon-total-spacing) * -1);
  }

  .ukg-hub-header {
    box-sizing: border-box;
    background-color: var(--ukg_sys_color_surface_light);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--ukg_sys_color_border_midEmphasis_onLight);
    display: flex;
    flex-direction: column;
    
  }
  
  /* mimic grid margins */
  @media screen and (max-width: 599px) {
    .ukg-hub-header {
      padding-left: var(--ukg_ref_spacing_16);
      padding-right: var(--ukg_ref_spacing_16);
    }
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    .ukg-hub-header {
      padding-left: var(--ukg_ref_spacing_32);
      padding-right: var(--ukg_ref_spacing_32);
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .ukg-hub-header {
      padding-left: var(--ukg_ref_spacing_40);
      padding-right: var(--ukg_ref_spacing_40);
    }
  }
  @media screen and (min-width: 1024px) {
    .ukg-hub-header {
      padding-left: var(--ukg_ref_spacing_56);
      padding-right: var(--ukg_ref_spacing_56);
    }
  }
  .ukg-header-content-container {
  margin: var(--ukg_ref_spacing_16) auto;
  flex: 1 1 100%;
  width: 100%;
}

/* mimic grid functionality */
.ukg-hub-header[grid-size="960"] .ukg-header-content-container,
.ukg-hub-header[grid-size="default"] .ukg-header-content-container,
.ukg-hub-header[grid-size=""] .ukg-header-content-container {
  max-width: 960px;
}
.ukg-hub-header[grid-size="1280"] .ukg-header-content-container,
.ukg-hub-header[grid-size="large-width"] .ukg-header-content-container {
  max-width: 1280px;
}

.ukg-header-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.ukg-header-icon-container {
  order: 0;
  align-self: auto;
  flex: 0 0 var(--icon-size);
  margin-right: var(--ukg_ref_spacing_16);
}

.ukg-header-icon {
  height: var(--icon-size);
  width: var(--icon-size);
}

.ukg-header-text-container {
  order: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  flex: 1 1 auto;
  min-height: var(--icon-size);
}
.ukg-header-text {
  flex: 1 1 auto;
  align-self: center;
  margin-right: 1rem;
}

.ukg-header-title {
  /* ukg_sys_text_display_sm_onLight is stubbed in here */
  line-height: 2.5rem;
  font-family: Volte Rounded, sans-serif;
  color: var(--ukg_sys_color_text_highEmphasis_onLight);
  margin-bottom: 1rem;
  margin-top: 0;
  font-weight: 500;
  letter-spacing: -0.0125em;
  font-size: 2rem;
  /* needed for header-title */
  margin: 0;
}

.ukg-header-subtitle {
  margin: 0;
}

.ukg-header-slot-end {
  order: 0;
  flex: 1 1 auto;
  align-self: center;
  display: flex;
  justify-content: flex-end;
}
.ukg-header-slot-bottom {
  margin-left: var(--icon-total-spacing);
}

/* responsive illustrative icon changes */
/*  0 - 359 :if screen less than 360px don't show illustrative icon */
    @media screen and (max-width: 359px) {
    .ukg-header-icon-container, .ukg-header-icon {
      display: none;
    }
    .ukg-header-text-container {
      order: 0;
      width: 100%;
    }
    
    .ukg-header-slot-end {
      width: 100%;
      justify-content: flex-start;
    }
    .ukg-header-slot-bottom {
          margin-left: 0;
    }
  }
    
    /* 0 - 599 : if screen <=599 illustrative icon is aligned right (flex order 1) */
@media screen and (max-width: 599px) {
  .ukg-header-icon-container {
    order: 1;
    margin-left: var(--ukg_ref_spacing_16);
    margin-right: 0;
  }

  .ukg-header-text-container {
    order: 0;
    align-self: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .ukg-header-text {
    margin-right: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 0;
  }

  /* wrap end slot */
  .ukg-header-slot-end {
    flex: 1 0 100%;
    order: 2;
    align-self: flex-start;
    justify-content: flex-start;
    align-items: 
    width: 100%;
    background: purple;
  }
  .ukg-header-slot-bottom {
  margin-left: 0
}
}
/* 600 - 1365 : show illustrative icon aligned with main content, header title/subtitle and bottom slot indented size of icon + margin */
@media screen and (min-width: 600px) and (max-width: 1365px) {
  .ukg-header-icon-container {
    order: 0;
    margin-left: 0;
    margin-right: var(--ukg_ref_spacing_16);
  }
  .ukg-header-slot-bottom {
    margin-left: var(--icon-total-spacing);
  }
}
/* 1366+ : bottom slot content still indented */
@media screen and (min-with: 1366px) {
  .ukg-header-slot-bottom {
    margin-left: var(--icon-total-spacing);
  }
}

/* 1366+ javascript will change class if side nav drawer closed and hub header width is >= 1366px || :  nav drawer opened and hub header width is >= 1640px, illustrative icon is outdented */
.ukg-hub-header.icon-outdented .ukg-header-icon-container {
  order: 0;
  margin-left: var(--icon-total-spacing-negative);
  margin-right: var(--ukg_ref_spacing_16);
}
@media screen and (min-with: 1366px) {
  .ukg-hub-header.icon-outdented .ukg-header-slot-bottom {
    margin-left: var(--icon-total-spacing);
  }
}


/* and if nav opened when hub-header (container) is 1366 - 1639px javascript will change class and  illustrative icon aligned with main content, header title/subtitle and bottom slot indented size of icon + margin */
.ukg-hub-header.icon-indented .ukg-header-icon-container {
  order: 0;
  margin-left: 0;
  margin-right: var(--ukg_ref_spacing_16);
}
@media screen and (min-with: 1366px) {
  .ukg-hub-header.icon-indented .ukg-header-slot-bottom {
    margin-left: var(--icon-total-spacing);
  }
}
</style>
  <div class="ukg-hub-header" grid-size="${this.gridSize}">
  <div class="ukg-header-content-container">
    <div class="ukg-header-content">
      <div class="ukg-header-icon-container">
        <img class="ukg-header-icon" src="${this.icon}">
      </div>
      <div class="ukg-header-text-container">
        <div class="ukg-header-text">
          <h1 class="ukg-header-title ukg_sys_text_display_sm_onLight">${this.title}</h1>
          <p class="ukg-header-subtitle">${this.subtitle}</p>
        </div>
      </div>
      <div class="ukg-header-slot-end">
        <slot name="end"></slot>
      </div>
    </div>
    <div class="ukg-header-slot-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
  <ukg-divider has-margin="false"></ukg-divider>
</div>
    `;
  }
};
// Attaching the event listener function to window's resize event
window.addEventListener("resize", (event) => {
  const hubHeader = document.querySelector("hub-header");
  if (hubHeader) {
    hubHeader.changeHubHeaderStyles();
  }
});

customElements.define("hub-header", HubHeader);
