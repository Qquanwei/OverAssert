import { expect } from 'chai';
import always from '../src/always';
import of from '../src/of';
import large from '../src/large';
import itShould from '../src/itShould';

function delay(ms) {
    return () => {
        return new Promise((d) => {
            setTimeout(d, ms);
        });
    };
}

describe('normalP Spec', () => {
    it ('should create a async assert', (resolve) => {
        of(1)
            .map(itShould(delay(30), always('not')))
            .validate((success, value) => {
                expect(success).to.be.equals(true);
                expect(value).to.be.equals(1);
                resolve();
            });
    })

    it ('should catch async error', (resolve) => {
        function delayAndThrow(ms) {
            return () => {
                return new Promise((_1, reject) => {
                    setTimeout(reject, ms);
                });
            };
        }

        of(1)
            .map(itShould(delayAndThrow(30), always('yes')))
            .validate((success, value) => {
                expect(success).to.be.equals(false);
                expect(value).to.be.equals('yes');
                resolve();
            });
    })

    it ('should mixin other rule', (resolve) => {
        of(1)
            .map(itShould(large(-1), always('yes')))
            .map(itShould(delay(30), always('not')))
            .map(itShould(large(0), always('yes')))
            .validate((success, value) => {
                expect(success).to.be.equals(true);
                expect(value).to.be.equals(1);
                resolve();
            });
    })
})
