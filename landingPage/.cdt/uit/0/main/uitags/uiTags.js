define('uit/uitags/customImplementations', function () {

    return {
        "layouts/Form": function (element) {
            return {
                content: '<form>' + element.children[0].innerHTML + '</form>'
            };
        },

        "layouts/TopSection": function (element, parse) {
            var options = {};
            var children = element.childNodes;

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.nodeType === 1) {
                    options.content = parse(child);
                    break;
                }
            }
            return options;
        },
        "layouts/SlidingPanels": function (element, parse) {

            var options = {};
            var children = element.childNodes;
            var child;

            for (var i = 0; i < children.length; i++) {
                child = children[i];

                if (child.nodeType !== 1) {
                    continue;
                }

                var tagName = child.tagName.toLocaleLowerCase();
                var position = child.getAttribute('position');

                if (tagName === 'e-element' && position) {
                    if (position === 'center' || position === 'left' || position === 'right') {
                        var side = (position === 'center') ? 'main' : position;
                        options[side] = {};
                        if (child.getAttribute('label')) {
                            options[side].label = child.getAttribute('label');
                            child.removeAttribute('label');
                        }
                        if (child.getAttribute('expanded')) {
                            options[side].expanded = child.getAttribute('expanded');
                            child.removeAttribute('expanded');
                        }
                        child.removeAttribute('position');
                        options[side].contents = parse(child);
                    }
                }
            }

            return options;
        },
        "layouts/MultiSlidingPanels": function (element, parse) {
            var children = element.childNodes;
            var options = {};
            options.left = [];
            options.right = [];

            for (var i = 0; i < children.length; i++) {
                var child = children[i];

                if (child.nodeType !== 1) {
                    continue;
                }

                var tagName = child.tagName.toLocaleLowerCase();
                var position = child.getAttribute('position');

                if (tagName === 'e-element' && position) {
                    if (position === 'center') {
                        options.main = {};
                        var label = child.getAttribute('label');
                        if (label) {
                            options.main.label = label;
                            child.removeAttribute('label');
                        }
                        options.main.content = parse(child);
                        child.removeAttribute('position');
                    } else if (position === 'left' || position === 'right') {
                        var object = {};
                        if (child.getAttribute('label')) {
                            object.label = child.getAttribute('label');
                            child.removeAttribute('label');
                        }
                        if (child.getAttribute('expanded')) {
                            object.expanded = child.getAttribute('expanded');
                            child.removeAttribute('expanded');
                        }
                        if (child.getAttribute('icon')) {
                            object.icon = child.getAttribute('icon');
                            child.removeAttribute('icon');
                        }
                        if (child.getAttribute('value')) {
                            object.value = child.getAttribute('value');
                            child.removeAttribute('value');
                        } else {
                            object.value = i;
                        }

                        child.removeAttribute('position');
                        object.content = parse(child);
                        options[position].push(object);

                    }
                }
            }

            return options;

        },
        "layouts/Carousel": function (element, parse) {
            var options = {};
            options.widgets = [];
            var children = element.childNodes;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];

                if (child.nodeType !== 1) {
                    continue;
                }

                var tagName = child.tagName.toLocaleLowerCase();
                if (tagName === 'e-element') {
                    options.widgets.push(parse(child));
                }

            }
            return options;
        }
    };
});

