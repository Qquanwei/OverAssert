# OverAssert

[![Build Status](https://travis-ci.com/Qquanwei/OverAssert.svg?token=ywJP6ZbPxtsNYQ2GidVL&branch=master)](https://travis-ci.com/Qquanwei/OverAssert)
[![codecov](https://codecov.io/gh/Qquanwei/OverAssert/branch/master/graph/badge.svg?token=oJbeN3S4cq)](https://codecov.io/gh/Qquanwei/OverAssert)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FQquanwei%2FOverAssert.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FQquanwei%2FOverAssert?ref=badge_shield)

校验，规则，可组合，可复用，同步&异步, 函数式.

OverAssert提供一种DSL让断言规则更加语意化, 规则即是文档. 同时设计本身为函数式风格，很容易与其他库结合使用。断言函数为普通谓词函数，更加符合直觉。OverAssert也提供了大量的内置断言，覆盖多种复杂场景，对同步、异步都有非常良好的支持.

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


![async predicate just fun](./snapshot/async_predicate_just_fun.png)

## API

* 建立描述
  * [of](#of)
  * [itShould](#itShould)
  * [itShouldProp](#itShouldProp)
  * [itShouldPath](#itShouldPath)
  * [always](#always)
  * [validate](#validate)

* 断言函数
  * [large](#large)
  * [less](#less)
  * [lessOrEqual](#lessOrEqual)
  * [equals](#equals)
  * [integer](#integer)
  * [nature](#nature)
  * [natureNoZero](#natureNoZero)
  * [imageMatchP](#imageMatchP)
  * [validUrl](#validUrl)
* 组合规则

    * [compact](#compact)

* 组合断言

    * [allPass](#allPass)
* 高级
  * [异步校验](#异步校验)
  * [自定义断言函数](#自定义断言函数)
  * [自定义规则函数](#自定义规则函数)
  * [创建复合断言](#创建复合断言)
  * [创建复合规则](#创建复合规则)

=====================

### of

> of(data) => Assert Object

创建一个校验对象

```javascript
    of(1)
    of([1, 2, 3])
    of({ name: 'Alice', age: 20})
```
-------------------------
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
--------------------------
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
---------------------------
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
----------------------------
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
--------------------------
### validate

> validate(assert1, assert2,..., callback)

validate是assert.validate的函数形式，可以同时校验多个assert

```javascript
    validate(
        of(1).map(itShould(large(10), always('应该大于10'))),
        (success, value) => {
            console.log(success, value)
        }
    );

    validate(
        of(11).map(itShould(large(10), always('应该大于10'))),
        of(12).map(itShould(large(20), always('应该大于20'))),
        (success, value) => {
            console.log(success, value);
        }
    )
```

output

```
false 应该大于10
false 应该大于20
```

----------------------------
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

-------------------------------
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
--------------
### lessOrEqual
> lessOrEqual(number) => Function
判断是否小于等于
----------------------------------
### equals

> equals(number) => Function

------------------------------
### integer
> integer() => Function
判断是否是整数

```
12.3 -> false
"12.3" -> false
"12ac" -> false
null -> false
undefined -> false
object -> false
```

-----------------------
### nature
> nature() => Function

判断是否是自然数

---------------
### natureNoZero
> naturoNoZero() => Function
判断是否是不为0的自然数

--------------
### imageMatchP

> imageMatchP(rule1, rule2) => Function

判断本地图片是否合法

```javascript
of(imageFile)
    .map(imageMatchP(
        itShouldProp('width', large(20), always('width should large 20')),
        itShouldProp('height', less(100), always('height should less 100'))
    ))
    .validate((success, reason) => {
    })
```

其实imageMatchP是一个普通的异步断言. 可以和itShould结合使用。但是由于imageMatchP
返回的是一个`Promise<Assert>`，所以既是一个断言函数，又是一个规则函数.

当然有些情况下我们需要处理一些异常逻辑, 所以写成下面这样也没问题

```javascript

const imageSizeRule = itShouldProp('width', large(10), always('width should large 10'));

of(imageFile)
    .map(itShould(imageMatchP(imageSizeRule), always('file not exists')))
    .validate((success, reason) => {
    })
```

----------------------
### validUrl
> validUrl() => Function

是否是合法的url

```
http://google.com -> true
http://google.com?a=1&b=1 -> true
http://gogole.com/index.html -> true

127.0.0.1 -> false
undefined/null/number -> false
helloworld.com -> false
worldismine/ccc -> false
```

--------------------------------
### compact

> compact(rule1, rule2, ...) => Rule Function

组合多个规则函数生成一个规则

----------------------------------
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

======================

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
