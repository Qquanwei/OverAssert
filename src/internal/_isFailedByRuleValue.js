function isFailedByRuleValue(value) {
    return value && typeof value === 'string';
}

export default isFailedByRuleValue;
