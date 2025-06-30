import Image from "next/image";

const ImagePreloader = ({ images }: { images: string[] }) => {
  return (
    <div style={{ display: "none" }}>
      {images.map((image) => (
        <Image
          key={image}
          src={`/memory-cards/${image}.webp`}
          alt="Preload"
          width={112}
          height={112}
          priority
        />
      ))}
    </div>
  );
};

export default ImagePreloader;
