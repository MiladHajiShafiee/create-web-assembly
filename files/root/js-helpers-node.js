import exports from "./loader-node.js";

// Encode Array
export const encodeArray = (arr, len, sizeof = 1) => {
  let ptr;
  let out;
  if (sizeof === 8) {
    ptr = exports.wasmmalloc(len * 8);
    out = new BigUint64Array(exports.memory.buffer, ptr);
  } else if (sizeof === 4) {
    ptr = exports.wasmmalloc(len * 4);
    out = new Uint32Array(exports.memory.buffer, ptr);
  } else {
    ptr = exports.wasmmalloc(len);
    out = new Uint8Array(exports.memory.buffer, ptr);
  }

  for (let i = 0; i < len; i++) {
    out[i] = arr[i];
  }

  return ptr;
};

// Decode Array
export const decodeArray = (ptr, len) => {
  return new Uint8Array(exports.memory.buffer).slice(ptr, ptr + len);
};

// Decode String override
export const decodeString = (ptr) => {
  const bytes = new Uint8Array(exports.memory.buffer, ptr);
  let strlen = 0;
  while (bytes[strlen] !== 0) strlen++;

  return new TextDecoder("utf8").decode(bytes.slice(0, strlen));
};
