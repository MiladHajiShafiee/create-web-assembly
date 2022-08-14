#include <emscripten.h>

#include "./add/add.h"
#include "./subtract/subtract.h"

EMSCRIPTEN_KEEPALIVE
int myFunc(int a, int b)
{
  return subtract(a, b) + add(a, b);
}
