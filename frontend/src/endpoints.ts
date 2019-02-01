export const host = process.env.REACT_APP_API_URL;
export const baseUrl = `${host}/api`;

export const endpoints = {
    kudos: (page = 1) => `${baseUrl}/kudos/${page}`,
    removeKudos: (kuid: string) => `${baseUrl}/remove_kudos/${kuid}`,
    users: `${baseUrl}/all_users`,
    topPicks: `${baseUrl}/top_picks`,
    login: `${baseUrl}/login`,
    createPdf: (range: string) => `${baseUrl}/create_pdf/${range}`,
    profile: `${baseUrl}/profile`,
    voteForKudos: `${baseUrl}/vote_for_kudos`,
};
