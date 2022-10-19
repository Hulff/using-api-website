const temperatura = document.getElementById("1")
const pressao = document.getElementById("2")
const bateria = document.getElementById("3")
const payloadAltitude = document.getElementById("10")
const payloadCo2 = document.getElementById("11")
const payloadVoc = document.getElementById("12")
const input = document.getElementById("input")
const temp = document.getElementById("4")
const press = document.getElementById("5") 
const battery = document.getElementById("6")
const alt = document.getElementById("7")
const voc = document.getElementById("8")
const co2 = document.getElementById("9")

let id

let dadosAtuais 
let dadoAnterior 

setTimeout(()=>{
    search()
},1000)

function comparar() {
    temp = "temperatura: " + (dadoAnterior.temperatura - dadosAtuais.temperatura)
    battery = "bateria: " + (dadoAnterior.bateria - dadosAtuais.bateria)
    press = "pressao: " + (dadoAnterior.pressao- dadosAtuais.pressao)
    alt = "altitude: "+(dadoAnterior.altitude - dadosAtuais.altitude)
    voc  = "VOC: "+(dadoAnterior.voc - dadosAtuais.voc)
    co2 = "co2: "+(dadoAnterior.co2 - dadosAtuais.co2)
}
function getData() {
    fetch(`https://api-project-smoky.vercel.app/getInfo/`).then((response => response.json())).then( data =>{
    console.log(data[0])

    payloadAltitude.innerHTML = "altitude = " +data[0].payload.altitude;
    payloadCo2.innerHTML = "CO2 = " +data[0].payload.co2;
    payloadVoc.innerHTML = "VOC's = " +data[0].payload.voc;
    temperatura.innerHTML= "temperatura = "+data[0].temperatura;
    pressao.innerHTML= "pressao = "+data[0].pressao;
    bateria.innerHTML= "bateria = "+data[0].bateria;
    id = data[0]._id
    dadosAtuais = {
        temperatura:data[0].temperatura,
        pressao:data[0].pressao,
        voc:data[0].payload.voc,
        co2:data[0].payload.co2,
        altitude:data[0].payload.altitude,
        bateria:data[0].bateria
    }
    }).catch((err)=>{
    console.log(err)
    })
}
function search () {
    if (id == undefined) {
        getData()
} else {
    dadoAnterior = dadosAtuais
        getData()
        comparar()
    }
}
