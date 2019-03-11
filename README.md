# OverAssert
校验，规则，可组合，可复用，函数式。


## 使用
```javascript
import A from 'overassert';

const { Normal, itShould, large, always } = A;

Normal.of(x)
    .map(itShould(large(10), always('应该大于10')))
    .map(itShould(large(20), always('应该大于20')))
```

## Normal and Failed

> import { Normal, Failed } from './src/Assert';

Normal以及Failed是Assert这个Monad的两个值, Normal用来表示一个正常的值, Failed用来表示一个失败的值.

## About Maybe Monad
https://en.wikibooks.org/wiki/Haskell/Understanding_monads/Maybe
