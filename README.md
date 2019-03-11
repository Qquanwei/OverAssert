# OverAssert

[![Build Status](https://travis-ci.com/Qquanwei/OverAssert.svg?token=ywJP6ZbPxtsNYQ2GidVL&branch=master)](https://travis-ci.com/Qquanwei/OverAssert)
[![codecov](https://codecov.io/gh/Qquanwei/OverAssert/branch/master/graph/badge.svg?token=oJbeN3S4cq)](https://codecov.io/gh/Qquanwei/OverAssert)

校验，规则，可组合，可复用，同步&异步, 函数式.


## 使用
```javascript
import { of, itShould, always } from 'overassert';

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

    * [of](#of)
    * [itShould](#itShould)
    * [itShouldProp](#itShouldProp)
    * [itShouldPath](#itShouldPath)
    * [always](#always)

* 断言函数

    * [large](#large)
    * [less](#less)
    * [equals](#equals)

* 组合规则

    * [compact](#compact)

* (组合断言)[#组合断言]

    * [allPass](#allPass)


### of

> of(data) => Assert Object

创建一个校验对象

```javascript
    of(1)
    of([1, 2, 3])
    of({ name: 'Alice', age: 20})
```

### itShould

> itShould(assertFunction, failedFunction) => Function

通过断言函数，错误信息函数生成一个规则函数.

```javascript
of(1)
   .map(itShould(Array.isArray, item => `${item} is not array`))
   .validate((success, value) => {
       console.log(success, value);
   })


```

output:

```
false `1 is not array`
```

### itShouldProp

> itShouldProp(propName, assertFunction, failedFunction) => Function

通过断言某个属性生成一个规则函数

```javascript
of({ name: 'Alice' })
    .map(itShouldProp('name', Array.isArray, item => `${item} is not array`))
    .validate((success, value) => {
        console.log(success, value);
    })
```

output

```
false Alice is not array
```

### itShouldPath

> itShouldPath(propArray, assertFunction, failedFunction) => Function

通过断言深层属性生成一个规则函数. 如果该路径不存在，则直接断言失败，并返回`failedFunction(undefined)`.

```javascript
of({ first: { name: 'Alice'}})
    .map(itShouldPath(['first', 'name'], Array.isArray, item => `${item} is not array`))
    .validate((success, value) => {
        console.log(success, value);
    })
```

output

```
false Alice is not array
```

### always

> always(message) => Function

生成一个返回固定信息的函数.

```javascript
of(1)
    .map(itShould(Array.isArray, always('该属性不是Array')))
    .validate((success, value) => {
        console.log(success, value);
    })
```

output

```
false 该属性不是Array
```

### large

> large(number) => Function

生成一个判断是否大于指定数字的断言函数

```javascript
of(1)
    .map(itShould(large(10), always('数字应该大于10')))
    .validate((success, value) => {
        console.log(success, value)
    })
```

output

```
false 数字应该大于10
```

### less

> less(number) => Function

生成一个判断是否小于指定数字的断言函数

```javascript
of(12)
    .map(itShould(large(5), always('数字应该大于5')))
    .map(itShould(less(10),always('数字应该小于10')))
    .validate((success, value) => {
        console.log(success, value)
    })
```

output

```
false 数字应该小于10
```

### equals

> equals(number) => Function

### compact

> compact(rule1, rule2, ...) => Rule Function

组合多个规则函数生成一个规则

### allPass

> allPass(assertFunction1, assertFunction2, ...) => Assert Function

返回一个新的断言，当所有条件满足即满足条件.

```javascript
of(15)
    .map(itShould(
        allPass(large(10), less(20)),
        always('数字不在区间内')
    ))
    .validate((success, value) => {
        console.log(success, value);
    })
```

output

```
false 数字不在区间内
```

一点点概念:

断言函数: 指仅仅提供断言功能，返回是否满足条件的函数. (x) => bool

规则函数: 指自定义，或者用itShould创建，里面包含断言与错误信息的函数

## 异步校验

如果有一个断言函数是 `x => Promise`, 那么就是一个异步校验. OverAssert天然支持异步校验.

异步校验会将Promise::fulfilled当作成功的条件, 对应的Promise::rejected会执行失败逻辑.


```javascript
import { of, always } from 'overassert';

function asyncLarge10(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value > 10) {
                resolve();
            } else {
                reject();
            }
        }, 300);
    });
}

of(x)
    .map(itShould(asyncLarge10, always('emm!')))
    .validate((success, value) => {
        if (success) {
            // value === x
        } else {
            // value === 'emm!'
        }
    })
```

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
