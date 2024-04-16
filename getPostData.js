const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const parsedData = JSON.parse(body);
                resolve(parsedData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                reject(error);
            }
        });

        req.on("error", (error) => {
            console.error("Request error:", error);
            reject(error);
        });
    });
};

module.exports = {
    getPostData,
};
