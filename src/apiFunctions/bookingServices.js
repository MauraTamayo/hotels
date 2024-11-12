const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const bookingCreate = async (data) => {
    try {
        const response = await fetch(`${baseUrlApi}/reservations`, {
            method: "POST",
            body: JSON.stringify(data)
        })
        const posts = await response.json()
        console.log("reservas desde back del front posts: ", posts)
        return posts
    } catch (error) {
        throw new Error(error);
    }
}


export const listReservations = async () => {
    try {
        const response = await fetch(`${baseUrlApi}/reservations`)
        console.log(response)
        return await response.json()
    } catch (error) {
        return []
    }
  }

