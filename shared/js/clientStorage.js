//Imported Functions
//Variables
//Config
//Functions
//Exported Functions

export function saveClient(client_key,client_info) {

    if (!client_key || !client_info) {
        console.warn("One Of the properties given is null!")
        return
    }

    let client_list = getClientList()
    client_list[client_key] = client_info

    localStorage.setItem("Clients",JSON.stringify(client_list))
}

export function getClientList() {
    const raw_data = localStorage.getItem("Clients")

    if (!raw_data) {
        console.warn("Couldn't get client_list due to raw data being null!");
        return {}
    }

    try {
        return JSON.parse(raw_data)
    } catch (error) {
        console.warn("Corrupted JSON found in localStorage! Clearing list!")
        console.warn(localStorage)
        localStorage.setItem("Clients",JSON.stringify({}))
        return {}
    }
}

export function getClientInfo(client_key) {

    if (!client_key) {
        console.warn("Client_key hasn't been provided!")
        return
    }

    let client_list = getClientList()

    if (!client_list[client_key]) {
        console.warn("Couldn't find client!")
        return
    }

    return client_list[client_key]
}

export function removeClient(client_key) {
    
    if(!client_key) {
        console.warn("Client_key is null!");
        return;
    }

    let client_list = getClientList()

    if (!client_list) {
        console.warn("Client list is null!")
        return
    }

    if (!client_list[client_key]) {
        console.warn(`Couldn't find ${client_key} in client_list!`);
        return
    }

    delete client_list[client_key]; 
}

export function changeClientProperty(client_id,property,value) {
    
    if(!client_id || !property || !value) {
        console.warn("Can't edit client due to one of the properties being null!");
        return;
    }
    let client_list = getClientList();
    let client_info = getClientInfo(client_id);

    if(!client_list || !client_info || !client_info[property]){
        console.warn("Couldn't get client info or the property wanted to change!");
        return;
    }

    client_info[property] = value;
    client_list[client_id] = client_info;
    
    localStorage.setItem("Clients",JSON.stringify(client_list));
}