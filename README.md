# OverAssert

[![Build Status](https://travis-ci.com/Qquanwei/OverAssert.svg?token=ywJP6ZbPxtsNYQ2GidVL&branch=master)](https://travis-ci.com/Qquanwei/OverAssert)
[![codecov](https://codecov.io/gh/Qquanwei/OverAssert/branch/master/graph/badge.svg?token=oJbeN3S4cq)](https://codecov.io/gh/Qquanwei/OverAssert)

校验，规则，可组合，可复用，函数式。


## 使用
```javascript
import { of, map, itShould, always } from 'overassert';

of(x)
  .map(itShould(large(10), always('应该大于10')))
  .map(itShould(large(20), always('应该大于20')))
  .validate((success, value) => {
    if (success) {
       // value === x
    } else {
      // value === reason
    }
  })
```

## API

* 建立描述

    * (of)(#of)
    * (itShould)(#itShould)
    * (itShouldProp)(#itShouldProp)
    * (always)(#always)

* (断言函数)[#断言函数]

    * (large)[#large]
    * (less)[#less]
    * (equal)[#equal]

* (组合规则)[#组合规则]

    * (compact)[#compact]

* (组合断言)[#组合断言]

    * (allPass)[#allPass]


一点点概念:

断言函数: 指仅仅提供断言功能，返回是否满足条件的函数. (x) => bool

规则函数: 指自定义，或者用itShould创建，里面包含断言与错误信息的函数

## 自定义断言函数

```javascript
function isShouldLarge10(value) {
    return value > 10;
}
```

## 自定义规则函数

```javascript
function customP(value) {
   if (value > 10) {
      return value + ' should not large than 10';
   }
}

of(x)
  .map(customP)
```


## 创建复合断言

借住内置的方法，或者其他库函数创建出复合的断言函数.

例如: allPass
```
of(10)
  .map(itShould(
      allPass(large(10), less(20)),
      always('数据不在区间内')
  ))
```

## 创建复合规则

借助 compact 可以帮我们组合规则函数.

```javascript

const myCustomCompact = compact(
    itShould(large(10), always('should large than 10')),
    itShould(less(20), always('should less than 20'))
);

of(15)
  .map(myCustomCompact)
  .map(customP)
  .map(itShould(isInteger(), always('should is a integer')));
```




## Normal and Failed

> import { Normal, Failed } from './src';

Normal用来表示一个正常的值, Failed用来表示一个失败的值.

## About Maybe Monad
https://en.wikibooks.org/wiki/Haskell/Understanding_monads/Maybe
