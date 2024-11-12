const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const detailReserver = async (id) => {
    console.log("id 2 -----------------", id)
    try {
        const response = await fetch(`${baseUrlApi}/rooms/${id}`)
        return await response.json()
    } catch (error) {
        console.error("Error en detailHotelRooms:", error);
        return []
    }
}

