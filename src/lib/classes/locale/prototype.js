import Locale from './constructor';

let protoLocale = Locale.prototype;

import _size from '../map-object/_size';
import clear from '../map-object/clear';
import deleteKey from '../map-object/deleteKey';
import entries from '../map-object/entries';
import forEach from '../map-object/forEach';
import has from '../map-object/has';
import keys from '../map-object/keys';
import set from '../map-object/set';
import values from '../map-object/values';
import get from './get';
import update from './update';

protoLocale._size   = _size;
protoLocale.clear   = clear;
protoLocale.delete  = deleteKey;
protoLocale.entries = entries;
protoLocale.forEach = forEach;
protoLocale.has     = has;
protoLocale.get     = get;
protoLocale.keys    = keys;
protoLocale.set     = set;
protoLocale.values  = values;
protoLocale.update  = update;
