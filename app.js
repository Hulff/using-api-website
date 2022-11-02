
const ulRelatorioHtml = document.getElementById("ulRelatorio")
const temperaturaHtml = document.getElementById("1")
const pressaoHtml = document.getElementById("2")
const bateriaHtml = document.getElementById("3")
const payloadAltitudeHtml = document.getElementById("10")
const payloadCo2Html = document.getElementById("11")
const payloadVocHtml = document.getElementById("12")
const inputHtml = document.getElementById("input")
const tempHtml = document.getElementById("4")
const pressHtml= document.getElementById("5") 
const batteryHtml= document.getElementById("6")
const altHtml = document.getElementById("7")
const vocHtml = document.getElementById("9")
const co2Html = document.getElementById("8")
const btnInfo = document.getElementById("btn-info")
const timeout = setTimeout(search, 6000)
clearTimeout(timeout)
let id
let x

let dadosAtuais 
let dadoAnterior 


console.log(screen.width)
console.log(screen.height)

if (screen.width <768) {
    btnInfo.addEventListener('mouseenter', () => {
        showGuide(2)
      });
      btnInfo.addEventListener('mouseleave', () => {
        closeGuide(2)
      });
    btnInfo.style.width ="9vh"
    btnInfo.style.height ="6vh"

} else {
    btnInfo.addEventListener('mouseenter', () => {
        showGuide(1)
    });
    btnInfo.addEventListener('mouseleave', () => {
        closeGuide(1)
    });
}

function showGuide(mode) {
    if(mode == 1) {
        btnInfo.innerHTML = ""
        btnInfo.style.width ="30vh"
        btnInfo.style.height ="36vh"
        btnInfo.addEventListener('transitionend', () => {
            btnInfo.innerHTML = "preencha o campo em branco com o codigo de indentificação e clique em 'Iniciar Busca' para visualizar seus dados"
          });
        } 
        if(mode == 2) {
            btnInfo.innerHTML = ""
            btnInfo.style.width ="12vh"
            btnInfo.style.height ="20vh"
            btnInfo.addEventListener('transitionend', () => {
                btnInfo.innerHTML = "preencha o campo em branco com o codigo de indentificação e clique em 'Iniciar Busca' para visualizar seus dados"
              });
            } 
   

}
function closeGuide(mode) {
    if(mode == 1) {
    btnInfo.innerHTML = ""
    btnInfo.style.width ="26vh"
    btnInfo.style.height ="12vh"
    btnInfo.addEventListener('transitionend', () => {
        btnInfo.innerHTML = "Guia de Uso"
      });
    } 
    if(mode == 2) {
        btnInfo.innerHTML = ""
        btnInfo.style.width ="9vh"
        btnInfo.style.height ="5vh"
        btnInfo.addEventListener('transitionend', () => {
            btnInfo.innerHTML = "Guia de Uso"
          });
        } 
}
function visibilidade(type) {
    if(type == 0) {
        pressaoHtml.classList.add("transparent")
        bateriaHtml.classList.add("transparent")
        payloadAltitudeHtml.classList.add("transparent")
        payloadCo2Html.classList.add("transparent")
        payloadVocHtml.classList.add("transparent")
    } else if (type == 1) {
        pressaoHtml.classList.remove("transparent")
        bateriaHtml.classList.remove("transparent")
        payloadAltitudeHtml.classList.remove("transparent")
        payloadCo2Html.classList.remove("transparent")
        payloadVocHtml.classList.remove("transparent")
    } else if (type == 2) {
        pressHtml.classList.remove("transparent")
        batteryHtml.classList.remove("transparent")
        altHtml.classList.remove("transparent")
        co2Html.classList.remove("transparent")
        vocHtml.classList.remove("transparent")
    } else if (type == 3) {
        pressHtml.classList.add("transparent")
        batteryHtml.classList.add("transparent")
        altHtml.classList.add("transparent")
        co2Html.classList.add("transparent")
        vocHtml.classList.add("transparent")
    }
}
visibilidade(0)
visibilidade(3)


