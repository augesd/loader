/*!
 * AUGE Widget Manager v1.0.0 (2016-12-10, 17:16)
 * (c) 2016 AUGE SD, Andrey Anufriev <aia@auge.in.ua>
 * Distributed under MIT license.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.wgm = factory());
}(this, (function () { 'use strict';

  var VERSION = '1.0.0';
  var LOCALE = 'en';

  var hookCallback;

  function hooks() {
      return hookCallback.apply(null, arguments);
  }

  // This is done to register the method called with wgm()
  // without creating circular dependencies.
  function setHookCallback(callback) {
      hookCallback = callback;
  }

  function isUndefined(input) {
      return input === void 0;
  }

  var handlerReadOnly = {
  	set: function (target, key, value, receiver) {
  		var msg = hooks.t('errors.readOnly');
  		throw new Error(msg);
  	}
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();







  var get$1 = function get$1(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get$1(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };











  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };



  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  var settings = [];
  //settings.push('locale');

  function applyConfig(to, from) {
  	console.info('constructor.applyConfig', arguments);
  	var i = void 0,
  	    prop = void 0,
  	    val = void 0;

  	if (!isUndefined(from._is)) {
  		to._is = from._is;
  	}

  	try {
  		to._params = new Proxy(from._input, handlerReadOnly);
  	} catch (e) {
  		// Fucking IE!!!
  		to._params = from._input;
  	}

  	if (settings.length > 0) {
  		for (i in settings) {
  			prop = settings[i];
  			val = from[prop];
  			if (!isUndefined(val)) {
  				to[prop] = val;
  			}
  		}
  	}

  	return to;
  }

  // Manager prototype object
  var Manager = function Manager(config) {
  	classCallCheck(this, Manager);

  	applyConfig(this, config);
  };

  function is(obj) {
  	return obj instanceof Manager || obj != null && obj._is != null;
  }

  var Wrapper = function Wrapper(selector) {
  	classCallCheck(this, Wrapper);

  	this.selector = selector;
  };

  function scan(force) {
  	var _this = this;

  	// Return the promise

  	return new Promise(function (resolve, reject) {
  		if (!_this.selector) reject(hooks.t('errors.wrongSelector'));

  		var res = hooks.$(_this.selector + (force ? '' : ':not([data-ready="1"])'));
  		res.data('ready', '1');

  		resolve(res);
  	});
  }

  /**
   * The type of messages our frames our sending
   * @type {String}
   */
  var MESSAGE_TYPE = 'application/x-postmate-v1+json';

  /**
   * A unique message ID that is used to ensure responses are sent to the correct requests
   * @type {Number}
   */
  var _messageId = 0;

  /**
   * Increments and returns a message ID
   * @return {Number} A unique ID for a message
   */
  function messageId() {
    return ++_messageId;
  }

  /**
   * Postmate logging function that enables/disables via config
   * @param  {Object} ...args Rest Arguments
   */
  function log() {
    var _console;

    if (!Postmate.debug) return;
    (_console = console).log.apply(_console, arguments); // eslint-disable-line no-console
  }

  /**
   * Takes a URL and returns the origin
   * @param  {String} url The full URL being requested
   * @return {String}     The URLs origin
   */
  function resolveOrigin(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.origin || a.protocol + '//' + a.hostname;
  }

  /**
   * Ensures that a message is safe to interpret
   * @param  {Object} message       The postmate message being sent
   * @param  {String} allowedOrigin The whitelisted origin
   * @return {Boolean}
   */
  function sanitize(message, allowedOrigin) {
    if (message.origin !== allowedOrigin) return false;
    if (typeof message.data !== 'object') return false;
    if (!('postmate' in message.data)) return false;
    if (message.data.type !== MESSAGE_TYPE) return false;
    if (!{
      'handshake-reply': 1,
      call: 1,
      emit: 1,
      reply: 1,
      request: 1
    }[message.data.postmate]) return false;
    return true;
  }

  /**
   * Takes a model, and searches for a value by the property
   * @param  {Object} model     The dictionary to search against
   * @param  {String} property  A path within a dictionary (i.e. 'window.location.href')
   * @param  {Object} data      Additional information from the get request that is
   *                            passed to functions in the child model
   * @return {Promise}
   */
  function resolveValue(model, property) {
    var unwrappedContext = typeof model[property] === 'function' ? model[property]() : model[property];
    return Postmate.Promise.resolve(unwrappedContext);
  }

  /**
   * Composes an API to be used by the parent
   * @param {Object} info Information on the consumer
   */

  var ParentAPI = function () {
    function ParentAPI(info) {
      var _this = this;

      classCallCheck(this, ParentAPI);

      this.parent = info.parent;
      this.frame = info.frame;
      this.child = info.child;
      this.childOrigin = info.childOrigin;

      this.events = {};

      log('Parent: Registering API');
      log('Parent: Awaiting messages...');

      this.listener = function (e) {
        var _ref = ((e || {}).data || {}).value || {};

        var data = _ref.data;
        var name = _ref.name;

        if (e.data.postmate === 'emit') {
          log('Parent: Received event emission: ' + name);
          if (name in _this.events) {
            _this.events[name].call(_this, data);
          }
        }
      };

      this.parent.addEventListener('message', this.listener, false);
      log('Parent: Awaiting event emissions from Child');
    }

    ParentAPI.prototype.get = function get(property) {
      var _this2 = this;

      return new Postmate.Promise(function (resolve) {
        // Extract data from response and kill listeners
        var uid = messageId();
        var transact = function (e) {
          if (e.data.uid === uid && e.data.postmate === 'reply') {
            _this2.parent.removeEventListener('message', transact, false);
            resolve(e.data.value);
          }
        };

        // Prepare for response from Child...
        _this2.parent.addEventListener('message', transact, false);

        // Then ask child for information
        _this2.child.postMessage({
          postmate: 'request',
          type: MESSAGE_TYPE,
          property: property,
          uid: uid
        }, _this2.childOrigin);
      });
    };

    ParentAPI.prototype.call = function call(property, data) {
      // Send information to the child
      this.child.postMessage({
        postmate: 'call',
        type: MESSAGE_TYPE,
        property: property,
        data: data
      }, this.childOrigin);
    };

    ParentAPI.prototype.on = function on(eventName, callback) {
      this.events[eventName] = callback;
    };

    ParentAPI.prototype.destroy = function destroy() {
      log('Parent: Destroying Postmate instance');
      window.removeEventListener('message', this.listener, false);
      this.frame.parentNode.removeChild(this.frame);
    };

    return ParentAPI;
  }();

  /**
   * Composes an API to be used by the child
   * @param {Object} info Information on the consumer
   */


  var ChildAPI = function () {
    function ChildAPI(info) {
      var _this3 = this;

      classCallCheck(this, ChildAPI);

      this.model = info.model;
      this.parent = info.parent;
      this.parentOrigin = info.parentOrigin;
      this.child = info.child;

      log('Child: Registering API');
      log('Child: Awaiting messages...');

      this.child.addEventListener('message', function (e) {
        if (!sanitize(e, _this3.parentOrigin)) return;
        log('Child: Received request', e.data);

        var _e$data = e.data;
        var property = _e$data.property;
        var uid = _e$data.uid;
        var data = _e$data.data;


        if (e.data.postmate === 'call') {
          if (property in _this3.model && typeof _this3.model[property] === 'function') {
            _this3.model[property].call(_this3, data);
          }
          return;
        }

        // Reply to Parent
        resolveValue(_this3.model, property).then(function (value) {
          return e.source.postMessage({
            property: property,
            postmate: 'reply',
            type: MESSAGE_TYPE,
            uid: uid,
            value: value
          }, e.origin);
        });
      });
    }

    ChildAPI.prototype.emit = function emit(name, data) {
      log('Child: Emitting Event "' + name + '"', data);
      this.parent.postMessage({
        postmate: 'emit',
        type: MESSAGE_TYPE,
        value: {
          name: name,
          data: data
        }
      }, this.parentOrigin);
    };

    return ChildAPI;
  }();

  /**
    * The entry point of the Parent.
   * @type {Class}
   */


  var Postmate = function () {

    /**
     * Sets options related to the Parent
     * @param {Object} userOptions The element to inject the frame into, and the url
     * @return {Promise}
     */
    function Postmate(userOptions) {
      classCallCheck(this, Postmate);
      var container = userOptions.container;
      var url = userOptions.url;
      var model = userOptions.model;


      this.parent = window;
      this.frame = document.createElement('iframe');
      (container || document.body).appendChild(this.frame);
      this.child = this.frame.contentWindow || this.frame.contentDocument.parentWindow;
      this.model = model || {};

      return this.sendHandshake(url);
    }

    /**
     * Begins the handshake strategy
     * @param  {String} url The URL to send a handshake request to
     * @return {Promise}     Promise that resolves when the handshake is complete
     */


    // Internet Explorer craps itself


    Postmate.prototype.sendHandshake = function sendHandshake(url) {
      var _this4 = this;

      var childOrigin = resolveOrigin(url);
      return new Postmate.Promise(function (resolve, reject) {
        var reply = function (e) {
          if (!sanitize(e, childOrigin)) return false;
          if (e.data.postmate === 'handshake-reply') {
            log('Parent: Received handshake reply from Child');
            _this4.parent.removeEventListener('message', reply, false);
            _this4.childOrigin = e.origin;
            log('Parent: Saving Child origin', _this4.childOrigin);
            return resolve(new ParentAPI(_this4));
          }

          // Might need to remove since parent might be receiving different messages
          // from different hosts
          log('Parent: Invalid handshake reply');
          return reject('Failed handshake');
        };

        _this4.parent.addEventListener('message', reply, false);

        var loaded = function () {
          log('Parent: Sending handshake', { childOrigin: childOrigin });
          setTimeout(function () {
            return _this4.child.postMessage({
              postmate: 'handshake',
              type: MESSAGE_TYPE,
              model: _this4.model
            }, childOrigin);
          }, 0);
        };

        if (_this4.frame.attachEvent) {
          _this4.frame.attachEvent("onload", loaded);
        } else {
          _this4.frame.onload = loaded;
        }

        log('Parent: Loading frame', { url: url });
        _this4.frame.src = url;
      });
    };

    return Postmate;
  }();

  /**
   * The entry point of the Child
   * @type {Class}
   */


  Postmate.debug = false;

  Postmate.Promise = function () {
    try {
      return window ? window.Promise : Promise;
    } catch (e) {
      return null;
    }
  }();

  Postmate.Model = function () {

    /**
     * Initializes the child, model, parent, and responds to the Parents handshake
     * @param {Object} model Hash of values, functions, or promises
     * @return {Promise}       The Promise that resolves when the handshake has been received
     */
    function Model(model) {
      classCallCheck(this, Model);

      this.child = window;
      this.model = model;
      this.parent = this.child.parent;
      return this.sendHandshakeReply();
    }

    /**
     * Responds to a handshake initiated by the Parent
     * @return {Promise} Resolves an object that exposes an API for the Child
     */


    Model.prototype.sendHandshakeReply = function sendHandshakeReply() {
      var _this5 = this;

      return new Postmate.Promise(function (resolve, reject) {
        var shake = function (e) {
          if (e.data.postmate === 'handshake') {
            log('Child: Received handshake from Parent');
            _this5.child.removeEventListener('message', shake, false);
            log('Child: Sending handshake reply to Parent');
            e.source.postMessage({
              postmate: 'handshake-reply',
              type: MESSAGE_TYPE
            }, e.origin);
            _this5.parentOrigin = e.origin;

            // Extend model with the one provided by the parent
            var defaults$$1 = e.data.model;
            if (defaults$$1) {
              var keys = Object.keys(defaults$$1);
              for (var i = 0; i < keys.length; i++) {
                if (defaults$$1.hasOwnProperty(keys[i])) {
                  _this5.model[keys[i]] = defaults$$1[keys[i]];
                }
              }
              log('Child: Inherited and extended model from Parent');
            }

            log('Child: Saving Parent origin', _this5.parentOrigin);
            return resolve(new ChildAPI(_this5));
          }
          return reject('Handshake Reply Failed');
        };
        _this5.child.addEventListener('message', shake, false);
      });
    };

    return Model;
  }();

  function postMessage(options) {
  	return new Postmate(options);
  }

  var protoWrapper = Wrapper.prototype;

  protoWrapper.scan = scan;
  protoWrapper.pm = postMessage;

  function wrapper(selector) {
  	return new Wrapper(selector);
  }

  var proto = Manager.prototype;

  proto.wrapper = wrapper;

  function isArray(input) {
      return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
      return Object.prototype.toString.call(input) === '[object Object]';
  }

  function isObjectEmpty(obj) {
      var k;
      for (k in obj) {
          // even if its not own property I'd still call it non-empty
          return false;
      }
      return true;
  }

  // verify input values
  function prepareConfig(config) {
  	var input = config._input;

  	if (is(input)) {
  		return new Manager(input);
  	}

  	return config;
  }

  function defaultInstance(input) {
  	console.info('by-default.getInstance', input);
  	var c = {};

  	if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
  		input = undefined;
  	}

  	c._is = true;
  	c._input = input;

  	return new Manager(prepareConfig(c));
  }

  var EventEmitter = function EventEmitter() {
  	classCallCheck(this, EventEmitter);

  	this.listeners = new Map();
  };

  var SimpleDom = function (_EventEmitter) {
  	inherits(SimpleDom, _EventEmitter);

  	function SimpleDom(selector) {
  		classCallCheck(this, SimpleDom);

  		//this.el = [];

  		var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

  		if (typeof selector === 'object') {
  			_this.byEl(selector);
  		} else {
  			_this.bySelector(selector);
  		}
  		return _this;
  	}

  	SimpleDom.prototype.byEl = function byEl(selector) {
  		this.el = [selector];
  		return this;
  	};

  	SimpleDom.prototype.bySelector = function bySelector(selector) {
  		this.el = document.querySelectorAll(selector);
  		return this;
  	};

  	SimpleDom.prototype.byClass = function byClass(selector) {
  		this.el = document.getElementsByClassName(selector);
  		return this;
  	};

  	SimpleDom.prototype.byID = function byID(selector) {
  		this.el = document.getElementById(selector);
  		return this;
  	};

  	createClass(SimpleDom, [{
  		key: 'element',
  		get: function () {
  			return [].concat(this.el);
  		}
  	}, {
  		key: 'length',
  		get: function () {
  			return this.el ? this.el.length : 0;
  		}
  	}]);
  	return SimpleDom;
  }(EventEmitter);

  function addListener(label, callback) {
  	if (!this.listeners.has(label)) this.listeners.set(label, []);
  	this.listeners.get(label).push(callback);
  }

  function isFunction(input) {
      return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function removeListener(label, callback) {
  	var listeners = this.listeners.get(label),
  	    index = void 0;

  	if (listeners && listeners.length) {
  		index = listeners.reduce(function (i, listener, index) {
  			return isFunction(listener) && listener === callback ? i = index : i;
  		}, -1);

  		if (index > -1) {
  			listeners.splice(index, 1);
  			this.listeners.set(label, listeners);
  			return true;
  		}
  	}
  	return false;
  }

  function emit$1(label) {
  	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
  		args[_key - 1] = arguments[_key];
  	}

  	var listeners = this.listeners.get(label);

  	if (listeners && listeners.length) {
  		listeners.forEach(function (listener) {
  			listener.apply(undefined, args);
  		});
  		return true;
  	}
  	return false;
  }

  function find(selector) {
  	return this.el.querySelectorAll(selector);
  }

  function siblings() {
  	var _this = this;

  	[].filter.call(this.el.parentNode.children, function (child) {
  		return child !== _this.el;
  	});
  }

  function prev() {
  	return this.el.previousElementSibling;
  }

  function next() {
  	return this.el.nextElementSibling;
  }

  function closest(selector) {
  	var el = this.el;

  	// Нативно - Only latest, NO IE
  	if (el.closest) return el.closest(selector);

  	// Нативно - IE10+
  	var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  	while (el) {
  		if (matchesSelector.call(el, selector)) {
  			return el;
  		} else {
  			el = el.parentElement;
  		}
  	}
  	return null;
  }

  function parentsUntil(selector, filter) {
  	var el = this.el;
  	var result = [];
  	var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  	// Совпадать начиная от родителя
  	el = el.parentElement;
  	while (el && !matchesSelector.call(el, selector)) {
  		if (!filter) {
  			result.push(el);
  		} else {
  			if (matchesSelector.call(el, filter)) {
  				result.push(el);
  			}
  		}
  		el = el.parentElement;
  	}
  	return result;
  }

  function val(value) {
  	var el = this.el[0];
  	if (!el) return undefined;

  	if (isUndefined(value)) return el.value;

  	el.value = value;
  	return this;
  }

  function attr(name, value) {
  	if (!this.el) return undefined;

  	if (isUndefined(value)) return this.el[0].getAttribute(name);

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.setAttribute(name, value);
  	}

  	return this;
  }

  function data(name, value) {
  	return this.attr('data-' + name, value);
  }

  function css(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	if (isObject(value)) {
  		for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  			var _ref;

  			if (_isArray) {
  				if (_i >= _iterator.length) break;
  				_ref = _iterator[_i++];
  			} else {
  				_i = _iterator.next();
  				if (_i.done) break;
  				_ref = _i.value;
  			}

  			var el = _ref;

  			//let newStyles = [];
  			for (var prop in value) {
  				var val = value[prop];
  				//newStyles.push(prop+':'+val);
  				el.style[prop] = val;
  			}
  			//el.setAttribute('style', newStyles.join(';'));
  		}
  		return this;
  	}

  	return window.getComputedStyle(this.el[0], null).getPropertyValue(value);
  }

  function arrayUnique(arr) {
  	var u = {},
  	    a = [],
  	    v = void 0;
  	for (var i = 0, l = arr.length; i < l; ++i) {
  		v = String(arr[i]).trim();
  		if (!v) continue;
  		if (u.hasOwnProperty(v)) continue;
  		a.push(v);
  		u[v] = 1;
  	}
  	return a;
  }

  function addClass(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		var list = value.split(' ');
  		for (var _iterator2 = list, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  			var _ref2;

  			if (_isArray2) {
  				if (_i2 >= _iterator2.length) break;
  				_ref2 = _iterator2[_i2++];
  			} else {
  				_i2 = _iterator2.next();
  				if (_i2.done) break;
  				_ref2 = _i2.value;
  			}

  			var className = _ref2;

  			if (el.classList) {
  				el.classList.add(className);
  			} else {
  				var classesList = el.className.split(' ');
  				var classesAdd = String(className).replace(/[\n\t]/g, ' ').split(' ');
  				for (var i = 0; i < classesAdd.length; i++) {
  					if (classesList.indexOf(classesAdd[i]) < 0) classesList.push(classesAdd[i]);
  				}
  				el.className = arrayUnique(classesList).join(' ');
  			}
  		}
  	}

  	return this;
  }

  function hasClass(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	var el = this.el[0],
  	    className = value;

  	if (el.classList) {

  		return el.classList.contains(className);
  	} else {

  		return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
  	}
  }

  function removeClass(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		var list = value.split(' ');
  		for (var _iterator2 = list, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  			var _ref2;

  			if (_isArray2) {
  				if (_i2 >= _iterator2.length) break;
  				_ref2 = _iterator2[_i2++];
  			} else {
  				_i2 = _iterator2.next();
  				if (_i2.done) break;
  				_ref2 = _i2.value;
  			}

  			var className = _ref2;

  			if (el.classList) {
  				el.classList.remove(className);
  			} else {
  				var classesList = el.className.split(' ');
  				var classesRemove = String(className).replace(/[\n\t]/g, ' ').split(' '),
  				    classesNew = [];
  				for (var i = 0; i < classesList.length; i++) {
  					if (classesRemove.indexOf(classesList[i]) < 0) classesNew.push(classesList[i]);
  				}
  				el.className = arrayUnique(classesNew).join(' ');
  			}
  		}
  	}

  	return this;
  }

  function toggleClass(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		var list = value.split(' ');
  		for (var _iterator2 = list, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  			var _ref2;

  			if (_isArray2) {
  				if (_i2 >= _iterator2.length) break;
  				_ref2 = _iterator2[_i2++];
  			} else {
  				_i2 = _iterator2.next();
  				if (_i2.done) break;
  				_ref2 = _i2.value;
  			}

  			var className = _ref2;

  			if (el.classList) {

  				el.classList.toggle(className);
  			} else {

  				var classesList = el.className.split(' ');

  				if (el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)) {

  					var classesRemove = String(className).replace(/[\n\t]/g, ' ').split(' '),
  					    classesNew = [];
  					for (var i = 0; i < classesList.length; i++) {
  						if (classesRemove.indexOf(classesList[i]) < 0) classesNew.push(classesList[i]);
  					}
  					el.className = arrayUnique(classesNew).join(' ');
  				} else {

  					var classesAdd = String(className).replace(/[\n\t]/g, ' ').split(' ');
  					for (var _i3 = 0; _i3 < classesAdd.length; _i3++) {
  						if (classesList.indexOf(classesAdd[_i3]) < 0) classesList.push(classesAdd[_i3]);
  					}

  					el.className = arrayUnique(classesList).join(' ');
  				}
  			}
  		}
  	}

  	return this;
  }

  function height(mode) {
  	var el = this.el[0];
  	if (!el) return undefined;

  	var res = 0;

  	switch (mode) {
  		case 'client':
  			res = el.clientHeight;
  			break;
  		case 'native':
  			var styles = window.getComputedStyle(el);
  			var _height = el.offsetHeight;
  			var borderTopWidth = parseFloat(styles.borderTopWidth);
  			var borderBottomWidth = parseFloat(styles.borderBottomWidth);
  			var paddingTop = parseFloat(styles.paddingTop);
  			var paddingBottom = parseFloat(styles.paddingBottom);
  			res = _height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
  			break;
  		default:
  			res = el.getBoundingClientRect().height;
  	}

  	return res;
  }

  function width(mode) {
  	var el = this.el[0];
  	if (!el) return undefined;

  	var res = 0;

  	switch (mode) {
  		case 'client':
  			res = el.clientWidth;
  			break;
  		case 'native':
  			var styles = window.getComputedStyle(el);
  			var _width = el.offsetWidth;
  			var borderLeftWidth = parseFloat(styles.borderLeftWidth);
  			var borderRightWidth = parseFloat(styles.borderRightWidth);
  			var paddingLeft = parseFloat(styles.paddingLeft);
  			var paddingRight = parseFloat(styles.paddingRight);
  			res = _width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
  			break;
  		default:
  			res = el.getBoundingClientRect().width;
  	}

  	return res;
  }

  function position() {
  	var el = this.el[0];
  	if (!el) return undefined;

  	return { left: el.offsetLeft, top: el.offsetTop };
  }

  function offset() {
  	var el = this.el[0];
  	if (!el) return undefined;

  	var box = el.getBoundingClientRect();

  	return {
  		top: box.top + window.pageYOffset - document.documentElement.clientTop,
  		left: box.left + window.pageXOffset - document.documentElement.clientLeft
  	};
  }

  function remove() {
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.parentNode.removeChild(el);
  	}

  	return this;
  }

  function text(value) {
  	if (!this.el) return undefined;

  	if (isUndefined(value)) {
  		var res = [];
  		for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  			var _ref;

  			if (_isArray) {
  				if (_i >= _iterator.length) break;
  				_ref = _iterator[_i++];
  			} else {
  				_i = _iterator.next();
  				if (_i.done) break;
  				_ref = _i.value;
  			}

  			var el = _ref;

  			res.push(el.textContent);
  		}
  		return res.join('');
  	} else {
  		for (var _iterator2 = this.el, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  			var _ref2;

  			if (_isArray2) {
  				if (_i2 >= _iterator2.length) break;
  				_ref2 = _iterator2[_i2++];
  			} else {
  				_i2 = _iterator2.next();
  				if (_i2.done) break;
  				_ref2 = _i2.value;
  			}

  			var _el = _ref2;

  			_el.textContent = value;
  		}
  	}

  	return this;
  }

  function html(value) {
  	if (!this.el) return undefined;

  	if (isUndefined(value)) {
  		var res = [];
  		for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  			var _ref;

  			if (_isArray) {
  				if (_i >= _iterator.length) break;
  				_ref = _iterator[_i++];
  			} else {
  				_i = _iterator.next();
  				if (_i.done) break;
  				_ref = _i.value;
  			}

  			var el = _ref;

  			res.push(el.innerHTML);
  		}
  		return res.join('');
  	} else {
  		for (var _iterator2 = this.el, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  			var _ref2;

  			if (_isArray2) {
  				if (_i2 >= _iterator2.length) break;
  				_ref2 = _iterator2[_i2++];
  			} else {
  				_i2 = _iterator2.next();
  				if (_i2.done) break;
  				_ref2 = _i2.value;
  			}

  			var _el = _ref2;

  			_el.innerHTML = value;
  		}
  	}

  	return this;
  }

  function append(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.insertAdjacentHTML('beforeend', value);
  	}

  	return this;
  }

  function prepend(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.insertAdjacentHTML('afterbegin', value);
  	}

  	return this;
  }

  function insertBefore(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	var el = this.el[0];
  	if (!el) return undefined;

  	var target = document.querySelector(value);
  	target.parentNode.insertBefore(el, target);

  	return this;
  }

  function insertAfter(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	var el = this.el[0];
  	if (!el) return undefined;

  	var target = document.querySelector(value);
  	target.parentNode.insertBefore(el, target.nextSibling);

  	return this;
  }

  function is$1(value) {
  	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	var el = this.el[0];
  	if (!el) return undefined;

  	return el.matches(value);
  }

  function on$1(eventName, eventHandler) {
  	if (isUndefined(eventName) || isUndefined(eventHandler)) throw new Error(hooks.t('errors.paramsRequired'));

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.addEventListener(eventName, eventHandler);
  	}

  	return this;
  }

  function off(eventName, eventHandler) {
  	if (isUndefined(eventName) || isUndefined(eventHandler)) throw new Error(hooks.t('errors.paramsRequired'));

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.removeEventListener(eventName, eventHandler);
  	}

  	return this;
  }

  function trigger(eventName, eventData) {
  	if (isUndefined(eventName)) throw new Error(hooks.t('errors.paramsRequired'));

  	if (window.CustomEvent) {
  		var _event = new CustomEvent(eventName, { detail: eventData });
  	} else {
  		var _event2 = document.createEvent('CustomEvent');
  		_event2.initCustomEvent(eventName, true, true, eventData);
  	}

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.dispatchEvent(event);
  	}

  	return this;
  }

  function once(eventName, eventHandler) {
  	if (isUndefined(eventName) || isUndefined(eventHandler)) throw new Error(hooks.t('errors.paramsRequired'));

  	var handler = function () {
  		eventHandler.apply(this, arguments);
  		this.removeEventListener(eventName, handler);
  	};

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.addEventListener(eventName, handler);
  	}

  	return this;
  }

  function each(handler) {
  	if (!isFunction(handler)) throw new Error(hooks.t('errors.paramsRequired'));
  	if (!this.el) return undefined;

  	var idx = 0;
  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		handler.call(this, idx, el);
  		idx++;
  	}

  	return this;
  }

  function empty() {
  	if (!this.el) return undefined;

  	for (var _iterator = this.el, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  		var _ref;

  		if (_isArray) {
  			if (_i >= _iterator.length) break;
  			_ref = _iterator[_i++];
  		} else {
  			_i = _iterator.next();
  			if (_i.done) break;
  			_ref = _i.value;
  		}

  		var el = _ref;

  		el.innerHTML = '';
  	}

  	return this;
  }

  var protoSimpleDom = SimpleDom.prototype;

  protoSimpleDom.addListener = addListener;
  protoSimpleDom.removeListener = removeListener;
  protoSimpleDom.emit = emit$1;

  protoSimpleDom.find = find;
  protoSimpleDom.siblings = siblings;
  protoSimpleDom.prev = prev;
  protoSimpleDom.next = next;
  protoSimpleDom.closest = closest;
  protoSimpleDom.parentsUntil = parentsUntil;
  protoSimpleDom.val = val;
  protoSimpleDom.attr = attr;
  protoSimpleDom.data = data;
  protoSimpleDom.css = css;
  protoSimpleDom.addClass = addClass;
  protoSimpleDom.hasClass = hasClass;
  protoSimpleDom.removeClass = removeClass;
  protoSimpleDom.toggleClass = toggleClass;
  protoSimpleDom.height = height;
  protoSimpleDom.width = width;
  protoSimpleDom.position = position;
  protoSimpleDom.offset = offset;
  protoSimpleDom.remove = remove;
  protoSimpleDom.text = text;
  protoSimpleDom.html = html;
  protoSimpleDom.append = append;
  protoSimpleDom.prepend = prepend;
  protoSimpleDom.insertBefore = insertBefore;
  protoSimpleDom.insertAfter = insertAfter;
  protoSimpleDom.is = is$1;
  protoSimpleDom.on = on$1;
  protoSimpleDom.off = off;
  protoSimpleDom.trigger = trigger;
  protoSimpleDom.once = once;
  protoSimpleDom.each = each;
  protoSimpleDom.empty = empty;

  function dom(selector) {
  	if (typeof selector === 'undefined') throw new Error(hooks.t('errors.wrongSelector'));
  	if (typeof window.jQuery !== 'undefined') return window.jQuery.apply(window.jQuery, [selector]);
  	return new SimpleDom(selector);
  }

  function _size() {
  	return this._data.size;
  }

  var MapObject = function () {
  	function MapObject() {
  		classCallCheck(this, MapObject);

  		this._data = new Map();
  	}

  	createClass(MapObject, [{
  		key: 'size',
  		get: function () {
  			return _size();
  		}
  	}]);
  	return MapObject;
  }();

  var Locales = function (_MapObject) {
    inherits(Locales, _MapObject);

    function Locales() {
      classCallCheck(this, Locales);
      return possibleConstructorReturn(this, _MapObject.apply(this, arguments));
    }

    return Locales;
  }(MapObject);

  function clear() {
      return this._data.clear();
  }

  function deleteKey(key) {
      return this._data.delete(key);
  }

  function entries() {
      return this._data.entries();
  }

  function forEach(callback) {
      return this._data.forEach(callback);
  }

  function has(key) {
      return this._data.has(key);
  }

  function keys() {
      return this._data.keys();
  }

  function set$1(key, value) {
  	return this._data.set(key, value);
  }

  function values() {
      return this._data.values();
  }

  var Locale = function (_MapObject) {
  	inherits(Locale, _MapObject);

  	function Locale(data) {
  		classCallCheck(this, Locale);

  		var _this = possibleConstructorReturn(this, _MapObject.call(this));

  		if (data) {
  			_this.update(data);
  		}
  		return _this;
  	}

  	return Locale;
  }(MapObject);

  function add(key, value) {
  	if (!key || !value || this.has(key)) {
  		return false;
  	}
  	this.set(key, new Locale(value));

  	if (!hooks.locale) {
  		hooks.locale = key;
  	}
  }

  function get$2(key) {
  	if (!this._data.has(key)) {
  		this._data.set(key, new Locale());
  	}
  	return this._data.get(key);
  }

  var protoLocales = Locales.prototype;

  //import get from '../map-object/get';
  protoLocales._size = _size;
  protoLocales.clear = clear;
  protoLocales.delete = deleteKey;
  protoLocales.entries = entries;
  protoLocales.forEach = forEach;
  protoLocales.has = has;
  //protoLocales.get     = get;
  protoLocales.keys = keys;
  protoLocales.set = set$1;
  protoLocales.values = values;
  protoLocales.add = add;
  protoLocales.get = get$2;

  function get$3(key) {
      return this._data.get(key);
  }

  function update(value) {
  	for (var key in value) {
  		this._data.set(key, value[key]);
  	}
  	return true;
  }

  var protoLocale = Locale.prototype;

  protoLocale._size = _size;
  protoLocale.clear = clear;
  protoLocale.delete = deleteKey;
  protoLocale.entries = entries;
  protoLocale.forEach = forEach;
  protoLocale.has = has;
  protoLocale.get = get$3;
  protoLocale.keys = keys;
  protoLocale.set = set$1;
  protoLocale.values = values;
  protoLocale.update = update;

  var Channels = function (_MapObject) {
    inherits(Channels, _MapObject);

    function Channels() {
      classCallCheck(this, Channels);
      return possibleConstructorReturn(this, _MapObject.apply(this, arguments));
    }

    return Channels;
  }(MapObject);

  var Channel = function (_EventEmitter) {
    inherits(Channel, _EventEmitter);

    function Channel() {
      classCallCheck(this, Channel);
      return possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
    }

    return Channel;
  }(EventEmitter);

  function add$1(key, value) {
  	if (!key || !value || this.has(key)) {
  		return false;
  	}
  	this.set(key, new Channel(value));
  }

  function get$4(key) {
  	if (!this._data.has(key)) {
  		this._data.set(key, new Channel());
  	}
  	return this._data.get(key);
  }

  var protoChannels = Channels.prototype;

  //import get from '../map-object/get';
  protoChannels._size = _size;
  protoChannels.clear = clear;
  protoChannels.delete = deleteKey;
  protoChannels.entries = entries;
  protoChannels.forEach = forEach;
  protoChannels.has = has;
  //protoChannels.get     = get;
  protoChannels.keys = keys;
  protoChannels.set = set$1;
  protoChannels.values = values;
  protoChannels.add = add$1;
  protoChannels.get = get$4;

  var protoChannel = Channel.prototype;

  protoChannel.addListener = addListener;
  protoChannel.removeListener = removeListener;
  protoChannel.emit = emit$1;

  // main data proxy
  var _dataProxy = new Map();

  function proxy(key) {
  	var curObj = void 0;
  	if (!_dataProxy.has(key)) {
  		switch (key) {
  			case 'locales':
  				curObj = new Locales();
  				_dataProxy.set(key, curObj);
  				if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 0) {
  					curObj.set(arguments.length <= 1 ? undefined : arguments[1], new Locale());
  				}
  				break;
  			case 'channels':
  				curObj = new Channels();
  				_dataProxy.set(key, curObj);
  				if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 0) {
  					curObj.set(arguments.length <= 1 ? undefined : arguments[1], new Channel());
  				}
  				break;
  			default:
  				throw new Error('Wrong proxy name: ' + key);
  		}
  		if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 2) {
  			_dataProxy.get(key).get(arguments.length <= 1 ? undefined : arguments[1]).update(arguments.length <= 2 ? undefined : arguments[2]);
  		}
  	}

  	return _dataProxy.get(key);
  }

  function translate(key) {
  	var locale = hooks.proxy('locales').get(hooks.locale),
  	    res = locale ? locale.get(key) : null;

  	if (!res || isUndefined(res)) {
  		res = hooks.proxy('locales').get(LOCALE).get(key);
  	}
  	return res || '%' + key + '%';
  }

  // Side effect imports

  function prepareLocale() {
  	hooks.proxy('locales').add('en', {
  		'errors.readOnly': 'Please don\'t set properties on this object',
  		'errors.wrongSelector': 'Wrong selector',
  		'errors.paramsRequired': 'Params required',
  		'wgm': 'Widget Manager'
  	});
  }

  /*!
   * AUGE Widget Manager v.1.0.0
   * (c) 2016 AUGE SD, Andrey Anufriev <aia@auge.in.ua>
   * Distributed under MIT license.
   */

  hooks.version = VERSION;
  hooks.$ = dom;
  hooks.proxy = proxy;
  hooks.t = translate;

  setHookCallback(defaultInstance);

  prepareLocale();

  return hooks;

})));
