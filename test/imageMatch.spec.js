import { expect } from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom-global';
import { itShould, validate, of, always, imageMatchP, itShouldProp, large, less } from '../src';

describe('imageMatchP Spec', () => {
    jsdom();
    /* jsdom(``, {
     *     url: 'http://localhost'
     * }); */

    it ('should be a function', () => {
        expect(imageMatchP).to.be.instanceOf(Function);
    })

    it ('should return a function when apply', () => {
        expect(imageMatchP()).to.be.instanceOf(Function);
    })

    it ('should return true when sizeMatch', (testDone) => {
        global.Image = function () {
            const img = {
                width: 100,
                height: 200
            };

            Object.defineProperty(img, 'onload', {
                configurable: true,
                enumerable: true,
                get () {
                    return null;
                },
                set (callback) {
                    setTimeout(callback, 100);
                }
            });
            return img;
        }
        global.FileReader = function () {
            return {
                result: null,
                readAsDataURL: () => {},
                addEventListener: (type, callback) => {
                    callback();
                }
            }
        }


        of(1)
            .map(
                imageMatchP(
                    itShouldProp('width', large(50), always('A')),
                    itShouldProp('height', less(100), always('B'))
                ))
            .validate((success, reason) => {
                expect(success).to.be.equals(false);
                expect(reason).to.be.equals('B');
                testDone();
            });
    })
})
