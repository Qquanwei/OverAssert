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

* 断言
  * [required](#required)
  * [large](#large)
  * [less](#less)
  * [lessOrEqual](#lessOrEqual)
  * [equals](#equals)
  * [integer](#integer)
  * [nature](#nature)
  * [natureNoZero](#natureNoZero)
  * [imageMatchP](#imageMatchP)
  * [validUrl](#validUrl)
  * [validIP](#validIP)
  * [alpha](#alpha)
  * [numeric](#numeric)
  * [decimal](#decimal)
  * [minLength](#minLength)
  * [maxLength](#maxLength)
  * [exactLength](#exactLength)
  * [matchs](#matchs)

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


<a name="of"></a>of(data: any) => Assert(#of)
--------------------
#### 创建一个Assert对象

```javascript
    assert = of(1)
    assert = of([1, 2, 3])
    assert = of({ name: 'Alice', age: 20})
```

* assert.map(rule)

rule: (value: any) => Assert|Promise|string|undefined

* assert.validate(callback)

callback: (success: boolean, reason: string) => void

<a name="itShould"></a>itShould(predicate: Function, failedReason: Function) => rule
-------------------------
#### 通过断言函数，错误信息函数生成一个规则函数.

```javascript
    rule1 = itShould(Array.isArray, item => `${item} is not array`);
```

equal

```javascript
    rule1 = (value) => {
        if (Array.isArray(value)) {
            return undefined;
        }
        return `${value} is not array`
    }
```


```javascript
of(1)
   .map(itShould(Array.isArray, item => `${item} is not array`))
   .map(itShould(Number.isInteger, item => `${item} should be integer`))
   .validate((success, value) => {
       console.log(success, value);
   })
```

output:

```
false `1 is not array`
```

<a name="itShouldProp"></a>itShouldProp(propName: string, predicate: Function, failedReason: Function) => rule
--------------------------
#### 通过断言某个属性生成一个规则函数


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

<a name="itShouldPath"></a>itShouldPath(pathArray: Array, predicate: Function, failedReason: Function) => rule
---------------------------
### 通过断言深层属性生成一个规则函数. 如果该路径不存在，则直接断言失败

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

<a name="always"></a>always(reason: string) => Function
----------------------------
#### 生成一个返回固定信息的函数.

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

<a name="validate"></a>validate(v1: Assert,v2: Assert,..., callback: Function) => void
--------------------------
#### validate是assert.validate的函数形式，可以同时校验多个assert

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


<a name="required"></a>required() = PredicateFunction
-------------------
#### 要求必须有值

```
true -> true
false -> true
123 -> true
'hello' -> true
0 -> true

'' -> false
null -> false
undefined -> false
```

<a name="large"></a>large(value: number) => Predicate Function
----------------------------
### 生成一个判断是否大于指定数字的断言函数

large10 = large(10);

* large10(1) -> false
* large10(11) -> true

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

<a name="less"></a>less(value: number) => PredicateFunction
-------------------------------
#### 生成一个判断是否小于指定数字的断言函数

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

<a name="lessOrEqual"></a>lessOrEqual(value: number) => PredicateFunction
--------------
#### 判断是否小于等于

<a name="equals"></a>equals(value: any) => PredicateFunction
----------------------------------
#### 判断是否严格相等

```
1 , 1 -> true
1 , "1" -> false
```

<a name="integer"></a>integer() => PredicateFunction
------------------------------
#### 判断是否是整数

```
12.3 -> false
"12.3" -> false
"12ac" -> false
null -> false
undefined -> false
object -> false
```

<a name="nature"></a>nature() => PredicateFunction
-----------------------
#### 判断是否是自然数

```
0 -> true
1 -> true
100 -> false
-1 -> false
null -> false
undefined -> false
```

<a name="natureNoZero"></a>natureNoZero() => PredicateFunction
---------------
#### 判断是否是不为0的自然数

```
1 -> true
100 -> true

0 -> false
-1 -> false
-100 -> false
```

<a name="imageMatchP"></a>imageMatchP(rule1: Function, rule2: Function, ...) => PredicateFunction
--------------
#### 判断本地图片对象是否合法

```javascript

const imageSizeRule = itShouldProp('width', large(10), always('width should large 10'));

of(imageFile)
    .map(itShould(imageMatchP(imageSizeRule), always('file not exists')))
    .validate((success, reason) => {
    })
```

imageMatchP是一个普通的异步断言. 可以和itShould结合使用。但是由于imageMatchP
返回的是一个`Promise<Assert>`，所以既是一个断言函数，又是一个规则函数, 所以写成下面这样也没问题

```javascript
of(imageFile)
    .map(imageMatchP(
        itShouldProp('width', large(20), always('width should large 20')),
        itShouldProp('height', less(100), always('height should less 100'))
    ))
    .validate((success, reason) => {
    })
```

<a name="validUrl"></a>validUrl() => PredicateFunction
----------------------
#### 是否是合法的url

```
http://google.com -> true
http://google.com?a=1&b=1 -> true
http://gogole.com/index.html -> true

127.0.0.1 -> false
undefined/null/number -> false
helloworld.com -> false
worldismine/ccc -> false
```

<a name="validIP"></a>validIP() => PredicateFunction
--------------
#### 是否是合法的ip

```
255.255.255.255 -> true
0.0.0.0 -> true
192.168.0.1 -> true

256.0.0.1 -> false
abcde -> false
```

<a name="alpha"></a>alpha()=> PredicateFunction
---------------------
#### 是否是是字母表中的字母

```
abc -> true
123 -> false
abc!@# -> false
null -> false
undefined -> false
```

<a name="numeric"></a>numeric() => PredicateFunction
---------
#### 是否是数字

```
123 -> true
abc -> false
null -> false
undefined -> false
```

<a name="decimal"></a>decimal() => PredicateFunction
-------
#### 是否是十进制的数字

```
123.123 -> true
12 -> true
.123 -> true

null -> false
undefined -> false
abc -> false
```


<a name="minLength"></a>minLength(value: number) => PredicateFunction
--------
#### 判断输入最小长度

```
minLength(3) => 最小长度为3

123 -> true
1234 -> true
abcd -> true

12 -> false
null -> false
undefined -> false
ab -> false

```

<a name="maxLength"></a>maxLength(value: number) => PredicateFunction
----------
#### 判断输入最大长度

```
maxLength(3) => 最大长度为3

123 -> true
12 -> true
ab -> true
c -> true

1234 -> false
abcd -> false
null -> false
undefined -> false
```



<a name="exactLength"></a>exactLength(value: number) => PredicateFunction
--------------------
#### 输入长度是否等于

```
exactLength(3) => 长度为3

123 -> true
abc -> true
000 -> true

-123 -> false
ab -> false
null -> false
undefined -> false
```

<a name="matchs"></a>matchs(re: RegExp|string) => PredicateFunction
--------------
#### 输入是否匹配指定正则或字符串

```
matchs(/123/) => 输入是否能够匹配123

12345 -> true
'12345' -> true

otherwise -> false
```

<a name="compact"></a>compact(rule1: Function, rule2: Function, ...) => Rule
--------------------------------
#### 组合多个规则函数生成一个规则

<a name="allPass"></a>allPass(predicate1: Function, predicate2: Function, ...) => PredicateFunction
----------------------------------
#### 返回一个新的断言，当所有条件满足即满足条件时为真

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


### 一点点概念:

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
