import axios from "axios"

export const putApi = async(url:string, name:string, token?:string, ) => {
    const res = await axios.put(`http://localhost:8000/api/v1/update-user-info`, name, {
        headers:{Authorization:token},
    });
    return res
}