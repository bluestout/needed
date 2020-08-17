;
(function() {
    animateElementsOnScroll();

    function animateElementsOnScroll() {
        let elementsForAnimate = $('.js-animate');

        if (!elementsForAnimate.length && window.innerWidth < 1200) {
            return;
        }

        // Animate elements on page load (if some elements need to be animated)
        let scrollBottomPosition = $(window).scrollTop() + window.innerHeight;

        elementsForAnimate.each(function() {
            let elementPosition = $(this).offset().top;

            if (scrollBottomPosition >= elementPosition) {
                $(this).addClass('animated');
            }
        });

        // On scroll, check elements position and ADD/REMOVE class for animate
        $(window).scroll(function() {

            if (window.innerWidth < 1200) {
                return;
            }

            scrollBottomPosition = $(window).scrollTop() + window.innerHeight;

            elementsForAnimate.each(function() {
                // use 'data-offset={number}' for set OFFSET of animation start. Example: data-offset="200"
                // By default animation start when half of element appear on the screen
                let animationOffset = $(this).data('offset');

                let offsetVal = (animationOffset !== undefined) ? Number(animationOffset) : $(this).innerHeight() / 2;

                let elementPosition = $(this).offset().top + offsetVal;

                if (scrollBottomPosition >= elementPosition) {
                    $(this).addClass('animated');
                } else {
                    $(this).removeClass('animated');
                }
            });
        });
    }

    window.animateElementsOnScroll = animateElementsOnScroll;
}());;
(function() {

    const $window = $(window);
    const $header = $('#header-main');



    if ($header.length > 0) {

        if ($window.scrollTop() > 70) {
            $header.addClass('header--white');
        } else {
            $header.removeClass('header--white');
        }

        $window.on('scroll touchmove', e => {
            if ($window.scrollTop() > 70) {
                $header.addClass('header--white');
            } else {
                $header.removeClass('header--white');
            }
        });
    }
}());

;
(function() {

    initArticlesSlider();
    initBlogSlider();
    initProductMainSlider();
    initTailoredProducts();

    function initArticlesSlider() {

        let articlesSlider = $('#featured-blog-slider');

        if (!articlesSlider.length) {
            return false;
        }

        let slickOptions = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: false
        };

        if (window.innerWidth < 768) {
            articlesSlider.slick(slickOptions);
        }

        $(window).resize(function() {
            if (window.innerWidth < 768 && !articlesSlider.hasClass('slick-initialized')) {
                articlesSlider.slick(slickOptions);
            } else if (window.innerWidth >= 768 && articlesSlider.hasClass('slick-initialized')) {
                articlesSlider.slick('unslick');
            }
        });
    }

    function initBlogSlider() {
        let blogSlider = $('#blog-slider');

        if (!blogSlider.length) {
            return false;
        }

        blogSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: false,
            draggable: false
        });
    }

    function initProductMainSlider() {
        let productSlider = $('#product-main-slider');

        if (!productSlider.length) {
            return false;
        }

        productSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoplay: false,
            fade: true,
            prevArrow: '<button type="button" class="slick-arrow slick-prev"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>',
            nextArrow: '<button type="button" class="slick-arrow slick-next"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>'
        });
    }

    function initTailoredProducts() {
        let tailoredProducts = $('#tailored-products');

        if (!tailoredProducts.length) {
            return false;
        }


        let slickOptions = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: false
        };

        if (window.innerWidth < 768) {
            tailoredProducts.slick(slickOptions);
        }

        $(window).resize(function() {
            if (window.innerWidth < 768 && !tailoredProducts.hasClass('slick-initialized')) {
                tailoredProducts.slick(slickOptions);
            } else if (window.innerWidth >= 768 && tailoredProducts.hasClass('slick-initialized')) {
                tailoredProducts.slick('unslick');
            }
        });
    }
}());

;
(function() {

    initMobileMenu();

    function initMobileMenu() {
        let mobileButton = $('#menu-button');
        let mobileMenu = $('#mobile-menu');
        let mobileAccountMenu = $('#mobile-account');
        let accountLink = $('#account-link');
        let header = $('#header-main');
        let dropdownLink = $('.js-dropdown-link');

        let mobileMenuJs = document.getElementById('mobile-menu');
        let accountMenuJs = document.getElementById('mobile-account');

        let menuIsOpen = false;
        let accountIsOpen = false;

        // Main Navigation
        mobileButton.click(function() {
            $(this).toggleClass('menu-button--active');

            menuIsOpen = !menuIsOpen;

            if (accountIsOpen === true) {
                accountIsOpen = false;
            }

            if (menuIsOpen || accountIsOpen) {
                header.addClass('menu-is-opened');
                bodyScrollLock.disableBodyScroll(mobileMenuJs);
                bodyScrollLock.disableBodyScroll(accountMenuJs);
            } else {
                header.removeClass('menu-is-opened');
                bodyScrollLock.clearAllBodyScrollLocks();
            }

            mobileMenu.stop().fadeToggle(300);
            mobileAccountMenu.removeClass('mobile-menu--slide-in');
        });


        // Account navigation
        accountLink.click(function(e) {
            e.preventDefault();

            accountIsOpen = !accountIsOpen;

            if (menuIsOpen === true) {
                menuIsOpen = false;
            }

            if (menuIsOpen || accountIsOpen) {
                header.addClass('menu-is-opened');
                mobileAccountMenu.addClass('mobile-menu--slide-in');
                bodyScrollLock.disableBodyScroll(accountMenuJs);
                bodyScrollLock.disableBodyScroll(mobileMenuJs);
            } else {
                header.removeClass('menu-is-opened');
                mobileAccountMenu.removeClass('mobile-menu--slide-in');
                bodyScrollLock.clearAllBodyScrollLocks();
            }

            mobileMenu.fadeOut(300);
            mobileButton.removeClass('menu-button--active');
        });

        dropdownLink.click(function(e) {
            e.preventDefault();

            let dropdownMenu = $(this).next('.js-dropdown');

            $(this).toggleClass('mobile-menu__link--opened');
            dropdownMenu.stop().slideToggle();
        })
    }

}());;
(function() {

    toggleUserMenu();

    function toggleUserMenu() {

        let userButton = $('.js-user');
        let userMenu = $('#user-menu');

        if (!userButton.length && !userMenu.length) {
            return;
        }

        userButton.click(function(e) {
            e.preventDefault();

            $(this).toggleClass('user--opened');

            userMenu.toggleClass('user-menu--opened');
        });


        $('body').on('click touchstart', function(event) {
            if (!$(event.target).closest(userButton.add(userMenu)).length) {
                userMenu.removeClass('user-menu--opened');
                userButton.removeClass('user--opened');
            } else {
                return;
            }
        });
    }
}());

