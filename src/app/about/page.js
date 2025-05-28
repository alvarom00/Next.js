export function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Acerca de AlvaStore",
    description: "Aprende más sobre nosotros y nuestra misión en AlvaStore.",
    keywords: "about us, alvastore, company information",
  };
}

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold underline text-center mt-10">
                Acerca de AlvaStore
            </h1>
            <p className="text-center mt-4 max-w-lg">
                AlvaStore es tu destino ideal para comprar juegos de PC a precios accesibles. Nos dedicamos a ofrecer los mejores precios y el mejor servicio a nuestros clientes.
            </p>
        </div>
    );
}