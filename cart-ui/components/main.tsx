import type { ReactElement } from 'react';

import type { MainProps } from '@/interfaces';

const Main = ({ children }: MainProps): ReactElement => (
    <main className='max @container p-16'>{children}</main>
);

export default Main;