;
(function() {

    $(document).ready(function() {
        let animatedWord = $('.js-animate-words');

        if (animatedWord.length > 0) {

            animatedWord.each(function() {
                let counter = 0;

                let words = $(this).find('.js-word');

                var inst = setInterval(change, 3000);

                function change() {

                    words.removeClass('word-visible');
                    words.addClass('word-hidden');

                    words.eq(counter).removeClass('word-hidden');
                    words.eq(counter).addClass('word-visible');

                    counter++;
                    if (counter >= words.length) {
                        counter = 0;
                        // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
                    }
                }
            });


        }
    });

}());;
(function() {
    if (!('keywordsRelations' in window) || !(window.keywordsRelations instanceof Object)) return false;

    const additionalClassReference = {
        'site-nav__link': 'site-nav__link--keyword'
    }

    document.addEventListener('DOMContentLoaded', function() {
        addIcons();
    })

    const addIcons = function() {
        const keywordElements = document.querySelectorAll('[data-keyword]')

        for (const keywordElement of keywordElements) {
            if (!('keyword' in keywordElement.dataset)) continue;

            if ('keywordFound' in keywordElement.dataset) continue;

            let contextForSearch = ''

            if (keywordElement.dataset.keyword) {
                contextForSearch = keywordElement.dataset.keyword
            } else if (contextForSearch = keywordElement.querySelector('[data-keyword-context]')) {
                contextForSearch = contextForSearch.innerText
            } else {
                contextForSearch = keywordElement.innerText
            }

            const foundKeyword = findRelatedIcon(contextForSearch)

            if (foundKeyword) {
                const iconURL = window.keywordsRelations[foundKeyword].iconURL
                const iconElement = keywordElement.querySelector('[data-icon]')

                if (iconElement) {
                    iconElement.dataset.icon = iconURL
                    iconElement.style.backgroundImage = "url('" + iconURL + "')"
                }

                keywordElement.dataset.icon = iconURL
                keywordElement.dataset.keywordFound = true

                appendAdditionalClasses(keywordElement)
            }
        }

        document.removeEventListener('keyword:added', arguments.callee)
        document.addEventListener('keyword:added', arguments.callee)
    }

    window.addIcons = addIcons;

    const findRelatedIcon = context => {
        for (const title in window.keywordsRelations) {
            if (window.keywordsRelations[title].regex.test(context)) return title
        }

        return false
    }

    const appendAdditionalClasses = el => {
        for (const initialClass in additionalClassReference) {
            if (el.classList.contains(initialClass)) {
                el.classList.add(additionalClassReference[initialClass])
            }
        }
    }
}());;
(function() {

    const defaultSpeed = 30

    window.addEventListener('DOMContentLoaded', e => {
        const tickers = document.querySelectorAll('[data-ticker]')

        for (const ticker of tickers) {
            const contentContainer = ticker.querySelector('[data-ticker-content]')

            if (!contentContainer) continue

            const tickerWidth = ticker.offsetWidth
            const initialChildren = [].slice.call(contentContainer.children).map(x => x.cloneNode(true))

            if (!initialChildren.length) {
                return ticker.remove()
            }

            const childrenContentLength = initialChildren.map(x => getElementFullWidth(x)).reduce((a, b) => a + b, 0)

            if (childrenContentLength <= 0) {
                return ticker.remove()
            }

            contentContainer.innerHTML = ''

            let iterations = 0

            while (contentContainer.offsetWidth < tickerWidth * 2) {
                iterations++
                for (let i = 0; i < initialChildren.length; i++) {
                    contentContainer.insertAdjacentElement(
                        'beforeend',
                        initialChildren[i].cloneNode(true)
                    )
                }

                if (iterations > 50) break
            }

            contentContainer.childNodes = contentContainer.children

            $(contentContainer).webTicker({
                speed: parseInt(ticker.dataset.speed) || defaultSpeed,
                moving: false,
                height: '20px',
                duplicate: true
            });

            $(contentContainer).webTicker('cont')
        }
    })

    const getElementFullWidth = el => {
        if (!(el instanceof HTMLElement)) return false

        const style = el.currentStyle || window.getComputedStyle(el)

        return el.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight)
    }

}());

$(document).ready(function() {
    //initInstafeed();
});

function initInstafeed() {
    var instafeed = $("#instafeed");

    if (instafeed.length) {

        // var needed_id = 6028357385
        // var needed_token = 6028357385.1677ed0.bacf8767885344618f5247f84fbf9840

        // smith id = 8463096329
        // smith token = 8463096329.1677ed0.fe7da20c66ed4bd1b5a3d6fcf4b86c9d

        var token = instafeed.data('token');
        var userId = instafeed.data('userid');
        var photoCount = Number(instafeed.attr('data-count'));
        var feed;
        if (!token || !userId) {
            return;
        }
        if (window.innerWidth > 767) {
            feed = new Instafeed({
                get: 'user',
                userId: userId,
                resolution: 'standard_resolution',
                accessToken: token,
                limit: photoCount,
                template: '<div class="instagram__col"><a class="instagram__image" href="{{link}}" target="_blank" style="background-image:url({{image}})"><div class="instagram__caption"><span class="instagram__text">{{caption}}</span></div></a></div>',
                success: function(response) {
                    response.data.forEach(function(item) {
                        var char = String.fromCharCode(10240);

                        var parts = item.caption.text.split(char).filter(function(value) {
                            return value.length !== 0;
                        });

                        var breakChar = String.fromCharCode(8629);

                        item.caption.text = parts.join('').replace(/(?:\r\n|\r|\n)/g, '<br>');
                    });
                }
            });
        } else {
            feed = new Instafeed({
                get: 'user',
                userId: userId,
                resolution: 'standard_resolution',
                accessToken: token,
                limit: photoCount,
                template: '<div class="instagram__col"><a class="instagram__image" href="{{link}}" target="_blank" style="background-image:url({{image}})"><div class="instagram__caption"><span class="instagram__text">{{caption}}</span></div></a></div>',
                success: function(response) {
                    response.data.forEach(function(item) {
                        var char = String.fromCharCode(10240);
                        var parts = item.caption.text.split(char).filter(function(value) {
                            return value.length !== 0;
                        });

                        var breakChar = String.fromCharCode(8629);

                        item.caption.text = parts.join('').replace(/(?:\r\n|\r|\n)/g, '<br>');
                    });
                },
                after: function() {
                    $(document).ready(function() {
                        instafeed.slick({
                            adaptiveHeight: true,
                            slidesToShow: photoCount,
                            slidesToScroll: photoCount,
                            autoplay: false,
                            arrows: false,
                            dots: false,
                            appendDots: $("#instafeed"),
                            responsive: [{
                                    breakpoint: 767,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 3
                                    }
                                },
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 3
                                    }
                                },
                                {
                                    breakpoint: 480,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                }
                            ]
                        });
                    });
                }
            });
        }
        feed.run();
    }
}

