#include <stdlib.h>
#include <emscripten.h>

#include "./add/add.h"
#include "./subtract/subtract.h"

EMSCRIPTEN_KEEPALIVE
int myFunc(int a, int b)
{
  return subtract(a, b) + add(a, b);
}

EMSCRIPTEN_KEEPALIVE
int accumulate(int *arr, int n)
{
  int sum = 0;
  while (n)
  {
    sum += arr[--n];
  }
  return sum;
}

EMSCRIPTEN_KEEPALIVE
const char *getString()
{
  return "Code in C/C++ and run it in your React with WebAssembly";
}

EMSCRIPTEN_KEEPALIVE
void *wasmmalloc(size_t n)
{
  return malloc(n);
}

EMSCRIPTEN_KEEPALIVE
void wasmfree(void *ptr)
{
  free(ptr);
}