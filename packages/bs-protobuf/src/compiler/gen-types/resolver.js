import { capitalize } from "./capitalize";

export const specialModuleTypes = "PROTORES__Types__";

export class Resolver {
  constructor(data, options, chain = null, prefix = [], baseLevel = null) {
    this.data = data;
    this.options = options;
    this.chain = chain;
    this.prefix = prefix;
    // Base level is the length of prefix
    // when the forward lookup begins.
    this.baseLevel = baseLevel;
  }

  next(segment, initial) {
    const data = this.data.nested[segment];
    if (data) {
      let baseLevel = this.baseLevel;
      if (initial) {
        if (baseLevel != null) {
          // Use the minimum of the current prefix length and the
          // previous base level, as the start of the relative path
          baseLevel = Math.min(baseLevel, this.prefix.length);
        } else {
          // No base level yet, use the current prefix length
          baseLevel = this.prefix.length;
        }
      }
      return new Resolver(
        data,
        this.options,
        this,
        this.prefix.concat(segment),
        baseLevel
      );
    }
    return couldNotResolve;
  }

  forwardLookupPath(path, initial) {
    if (path.length === 0) {
      return this;
    } else if (this.data.nested) {
      path = [].concat(path);
      const resolver = this.next(path.shift(), initial);
      if (resolver.data) {
        return resolver.forwardLookupPath(path);
      }
    }
    return couldNotResolve;
  }

  lookupPathInner(path) {
    // Start to resolve from the inside on the chain
    let resolver = this.forwardLookupPath(path, true);
    if (!resolver.data && this.chain) {
      resolver = this.chain.lookupPathInner(path);
    }
    return resolver;
  }

  lookupPathOuter(path) {
    // Start to resolve from the root of the chain
    let resolver = couldNotResolve;
    if (this.chain) {
      resolver = this.chain.lookupPathOuter(path);
    }
    if (!resolver.data) {
      resolver = this.forwardLookupPath(path, true);
    }
    return resolver;
  }

  lookup(name) {
    const path = name.split(".");
    if (path[0] === "") {
      return this.lookupPathOuter(path.slice(1));
    } else {
      return this.lookupPathInner(path);
    }
  }

  get relativePath() {
    // The relative path starting from the base level
    // eg. if alpha.beta.gamma is looked up from alpha.epsilon,
    // then the base level is alpha, and the relative path
    // is Beta.Gamma.
    return this.prefix.slice(this.baseLevel).map(capitalize).join(".");
  }

  get flattenedName() {
    return capitalize(
      this.prefix.map((segment) => segment.replace(/_/g, "_X")).join("__")
    );
  }

  get moduleName() {
    // The full module name of the referenced symbol
    return `${specialModuleTypes}.${this.flattenedName}`;
  }

  get name() {
    if (this.prefix) {
      return this.prefix[this.prefix.length - 1];
    }
  }

  get packageName() {
    if (this.prefix) {
      return this.prefix.join(".");
    }
  }
}

export const couldNotResolve = new Resolver();
