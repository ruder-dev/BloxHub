//Imported Functions
import { createWarningText , hideWarningText , isDictionaryEmpty} from "../../shared/js/main.js";
import { saveClient , getClientInfo , getClientList , removeClient , changeClientProperty} from "../../shared/js/clientStorage.js";
// Variables
//Buttons
const add_client_button = document.getElementById("add-client-button");
const edit_client_button = document.getElementById("edit-client-button");
const remove_client_button = document.getElementById("remove-client-button");
const submit_button = document.getElementById("submit-button");
//Others
const client_list_element = document.getElementById("client-list");
const scrollable_container = document.getElementById("scrollable-container");
const client_cards = document.querySelectorAll(".client-card");
const question_box = document.getElementById("question-box");
let current_displayed_client = null;
//Detailed-Info
const detailed_username = document.getElementById("detailed-username");
const detailed_amount = document.getElementById("detailed-robux-amount");

//Config
const missing_info_keyword = "unknown";
const test_user = "Guest_1";

const min_threshold = 0
const max_threshold = 0.5
const threshold_ratio = 0.5
//main code
//functions



function setupClients() {
    let client_list = getClientList()

    if (!client_list) {
        console.warn("Values is null (list): " , client_list)
        return
    }

    for (const client_key in client_list) {
        let client_info = client_list[client_key]
        if (isDictionaryEmpty(client_info)) {continue}

        addNewClient(client_info)
    }
}


function addNewClient({client_name,robux_amount,job_type,priority}) {
    if (!client_name || !robux_amount || !job_type || !priority) {
        console.warn("Paramaters given is null!")
        console.warn(client_name , robux_amount , job_type , priority)
        return
    }

    let client_card = document.createElement("li")
    client_card.className = "client-card container-animation-delay animation-on-load"

    let card_header = document.createElement("div")
    card_header.className = "client-header"

    let card_info = document.createElement("div")
    card_info.className = "general-client-info"


    card_header.innerHTML = `
    <img src="https://dummyimage.com/50x50/333/fff" alt="image of ${client_name}">
    <h4>${client_name}</h4>
    `
    card_info.innerHTML = `
    <p>amount of robux: ${robux_amount}</p>
    <p>job type: ${job_type}</p>
    <p>Priority: ${priority}</p>
    `
    client_card.appendChild(card_header)
    client_card.appendChild(card_info)

    
    client_list_element.prepend(client_card)
    observer.observe(client_card)
}

function showDetailedDashboard(client_key) {
    let client_info = getClientInfo(client_key)

    if (!client_info || Object.keys(client_info).length === 0) {
        console.warn("Client info is null or is empty (client_info): ", client_info)
        detailed_amount.textContent = "amount of robux: " + missing_info_keyword
        detailed_username.textContent = missing_info_keyword
        return
    }

    detailed_amount.textContent = "amount of robux: " + client_info["robux_amount"]
    detailed_username.textContent = client_info["client_name"].trim()

    current_displayed_client = client_key
}



function createQuestionDiv(text_content,placeholder,element_id) {

    if (!text_content || !element_id) {
        console.warn("Was not provided any textContent or an id!");
        return;
    }
    let container = document.createElement("div");
    let text = document.createElement("p");
    let input_box = document.createElement("input")

    text.textContent = text_content;
    input_box.type = "text";
    input_box.placeholder = placeholder || " "
    input_box.classList.add("input-box");
    input_box.id = element_id;
    container.append(text);
    container.append(input_box);
    container.classList.add("row-container");
    container.classList.add("remove-me")
    return container;
}
function showMultiQuestionBox() {
    question_box.classList.remove('hidden');
}

function hideQuestionBox() {
    question_box.classList.add('hidden');
    document.querySelectorAll(".remove-me").forEach(element => element.remove());
}

//event listeners

add_client_button.addEventListener('click',function() {
    if(!question_box.classList.contains("hidden")) {
        console.warn("The questions are being shown to the user!");
        return;
    }
    showMultiQuestionBox();

    let name = createQuestionDiv("Enter client name: ","random-client-123","question-name");
    let job_difficulty = createQuestionDiv("Enter type: ","modeling","question-type");
    let amount_robux = createQuestionDiv("Enter amount of Robux: ","1000","question-amount");
    let commission_priority = createQuestionDiv("Enter the priority: ","Low","question-priority");
    question_box.append(name,job_difficulty,amount_robux,commission_priority);

})  

submit_button.addEventListener('click',function(){
    const getValue = id => (document.getElementById(id)?.value.trim()) || null;

    let client_info = {
        client_name: getValue("question-name"),
        robux_amount: getValue("question-amount"),
        job_type: getValue("question-type"),
        priority: getValue("question-priority"),
    }

    let client_name = client_info["client_name"];
    let is_single_edit = (Object.values(client_info).length === 1 && !client_name && !current_displayed_client)
    if(is_single_edit) {
        changeClientProperty(current_displayed_client,"client_name",client_name);
        return;
    }
    if (isDictionaryEmpty(client_info)) {
        console.warn("Some fields are empty!");
        createWarningText(question_box,"Make sure that you entered all of the details!");
        return;
    }

    if(question_box.querySelector("#warning-text")) {
        hideWarningText(question_box);
    }
    hideQuestionBox();
    saveClient(client_name,client_info);
    addNewClient(client_info);
})
edit_client_button.addEventListener('click',function() {

    if(current_displayed_client == null) {
        console.warn("There is no client displayed to edit!");
        return;
    }

    showMultiQuestionBox();
    let name_div = createQuestionDiv("Enter new name: ","new-name 123","question-name");
    question_box.append(name_div);
})

remove_client_button.addEventListener('click',function() {
    removeClient(current_displayed_client);
})

client_list_element.addEventListener('click',(event) => {
    let li = event.target.closest(".client-card") 

    if (!li) {
        console.warn("li is null!");
        return
    }
    let client_key = li.querySelector("h4").textContent.trim()
    showDetailedDashboard(client_key)
})

//Observers and etc

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        let target = entry.target

        if (entry.intersectionRatio < threshold_ratio) {
            //target.classList.remove("animation-slideUp-quick");
            //target.classList.add("animation-slideDown-quick");
        }else {
            //target.classList.remove("animation-slideDown-quick");
            //target.classList.add("animation-slideUp-quick");
        }
    })
},{
    root: scrollable_container,
    threshold: [min_threshold,max_threshold]
})


client_cards.forEach(card => observer.observe(card))



setupClients()
