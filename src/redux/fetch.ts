
interface FetchTypes {
    method: string,
    url: string
}

export const Fetch = ({ method, url }: FetchTypes) => {
    if (!method) {
        throw Error("Please specify method for this api call");
    }

    if (!url) {
        throw Error("Please specify url for this api call");
    }

    const headers = {};

    const config = {
        method,
        cache: "no-cache",
        headers,
    };

    return new Promise(async (resolve, reject) => {

        const response = await fetch(url, config as object);

        if (response?.ok) {
            try {
                const result = await response.clone().json();
                resolve(result);
            } catch (error) {
                const result = await response.text();
                resolve(result);
            }
        } else {
            const result = await response.json();
            reject({ result, status: response.status });
        }
    });
};