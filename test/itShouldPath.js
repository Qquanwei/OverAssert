import { expect } from 'chai';
import Normal from '../src/normal';
import Failed from '../src/failed';
import always from '../src/always';
import equals from '../src/equals';
import itShouldPath from '../src/itShouldPath';
import of from '../src/of';

describe('itShouldPath Spec', () => {

    it ('should itShouldPath is a assert function', () => {
        expect(itShouldPath).to.be.instanceof(Function);
    })

    it ('should itShouldPath have three params', () => {
        expect(itShouldPath.length).to.be.equal(3);
    })

    it ('should itShouldPatc create a rule ', () => {
        const propEq3 = itShouldPath(['a'], equals(3), always('A'));

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

    it ('should itShouldPatch create a rule for deep prop', () => {
        const propEq3 = itShouldPath(['a', 'b'], equals(3), always('A'));

        expect(of({
            a: {b: 3}}).map(propEq3)).to.be.instanceof(Normal);
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
