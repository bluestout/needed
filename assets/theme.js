window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

    /**
     * For use when focus shifts to a container rather than a link
     * eg for In-page links, after scroll, focus shifts to content area so that
     * next `tab` is where user expects if focusing a link, just $link.focus();
     *
     * @param {JQuery} $element - The element to be acted upon
     */
    pageLinkFocus: function($element) {
        var focusClass = 'js-focus-hidden';

        $element.first()
            .attr('tabIndex', '-1')
            .focus()
            .addClass(focusClass)
            .one('blur', callback);

        function callback() {
            $element.first()
                .removeClass(focusClass)
                .removeAttr('tabindex');
        }
    },

    /**
     * If there's a hash in the url, focus the appropriate element
     */
    focusHash: function() {
        var hash = window.location.hash;

        // is there a hash in the url? is it an element on the page?
        if (hash && document.getElementById(hash.slice(1))) {
            this.pageLinkFocus($(hash));
        }
    },

    /**
     * When an in-page (url w/hash) link is clicked, focus the appropriate element
     */
    bindInPageLinks: function() {
        $('a[href*=#]').on('click', function(evt) {
            this.pageLinkFocus($(evt.currentTarget.hash));
        }.bind(this));
    },

    /**
     * Traps the focus in a particular container
     *
     * @param {object} options - Options to be used
     * @param {jQuery} options.$container - Container to trap focus within
     * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
     * @param {string} options.namespace - Namespace used for new focus event handler
     */
    trapFocus: function(options) {
        var eventName = options.namespace ?
            'focusin.' + options.namespace :
            'focusin';

        if (!options.$elementToFocus) {
            options.$elementToFocus = options.$container;
        }

        options.$container.attr('tabindex', '-1');
        options.$elementToFocus.focus();

        $(document).on(eventName, function(evt) {
            if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
                options.$container.focus();
            }
        });
    },

    /**
     * Removes the trap of focus in a particular container
     *
     * @param {object} options - Options to be used
     * @param {jQuery} options.$container - Container to trap focus within
     * @param {string} options.namespace - Namespace used for new focus event handler
     */
    removeTrapFocus: function(options) {
        var eventName = options.namespace ?
            'focusin.' + options.namespace :
            'focusin';

        if (options.$container && options.$container.length) {
            options.$container.removeAttr('tabindex');
        }

        $(document).off(eventName);
    }
};

/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {

    /**
     * Browser cookies are required to use the cart. This function checks if
     * cookies are enabled in the browser.
     */
    cookiesEnabled: function() {
        var cookieEnabled = navigator.cookieEnabled;

        if (!cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
        }
        return cookieEnabled;
    }
};

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

    /**
     * Return an object from an array of objects that matches the provided key and value
     *
     * @param {array} array - Array of objects
     * @param {string} key - Key to match the value against
     * @param {string} value - Value to get match of
     */
    findInstance: function(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
    },

    /**
     * Remove an object from an array of objects by matching the provided key and value
     *
     * @param {array} array - Array of objects
     * @param {string} key - Key to match the value against
     * @param {string} value - Value to get match of
     */
    removeInstance: function(array, key, value) {
        var i = array.length;
        while (i--) {
            if (array[i][key] === value) {
                array.splice(i, 1);
                break;
            }
        }

        return array;
    },

    /**
     * _.compact from lodash
     * Remove empty/false items from array
     * Source: https://github.com/lodash/lodash/blob/master/compact.js
     *
     * @param {array} array
     */
    compact: function(array) {
        var index = -1;
        var length = array == null ? 0 : array.length;
        var resIndex = 0;
        var result = [];

        while (++index < length) {
            var value = array[index];
            if (value) {
                result[resIndex++] = value;
            }
        }
        return result;
    },

    /**
     * _.defaultTo from lodash
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
     *
     * @param {*} value - Value to check
     * @param {*} defaultValue - Default value
     * @returns {*} - Returns the resolved value
     */
    defaultTo: function(value, defaultValue) {
        return (value == null || value !== value) ? defaultValue : value
    }
};

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap iframes and tables in div tags to force responsive/scrollable layout.
 *
 * @namespace rte
 */

slate.rte = {
    /**
     * Wrap tables in a container div to make them scrollable when needed
     *
     * @param {object} options - Options to be used
     * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
     * @param {string} options.tableWrapperClass - table wrapper class name
     */
    wrapTable: function(options) {
        var tableWrapperClass = typeof options.tableWrapperClass === "undefined" ? '' : options.tableWrapperClass;

        options.$tables.wrap('<div class="' + tableWrapperClass + '"></div>');
    },

    /**
     * Wrap iframes in a container div to make them responsive
     *
     * @param {object} options - Options to be used
     * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
     * @param {string} options.iframeWrapperClass - class name used on the wrapping div
     */
    wrapIframe: function(options) {
        var iframeWrapperClass = typeof options.iframeWrapperClass === "undefined" ? '' : options.iframeWrapperClass;

        options.$iframes.each(function() {
            // Add wrapper to make video responsive
            $(this).wrap('<div class="' + iframeWrapperClass + '"></div>');

            // Re-set the src attribute on each iframe after page load
            // for Chrome's "incorrect iFrame content on 'back'" bug.
            // https://code.google.com/p/chromium/issues/detail?id=395791
            // Need to specifically target video and admin bar
            this.src = this.src;
        });
    }
};

