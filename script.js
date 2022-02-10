let contact = null;
let mode = null;
// função para abrir barra lateral
function showSideBar() {
    document.querySelector("aside").classList.remove("hidden")
    document.querySelector("main").classList.add("bright");
}
// função para fechar a barra lateral
function unShowSideBar() {
    if (document.querySelector("main").classList.contains("bright")) {
        document.querySelector("aside").classList.add("hidden")
        document.querySelector("main").classList.remove("bright");
    }
}
// função para adicionar mensagens
function sendMessage () {
    const input = document.querySelector("footer input").value;

    const ul = document.querySelector("ul");
    ul.innerHTML += `
            <li>
                <div class="chat">
                    <div class="time">(09:21:45)</div>
                    <div class="message">${input}</div>
                </div>
            </li>
        `;
    input.value = "";
    console.log(input);
}
// função para escolher destinatario da mensagem 
function receiver (receiverOption) {
    if(contact !== null) {
        contact.querySelector("aside .check").classList.add("hidden");
    }

    contact = receiverOption;
    contact.querySelector("aside .check").classList.remove("hidden");
}
// função para escolher entre mensagem publica ou privada
function typeMessage(typeOption) {
    if(mode !== null) {
        mode.querySelector("aside .check").classList.add("hidden");
    }

    mode = typeOption;
    mode.querySelector("aside .check").classList.remove("hidden");
}

