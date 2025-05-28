export function generateMetadata({ params, searchParams }, parent) {
    return {
        title: "Contactanos",
        description: "Ponte en contacto con nosotros para cualquier consulta o soporte.",
        keywords: "contacto, soporte, alvastore, ayuda",
    }
}

export default function ContactPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold underline text-center mt-10">
                Contactanos
            </h1>
            <p className="text-center mt-4 max-w-lg">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte. Puedes enviarnos un correo electrónico a {" "}
                <a href="mailto:soporte@alvastore.com" className="text-blue-500 hover:underline">
                    soporte@alvastore.com
                </a>{" "}
            </p>
        </div>
    );
}