;
(function() {

    $(document).ready(function() {
        initPopups()
    })

    function initPopups() {
        $(document).on('click', '[data-popup-trigger]', e => {
            e.preventDefault()

            const popupHandle = e.target.dataset.popupTrigger || e.target.parentElement.dataset.popupTrigger;

            const popup = document.querySelector(`[data-popup="${popupHandle}"]`);

            if (popup) {
                popup.classList.add('popup--opened')
                bodyScrollLock.disableBodyScroll(popup)
            }
        })

        $(document).on('click', '.popup, .popup__close-wrapper', e => {
            if (
                $(e.target).parents('.popup__close-wrapper').length ||
                e.target.classList.contains('popup__close-wrapper') ||
                e.target.classList.contains('popup')
            ) {
                const popup = e.target.classList.contains('popup') ? e.target : $(e.target).parents('.popup').first()[0];
                console.log(popup);

                if (popup) {
                    popup.classList.remove('popup--opened')
                    bodyScrollLock.enableBodyScroll(popup)
                }
            }
        })
    }

}());

;
(function() {

    $(document).ready(function() {
        initAccordions()
    })

    function initAccordions() {
        const namespace = "[data-accordion]";

        $(`${namespace} [data-content]`).hide();


        $(document).on('click', `${namespace} [data-toggler] span`, e => {
            const $pane = $(e.target).parents('[data-pane]').first();
            const stateEl = $pane.find('[data-state]')[0];

            if (!stateEl) return;

            if (stateEl.dataset.state) {
                $pane.find('> [data-content]').stop(true).slideUp(300, clearHeight);
                stateEl.classList.remove('accordion__state--active');
                $pane.toggleClass('state--active');
            } else {
                $pane.find('> [data-content]').stop(true).slideDown(300, clearHeight);
                stateEl.classList.add('accordion__state--active');
                $pane.toggleClass('state--active');
            }

            stateEl.dataset.state = stateEl.dataset.state ? '' : 'opened';


            function clearHeight() {
                $(this).css('height', '');
            }
        })
    }

}());

;
(function() {


    $(document).ready(function() {
        let reviewsSlider = $('section #reviews-slider');
        let reviewsMobSlider = $('section #reviews-mob-slider');
        initReviewsSlider();

        function initReviewsSlider() {
            let typeLink = $('.js-review-type-link');

            if (window.innerWidth >= 767) {
                if (!reviewsSlider.length) {
                    return;
                }
                reviewsSlider.slick({
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    autoplay: false,
                    arrows: true,
                    dots: true,
                    appendDots: $('#reviews-slider-wrapper'),
                    prevArrow: '<button type="button" class="slick-arrow reviews__arrow reviews__arrow--left"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>',
                    nextArrow: '<button type="button" class="slick-arrow reviews__arrow reviews__arrow--right"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>'
                }).on('setPosition', function() {
                    $(this).find('.slick-slide').height('auto');
                    var slickTrack = $(this).find('.slick-track');
                    var slickTrackHeight = $(slickTrack).height();
                    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
                });
            } else {
                if($('body').hasClass('template-product') && (!reviewsMobSlider.length)) {
                    reviewsSlider.slick({
                        adaptiveHeight: true,
                        slidesToShow: 1,
                        autoplay: false,
                        arrows: true,
                        dots: true,
                        appendDots: $('#reviews-slider-wrapper'),
                        prevArrow: '<button type="button" class="slick-arrow reviews__arrow reviews__arrow--left"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>',
                        nextArrow: '<button type="button" class="slick-arrow reviews__arrow reviews__arrow--right"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>'
                    });
                } else if (!reviewsMobSlider.length) {
                    return;
                }

                reviewsMobSlider.slick({
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    autoplay: false,
                    arrows: true,
                    dots: true,
                    appendDots: $('#reviews-slider-wrapper'),
                    prevArrow: '<button type="button" class="slick-arrow reviews__arrow reviews__arrow--left"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>',
                    nextArrow: '<button type="button" class="slick-arrow reviews__arrow reviews__arrow--right"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>'
                });
            }

            typeLink.click(filterSlides);

            if (typeLink.length > 0) {
                typeLink.first().trigger('click');
            }



            function filterSlides(e) {
                e.preventDefault();
                let type = $(this).attr('href');


                $(this).addClass('reviews__filter-link--active');
                typeLink.not($(this)).removeClass('reviews__filter-link--active');

                reviewsSlider.slick('slickUnfilter');
                reviewsSlider.slick('slickFilter', `[data-type='${type}']`);
            }
        }

    });


}());


;
(function() {

    $(document).ready(function() {

        initVerificationSection();

        function initVerificationSection() {

            let verificationSection = $('#verification');

            if (!verificationSection.length) {
                return;
            }

            let container = $('#verification-container');
            let stepBlock = $('.js-verification-step');
            let navLinks = $('.js-verification-nav-link');
            let images = $('.js-verification-image');

            let verificationSectionPos = verificationSection.offset().top;
            let windowBottomPos = $(window).scrollTop() + window.innerHeight;

            let bottomEdgeStart = false;
            let currentPosition = null;
            let stepCount = stepBlock.length;
            let scrollStep = 600; // the scrollBar distance needed for change step block
            let evidenceOffsetMargin = null;

            verificationSection.css('height', stepCount * 105 + 'vh');

            let verificationSectionBottomPos = verificationSectionPos + verificationSection.innerHeight();

            if ($(window).scrollTop() >= verificationSectionBottomPos && window.innerWidth > 1199) {

                bottomEdgeStart = true;
                currentPosition = verificationSectionPos;

                stepBlock.removeClass('verification__step--active');
                stepBlock.last().addClass('verification__step--active');

                navLinks.removeClass('verification-nav__item--active');
                navLinks.last().addClass('verification-nav__item--active');

                images.removeClass('verification__image--active');
                images.last().addClass('verification__image--active');

                // calcEvidanceOffsetMargin();
            }


            $(window).resize(function() {
                verificationSectionPos = verificationSection.offset().top;
                windowBottomPos = $(window).scrollTop() + window.innerHeight;
                verificationSectionBottomPos = verificationSectionPos + verificationSection.innerHeight();
                evidenceOffsetMargin = null;


                calcEvidanceOffsetMargin();


            });

            // Change step on window scroll
            $(window).scroll(function() {

                if (window.innerWidth < 1200) {
                    return;
                }

                windowBottomPos = $(window).scrollTop() + window.innerHeight;

                // re calc values, because if review slider has different slides height, it's cause the bug
                verificationSectionPos = verificationSection.offset().top;
                verificationSectionBottomPos = verificationSectionPos + verificationSection.innerHeight();

                if ($(window).scrollTop() >= verificationSectionPos) {
                    container.addClass('sticky');

                    if (currentPosition === null) {
                        currentPosition = $(window).scrollTop();
                    }

                    for (let i = 1; i <= stepCount; i++) {
                        if ($(window).scrollTop() > (currentPosition + (i - 1) * scrollStep) && $(window).scrollTop() < (currentPosition + i * scrollStep)) {

                            stepBlock.removeClass('verification__step--active');
                            stepBlock.eq(i - 1).addClass('verification__step--active');

                            navLinks.removeClass('verification-nav__item--active');
                            navLinks.eq(i - 1).addClass('verification-nav__item--active');

                            images.removeClass('verification__image--active');
                            images.eq(i - 1).addClass('verification__image--active');
                        }
                    }


                } else {
                    container.removeClass('sticky');
                }

                if (windowBottomPos >= verificationSectionBottomPos) {
                    container.addClass('bottom-position');
                    container.removeClass('sticky');
                    bottomEdgeStart = true;

                    calcEvidanceOffsetMargin();

                } else if (windowBottomPos <= verificationSectionBottomPos && bottomEdgeStart) {
                    container.removeClass('bottom-position');
                    container.addClass('sticky');
                    bottomEdgeStart = false;
                }
            });



            function calcEvidanceOffsetMargin() {

                if (window.innerWidth < 1200) {
                    $('.evidence').css('margin-top', '');
                    return;
                }

                if (!bottomEdgeStart || evidenceOffsetMargin) {
                    return;
                }

                $('.evidence').css('margin-top', '');

                let evidenceOffsetTop = Math.floor($('.evidence').offset().top);
                let verContainerBottomnPos = Math.floor($('.verification__container').offset().top + $('.verification__container').height());

                evidenceOffsetMargin = Math.floor((evidenceOffsetTop - verContainerBottomnPos));
                $('.evidence').css('margin-top', -evidenceOffsetMargin + 70);
            }


            // Change step by click on nav link
            navLinks.click(function(e) {
                e.preventDefault();
                let stepIndex = $(this).attr('data-step');


                let stepPosition = currentPosition + (stepIndex - 1) * scrollStep + 1;

                $(window).scrollTop(stepPosition);

                navLinks.not($(this)).removeClass('verification-nav__item--active');
                $(this).addClass('verification-nav__item--active');
            });
        }
    });

}());

