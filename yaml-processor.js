'use strict';

class RefsCollector {
  constructor() {
    this.m = new Map();
    // setup $ref containers
    this.m.set("definitions", new Set());
    this.m.set("responses", new Set());
    // if a PropEntry has been collected into this collector,
    // this collector will be dirty (this.dirty = true)
    this.dirty = false; 
  }

  data() {
    return this.m;
  }

  setPropEntry(prop, propOfProp) {
    let propOfPropSet = this.m.get(prop);
    if (!propOfPropSet) {
      propOfPropSet = new Set();
      this.m.set(prop, propOfPropSet);
    }
    if (!propOfPropSet.has(propOfProp)) {
      propOfPropSet.add(propOfProp);
      this.dirty = true;
    }
  }
}

const parseRef2tuple = (aRef) => {
  let aMatch = aRef.match(
    /#\/(?<prop>[a-zA-Z]+)\/(?<propOfProp>[\-a-zA-Z0-9\.]+)/
  );
  let { prop, propOfProp } = aMatch.groups;
  return { prop, propOfProp };
};
const collectAllRefs = (obj, collector) => {
  if (obj && obj.hasOwnProperty('$ref')) {
    let aRef = obj['$ref'];
    let { prop, propOfProp } = parseRef2tuple(aRef);
    collector.setPropEntry(prop, propOfProp);
    return;
  }

  obj ? Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object') {
      collectAllRefs(obj[prop], collector);
    }
  }): null;

};

let collectAllDerivedRefs = (doc, initialRefsMap, refsCollector) => {
    // recursively collecting all $ref from initial urisRefCollector map,
    // stop if no more $ref left to collect
    initialRefsMap.forEach((propOfPropSet, prop) => {
      let startPropSet = new Set(propOfPropSet); 
      startPropSet.forEach((propOfProp) => {
        collectAllRefs(doc[prop][propOfProp], refsCollector);
      });
    });
  };

const processDocForUris = (uris, doc) => {
  Object.keys(doc.paths).forEach((key) => {
    if (!uris.includes(key)) {
      delete doc.paths[key];
    }
  });

  // collect $ref for all sepcified uri endpoints and its derived $ref
  let urisRefsCollector = new RefsCollector();
  uris.forEach((uri) => collectAllRefs(doc.paths[uri], urisRefsCollector));

  let urisRefsMap = urisRefsCollector.data();
  do {
    // reset the dirty flag to start next collecting epoc, and check dirty flag later after collecting
    // initially, the collector is not dirty, it will become dirty if new data is added
    urisRefsCollector.dirty = false;
    collectAllDerivedRefs(doc, urisRefsMap, urisRefsCollector);
  } while (urisRefsCollector.dirty);

  // clean doc for unused $ref definitions
  urisRefsMap.forEach((propOfPropSet, prop) => {
    Object.keys(doc[prop]).forEach((propOfProp) => {
      if (!propOfPropSet.has(propOfProp)) {
        delete doc[prop][propOfProp];
      }
    });
  });
};

module.exports = { processDocForUris };
