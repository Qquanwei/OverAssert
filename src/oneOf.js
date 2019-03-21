function oneOf(array) {
  return value => {
      return Array.isArray(array) && (array.find(itm => itm === value) !== undefined);
  }
}

export default oneOf;