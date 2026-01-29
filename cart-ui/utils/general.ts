const duplicate = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};

const getValue = <Type>(object: Type | undefined, defaultValue: Type): Type => {
    return object ?? defaultValue;
};

const getNumber = (
    value: string,
    defaultValue: number | undefined = undefined
): number | undefined => {
    return value && !isNaN(+value) ? +value : defaultValue;
};

export { duplicate, getNumber, getValue };
