import itShould from './itShould';

function itShouldProp(prop, predicate, failed) {
    if (!predicate || typeof predicate !== 'function') {
        throw new Error(`itShouldProp ${prop} require second parameter is function`);
    }
    if (!failed || typeof failed !== 'function') {
        throw new Error(`itShouldProp ${prop} require third parameter is function`);
    }

    return (value) => {
        if (value) {
            return itShould(predicate, failed)(value[prop]);
        }

        return failed(undefined);
    }
}

export default itShouldProp;
