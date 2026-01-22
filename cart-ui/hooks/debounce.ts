'use client';
import { debounce } from 'lodash';
import { useCallback } from 'react';

import type { UseDebounceOutput } from '@/interfaces';

import { DEFAULT_DEBOUNCE_TIME_MS } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <FuncType extends (...args: any[]) => any>(
    func: FuncType
): UseDebounceOutput<FuncType> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFunc = useCallback(
        debounce(func, DEFAULT_DEBOUNCE_TIME_MS, {
            leading: false,
            maxWait: 100,
            trailing: true,
        }),
        [func]
    );

    return {
        debouncedFunc,
    };
};

export default useDebounce;
