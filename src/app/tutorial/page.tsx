
'use client';

import { Suspense } from 'react';
import TutorialContent from './_components/tutorial-content';

export default function TutorialPage() {
    return (
        <Suspense fallback={<div>Loading Tutorial...</div>}>
            <TutorialContent />
        </Suspense>
    )
}
