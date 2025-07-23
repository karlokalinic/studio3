

'use client';

import { Suspense } from 'react';
import CharacterProfileContent from './_components/character-profile-content';

export default function CharacterProfilePage() {
    return (
        <Suspense fallback={<div>Loading Character Profile...</div>}>
            <CharacterProfileContent />
        </Suspense>
    )
}
