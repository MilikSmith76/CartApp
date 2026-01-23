interface UsePaginationProps {
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
    toNextPage: () => void;
    toPage: (page: number) => void;
    toPrevPage: () => void;
}

export type { UsePaginationProps };
