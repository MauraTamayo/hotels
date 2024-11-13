// Apifunctions/paymentSewrvices.js
const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const bookingPayment = async (data) => {
    try {
        const response = await fetch(`${baseUrlApi}/payment`, {
            method: "POST",
            body: JSON.stringify(data)
        })
        console.log("registro desde back del front posts: ", response)
        const posts = await response.json()
        

        return posts
    } catch (error) {
        // Verificar si el error tiene respuesta y si es un error de cliente (400)
        return error
    }
};