;
(function() {

    $(document).ready(function() {
        if (!$('body').hasClass('template-product')) return;
        if (window.innerWidth > 1199) {
            initIntroNutrientsSection();
        } else {
            initIntroNutrientsMobSection();
        }

        function initIntroNutrientsMobSection() {
            let images = $('.js-intro-nutrients-image');
            let introNutrientsMobSection = $('#intro-nutrients .intro-nutrients__step-wrapper');
            introNutrientsMobSection.slick({
                adaptiveHeight: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                arrows: false,
                dots: true,
                customPaging: function(slider, i) {
                    return '<div class="intro-nutrients-nav"><span data-step="' + $(slider.$slides[i]).attr('title') + '" class="js-intro-nutrients-nav-link intro-nutrients-nav__item">' + $(slider.$slides[i]).attr('title') + '</span></div>';
                }
            });

            introNutrientsMobSection.on('swipe', function(event, slick, direction) {
                images.removeClass('intro-nutrients__image--active');
                images.eq(slick.currentSlide).addClass('intro-nutrients__image--active');
            });

            introNutrientsMobSection.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                images.removeClass('intro-nutrients__image--active');
                images.eq(nextSlide).addClass('intro-nutrients__image--active');
            });

        }

        function initIntroNutrientsSection() {

            let introNutrientsSection = $('#intro-nutrients');

            if (!introNutrientsSection.length) {
                return;
            }

            let container = $('#intro-nutrients-container');
            let stepBlock = $('.js-intro-nutrients-step');
            let navLinks = $('.js-intro-nutrients-nav-link');
            let images = $('.js-intro-nutrients-image');

            let introNutrientsSectionPos = introNutrientsSection.offset().top;
            let windowBottomPos = $(window).scrollTop() + window.innerHeight;

            let bottomEdgeStart = false;
            let currentPosition = null;
            let stepCount = stepBlock.length;
            let scrollStep = 450; // the scrollBar distance needed for change step block
            let evidenceOffsetMargin = null;

            introNutrientsSection.css('height', stepCount * 75 + 'vh');

            let introNutrientsSectionBottomPos = introNutrientsSectionPos + introNutrientsSection.innerHeight();

            if ($(window).scrollTop() >= introNutrientsSectionBottomPos && window.innerWidth > 1199) {

                bottomEdgeStart = true;
                currentPosition = introNutrientsSectionPos;

                stepBlock.removeClass('intro-nutrients__step--active');
                stepBlock.last().addClass('intro-nutrients__step--active');

                navLinks.removeClass('intro-nutrients-nav__item--active');
                navLinks.last().addClass('intro-nutrients-nav__item--active');

                images.removeClass('intro-nutrients__image--active');
                images.last().addClass('intro-nutrients__image--active');

                // calcEvidanceOffsetMargin();
            }


            $(window).resize(function() {
                introNutrientsSectionPos = introNutrientsSection.offset().top;
                windowBottomPos = $(window).scrollTop() + window.innerHeight;
                introNutrientsSectionBottomPos = introNutrientsSectionPos + introNutrientsSection.innerHeight();
                evidenceOffsetMargin = null;
                // calcEvidanceOffsetMargin();
            });

            // Change step on window scroll
            $(window).scroll(function() {

                if (window.innerWidth < 1200) {
                    return;
                }

                windowBottomPos = $(window).scrollTop() + window.innerHeight;

                // re calc values, because if review slider has different slides height, it's cause the bug
                introNutrientsSectionPos = introNutrientsSection.offset().top;
                introNutrientsSectionBottomPos = introNutrientsSectionPos + introNutrientsSection.innerHeight();
                if ($(window).scrollTop() >= (introNutrientsSectionPos - 160)) {
                    container.addClass('sticky');

                    if (currentPosition === null) {
                        currentPosition = $(window).scrollTop();
                    }

                    for (let i = 1; i <= stepCount; i++) {
                        if ($(window).scrollTop() > (currentPosition + (i - 1) * scrollStep) && $(window).scrollTop() < (currentPosition + i * scrollStep)) {

                            stepBlock.removeClass('intro-nutrients__step--active');
                            stepBlock.eq(i - 1).addClass('intro-nutrients__step--active');

                            navLinks.removeClass('intro-nutrients-nav__item--active');
                            navLinks.eq(i - 1).addClass('intro-nutrients-nav__item--active');

                            images.removeClass('intro-nutrients__image--active');
                            images.eq(i - 1).addClass('intro-nutrients__image--active');
                        }
                    }


                } else {
                    container.removeClass('sticky');
                }

                if (windowBottomPos >= introNutrientsSectionBottomPos) {
                    container.addClass('bottom-position');
                    container.removeClass('sticky');
                    bottomEdgeStart = true;

                    // calcEvidanceOffsetMargin();

                } else if (windowBottomPos <= introNutrientsSectionBottomPos && bottomEdgeStart) {
                    container.removeClass('bottom-position');
                    container.addClass('sticky');
                    bottomEdgeStart = false;
                }
            });



            function calcEvidanceOffsetMargin() {

                if (window.innerWidth < 1200) {
                    $('.sliced-scroll-pro-o3').css('margin-top', '');
                    return;
                }

                if (!bottomEdgeStart || evidenceOffsetMargin) {
                    return;
                }

                $('.sliced-scroll-pro-o3').css('margin-top', '');

                let evidenceOffsetTop = Math.floor($('.sliced-scroll-pro-o3').offset().top);
                let verContainerBottomnPos = Math.floor($('.intro-nutrients__container').offset().top + $('.intro-nutrients__container').height());

                evidenceOffsetMargin = Math.floor((evidenceOffsetTop - verContainerBottomnPos));
                $('.sliced-scroll-pro-o3').css('margin-top', -evidenceOffsetMargin + 140);
            }


            // Change step by click on nav link
            navLinks.click(function(e) {
                e.preventDefault();
                let stepIndex = $(this).attr('data-step');


                let stepPosition = currentPosition + (stepIndex - 1) * scrollStep + 1;

                $(window).scrollTop(stepPosition);

                navLinks.not($(this)).removeClass('intro-nutrients-nav__item--active');
                $(this).addClass('intro-nutrients-nav__item--active');
            });
        }
    });

}());

