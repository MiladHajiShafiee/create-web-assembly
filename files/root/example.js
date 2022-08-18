import exports from "./loader-node.js";
import { encodeArray, decodeString } from "./js-helpers-node.js";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ptr = encodeArray(arr, arr.length, 4);
const sum = exports.accumulate(ptr, 10);
console.log(sum);

const str = decodeString(exports.getString());
console.log(str);
exports.wasmfree(ptr);

const rndStr = decodeString(exports.randString(10));
console.log(`Generated random string : ${rndStr}`);
