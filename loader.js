var drill                = function (target, src) {
	for (var paramName in target) {
		if (target.hasOwnProperty(paramName)) {
			var elTarget = target[paramName],
			    elSrc    = src[paramName];
			if (typeof elSrc != 'undefined') {
				if (elTarget instanceof Array) {
					target[paramName] = target[paramName].concat(elSrc);
				} else if (elTarget instanceof Object) {
					drill(elTarget, elSrc);
				} else {
					target[paramName] = elSrc;
				}
			}
		}
	}
};
var MainLoaderInitialize = function (id, params) {
	// default values
	var options = {
		app: null,
		dependencies: [],
		wrappers: null,
		debug: {
			wrapper: false,
			timing: false,
		}
	};
	if (params) drill(options, params);
	
	if (options.debug && options.debug.timing) console.time(id);
	
	var loadScripts = function (urls, id, callback) {
		if (!urls || (urls.length < 1)) callback();
		
		var required   = 0;
		var loadScript = function (url, id, callback) {
			var w = window,
			    d = document;
			if (d.getElementById(id)) if (callback) {
				return callback();
			} else {
				return;
			}
			var t     = 'script',
			    n     = d.getElementsByTagName(t)[0],
			    s     = d.createElement(t),
			    f     = function () {
				    n.parentNode.insertBefore(s, n);
			    };
			s.id      = id;
			s.type    = 'text/javascript';
			s.async   = 1;
			s.src     = url;
			s.onload  = callback;
			s.onerror = callback;
			if (w.opera == '[object Opera]') {
				d.addEventListener('DOMContentLoaded', f, false);
			} else {
				f();
			}
		};
		
		for (var idx = 0; idx < urls.length; idx++) {
			var url = urls[idx];
			required++;
			loadScript(
				url,
				required > 1 ? id+'-sub-' + required : id,
				function () {
					required--;
					if (required === 0) callback();
				}, onError
			);
		}
	};
	
	var onError   = function () {
		if (!options.wrappers) throw new Error('Wrappers is required.');
		if (!window.wgm) throw new Error('AUGE WGM is required.');
	};
	var onSuccess = function () {
		if (!window.wgm) throw new Error('AUGE WGM is required.');
		if (options.debug && options.debug.timing) console.time('WGM');
		
		var App = new window.wgm(options.app);
		
		for (var key in options.wrappers) {
			var descriptor = options.wrappers[key];
			if (descriptor && (descriptor.selector && descriptor.decorator)) {
				var wrapper = App.wrapper(descriptor.selector);
				delete descriptor.selector;
				wrapper.descriptor         = descriptor;
				wrapper.descriptor.id      = key;
				wrapper.descriptor.channel = wrapper.descriptor.channel || 'channel-' + key;
				wrapper.scan().then(descriptor.decorator.bind(wrapper, options));
			}
		}
		
		if (options.debug && options.debug.timing) console.timeEnd('WGM');
	};
	
	var run = function () {
		if (typeof window.wgm == 'undefined') if (!options.wgm) onError();
		onSuccess();
	};
	
	var init = function () {
		var bindWrappers = function (onOK, onErr) {
			if (window.wrappers) {
				options.wrappers = window.wrappers;
				return onOK ? onOK() : true;
			}
			return onErr ? onErr() : false;
		};
		bindWrappers();
		if (!options.wrappers) onError();
		if (typeof options.wrappers == 'string') {
			loadScripts(
				[options.wrappers],
				'wgm-wrappers',
				function () {
					bindWrappers(run, onError);
				}, onError
			);
		} else {
			run();
		}
	};
	
	if (options.dependencies.length > 0) {
		loadScripts(
			options.dependencies,
			'wgm-dependencies',
			function () {
				init();
			}, onError
		);
	} else {
		init();
	}
	
	if (options.debug && options.debug.timing) console.timeEnd(id);
};

(function (id) {
	var getQueryString = function (url, key, defaultValue) {
		if (!defaultValue) defaultValue = '';
		if (!url) return defaultValue;
		key         = key.replace(/[\[\]]/g, "\\$&");
		var regex   = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results || !results[2]) return defaultValue;
		return decodeURIComponent(results[2].replace(/\+/g, " ")) || defaultValue;
	};
	var getCurrentUrl  = function (mask) {
		var sc = document.getElementsByTagName('script');
		for (var idx = 0; idx < sc.length; idx++) {
			var s = sc.item(idx);
			if (s.src && s.src.match('/' + mask + '\.js')) {
				return s.src;
			}
		}
		return null;
	};
	
	var params = {
		app: null,
		dependencies: [],
		debug: {
			wrapper: true,
			timing: false,
		}
	};
	
	var optionsName = getQueryString(getCurrentUrl('loader'), 'opts');
	if (optionsName) drill(params, window[optionsName]);
	
	if (navigator.userAgent.search(/(MSIE\s|Trident\/|Edge\/)/) != -1) {
		params.dependencies.push('./vendor/babel-polyfill/browser-polyfill.js');
	}
	//params.dependencies.push('./vendor/auge/wgm.min.js');   // Url to AUGE WGM
	params.dependencies.push('./build/bundle.js');
	
	params.wrappers = './wrappers.js';
	
	MainLoaderInitialize(id, params);
	
}('Main Loader'));


/*
 var locales     = window.wgm.proxy('locales'),
 curLocale   = locales.entries().next().value;
 console.info('locales.'+curLocale[0]+'.entries.first',curLocale[1].entries().next().value);
 */

/*
 //console.info(window.performance.now());
 if (window.performance && window.performance.getEntries) {
 var excludeUrl = 'ya.ru',
 ready   = {},
 timings = [],
 entries = window.performance.getEntries();
 for (var i = 0; i < entries.length; ++i) {
 var entry = entries[i],
 url = entry.name ? entry.name.toLowerCase() : null,
 duration = Math.round(entry.duration),
 valid = url
 && (
 url.indexOf('.af.ua/') > -1
 || url.indexOf('localhost') > -1
 )
 && url.indexOf(excludeUrl) < 0
 && duration > 0
 && !(url in ready)
 ;
 
 valid && timings.push({
 url: url,
 ms: duration
 })
 }
 
 console.info('timings',timings);
 // .. save to ready
 
 }
 
 
 
 
 App.wrapper('.wdgt')
 .scan()
 .then(function(res) {
 // on successful
 console.info('successful',res);
 wrwdgt.trigger('someEvent',{foo:'bar'});
 }, function(error) {
 // on error
 console.info('error',arguments);
 })
 .catch(function(reason) {
 console.info('catch',reason);
 });
 */
