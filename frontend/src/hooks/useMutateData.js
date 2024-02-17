import { useMutation } from "react-query"
import axios from "axios";

export default function useMutateData() {
    return useMutation(
        (data) => axios.post("http://localhost:8080/grievance", data),
        {
            onSuccess: () => {
                // add success toast here
                console.log('Post request successful');
            },
            onError: () => {
                console.log('Post request failed')
            }
        }
    )
}