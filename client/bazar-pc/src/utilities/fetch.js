

function getData(url) {

    return fetch(url)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error("Error while getting data from server.");
        })
        .catch(error => console.log(error));   
}