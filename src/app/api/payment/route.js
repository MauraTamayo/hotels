import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const plainPayment = await req.json()
    console.log(
      "Pago desde back del server reservas: ",
      plainPayment
    )

    const data = JSON.stringify(plainPayment)
    console.log("dataPost: ", data)

    const response = await fetch("http://host.docker.internal:8088/api/availability/reservation/pay/", {
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
    return Response.json(responseData)
  } catch (error) {
    return error
   
  }
}
