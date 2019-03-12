function validUrl() {
    return (value) => {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(value);
    }
}

export default validUrl;
