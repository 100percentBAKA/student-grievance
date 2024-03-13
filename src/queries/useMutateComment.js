import { useMutation } from "react-query"
import axios from "axios";

export default function useMutateComment(grievanceID) {
    return useMutation(
        (data) => axios.post(`https://43.204.145.104:8000/comment/add-comment/${grievanceID}`, data),
        {
            onSuccess: () => {
                console.log('Comment posted successfully');
            },
            onError: () => {
                console.log('Post request failed')
            }
        }
    )
}

// http://localhost:8080/comment/add-comment/b47f07e1-e403-410a-bf99-13b513135967