function comparar() {

        let tempDif = dadosAtuais.temperatura - dadoAnterior.temperatura 
    
        if(dadoAnterior.temperatura < dadosAtuais.temperatura) {
            tempHtml.innerHTML = "Temperatura: +"+ tempDif.toFixed(3)+" °C"
        } else {
            tempHtml.innerHTML = "Temperatura: "+ tempDif.toFixed(3)+" °C"
        }
        let batteryDif = dadosAtuais.bateria - dadoAnterior.bateria
        if(dadoAnterior.bateria < dadosAtuais.bateria) {
            batteryHtml.innerHTML = "Bateria: +"+ batteryDif.toFixed(3)+"%"
        } else {
            batteryHtml.innerHTML = "Bateria: "+ batteryDif.toFixed(3)+"%"
        }
    
        let pressDif = dadosAtuais.pressao  - dadoAnterior.pressao 
        if(dadoAnterior.pressao < dadosAtuais.pressao) {
            pressHtml.innerHTML = "Pressao: +"+pressDif.toFixed(3)+" Kpa"
        } else {
            pressHtml.innerHTML = "Pressao: "+pressDif.toFixed(3)+" Kpa"
        }
        let altDif =  dadosAtuais.altitude-dadoAnterior.altitude
        if(dadoAnterior.altitude < dadosAtuais.altitude) {
            altHtml.innerHTML = "Altitude: +"+altDif.toFixed(3)+" m"
        } else {
            altHtml.innerHTML = "Altitude: "+altDif.toFixed(3)+" m"
        }
        let vocDif = dadosAtuais.voc-dadoAnterior.voc
        if(dadoAnterior.altitude < dadosAtuais.altitude) {
            vocHtml.innerHTML = "VOC: +"+vocDif.toFixed(3)+" ppm"
        } else {
            vocHtml.innerHTML = "VOC: "+vocDif.toFixed(3)+" ppm"
        }
        let co2Dif = dadosAtuais.co2-dadoAnterior.co2
        if(dadoAnterior.co2 < dadosAtuais.co2) {
            co2Html.innerHTML = "CO2: +"+co2Dif.toFixed(3)+" ppm"
        } else {
            co2Html.innerHTML = "CO2: "+co2Dif.toFixed(3)+" ppm"
        }
        
        if (x = undefined) {
            setTimeout(visibilidade(2),400)
            x=1
        }
}
function search() {
    getData()
    dadoAnterior = dadosAtuais

    if(keepGoing) {
        setTimeout(search, 6000);
    }
}

function startLoop() {
    keepGoing = true;
    search();
}

function stopSearch() {
    keepGoing = false;
    clearTimeout(timeout)
}
function getData() {
    if (inputHtml.value == "") {
            console.log("sem identificador")
    } else {
        let link = (`https://api-project-smoky.vercel.app/getdata/${inputHtml.value}`).toString()

        fetch(link).then((response => response.json())).then( data =>{
        

    payloadAltitudeHtml.innerHTML = "Altitude = " +data[0].payload.altitude.toFixed(3)+" m"
    payloadCo2Html.innerHTML = "CO2 = " + data[0].payload.co2.toFixed(3)+" ppm"
    payloadVocHtml.innerHTML = "VOC's = " +data[0].payload.voc.toFixed(3)+" ppm"
    temperaturaHtml.innerHTML= "Temperatura = "+data[0].temperatura.toFixed(3)+" °C"
    pressaoHtml.innerHTML= "Pressao = "+(data[0].pressao/1000).toFixed(3)+" Kpa"
    bateriaHtml.innerHTML= "Bateria= "+((data[0].bateria/2400)*100).toFixed(2)+"%"
    if(id==undefined) {
        setTimeout(visibilidade(1),400)
    }
    id = data[0]._id
    dadosAtuais = {
        temperatura:data[0].temperatura.toFixed(3),
        pressao:(data[0].pressao/1000).toFixed(3),
        voc:data[0].payload.voc.toFixed(3),
        co2:data[0].payload.co2.toFixed(3),
        altitude:data[0].payload.altitude.toFixed(3),
        bateria:((data[0].bateria/2400)*100)
    }
    console.log(dadosAtuais)
    if(dadoAnterior != undefined) {
        setTimeout(() => {
            if(dadoAnterior.bateria == dadosAtuais.bateria) {
                console.log("dados =")
        } else {
            console.log("dados diferentes")
            comparar()
        }
        },500);
    }
    }).catch((err)=>{
    })
 }
}

function enterListener() {
    window.addEventListener("keydown", (event) => {
        if(event.keyCode == 13) {
            startLoop()
        }
    })
}
      
