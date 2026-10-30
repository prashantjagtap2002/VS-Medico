import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import gallery from '../../../content/settings/gallery.json';

export const metadata: Metadata = pageMetadata({
  title: 'Photo Gallery',
  description: 'A look inside VS Medico LLP: our Bhandup West warehouse, cold storage, dispatch operations and team.',
  path: '/gallery',
});

interface GalleryPhoto {
  image: string;
  title: string;
  caption?: string;
}

export default function GalleryPage() {
  // Edited from /admin → Company Settings → Photo Gallery.
  const photos = (gallery.photos as GalleryPhoto[]).filter((p) => p.image && p.title);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>
            <span className="accent-teal">Photo</span> <span className="accent">Gallery</span>
          </h1>
          <p>A glimpse into VS Medico&apos;s warehouse, operations and team, and our commitment to dependable supply.</p>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="grid-2">
            {photos.map((p) => (
              <figure key={p.image + p.title} className="gallery-card">
                <div className="gallery-media">
                  <img src={p.image} alt={p.caption || p.title} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                  <strong>{p.title}</strong>
                  {p.caption && <span>{p.caption}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
