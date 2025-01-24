

export function getData(url) {

    return fetch(url)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error("Error while getting data from server.");
        })
        .catch(error => console.log(error));   
}

export function postData(url, data) {

    const options = {
        method: "POST",
        body: data          
    }

    return fetch(url, options)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error("Error while getting data from server.");
        })
        .catch(error => console.log(error));   
}