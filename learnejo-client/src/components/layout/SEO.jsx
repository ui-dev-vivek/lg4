import { useEffect } from 'react';
import { updateMetadata } from '../../utils/metadata';

export default function SEO({
    title,
    description,
    canonical,
    image,
    noindex
}) {
    useEffect(() => {
        updateMetadata({
            title,
            description,
            canonicalUrl: canonical,
            image,
            noIndex: noindex,
        });
    }, [title, description, canonical, image, noindex]);

    return null;
}
