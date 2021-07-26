import { util } from "protobufjs/minimal";

// encode
export function e(message, messageClass) {
  const result = messageClass.encode(message).finish();
  return result;
}

// verify
export function v(v, messageClass) {
  const result = messageClass.verify(v);
  return result ? result : undefined;
}

// decode
export function d(b, messageClass) {
  const message = messageClass.decode(b);
  return message;
}

// encode field conversion t => Message
export const fromRecord = {
  string(message, key, record) {
    if (record[key] != null) {
      message[key] = String(record[key]);
    }
    return message;
  },

  int32(message, key, record) {
    if (record[key] != null) {
      message[key] = record[key] | 0;
    }
    return message;
  },

  int64(message, key, record) {
    if (record[key] != null) {
      const field = record[key];
      message[key] = new util.Long(field[1], field[0], false);
    }
    return message;
  },

  enum(message, key, record) {
    if (record[key] != null) {
      message[key] = record[key] | 0;
    }
    return message;
  },

  message(message, key, record) {
    if (record[key] != null) {
      message[key] = record[key];
    }
    return message;
  },

  oneof(message, key, choices, record) {
    const f = record[key];
    if (f !== 0) {
      const [type, subKey] = choices[f.TAG];
      this[type](message, subKey, { [subKey]: f._0 });
    }
    return message;
  },
};

// decode field conversion Message => t
export const toRecord = {
  string(record, key, message) {
    if (message[key] != null && message.hasOwnProperty(key)) {
      record[key] = message[key];
    }
    return record;
  },

  int32(record, key, message) {
    if (message[key] != null && message.hasOwnProperty(key)) {
      record[key] = message[key];
    }
    return record;
  },

  int64(record, key, message) {
    if (message[key] != null && message.hasOwnProperty(key)) {
      const field = message[key];
      record[key] = [field.high, field.low >>> 0];
    }
    return record;
  },

  enum(record, key, message) {
    if (message[key] != null && message.hasOwnProperty(key)) {
      record[key] = message[key];
    }
    return record;
  },

  message(record, key, message) {
    if (message[key] != null && message.hasOwnProperty(key)) {
      record[key] = message[key];
    }
    return record;
  },

  oneof(record, key, choices, message) {
    for (let i = 0; i < choices.length; i++) {
      const [type, subKey] = choices[i];
      if (type === "") {
        // skip terminator for 1-tuples
        continue;
      }
      const f = message[subKey];
      if (f != null) {
        const subRecord = {};
        this[type](subRecord, subKey, message);
        record[key] = { TAG: i, _0: subRecord[subKey] };
        return record;
      }
    }
    record[key] = 0;
    return record;
  },
};