;
(function() {

    $(document).ready(function() {
        if (!$('body').hasClass('template-product')) return;

        if (window.innerWidth > 1199) {
            initSlicedScrollO3Section();
        } else {
            initSlicedScrollO3MobSection();
        }

        function initSlicedScrollO3MobSection() {
            let slicedScrollO3MobSection = $('.sliced-scroll-pro-o3 .sliced-scroll-mob__steps');
            slicedScrollO3MobSection.slick({
                adaptiveHeight: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                arrows: true,
                dots: true,
                prevArrow: '<button type="button" class="slick-arrow mob_sliced__arrow mob_sliced__arrow--left"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>',
                nextArrow: '<button type="button" class="slick-arrow mob_sliced__arrow mob_sliced__arrow--right"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="chevron-bottom"><line class="cls-1" x1="16" x2="7" y1="20.5" y2="11.5"/><line class="cls-1" x1="25" x2="16" y1="11.5" y2="20.5"/></g></svg></button>'
            });

        }

        function initSlicedScrollO3Section() {
            var sidebar = new StickySidebar('#sidebar', {
                containerSelector: '#container',
                innerWrapperSelector: '.sidebar__inner',
                topSpacing: 200,
                bottomSpacing: 50

            });

            const slicedScrollSection = $('.sliced-scroll-pro-o3');
            const sectionPosition = $(slicedScrollSection).offset().top; // positionY
            const sectionHeight = $(slicedScrollSection).innerHeight(); // height of section
            const useOneImage = slicedScrollSection.data('use-one-image');

            const $progressBar = $('.js-progress-bar');
            const items = $('.js-scroll-item').toArray();
            const images = $('.js-slice-image');
            const stepBarHeight = $('.sliced-scroll__steps').innerHeight();

            $(window).scroll(function() {
                const sectionOffset = $(window).scrollTop() + 50 - sectionPosition; // positionY inside section + 250
                // un-active state
                if (sectionOffset < 0) {
                    $('.js-scroll-item').removeClass('active');
                    $progressBar.css('height', '0%');
                    return;
                }

                const percentageScrolled = +(sectionOffset * 1 / (stepBarHeight)).toFixed(2) * 100;
                $progressBar.css('height', Math.min(percentageScrolled, 100) + '%');
                for (const [i, item] of items.entries()) {
                    if (percentageScrolled - (item.offsetTop / stepBarHeight).toFixed(2) * 100 >= 0) {
                        item.classList.add('active');

                        if (!useOneImage) {
                            images.removeClass('active');
                            images.eq(i).addClass('active');
                        }

                    } else {
                        item.classList.remove('active');

                        if (!useOneImage) {
                            images.eq(i).removeClass('active');
                        }
                    }
                }
            });
        }
    });

}());

;
(function() {

    $(document).ready(function() {

        initNatureSection();

        function initNatureSection() {

            let natureSection = $('#nature-sliced');

            if (!natureSection.length) {
                return;
            }

            let container = $('#nature-sliced-container');
            let stepBlock = $('.js-nature-sliced-step');
            let images = $('.js-nature-sliced-image');

            let natureSectionPos = natureSection.offset().top;
            let windowBottomPos = $(window).scrollTop() + window.innerHeight;

            let bottomEdgeStart = false;
            let currentPosition = null;
            let stepCount = stepBlock.length;
            let scrollStep = 600; // the scrollBar distance needed for change step block
            // let scrollStep = $(window).innerHeight(); // the scrollBar distance needed for change step block

            natureSection.css('height', stepCount * 105 + 'vh');

            let natureSectionBottomPos = natureSectionPos + natureSection.innerHeight();

            $(window).resize(function() {
                natureSectionPos = natureSection.offset().top;
                windowBottomPos = $(window).scrollTop() + window.innerHeight;
                natureSectionBottomPos = natureSectionPos + natureSection.innerHeight();
                // scrollStep = $(window).innerHeight();
            });

            // Check if window scrollTop under the scroll section and we  need change active to the lasts
            if ($(window).scrollTop() > natureSectionBottomPos && window.innerWidth > 1199) {
                bottomEdgeStart = true;
                currentPosition = natureSectionPos;

                stepBlock.removeClass('nature-sliced__step--active');
                stepBlock.last().addClass('nature-sliced__step--active');

                images.removeClass('nature-sliced__image--active');
                images.last().addClass('nature-sliced__image--active');
            }

            // Change step on window scroll
            $(window).scroll(function() {

                if (window.innerWidth < 1200) {
                    return;
                }

                // console.log($(window).scrollTop());

                //
                natureSectionPos = natureSection.offset().top;
                natureSectionBottomPos = natureSectionPos + natureSection.innerHeight();
                //
                windowBottomPos = $(window).scrollTop() + window.innerHeight;
                if ($(window).scrollTop() >= natureSectionPos) {
                    container.addClass('sticky');

                    if (currentPosition === null) {
                        currentPosition = $(window).scrollTop();
                    }

                    for (let i = 1; i <= stepCount; i++) {

                        if ($(window).scrollTop() > (currentPosition + (i - 1) * scrollStep) && $(window).scrollTop() < (currentPosition + i * scrollStep)) {

                            stepBlock.removeClass('nature-sliced__step--active');
                            stepBlock.eq(i - 1).addClass('nature-sliced__step--active');

                            images.removeClass('nature-sliced__image--active');
                            images.eq(i - 1).addClass('nature-sliced__image--active');
                        }
                    }

                } else {
                    container.removeClass('sticky');
                }

                if (windowBottomPos >= natureSectionBottomPos) {
                    container.addClass('bottom-position');
                    container.removeClass('sticky');
                    bottomEdgeStart = true;

                } else if (windowBottomPos <= natureSectionBottomPos && bottomEdgeStart) {
                    container.removeClass('bottom-position');
                    container.addClass('sticky');
                    bottomEdgeStart = false;
                }
            });

        }
    });

}());

