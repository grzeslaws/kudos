export const host = process.env.REACT_APP_API_URL;
export const baseUrl = `${host}/api`;

export const endpoints = {
    kudos: (page = 1) => `${baseUrl}/kudos/${page}`,
    users: `${baseUrl}/users`,
    login: `${baseUrl}/login`,
    createPdf: (range: string) => `${baseUrl}/create_pdf/${range}`
};
