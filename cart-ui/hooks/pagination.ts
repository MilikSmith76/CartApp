import { useCallback, useMemo, useState } from 'react';

import type { UsePaginationProps } from '@/interfaces';

import { DEFAULT_PAGE_SIZE } from '@/utils';

const usePagination = (total: number): UsePaginationProps => {
    const [page, setPage] = useState(0);

    const toPrevPage = useCallback(() => {
        if (page == 0) {
            return;
        }

        setPage(page - 1);
    }, [setPage, page]);

    const toNextPage = useCallback(() => {
        setPage(page + 1);
    }, [setPage, page]);

    const toPage = useCallback(
        (newPage: number) => {
            setPage(newPage);
        },
        [setPage]
    );

    const hasPrev = useMemo(() => page > 0, [page]);

    const hasNext = useMemo(
        () => (page + 1) * DEFAULT_PAGE_SIZE < total,
        [page, total]
    );

    return {
        hasNext,
        hasPrev,
        page,
        toNextPage,
        toPage,
        toPrevPage,
    };
};

export default usePagination;
