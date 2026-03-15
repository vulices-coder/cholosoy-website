import GalleryRail from "@/components/sections/gallery/GalleryRail";
import { getGalleryImages } from "@/lib/queries/gallery";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main>
      <GalleryRail images={images} />
    </main>
  );
}