import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const plainForm = await req.json()
    const data = JSON.stringify(plainForm)
    console.log("dataPost: ", data)

    const response = await fetch("http://host.docker.internal:8088/api/availability/reservation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
    console.log("response:", response)
    if (!response.statusText) {
        console.log("entro al if")
        return new NextResponse("error",{status:response.status})
    }

    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    return new NextResponse("Internal server error",{status:500})
   
  }
}


export async function GET() {
    try {
      const response = await fetch("http://host.docker.internal:8088/api/availability/reservation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
  
      if (!response.ok) {
        throw new Error(error)
      }
  
      const responseData = await response.json()
      return Response.json(responseData)
    } catch (error) {
      throw new Error(error)
    }
  }