import { Locale } from './constructor';

var proto = Locale.prototype;

import { set } from './set';
proto.set = set;

import { getSetDayOfYear } from '../units/day-of-year';
proto.dayOfYear  = getSetDayOfYear;
