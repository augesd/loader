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

import {
	dom,
	proxy,
	translate,
	currentInstance
} from './lib/core/core';

manager.version = VERSION;
manager.$       = dom;
manager.proxy   = proxy;
manager.t       = translate;

setHookCallback(currentInstance);

import prepareLocale from './lib/core/by-default-locale';
prepareLocale();

//import '../vendor/perfnow/perfnow.min';

export default manager;
