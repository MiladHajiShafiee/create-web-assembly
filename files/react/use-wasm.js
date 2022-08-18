import { useCallback, useEffect, useState } from "react";

import { logProgress } from "./js-helpers";
import projectConfigJson from "../project.config.json";

const initial = projectConfigJson.memoryInitial;
const maximum = projectConfigJson.memoryMaximum;
const wasmFilePath = require(`./build/${projectConfigJson.wasmFileName}.wasm`);

const useWasm = () => {
  const [wasm, setWasm] = useState(null);

  const readWasmFile = useCallback(async () => {
    try {
      const response = await fetch(wasmFilePath);
      const buffer = await response.arrayBuffer();
      let memory = new WebAssembly.Memory({ initial, maximum });
      const result = await WebAssembly.instantiate(buffer, {
        js: {
          mem: memory,
        },
        env: {
          curTime: () => 100,
          logProgress: logProgress,
          emscripten_resize_heap: memory.grow,
        },
      });
      const exports = result.instance.exports;
      setWasm(exports);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    readWasmFile();
  }, [readWasmFile]);

  return wasm;
};

export default useWasm;
