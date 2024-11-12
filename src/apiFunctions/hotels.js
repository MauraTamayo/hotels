// FUNCIONES DE COMUNICACIONES DE API INTERNA 
const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const listHotels = async () => {
    try {
        const response = await fetch(`${baseUrlApi}/hotels`)
        console.log(response)
        return await response.json()
    } catch (error) {
        return []
    }
  }

export const detailHotelRooms = async (id) => {
    
    try {
        const response = await fetch(`${baseUrlApi}/hotels/${id}`)
        return await response.json()
    } catch (error) {
        console.error("Error en detailHotelRooms:", error);
        return []
    }
}


//   export const saveHotel = async (params) =>  {
//     try {
//         const response = await fetch(`${baseUrlApi}/hotels`, {
//             method: "POST",
//             body: params
//         })
//         return await response.json()
//     } catch (error) {
//         console.log(error)
//         return []
//     }
//   }