;
(function() {

    $(document).ready(function() {

        initIntegrativeSection();

        function initIntegrativeSection() {

            let collaborationSection = $('#collaboration');

            if (!collaborationSection.length) {
                return;
            }

            let container = $('#collaboration-container');
            let stepBlock = $('.js-collaboration-step');
            let navLinks = $('.js-circle-dot');
            let images = $('.js-collaboration-image');

            let collaborationSectionPos = collaborationSection.offset().top;
            let windowBottomPos = $(window).scrollTop() + window.innerHeight;

            let bottomEdgeStart = false;
            let currentPosition = null;
            let stepCount = stepBlock.length;
            let scrollStep = 600; // the scrollBar distance needed for change step block

            collaborationSection.css('height', stepCount * 105 + 'vh');

            let collaborationSectionBottomPos = collaborationSectionPos + collaborationSection.innerHeight();


            $(window).resize(function() {
                collaborationSectionPos = collaborationSection.offset().top;
                windowBottomPos = $(window).scrollTop() + window.innerHeight;
                collaborationSectionBottomPos = collaborationSectionPos + collaborationSection.innerHeight();
            });


            // Check if window scrollTop under the scroll section and we  need change active to the lasts
            if ($(window).scrollTop() > collaborationSectionBottomPos && window.innerWidth > 1199) {
                bottomEdgeStart = true;
                currentPosition = collaborationSectionPos;

                stepBlock.removeClass('collaboration__step--active');
                stepBlock.last().addClass('collaboration__step--active');

                navLinks.parents('.collaboration__circle').removeClass('collaboration__circle--active');
                navLinks.last().parents('.collaboration__circle').addClass('collaboration__circle--active');

                navLinks.removeClass('active');
                navLinks.last().addClass('active');

                images.removeClass('collaboration__image--active');
                images.last().addClass('collaboration__image--active');
            }


            // Change step on window scroll
            $(window).scroll(function() {

                if (window.innerWidth < 1200) {
                    return;
                }

                windowBottomPos = $(window).scrollTop() + window.innerHeight;

                if ($(window).scrollTop() >= collaborationSectionPos) {
                    container.addClass('sticky');

                    if (currentPosition === null) {
                        currentPosition = $(window).scrollTop();
                    }

                    for (let i = 1; i <= stepCount; i++) {
                        if ($(window).scrollTop() > (currentPosition + (i - 1) * scrollStep) && $(window).scrollTop() < (currentPosition + i * scrollStep)) {

                            // if last step (with all active circles)
                            if (i - 1 === 3) {
                                container.find('.collaboration__circle').addClass('collaboration__circle--active');

                                stepBlock.removeClass('collaboration__step--active');
                                stepBlock.eq(i - 1).addClass('collaboration__step--active');

                                navLinks.removeClass('active');
                                navLinks.eq(i - 1).addClass('active');
                            } else {
                                stepBlock.removeClass('collaboration__step--active');
                                stepBlock.eq(i - 1).addClass('collaboration__step--active');

                                navLinks.removeClass('active');
                                navLinks.eq(i - 1).addClass('active');

                                navLinks.parents('.collaboration__circle').removeClass('collaboration__circle--active');
                                navLinks.eq(i - 1).parents('.collaboration__circle').addClass('collaboration__circle--active');

                                images.removeClass('collaboration__image--active');
                                images.eq(i - 1).addClass('collaboration__image--active');
                            }
                        }
                    }

                } else {
                    container.removeClass('sticky');
                }

                if (windowBottomPos >= collaborationSectionBottomPos) {
                    container.addClass('bottom-position');

                    container.removeClass('sticky');
                    bottomEdgeStart = true;

                } else if (windowBottomPos <= collaborationSectionBottomPos && bottomEdgeStart) {
                    container.removeClass('bottom-position');
                    container.addClass('sticky');
                    bottomEdgeStart = false;
                }
            });


            // Change step by click on nav link
            navLinks.click(function(e) {
                e.preventDefault();

                let stepIndex = $(this).attr('data-step');
                let stepPosition = currentPosition + (stepIndex - 1) * scrollStep + 1;



                if (window.innerWidth > 1199) {
                    $(window).scrollTop(stepPosition);
                } else {
                    stepBlock.removeClass('collaboration__step--active');
                    stepBlock.eq(stepIndex - 1).addClass('collaboration__step--active');
                }

                navLinks.not($(this)).removeClass('active');
                $(this).addClass('active');

                if (stepIndex === "4") {
                    container.find('.collaboration__circle').addClass('collaboration__circle--active');
                } else {
                    navLinks.not($(this)).parents('.collaboration__circle').removeClass('collaboration__circle--active');
                    $(this).parents('.collaboration__circle').addClass('collaboration__circle--active');
                }
            });
        }
    });

}());

