import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const plainForm = await req.json()


    const data = JSON.stringify(plainForm)
    console.log("dataPost: ", data)

    const response = await fetch("http://host.docker.internal:8080/api/auth/signup", {
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
    console.log("responseData:", Response.json(responseData))
    return Response.json(responseData)
   
  } catch (error) {
    console.log("Entro en el catch, ", error)
    return new NextResponse("Internal server error",{status:500}, error)
   
  }
}

