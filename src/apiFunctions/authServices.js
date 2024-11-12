const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const register = async (dataRegistre) => {
    try {
        console.log("Entro al frontedn del registro")
        const response = await fetch(`${baseUrlApi}/register`, {
            method: "POST",
            body: JSON.stringify(dataRegistre)
        })
        console.log("registro desde back del front posts: ", response)
        const posts = await response.json()
        

        return posts
    } catch (error) {
        // Verificar si el error tiene respuesta y si es un error de cliente (400)
        if (error.response && error.response.status === 400) {
            throw new Error("El nombre de usuario ya está en uso");
        } else {
            throw new Error("Ocurrió un problema al procesar el registro. Intente más tarde.");
        }
    }
};

export const login = async (credentials) => {
    console.log("credentials login", credentials)
        try {
            const data = await fetch(`${baseUrlApi}/login`, {
                method: "POST",
                body: JSON.stringify(credentials)
            })
            const posts = await data.json()
            console.log("credenciales desde back del front posts: ", posts)

            return posts
        } catch (error) {
            throw new Error(error);
        }
    }