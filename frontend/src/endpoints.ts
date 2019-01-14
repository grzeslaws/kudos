export const host = "http://127.0.0.1:5000";
export const baseUrl = "http://127.0.0.1:5000/api";

export const endpoints = {
    kudos: (page = 1) => `${baseUrl}/kudos/${page}`,
    users: `${baseUrl}/users`,
    createPdf: (range: string) => `${baseUrl}/create_pdf/${range}`
};
