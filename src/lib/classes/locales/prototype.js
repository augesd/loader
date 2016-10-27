import Locales from './constructor';

let protoLocales = Locales.prototype;

import _size from '../map-object/_size';
import clear from '../map-object/clear';
import deleteKey from '../map-object/deleteKey';
import entries from '../map-object/entries';
import forEach from '../map-object/forEach';
import has from '../map-object/has';
import get from '../map-object/get';
import keys from '../map-object/keys';
import set from '../map-object/set';
import values from '../map-object/values';
import add from './add';

protoLocales._size   = _size;
protoLocales.clear   = clear;
protoLocales.delete  = deleteKey;
protoLocales.entries = entries;
protoLocales.forEach = forEach;
protoLocales.has     = has;
protoLocales.get     = get;
protoLocales.keys    = keys;
protoLocales.set     = set;
protoLocales.values  = values;
protoLocales.add     = add;
