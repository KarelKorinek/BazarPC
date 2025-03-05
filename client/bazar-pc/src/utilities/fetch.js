
function handleFetch( url, options) {

    // send cookie with request
    options = { ...options, credentials: "include"}
    
    return fetch(url, options)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error("Error while getting data from server.");
        })
        .catch(error => console.log(error));           
}

export function deleteData(url) {

    const options = {
        method: "DELETE"
    }

    return handleFetch(url, options);
}

export function getData(url) {

    return handleFetch(url);
}

export function putFormData(url, data) {

    const options = {
        method: "PUT",
        body: data          
    }

    return handleFetch(url, options);
}

export function postFormData(url, data) {

    const options = {
        method: "POST",
        body: data          
    }

    return handleFetch(url, options);
}

export function postJSONData(url, data) {

    const options = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(data),          
    }

    return handleFetch(url, options);
}