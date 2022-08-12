#include "utils.h"
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add2Nums(int a)
{
  return add(2, 5);
}
