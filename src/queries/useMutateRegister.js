import { useMutation } from "react-query"
import axios from "axios";

export default function useMutateRegister() {
    return useMutation(
        (data) => axios.post("https://43.204.145.104:8000/student", data),
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