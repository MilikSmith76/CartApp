const duplicate = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};

const getValue = <Type>(object: Type | undefined, defaultValue: Type): Type => {
    return object ?? defaultValue;
};

export { duplicate, getValue };
