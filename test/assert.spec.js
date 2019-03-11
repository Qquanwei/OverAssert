import Assert from '../src/assert';
import { expect } from 'chai';

describe('Assert', () => {
    it ('should Assert has not implement method', () => {
        const assert = new Assert();
        expect(() => assert.map(a => a)).to.have.throw();
    })
})