;
(function() {

    initUserBioTooltip();

    function initUserBioTooltip() {

        let userCards = $('.js-user-card');
        let userCardsToolTip = userCards.find('.js-user-card-desc');

        userCards.click(function(e) {

            if (
                e.target.classList.contains('js-user-card-desc') ||
                e.target.classList.contains('user-card__triangle')
            ) return false;

            if ($(e.target).parents('.js-user-card-desc').length > 0) return false;

            userCards.not($(this)).removeClass('user-card--opened');

            const currentRowIndex = this.dataset.row;
            const currentRowIndexMobile = this.dataset.rowMobile;

            const rowSiblingsWithMargin = userCards.toArray()
                .filter(x => {
                    if (window.innerWidth < 768) {
                        return x.dataset.rowMobile == currentRowIndexMobile
                    } else {
                        return x.dataset.row == currentRowIndex
                    }
                })
                .filter(x => $(x).css('margin-bottom') != "0px")

            const isRowMargined = rowSiblingsWithMargin.length > 0

            $(this).toggleClass('user-card--opened');

            let tooltipHeight = $(this).find('.js-user-card-desc').innerHeight() + 40;
            if ($(this).hasClass('user-card--opened')) {
                if (!isRowMargined) {
                    userCards.css('margin-bottom', '');
                }
                $(this).css('margin-bottom', tooltipHeight + 'px')
                $(rowSiblingsWithMargin).css('margin-bottom', tooltipHeight + 'px')
            } else {
                userCards.css('margin-bottom', '');
            }

            // setTimeout(() => userCards.css('margin-bottom', ''), 300)
            // userCards.css('margin-bottom', '');
            //
            // $(this).toggleClass('user-card--opened');
            //
            // let tooltipHeight = $(this).find('.js-user-card-desc').innerHeight() + 40;
            // if ($(this).hasClass('user-card--opened')) {
            //     $(this).css('margin-bottom', tooltipHeight + 'px');
            // }


            if (window.innerWidth < 768 && $(this).hasClass('user-card--opened')) {
                let currentCard = $(this);

                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: currentCard.offset().top - 50
                    }, 300)
                }, 600);
            }
        });
    }

}());;
(function() {

    initPillarsTab();

    function initPillarsTab() {
        let pillarsLink = $('.js-pillars-link');
        let pillarsTab = $('.js-pillars-tab');

        if (!pillarsLink.length && !pillarsTab.length) {
            return;
        }

        pillarsLink.click(function(e) {
            e.preventDefault();
            let linkedTab = $('#' + $(this).attr('href'));

            if ($(this).hasClass('active')) {
                return;
            }

            pillarsLink.not($(this)).removeClass('active');
            $(this).addClass('active');

            pillarsTab.hide();
            linkedTab.fadeIn();
        });
    }


}());;
(function() {

    initFaqSearch();

    function initFaqSearch() {
        let searchInput = $('#faq-input');
        let faqQuestions = $('.js-faq-questions');
        let faqButton = $('#faq-button');

        if (!searchInput.length || !faqQuestions.length) {
            return;
        }

        faqButton.click(search);

        searchInput.on('change', search);

        function search(e) {
            let searchedPhrase = searchInput.val().toLowerCase();

            clearAllMatches();

            if (searchedPhrase === '') {
                return;
            }

            faqQuestions.each(function(i) {

                let words = $(this).text().toLowerCase();
                let questionToggler = $(this).parents('.faq__container').find('.faq__title-toggler');
                let question = $(this).parents('.faq__container').find('.faq__questions');

                if (words.includes(searchedPhrase)) {

                    $(this).addClass('active');

                    question.stop(true).slideDown(300, function() {
                        $(this).css('height', '');
                    });

                    questionToggler.addClass('accordion__state--active');
                    questionToggler.attr('data-state', 'opened');

                } else {
                    $(this).removeClass('active');
                }
            });


        }


        function clearAllMatches() {
            faqQuestions.removeClass('active');
            $('.faq__questions').stop(true).slideUp(300);
            $('.faq__title-toggler').removeClass('accordion__state--active');
            $('.faq__title-toggler').attr('data-state', '');
        }

    }


}());

$(document).ready(function() {

    initInputQuantity();


    function initInputQuantity() {
        let inputQty = $('.js-input-qty');

        if (!inputQty.length) {
            return false;
        }

        inputQty.keypress(function(e) {
            if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });

        inputQty.on('input', function(e) {
            if ($(this).val() > 99) {
                $(this).val(99);
            }
        });

    }
});
$(document).ready(function() {

    preventEmptySearch();

    function preventEmptySearch() {
        let searchForm = $('.js-search-form');

        if (!searchForm.length) {
            return false;
        }

        let searchInput = searchForm.find('.js-search-input');

        searchForm.on('submit', function(e) {

            if (searchInput.val().trim() === '') {
                e.preventDefault();
            }
        });
    }
});