slate.Sections = function Sections() {
    this.constructors = {};
    this.instances = [];

    $(document)
        .on('shopify:section:load', this._onSectionLoad.bind(this))
        .on('shopify:section:unload', this._onSectionUnload.bind(this))
        .on('shopify:section:select', this._onSelect.bind(this))
        .on('shopify:section:deselect', this._onDeselect.bind(this))
        .on('shopify:section:reorder', this._onReorder.bind(this))
        .on('shopify:block:select', this._onBlockSelect.bind(this))
        .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
    _createInstance: function(container, constructor) {
        var $container = $(container);
        var id = $container.attr('data-section-id');
        var type = $container.attr('data-section-type');

        constructor = constructor || this.constructors[type];

        if (typeof constructor === 'undefined') {
            return;
        }

        var instance = $.extend(new constructor(container), {
            id: id,
            type: type,
            container: container
        });

        this.instances.push(instance);
    },

    _onSectionLoad: function(evt) {
        var container = $('[data-section-id]', evt.target)[0];
        if (container) {
            this._createInstance(container);
        }
    },

    _onSectionUnload: function(evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (!instance) {
            return;
        }

        if (typeof instance.onUnload === 'function') {
            instance.onUnload(evt);
        }

        this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
    },

    _onSelect: function(evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onSelect === 'function') {
            instance.onSelect(evt);
        }
    },

    _onDeselect: function(evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onDeselect === 'function') {
            instance.onDeselect(evt);
        }
    },

    _onReorder: function(evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onReorder === 'function') {
            instance.onReorder(evt);
        }
    },

    _onBlockSelect: function(evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onBlockSelect === 'function') {
            instance.onBlockSelect(evt);
        }
    },

    _onBlockDeselect: function(evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onBlockDeselect === 'function') {
            instance.onBlockDeselect(evt);
        }
    },

    register: function(type, constructor) {
        this.constructors[type] = constructor;

        $('[data-section-type=' + type + ']').each(function(index, container) {
            this._createInstance(container, constructor);
        }.bind(this));
    }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function() {
    var moneyFormat = '${{amount}}';

    /**
     * Format money values based on your shop currency settings
     * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
     * or 3.00 dollars
     * @param  {String} format - shop money_format setting
     * @return {String} value - formatted value
     */
    function formatMoney(cents, format) {
        if (typeof cents === 'string') {
            cents = cents.replace('.', '');
        }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = (format || moneyFormat);

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = slate.utils.defaultTo(precision, 2);
            thousands = slate.utils.defaultTo(thousands, ',');
            decimal = slate.utils.defaultTo(decimal, '.');

            if (isNaN(number) || number == null) {
                return 0;
            }

            number = (number / 100.0).toFixed(precision);

            var parts = number.split('.');
            var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
            var centsAmount = parts[1] ? (decimal + parts[1]) : '';

            return dollarsAmount + centsAmount;
        }

        switch (formatString.match(placeholderRegex)[1]) {
            case 'amount':
                value = formatWithDelimiters(cents, 2);
                break;
            case 'amount_no_decimals':
                value = formatWithDelimiters(cents, 0);
                break;
            case 'amount_with_comma_separator':
                value = formatWithDelimiters(cents, 2, '.', ',');
                break;
            case 'amount_no_decimals_with_comma_separator':
                value = formatWithDelimiters(cents, 0, '.', ',');
                break;
            case 'amount_without_trailing_zeros':
                value = formatWithDelimiters(cents, cents % 100 === 0 ? 0 : 2, '.', ',');
                break;
        }

        return formatString.replace(placeholderRegex, value);
    }

    return {
        formatMoney: formatMoney
    };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function() {

    /**
     * Preloads an image in memory and uses the browsers cache to store it until needed.
     *
     * @param {Array} images - A list of image urls
     * @param {String} size - A shopify image size attribute
     */

    function preload(images, size) {
        if (typeof images === 'string') {
            images = [images];
        }

        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            this.loadImage(this.getSizedImageUrl(image, size));
        }
    }

    /**
     * Loads and caches an image in the browsers cache.
     * @param {string} path - An image url
     */
    function loadImage(path) {
        new Image().src = path;
    }

    /**
     * Find the Shopify image attribute size
     *
     * @param {string} src
     * @returns {null}
     */
    function imageSize(src) {
        var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    /**
     * Adds a Shopify size attribute to a URL
     *
     * @param src
     * @param size
     * @returns {*}
     */
    function getSizedImageUrl(src, size) {
        if (size === null) {
            return src;
        }

        if (size === 'master') {
            return this.removeProtocol(src);
        }

        var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

        if (match) {
            var prefix = src.split(match[0]);
            var suffix = match[0];

            return this.removeProtocol(prefix[0] + '_' + size + suffix);
        } else {
            return null;
        }
    }

    function removeProtocol(path) {
        return path.replace(/http(s)?:/, '');
    }

    return {
        preload: preload,
        loadImage: loadImage,
        imageSize: imageSize,
        getSizedImageUrl: getSizedImageUrl,
        removeProtocol: removeProtocol
    };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {

    /**
     * Variant constructor
     *
     * @param {object} options - Settings from `product.js`
     */
    function Variants(options) {
        this.$container = options.$container;
        this.product = options.product;
        this.singleOptionSelector = options.singleOptionSelector;
        this.originalSelectorId = options.originalSelectorId;
        this.enableHistoryState = options.enableHistoryState;
        this.currentVariant = this._getVariantFromOptions();

        $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
    }

    Variants.prototype = $.extend({}, Variants.prototype, {

        /**
         * Get the currently selected options from add-to-cart form. Works with all
         * form input elements.
         *
         * @return {array} options - Values of currently selected variants
         */
        _getCurrentOptions: function() {
            var currentOptions = $.map($(this.singleOptionSelector, this.$container), function(element) {
                var $element = $(element);
                var type = $element.attr('type');
                var currentOption = {};

                if (type === 'radio' || type === 'checkbox') {
                    if ($element[0].checked) {
                        currentOption.value = $element.val();
                        currentOption.index = $element.data('index');

                        return currentOption;
                    } else {
                        return false;
                    }
                } else {
                    currentOption.value = $element.val();
                    currentOption.index = $element.data('index');

                    return currentOption;
                }
            });

            // remove any unchecked input values if using radio buttons or checkboxes
            currentOptions = slate.utils.compact(currentOptions);

            return currentOptions;
        },

        /**
         * Find variant based on selected values.
         *
         * @param  {array} selectedValues - Values of variant inputs
         * @return {object || undefined} found - Variant object from product.variants
         */
        _getVariantFromOptions: function() {
            var selectedValues = this._getCurrentOptions();
            var variants = this.product.variants;
            var found = false;

            variants.forEach(function(variant) {
                var satisfied = true;

                selectedValues.forEach(function(option) {
                    if (satisfied) {
                        satisfied = (option.value === variant[option.index]);
                    }
                });

                if (satisfied) {
                    found = variant;
                }
            });

            return found || null;
        },

        /**
         * Event handler for when a variant input changes.
         */
        _onSelectChange: function() {
            var variant = this._getVariantFromOptions();

            this.$container.trigger({
                type: 'variantChange',
                variant: variant
            });

            if (!variant) {
                return;
            }

            this.currentVariant = variant;
            this._updateMasterSelect(variant);
            this._updateImages(variant);
            this._updatePrice(variant);

            if (this.enableHistoryState) {
                this._updateHistoryState(variant);
            }
        },

        /**
         * Trigger event when variant image changes
         *
         * @param  {object} variant - Currently selected variant
         * @return {event}  variantImageChange
         */
        _updateImages: function(variant) {
            var variantImage = variant.featured_image || {};
            var currentVariantImage = this.currentVariant.featured_image || {};

            if (!variant.featured_image) {
                return;
            }

            this.$container.trigger({
                type: 'variantImageChange',
                variant: variant
            });
        },

        /**
         * Trigger event when variant price changes.
         *
         * @param  {object} variant - Currently selected variant
         * @return {event} variantPriceChange
         */
        _updatePrice: function(variant) {
            if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
                return;
            }

            this.$container.trigger({
                type: 'variantPriceChange',
                variant: variant
            });
        },

        /**
         * Update history state for product deeplinking
         *
         * @param {object} variant - Currently selected variant
         */
        _updateHistoryState: function(variant) {
            if (!history.replaceState || !variant) {
                return;
            }

            function updateQueryString(key, value, url) {
                if (!url) url = window.location.href;
                var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
                    hash;

                if (re.test(url)) {
                    if (typeof value !== 'undefined' && value !== null)
                        return url.replace(re, '$1' + key + "=" + value + '$2$3');
                    else {
                        hash = url.split('#');
                        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                        if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                            url += '#' + hash[1];
                        return url;
                    }
                } else {
                    if (typeof value !== 'undefined' && value !== null) {
                        var separator = url.indexOf('?') !== -1 ? '&' : '?';
                        hash = url.split('#');
                        url = hash[0] + separator + key + '=' + value;
                        if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                            url += '#' + hash[1];
                        return url;
                    } else
                        return url;
                }
            }

            ///var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;

            var newurl = updateQueryString('variant', variant.id, window.location.href);
            window.history.replaceState({ path: newurl }, '', newurl);
        },

        /**
         * Update hidden master select of variant change
         *
         * @param {object} variant - Currently selected variant
         */
        _updateMasterSelect: function(variant) {
            $(this.originalSelectorId, this.$container)[0].value = variant.id;
        }
    });

    return Variants;
})();


