import axios from 'axios'
import { useQuery, useMutation } from "react-query"

async function submitForm(formData) {
    try {
        const response = await axios.post("http://localhost:8080/grievance", formData)
        return response.data;
    } catch (error) {
        throw new Error("error submitting the form", error.message)
    }
}

async function fetchForm(formID) {
    try {
        const response = await axios.get("http://localhost:8080")
        return response.data
    } catch (error) {
        throw new Error("error fetching the form", error.message)
    }
}

export const useFormQuery = (formId, options = {}) => {
    return useQuery(['form', formId], () => fetchForm(formId), options)
}

export const useFormMutation = () => {
    return useMutation((formData) => submitForm(formData))
}