$(document).ready(function() {
    initPractitionerForm();
    replaceName();

    function initPractitionerForm() {
        let practitionerForm = $('.js-practitioner-form');

        if (!practitionerForm.length) {
            return;
        }

        practitionerForm.on('focus', '.form-control', function() {
            $(this).siblings('[data-toggle="tooltip"]').addClass('focused');
        });

        practitionerForm.on('focusout', '.form-control', function() {
            $(this).siblings('[data-toggle="tooltip"]').removeClass('focused');
        });

        practitionerForm.on('change', '.js-form-name input', function(e) {
            let value = $(e.target).val();
            let valuePrepared = value.split(' ').join('%20');

            let $form = practitionerForm.find('form');

            if ($form.length === 0) {
                return;
            }

            let redirectUrl = $form.attr('redirect_after_submit');

            if (!redirectUrl) {
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

            let newRedirectUrl = updateQueryString('name', valuePrepared, redirectUrl);
            $form.attr('redirect_after_submit', newRedirectUrl);
        });
    }

    function replaceName() {
        let replaceName = $('.js-form-success-name-replaced');

        if (replaceName.length == 0) {
            return;
        }

        let replaceNameHTML = replaceName.html();

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

        let newHTML = replaceNameHTML;

        if (query.name) {
            newHTML = replaceNameHTML.replace('%name%', query.name);
        } else {
            newHTML = replaceNameHTML.replace('%name%', "Dear practitioner");
        }

        replaceName.html(newHTML);
    }
});

$(document).on('click', '.calendar-board-event__container', function() {
    let eventsCalendar = $('#events-calendar');

    if (!eventsCalendar.length) {
        return;
    }

    $('html, body').animate({
        scrollTop: eventsCalendar.offset().top
    }, 500);
});

;
(function() {

    $(document).ready(function() {
        tickerScroll()
    });

    function tickerScroll() {
        let key = 'scrollTo';
        let headerHeight = $('#header-main').innerHeight();

        if (!$('.js-ticker-url').length) {
            return;
        }

        function getCookie(name) {
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        function setCookie(name, value, options) {
            options = options || {};

            var expires = options.expires;

            if (typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d;
            }
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            var updatedCookie = name + "=" + value;

            for (var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }

            document.cookie = updatedCookie;
        }

        function deleteCookie(name) {
            setCookie(name, "", {
                expires: -1
            })
        }

        $('.js-ticker-url').click(function(e) {
            e.preventDefault();
            setCookie(key, true, {
                expires: 10
            });

            if (url.indexOf(window.ticker.url) !== -1) {
                deleteCookie(key);

                if (!window.ticker.section_id) {
                    return false;
                }

                let section = $('#' + window.ticker.section_id);
                if (section.length === 0) {
                    return false;
                }

                $('html, body').animate({
                    scrollTop: section.offset().top - headerHeight
                }, 0, 'swing');

                return false;
            }

            location.href = e.currentTarget.href;
        });

        let url = location.href;
        if (url.indexOf(window.ticker.url) !== -1) {
            if (!window.ticker.section_id) {
                return;
            }

            let section = $('#' + window.ticker.section_id);
            if (section.length === 0) {
                return;
            }

            if (getCookie(key)) {
                $('html, body').animate({
                    scrollTop: section.offset().top - headerHeight
                }, 0, 'swing');

                deleteCookie(key);
            }
        } else {
            deleteCookie(key);
        }
    }

}());

// data-subscribe-form
;
(function() {
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let forms = $('[data-subscribe-form]');
    if (!forms.length) {
        return;
    }

    forms.each(function(index, form) {
        let input = $(form).find('.subscribe-form__input');
        let error = $(form).find('[data-error]');
        let success = $(form).find('[data-success]');

        if (!input.length) {
            return;
        }

        $(input).on('propertychange input', function() {
            error.addClass('hidden');
        });

        const klaviyoSubscribeURL = "https://a.klaviyo.com/ajax/subscriptions/subscribe";
        $(form).submit(function(event) {
            let email = $(input).val();

            if (validateEmail(email)) {
                const data = {
                    g: form.dataset.klaviyoListId,
                    '$fields': '$source,$email,$consent_method,$consent_form_id,$consent_form_version',
                    '$list_fields': '',
                    '$timezone_offset': Math.abs(new Date().getTimezoneOffset() / 60),
                    '$source': 'Newsletter subscription',
                    '$email': email,
                    '$consent_method': 'Klaviyo Form',
                    '$consent_form_id': form.dataset.klaviyoFormId,
                    '$consent_form_version': 121296
                };

                fetch(klaviyoSubscribeURL, {
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "omit",
                        "headers": {
                            "access-control-allow-headers": "*",
                            "content-type": "application/x-www-form-urlencoded; charset=utf-8"
                        },
                        "referrer": location.href,
                        "referrerPolicy": "no-referrer-when-downgrade",
                        "body": Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&')
                    })
                    .then(res => {
                        $(document).trigger('subscription:success');
                        return res.json();
                    })
                    .then(data => {
                        if (data.success) {
                            error.addClass('hidden');
                            success.removeClass('hidden');

                            $(document).trigger('subscription:success');
                        }
                    });
            } else {
                error.removeClass('hidden');
            }

            event.preventDefault();
            return false;
        });
    });
}());

;
(function() {
    var wrapper = $('.js-subscription-popup-wrapper');
    if (!wrapper.length) {
        Cookies.remove('subscription-popup');
        return;
    }

    if (Cookies.get('subscription-popup')) {
        return;
    }

    var popup = wrapper.find('.subscription-popup');
    if (!popup.length) {
        return;
    }

    var overlay = wrapper.find('.subscription-popup-overlay');
    if (!overlay.length) {
        return;
    }

    var resizeEventTimer = null;
    window.addEventListener("orientationchange", function() {
        if (!popup.hasClass('opened')) {
            return;
        }

        $('body').addClass('no-transition');
        clearTimeout(resizeEventTimer);
        resizeEventTimer = setTimeout(function() {
            // wrapper.css('height', window.innerHeight + 'px');
            $('body').removeClass('no-transition');
        }, 250);
    }, false);

    window.addEventListener("resize", function() {
        if (!popup.hasClass('opened')) {
            return;
        }

        $('body').addClass('no-transition');
        setTimeout(function() {
            // wrapper.css('height', window.innerHeight + 'px');
            $('body').removeClass('no-transition');
        }, 250);
    }, false);

    var expiresDays = wrapper.data('frequency');
    var closeDelay = +wrapper.data('close-delay');

    if (closeDelay) {
        $(document).on('subscription:success', function() {
            if (!wrapper.hasClass('opened')) {
                return false;
            }

            setTimeout(function() {
                $(document).trigger('subscription-popup:close');
            }, closeDelay * 1000);
        });
    }

    $(document).on('subscription-popup:open', function() {
        wrapper.addClass('opened');
        // wrapper.css('height', window.innerHeight + 'px');

        bodyScrollLock.disableBodyScroll(popup[0]);
    });

    $(document).on('subscription-popup:close', function() {
        wrapper.removeClass('opened');
        bodyScrollLock.clearAllBodyScrollLocks();

        Cookies.set('subscription-popup', '1', {
            expires: expiresDays,
            path: '/'
        });
    });

    $(document).on('click', '.js-subscription-popup-wrapper .subscription-popup__close, .js-subscription-popup-wrapper .subscription-popup__close-bottom', function() {
        $(document).trigger('subscription-popup:close');
    });

    $(document).on('click, touchend', '.js-subscription-popup-wrapper .subscription-popup', function(e) {
        console.log(e);

        if ($(e.target).hasClass('subscription-popup__content') || $(e.target).parents('.subscription-popup__content').length) {
            return;
        }

        $(document).trigger('subscription-popup:close');
    });

    if (location.href.indexOf('/challenge') !== -1) {
        return;
    }

    $(document).trigger('subscription-popup:open');

    var url = new URL(location.href);
    if (url.searchParams.get('customer_posted') === "true") {
        Cookies.set('subscription-popup', '1', {
            expires: expiresDays,
            path: '/'
        });
    }
}());

$(document).ready(function() {
    if (window.innerWidth < 768) {
        $('footer.footer .footer__menu_items').on('click', '.drop-menu > .footer__title', function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
        });
    }

    $('.intro-experts').on('click', '.show_more', function() {
        // $(this).css('display', 'none');
        if($(this).hasClass('hide_more')) {
            $(this).text('Show more');
            $(this).closest('.member__content').find('.show-more').hide(300);
        } else {
            $(this).text('Hide');
            $(this).closest('.member__content').find('.show-more').show(300);
        }
        $(this).toggleClass('hide_more');
    });

    if (window.innerWidth < 991) {
        $('.pro-banner-middle-o3 .desc-wrapper').on('click', '.item-title', function(e) {
            $(this).toggleClass('open');
        });
    }

    $('#mobile-menu .mobile-menu__item').on('click', '.mob-dropdown', function() {
        $(this).toggleClass('menu-open');
    });

    $('body .product__action').find('.pro-btn-txt').text('Purchase Now');
    $('#rc_container .rc_block__type').on('change', 'input[type="radio"]', function(e) {
        var optionName = $(this).val();
        var pageHandle = $('body').data('handle');
        var productPrice =  $('body .product__action').find('.product-single__price').text();
        var btnName = '';
        if (optionName == 'onetime') {
            btnName = 'Purchase Now';
            $('.product .bogo_recomment_comment').addClass("hidden-bogo-comment");
            $('.product__action .subscription_only').removeClass('show');
            if(pageHandle == 'omega-3-nutrient-testing-kit') {
                $('body .product__action').find('span.dot').removeClass("hidden-option");
                $('body .product__action').find('.product-single__price').removeClass("hidden-option");
            }
        } else {
            btnName = 'Subscribe Now';
            $('.product .bogo_recomment_comment').removeClass("hidden-bogo-comment");
            $('.product__action .subscription_only').addClass('show');
            if(pageHandle == 'omega-3-nutrient-testing-kit') {
                $('body .product__action').find('span.dot').addClass("hidden-option");
                $('body .product__action').find('.product-single__price').addClass("hidden-option");
            }
        }
        $('body .product__action').find('.pro-btn-txt').text(btnName);
    });

    jQuery('.product__information').on('click', '.have_ques, .faq_link', function() {

        var _winWidth = $(window).width();
        $('html, body').animate({
            scrollTop: parseInt($('.quiz-pro-o3').offset().top) - 100
        }, 850);
    });
});