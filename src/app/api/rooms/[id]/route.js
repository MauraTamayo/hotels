const baseUrlApi = process.env.NEXT_PUBLIC_API_URL_BACK_HOTELS

export async function GET(req,{params}) {
    const id = (await params).id
  
    console.log("id", id)
      try {
        const response = await fetch(`${baseUrlApi}/api/hotels/rooms?id=${id}`, {
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
        return error
      }
    }