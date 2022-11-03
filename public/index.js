function handleClick(route, request) {

    switch (request) {
        case "GET":
            getData(route).then((res) => {
                printData(res);
            });
            break;
        case "PUT":
            putData(route).then((res) => {
                printData(res);
            });
            break;
    }

}

function getData(route) {
    return new Promise((resolve, reject) => {
        console.log(route);
        let url = "http://localhost:3000/" + route;
        axios.get(url).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err.message);
        })
    })

}

function putData(route) {
    return new Promise((resolve, reject) => {
        console.log(route);
        let url = "http://localhost:3000/" + route;
        let description = document.getElementById("description").value;
        let body = {
            'description': description
        };
        let config = {
            headers: {"Content-Type": "application/json"}
        }
        axios.put(url, body, config).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err.message);
        })
    })

}   

function printData(message) {
    try {
        let el = document.getElementById("api-rawRes");
        el.innerHTML = JSON.stringify(message);
    } catch (err) {
        handleError(err.message);
    }
}

function handleError(errorMessage) {
    console.error(errorMessage);
    printData(errorMessage.message);
}

