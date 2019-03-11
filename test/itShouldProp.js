import { expect } from 'chai';
import Normal from '../src/normal';
import Failed from '../src/failed';
import always from '../src/always';
import equals from '../src/equals';
import itShouldProp from '../src/itShouldProp';
import of from '../src/of';

describe('itShouldProp Spec', () => {

    it ('should itShouldProp is a assert function', () => {
        expect(itShouldProp).to.be.instanceof(Function);
    })

    it ('should itShouldProp have three params', () => {
        expect(itShouldProp.length).to.be.equal(3);
    })

    it ('should itShouldProp create a rule ', () => {
        const propEq3 = itShouldProp('a', equals(3), always('A'));

        expect(of({a: 3}).map(propEq3)).to.be.instanceof(Normal);
        expect(of({a: 4}).map(propEq3)).to.be.instanceof(Failed);
        expect(of(3).map(propEq3)).to.be.instanceof(Failed);

        of(3)
            .map(propEq3)
            .validate((success, value) => {
                expect(success).to.be.equal(false);
                expect(value).to.be.equal('A');
            });
    })
})
