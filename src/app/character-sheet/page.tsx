
'use client';

import { Suspense } from 'react';
import CharacterSheetContent from './_components/character-sheet-content';

export default function CharacterSheetPage() {
    return (
        <Suspense fallback={<div>Loading Character Sheet...</div>}>
            <CharacterSheetContent />
        </Suspense>
    )
}
