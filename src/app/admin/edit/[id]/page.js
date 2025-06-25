import { CreateForm } from "../../components/CreateForm";

export default async function EditPage({ params }) {
    const { id } = params

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-3xl font-bold underline text-center mt-10">
                Actualizar producto
            </h1>
            <p className="mt-4 text-lg max-w-md text-center">
                Aquí puedes crear un nuevo producto para tu tienda. Completa el formulario a continuación con los detalles del producto.
            </p>
            <div className="w-full max-w-md">
                <CreateForm id={id}/>
            </div>
        </div>
    )
}