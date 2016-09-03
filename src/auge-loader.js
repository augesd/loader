//! auge-loader.js
//! version : 1.0.0
//! authors : Andrey Anufriev (AUGE SD)
//! license : MIT

'use strict';

import { VERSION } from './lib/core/constants';

import {
	hooks as loader,
	setHookCallback
} from './lib/utils/hooks';

loader.version = VERSION;

import {
	isLoader,
	loaderPrototype as fn
} from './lib/core/main';

import {
	defineLocale,
	updateLocale,
	getSetGlobalLocale as locale,
	getLocale          as localeData,
	listLocales        as locales
} from './lib/locale/locale';

loader.fn                   = fn;
loader.isLoader             = isLoader;
loader.locale               = locale;
loader.localeData           = localeData;
loader.locales              = locales;
loader.defineLocale         = defineLocale;
loader.updateLocale         = updateLocale;
loader.prototype            = fn;

export default loader;