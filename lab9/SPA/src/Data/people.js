import { processRequest } from '../Utils/api';
const baseUrl = "http://localhost:3001";

export const getPeopleList = (page) => {
    return processRequest(`${baseUrl}/api/${page}/people`, "GET", {}, false);
}

export const getPerson = (id) => {
    if (!id) return Promise.reject(new Error("An ID is required to get a person by ID"));

    return processRequest(`${baseUrl}/api/people/${id}`, "GET", {}, false);
}

// export const getBook = (id) => {
//     if (!id) return Promise.reject(new Error("An ID is required to get a book by ID"));

//     return processRequest(`${baseUrl}/books/${id}`, "GET", {}, false);
// }
