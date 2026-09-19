//Variables
const root = window.location.origin
const default_site_root = `${root}/Websites/BloxHub`
//Config

//Functions

//export functions

export function createWarningText(warning_parent,text_content) {
    
    if(!warning_parent || !text_content) {
        console.warn("Was not given warning_parent or text_content!");
        return;
    }

    let warning_text = warning_parent.querySelector("#warning-text");
    
    if(!warning_text) {
        warning_text = document.createElement("p");
    }
    warning_text.classList.add("animation-on-load","paragraph-animation-delay","warning-text");
    warning_text.classList.remove("hidden");
    warning_text.id = "warning-text";
    
    warning_text.textContent = text_content;
    warning_parent.append(warning_text);
}

export function hideWarningText(warning_parent){


    if(!warning_parent) {
        console.warn("warning_parent is null!");
        return;
    }

    let warning_text = warning_parent.querySelector("#warning-text");
    
    if(!warning_text){
        console.warn("There isn't a warning-text to delete!");
        return;
    }

    warning_text.remove();
}

export function isDictionaryEmpty(dictionary){
    if (!dictionary) {
        console.warn("Dictionary was not given!");
        return;
    }

    let has_empty_fields = Object.values(dictionary).some(value => !value);

    if(has_empty_fields){
        return true;
    }

    return false;
}
//Event listeners

//Function calls
