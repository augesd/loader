'use strict';

import { VERSION } from './lib/core/constants';

import {
	hooks as loader,
	setHookCallback
} from './lib/utils/hooks';

loader.version = VERSION;

import {
	foo,
	isLoader,
	loaderPrototype as fn,
	createLocal     as local
} from './lib/core/core';

import {
	defineLocale,
	updateLocale,
	getSetGlobalLocale as locale,
	getLocale          as localeData,
	listLocales        as locales
} from './lib/locale/locale';


setHookCallback(local);

/*
loader.fn           = fn;
loader.isLoader     = isLoader;
loader.locale       = locale;
loader.localeData   = localeData;
loader.locales      = locales;
loader.defineLocale = defineLocale;
loader.updateLocale = updateLocale;
loader.foo          = foo;
*/
loader.prototype    = fn;

export default loader;
