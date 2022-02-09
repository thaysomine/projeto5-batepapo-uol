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