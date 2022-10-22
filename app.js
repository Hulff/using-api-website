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
const vocHtml = document.getElementById("8")
const co2Html = document.getElementById("9")

let id

let dadosAtuais 
let dadoAnterior 


function comparar() {
    tempHtml.innerHTML = `temperatura: ${(dadoAnterior.temperatura - dadosAtuais.temperatura)}`
    batteryHtml.innerHTML = `bateria: ${(dadoAnterior.bateria - dadosAtuais.bateria)}`
    pressHtml.innerHTML = `pressao: ${(dadoAnterior.pressao- dadosAtuais.pressao)}`
    altHtml.innerHTML = `altitude: ${(dadoAnterior.altitude - dadosAtuais.altitude)}`
    vocHtml.innerHTML  = `VOC: ${(dadoAnterior.voc - dadosAtuais.voc)}`
    co2Html.innerHTML = `co2: ${(dadoAnterior.co2 - dadosAtuais.co2)}`
}
function getData() {
    if (inputHtml.value == "") {
            console.log("sem identificador")
    } else {
        let link = `https://api-project-smoky.vercel.app/getInfo/${inputHtml.value}`
    fetch(link).then((response => response.json())).then( data =>{
    console.log(data[0])

    payloadAltitudeHtml.innerHTML = "altitude = " +data[0].payload.altitude;
    payloadCo2Html.innerHTML = "CO2 = " +data[0].payload.co2;
    payloadVocHtml.innerHTML = "VOC's = " +data[0].payload.voc;
    temperaturaHtml.innerHTML= "temperatura = "+data[0].temperatura;
    pressaoHtml.innerHTML= "pressao = "+data[0].pressao;
    bateriaHtml.innerHTML= "bateria = "+data[0].bateria;
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
}
function search () {
    if (id == undefined) {
        getData()
} else {
    dadoAnterior = dadosAtuais
        getData()
        setTimeout(()=>{
            comparar()
        },1000)
    }
}
