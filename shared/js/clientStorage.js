//Imported Functions
//Variables
//Config
//Functions
//Exported Functions

export function saveClient(client_key, client_info) {
    if (!client_key || !client_info) {
        console.warn("One of the parameters given is missing!");
        return;
    }

    let client_list = getClientList();
    client_list[client_key] = client_info;

    localStorage.setItem("Clients", JSON.stringify(client_list));
}

export function getClientList() {
    const raw_data = localStorage.getItem("Clients");

    if (!raw_data) {
        return {};
    }

    try {
        return JSON.parse(raw_data);
    } catch (error) {
        console.warn("Corrupted JSON found in localStorage! Resetting list.");
        localStorage.setItem("Clients", JSON.stringify({}));
        return {};
    }
}

export function getClientInfo(client_key) {
    if (!client_key) {
        console.warn("Client key was not provided!");
        return null;
    }

    let client_list = getClientList();
    return client_list[client_key] || null;
}

export function removeClient(client_key) {
    if (!client_key) {
        console.warn("Client key is missing!");
        return;
    }

    let client_list = getClientList();

    if (!client_list[client_key]) {
        console.warn(`Couldn't find '${client_key}' in client_list!`);
        return;
    }

    delete client_list[client_key];
    localStorage.setItem("Clients", JSON.stringify(client_list));
}

export function changeClientProperty(client_id, property, value) {
    
    if (client_id === undefined || property === undefined || value === undefined) {
        console.warn("Missing parameter for changeClientProperty!");
        return;
    }

    let client_list = getClientList();
    let client_info =  client_list[client_id];
    
    if (!client_info) {
        console.warn(`Couldn't find client '${client_id}'!`);
        return;
    }

    if(property === "client_name") {
        client_list[value] = client_info;
        delete client_list[client_id];
    }

    
    client_info[property] = value;

    
    localStorage.setItem("Clients", JSON.stringify(client_list));
}