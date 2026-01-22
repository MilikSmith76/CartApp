'use client';
import type { ChangeEvent, JSX } from 'react';

import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import { useCallback, useEffect, useState } from 'react';

import type { Grocery, GrocerySearchFieldProps } from '@/interfaces';

import { useGroceries } from '@/hooks';

import Button from './button';
import Loading from './loading';

const FIRST_PAGE_RESULTS_ONLY = 0;

const GrocerySearchField = ({
    onAddGrocery,
}: GrocerySearchFieldProps): JSX.Element => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Grocery | null>(null);

    const { fetchGroceries, groceries, isLoading } = useGroceries();

    const onQuery = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
        [setQuery]
    );

    const onClose = useCallback(() => setQuery(''), [setQuery]);

    const getDisplayName = useCallback(
        (grocery: Grocery | undefined) => grocery?.name ?? '',
        []
    );

    const handleAddGrocery = useCallback(() => {
        if (!selected) {
            return;
        }

        onAddGrocery?.(selected);
    }, [onAddGrocery, selected]);

    useEffect(() => {
        if (!query) {
            return;
        }

        fetchGroceries(FIRST_PAGE_RESULTS_ONLY, query);
    }, [fetchGroceries, query]);

    return (
        <div className='mb-5'>
            <div className='font-bold'>Add new Grocery</div>
            <div className='inline-flex w-full'>
                <Combobox
                    onChange={setSelected}
                    onClose={onClose}
                    value={selected}
                >
                    <ComboboxInput
                        aria-label='Assignee'
                        className='mt-1 block w-full flex-1 rounded border-2 p-2 dark:border-white'
                        displayValue={getDisplayName}
                        onChange={onQuery}
                    />
                    <ComboboxOptions
                        anchor='bottom'
                        className='border empty:invisible'
                    >
                        {isLoading && (
                            <div className='w-(--input-width) bg-white py-3'>
                                <Loading />
                            </div>
                        )}
                        {!isLoading &&
                            groceries.map((grocery) => (
                                <ComboboxOption
                                    className='w-(--input-width) bg-white py-2 pl-3 data-focus:bg-slate-100'
                                    key={grocery.id}
                                    value={grocery}
                                >
                                    {grocery.name}
                                </ComboboxOption>
                            ))}
                    </ComboboxOptions>
                </Combobox>
                <Button
                    className='ml-5 cursor-pointer rounded-md bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-300 disabled:cursor-default disabled:bg-slate-500'
                    onClick={handleAddGrocery}
                    text='Add'
                />
            </div>
        </div>
    );
};

export default GrocerySearchField;