/*================ Sections ================*/
/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

theme.Product = (function() {

    var selectors = {
        addToCart: '[data-add-to-cart]',
        addToCartText: '[data-add-to-cart-text]',
        comparePrice: '[data-compare-price]',
        comparePriceText: '[data-compare-text]',
        originalSelectorId: '[data-product-select]',
        priceWrapper: '[data-price-wrapper]',
        productFeaturedImage: '[data-product-featured-image]',
        productJson: '[data-product-json]',
        productPrice: '[data-product-price]',
        productThumbs: '[data-product-single-thumbnail]',
        singleOptionSelector: '[data-single-option-selector]',
        imageContainerSelector: '[data-images]',
        fixedFormSelector: '[data-fixed-form]',
        originalFormSelector: '[data-product-original-form]',
        thisIsFor: '[data-this-for]'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function Product(container) {
        this.$container = $(container);
        this.container = container;

        function getQueryParams(qs) {
            qs = qs.split('+').join(' ');

            var params = {},
                tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;

            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        }

        var query = getQueryParams(document.location.search);

        if (query.for) {
            $(selectors.thisIsFor).val(query.for);
        }

        // Stop parsing if we don't have the product json script tag when loading
        // section in the Theme Editor
        if (!$(selectors.productJson, this.$container).html()) {
            return;
        }

        var sectionId = this.$container.attr('data-section-id');
        this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());

        var options = {
            $container: this.$container,
            enableHistoryState: this.$container.data('enable-history-state') || false,
            singleOptionSelector: selectors.singleOptionSelector,
            originalSelectorId: selectors.originalSelectorId,
            product: this.productSingleObject
        };

        this.settings = {};
        this.namespace = '.product';
        this.variants = new slate.Variants(options);
        this.$featuredImage = $(selectors.productFeaturedImage, this.$container);

        this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
        this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));

        $(selectors.originalFormSelector, this.$container).on(
            'click',
            selectors.addToCart,
            this.onAddToCart.bind(this)
        )

        $(selectors.originalFormSelector, this.$container).on(
            'change',
            selectors.singleOptionSelector,
            this.onSingleSelectorChanged.bind(this)
        )

        this.initFixedForm()

        if (this.$featuredImage.length > 0) {
            this.settings.imageSize = slate.Image.imageSize(this.$featuredImage.attr('src'));
            slate.Image.preload(this.productSingleObject.images, this.settings.imageSize);

            this.imageContainer = this.container.querySelector(selectors.imageContainerSelector)

            if (this.imageContainer) {
                const imageURLs = this.productSingleObject.images
                    .map(x => slate.Image.getSizedImageUrl(x, this.settings.imageSize))
                    .filter(x => x != this.$featuredImage.attr('src'))

                for (const imageURL of imageURLs) {
                    this.imageContainer.insertAdjacentHTML('beforeend', `
            <img src="${imageURL}" alt="${this.productSingleObject.title}">
          `)
                }

                this.imageElements = this.imageContainer.querySelectorAll('img')
                this.imagesCycleInterval = this.cycleProductImages()
            }

            this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
        }
    }

    Product.prototype = $.extend({}, Product.prototype, {

        /**
         * Updates the DOM state of the add to cart button
         *
         * @param {boolean} enabled - Decides whether cart is enabled or disabled
         * @param {string} text - Updates the text notification content of the cart
         */
        updateAddToCartState: function(evt) {
            var variant = evt.variant;

            if (variant) {
                $(selectors.priceWrapper, this.$container).removeClass('hide');
            } else {
                $(selectors.addToCart, this.$container).prop('disabled', true);
                $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
                $(selectors.priceWrapper, this.$container).addClass('hide');
                return;
            }

            if (variant.available) {
                var isSubscribe = $(selectors.addToCart).attr('data-add-to-cart-subscribe');
                $(selectors.addToCart, this.$container).prop('disabled', false);

                if (isSubscribe) {
                    var isPerDay = $(selectors.addToCart).attr('data-price-per-day') == "true" ? true : false;

                    // theme.strings.subscribe
                    var unitType = $(selectors.addToCart).attr('data-subscribe-unit-type');
                    var frequency = $.parseJSON($(selectors.addToCart).attr('data-subscribe-frequency'));
                    var text = '';
                    var formattedPrice = slate.Currency.formatMoney(variant.price, variant.price % 100 === 0 ? '${{amount_without_trailing_zeros}}' : theme.moneyFormat);

                    if (isPerDay) {
                        if (unitType == 'Months' && frequency.includes(1)) {
                            text = `${theme.strings.subscribe} ${formattedPrice} / mo`;
                        } else {
                            switch (unitType) {
                                case "Months":
                                    {
                                        text = `${theme.strings.subscribe} ${formattedPrice} / ${frequency} mo`;
                                    }
                                    break;
                                case "Days":
                                    {
                                        var pricePerDay = variant.price / +frequency[0];
                                        formattedPrice = slate.Currency.formatMoney(pricePerDay, theme.moneyFormat);
                                        text = `${theme.strings.subscribe} ${formattedPrice} / day`;
                                    }
                                    break;
                                case "Weeks":
                                    {
                                        var pricePerDay = variant.price / (+frequency[0] * 7);
                                        formattedPrice = slate.Currency.formatMoney(pricePerDay, theme.moneyFormat);
                                        text = `${theme.strings.subscribe} ${formattedPrice} / day`;
                                    }
                                    break;
                                default:
                                    {
                                        text = `${theme.strings.subscribe} ${formattedPrice} / ${frequency} ${unitType}`;
                                    }
                            }
                        }
                    } else {
                        if (unitType == 'Months') {
                            if (frequency.includes(1)) {
                                text = `${theme.strings.subscribe} ${formattedPrice} / mo`;
                            } else {
                                text = `${theme.strings.subscribe} ${formattedPrice} / ${frequency} mo`;
                            }
                        } else {
                            text = `${theme.strings.subscribe} ${formattedPrice} / ${frequency} ${unitType}`;
                        }
                    }

                    $(selectors.addToCartText, this.$container).html(text);
                } else {
                    $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
                }
            } else {
                $(selectors.addToCart, this.$container).prop('disabled', true);
                $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
            }
        },

        /**
         * Updates the DOM with specified prices
         *
         * @param {string} productPrice - The current price of the product
         * @param {string} comparePrice - The original price of the product
         */
        updateProductPrices: function(evt) {
            var variant = evt.variant;
            var $comparePrice = $(selectors.comparePrice, this.$container);
            var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

            $(selectors.productPrice, this.$container)
                .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

            if (variant.compare_at_price > variant.price) {
                $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
                $compareEls.removeClass('hide');
            } else {
                $comparePrice.html('');
                $compareEls.addClass('hide');
            }
        },

        /**
         * Updates the DOM with the specified image URL
         *
         * @param {string} src - Image src URL
         */
        updateProductImage: function(evt) {
            const variant = evt.variant;
            const sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);

            if (this.imageElements) {
                for (const image of this.imageElements) {
                    if (image.getAttribute('src') == sizedImgUrl) {
                        image.classList.add('active')
                    } else {
                        image.classList.remove('active')
                    }
                }
            } else {
                this.$featuredImage.addClass('active').siblings().removeClass('active')
                this.$featuredImage.attr('src', sizedImgUrl);
            }
        },

        cycleProductImages: function() {
            const changeDuration = parseFloat(this.imageContainer.dataset.duration) * 1000 || 3000

            let interval, shouldChange = false

            const bindedChangeImageAction = changeActiveImage.bind(this)

            if (!Modernizr.touchevents) {
                this.imageContainer.addEventListener('mouseenter', e => {
                    if (shouldChange === false) {
                        shouldChange = setTimeout(() => {
                            bindedChangeImageAction()
                            shouldChange = false

                            interval = setInterval(() => {
                                bindedChangeImageAction()
                            }, changeDuration)
                        }, 500)
                    } else {
                        interval = setInterval(() => {
                            bindedChangeImageAction()
                        }, changeDuration)
                    }
                })

                this.imageContainer.addEventListener('mouseleave', e => {
                    clearTimeout(shouldChange)
                    clearInterval(interval)
                })
            } else {
                interval = setInterval(() => {
                    bindedChangeImageAction()
                }, changeDuration)
            }

            function changeActiveImage() {
                const currentImageIndex = [].slice.call(this.imageElements).findIndex(x => x.classList.contains('active'))

                const activeImage = this.imageElements[currentImageIndex]
                if (activeImage) {
                    activeImage.classList.remove('active')
                }

                const newImage = this.imageElements[(currentImageIndex + 1) % this.imageElements.length]
                if (newImage) {
                    newImage.classList.add('active')
                }
            }

            return interval
        },
        initFixedForm() {
            this.$originalForm = $(selectors.originalFormSelector, this.$container)
            this.originalFormEnd = this.$originalForm.offset().top + this.$originalForm.innerHeight()

            this.$fixedForm = $(selectors.fixedFormSelector, this.$container);
            this.isFixedFormShown = false

            window.addEventListener('resize', () => {
                this.originalFormEnd = this.$originalForm.offset().top + this.$originalForm.innerHeight()
            });

            window.addEventListener('scroll', () => {
                const scrollTop = $(window).scrollTop()

                if (scrollTop >= this.originalFormEnd && !this.isFixedFormShown) {
                    this.isFixedFormShown = true
                    this.$fixedForm.addClass('product-fixed-form--shown')
                } else if (scrollTop < this.originalFormEnd && this.isFixedFormShown) {
                    this.isFixedFormShown = false
                    this.$fixedForm.removeClass('product-fixed-form--shown')
                }
            })

            this.$fixedForm.on('click', selectors.addToCart, e => {
                this.$container.find(selectors.originalFormSelector + ' ' + selectors.addToCart).click();

                if (!this.variants.currentVariant) {
                    $('html, body').animate({
                        scrollTop: $(selectors.originalFormSelector).offset().top - 150
                    }, 800)
                }
            })
        },
        onAddToCart(e) {
            let isPrevented = false;

            for (const selector of this.$container.find(selectors.singleOptionSelector)) {
                if (!selector.value) {
                    selector.classList.add('select--error');
                    if (!isPrevented) {
                        e.preventDefault()
                        isPrevented = true
                    }
                }
            }
        },
        onSingleSelectorChanged(e) {
            e.target.classList.remove('select--error')
        },
        /**
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    setupTabs();

    function setupTabs() {
        $('.accordHeaderLinks a').click(function(e) {
            e.preventDefault();
            var $t = $(this),
                tab_item = $('.accordian .tab-item');
            $t.siblings().removeClass('active');
            $t.addClass('active');

            tab_item.removeClass('active').filter($t.attr('href')).addClass('active');
        });
    }

    return Product;
})();

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace levelBasedContent
 */

theme.LevelBasedContent = (function() {

    const selectors = {
        blocksContainer: '.js-blocks-container ',
        contentBlockSelector: '[data-content]',
        sliderSelector: '[data-slider]'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function LevelBasedContent(container) {
        this.container = container;

        if (window.productLevelsContent) {
            this.blocks = this.initContentBlocks(window.productLevelsContent);
        }

        this.contentBlocks = this.container.querySelectorAll(selectors.contentBlockSelector);
        this.sliderElement = this.container.querySelector(selectors.sliderSelector);

        let $contentBlocks = $(this.contentBlocks);

        // let maxHeight = null;
        //
        // $contentBlocks.each(function() {
        // 	let blockHeight = $(this).innerHeight();
        // 	if (blockHeight > maxHeight) {
        // 		maxHeight = blockHeight;
        // 	}
        // });
        //
        // $contentBlocks.css('height', maxHeight);
        //
        // $(window).resize(function() {
        // 	$contentBlocks.css('height', 'auto');
        //
        // 	let maxHeight = null;
        //
        // 	$contentBlocks.each(function() {
        // 		let blockHeight = $(this).innerHeight();
        //
        // 		if (blockHeight > maxHeight) {
        // 			maxHeight = blockHeight;
        // 		}
        // 	});
        //
        // 	$contentBlocks.css('height', maxHeight);
        // });

        const allPipsSettings = {
            mode: 'count',
            values: this.contentBlocks.length
        };

        if (this.sliderElement && this.contentBlocks.length >= 2) {
            this.slider = noUiSlider.create(this.sliderElement, {
                start: 0,
                range: {
                    'min': 0,
                    'max': this.contentBlocks.length - 1
                },
                cssPrefix: 'utd-',
                pips: this.container.dataset.showAllPips ? allPipsSettings : {
                    mode: 'range',
                    values: this.contentBlocks.length
                }
            });

            const rangePips = this.container.querySelectorAll('.utd-pips .utd-value');

            for (const rangePip of rangePips) {
                const currentPipData = this.blocks[+rangePip.innerHTML];

                if (currentPipData.level_link !== '&amp;nbsp' && currentPipData.level_link !== '&nbsp') {
                    rangePip.innerHTML = `<a target="_blank" href="${currentPipData.level_link}">${currentPipData.level_name}</a>`;
                } else {
                    rangePip.innerHTML = currentPipData.level_name;
                }
            }

            this.lastShownBlockId = 0;

            this.slider.on('update', (values, handle, unencoded, tap, positions) => {
                const closest = Math.floor(parseFloat(values[0]))

                if (closest == this.lastShownBlockId) return;

                let affectedBlockIds = Object.keys(this.blocks).map(x => +x);

                affectedBlockIds = affectedBlockIds.filter(x => x == closest);


                // if (closest > this.lastShownBlockId) {
                //     affectedBlockIds = affectedBlockIds.filter(x => x > this.lastShownBlockId && x <= closest)
                // } else if (closest < this.lastShownBlockId) {
                //     affectedBlockIds = affectedBlockIds.filter(x => x <= this.lastShownBlockId && x > closest)
                // }

                let pageHeightDiff = 0,
                    $blockElement;

                for (let id in this.blocks) {
                    this.blocks[id].element.classList.remove('shown')
                        // this.blocks[id].element.style.display = 'none'
                }

                for (const id of affectedBlockIds) {
                    $blockElement = $(this.blocks[id].element);
                    pageHeightDiff += $blockElement.innerHeight() + parseInt($blockElement.css('margin-top'));


                    // $blockElement.slideToggle(400, () => {
                    //     this.blocks[id].element.classList.toggle('shown');
                    // })

                    this.blocks[id].element.classList.toggle('shown');
                }

                if (closest < this.lastShownBlockId) {
                    pageHeightDiff *= -1
                }

                if (this.container.dataset.mobileScroll != 'false' && Modernizr.touchevents) {
                    window.scrollTo({
                        top: window.pageYOffset + pageHeightDiff,
                        behavior: 'smooth'
                    })
                } else if (this.container.dataset.desktopScroll != 'false' && !Modernizr.touchevents) {
                    window.scrollTo({
                        top: window.pageYOffset + pageHeightDiff,
                        behavior: 'smooth'
                    })
                }

                this.lastShownBlockId = closest
            })
        }

    }

    LevelBasedContent.prototype = $.extend({}, LevelBasedContent.prototype, {
        initContentBlocks(contentWithKeys) {
            let blocks = {};

            for (const field of contentWithKeys) {
                let fieldName = field[0].split('_');
                let blockId = +fieldName.pop() - 1;
                if (blockId in blocks) {
                    blocks[blockId][fieldName.join('_')] = field[1]
                } else {
                    blocks[blockId] = {
                        [fieldName.join('_')]: field[1]
                    }
                }
            }


            const blocksContainer = this.container.querySelector(selectors.blocksContainer)

            let contentBlockElement;

            if (blocksContainer) {
                for (const id in blocks) {
                    contentBlockElement = document.createElement('div');
                    contentBlockElement.dataset.content = blocks[id].level_name;
                    if (id == '0') {
                        contentBlockElement.className = 'shown'
                    }
                    contentBlockElement.innerHTML = blocks[id].content;

                    blocksContainer.insertAdjacentElement('beforeend', contentBlockElement);

                    blocks[id].element = contentBlockElement;
                }
            }

            return blocks;
        },
        /**
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return LevelBasedContent;
})();

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace ProductReferences
 */

theme.ProductReferences = (function() {

    const selectors = {
        blocksContainer: '.js-blocks-container',
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function ProductReferences(container) {
        this.container = container

        if (window.productReferences) {
            this.blocks = this.initContentBlocks(window.productReferences)
        }
    }

    ProductReferences.prototype = $.extend({}, ProductReferences.prototype, {
        initContentBlocks(contentWithKeys) {
            let blocks = {}

            for (const field of contentWithKeys) {
                let fieldName = field[0].split('_')
                let blockId = +fieldName.pop() - 1
                if (blockId in blocks) {
                    blocks[blockId][fieldName.join('_')] = field[1]
                } else {
                    blocks[blockId] = {
                        [fieldName.join('_')]: field[1]
                    }
                }
            }

            const blocksContainer = this.container.querySelector(selectors.blocksContainer)

            let contentBlockElement, block;

            if (blocksContainer) {
                for (const id in blocks) {
                    block = blocks[id]

                    contentBlockElement = document.createElement('div')
                    contentBlockElement.className = 'row reference'
                    contentBlockElement.innerHTML = `
                        <div class="col-12 col-lg-6 reference__image">
                            <div class="reference__image-wrapper">
                                <img src="${block.ref_image}" alt="${block.ref_title}">
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 reference__content">
                            <h2 class="reference__title">${block.ref_title}</h2>
                            <p class="reference__description">${block.ref_desc}</p>
                            <a href="${block.ref_url}" ${block.ref_blank == 'true' ? 'target="_blank"' : ''} class="reference__link" 
                                data-keyword
                            >
                                <span data-icon></span>
                                <span data-keyword-context>${block.ref_link}</span>
                            </a>
                        </div>
                    `

                    blocksContainer.insertAdjacentElement('beforeend', contentBlockElement)

                    blocks[id].element = contentBlockElement
                }
            }

            document.dispatchEvent(new CustomEvent('keyword:added'))

            return blocks
        },
        /** 
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return ProductReferences;
})();

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace ProductReviews
 */

theme.ProductReviews = (function() {

    const selectors = {
        sliderSelector: '[data-reviews-slider]',
        widgetSelector: '#stamped-main-widget',
        singleReviewSelector: '.stamped-review',
        reviewsListSelector: '.stamped-reviews'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function ProductReviews(container) {
        this.container = container
        this.widget = this.container.querySelector(selectors.widgetSelector)

        if (!this.widget) return this.container.classList.add('visually-hidden')

        if (this.checkReviewsInWidget()) {
            this.grabReviewsFromWidget(true)
        } else {
            this.widgetObserver = this.attachWidgetObserver(this.widget)
        }
    }

    ProductReviews.prototype = $.extend({}, ProductReviews.prototype, {
        attachWidgetObserver(target) {
            if (!target) return false

            console.log('appending observer');

            const observer = new MutationObserver(mList => {
                const m = mList.pop()

                console.log('has mutation on widget');

                if (this.checkReviewsInWidget()) {
                    this.grabReviewsFromWidget(true)
                }
            })

            observer.observe(target, {
                subtree: true,
                childList: true,
                attributes: true
            })

            return observer
        },
        checkReviewsInWidget() {
            const reviewsList = this.container.querySelector(selectors.reviewsListSelector)

            console.log('reviews list rendered');

            return reviewsList
        },
        grabReviewsFromWidget(changeSorting = false) {
            console.log('grabbing reviews');

            if (this.widgetObserver) {
                this.widgetObserver.disconnect()
            }

            const reviews = this.container.querySelectorAll(selectors.singleReviewSelector)

            const renderedReviews = [].slice.call(reviews)
                .map(x => this.parseReviewFromWidget(x, {
                    title: '.stamped-review-header-title',
                    content: '.stamped-review-content-body',
                    author: '.stamped-review-header .author',
                    image: '.stamped-review-image'
                }))
                .map(x => this.renderReviewMarkup(x))

            console.log(renderedReviews);

            const slider = this.container.querySelector(selectors.sliderSelector)

            if (!slider) return

            for (const review of renderedReviews) {
                slider.insertAdjacentHTML('beforeend', review)
            }

            this.initSlider(slider)
        },
        parseReviewFromWidget(reviewElement, properties) {
            let review = {},
                foundPart

            for (const key in properties) {
                foundPart = reviewElement.querySelector(properties[key])
                review[key] = foundPart ? foundPart.innerHTML : false
            }

            return review
        },
        renderReviewMarkup(review) {
            const { title, content, author } = review

            const $image = $(review.image).first()

            let image
            if ($image.length) {
                image = $image[0].href
            } else {
                image = this.container.dataset.placeholderImage
            }

            return `
                <div class="reviews__slide" data-type="{{ block.settings.review_type | strip | handle  }}">
                    <div class="review-card">
                        <div class="review-card__photo">
                            <img src="${image}" alt="Review image">
                        </div>

                        <div class="review-card__content">
                            <h3 class="review-card__title">${title}</h3>
                            <blockquote class="review-card__quote">${content}</blockquote>
                            <p class="review-card__author">${author}</p>
                        </div>
                    </div>
                </div>
            `

        },
        initSlider(sliderContainer) {
            $(sliderContainer).slick({
                centerMode: true,
                centerPadding: '230px',
                slidesToShow: 1,
                autoplay: false,
                arrows: false,
                dots: true,
                responsive: [{
                        breakpoint: 1300,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '140px',
                            autoplay: false,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '60px',
                            autoplay: false,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '30px',
                            autoplay: false,
                            dots: true
                        }
                    }
                ]
            });
        },
        /** 
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return ProductReviews;
})();

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace contactForm
 */

theme.ContactForm = (function() {

    const selectors = {
        selectSelector: '.select',
        messageInputSelector: '[data-message-input]',
        remainingCharsIndicatorSelector: '[data-remaining-chars]'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function ContactForm(container) {

        var form = $(container).parents('#contact_form');
        this.container = container;
        this.$container = $(container);

        $(this.$container).on('change', selectors.selectSelector, e => {
            $(e.target).attr('value', e.target.value)
        });

        $(this.$container).on('input', selectors.messageInputSelector, e => {
            const $indicator = $(e.target)
                .parents(selectors.messageInputSelector)
                .find(selectors.remainingCharsIndicatorSelector);

            $indicator.html(e.target.maxLength - (e.target.value || '').length)
        });

        $(this.$container).on('focus', '.input-prelabel', function() {
            $(this).addClass('focused');
        });

        $(this.$container).on('focusout', '.input-prelabel', function() {
            $(this).removeClass('focused');
        });

        form.on('submit', function(e) {
            let data = form.serializeArray();

            let first_name = 'Thanks';

            data.forEach(function(element) {
                if (element.name === 'contact[first_name]') {
                    first_name = element.value;
                }
            });

            sessionStorage.setItem('contact_first_name', first_name);
        });
    }

    ContactForm.prototype = $.extend({}, ContactForm.prototype, {

        /** 
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return ContactForm;
})();

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace contactSuccess
 */

theme.ContactSuccess = (function() {

    const selectors = {
        namePlaceholderSelector: '[data-name-placeholder]'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function ContactSuccess(container) {
        this.container = container

        const nameContainer = this.container.querySelector(selectors.namePlaceholderSelector)

        if (nameContainer && window.senderFirstName) {
            const regExp = new RegExp('%name%', 'gmi')
            console.log(regExp, regExp.test(nameContainer.innerHTML));
            nameContainer.innerHTML = nameContainer.innerHTML.replace(regExp, window.senderFirstName)
        }

        if ($('#contact-success-message').length > 0) {
            $('#contact-success-message').addClass('animated');
        }
    }

    ContactSuccess.prototype = $.extend({}, ContactSuccess.prototype, {

        /** 
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return ContactSuccess;
})();

/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace quizWidget
 */

theme.QuizWidget = (function() {

    const selectors = {
        quizSelector: '[data-quiz]'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function QuizWidget(container) {
        this.container = container

        // if ('quiz' in this.container.dataset) {
        //     this.parseUrlToOptions()
        // }

        // this.initWidget()
    }

    QuizWidget.prototype = $.extend({}, QuizWidget.prototype, {
        initWidget() {
            const embedElement = this.container

            if (!('quiz' in embedElement.dataset) ||
                !this.validateFormURL(embedElement.dataset.quiz)
            ) return false

            typeformEmbed.makeWidget(
                embedElement,
                embedElement.dataset.quiz, // URL to a typeform view
                {
                    hideHeaders: true,
                    hideFooter: true,
                    opacity: 75,
                    buttonText: "Take the survey!",
                    onSubmit: function() {
                        console.log('Typeform successfully submitted')
                    }
                }
            )
        },
        validateFormURL(url) {
            return /^http(s)?\:\/\/\w+\.typeform\.com\/to\/\w+$/.test(url)
        },
        parseUrlToOptions(url) {
            if (!this.validateFormURL(url)) return false;
        },
        /** 
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return QuizWidget;
})();

/*================ Templates ================*/
/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

theme.customerAddresses = (function() {
    var $newAddressForm = $('#AddressNewForm');

    if (!$newAddressForm.length) {
        return;
    }

    // Initialize observers on address selectors, defined in shopify_common.js
    if (Shopify) {
        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
            hideElement: 'AddressProvinceContainerNew'
        });
    }

    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function() {
        var formId = $(this).data('form-id');
        var countrySelector = 'AddressCountry_' + formId;
        var provinceSelector = 'AddressProvince_' + formId;
        var containerSelector = 'AddressProvinceContainer_' + formId;

        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
            hideElement: containerSelector
        });
    });

    // Toggle new/edit address forms
    $('.address-new-toggle').on('click', function() {
        $newAddressForm.toggleClass('hide');
    });

    $('.address-edit-toggle').on('click', function() {
        var formId = $(this).data('form-id');
        $('#EditAddress_' + formId).toggleClass('hide');
    });

    $('.address-delete').on('click', function() {
        var $el = $(this);
        var formId = $el.data('form-id');
        var confirmMessage = $el.data('confirm-message');
        if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
            Shopify.postLink('/account/addresses/' + formId, { parameters: { _method: 'delete' } });
        }
    });
})();

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function() {
    var config = {
        recoverPasswordForm: '#RecoverPassword',
        hideRecoverPasswordLink: '#HideRecoverPasswordLink'
    };

    if (!$(config.recoverPasswordForm).length) {
        return;
    }

    checkUrlHash();
    resetPasswordSuccess();

    $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
    $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

    function onShowHidePasswordForm(evt) {
        evt.preventDefault();
        toggleRecoverPasswordForm();
    }

    function checkUrlHash() {
        var hash = window.location.hash;

        // Allow deep linking to recover password form
        if (hash === '#recover') {
            toggleRecoverPasswordForm();
        }
    }

    /**
     *  Show/Hide recover password form
     */
    function toggleRecoverPasswordForm() {
        $('#RecoverPasswordForm').toggleClass('hide');
        $('#CustomerLoginForm').toggleClass('hide');
    }

    /**
     *  Show reset password success message
     */
    function resetPasswordSuccess() {
        var $formState = $('.reset-password-success');

        // check if reset password form was successfully submited.
        if (!$formState.length) {
            return;
        }

        // show success message
        $('#ResetSuccess').removeClass('hide');
    }
})();

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.passwordPage = (function() {
    var config = {
        loginForm: '#Login',
        emailForm: '#emailForm',
        hideRecoverPasswordLink: '.js-login-link',
        buttonClose: '.js-close-form'
    };

    if (!$(config.loginForm).length) {
        return;
    }

    checkUrlHash();

    $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

    $(config.buttonClose).on('click', closePasswordForm);

    function onShowHidePasswordForm(evt) {
        console.log($(this));
        evt.preventDefault();
        toggleRecoverPasswordForm();
    }

    function checkUrlHash() {
        var hash = window.location.hash;

        // Allow deep linking to recover password form
        if (hash === '#Login') {
            toggleRecoverPasswordForm();
        }
    }

    function closePasswordForm() {
        $('#Login').addClass('hide');
        $('#emailForm').removeClass('hide');
    }

    /**
     *  Show/Hide recover password form
     */
    function toggleRecoverPasswordForm() {
        $('#Login').toggleClass('hide');
        $('#emailForm').addClass('hide');
    }
})();


/**
 * Page Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Page template.
 *
 * @namespace CustomBasedLevelContent
 */

theme.CustomBasedLevelContent = (function() {

    const selectors = {
        blocksContainer: '.js-blocks-container ',
        contentBlockSelector: '[data-content]',
        sliderSelector: '[data-slider]'
    };

    /**
     * Page section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function CustomBasedLevelContent(container) {
        this.container = container;

        if (window.productLevelsContent) {
            this.blocks = this.initContentBlocks(window.productLevelsContent);
        }

        this.contentBlocks = this.container.querySelectorAll(selectors.contentBlockSelector);
        this.sliderElement = this.container.querySelector(selectors.sliderSelector);

        let $contentBlocks = $(this.contentBlocks);

        // let maxHeight = null;
        //
        // $contentBlocks.each(function() {
        // 	let blockHeight = $(this).innerHeight();
        // 	if (blockHeight > maxHeight) {
        // 		maxHeight = blockHeight;
        // 	}
        // });
        //
        // $contentBlocks.css('height', maxHeight);
        //
        // $(window).resize(function() {
        // 	$contentBlocks.css('height', 'auto');
        //
        // 	let maxHeight = null;
        //
        // 	$contentBlocks.each(function() {
        // 		let blockHeight = $(this).innerHeight();
        //
        // 		if (blockHeight > maxHeight) {
        // 			maxHeight = blockHeight;
        // 		}
        // 	});
        //
        // 	$contentBlocks.css('height', maxHeight);
        // });

        const allPipsSettings = {
            mode: 'count',
            values: this.contentBlocks.length
        };

        if (this.sliderElement && this.contentBlocks.length >= 2) {
            this.slider = noUiSlider.create(this.sliderElement, {
                start: 0,
                range: {
                    'min': 0,
                    'max': this.contentBlocks.length - 1
                },
                orientation: 'vertical',
                cssPrefix: 'utd-',
                pips: this.container.dataset.showAllPips ? allPipsSettings : {
                    mode: 'range',
                    values: this.contentBlocks.length
                }
            });

            const rangePips = this.container.querySelectorAll('.utd-pips .utd-value');

            for (const rangePip of rangePips) {
                const currentPipData = this.blocks[+rangePip.innerHTML];

                if (currentPipData.level_link !== '&amp;nbsp' && currentPipData.level_link !== '&nbsp') {
                    rangePip.innerHTML = `<a target="_blank" href="${currentPipData.level_link}">${currentPipData.level_name}</a>`;
                } else {
                    rangePip.innerHTML = currentPipData.level_name;
                }
            }

            this.lastShownBlockId = 0;

            this.slider.on('update', (values, handle, unencoded, tap, positions) => {
                const closest = Math.floor(parseFloat(values[0]))

                if (closest == this.lastShownBlockId) return;

                let affectedBlockIds = Object.keys(this.blocks).map(x => +x);

                affectedBlockIds = affectedBlockIds.filter(x => x == closest);


                // if (closest > this.lastShownBlockId) {
                //     affectedBlockIds = affectedBlockIds.filter(x => x > this.lastShownBlockId && x <= closest)
                // } else if (closest < this.lastShownBlockId) {
                //     affectedBlockIds = affectedBlockIds.filter(x => x <= this.lastShownBlockId && x > closest)
                // }

                let pageHeightDiff = 0,
                    $blockElement;

                for (let id in this.blocks) {
                    this.blocks[id].element.classList.remove('shown')
                        // this.blocks[id].element.style.display = 'none'
                }

                for (const id of affectedBlockIds) {
                    $blockElement = $(this.blocks[id].element);
                    pageHeightDiff += $blockElement.innerHeight() + parseInt($blockElement.css('margin-top'));


                    // $blockElement.slideToggle(400, () => {
                    //     this.blocks[id].element.classList.toggle('shown');
                    // })

                    this.blocks[id].element.classList.toggle('shown');
                }

                if (closest < this.lastShownBlockId) {
                    pageHeightDiff *= -1
                }

                if (this.container.dataset.mobileScroll != 'false' && Modernizr.touchevents) {
                    window.scrollTo({
                        top: window.pageYOffset + pageHeightDiff,
                        behavior: 'smooth'
                    })
                } else if (this.container.dataset.desktopScroll != 'false' && !Modernizr.touchevents) {
                    window.scrollTo({
                        top: window.pageYOffset + pageHeightDiff,
                        behavior: 'smooth'
                    })
                }

                this.lastShownBlockId = closest
            })
        }

    }

    CustomBasedLevelContent.prototype = $.extend({}, CustomBasedLevelContent.prototype, {
        initContentBlocks(contentWithKeys) {
            let blocks = {};

            for (const field of contentWithKeys) {
                let fieldName = field[0].split('_');
                let blockId = +fieldName.pop() - 1;
                if (blockId in blocks) {
                    blocks[blockId][fieldName.join('_')] = field[1]
                } else {
                    blocks[blockId] = {
                        [fieldName.join('_')]: field[1]
                    }
                }
            }


            const blocksContainer = this.container.querySelector(selectors.blocksContainer)

            let contentBlockElement;

            if (blocksContainer) {
                for (const id in blocks) {
                    contentBlockElement = document.createElement('div');
                    contentBlockElement.dataset.content = blocks[id].level_name;
                    if (id == '0') {
                        contentBlockElement.className = 'shown'
                    }
                    contentBlockElement.innerHTML = blocks[id].content;

                    blocksContainer.insertAdjacentElement('beforeend', contentBlockElement);

                    blocks[id].element = contentBlockElement;
                }
            }

            return blocks;
        },
        /**
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function() {
            this.$container.off(this.namespace);
        }
    });

    return CustomBasedLevelContent;
})();

$(document).ready(function() {
    var sections = new slate.Sections();
    sections.register('product', theme.Product);
    sections.register('level-based-content', theme.LevelBasedContent);
    sections.register('custom-based-level-content', theme.CustomBasedLevelContent);
    sections.register('product-references', theme.ProductReferences);
    sections.register('product-reviews', theme.ProductReviews);
    sections.register('contact-form', theme.ContactForm);
    sections.register('contact-success', theme.ContactSuccess);
    sections.register('quiz-widget', theme.QuizWidget);

    // Common a11y fixes
    slate.a11y.pageLinkFocus($(window.location.hash));

    $('.in-page-link').on('click', function(evt) {
        slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
    });

    // Target tables to make them scrollable
    var tableSelectors = '.rte table';

    slate.rte.wrapTable({
        $tables: $(tableSelectors),
        tableWrapperClass: 'rte__table-wrapper',
    });

    // Target iframes to make them responsive
    var iframeSelectors =
        '.rte iframe[src*="youtube.com/embed"],' +
        '.rte iframe[src*="player.vimeo"]';

    slate.rte.wrapIframe({
        $iframes: $(iframeSelectors),
        iframeWrapperClass: 'rte__video-wrapper'
    });

    // Apply a specific class to the html element for browser support of cookies.
    if (slate.cart.cookiesEnabled()) {
        document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
    }
});