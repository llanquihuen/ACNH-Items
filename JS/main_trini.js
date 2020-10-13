import getData from "./fetch.js"
import Ordenare from "./order2.js"
import {DisplayLocalTrini} from "./display_clothes.js"

let fetchAsyncId = document.getElementById("casilla1"),
fetchAsyncId2 = document.getElementById("casilla2"),
fetchAsyncId3 = document.getElementById("casilla3"),
fetchAsyncId4 = document.getElementById("casilla4"),
fetchAsyncId5 = document.getElementById("casilla5");
let itemsTitle =document.getElementById("items-titulo"),
fragmentDom = document.createDocumentFragment(),
headTrini= document.getElementById("cabezaT"),
dressTrini= document.getElementById("dressT"),
panTrini=document.getElementById("panT"),
calceTrini= document.getElementById("calceT"),
zapaTrini= document.getElementById("zapaT"),
acceTrini= document.getElementById("acceT"),
mochiTrini= document.getElementById("mochiT");

let estaPag=1,
xPag=249;


// const titleCase = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)};
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};



(async ()=>{

////-----------------OBTENER ITEMS
let all =  await getData("./assets/ropa.json");


//-----------ROPA
let dress=[];all.forEach((clo)=>{if(clo.sourceSheet == "Dress-Up"){dress.push(clo)}
// console.log("nop")
// console.log(clo.sourceSheet);
})
let cltop=[];all.forEach((clo)=>{if(clo.sourceSheet == "Tops"){cltop.push(clo)}})
let clbottom=[];all.forEach((clo)=>{if(clo.sourceSheet == "Bottoms"){clbottom.push(clo)}})

let head=[];all.forEach((clo)=>{if(clo.sourceSheet == "Headwear"){head.push(clo)}})
let accessories=[];all.forEach((clo)=>{if(clo.sourceSheet == "Accessories"){accessories.push(clo)}})
let shoes=[];all.forEach((clo)=>{if(clo.sourceSheet == "Shoes"){shoes.push(clo)}})
let socks=[];all.forEach((clo)=>{if(clo.sourceSheet == "Socks"){socks.push(clo)}})
let bags=[];all.forEach((clo)=>{if(clo.sourceSheet == "Bags"){bags.push(clo)}})






//------------NOMBRE
let dress_tr = await getData("./assets/translation/dresses.json")
let dress_var = await getData("./assets/translation/dressesvariants.json")

let cltop_tr = await getData("./assets/translation/tops.json")
let cltop_var = await getData("./assets/translation/topsvariants.json")

let clbottom_tr = await getData("./assets/translation/bottoms.json")
let clbottom_var = await getData("./assets/translation/bottomsvariants.json")

let head_tr = await getData("./assets/translation/caps2.json")
let head_var = await getData("./assets/translation/capsvariants2.json")

let accessories_tr = await getData("./assets/translation/accessories.json")
let accessories_var = await getData("./assets/translation/accessoriesvariants.json")

let shoes_tr = await getData("./assets/translation/shoes.json")
let shoes_var = await getData("./assets/translation/shoesvariants.json")

let socks_tr = await getData("./assets/translation/socks.json")
let socks_var = await getData("./assets/translation/socksvariants.json")

let bags_tr = await getData("./assets/translation/bags.json")
let bags_var = await getData("./assets/translation/bagsvariants.json")



function Translate (array,tr,varia,idioma){
    array.forEach((clo)=>{
        let index = tr.findIndex(x => x.id === clo.clothGroupId);
        // console.log(dress_tr.includes(clo.clothGroupId));
        //  console.log(tr[index].locale["USes"]);
        try{
            clo.name=tr[index].locale[idioma]
        }catch{
            console.log(clo);
        }
        // console.log(clo.variants)
        clo.variants.forEach((vari)=>{
            // console.log(vari.internalId)
            let index2 = varia.findIndex(x => x.id === vari.internalId)
            try {
                vari.variation=varia[index2].locale[idioma]
                // console.log(varia[index2].locale["USes"])
            }catch{
                // console.log(vari)
                console.log("colores sin traducción (Halloween)")
            }
        })
        // console.log("*********************")
        //console.log(dress_var[index2].locale["USes"]);
    })
}

let idioma = ""
console.log(localStorage.getItem("idioma"))
if (localStorage.getItem("idioma")=== null){localStorage.setItem("idioma", "USes");}
if (localStorage.getItem("idioma")=== "USen") idioma = ("USen");
if (localStorage.getItem("idioma")=== "EUen") idioma = ("EUen");
if (localStorage.getItem("idioma")=== "EUde") idioma = ("EUde");
if (localStorage.getItem("idioma")=== "EUes") idioma = ("EUes");
if (localStorage.getItem("idioma")=== "USes") idioma = ("USes");
if (localStorage.getItem("idioma")=== "EUfr") idioma = ("EUfr");
if (localStorage.getItem("idioma")=== "USfr") idioma = ("USfr");
if (localStorage.getItem("idioma")=== "EUit") idioma = ("EUit");
if (localStorage.getItem("idioma")=== "EUnl") idioma = ("EUnl");
if (localStorage.getItem("idioma")=== "CNzh") idioma = ("CNzh");
if (localStorage.getItem("idioma")=== "TWzh") idioma = ("TWzh");
if (localStorage.getItem("idioma")=== "JPja") idioma = ("JPja");
if (localStorage.getItem("idioma")=== "KRko") idioma = ("KRko");
if (localStorage.getItem("idioma")=== "EUru") idioma = ("EUru");

function TranslateAll(lang){
Translate(dress,dress_tr,dress_var,lang)
Translate(cltop,cltop_tr,cltop_var,lang)
Translate(clbottom,clbottom_tr,clbottom_var,lang)

Translate(head,head_tr,head_var,lang)
Translate(accessories,accessories_tr,accessories_var,lang)
Translate(shoes,shoes_tr,shoes_var,lang)
Translate(socks,socks_tr,socks_var,lang)
Translate(bags,bags_tr,bags_var,lang)
}
TranslateAll(idioma)

// console.log(bags)

let dressup = dress.concat(cltop,clbottom,head,accessories,shoes,socks,bags);
let dresses = dress.concat(cltop);

let shoes_socks = shoes.concat(socks);
let access_bags = accessories.concat(bags)

// console.log(dressup)
let itemsRes=dressup;
let itemsC =[];

Ordenare(head)


async function DisplayTrini (items,wrapper, elemXpag,page) {
    ////-----------------CONTAR ITEMS
    function Contar (array){
        let i = 0;
        for (i = 0; i < items.length; i++){

        let contarArray = Object.keys(array).length;
        return contarArray
        }
    }

    //Mayuscula Primera Letra
    const titleCase = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)};

    //CANTIDAD ITEMS
    itemsTitle.innerHTML =`Reto de Moda`
    wrapper.innerHTML="";
    page--;
    let totalPag = Math.ceil(items.length/ elemXpag)
    let desde = elemXpag *page;
    let hasta = desde + elemXpag;
    let jsonItems = items.slice(desde, hasta)
    for (let i = 0; i < jsonItems.length; i++){
        let unItem = jsonItems[i];
        if (unItem.length == 0){
            console.log("vacio")
        }else{
            let itemElement = document.createElement("div");
            // itemElement.setAttribute("id", "casilla2");
            itemElement.classList.add("trinip");
            if (unItem.sourceSheet == "Headwear"){
                itemElement.classList.add("head")
                itemElement.innerHTML +=`<img id="trini_imagen${i}_0" class="photo_trini" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Dress-Up"){
                itemElement.classList.add("dress","dresup");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_1" class="photo_trini dress" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Tops"){
                itemElement.classList.add("top","dresup");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_1" class="photo_trini top" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Bottoms"){
                itemElement.classList.add("botto");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_2" class="photo_trini bottom" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Shoes"){
                itemElement.classList.add("shoe");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_4" class="photo_trini" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Socks"){
                itemElement.classList.add("sock");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_3" class="photo_trini" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Accessories"){
                itemElement.classList.add("accessorie");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_5" class="photo_trini" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }else if(unItem.sourceSheet == "Bags"){
                itemElement.classList.add("bag");
                itemElement.innerHTML +=`<img id="trini_imagen${i}_6" class="photo_trini" loading="lazy" src="${unItem.variants[0]["closetImage"]}" alt="foto">`;

            }


            //FOTO GRANDE
            itemElement.innerHTML += `<p class="nombre_item">${titleCase(unItem.name)}</p>`
            fragmentDom.appendChild(itemElement);
            wrapper.appendChild(fragmentDom);
        }


    }

}
const randomRopa = document.getElementById("random");
const buscaTrinii = document.getElementById("buscaTrini");

async function PrimerDisplay(){
    await DisplayTrini(head,fetchAsyncId,xPag,estaPag)
    await DisplayTrini(dresses,fetchAsyncId2,xPag,estaPag)
    await DisplayTrini(clbottom,fetchAsyncId3,xPag,estaPag)
    await DisplayTrini(shoes_socks,fetchAsyncId4,xPag,estaPag)
    await DisplayTrini(access_bags,fetchAsyncId5,xPag,estaPag)

    LosItems ()
    FotoPersonajes()
    DetallesAbajo()
    document.getElementById("loadin").classList.add("displaynone")
    if (buscaTrinii.value == 1){
        randomRopa.classList.add("displayhidden")
        randomRopa.classList.remove("realhidden")    
    }
};

PrimerDisplay()

function FotoPersonajes(){
    document.getElementById("descr_1").innerHTML = ``

    FotoPersonaje("casilla1", headTrini, "head","0")
    FotoPersonaje("casilla2", dressTrini,"dresup","1")
    FotoPersonaje("casilla3", panTrini,"botto","2")
    FotoPersonaje("casilla4", calceTrini,"sock","3")
    FotoPersonaje("casilla4", zapaTrini,"shoe","4")
    FotoPersonaje("casilla5", acceTrini,"accessorie","5")
    FotoPersonaje("casilla5", mochiTrini,"bag","6")
    // console.log("fin")

}

function FotoPersonaje (lugarID, lugarHTML, clase,id) {
    let imagactiv = [...document.getElementsByClassName("activeimag2")]
                // console.log(imagactiv)
                imagactiv.forEach((activ)=>{
                    // console.log(activ)
                    if ((activ.id.match(/\d+/g)[1]) == id){
                            activ.classList.remove("activeimag2");
                    }

                })

    let xLength = (document.getElementById(lugarID).getElementsByClassName(clase).length)
    let randNum = (Math.floor(Math.random() * xLength))
    let xImg = (document.getElementById(lugarID).getElementsByClassName(clase)[randNum].getElementsByTagName("img")[0].src)
    let text = (document.getElementById(lugarID).getElementsByClassName(clase)[randNum].getElementsByTagName("p")[0].innerText)

        if (document.getElementById(lugarID).getElementsByClassName(clase)[randNum].className == "trinip dress dresup"){
            panTrini.classList.add("displaynone")
            dressTrini.classList.add("bigger")

        }else if(document.getElementById(lugarID).getElementsByClassName(clase)[randNum].className == "trinip top dresup"){
            panTrini.classList.remove("displaynone")
            dressTrini.classList.remove("bigger")
        }
        if(document.getElementById(lugarID).getElementsByClassName(clase)[randNum].className == "trinip botto"){
            if(dressTrini.classList[1]==("bigger")){
                document.getElementById("descr_1").innerHTML += `<p class="descr" id="descrip${id}">-${text}</p>`

                document.getElementById(`descrip2`).classList.add("tachado")
                document.getElementById("detalle2").classList.add("displayhidden")

            }else{
                document.getElementById("descr_1").innerHTML += `<p class="descr" id="descrip${id}">-${text}</p>`
                document.getElementById(lugarID).getElementsByClassName(clase)[randNum].getElementsByTagName("img")[0].classList.add("activeimag2")

            }
        }else{
         document.getElementById("descr_1").innerHTML += `<p class="descr" id="descrip${id}">-${text}</p>`
         document.getElementById(lugarID).getElementsByClassName(clase)[randNum].getElementsByTagName("img")[0].classList.add("activeimag2")
        }
        lugarHTML.innerHTML = `<img id="photo_triniBIG_${id}" class="photo_triniBIG ${clase}" src="${xImg}" alt="foto">`;


}

if (buscaTrinii.value == 1){
    randomRopa.classList.add("displayhidden")
}

function buscarRopa (ropa, donde){

    buscaTrinii.addEventListener("change", (e)=>{
        if (buscaTrinii.value != 1){
            if(buscaTrinii.value == "allSlow"){
                let estilo = document.getElementById("elestilo")
                estilo.innerHTML = "Sin Categoria"
                randomRopa.classList.remove("displayhidden")

                DisplayTrini(ropa,donde,539,estaPag)
                LosItems ()
                FotoPersonajes()
                DetallesAbajo()
            }else{
            randomRopa.classList.remove("displayhidden")
            const filtro = ropa.filter(elem => {return (elem.variants.some((eleme)=>eleme.labelThemes.some((el)=> el == buscaTrinii.value)))})
            let estilo = document.getElementById("elestilo")
            let estilo2 = document.getElementById("elestilo2")

            let descripcion =  buscaTrinii.options[buscaTrinii.selectedIndex].text
            estilo.innerHTML = descripcion
            //estilo2.innerHTML = descripcion

            DisplayTrini(filtro,donde,xPag,estaPag)
            LosItems ()
            FotoPersonajes()
            DetallesAbajo()
            }
        }
    })

}

let queIdioma = document.getElementById("translate");
console.log(queIdioma)
queIdioma.addEventListener("change", (e)=>{
    idioma = queIdioma.value
    buscaTrinii.value = 1
    document.getElementById("elestilo").innerHTML = ""
    TranslateAll(idioma)
    PrimerDisplay()

    localStorage.setItem("idioma", idioma);
})

buscarRopa(head,fetchAsyncId)
buscarRopa(dresses,fetchAsyncId2)
buscarRopa(clbottom,fetchAsyncId3)
buscarRopa(shoes_socks,fetchAsyncId4)
buscarRopa(access_bags,fetchAsyncId5)


function RandomRopa (ropa, donde){
    randomRopa.addEventListener("click", (e)=>{
        if (buscaTrinii.value != 1){
            if(buscaTrinii.value == "allSlow"){
                randomRopa.classList.remove("displayhidden")

                DisplayTrini(ropa,donde,539,estaPag)
                LosItems ()
                FotoPersonajes()
                DetallesAbajo()
            }else{
            const filtro = ropa.filter(elem => {return (elem.variants.some((eleme)=>eleme.labelThemes.some((el)=> el == buscaTrinii.value)))})
            DisplayTrini(filtro,donde,xPag,estaPag)
            FotoPersonajes()
            LosItems ()
            DetallesAbajo()
            }
        }
    })

}
RandomRopa(head,fetchAsyncId)
RandomRopa(dresses,fetchAsyncId2)
RandomRopa(clbottom,fetchAsyncId3)
RandomRopa(shoes_socks,fetchAsyncId4)
RandomRopa(access_bags,fetchAsyncId5)

randomRopa.addEventListener("click", (e)=>{
    if (buscaTrinii.value == 1){
        let color = document.getElementById("estiloPri");
        color.classList.add("redback2")
        color.classList.remove("realhidden")

        setTimeout(()=>{color.classList.remove("redback2");color.classList.add("realhidden");}, 1800);
    }
})

function LosItems (){

    let items_trini = [...document.getElementsByClassName("photo_trini")];

    items_trini.forEach((imag) => {
        imag.parentElement.addEventListener ("click", (e)=>{

                    let self=(imag.id.match(/\d+/g)[0])
                    let num= (imag.id.match(/\d+/g)[1])
                ////--------SELECCIONAR LA IMAGEN ACTIVA
                let imagactiv = [...document.getElementsByClassName("activeimag2")]
                // console.log(imagactiv)
                imagactiv.forEach((activ)=>{
                    // console.log(activ)
                    if ((activ.id.match(/\d+/g)[1]) == num){
                            activ.classList.remove("activeimag2");
                    }

                })
                let tops=(document.getElementById("casilla2").getElementsByClassName("top"))
                let randomNum=((Math.floor(Math.random() * ((tops.length)/2))))
                let numero = (randomNum*2)+1

                // AGRANDAR-ENCOGER VESTIDOS /// SELECCIONAR PANTALON/POLERA RANDOM
                if (imag.classList[1]=="dress"){
                    panTrini.classList.add("displaynone")
                    dressTrini.classList.add("bigger")
                    document.getElementById(`descrip2`).classList.add("tachado")
                    document.getElementById("detalle2").classList.add("displayhidden")

                }else if((imag.classList[1])=="top"){
                     panTrini.classList.remove("displaynone")
                     dressTrini.classList.remove("bigger")
                     document.getElementById(`descrip2`).classList.remove("tachado")
                     document.getElementById("detalle2").classList.remove("displayhidden")


                }else if((imag.classList[1])=="bottom"){
                    if(document.getElementById(`dressT`).classList[1]=="bigger"){
                        panTrini.classList.remove("displaynone")
                        dressTrini.classList.remove("bigger")
                        document.getElementById(`descrip2`).classList.remove("tachado")
                        document.getElementById("detalle2").classList.remove("displayhidden")

                        document.getElementById(`photo_triniBIG_1`).src = tops[numero].src
                        document.getElementById(`descrip1`).innerHTML = `-${tops[numero].nextSibling.innerHTML}`
                        const filtro = cltop.filter(elem => {return (elem.name.toLowerCase() == tops[numero].nextSibling.innerHTML.toLowerCase())
                        })
                        let ropaDetalle = document.getElementById("detalle1")
                        let imagactiv = [...document.getElementsByClassName("activeimag2")]

                        imagactiv.forEach((activ)=>{
                            if (activ.id.slice(-1) == 1){
                                activ.classList.remove("activeimag2");
                            }

                        })
                        console.log(filtro)
                        tops[numero].classList.add("activeimag2")
                        DisplayLocalTrini(filtro,ropaDetalle,1,estaPag)
                    }

                }
                let desc = (imag.nextSibling.innerHTML.toLowerCase())
                let ropa = dressup;
                const filtro = ropa.filter(elem => {return (elem.name.toLowerCase() == desc)})

                document.getElementById(`descrip${num}`).innerHTML = `-${imag.nextSibling.innerHTML}`
                document.getElementById(`photo_triniBIG_${num}`).src = document.getElementById(`trini_imagen${self}_${num}`).src
                let ropaDetalle = document.getElementById(`detalle${num}`)
                imag.classList.add("activeimag2");
                DisplayLocalTrini(filtro,ropaDetalle,1,estaPag)

        })
    })

}

function DetallesAbajo(){
    let i=0;
    let arr=[]
    for (i=0; i<7;i++){
        let desc = ((document.getElementById(`descrip${i}`).innerText).slice(1)).toLowerCase()
        let ropa = dressup;
        const filtro = ropa.filter(elem => {return (elem.name.toLowerCase() == desc)})
        arr.push(filtro[0])
        let ropaDetalle = document.getElementById(`detalle${i}`)


        DisplayLocalTrini(filtro,ropaDetalle,1,estaPag)
    }
    let obje = (document.getElementById(`descrip2`).classList[1])
    if(obje == "tachado"){
        document.getElementById("detalle2").classList.add("displayhidden")
    }else{
        document.getElementById("detalle2").classList.remove("displayhidden")
    }
}

})();



