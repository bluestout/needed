;(function () {
    let articleCardTemplate = `
        <article
            class="article-card"
            :style="styles"
        >
            <div class="article-card__content">
                <h3 class="article-card__title">
                    <a :href="article.url">{{ article.title }}</a>
                </h3>
            </div>
        </article>
    `.trim();

    Vue.component('article-card', {
        props: {
            article: {
                type: Object,
                required: true
            }
        },
        computed: {
            styles: function () {
                let styles = {};

                if (this.background !== null) {
                    styles['background-image'] = `url("${this.article.previewImage}")`;
                }

                return styles;
            }
        },
        template: articleCardTemplate
    });

    let mainArticleCardTemplate = `
        <article class="article-card-long">
            <div class="article-card-long__image">
                <div class="article-card-long__image-inner" :style="styles"></div>
            </div>
    
            <div class="article-card-long__content" :style="contentStyles">
                <h3 class="article-card-long__title" data-keyword>
                    <a :href="article.url">
                        <span class="article-card-long__title-icon" data-icon></span>{{ article.title }}
                    </a>
                </h3>
    
                <div class="article-card-long__text" v-html="article.excerpt"></div>
            </div>
        </article>
    `.trim();

    Vue.component('main-article-card', {
        props: {
            article: {
                type: Object,
                required: true
            },
			bgColor: {
            	type: String,
				required: true
			}
        },
        computed: {
            styles: function () {
                let styles = {};

                if (this.article.bigImage !== null) {
                    styles['background-image'] = `url("${this.article.bigImage}")`;
                }

                return styles;
            },
			contentStyles: function () {
				let styles = {};

				if (this.bgColor !== null) {
					styles['background-color'] = this.bgColor;
				}

				return styles;
			}
        },
        filters: {
            truncateWords: function (value) {
                if (!value) {
                    return '';
                }

                value = value.split(' ', 15).join(' ');
                return value;
            }
        },
        template: mainArticleCardTemplate
    });

    let tagTemplate = `
        <li class="tag" :class="classes">
            <span class="tag__link" @click="toogleActive">
                {{ tag }}
            </span>
        </li>
    `.trim();

    Vue.component('tag', {
        props: {
            tag: {
                type: String,
                required: true
            },
            active: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toogleActive: function () {
                this.$emit('tags-update', {
                    tagName: this.tag
                });
            }
        },
        computed: {
            classes: function () {
                let classes = {};

                if (this.active) {
                    classes['tag--active'] = true;
                }

                return classes;
            }
        },
        template: tagTemplate
    });

    let blogSection = `
        <div class="blog-lists__articles js-animate animate-fade-in" data-offset="200" v-if="blog.articles.length">
            <h2 class="blog-lists__title">
                <a :href="blog.url" class="blog-lists__title-name">{{ blog.title }}</a>  
            </h2>

            <main-article-card :article="firstArticle" :bgColor="blog.blogColor" />

            <div class="row" v-if="restArticles.length">
                <div class="col-md-4" v-for="(article, index) in restArticles" :key="index">
                    <article-card :article="article" />
                </div>
            </div>

            <div class="blog-lists__loadmore" v-if="blog.postsToShow < blog.articles_count">
                <span :data-url="blog.url" class="blog-lists__link" @click.current="loadMore($event)">load more</span>
            </div>
        </div>
    `.trim();

    Vue.component('blog-section', {
        props: {
            blog: {
                type: Object,
                required: true
            }
        },
        data: function () {
            return {
                page: 1
            };
        },
        computed: {
            classes: function () {
                let classes = {};

                if (this.active) {
                    classes['tag--active'] = true;
                }

                return classes;
            },
            firstArticle: function () {
                return this.blog.articles[0];
            },
            restArticles: function () {
                let articles = this.blog.articles.slice();
                articles.shift();
                return articles;
            },
        },
        methods: {
            loadMore: function (event) {
                let element = event.target;
                let url = element.getAttribute('data-url');

                this.$http.get(this.loadMoreUrl(url)).then(response => {
                    let articles = response.data;

                    if (this.page === 1) {
                        articles = articles.splice(4);
                    }

                    this.$emit('articles-loaded', {
                        handle: this.blog.handle,
                        articles: articles
                    });

                    this.page += 1;
                }, response => {
                    console.log(response);
                });
            },
            loadMoreUrl: function (url) {
                return url + '?view=blog-json&page=' + this.page;
            }
        },
        template: blogSection
    });

    let app = new Vue({
        el: '#blogs-list',
        data: function () {
            return Object.assign({}, {
				activeTags: [],
				searchQuery: "",
				showMessageForEmptyFilters: false
			}, window.blogsListData);
        },
        mounted: function () {
            if (typeof window.animateElementsOnScroll !== 'undefined') {
                window.animateElementsOnScroll();
            }

            if (typeof window.addIcons !== 'undefined') {
                window.addIcons();
            }
        },
        updated: function () {
            window.animateElementsOnScroll();
            window.addIcons();
        },
        methods: {
            updateTags: function (payload) {
                let tagName = payload.tagName;
                let tags = this.activeTags.slice();


                if (tags.includes(tagName)) {
                    tags.splice(tags.indexOf(tagName), 1);
                } else {
                    tags.push(tagName);
                }

                this.activeTags = tags;
            },
            filterArticles: function (blog) {
                let filteredArticles = [];

                for (let article of blog.articles) {
                    if (this.articleHasTags(article)) {
                        filteredArticles.push(article);
                    }
                }

                return filteredArticles;
            },
            articleHasTags: function (article) {
                let articleTags = article.tags.split(', ');

                for (let tag of this.activeTags) {
                    if (tag === "") {
                        continue;
                    }

                    if (!articleTags.includes(tag)) {
                        return false;
                    }
                }

                return true;
            },
            articlesLoaded: function (data) {
                let blogs = Object.assign({}, this.blogs);
                let blog = blogs[data.handle];

                let articles = blog.articles;
                articles = articles.concat(data.articles);
                blog.articles = articles;
                blog.postsToShow += 6;

                this.blogs = blogs;
            },
			search: function (event) {
				if(this.searchQuery.trim() === ""){
					event.preventDefault();
				}
			}
        },
        computed: {
            filteredBlogs: function () {
                let blogs = Object.assign({}, this.blogs);

                if (this.activeTags.length === 0) {
                    return blogs;
                }

                blogs = {};

                for (let handle in this.blogs) {
                    let blog = Object.assign({}, this.blogs[handle]);

                    let filteredArticles = this.filterArticles(blog);

                    if (filteredArticles.length > 0) {
                        blog.articles_count = filteredArticles.length;
                        blog.articles = filteredArticles.splice(0, filteredArticles.length > blog.postsToShow ? blog.postsToShow : filteredArticles.length);
                        blogs[handle] = blog;
                    }
                }

                if (Object.getOwnPropertyNames(blogs).length > 0) {
                	this.showMessageForEmptyFilters = false;
				} else {
					this.showMessageForEmptyFilters = true;
				}

                return blogs;
            }
        }
    })
}());

