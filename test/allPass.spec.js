import { allPass, large, less  } from '../src';
import { expect } from 'chai';

describe('allPass Spec', () => {

    it ('should be a function', () => {
        expect(allPass).to.be.instanceOf(Function);
    })

    it ('should be return a function when apply', () => {
        expect(allPass()).to.be.instanceOf(Function);
    })

    it ('should not throw when there\'s no predicate function', () => {
        expect(allPass()).to.not.throw();
    })

    it ('should return true when allPass', () => {
        const p = allPass(large(10), less(20));

        expect(p(15)).to.be.equals(true);
        expect(p(11)).to.be.equals(true);
        expect(p('15')).to.be.equals(true);
        expect(p('11')).to.be.equals(true);
    })

    it ('should return false when not allPass', () => {
        const p = allPass(large(-10), less(10));

        expect(p('')).to.be.equals(false);
        expect(p(null)).to.be.equals(false);
        expect(p(undefined)).to.be.equals(false);

        expect(p(-10)).to.be.equals(false);
        expect(p(20)).to.be.equals(false);
        expect(p('-10')).to.be.equals(false);
    })

})
