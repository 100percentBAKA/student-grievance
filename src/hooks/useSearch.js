export function useSearchGrievances(grievances, query) {
    return grievances.filter(grievance =>
        grievance.title.toLowerCase().includes(query.toLowerCase())
    );
}