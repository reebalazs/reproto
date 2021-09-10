import { util } from "protobufjs/minimal";

// encode
export function e(message, messageClass) {
  const result = messageClass.encode(message).finish();
  return result;
}

// verify
// export function v(v, messageClass) {
//   const result = messageClass.verify(v);
//   return result ? result : undefined;
// }

// decode
export function d(b, messageClass) {
  const message = messageClass.decode(b);
  return message;
}

// Field mapping

export const field = {
  fromR(message, key, f, record) {
    const result = f.fromR(record[key]);
    if (result) {
      const useKey = result.key || key;
      message[useKey] = result.m;
    }
    return message;
  },

  toR(record, key, f, message) {
    const result = f.toR({
      has: message.hasOwnProperty(key),
      m: message[key],
      message,
    });
    if (result !== undefined) {
      record[key] = result.v;
    }
    return record;
  },
};

export const mapField = {
  fromR(message, key, f, record) {
    const r = record[key];
    if (r != null) {
      const m = (message[key] = []);
      for (const i in r) {
        const result = f.fromR(r[i]);
        if (result !== undefined) {
          if (result.key) {
            throw new Error(`Oneof cannot be repeated [${key}]`);
          }
          m[i] = result.m;
        }
      }
    }
    return message;
  },

  toR(record, key, f, message) {
    const r = (record[key] = []);
    if (message.hasOwnProperty(key)) {
      const m = message[key];
      if (m != null) {
        for (const i in m) {
          const result = f.toR({ has: true, m: m[i] });
          if (result !== undefined) {
            r[i] = result.v;
          }
        }
      }
    }
    return record;
  },
};

// Type mapping

export const Convert = {
  string: {
    fromR(v) {
      if (v != null) {
        return { m: String(v) };
      }
    },

    toR({ has, m }) {
      if (has && m != null) {
        return { v: m };
      }
    },
  },

  int32: {
    fromR(v) {
      if (v != null) {
        return { m: v | 0 };
      }
    },

    toR({ has, m }) {
      if (has && m != null) {
        return { v: m };
      }
    },
  },

  int64: {
    fromR(v) {
      if (v != null) {
        return { m: new util.Long(v[1], v[0], false) };
      }
    },

    toR({ has, m }) {
      if (has && m != null) {
        return { v: [m.high, m.low >>> 0] };
      }
    },
  },

  enum: {
    fromR(v) {
      if (v != null) {
        return { m: v | 0 };
      }
    },

    toR({ has, m }) {
      if (has && m != null) {
        return { v: m };
      }
    },
  },

  message: {
    fromR(v) {
      if (v != null) {
        return { m: v };
      }
    },

    toR({ has, m }) {
      if (has && m != null) {
        return { v: m };
      }
    },
  },

  oneof(choices) {
    return new OneofConverter(choices);
  },
};

class OneofConverter {
  constructor(choices) {
    this.choices = choices;
  }

  fromR(v) {
    if (v !== 0) {
      const [type, key] = this.choices[v.TAG];
      const result = Convert[type].fromR(v._0);
      if (result) {
        if (result.key) {
          throw new Error(`Oneof cannot be duplicated [${key}]`);
        }
        return { m: result.m, key };
      }
    }
  }

  toR({ message }) {
    if (!message) {
      throw new Error("Oneof cannot ve repeated");
    }
    for (let i = 0; i < this.choices.length; i++) {
      const [type, subKey] = this.choices[i];
      if (type === "") {
        // skip terminator for 1-tuples
        continue;
      }
      const f = message[subKey];
      if (f != null) {
        const result = Convert[type].toR({ has: true, m: f });
        if (result !== undefined) {
          return { v: { TAG: i, _0: result.v } };
        }
      }
    }
    return { v: 0 };
  }
}
