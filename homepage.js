const divHome = document.getElementById("div-home")
const divAbout = document.getElementById("div-about")

setTimeout( selectSection(1) , 500)

function selectSection(sectionId) {
    if (sectionId == 1) {
        divHome.style.display = "initial"
        divAbout.style.display = "none"
    }
    if (sectionId == 2) {
        divAbout.style.display = "initial"
        divHome.style.display = "none"
    }
}
