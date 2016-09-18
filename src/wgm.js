/*!
 * AUGE Widget Manager v.1.0.0
 * (c) 2016 AUGE SD, Andrey Anufriev <aia@auge.in.ua>
 * Distributed under MIT license.
 */

'use strict';

import { VERSION } from './lib/core/constants';

import {
	hooks as manager,
	setHookCallback
} from './lib/utils/hooks';

manager.version = VERSION;

import {
	foo,
	is,
	proto           as fn,
	getInstance     as currentInstance
} from './lib/core/core';

setHookCallback(currentInstance);

/*
 import {
 defineLocale,
 updateLocale,
 getSetGlobalLocale as locale,
 getLocale          as localeData,
 listLocales        as locales
 } from './lib/locale/locale';
 */

/*
 manager.fn           = fn;
 manager.is           = is;
 manager.locale       = locale;
 manager.localeData   = localeData;
 manager.locales      = locales;
 manager.defineLocale = defineLocale;
 manager.updateLocale = updateLocale;
 */

manager.coreFoo          = foo;

manager.prototype = fn;

export default manager;
