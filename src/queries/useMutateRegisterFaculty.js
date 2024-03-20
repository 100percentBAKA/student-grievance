import { useMutation } from "react-query"
import axios from "axios";

export default function useMutateRegisterFaculty() {
    return useMutation(
        (data) => axios.post("https://43.204.145.104:8000/api/v1/faculty", data),
        {
            onSuccess: () => {
                console.log('Post request successful');
            },
            onError: () => {
                console.log('Post request failed')
            }
        }
    )
}