import axios from 'axios';

import { DEFAULT_REQUEST_TIMEOUT } from './constants';

const baseListFetcher = async <ResponseType>(
    url: string,
    page?: number,
    limit?: number,
    search?: string
): Promise<ResponseType> => {
    try {
        const { data } = await axios.get<ResponseType>(url, {
            params: {
                limit,
                page,
                search,
            },
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });

        return data;
    } catch {
        throw new Error('Was unable to retrieve items. Please try again.');
    }
};

export { baseListFetcher };
