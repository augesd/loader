// Side effect imports
import './prototype';

import {
    getSetGlobalLocale,
    defineLocale,
    updateLocale,
    getLocale,
    listLocales
} from './locales';

export {
    getSetGlobalLocale,
    defineLocale,
    updateLocale,
    getLocale,
    listLocales
};

//import { deprecate } from '../utils/deprecate';
import { hooks } from '../utils/hooks';

//hooks.lang = deprecate('wgm.lang is deprecated. Use wgm.locale instead.', getSetGlobalLocale);

import './en';