define('uit/uitags/component', ['jscore/core', 'uit/uitags/customImplementations'], function (core, customImplementations) {

    function UIComponent(options) {
        this.options = options;
        this.instances = {};
        if (this.options.element) {
            this.element = this.options.element;
        } else {
            this.element = core.Element.parse(this.options.html).getNative();
        }
        this.events = [];

        this.src = this.element.getAttribute('src');

        // Html Elements that have e-id attribute to the instances object
        getElementsWithIds.call(this, this.element);

        if (this.src) {
            this.class = this.options.dependencies[this.src];
        }
        if (!this.options.root) {
            if (this.class && customImplementations[this.src]) {
                var templateOptions = customImplementations[this.src](this.element, this.fromTemplateParser.bind(this));
                parseAttributes.call(this);
                this.attributes = mergeObject(this.attributes, templateOptions);
            } else {
                this.process(this.options.html);
                parseAttributes.call(this);
            }
            if (this.options.instantiate) {
                instantiate.call(this);
            }
        } else {
            this.process(this.options.html);
        }
    }

    function getElementsWithIds() {

        var elsWithIds = this.element.querySelectorAll('[e-id]');
        for (var i = 0; i < elsWithIds.length; i++) {
            var el = elsWithIds[i];
            var eid = el.getAttribute('e-id');

            if (el.tagName.toLowerCase() !== 'E-ELEMENT'.toLowerCase() && !this.instances[eid] && !isChildOfEElement(el)) {
                this.instances[eid] = core.Element.wrap(el);
            }
        }

    }

    function isChildOfEElement(el) {
        var parent = el.parentNode;
        while (parent !== null && parent.tagName && parent.tagName.toLocaleLowerCase() !== 'e-element') {
            parent = parent.parentNode;
        }
        return (parent !== null && parent.tagName && parent.tagName.toLocaleLowerCase() === 'e-element');
    }

    UIComponent.prototype.fromTemplateParser = function (element, instantiate) {
        var component = parseComponent.call(this, element);

        if (instantiate === false) {
            return component.class;
        } else {
            return component.getInstance();
        }
    };

    UIComponent.prototype.process = function () {

        var html = this.element;

        // Make sure that elements created on the fly don't get interpreted here. Their content should be interpreted later in their own instance of uit
        if (html.tagName === 'E-ELEMENT' && !this.src) {
            return;
        }

        this.children = [];
        while (html.getElementsByTagName(constants.TAG_NAME).length > 0) {
            var id = generateId();
            var component = html.getElementsByTagName(constants.TAG_NAME)[0];


            if (component.getAttribute(constants.PREFIX + '-attr') !== null || html.getAttribute(constants.PREFIX + '-type') !== null) {
                return;
            }
            if (component.nodeType === 3) {
                return;
            }
            replaceElement(core.Element.parse("<" + constants.PREFIX + "-placeholder-id-" + id + ">").getNative(), component);

            var newComponent = new UIComponent({
                element: component,
                id: id,
                opts: this.options.opts,
                dependencies: this.options.dependencies,
                uit: this.options.uit
            });

            this.children.push(newComponent);
            if (Object.keys(newComponent.instances).length > 0) {
                this.instances = mergeObject(this.instances, newComponent.instances);
            }
        }

    };

    UIComponent.prototype.render = function (parentElement) {

        if (this.options.root) {

            this.children.forEach(function (child) {
                child.render(this.element);
            }.bind(this));

            return;
        } else {
            this.parent = parentElement;
        }

        instantiate.call(this);

        if (this.instance) {
            if (parentElement) {

                if (this.instance instanceof core.Widget) {
                    this.instance.attachTo(core.Element.wrap(parentElement));
                } else {
                    this.instance.start(core.Element.wrap(parentElement));
                }

                replaceElement(this.instance.getElement()._getHTMLElement(), parentElement.getElementsByTagName(constants.PREFIX + "-placeholder-id-" + this.options.id)[0]);

            }
        }
    };


    UIComponent.prototype.getInstances = function () {
        var instances = {};

        // If the component is root element
        if (this.options.root) {
            // We start with the immediate instances of the component
            instances = mergeObject(this.instances, {});

            // Go through the children and get the instance, This is necessary
            // for the root component have access to nested elements in it
            this.children.forEach(function (child) {
                var id = (child.id !== undefined) ? child.id : generateId();
                instances[id] = child.getInstance();
            }.bind(this));
        }
        // Add current instance
        if (this.instance && !this.options.root) {
            var instanceName = (this.id) ? this.id : this.options.id;
            instances[instanceName] = this.getInstance();
        }


        return instances;
    };
    UIComponent.prototype.getInstance = function () {
        return this.instance;
    };


    var constants = {
        'PREFIX': 'e',
        'TAG_NAME': 'e-element',
        'EVENT_PREFIX': 'on',
        'IMPORT_TAG': 'e-link'
    };


    function parseAttributes() {
        this.attributes = {};
        var options = this.element.getAttribute(constants.PREFIX + '-options');
        if (options) {
            var parsedOptions = getOption.call(this, options);
            if (typeof parsedOptions === 'object') {
                this.attributes = parsedOptions;
                this.element.removeAttribute(constants.PREFIX + '-options');
            }
        }
        for (var i = 0; i < this.element.attributes.length; i++) {
            var attrib = this.element.attributes[i];
            if (attrib.specified) {
                if (attrib.name === constants.PREFIX + '-id') {
                    this.id = attrib.value;
                }
                if (attrib.name === constants.PREFIX + '-type') {
                    this.etype = attrib.value;
                } else if (attrib.name === 'class') {
                    this.className = attrib.value;
                } else if (attrib.name.indexOf(constants.PREFIX + '-') !== 0) {
                    setAttribute.call(this, attrib.name, attrib.value);
                }
            }
        }
    }

    function setAttribute(name, value) {
        if (name.indexOf('.') === -1 && name.indexOf('-') === -1) {
            this.attributes[name] = value;
        } else if (name.indexOf('-') !== -1) {
            var words = name.split('-');
            var camelCase = '';
            words.forEach(function (word, index) {
                camelCase += (index > 0) ? word.charAt(0).toUpperCase() + word.slice(1) : word;
            });
            this.attributes[camelCase] = value;
        } else {
            var route = name.split('.');
            var reference = this.attributes;
            for (var i = 0; i < route.length - 1; i++) {

                if (!reference[route[i]]) {
                    reference[route[i]] = {};
                }
                reference = reference[route[i]];
            }
            reference[route[route.length - 1]] = value;
        }
    }


    function instantiate() {
        var Widget = this.class;
        if (Widget) {
            this.instance = new Widget(this.attributes);
        } else {
            var html = this.element.innerHTML.trim();
            var Component = (this.etype === 'region') ? this.options.dependencies['jscore/core'].Region : this.options.dependencies['jscore/core'].Widget;
            var View = this.options.uit.parse('<div>' + html + '</div>', this.options.dependencies);
            this.options.opts.inline = true;
            var component = Component.extend({
                view: function () {

                    return new View(this.options);
                }
            });
            this.instance = new component(mergeObject(this.options.opts, this.attributes));

        }
        if (this.className) {
            var className = this.instance.getElement().getProperty('className');
            this.instance.getElement().setProperty('className', (className) ? className + ' ' + this.className : this.className);
        }
    }

    function parseComponent(element) {
        var component = new UIComponent({
            element: element,
            id: generateId(),
            opts: this.options.opts,
            dependencies: this.options.dependencies,
            instantiate: true,
            uit: this.options.uit
        });
        var instanceName = (component.id) ? component.id : component.options.id;
        this.instances[instanceName] = component.instance;
        if (Object.keys(component.instances).length > 0) {
            this.instances = mergeObject(this.instances, component.instances);
        }
        return component;
    }

    function parseRoute(route) {
        var path = [];
        if (route.indexOf('[') !== -1 && route.indexOf(']') !== -1) {
            path.push(route.substring(0, route.indexOf('[')));
            var regexp = /\[(\d+)\]/g;
            var match;
            while ((match = regexp.exec(route))) {
                path.push(parseInt(match[1]));
            }
        } else {
            path.push(route);
        }

        return path;
    }

    function getOption(value) {

        var route = value.split('.');

        var paths = [];

        var i;

        var reference = this.options.opts;
        for (i = 0; i < route.length; i++) {
            var path = parseRoute(route[i]);
            paths = paths.concat(path);
        }

        for (i = 0; i < paths.length; i++) {
            reference = reference[paths[i]];
            if (reference === undefined) {
                break;
            }
        }

        var result = (reference !== undefined) ? reference : value;

        if (result.toLowerCase && result.toLowerCase() === 'true') {
            result = true;
        } else if (result.toLowerCase && result.toLowerCase() === 'false') {
            result = false;
        }

        return result;
    }

    function replaceElement(newElement, oldElement) {
        oldElement.parentNode.replaceChild(newElement, oldElement);
    }

    function generateId() {
        return parseInt(String(Math.random()).slice(2, 10));
    }

    function mergeObject(obj1, obj2) {
        var obj3 = {};
        var attrname;
        for (attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }

    return UIComponent;

});

define('uit/uitags/uiTags', ['jscore/core', 'uit/uitags/component', 'jscore/ext/privateStore', 'require'], function (core, TemplateComponent, PrivateStore, localRequire) {

    var constants = {
        'PREFIX': 'e',
        'NAME': 'element',
        'TAG_NAME': 'e-element',
        'EVENT_PREFIX': 'on',
        'IMPORT_TAG': 'e-link'
    };

    var _;

    var template = {
        registry: {},
        register: function (object) {
            for (var key in object) {
                this.registry[key] = object[key];
            }
        },
        parseWithDependencies: function (html, handlebarsTemplate, cb, parentRequire) {
            preProcess.call(this, html, function (data) {
                this.loadDependencies(data.dependencies, function (deps) {
                    cb(this.parse(handlebarsTemplate || data.html, deps, data.styles));
                }.bind(this), parentRequire);
            }.bind(this), parentRequire);
        },
        parseFromTemplate: function (template, dependencies, styles, cb, parentRequire) {
            this.loadDependencies(dependencies, function (deps) {
                cb(this.parse(template, deps, styles));
            }.bind(this), parentRequire);
        },
        parse: function (html, deps, styles) {

            if (!_) {
                _ = PrivateStore.create();
            }

            var style = '';
            if (styles && deps && styles.length > 0) {
                styles.forEach(function (s) {
                    style = style + ' ' + deps[s];
                });
            }

            /**
             * The uit plugin returns a view class declaration which provides the following additional methods. For more information on the existing methods in the View class visit the <a href="../../../../jscore/latest/api/classes/jscore_core.View.html">JSCore Docs</a>.
             *
             * @class View
             */
            return core.View.extend({

                init: function (options, config) {
                    _(this).config = config; // handlebars options
                },

                getTemplate: function () {

                    if (!_(this).rootComponent) {
                        _(this).rootComponent = new TemplateComponent({
                            html: (typeof html === 'string') ? html : html(this.options, _(this).config),
                            root: true,
                            opts: this.options,
                            dependencies: this.dependencies,
                            uit: this.uit
                        });

                        _(this).rootComponent.render();
                        _(this).instances = _(this).rootComponent.getInstances();

                        _(this).element = core.Element.wrap(_(this).rootComponent.element);
                    }
                    return _(this).element;
                },
                getStyle: function () {
                    return this.style;
                },
                style: style,
                uit: this,
                dependencies: deps,

                /**
                 * Takes a the e-id attribute previously provided in the html. Returns instance of the element, it can be used in Regions, Widgets or in regular Elements.
                 *
                 * @method findById
                 * @return {Region | Widget | Element} element
                 *
                 * @example
                 * view.findById('myButton'); // returns the instance of the Button Widget
                 * view.findById('myParagraph'); // returns the Element instance of the paragraph element
                 */
                findById: function (id) {
                    return recursiveFind(this, id);
                },

                /**
                 * Method used for clean up purposes. Will destroy all Widgets and stop all Regions created in the HTML markup.
                 *
                 * @method destroy
                 *
                 * @example
                 * view.destroy();
                 */
                destroy: function () {
                    recursiveDestroy(this);
                }
            });

        },
        loadDependencies: function (deps, cb, parentRequire) {
            deps = ['jscore/core'].concat(deps);
            loadDependencies.call(this, deps, cb, parentRequire);
        },
        process: function (html, cb, parentRequire, config) {
            return preProcess.call(this, html, cb, parentRequire, config);
        }
    };

    return template;


    function loadDependencies(deps, cb, parentRequire) {
        var req = (parentRequire) ? parentRequire : localRequire;

        var dependencies = {};

        var depsToUrl = [];
        var depsToUrl2 = [];

        deps.forEach(function (dep) {
            depsToUrl2.push(dep);
            var exclamationMarkIndex = dep.indexOf('!');
            var styleIndex = dep.indexOf('styles!');
            var textIndex = dep.indexOf('text!');

            // When the base url is the current one just use toUrl method
            if (req.toUrl === undefined || req.toUrl('') === './') {
                depsToUrl.push(dep);
            } else {
                // When the base url is different that the current folder then fix it for lamda. This is done to fix tests.
                if ((styleIndex !== -1 && exclamationMarkIndex !== -1 && dep[exclamationMarkIndex + 1] === '.')) {
                    var styleDep = dep.replace('styles!', '');
                    styleDep = req.toUrl(styleDep).substr(req.toUrl('').length);
                    depsToUrl.push('styles!' + styleDep);
                } else if ((textIndex !== -1 && exclamationMarkIndex !== -1 && dep[exclamationMarkIndex + 1] === '.')) {
                    var textDep = dep.replace('text!', '');
                    textDep = req.toUrl(textDep).substr(req.toUrl('').length);
                    depsToUrl.push('text!' + textDep);
                } else if (dep[0] === '.' || (exclamationMarkIndex !== -1 && dep[exclamationMarkIndex + 1] === '.')) {
                    depsToUrl.push(req.toUrl(dep).substr(req.toUrl('').length));
                } else {
                    depsToUrl.push(dep);
                }
            }
        });

        if (deps.length > 0) {
            req(depsToUrl, function () {
                if (!core) {
                    core = arguments[0];
                }
                for (var i = 0; i < arguments.length; i++) {
                    dependencies[deps[i]] = arguments[i];
                }

                cb(dependencies);
            }.bind(this));
        } else {
            cb(dependencies);
        }
    }

    // destroy all children if they are inline components
    function recursiveDestroy(view) {
        for (var id in _(view).instances) {
            var component = _(view).instances[id];
            destroyUIComponent(component);

            if (component.view && _(component.view).instances && component.view.options.inline === true) {
                recursiveDestroy(component.view);
            }
        }
    }

    // will find an component, even nested ones
    function recursiveFind(view, id) {
        if (_(view).instances[id]) {
            return _(view).instances[id];
        } else {

            for (var key in _(view).instances) {
                var child = _(view).instances[key];
                if (child.view && _(child.view).instances) {
                    var find = recursiveFind(child.view, id);
                    if (find !== undefined) {
                        return find;
                    }
                }
            }
        }
    }

    function destroyUIComponent(component) {
        if (component instanceof core.Widget) {
            component.destroy();
        } else if (component instanceof core.Region) {
            component.stop();
        }
    }

    function closeTags(html) {
        var selfClosingTags = html.match(/<e-[^>]+?\/>/ig);
        if (selfClosingTags) {
            selfClosingTags.forEach(function (tag) {
                var openTag = tag.replace('/>', '>');
                var name = tag.match(/<e-[^>]+?(\s|\/)/ig);

                if (name === null) {
                    name = tag.substr(1, -2);
                } else {
                    name = name[0];
                }
                name = name.substring(1, name.length - 1);
                html = html.replace(tag, openTag + '</' + name + '>');
            });
        }
        return html;
    }

    function removeComments(html) {
        return html.replace(/<!--(.|\s)*?-->/igm, '');
    }

    function removeLineBreaks(html) {
        var newHtml = html.replace(/(\r\n|\t|\n|\r)/gm, "");
        return newHtml;
    }

    // extracts all e-links and converts all custom element into generic elements
    function extractLinks(html) {

        var importTags = [];

        // Add global tags to local registry
        for (var key in this.registry) {
            importTags.push({name: key, src: this.registry[key]});
        }

        importTags = importTags.concat(parseTags(html, 'e-link'));

        // Turn custom tags into generic tags
        importTags.forEach(function (tag) {
            html = html.replace(tag.html, '');
            if (tag.name && tag.src) {
                var tagName = (tag.src.indexOf('.html') !== -1) ? 'e-partial' : 'e-element';
                html = html.replace(new RegExp('<e-' + tag.name, 'g'), '<' + tagName + ' src="' + tag.src + '" ');
                html = html.replace(new RegExp('</e-' + tag.name, 'g'), '</' + tagName);
            }
        });

        return {
            html: html.trim(),
            imports: importTags.filter(function (importTag) {
                return (importTag.src.indexOf('.html') === -1);
            })
        };
    }

    function parseTags(html, tag) {

        var imports = html.match(new RegExp('<' + tag + '\\b[^>]*>(.*?)</' + tag + '>', 'g'), 'ig');
        var tags = [];
        if (imports) {
            imports.forEach(function (importTag) {
                var attrs = importTag.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/ig);
                var object = {html: importTag};

                attrs.forEach(function (attr) {
                    var attrName = attr.substring(0, attr.indexOf('='));
                    var attrValue = attr.substring(attr.indexOf('"') + 1, attr.length - 1);
                    object[attrName] = attrValue;
                });
                tags.push(object);
            });
        }

        return tags;

    }

    function prepareMarkup(html) {
        html = closeTags(html);
        html = removeComments(html);
        html = removeLineBreaks(html);
        return html;
    }

    // This is sync function made async for convenience
    function loadDependenciesInBuild(deps, cb, parentRequire, config) {

        var fs = require('fs');
        var path = require('path');
        var result = {};

        // Necessary to get the path between the src folder and the actual file using the uit plugin
        // get the location of the file and remove the file
        var internalPath = '';
        if (config.file !== undefined && config.file.length > 0) {
            var filePathArray = config.file.split('/');
            internalPath = '/' + filePathArray.slice(0, filePathArray.length - 1).join('/');
        }

        deps.forEach(function (dep) {
            var src;
            if (dep.indexOf('../') === 0) {
                src = process.cwd() + '/src' + internalPath + '/' + dep;
            } else if (dep.indexOf('./') === 0) {
                src = process.cwd() + dep.replace('./', '/src' + internalPath + '/');
            }
            result[dep] = fs.readFileSync(src, 'utf8');
        });
        cb(result);
    }


    // gets all e-partial, e-element and e-link and
    // appends the basePath of the the path is relative
    function fixPaths(html, basePath) {
        var tags = parseTags(html, 'e-partial');

        tags = tags.concat(parseTags(html, 'e-link'));
        tags = tags.concat(parseTags(html, 'e-element'));
        tags.forEach(function (tag) {
            if (tag.src !== undefined && tag.src.indexOf('.') === 0) {
                var newSrc = basePath + tag.src;
                html = html.replace(tag.src, newSrc);
            }
        });

        return html;
    }

    function resolveMarkup(html, parentRequire, callback, config) {

        var data = {
            html: prepareMarkup(html),
            imports: []
        };

        function getBasePath(filePath) {
            var path = filePath.split('/');
            path.pop();
            return path.join('/') + '/';
        }

        function load() {
            // extract imports (styles) and  convert custom elements into regular elements
            var newData = extractLinks.call(this, data.html);
            data.html = prepareMarkup(newData.html);
            data.imports = data.imports.concat(newData.imports);

            // get all the e-partial tags, if there are no partials then we're done.
            // If there are partials then fetch files and replace them in the markup and start again.
            var partials = parseTags(data.html, 'e-partial');
            if (partials.length === 0) {
                callback(data);
            } else {

                var partialDeps = [];

                partials.forEach(function (partial) {
                    if (partialDeps.indexOf(partial.src) === -1) {
                        partialDeps.push(partial.src);
                    }
                });

                // a different loaderFunction is used during the build process so partial would not be included in the final compiled file.
                var loaderFunction = (config && config.isBuild === true) ? loadDependenciesInBuild : loadDependencies;
                var prefix = (config && config.isBuild === true) ? '' : 'text!';

                partialDeps = partialDeps.map(function (partial) {
                    return prefix + partial;
                });

                loaderFunction.call(this, partialDeps, function (d) {
                    partials.forEach(function (tag) {
                        var html = prepareMarkup(d[prefix + tag.src]);
                        html = fixPaths(html, getBasePath(tag.src));
                        data.html = data.html.replace(tag.html, html);
                    });
                    load.call(this);
                }, parentRequire, config);

            }
        }

        load.call(this);
    }


    function preProcess(html, cb, parentRequire, config) {

        // This function will resolve custom elements, e-links and e-partials recursively.
        // After this point there will not be any of this tags, all will be regular html and e-elements.
        // data.html is the final html and data.imports the list of styles to import.
        resolveMarkup.call(this, html, parentRequire, function (data) {
            var styles = [];
            var deps = data.imports.map(function (tag) {
                return tag.src;
            });

            var extractedDeps = extractDependencies(data.html);

            extractedDeps.forEach(function (extractedDep) {
                if (deps.indexOf(extractedDep) === -1) {
                    deps.push(extractedDep);
                }
            });

            deps = deps.map(function (dep) {
                var newDep = dep;
                if (dep.indexOf('.less') !== -1) {
                    newDep = 'styles!' + newDep;
                    styles.push(newDep);
                }
                return newDep;
            });

            cb({
                html: data.html,
                styles: styles,
                dependencies: deps,
                handlebars: hasHandlebars(data.html)
            });
        }.bind(this), config);

    }

    function hasHandlebars(html) {
        return /{{.+?}}/g.test(html);
    }

    function extractDependencies(html) {
        var dependencies = [];
        var components = [];

        // check for elements
        var elementRegEx = new RegExp('<' + constants.TAG_NAME + '\\b.*?src=("|\')([^("|\')]+)("|\')', "ig");
        var elements = html.match(elementRegEx);
        if (elements && elements.length > 0) {
            components = components.concat(elements);
        }
        components.forEach(function (comp) {
            var start = comp.indexOf('src=') + 5;
            var src = comp.substring(start, comp.length - 1);
            if (dependencies.indexOf(src) === -1) {
                dependencies.push(src);
            }
        });
        return dependencies;
    }

});

