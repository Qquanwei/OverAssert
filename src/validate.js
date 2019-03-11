import compact from './compact';
import of from './of';

function validate(...args) {
    const callback = args[args.length - 1];

    if (!args.length || !(typeof callback === 'function')) {
        throw new Error('validate: the last parameter not a function');
    }



    const asserts = args.slice(0, -1);

    const rules = asserts.map(assert => {
        return () => of(assert)
    });

    return compact.apply(this, rules)().validate(callback);
}

export default validate;
