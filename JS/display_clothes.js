let estaPag=1,
xPag=24,
itemsTitle =document.getElementById("items-titulo"),
fragmentDom = document.createDocumentFragment();
import {Recetas} from "../JS/display_items.js"
import getData from "../JS/fetch.js"


let idioma = ""
if (localStorage.getItem("idioma")=== null){localStorage.setItem("idioma", "USes");}
idioma = localStorage.getItem("idioma")

export async function DisplayLocal (items,wrapper, elemXpag,page) {

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
    document.getElementById("itemsBotonA").innerHTML=`${inter_trad[3].locale[idioma]}`;
    document.getElementById("botonTriniA").innerHTML=`${inter_trad[5].locale[idioma]}`;
    document.getElementById("filtrarpor").innerHTML=`${inter_trad[6].locale[idioma]}`;
    document.getElementById("colores").innerHTML=`${inter_trad[7].locale[idioma]}`;
    document.getElementById("tipo").innerHTML=`${inter_trad[8].locale[idioma]}`;
    document.getElementById("searchBar").placeholder=`${inter_trad[9].locale[idioma]}`;
    document.getElementById("lafrase").innerHTML=`${inter_trad[10].locale[idioma]}`;
    document.getElementById("maxcol").innerHTML=`${inter_trad[11].locale[idioma]}`;
    document.getElementById("dress").nextSibling.nextSibling.innerHTML=`${inter_trad[15].locale[idioma]}`;
    document.getElementById("tops").nextSibling.nextSibling.innerHTML=`${inter_trad[16].locale[idioma]}`;
    document.getElementById("bottoms").nextSibling.nextSibling.innerHTML=`${inter_trad[17].locale[idioma]}`;
    document.getElementById("head").nextSibling.nextSibling.innerHTML=`${inter_trad[18].locale[idioma]}`;
    document.getElementById("accessories").nextSibling.nextSibling.innerHTML=`${inter_trad[19].locale[idioma]}`;
    document.getElementById("shoes_socks").nextSibling.nextSibling.innerHTML=`${inter_trad[20].locale[idioma]}`;










    itemsTitle.innerHTML =`${inter_trad[4].locale[idioma]}<p class="mini">N° ${inter_trad[3].locale[idioma]}: ${items.length}</p>`
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
            console.log("vacio")
        }else{
            let index_tr = inter_trad.findIndex(inter => inter.id === unItem.variants[0]["source"][0]);

            let itemElement = document.createElement("div");
            itemElement.setAttribute("id", `item_${unItem.variants[0].internalId}`);
            itemElement.classList.add("item");

            //NOMBRE
            console.log(unItem)
            itemElement.innerHTML = `<p class="nombre">${titleCase(unItem.name)}</p>`

            //PRECIOS
            if(unItem.variants[0].buy == -1){
                itemElement.innerHTML += `<p class="precios opacity4">${inter_trad[2].locale[idioma]}</p><p class="precios" style="color:black"><br>${inter_trad[1].locale[idioma]}: ${(unItem.variants[0].sell)}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }else{
                itemElement.innerHTML += `<p class="precios">${inter_trad[0].locale[idioma]}: ${(unItem.variants[0].buy)}<img class="bayas" src="assets/bayas.png" alt="bayas"><br>${inter_trad[1].locale[idioma]} : ${(unItem.variants[0].sell)}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }

            //GRID
            itemElement.innerHTML += `<img class="grilla" src="assets/grid/${unItem["size"].trim()}.png" alt="bayas">`

            //SOURCE (Esta mal optimizado, por el texto traducido)
            if((unItem.variants[0]["source"][0]) == "Crafting"){
                let comprari = document.createElement("div");
                comprari.setAttribute("id", `DIY_${i}`);
                comprari.classList.add(`comprari`); 
                comprari.innerHTML +=  `<img class="comprar" src="assets/DIY.png" alt="DIY"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
                itemElement.appendChild(comprari)
            }else if((unItem.variants[0]["source"]) == "Jack"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/soponcio.png" alt="jack"><p class="ctext text_center">${inter_trad[index_tr].locale[idioma]}</p>`
            }else if((unItem.variants[0]["source"]) == "Label"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/trini.png" alt="trini"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else if((unItem.variants[0]["source"]) == "Cyrus"){
                itemElement.innerHTML +=  `<img class="comprar boda" src="assets/cyrus.png" alt="boda"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Recycle box"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/recicla.png" alt="reciclaje"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Pascal"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/pascal.png" alt="pascal"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Shopping Seasonal"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/especial.png" alt="especial"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Gullivarrr"){
                itemElement.innerHTML +=  `<img class="comprar gull" src="assets/Gullivarrr.png" alt="gulliver2"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Able Sisters"|| (unItem.variants[0]["source"])=="Kicks,Able Sisters"|| (unItem.variants[0]["source"]) =="Nintendo,Able Sisters"){
                itemElement.innerHTML +=  `<img class="comprar sister" src="assets/sisters.png" alt="hermanas_manitas"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Miles Redemption"){
                itemElement.innerHTML +=  `<img class="comprar miles" src="assets/Nook_Miles.png" alt="millas"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Dodo Airlines"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/dodo.png" alt="dodo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Kicks"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/betunio.png" alt="betunio"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Gulliver"){
                itemElement.innerHTML +=  `<img class="comprar gul" src="assets/Gulliver.png" alt="gulliver"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Fishing Tourney"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/Fishing.png" alt="pesca"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Shopping Daily Selection"){
                itemElement.innerHTML +=  `<img class="comprar nint" src="assets/Nook_shopping.png" alt="nook"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Mom"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/mom2.png" alt="mom"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Birthday"){
                itemElement.innerHTML +=  `<img class="comprar cumple" src="assets/cupcake.png" alt="birthday"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Shopping Promotion"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/pocket.png" alt="pocket"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Bug-Off"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/Net2.png" alt="insectos"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Isabelle"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/isabelle.png" alt="canela"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "New Year's Eve"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/especial.png" alt="anio_nuevo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }
            else{
                itemElement.innerHTML +=  `<p class="ctext">${(unItem.variants[0]["source"])}</p>`
                console.log(unItem)
            }

            //STYLE
            itemElement.innerHTML += `<p class="extra">${unItem.style1}-${unItem.style2}`
            // console.log (unItem.variants.length)

            // FOTO COLORES
            if (Contar(unItem.variants)<=4){
                let i2= 0;
                for (i2 = 0;i2 < Contar(unItem.variants); i2++){
                    if(i2==0){
                        // console.log(unItem)
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq bb activeimag" src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} bb imagenpeq " src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }else{
                let i2= 0;
                for (i2 = 0;i2 < 8; i2++){
                    if(i2==0){
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq activeimag" src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq " src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }

            //FOTO GRANDE
                itemElement.innerHTML +=`<img id="imagen_big${i}" class="photo" src="" alt="foto">`;
                fragmentDom.appendChild(itemElement);
                wrapper.appendChild(fragmentDom);
                document.getElementById(`imagen_big${i}`).src = document.getElementById(`imagen0_${i}`).src
        }
        if(totalPag==0){
            totalPag++
        }
        if(estaPag > totalPag){
            estaPag=totalPag
            DisplayLocal(items,fetchAsyncId,xPag,estaPag)
        }
    }
        // BOTONES IMAGENES // BUSQUEDA IMAGEN
        let imagenp = [...document.getElementsByClassName("imagenpeq")];
        imagenp.forEach((imag) => {
            imag.addEventListener ("click", (e)=>{

                if(isNaN(imag.id.slice(-2))) {
                    let num= (imag.id.slice(-1))
                    let self=(imag.id.slice(-3,-2))
                    ////--------SELECCIONAR LA IMAGEN ACTIVA
                    let imagactiv = [...document.getElementsByClassName("activeimag")]
                    imagactiv.forEach((activ)=>{
                        if(isNaN(activ.id.slice(-2))) {
                            if (activ.id.slice(-1) == num){
                                activ.classList.remove("activeimag");
                            }
                        }
                    })


                    document.getElementById(`imagen_big${num}`).src = document.getElementById(`imagen${self}_${num}`).src
                    imag.classList.add("activeimag");

                }else{
                    let num=imag.id.slice(-2)
                    let self=(imag.id.slice(-4,-3))

                    let imagactiv = [...document.getElementsByClassName("activeimag")]
                    imagactiv.forEach((activ)=>{
                            if (activ.id.slice(-2) == num){
                                activ.classList.remove("activeimag");
                            }
                    })
                    document.getElementById(`imagen_big${num}`).src = document.getElementById(`imagen${self}_${num}`).src
                    imag.classList.add("activeimag");
                }
            })
        })

        let recipes = await getData("./assets/recipes.json");
        let reciPhotos = await getData("./assets/other.json");
        let recipe_trad = await getData("./assets/translation/crafts2.json");
        let DIYbutton = [...document.getElementsByClassName("comprari")];
        DIYbutton.forEach((diy) => {
            diy.addEventListener ("click", (e)=>{
                let aqui = (diy.parentElement);
                Recetas(recipes, aqui,reciPhotos,recipe_trad)
            })
        })

    
}

export async function DisplayLocalTrini (items,wrapper, elemXpag,page) {
    let inter_trad = await getData ("./assets/translation/interfaz.json");

    document.getElementById("itemsBotonA").innerHTML=`${inter_trad[3].locale[idioma]}`;
    document.getElementById("itemsBotonB").innerHTML=`${inter_trad[4].locale[idioma]}`;


    document.getElementById("items-titulo").innerHTML=`${inter_trad[5].locale[idioma]}`;
    document.getElementById("queestilo").innerHTML=`${inter_trad[21].locale[idioma]}`;
    document.getElementById("estilooo").innerHTML=`${inter_trad[22].locale[idioma]}`;
    document.getElementById("random").innerHTML=`${inter_trad[23].locale[idioma]}`;
    document.getElementById("estiloPri").innerHTML=`${inter_trad[24].locale[idioma]}`;






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
    // itemsTitle.innerHTML =`ROPA<p class="mini">N° de Ropa: ${items.length}</p>`
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
            console.log("vacio")
        }else{
            let index_tr = inter_trad.findIndex(inter => inter.id === unItem.variants[0]["source"][0]);
            let itemElement = document.createElement("div");
            itemElement.setAttribute("id", `casilla_${i}`);
            itemElement.classList.add("item");
            itemElement.classList.add("casilla");

            // console.log(unItem)

            //NOMBRE
            // console.log(unItem)
            itemElement.innerHTML = `<p class="nombre">${titleCase(unItem.name)}</p>`

            //PRECIOS
            if(unItem.variants[0].buy == -1){
                itemElement.innerHTML += `<p class="precios opacity4">${inter_trad[2].locale[idioma]}</p><p class="precios" style="color:black"><br>${inter_trad[1].locale[idioma]}: ${(unItem.variants[0].sell)}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }else{

                itemElement.innerHTML += `<p class="precios">${inter_trad[0].locale[idioma]}: ${(unItem.variants[0].buy)}<img class="bayas" src="assets/bayas.png" alt="bayas"><br>${inter_trad[1].locale[idioma]}: ${(unItem.variants[0].sell)}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }

            //GRID

            itemElement.innerHTML += `<img class="grilla" src="assets/grid/${unItem["size"].trim()}.png" alt="bayas">`

            //SOURCE (Esta mal optimizado, por el texto traducido)
            if((unItem.variants[0]["source"]) == "Crafting"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/DIY.png" alt="DIY"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else if((unItem.variants[0]["source"]) == "Jack"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/soponcio.png" alt="jack"><p class="ctext text_center">${inter_trad[index_tr].locale[idioma]}</p>`
            }else if((unItem.variants[0]["source"]) == "Label"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/trini.png" alt="trini"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else if((unItem.variants[0]["source"]) == "Cyrus"){
                itemElement.innerHTML +=  `<img class="comprar boda" src="assets/cyrus.png" alt="boda"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Recycle box"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/recicla.png" alt="reciclaje"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Pascal"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/pascal.png" alt="pascal"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Shopping Seasonal"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/especial.png" alt="especial"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Gullivarrr"){
                itemElement.innerHTML +=  `<img class="comprar gull" src="assets/Gullivarrr.png" alt="gulliver2"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Able Sisters"|| (unItem.variants[0]["source"])=="Kicks,Able Sisters"|| (unItem.variants[0]["source"]) =="Nintendo,Able Sisters"){
                itemElement.innerHTML +=  `<img class="comprar sister" src="assets/sisters.png" alt="hermanas_manitas"> <p class="ctext">"Able Sisters"</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Miles Redemption"){
                itemElement.innerHTML +=  `<img class="comprar miles" src="assets/Nook_Miles.png" alt="millas"><p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Dodo Airlines"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/dodo.png" alt="dodo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Kicks"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/betunio.png" alt="betunio"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Gulliver"){
                itemElement.innerHTML +=  `<img class="comprar gul" src="assets/Gulliver.png" alt="gulliver"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Fishing Tourney"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/Fishing.png" alt="pesca"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Shopping Daily Selection"){
                itemElement.innerHTML +=  `<img class="comprar nint" src="assets/Nook_shopping.png" alt="nook"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Mom"){
                itemElement.innerHTML +=  `<img class="comprar" src="assets/mom2.png" alt="mom"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Birthday"){
                itemElement.innerHTML +=  `<img class="comprar cumple" src="assets/cupcake.png" alt="birthday"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Nook Shopping Promotion"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/pocket.png" alt="pocket"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Bug-Off"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/Net2.png" alt="insectos"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "Isabelle"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/isabelle.png" alt="canela"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }else  if((unItem.variants[0]["source"]) == "New Year's Eve"){
                itemElement.innerHTML +=  `<img class="comprar " src="assets/especial.png" alt="anio_nuevo"> <p class="ctext">${inter_trad[index_tr].locale[idioma]}</p>`
            }
            else{
                itemElement.innerHTML +=  `<p class="ctext">${(unItem.variants[0]["source"])}</p>`
                console.log(unItem)
            }

            //STYLE
            itemElement.innerHTML += `<p class="extra">${unItem.style1}-${unItem.style2}`
            //photo_triniBIG_1
            // FOTO COLORES
            if (Contar(unItem.variants)<=4){
                let i2= 0;
                for (i2 = 0;i2 < Contar(unItem.variants); i2++){
                    if(i2==0){
                        // console.log(unItem)
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${unItem.clothGroupId}" class="colors${i2} imagenpeq bb activeimag" src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${unItem.clothGroupId}" class="colors${i2} bb imagenpeq " src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }else{
                let i2= 0;
                for (i2 = 0;i2 < 8; i2++){
                    if(i2==0){
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${unItem.clothGroupId}" class="colors${i2} imagenpeq activeimag" src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${unItem.clothGroupId}" class="colors${i2} imagenpeq " src="${unItem.variants[i2]["closetImage"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }

            //FOTO GRANDE
                itemElement.innerHTML +=`<img id="imagen_big${unItem.clothGroupId}" class="photo" src="" alt="foto">`;
                fragmentDom.appendChild(itemElement);
                wrapper.appendChild(fragmentDom);
                document.getElementById(`imagen_big${unItem.clothGroupId}`).src = document.getElementById(`imagen0_${unItem.clothGroupId}`).src
        }
        if(totalPag==0){
            totalPag++
        }
        if(estaPag > totalPag){
            estaPag=totalPag
            DisplayLocal(items,fetchAsyncId,xPag,estaPag)
        }

        // BOTONES IMAGENES // BUSQUEDA IMAGEN
        let imagenp = [...document.getElementsByClassName("imagenpeq")];
        imagenp.forEach((imag) => {
            imag.addEventListener ("click", (e)=>{
                    let num= (imag.id.match(/\d+/g)[1])
                    let self= (imag.id.match(/\d+/g)[0])

                    let imagactiv = [...document.getElementsByClassName("activeimag")]
                    imagactiv.forEach((activ)=>{
                            if ((activ.id.match(/\d+/g)[1]) == num){
                                activ.classList.remove("activeimag");
                            }
                    })
                    let numero = (document.getElementById(`imagen${self}_${num}`).parentElement.parentElement.id.match(/\d+/g)[0])
                    document.getElementById(`photo_triniBIG_${numero}`).src = document.getElementById(`imagen${self}_${num}`).src
                    document.getElementById(`imagen_big${num}`).src = document.getElementById(`imagen${self}_${num}`).src
                    imag.classList.add("activeimag");
                
            })
        })
    }
}
