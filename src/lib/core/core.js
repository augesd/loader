// Side effect imports
import './prototype';

import { defaultInstance as currentInstance } from './by-default';

import proxy from './proxy';
import translate from './translate';

export {
	currentInstance,
	proxy,
	translate
};
