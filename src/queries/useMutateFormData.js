import { useMutation } from "react-query"
import axios from "axios";

export default function useMutateFormData() {
    return useMutation(
        (data) => axios.post("http://localhost:8080/grievance", data),
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