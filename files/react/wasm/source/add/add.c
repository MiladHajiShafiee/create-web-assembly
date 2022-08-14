#include "add.h"

EMSCRIPTEN_KEEPALIVE
int add(int a, int b)
{
  return a + b;
}
