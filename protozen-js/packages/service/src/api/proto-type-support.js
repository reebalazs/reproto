// encode
export function e(v, messageClass) {
  const message = messageClass.fromObject(v);
  const result = messageClass.encode(v).finish();
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
  const result = messageClass.toObject(message);
  return result;
}
