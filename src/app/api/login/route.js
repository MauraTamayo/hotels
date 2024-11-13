const baseUrlApi = process.env.NEXT_PUBLIC_API_URL_BACK_AUTH
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const plainCredentials = await req.json()
    console.log(
      "credenciales desde back del server credentials: ",
      plainCredentials
    )

    const data = JSON.stringify(plainCredentials)
    console.log("dataPost: ", data)

    const response = await fetch(`${baseUrlApi}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })

    if (!response.ok) {
        return new NextResponse("error",{status:response.status})
    }

    const responseData = await response.json()
    console.log("responseData:", responseData)
    return Response.json(responseData)
  } catch (error) {
    console.log("Entro en el catch")
    return new NextResponse("Internal server error",{status:500})
   
  }
}
