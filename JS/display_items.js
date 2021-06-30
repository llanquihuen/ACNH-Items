let estaPag=1,
xPag=24,
itemsTitle =document.getElementById("items-titulo"),
fragmentDom = document.createDocumentFragment();
import getData from "../JS/fetch.js"

let idioma = ""
if (localStorage.getItem("idioma")=== null){localStorage.setItem("idioma", "USes");}
idioma = localStorage.getItem("idioma")

export default async function Display (items,wrapper, elemXpag,page) {
    let pageitem=0

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
    let inter_trad = await getData ("./assets/translation/interfaz.json");
    document.getElementById("itemsBotonB").innerHTML=`${inter_trad[4].locale[idioma]}`;
    document.getElementById("filtrarpor").innerHTML=`${inter_trad[6].locale[idioma]}`;
    document.getElementById("colores").innerHTML=`${inter_trad[7].locale[idioma]}`;
    document.getElementById("tipo").innerHTML=`${inter_trad[8].locale[idioma]}`;
    document.getElementById("searchBar").placeholder=`${inter_trad[9].locale[idioma]}`;
    document.getElementById("lafrase").innerHTML=`${inter_trad[10].locale[idioma]}`;
    document.getElementById("maxcol").innerHTML=`${inter_trad[11].locale[idioma]}`;
    document.getElementById("misc").nextSibling.nextSibling.innerHTML=`${inter_trad[12].locale[idioma]}`;
    document.getElementById("house").nextSibling.nextSibling.innerHTML=`${inter_trad[13].locale[idioma]}`;
    document.getElementById("wall").nextSibling.nextSibling.innerHTML=`${inter_trad[14].locale[idioma]}`;



    // console.log(document.getElementById("house").nextSibling.nextSibling)
    itemsTitle.innerHTML =`${inter_trad[3].locale[idioma]}<p class="mini">N° ${inter_trad[3].locale[idioma]}: ${items.length}</p>`
    wrapper.innerHTML="";
    page--;
    let totalPag = Math.ceil(items.length/ elemXpag)
    let desde = elemXpag *page;
    let hasta = desde + elemXpag;
    let jsonItems = items.slice(desde, hasta)
    for (let i = 0; i < jsonItems.length; i++){
        let unItem = jsonItems[i];
        // console.log(unItem)
        if (unItem.length == 0){
            // console.log("vacio")
        }else{
            let index_tr = inter_trad.findIndex(inter => inter.id === unItem.variants[0]["source"][0]);

            let itemElement = document.createElement("div");
            itemElement.setAttribute("id", `item_${unItem.variants[0].internalId}`);
            itemElement.classList.add("item");
            // console.log(unItem.variants[0].internalId)

            //NOMBRE
            itemElement.innerHTML = `<p class="nombre">${titleCase(unItem.name)}</p>`

            //PRECIOS
            if(unItem.variants[0].buy == -1){
                itemElement.innerHTML += `<p class="precios opacity4"> ${inter_trad[2].locale[idioma]} </p><p class="precios" style="color:black"><br>${inter_trad[1].locale[idioma]}: ${(unItem.variants[0].sell)}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }else{
                itemElement.innerHTML += `<p class="precios">${inter_trad[0].locale[idioma]}: ${(unItem.variants[0].buy)}<img class="bayas" src="assets/bayas.png" alt="bayas"><br>${inter_trad[1].locale[idioma]}: ${(unItem.variants[0].sell)}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }

            //GRID

            itemElement.innerHTML += `<img class="grilla" src="assets/grid/${unItem["size"].trim()}.png" alt="bayas">`

            //SOURCE (Esta mal optimizado, por el texto traducido)
            switch (unItem.variants[0]["source"][0]) {
                case "Crafting":
                    let comprari = document.createElement("div");
                    comprari.setAttribute("id", `DIY_${i}`);
                    comprari.classList.add(`comprari`);
                    comprari.innerHTML +=  `<img class="comprar" src="assets/DIY.png" alt="DIY"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    itemElement.appendChild(comprari)
                    break;
                case "Jack":
                    itemElement.innerHTML +=  `<img class="comprar" src="assets/soponcio.png" alt="jack"><p class="ctext text_center">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Nook's Cranny":
                    itemElement.innerHTML +=  `<img class="comprar nook" src="assets/nook.png" alt="nook"><p class="ctext text_center">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Nook Miles Redemption":
                    itemElement.innerHTML +=  `<img class="comprar miles" src="assets/Nook_Miles.png" alt="millas"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Cyrus":
                    itemElement.innerHTML +=  `<img class="comprar boda" src="assets/cyrus.png" alt="boda"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Nook Shopping Promotion":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/pocket.png" alt="pocket"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Flick":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/kamilo.png" alt="kamilo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Bug-Off":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/Net2.png" alt="insectos"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Fishing Tourney":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/Fishing.png" alt="pesca"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "C.J.":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/cj2.png" alt="cj"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Nook Shopping Seasonal":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/especial.png" alt="especial"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "HHA":
                    itemElement.innerHTML +=  `<img class="comprar " src="assets/AAD.png" alt="aad"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Birthday":
                    itemElement.innerHTML +=  `<img class="comprar cumple" src="assets/cupcake.png" alt="birthday"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Mom":
                    itemElement.innerHTML +=  `<img class="comprar mom" src="assets/mom2.png" alt="birthday"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Gulliver":
                    itemElement.innerHTML +=  `<img class="comprar gul" src="assets/Gulliver.png" alt="gulliver"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Gullivarrr":
                    itemElement.innerHTML +=  `<img class="comprar gull" src="assets/Gullivarrr.png" alt="gulliver2"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "International Museum Day":
                    itemElement.innerHTML +=  `<img class="comprar gul" src="assets/museo.png" alt="museo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Starting items":
                    itemElement.innerHTML +=  `<img class="comprar gull" src="assets/tent.png" alt="birthday"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Dodo Airlines":
                    itemElement.innerHTML +=  `<img class="comprar" src="assets/dodo.png" alt="dodo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Luna":
                    itemElement.innerHTML +=  `<img class="comprar" src="assets/Alakama.png" alt="cama"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                case "Nintendo; Nook Shopping":
                    itemElement.innerHTML +=  `<img class="comprar nint" src="assets/nintendo.png" alt="cama"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                    break;
                default:
                    itemElement.innerHTML +=  `<p class="ctext">${(unItem.variants[0]["source"][0])}</p>`
                    console.log(unItem.variants[0]["source"])
                    break;
            }

            //STYLE

            if (unItem.variants[0].themes[1] != undefined){
            itemElement.innerHTML += `<p class="extra">${unItem.variants[0].themes[0]} / ${unItem.variants[0].themes[1]}`
            }else if((unItem.variants[0].themes[0] == undefined)){
                console.log("Clase sin definir")
            }else{
                itemElement.innerHTML += `<p class="extra">${unItem.variants[0].themes[0]}`
            }
            // if (unItem.series != null){
            //     itemElement.innerHTML += `<p class="extra"><br><br>${unItem.series}`
            // }
            if(unItem.customizationKitCost != null){
                itemElement.innerHTML += `<img class="remak" src="assets/RemakeKit.png" alt="remake">`
                itemElement.innerHTML +=`<p id="remak${i}" class="remak remakp">${unItem.customizationKitCost}</p>`
            }
            if(unItem.patternCustomize == true){
                itemElement.innerHTML += `<img class="lapiz" src="assets/lapiz.jpg" alt="custom">`
            }
            // if(unItem.interact == true){
            //     itemElement.innerHTML += `<img class="interact" src="assets/interact6.png" alt="custom">`
            // }


            // FOTO COLORES
            // console.log(unItem.name)
            // console.log(Contar(unItem.variants))
            if (Contar(unItem.variants)<=4){
                let i2= 0;
                for (i2 = 0;i2 < Contar(unItem.variants); i2++){
                    if(i2==0){
                        // console.log(unItem)
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq bb activeimag" src="${unItem.variants[i2]["image"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} bb imagenpeq " src="${unItem.variants[i2]["image"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }else if (Contar(unItem.variants)<=8){
                let i2= 0;
                for (i2 = 0;i2 < Contar(unItem.variants); i2++){
                    if(i2==0){
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq activeimag" src="${unItem.variants[i2]["image"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq " src="${unItem.variants[i2]["image"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }else if (Contar(unItem.variants)<=64){
                let i2= 0;
                let desde = 8 *pageitem;
                let hasta = desde + 8;
                // let totalPag = Math.ceil(unItem.variants.length/ 8)
                let variantes =(unItem.variants)
                let itemsvari = unItem.variants.slice(desde, hasta)
                // console.log(variantes)
                let parenti = document.createElement("div");
                parenti.setAttribute("id", `many${i}`);
                parenti.classList.add(`manyimg`);

                // console.log (parent)
                for (i2 = 0;i2 < unItem.variants.length; i2++){
                    if(i2==0){
                        try{parenti.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq imagplus activeimag" src="${variantes[i2]["image"]}" alt="color1">`;
                        // console.log(parenti)
                        }catch{parenti.innerHTML += ``;}
                    }else{
                        try{
                            parenti.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq imagplus " src="${variantes[i2]["image"]}" alt="color1">`;
                        }catch{parenti.innerHTML += ``;}
                    }
                }
                itemElement.appendChild(parenti)
            }

            //FOTO GRANDE
            itemElement.innerHTML +=`<img id="imagen_big${i}" class="photo" src="" alt="foto">`;
            fragmentDom.appendChild(itemElement);
            wrapper.appendChild(fragmentDom);
            document.getElementById(`imagen_big${i}`).src = document.getElementById(`imagen0_${i}`).src
            // let button = document.getElementById(`mbutton${i}`);
            // console.log(itemsvari,button)
        }
        if(totalPag==0){
            totalPag++
        }
        if(estaPag > totalPag){
            estaPag=totalPag
            console.log("Error??")
            Display(items,fetchAsyncId,xPag,estaPag)
        }
    }


    // BOTONES IMAGENES // BUSQUEDA IMAGEN
    let imagenp = [...document.getElementsByClassName("imagenpeq")];
    imagenp.forEach((imag) => {
        imag.addEventListener ("click", ()=>{
            let num = (imag.id.match(/\d+/g)[1])
            let self = (imag.id.match(/\d+/g)[0])
            ////--------SELECCIONAR LA IMAGEN ACTIVA
            let imagactiv = [...document.getElementsByClassName("activeimag")]
            imagactiv.forEach((activ)=>{
                if ((activ.id.match(/\d+/g)[1]) == num){
                    activ.classList.remove("activeimag");
                    }
            })
            document.getElementById(`imagen_big${num}`).src = document.getElementById(`imagen${self}_${num}`).src
            imag.classList.add("activeimag");
        })
    })


    let recipes = await getData("./assets/recipes.json");
    let reciPhotos = await getData("./assets/other.json");
    let recipe_trad = await getData("./assets/translation/crafts2.json");


    let DIYbutton = [...document.getElementsByClassName("comprari")];
    DIYbutton.forEach((diy) => {
        diy.addEventListener ("click", ()=>{
            let aqui = (diy.parentElement);
            Recetas(recipes, aqui,reciPhotos,recipe_trad)
        })
    })

}
        //TARJETAS DE RECETAS  !!!!! LIMPIAR ACA                                                               
        export async function Recetas(recetas,donde,otherFoto,traduc){
            let numRec = (donde.id.match(/\d+/g)[0])
            console.log(numRec)
            let diyElement = document.createElement("div");
            diyElement.setAttribute("id", `lugarReceta${numRec}`);
            diyElement.classList.add("itemReceta");

            let receFlex = document.createElement("div");
            receFlex.setAttribute("id", `lugarFlex${numRec}`);
            receFlex.classList.add("recetaFlex");


            let index = recetas.findIndex(rece => rece.craftedItemInternalId === +numRec);
            let unDiy = recetas[index]
            console.log(recetas[0]["Crafted Item Internal ID"])
            console.log(unDiy)


            let i=1
            let comprari = document.createElement("div");
            comprari.innerHTML +=`<img id="imagen_receta${numRec}" class="foto_recetaBIG" src="${unDiy.image}" alt="foto_receta">`;

            //if (recetas.sourceSheet == "Other"){
            // }else{
            //     comprari.innerHTML +=`<img id="imagen_receta${numRec}" class="foto_receta" src="${unDiy.Image}" alt="foto_receta">`;
            // }

            comprari.setAttribute("id", `DIY_${i}`);
            comprari.classList.add(`compraris`);
            comprari.innerHTML +=  `<div class="compr2"><img class="volver" src="assets/Go-back.ico" alt="DIY"><p class="ctext2"></p></div>`
            diyElement.appendChild(comprari)


            // let index2 = otherFoto.findIndex(oth => oth.name === recetas[index][`Material ${i}`]);
            let allMateriales = recetas[index].materials;
            let material=[]
            for (let i in allMateriales){
                material.push({material:i,cantidad: allMateriales[i]})
            }
            console.log(material)
            for(i=0;i<material.length;i++){
                let index2 = otherFoto.findIndex(oth => oth.name === material[i].material)
                if (material[i].material != undefined){
                    // console.log(recetas[index][`Material ${String(i)}`])
                    let index3 = traduc.findIndex(rece => rece.locale["USen"] === material[i].material);
                    console.log(material[i].material)
                    console.log(traduc[index3])
                    console.log(otherFoto)
                    // console.log(i)
                    receFlex.innerHTML +=`<div class="obj_receta"><p class="cantidad_receta">${material[i].cantidad}</p><img id="imagen_receta${i}" class="foto_receta" src="${otherFoto[index2].variants[0].inventoryImage}" alt="foto_receta"> <p class="trad">${traduc[index3].locale[idioma]}</p></div>`
                    receFlex.innerHTML +=``;
                    diyElement.appendChild(receFlex)
                    // console.log(otherFoto[index2].variants[0].storageImage)
                }
            }
            donde.appendChild(diyElement);
            let manyim = (diyElement.parentNode.getElementsByClassName("manyimg"))
            console.log("+++++++++++++++++++++++++++++++")
            if (manyim.length != 0){
                console.log(manyim[0])
                manyim[0].classList.add("relative")

            }

            let goBack = [...document.getElementsByClassName("compr2")];
            goBack.forEach((gobak) => {
                gobak.addEventListener ("click", ()=>{
                    if (manyim.length != 0){
                        manyim[0].classList.remove("relative")
                    }
                })
            })
            goBack.forEach((gobak) => {
                gobak.addEventListener ("click", (e)=>{
                    e.path[3].remove();
                })
            })
        }
