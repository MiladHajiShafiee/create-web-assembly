// Encode Array
export const encodeArray = (arr, len, sizeof = 1, wasm) => {
  let ptr;
  let out;
  // if (sizeof === 8) {
  //   ptr = wasm?.wasmmalloc(len * 8);
  //   out = new BigUint64Array(memory.buffer, ptr);
  // } else
  if (sizeof === 4) {
    ptr = wasm?.wasmmalloc(len * 4);
    out = new Uint32Array(wasm?.memory.buffer, ptr);
  } else {
    ptr = wasm?.wasmmalloc(len);
    out = new Uint8Array(wasm?.memory.buffer, ptr);
  }

  for (let i = 0; i < len; i++) {
    out[i] = arr[i];
  }

  return ptr;
};

// Decode Array
export const decodeArray = (ptr, len, memory) => {
  return new Uint8Array(memory?.buffer).slice(ptr, ptr + len);
};

// Decode String override
export const decodeString = (ptr, memory) => {
  const bytes = new Uint8Array(memory?.buffer, ptr);
  let strlen = 0;
  while (bytes[strlen] !== 0) strlen++;

  return new TextDecoder("utf8").decode(bytes.slice(0, strlen));
};
