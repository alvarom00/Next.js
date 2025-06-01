import { NextResponse } from "next/server"

export async function POST(request) {
    const formData = await request.json()
    console.log("Received form data:", formData)

    return NextResponse.json({
        message: "Formulario recibido correctamente",
        data: formData
    })
}