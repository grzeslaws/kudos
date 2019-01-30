export const http = async (url: string, data: {} | null = null) => {
    let options: {} = {
        headers: {
            "Content-Type": "application/json",
            "kudosAuthToken": sessionStorage.getItem("kudosAuthToken"),
        },
    };

    if (data) {
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "kudosAuthToken": sessionStorage.getItem("kudosAuthToken"),
            },
            body: JSON.stringify(data),
        };
    }

    try {
        const fetchData = await fetch(url, options);
        return fetchData.json();
    } catch (e) {
        console.error({ message: e });
    }
};
