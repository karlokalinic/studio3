

'use client';

import { Suspense } from 'react';
import StatInternalsContent from './_components/stat-internals-content';

export default function StatInternalsPage() {
    return (
        <Suspense fallback={<div>Loading Stat Internals...</div>}>
            <StatInternalsContent />
        </Suspense>
    )
}
