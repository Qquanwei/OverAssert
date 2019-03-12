import integer from './integer';

const int = integer();

function nature() {
    return (value) => {
        return int(value) && Number(value) >= 0;
    }
}

export default nature;
