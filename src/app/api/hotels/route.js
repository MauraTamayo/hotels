export async function GET() {
  try {
    const response = await fetch("http://host.docker.internal:8088/api/hotels", {
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

// export async function POST(req) {
  // const data = await req.json();
  // console.log("dataPost: ", data)
  // return fetch('http://host.docker.internal:8088/NewHotel', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*'
  //     },
  //     body: JSON.stringify(data)
  // }).then(async (res) => Response.json(await res.json())).catch((error) => { throw new Error(error) });
// }
