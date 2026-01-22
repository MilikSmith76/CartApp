import type { DebouncedFunc } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UseDebounceOutput<FuncType extends (...args: any[]) => any> {
    debouncedFunc: DebouncedFunc<FuncType>;
}

export type { UseDebounceOutput };
