(()=>{"use strict";var __webpack_modules__={818:()=>{eval('\n;// ./data/actions.json\nconst actions_namespaceObject = /*#__PURE__*/JSON.parse(\'[{"id":"gbk","name":"Go Back","description":"Go back to the previous webpage","code":"window.history.back()"},{"id":"gfd","name":"Go Forward","description":"Go back to the previous webpage","code":"window.history.forward()"},{"id":"stt","name":"Scroll to Top","description":"Scroll to the top of the webpage","code":"window.scrollTo({ top: 0, behavior: \\\'smooth\\\' })"},{"id":"stb","name":"Scroll to Bottom","description":"Scroll to the bottom of the webpage","code":"window.scrollTo({ top: document.body.scrollHeight, behavior: \\\'smooth\\\' })"},{"id":"lnt","name":"Link in New Tab","description":"Open a link in a new tab","code":"window.open(params.url, \\\'_blank\\\')","params":["url"]},{"id":"tep","name":"Translate Page","description":"Translate the current webpage with service of your choice","code":"window.open(`https://translate.google.com/translate?sl=auto&tl=${params.language}&u=${encodeURIComponent(window.location.href)}`, \\\'_blank\\\')","params":["translator"]},{"id":"rlp","name":"Reload Page","description":"Reload the current webpage","code":"location.reload()"},{"id":"curl","name":"Copy URL","description":"Copy the current webpage URL to the clipboard","code":"navigator.clipboard.writeText(window.location.href)"},{"id":"cct","name":"Close Tab","description":"Close the current tab","code":"window.close()"},{"id":"ppg","name":"Print Page","description":"Print the current webpage","code":"window.print()"},{"id":"tfs","name":"Toggle Fullscreen","description":"Toggle fullscreen mode for the webpage","code":"document.documentElement.requestFullscreen()"},{"id":"cds","name":"Clear Data","description":"Clear the local storage/cookie of the webpage","code":"localStorage.clear();document.cookie = \\\'\\\'"},{"id":"atf","name":"Add to Favorites","description":"Add the current webpage to favorites/bookmarks","code":"window.external.AddFavorite(location.href, document.title)"}]\');\n;// ../node_modules/a11y-dialog/dist/a11y-dialog.esm.js\nconst not = {\n  inert: \':not([inert]):not([inert] *)\',\n  negTabIndex: \':not([tabindex^="-"])\',\n  disabled: \':not(:disabled)\',\n};\n\nvar focusableSelectors = [\n  `a[href]${not.inert}${not.negTabIndex}`,\n  `area[href]${not.inert}${not.negTabIndex}`,\n  `input:not([type="hidden"]):not([type="radio"])${not.inert}${not.negTabIndex}${not.disabled}`,\n  `input[type="radio"]${not.inert}${not.negTabIndex}${not.disabled}`,\n  `select${not.inert}${not.negTabIndex}${not.disabled}`,\n  `textarea${not.inert}${not.negTabIndex}${not.disabled}`,\n  `button${not.inert}${not.negTabIndex}${not.disabled}`,\n  `details${not.inert} > summary:first-of-type${not.negTabIndex}`,\n  // Discard until Firefox supports `:has()`\n  // See: https://github.com/KittyGiraudel/focusable-selectors/issues/12\n  // `details:not(:has(> summary))${not.inert}${not.negTabIndex}`,\n  `iframe${not.inert}${not.negTabIndex}`,\n  `audio[controls]${not.inert}${not.negTabIndex}`,\n  `video[controls]${not.inert}${not.negTabIndex}`,\n  `[contenteditable]${not.inert}${not.negTabIndex}`,\n  `[tabindex]${not.inert}${not.negTabIndex}`,\n];\n\n/**\n * Set the focus to the first element with `autofocus` with the element or the\n * element itself.\n */\nfunction a11y_dialog_esm_focus(el) {\n    (el.querySelector(\'[autofocus]\') || el).focus();\n}\n/**\n * Get the first and last focusable elements within a given element.\n */\nfunction getFocusableEdges(el) {\n    // Check for a focusable element within the subtree of the given element.\n    const firstEl = findFocusableEl(el, true);\n    // Only if we find the first element do we need to look for the last one. If\n    // there’s no last element, we set `lastEl` as a reference to `firstEl` so\n    // that the returned array is still always of length 2.\n    const lastEl = firstEl ? findFocusableEl(el, false) || firstEl : null;\n    return [firstEl, lastEl];\n}\n/**\n * Find the first focusable element inside the given element if `forward` is\n * truthy or the last focusable element otherwise.\n */\nfunction findFocusableEl(el, forward) {\n    // If we’re walking forward, check if this element is focusable, and return it\n    // immediately if it is.\n    if (forward && isFocusable(el))\n        return el;\n    // We should only search the subtree of this element if it can have focusable\n    // children.\n    if (canHaveFocusableChildren(el)) {\n        // Start walking the DOM tree, looking for focusable elements.\n        // Case 1: If this element has a shadow root, search it recursively.\n        if (el.shadowRoot) {\n            // Descend into this subtree.\n            let next = getNextChildEl(el.shadowRoot, forward);\n            // Traverse the siblings, searching the subtree of each one for focusable\n            // elements.\n            while (next) {\n                const focusableEl = findFocusableEl(next, forward);\n                if (focusableEl)\n                    return focusableEl;\n                next = getNextSiblingEl(next, forward);\n            }\n        }\n        // Case 2: If this element is a slot for a Custom Element, search its\n        // assigned elements recursively.\n        else if (el.localName === \'slot\') {\n            const assignedElements = el.assignedElements({\n                flatten: true,\n            });\n            if (!forward)\n                assignedElements.reverse();\n            for (const assignedElement of assignedElements) {\n                const focusableEl = findFocusableEl(assignedElement, forward);\n                if (focusableEl)\n                    return focusableEl;\n            }\n        }\n        // Case 3: this is a regular Light DOM element. Search its subtree.\n        else {\n            // Descend into this subtree.\n            let next = getNextChildEl(el, forward);\n            // Traverse siblings, searching the subtree of each one\n            // for focusable elements.\n            while (next) {\n                const focusableEl = findFocusableEl(next, forward);\n                if (focusableEl)\n                    return focusableEl;\n                next = getNextSiblingEl(next, forward);\n            }\n        }\n    }\n    // If we’re walking backward, we want to check the element’s entire subtree\n    // before checking the element itself. If this element is focusable, return\n    // it.\n    if (!forward && isFocusable(el))\n        return el;\n    return null;\n}\nfunction getNextChildEl(el, forward) {\n    return forward ? el.firstElementChild : el.lastElementChild;\n}\nfunction getNextSiblingEl(el, forward) {\n    return forward ? el.nextElementSibling : el.previousElementSibling;\n}\n/**\n * Determine if an element is hidden from the user.\n */\nconst isHidden = (el) => {\n    // Browsers hide all non-<summary> descendants of closed <details> elements\n    // from user interaction, but those non-<summary> elements may still match our\n    // focusable-selectors and may still have dimensions, so we need a special\n    // case to ignore them.\n    if (el.matches(\'details:not([open]) *\') &&\n        !el.matches(\'details>summary:first-of-type\'))\n        return true;\n    // If this element has no painted dimensions, it\'s hidden.\n    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);\n};\n/**\n * Determine if an element is focusable and has user-visible painted dimensions.\n */\nconst isFocusable = (el) => {\n    // A shadow host that delegates focus will never directly receive focus,\n    // even with `tabindex=0`. Consider our <fancy-button> custom element, which\n    // delegates focus to its shadow button:\n    //\n    // <fancy-button tabindex="0">\n    //  #shadow-root\n    //  <button><slot></slot></button>\n    // </fancy-button>\n    //\n    // The browser acts as as if there is only one focusable element – the shadow\n    // button. Our library should behave the same way.\n    if (el.shadowRoot?.delegatesFocus)\n        return false;\n    return el.matches(focusableSelectors.join(\',\')) && !isHidden(el);\n};\n/**\n * Determine if an element can have focusable children. Useful for bailing out\n * early when walking the DOM tree.\n * @example\n * This div is inert, so none of its children can be focused, even though they\n * meet our criteria for what is focusable. Once we check the div, we can skip\n * the rest of the subtree.\n * ```html\n * <div inert>\n *   <button>Button</button>\n *   <a href="#">Link</a>\n * </div>\n * ```\n */\nfunction canHaveFocusableChildren(el) {\n    // The browser will never send focus into a Shadow DOM if the host element\n    // has a negative tabindex. This applies to both slotted Light DOM Shadow DOM\n    // children\n    if (el.shadowRoot && el.getAttribute(\'tabindex\') === \'-1\')\n        return false;\n    // Elemments matching this selector are either hidden entirely from the user,\n    // or are visible but unavailable for interaction. Their descentants can never\n    // receive focus.\n    return !el.matches(\':disabled,[hidden],[inert]\');\n}\n/**\n * Get the active element, accounting for Shadow DOM subtrees.\n * @author Cory LaViska\n * @see: https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/\n */\nfunction getActiveEl(root = document) {\n    const activeEl = root.activeElement;\n    if (!activeEl)\n        return null;\n    // If there’s a shadow root, recursively find the active element within it.\n    // If the recursive call returns null, return the active element\n    // of the top-level Document.\n    if (activeEl.shadowRoot)\n        return getActiveEl(activeEl.shadowRoot) || document.activeElement;\n    // If not, we can just return the active element\n    return activeEl;\n}\n/**\n * Trap the focus inside the given element\n */\nfunction trapTabKey(el, event) {\n    const [firstFocusableEl, lastFocusableEl] = getFocusableEdges(el);\n    // If there are no focusable children in the dialog, prevent the user from\n    // tabbing out of it\n    if (!firstFocusableEl)\n        return event.preventDefault();\n    const activeEl = getActiveEl();\n    // If the SHIFT key is pressed while tabbing (moving backwards) and the\n    // currently focused item is the first one, move the focus to the last\n    // focusable item from the dialog element\n    if (event.shiftKey && activeEl === firstFocusableEl) {\n        // @ts-ignore: we know that `lastFocusableEl` is not null here\n        lastFocusableEl.focus();\n        event.preventDefault();\n    }\n    // If the SHIFT key is not pressed (moving forwards) and the currently focused\n    // item is the last one, move the focus to the first focusable item from the\n    // dialog element\n    else if (!event.shiftKey && activeEl === lastFocusableEl) {\n        firstFocusableEl.focus();\n        event.preventDefault();\n    }\n}\n/**\n * Find the closest element to the given element matching the given selector,\n * accounting for Shadow DOM subtrees.\n * @author Louis St-Amour\n * @see: https://stackoverflow.com/a/56105394\n */\nfunction closest(selector, base) {\n    function from(el) {\n        if (!el || el === document || el === window)\n            return null;\n        if (el.assignedSlot)\n            el = el.assignedSlot;\n        return (el.closest(selector) ||\n            from(el.getRootNode().host));\n    }\n    return from(base);\n}\n\nconst SCOPE = \'data-a11y-dialog\';\nclass A11yDialog {\n    $el;\n    id;\n    previouslyFocused;\n    shown;\n    constructor(element) {\n        this.$el = element;\n        this.id = this.$el.getAttribute(SCOPE) || this.$el.id;\n        this.previouslyFocused = null;\n        this.shown = false;\n        this.maintainFocus = this.maintainFocus.bind(this);\n        this.bindKeypress = this.bindKeypress.bind(this);\n        this.handleTriggerClicks = this.handleTriggerClicks.bind(this);\n        this.show = this.show.bind(this);\n        this.hide = this.hide.bind(this);\n        this.$el.setAttribute(\'aria-hidden\', \'true\');\n        this.$el.setAttribute(\'aria-modal\', \'true\');\n        this.$el.setAttribute(\'tabindex\', \'-1\');\n        if (!this.$el.hasAttribute(\'role\')) {\n            this.$el.setAttribute(\'role\', \'dialog\');\n        }\n        document.addEventListener(\'click\', this.handleTriggerClicks, true);\n    }\n    /**\n     * Destroy the current instance (after making sure the dialog has been hidden)\n     * and remove all associated listeners from dialog openers and closers\n     */\n    destroy() {\n        // Dispatch a `destroy` event\n        const destroyEvent = this.fire(\'destroy\');\n        // If the event was prevented, do not continue with the normal behavior\n        if (destroyEvent.defaultPrevented)\n            return this;\n        // Hide the dialog to avoid destroying an open instance\n        this.hide();\n        // Remove the click event delegates for our openers and closers\n        document.removeEventListener(\'click\', this.handleTriggerClicks, true);\n        // Clone and replace the dialog element to prevent memory leaks caused by\n        // event listeners that the author might not have cleaned up.\n        this.$el.replaceWith(this.$el.cloneNode(true));\n        return this;\n    }\n    /**\n     * Show the dialog element, trap the current focus within it, listen for some\n     * specific key presses and fire all registered callbacks for `show` event\n     */\n    show(event) {\n        // If the dialog is already open, abort\n        if (this.shown)\n            return this;\n        // Dispatch a `show` event\n        const showEvent = this.fire(\'show\', event);\n        // If the event was prevented, do not continue with the normal behavior\n        if (showEvent.defaultPrevented)\n            return this;\n        // Keep a reference to the currently focused element to be able to restore\n        // it later\n        this.shown = true;\n        this.$el.removeAttribute(\'aria-hidden\');\n        this.previouslyFocused = getActiveEl();\n        // Due to a long lasting bug in Safari, clicking an interactive element\n        // (like a <button>) does *not* move the focus to that element, which means\n        // `document.activeElement` is whatever element is currently focused (like\n        // an <input>), or the <body> element otherwise. We can work around that\n        // problem by checking whether the focused element is the <body>, and if it,\n        // store the click event target.\n        // See: https://bugs.webkit.org/show_bug.cgi?id=22261\n        if (this.previouslyFocused?.tagName === \'BODY\' && event?.target) {\n            this.previouslyFocused = event.target;\n        }\n        // Set the focus to the dialog element\n        // See: https://github.com/KittyGiraudel/a11y-dialog/pull/583\n        if (event?.type === \'focus\') {\n            this.maintainFocus(event);\n        }\n        else {\n            a11y_dialog_esm_focus(this.$el);\n        }\n        // Bind a focus event listener to the body element to make sure the focus\n        // stays trapped inside the dialog while open, and start listening for some\n        // specific key presses (TAB and ESC)\n        document.body.addEventListener(\'focus\', this.maintainFocus, true);\n        this.$el.addEventListener(\'keydown\', this.bindKeypress, true);\n        return this;\n    }\n    /**\n     * Hide the dialog element, restore the focus to the previously active\n     * element, stop listening for some specific key presses and fire all\n     * registered callbacks for `hide` event\n     */\n    hide(event) {\n        // If the dialog is already closed, abort\n        if (!this.shown)\n            return this;\n        // Dispatch a `hide` event\n        const hideEvent = this.fire(\'hide\', event);\n        // If the event was prevented, do not continue with the normal behavior\n        if (hideEvent.defaultPrevented)\n            return this;\n        this.shown = false;\n        this.$el.setAttribute(\'aria-hidden\', \'true\');\n        // Ensure the previously focused element (if any) has a `focus` method\n        // before attempting to call it to account for SVG elements\n        // See: https://github.com/KittyGiraudel/a11y-dialog/issues/108\n        this.previouslyFocused?.focus?.();\n        // Remove the focus event listener to the body element and stop listening\n        // for specific key presses\n        document.body.removeEventListener(\'focus\', this.maintainFocus, true);\n        this.$el.removeEventListener(\'keydown\', this.bindKeypress, true);\n        return this;\n    }\n    /**\n     * Register a new callback for the given event type\n     */\n    on(type, handler, options) {\n        this.$el.addEventListener(type, handler, options);\n        return this;\n    }\n    /**\n     * Unregister an existing callback for the given event type\n     */\n    off(type, handler, options) {\n        this.$el.removeEventListener(type, handler, options);\n        return this;\n    }\n    /**\n     * Dispatch and return a custom event from the DOM element associated with\n     * this dialog; this allows authors to listen for and respond to the events\n     * in their own code\n     */\n    fire(type, event) {\n        const customEvent = new CustomEvent(type, {\n            detail: event,\n            cancelable: true,\n        });\n        this.$el.dispatchEvent(customEvent);\n        return customEvent;\n    }\n    /**\n     * Add a delegated event listener for when elememts that open or close the\n     * dialog are clicked, and call `show` or `hide`, respectively\n     */\n    handleTriggerClicks(event) {\n        // We need to retrieve the click target while accounting for Shadow DOM.\n        // When within a web component, `event.target` is the shadow root (e.g.\n        // `<my-dialog>`), so we need to use `event.composedPath()` to get the click\n        // target\n        // See: https://github.com/KittyGiraudel/a11y-dialog/issues/582\n        const target = event.composedPath()[0];\n        const opener = closest(`[${SCOPE}-show="${this.id}"]`, target);\n        const explicitCloser = closest(`[${SCOPE}-hide="${this.id}"]`, target);\n        const implicitCloser = closest(`[${SCOPE}-hide]`, target) &&\n            closest(\'[aria-modal="true"]\', target) === this.$el;\n        // We use `closest(..)` (instead of `matches(..)`) so that clicking an\n        // element nested within a dialog opener does cause the dialog to open, and\n        // we use our custom `closest(..)` function so that it can cross shadow\n        // boundaries\n        // See: https://github.com/KittyGiraudel/a11y-dialog/issues/712\n        if (opener)\n            this.show(event);\n        if (explicitCloser || implicitCloser)\n            this.hide(event);\n    }\n    /**\n     * Private event handler used when listening to some specific key presses\n     * (namely ESC and TAB)\n     */\n    bindKeypress(event) {\n        // This is an escape hatch in case there are nested open dialogs, so that\n        // only the top most dialog gets interacted with (`closest` is basically\n        // `Element.prototype.closest()` accounting for Shadow DOM subtrees)\n        if (closest(\'[aria-modal="true"]\', getActiveEl()) !== this.$el) {\n            return;\n        }\n        let hasOpenPopover = false;\n        try {\n            hasOpenPopover = !!this.$el.querySelector(\'[popover]:not([popover="manual"]):popover-open\');\n        }\n        catch {\n            // Run that DOM query in a try/catch because not all browsers support the\n            // `:popover-open` selector, which would cause the whole expression to\n            // fail\n            // See: https://caniuse.com/mdn-css_selectors_popover-open\n            // See: https://github.com/KittyGiraudel/a11y-dialog/pull/578#discussion_r1343215149\n        }\n        // If the dialog is shown and the ESC key is pressed, prevent any further\n        // effects from the ESC key and hide the dialog, unless:\n        // - its role is `alertdialog`, which means it should be modal\n        // - or it contains an open popover, in which case ESC should close it\n        if (event.key === \'Escape\' &&\n            this.$el.getAttribute(\'role\') !== \'alertdialog\' &&\n            !hasOpenPopover) {\n            event.preventDefault();\n            this.hide(event);\n        }\n        // If the dialog is shown and the TAB key is pressed, make sure the focus\n        // stays trapped within the dialog element\n        if (event.key === \'Tab\') {\n            trapTabKey(this.$el, event);\n        }\n    }\n    /**\n     * If the dialog is shown and the focus is not within a dialog element (either\n     * this one or another one in case of nested dialogs) or attribute, move it\n     * back to the dialog container\n     * See: https://github.com/KittyGiraudel/a11y-dialog/issues/177\n     */\n    maintainFocus(event) {\n        const target = event.target;\n        if (!target.closest(`[aria-modal="true"], [${SCOPE}-ignore-focus-trap]`)) {\n            a11y_dialog_esm_focus(this.$el);\n        }\n    }\n}\n\nfunction instantiateDialogs() {\n    for (const el of document.querySelectorAll(\'[data-a11y-dialog]\')) {\n        new A11yDialog(el);\n    }\n}\nif (typeof document !== \'undefined\') {\n    if (document.readyState === \'loading\') {\n        document.addEventListener(\'DOMContentLoaded\', instantiateDialogs);\n    }\n    else {\n        instantiateDialogs();\n    }\n}\n\n\n\n;// ./js/components/navbar.js\nfunction navbar() {\n  var t = this;\n  t.n = document.querySelector(\'nav\');\n  t.close = function () {\n    document.body.style.overflow = \'auto\';\n    t.n.classList.remove(\'active\');\n  };\n  t.open = function () {\n    document.body.style.overflow = \'hidden\';\n    t.n.classList.add(\'active\');\n  };\n  if (t.n) {\n    document.querySelector(\'nav>button\').addEventListener(\'click\', () => {\n      console.log(\'toggleNav\');\n      if (t.n.classList.contains(\'active\')) t.close();else t.open();\n    });\n    document.querySelector(\'nav>.nav-overlay\').addEventListener(\'click\', () => {\n      t.close();\n    });\n    document.querySelectorAll(\'nav ul > a\').forEach(n => n.addEventListener(\'click\', () => {\n      t.close();\n    }));\n  }\n}\n;// ./js/components/themeManager.js\nfunction themeManager() {\n  //Theme Switcher\n  var toggles = document.getElementsByClassName(\'theme-toggle\');\n  if (window.CSS && CSS.supports(\'color\', \'var(--bg)\') && toggles) {\n    var storedTheme = localStorage.getItem(\'theme\') || (window.matchMedia(\'(prefers-color-scheme: dark)\').matches ? \'dark\' : \'light\');\n    if (storedTheme) document.documentElement.setAttribute(\'data-theme\', storedTheme);\n    for (var i = 0; i < toggles.length; i++) {\n      toggles[i].onclick = function () {\n        var currentTheme = document.documentElement.getAttribute(\'data-theme\');\n        var targetTheme = \'light\';\n        if (currentTheme === \'light\') {\n          targetTheme = \'dark\';\n        }\n        document.documentElement.setAttribute(\'data-theme\', targetTheme);\n        localStorage.setItem(\'theme\', targetTheme);\n      };\n    }\n  }\n}\n;// ./js/components/gotop.js\nfunction gotop() {\n  var el = this;\n  el.gt = document.getElementById(\'gt-link\');\n  el.scrollToTop = function () {\n    window.scroll({\n      top: 0,\n      left: 0,\n      behavior: \'smooth\'\n    });\n  };\n  el.listeners = function () {\n    window.addEventListener(\'scroll\', () => {\n      let y = window.scrollY;\n      if (y > 0) {\n        el.gt.classList.remove(\'hidden\');\n      } else {\n        el.gt.classList.add(\'hidden\');\n      }\n    });\n    el.gt.onclick = function (e) {\n      e.preventDefault();\n      if (document.documentElement.scrollTop || document.body.scrollTop > 0) {\n        el.scrollToTop();\n      }\n    };\n  };\n  if (el.gt) {\n    el.listeners();\n  }\n}\n;// ./js/components/aos.js\nfunction aos() {\n  //Get and observe all the items with the item class\n  let items = document.querySelectorAll(\'[class*=_aos]\');\n  //Only Use the IntersectionObserver if it is supported and _aos elements exist\n  if (IntersectionObserver && items) {\n    //When the element is visible on the viewport,\n    //add the _aos-done class so it creates the _aos animation.\n    let callback = function (entries) {\n      entries.forEach(entry => {\n        //if the element is visible, add the _aos-done class\n        if (entry.isIntersecting && !entry.target.classList.contains(\'_aos-done\')) {\n          entry.target.classList.add(\'_aos-done\');\n        } else {\n          //else the element do reverse animation\n          entry.target.classList.remove(\'_aos-done\');\n        }\n      });\n    };\n    //Create the observer\n    let observer = new IntersectionObserver(callback, {\n      root: null,\n      threshold: 0\n    });\n    //Add each _aos element to the observer\n    items.forEach(item => {\n      observer.observe(item);\n    });\n  }\n}\n;// ./js/components/snackbar.js\nfunction Snackbar(option) {\n  const t = this;\n  t.snack = document.createElement(\'div\');\n  t.snack.className = \'snackbar\';\n  t.message = document.createElement(\'div\');\n  t.snack.appendChild(t.message);\n  document.body.appendChild(t.snack);\n  t.top = option.topPos;\n  t.classNames = option.classNames;\n  t.autoClose = typeof option.autoClose === \'boolean\' ? option.autoClose : false;\n  t.autoCloseTimeout = option.autoClose && typeof option.autoCloseTimeout === \'number\' ? option.autoCloseTimeout : 3000;\n\n  //Methods\n  t.reset = function () {\n    t.message.innerHTML = \'\';\n    t.snack.classList.remove(t.classNames);\n  };\n  t.show = function (msg, type) {\n    t.hide();\n    t.message.innerHTML = msg;\n    t.snack.style.top = t.top;\n    t.snack.classList.add(type || t.classNames);\n    if (t.autoClose) {\n      setTimeout(function () {\n        t.hide();\n      }, t.autoCloseTimeout);\n    }\n  };\n  t.hide = function () {\n    t.snack.style.top = \'-100%\';\n    t.reset();\n  };\n}\n;// ./js/userscripts.js\n\n\n\n\n\n\n\n\nvar snackbar = new Snackbar({\n  topPos: \'10px\',\n  classNames: \'success\',\n  autoClose: true,\n  autoCloseTimeout: 2000\n});\nfunction fixURL(value) {\n  if (value.indexOf(\'https://\') < 0 && value.indexOf(\'http://\') < 0) return \'https://\' + value;\n  return value;\n}\n\n// Call the function when the DOM is loaded\ndocument.addEventListener(\'DOMContentLoaded\', () => {\n  const dialog_support = new A11yDialog(document.querySelector(\'#dlg_support\'));\n  dialog_support.on(\'show\', () => document.documentElement.style.overflowY = \'hidden\');\n  dialog_support.on(\'hide\', () => document.documentElement.style.overflowY = \'\');\n  new themeManager();\n  new navbar();\n  new gotop();\n  new aos();\n\n  // Retrieve all input fields\n  const inputFields = document.querySelectorAll(\'.param-i\');\n  var codes = {};\n  for (let key in actions_namespaceObject) {\n    let value = actions_namespaceObject[key];\n    codes[value.id] = value.code;\n  }\n  // Add event listener to each input field\n  inputFields.forEach(input => {\n    input.addEventListener(\'input\', () => {\n      updateCode(input);\n    });\n  });\n  function updateCode(t) {\n    console.log(t.value);\n    const id = t.id.split(\'_\')[0];\n    // Get the input values for the parameters\n    var code_to_replace = codes[id];\n    var value = t.value;\n    console.log(code_to_replace);\n    // Construct the regular expression pattern dynamically\n    const pattern = new RegExp(`params.${t.id.split(\'_\')[1]}`, \'g\');\n    if (t.id.split(\'_\')[1] == \'url\') value = fixURL(value);\n    // Replace the pattern in the code snippet with the input value\n    const updatedCodeSnippet = code_to_replace.replace(pattern, t.value);\n    console.log(updatedCodeSnippet);\n\n    // Update the preview code element\n    const previewCode = document.getElementById(\'previewCode_\' + id);\n    if (previewCode) {\n      previewCode.textContent = updatedCodeSnippet;\n    }\n    Prism.highlightAll();\n  }\n});\n\n//# sourceURL=webpack:///./js/userscripts.js_+_7_modules?')}},__webpack_exports__={};__webpack_modules__[818]()})();