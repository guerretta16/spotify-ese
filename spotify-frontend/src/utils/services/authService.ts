import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../globalParams";
import { SearchParams, RequiredParams } from "../interfaces";

interface Props {
    requiredParam: RequiredParams,
    grant_type: string
}

export const authTokenService = async ({requiredParam, grant_type} : Props) => {

    try{
        const params = {
            ...requiredParam,
            grant_type: grant_type,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        }
    
        const searchParams = Object.keys(params).map((key) => encodeURIComponent(key)+"="+encodeURIComponent(params[key as keyof SearchParams]!)).join('&');
    
        const response = await axios.post(
            'https://accounts.spotify.com/api/token', 
            searchParams,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                withCredentials: true,
            }
        )
    
        return response.data;
    }
    catch(err){

    }
    
}

