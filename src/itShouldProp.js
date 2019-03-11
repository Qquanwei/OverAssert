import itShould from './itShould';

function itShouldProp(prop, predicate, failed) {
    return (value) => {
        if (value) {
            return itShould(predicate, failed)(value[prop]);
        }

        return failed(undefined);
    }
}

export default itShouldProp;
