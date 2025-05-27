import Image from "next/image";

export function gemerateMetadata({ params, searchParams}, parent) {
  const data = {
  title: "AlvaStore",
  domain: "https://alvastore.com",
  keywords: "videojuegos, tienda virtual, alvastore",
  }

  return data;
}

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mt-10">
        Bievenido a AlvaStore
      </h1>
    </>
  );
}
