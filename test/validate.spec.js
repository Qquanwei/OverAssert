import { expect } from 'chai';
import of from '../src/of';
import itShould from '../src/itShould';
import always from '../src/always';
import large from '../src/large';
import validate from '../src/validate';

describe('Validate Spec', () => {
    it ('should is a function', () => {
        expect(validate).to.be.instanceOf(Function);
    })

    it ('should can take multi assert to one', () => {
        validate(
            of(1),
            of(2),
            (success, value) => {
                expect(success).to.be.equals(true);
                expect(value).to.be.equals(2)
            }
        );
    })

    it ('should can take multi assert to one even failed', () => {
        validate(
            of(1),
            of(2).map(itShould(large(10), always('A'))),
            of(3),
            (success, value) => {
                expect(success).to.be.equals(false);
                expect(value).to.be.equals('A');
            }
        )
    })

    it ('should can take multi assert to one event async', (done) => {
        function delayAndThrow(ms) {
            return () => {
                return new Promise((_1, reject) => {
                    setTimeout(reject, ms);
                });
            }
        }

        validate(
            of(1),
            of(2).map(itShould(delayAndThrow(100), always('A'))),
            of(3),
            of(4),
            of(5).map(itShould(delayAndThrow(200), always('B'))),
            (success, value) => {
                expect(success).to.be.equals(false);
                expect(value).to.be.equals('A');
                done();
            }
        )
    })
})
