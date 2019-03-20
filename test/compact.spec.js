import { expect } from 'chai';
import Normal from '../src/normal';
import Failed from '../src/failed';
import large from '../src/large';
import less from '../src/less';
import itShould from '../src/itShould';
import always from '../src/always';
import _identity from '../src/internal/_identity';
import { compact } from '../src';

describe('Compact Spec', () => {
    it ('should be a function', () => {
        expect(compact).to.have.instanceOf(Function);
    })

    it ('should return a function when apply a function', () => {
        expect(compact(_identity)).to.have.instanceOf(Function);
    })

    it ('should return function can as a assertFunction', () => {
        const fn = compact(
            itShould(large(20), always('A')),
            itShould(less(30), always('B'))
        );

        expect(fn(10)).to.have.instanceOf(Failed);
        expect(fn(20)).to.have.instanceOf(Failed);
        expect(fn(25)).to.have.instanceOf(Normal);
        expect(fn(30)).to.have.instanceOf(Failed);
    });
})
