function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        overflow        : -2
    };
}

export default function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}
