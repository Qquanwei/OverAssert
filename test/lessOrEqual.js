import { expect } from 'chai';
import {
    lessOrEqual,
    of,
    itShould
} from '../src';

describe('lessOrEqual Spec', () => {
    it ('should be a function', () => {
        expect(lessOrEqual).to.be.instanceOf(Function);
    })

    it ('should return a function when apply number', () => {
        expect(lessOrEqual(1)).to.be.instanceOf(Function);
    })

    it ('should assert less or equal', () => {
        expect(lessOrEqual(1)(2)).to.be.equals(false);
        expect(lessOrEqual(1)(1)).to.be.equals(true);
        expect(lessOrEqual(1)(0)).to.be.equals(true);
    })
})
