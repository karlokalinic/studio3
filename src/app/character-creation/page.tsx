
'use client';

import { Suspense } from 'react';
import CharacterCreationContent from './_components/character-creation-content';

export default function CharacterCreationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CharacterCreationContent />
        </Suspense>
    )
}
