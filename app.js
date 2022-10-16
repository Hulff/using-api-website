const head = document.getElementById("1")
const name = document.getElementById("2")
const email = document.getElementById("3")
const input = document.getElementById("input")


function search () {
    console.log("inicio")
fetch(`https://api-project-smoky.vercel.app/getInfo/`).then((response => response.json())).then( data =>{
    console.log(data[0])
    head.innerHTML= "temperatura = "+data[0].temperatura
    name.innerHTML= "pressao = "+data[0].pressao
    email.innerHTML= "bateria = "+data[0].bateria
}).catch((err)=>{

})
}
