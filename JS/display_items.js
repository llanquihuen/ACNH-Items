let estaPag=1,
xPag=24,
itemsTitle =document.getElementById("items-titulo"),
fragmentDom = document.createDocumentFragment();

export default function Display (items,wrapper, elemXpag,page) {
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
    itemsTitle.innerHTML =`ITEMS <p class="mini">Items: ${items.length}</p>`
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
            itemElement.setAttribute("id", "casilla");
            itemElement.classList.add("item");

            //NOMBRE
            if((titleCase(unItem[0]["name"]["name-USes"])) == "Cesta de pícnic"){
                itemElement.innerHTML = `<p class="nombre">${titleCase(unItem[0]["name"]["name-EUes"])}</p>`;
            }else{
                itemElement.innerHTML = `<p class="nombre">${titleCase(unItem[0]["name"]["name-USes"])}</p>`
            };
            //PRECIOS
            if(unItem[0]["buy-price"] == null){
                itemElement.innerHTML += `<p class="precios opacity4"> No se compra </p><p class="precios" style="color:black"><br>Venta: ${(unItem[0]["sell-price"])}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }else{
                itemElement.innerHTML += `<p class="precios">Compra: ${(unItem[0]["buy-price"])}<img class="bayas" src="assets/bayas.png" alt="bayas"><br>Venta: ${(unItem[0]["sell-price"])}<img class="bayas" src="assets/bayas.png" alt="bayas"></p>`
            }

            //GRID

            itemElement.innerHTML += `<img class="grilla" src="assets/grid/${unItem[0]["size"].trim()}.png" alt="bayas">`


            //SOURCE (Esta mal optimizado, por el texto traducido)
            if((unItem[0]["source"]) == "Crafting"){
                itemElement.innerHTML +=  '<img class="comprar" src="assets/DIY.png" alt="DIY"><p class="ctext">Crafteable</p>'
            }else if((unItem[0]["source"]) == "Nook's Cranny"){
                itemElement.innerHTML +=  '<img class="comprar nook" src="assets/nook.png" alt="nook"><p class="ctext text_center">  Tienda Mini Nook</p>'
            }else if((unItem[0]["source"]) == "Nook Miles Redemption"){
                itemElement.innerHTML +=  '<img class="comprar miles" src="assets/Nook_Miles.png" alt="millas"><p class="ctext">Millas Nook</p>'
            }else if((unItem[0]["source"]) == "Cyrus"){
                itemElement.innerHTML +=  '<img class="comprar boda" src="assets/cyrus.png" alt="boda"> <p class="ctext">Evento de Boda</p>'
            }else  if((unItem[0]["source"]) == "Nook Shopping Promotion"){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/pocket.png" alt="pocket"> <p class="ctext">Pocket Camp</p>'
            }else  if((unItem[0]["source"]) == "Flick"){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/kamilo.png" alt="kamilo"> <p class="ctext">Kamilo</p>'
            }else  if((unItem[0]["source"]) == "Bug-Off"){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/Net2.png" alt="insectos"> <p class="ctext">Caza de Insectos</p>'
            }else  if((unItem[0]["source"]) == "Fishing Tourney"){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/Fishing.png" alt="pesca"> <p class="ctext">Torneo de Pesca</p>'
            }else  if((unItem[0]["source"]) == "C.J."){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/cj2.png" alt="cj"> <p class="ctext">C.J.</p>'
            }else  if((unItem[0]["source"]) == "Nook Shopping Seasonal"){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/especial.png" alt="especial"> <p class="ctext">Nook Fechas Especiales </p>'
            }else  if((unItem[0]["source"]) == "HHA"){
                itemElement.innerHTML +=  '<img class="comprar " src="assets/AAD.png" alt="aad"> <p class="ctext">Academia de Artes<br> Decorativas </p>'
            }else  if((unItem[0]["source"]) == "Birthday"){
                itemElement.innerHTML +=  '<img class="comprar cumple" src="assets/cupcake.png" alt="birthday"> <p class="ctext">Cumpleaños</p>'
            }else  if((unItem[0]["source"]) == "Mom"){
                itemElement.innerHTML +=  '<img class="comprar mom" src="assets/mom2.png" alt="birthday"> <p class="ctext">Regalo Mamá</p>'
            }else  if((unItem[0]["source"]) == "Gulliver"){
                itemElement.innerHTML +=  '<img class="comprar gul" src="assets/Gulliver.png" alt="gulliver"> <p class="ctext">Gulliver</p>'
            }else  if((unItem[0]["source"]) == "Gullivarrr"){
                itemElement.innerHTML +=  '<img class="comprar gull" src="assets/Gullivarrr.png" alt="gulliver2"> <p class="ctext">Gullivarrr</p>'
            }else  if((unItem[0]["source"]) == "International Museum Day"){
                itemElement.innerHTML +=  '<img class="comprar gul" src="assets/museo.png" alt="museo"> <p class="ctext">Dia del Museo</p>'
            }else  if((unItem[0]["source"]) == "Starting items"){
                itemElement.innerHTML +=  '<img class="comprar gull" src="assets/tent.png" alt="birthday"> <p class="ctext">Items del Comienzo</p>'
            }else  if((unItem[0]["source"]) == "Dodo Airlines"){
                itemElement.innerHTML +=  '<img class="comprar" src="assets/dodo.png" alt="dodo"> <p class="ctext">Dodo Airlines</p>'
            }else  if((unItem[0]["source"]) == "Luna"){
                itemElement.innerHTML +=  '<img class="comprar" src="assets/Alakama.png" alt="cama"> <p class="ctext">Alakama</p>'
            }else  if((unItem[0]["source"]) == "Nintendo; Nook Shopping"){
                itemElement.innerHTML +=  '<img class="comprar nint" src="assets/nintendo.png" alt="cama"> <p class="ctext">Nintendo Update<br>Millas Nook</p>'
            }
            else{
                itemElement.innerHTML +=  `<p class="ctext">${(unItem[0]["source"])}</p>`
            }

            //TAG
            itemElement.innerHTML += `<p class="extra">Tipo:${unItem[0].tag}`

            // FOTO COLORES
            if (Contar(unItem)<=4){
                let i2= 0;
                for (i2 = 0;i2 < Contar(unItem); i2++){
                    if(i2==0){
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq bb activeimag" src="${unItem[i2]["image_uri"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} bb imagenpeq " src="${unItem[i2]["image_uri"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }
                }
            }else{
                let i2= 0;
                for (i2 = 0;i2 < 8; i2++){
                    if(i2==0){
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq activeimag" src="${unItem[i2]["image_uri"]}" alt="color1">`;
                        }catch{itemElement.innerHTML += ``;
                        }
                    }else{
                        try{itemElement.innerHTML += `<img id="imagen${i2}_${i}" class="colors${i2} imagenpeq " src="${unItem[i2]["image_uri"]}" alt="color1">`;
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
            Display(items,fetchAsyncId,xPag,estaPag)
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
    }
}