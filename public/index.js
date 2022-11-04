//Config JSON for request
const config = {
    headers: {"Content-Type": "application/json"}
};

//Permet de choisir la bonne méthode en fonction de request
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
        case "POST":
            postData(route).then((res) => {
                printData(res);
            });
            break;
        case "DELETE":
            deleteData(route).then((res) => {
                printData(res);
            });
            break;
    }
}

//Create url for api with route
function createUrl(route){
    return "http://localhost:3000/" + route;
}

//Get data with route
function getData(route) {
    return new Promise((resolve, reject) => {
        axios.get(createUrl(route)).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err.message);
        })
    })

}

//Put data with route
function putData(route) {
    return new Promise((resolve, reject) => {
        //new description
        let description = document.getElementById("description").value;
        //JSON for send to API 
        let body = {
            'description': description
        };
        axios.put(createUrl(route), body, config).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err.message);
        })
    })
}

function postData(route){
    return new Promise((resolve, reject) => {
        //new name and description
        let name = document.getElementById("nom").value;
        let description = document.getElementById("description").value;
        //JSON for send to API 
        let body = {
            'name': name,
            'description': description
        };
        axios.post(createUrl(route),body,config).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err.message);
        })
    })
}
//Delete data with route
function deleteData(route){
    return new Promise((resolve, reject) => {
        axios.delete(createUrl(route)).then((res) => {
            return resolve(res.data)
        }).catch((err) => {
            return reject(err.message);
        })
    })
}
//fonction qui print les données de la requête dans api-rawRes
function printData(message) {
    try {
        let el = document.getElementById("api-rawRes");
        el.innerHTML = JSON.stringify(message);
    } catch (err) {
        handleError(err.message);
    }
}
//fonction qui gère les erreurs
function handleError(errorMessage) {
    printData(errorMessage.message);
}