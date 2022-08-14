import { useCallback, useEffect, useMemo, useState } from "react";

const useWasm = (wasmFileName) => {
  const [wasm, setWasm] = useState(null);
  const wasmFilePath = useMemo(() => require(`./build/${wasmFileName}.wasm`), [wasmFileName]);

  const readWasmFile = useCallback(async () => {
    try {
      const response = await fetch(wasmFilePath);
      const buffer = await response.arrayBuffer();
      const result = await WebAssembly.instantiate(buffer);
      const exports = result.instance.exports;
      setWasm(exports);
    } catch (error) {
      console.log(error);
    }
  }, [wasmFilePath]);

  useEffect(() => {
    readWasmFile();
  }, [readWasmFile]);

  return wasm;
};

export default useWasm;
