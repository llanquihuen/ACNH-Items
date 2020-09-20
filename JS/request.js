
let fetchAsyncId = document.getElementById("lositems"),
paginacionId = document.getElementById("paginacion"),
fragmentDom = document.createDocumentFragment();
itemsTitle =document.getElementById("items-titulo");

let estaPag=1,
xPag=24;


const titleCase = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)};
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};


////-----------------TOMAR INFO DEL BD o API
const getData = async (direccion) => {
    try{

        let res = await fetch(direccion),
        json = await res.json();
        return json
    }catch (err){
            console.log("El error", err)
            let message = err.statusText || "Ocurrió un error";
            fetchAsyncId.innerHTML=`Error ${err.status}: ${message}`;

    }finally{
    }
}

(async ()=>{

////-----------------OBTENER ITEMS
let item1 =  await getData("https://acnhapi.com/v1a/houseware");
let item2 = await getData("https://acnhapi.com/v1a/misc");
let item3 = await getData("https://acnhapi.com/v1a/wallmounted");
let items = item1.concat(item2,item3);

let itemsC =[];





//ALFABETICAMENTE
function Ordenar(it){
it = it.sort(function(a,b){
    let nombre1=(removeAccents(a[0]["name"]["name-USes"].toLowerCase()));
    let nombre2=(removeAccents(b[0]["name"]["name-USes"].toLowerCase()));
    if(nombre1>nombre2){
       return 1;
    } else if(nombre1<nombre2){
       return -1;
    }
});
}
Ordenar(items)
let itemsRes =items

function RestarArray (total, restar){
    cosa = total.filter(a => !restar.map(b=>b[0]).includes(a[0]));
    return cosa
}


////-----------------CHECKBOX
tipoButton = document.getElementById("tipo");
filtroTipo = document.getElementById("filtro_tipo")


tipoButton.addEventListener ("click", (e)=>{
    tipoButton.classList.toggle("boton_activo")
    filtroTipo.classList.toggle("nodisplay")
    

    if (colorGrande.classList.contains('disabled')){
        colorGrande.classList.remove('disabled')
        identCheck = [...document.getElementsByClassName("boton_check")]
        identCheck.forEach((ide) => {
            if(ide.checked == false){
                ide.checked = true
                const searchBar = document.getElementById("searchBar");
                searchBar.value="";
                items=itemsRes
                Display(items,fetchAsyncId,xPag,estaPag)
                Paginacion(items, paginacionId, xPag)
                document.getElementById("canela").classList.add("displaynone")

            }
        })

    }else{
    colorGrande.classList.add('disabled')
    }
    
    if(tipoButton.classList.contains('disabled')){
        tipoButton.classList.remove('disabled')
        colorGrande.classList.remove("boton_activo")

        coloresSelect.classList.toggle("nodisplay")
        
        colorButton=[...document.getElementsByClassName("colores_btn")]
            colorButton.forEach((imag) => {
            imag.classList.toggle("nodisplay")
            })

            if(colorButtonActive.length!=0){
                colorButton.forEach((col) => {
                    col.classList.remove("buttonClicked")
                })
            }    
        const searchBar = document.getElementById("searchBar");
        searchBar.value="";
        items=itemsRes
        Display(items,fetchAsyncId,xPag,estaPag)
        Paginacion(items, paginacionId, xPag)
        document.getElementById("canela").classList.add("displaynone")        
    }
})

function Check(id,item){
    let ident = document.getElementById(id)

    ident.addEventListener("change", (e)=>{
        const searchBar = document.getElementById("searchBar");
        const searchString = (removeAccents(searchBar.value)).toLowerCase().trim();

       if  (ident.checked == true){
            items = items.concat(item)
            Ordenar(items)

            const filtro = items.filter(elem => {
                return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
            })
            Display(filtro,fetchAsyncId,xPag,estaPag)
            Paginacion(filtro, paginacionId, xPag )
        }else{
            items =  RestarArray(items,item)
            Ordenar(items)

            if (items.length==0){
                document.getElementById("canela").classList.remove("displaynone")
        }else{
            document.getElementById("canela").classList.add("displaynone")
            }
            // console.log(items)
            const filtro = items.filter(elem => {
                return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
            })
            Display(filtro,fetchAsyncId,xPag,estaPag)
            Paginacion(filtro, paginacionId, xPag )
        }
    })
    ;
}

    Check("misc",item2)
    Check("house",item1)
    Check("wall", item3)

////-----------------CONTAR ITEMS
    function Contar (array){
        for (i = 0; i < items.length; i++){

        let contarArray = Object.keys(array).length;
        return contarArray
        }
    }


////-----------------MOSTRAR ALGUNOS ITEMS
    function Display (items,wrapper, elemXpag,page) {
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
    document.getElementById("canela").classList.add("displaynone")

    Display(items,fetchAsyncId,xPag,estaPag)


    ////-----------------PAGINACION
    function Paginacion (items,wrapper,elXpag){
        wrapper.innerHTML="";

        let totalPag = Math.ceil(items.length/ elXpag)
        if (totalPag<10){
            for (let i = 1; i < totalPag +1; i++){
                let btn = PaginationButton(i, items);
                fragmentDom.appendChild(btn)
            }
        }else{
            if(estaPag <= 3){
                for(i = estaPag-(estaPag-1);i<=(estaPag+3);i++){
                    let btn = PaginationButton(i, items);
                    fragmentDom.appendChild(btn);
                }
                let fin = PaginationButton(totalPag,items)
                fragmentDom.appendChild(fin);

            }else if (estaPag >= totalPag-3){
                let ini = PaginationButton(1,items)
                fragmentDom.appendChild(ini);
                for(i=estaPag-2;i<=totalPag;i++){
                    let btn = PaginationButton(i, items);
                    fragmentDom.appendChild(btn);
                }

            }else{
                let ini = PaginationButton(1,items)
                fragmentDom.appendChild(ini);
                for(i=estaPag-2;i<=(estaPag+2);i++){
                    let btn = PaginationButton(i, items);
                    fragmentDom.appendChild(btn);
                }
                let fin = PaginationButton(totalPag,items)
                fragmentDom.appendChild(fin);
            }

       
        }
        wrapper.appendChild(fragmentDom);
    }

    ////-----------------ESTILO BOTON
    function PaginationButton(page, items){
        let button = document.createElement("button");
            button.setAttribute("id","page-link");
            button.classList.add("pag-boton")
            button.innerText=page;
            let totalPag = Math.ceil(items.length/ xPag)

            if(page==1) button.classList.add("primerp")
            if(page==totalPag) button.classList.add("ultimop")
            if(estaPag == page) button.classList.add("active");

            button.addEventListener("click", function () {
                let esteBtn = document.querySelector(".active");
                estaPag = page;
                Display(items,fetchAsyncId,xPag,estaPag)
                Paginacion(items, paginacionId, xPag )

                esteBtn.classList.remove("active");
                button.classList.add("active");
            });

            if(estaPag > totalPag){
                estaPag=totalPag
                Display(items,fetchAsyncId,xPag,estaPag)
            }

            return button
    }
        
        Paginacion(items, paginacionId, xPag )


    ////-----------------FILTRO COLORES
    colorGrande= document.getElementById("colores");
    coloresSelect = document.getElementById("coloresSelect")
    
    
    colorGrande.addEventListener ("click", (e)=>{
        colores.classList.toggle("boton_activo")

        coloresSelect.classList.toggle("nodisplay")
        if (tipoButton.classList.contains('disabled')){
            tipoButton.classList.remove('disabled')
            colorButtonActive = [...document.getElementsByClassName("buttonClicked")];

            if(colorButtonActive.length!=0){
                colorButton.forEach((col) => {
                    col.classList.remove("buttonClicked")
                })
                const searchBar = document.getElementById("searchBar");
                searchBar.value="";
                items=itemsRes
                Display(items,fetchAsyncId,xPag,estaPag)
                Paginacion(items, paginacionId, xPag)
                document.getElementById("canela").classList.add("displaynone")
            }
        }else{
            tipoButton.classList.add('disabled')
        }

        if(colorGrande.classList.contains('disabled')){
            colorGrande.classList.remove('disabled')
            tipoButton.classList.remove("boton_activo")

            filtroTipo.classList.toggle("nodisplay")
            identCheck = [...document.getElementsByClassName("boton_check")]
            identCheck.forEach((ide) => {
                    ide.checked = true
            })
            const searchBar = document.getElementById("searchBar");
            searchBar.value="";
            items=itemsRes
            Display(items,fetchAsyncId,xPag,estaPag)
            Paginacion(items, paginacionId, xPag)
            document.getElementById("canela").classList.add("displaynone")        
        }
    })

    colorButton=[...document.getElementsByClassName("colores_btn")]
    colorButton.forEach((imag) => {
        colorGrande.addEventListener ("click", (e)=>{
            imag.classList.toggle("nodisplay")
        })

    })



    colorButton.forEach((col) => {
        col.addEventListener ("click", (e)=>{
            const searchBar = document.getElementById("searchBar");
            const searchString = (removeAccents(searchBar.value)).toLowerCase().trim();
            colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
            if (col.classList.contains("buttonClicked")){
                if(colorButtonActive.length=1){
                    colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
                    col.classList.remove("buttonClicked")

                    items=itemsRes
                    const filtro = items.filter(elem => {
                        return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
                    })
                    Display(filtro,fetchAsyncId,xPag,estaPag)
                    Paginacion(filtro, paginacionId, xPag)


                }if(colorButtonActive.length=2){
                    colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
                    if(colorButtonActive.length!=0){
                        let color=(colorButtonActive[0].id)
                        col.classList.remove("buttonClicked")

                        itemsC=[]
                        for (i = 0; i < items.length; i++){
                            let unItemAll=(items[i])
    
                            let newArray = unItemAll.filter(function (el) {
                            return el["color-1"] == color ||
                            el["color-2"] == color
                            });
    
                            if (newArray.length !== 0){
                                itemsC.push(newArray)
                            }
                        }
                    
                        items=itemsC
                        const filtro = items.filter(elem => {
                            return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
                        })
                            Display(filtro,fetchAsyncId,xPag,estaPag)
                            Paginacion(filtro, paginacionId, xPag )
                    }

                }
   
 
            }else{
                if(colorButtonActive.length<2){

                    col.classList.add("buttonClicked")

                    itemsC=[]
                    for (i = 0; i < items.length; i++){
                        let unItemAll=(items[i])

                        let newArray = unItemAll.filter(function (el) {
                        return el["color-1"] == col.id ||
                        el["color-2"] == col.id
                        });

                        // console.log(newArray)
                        if (newArray.length !== 0){
                            itemsC.push(newArray)
                        }
                    }
                    items=itemsC
                    
                    const filtro = items.filter(elem => {
                        return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
                    })
                    Display(filtro,fetchAsyncId,xPag,estaPag)
                    Paginacion(filtro, paginacionId, xPag )
                    // console.log("filtro")
                }else{
                    color = document.getElementById("maxcol")
                    color.classList.add("redback")
                    setTimeout(()=>{color.classList.remove("redback"); }, 1000);
                }
            }
        })

    })
    ////-----------------BUSCADOR
    const searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("search", (e)=> {e.target.value="";
        Display(items,fetchAsyncId,xPag,estaPag)
        Paginacion(items, paginacionId, xPag )

    });

    searchBar.addEventListener("keyup", (e)=>{
        const searchString = (removeAccents(e.target.value)).toLowerCase().trim();
        const filtro = items.filter(elem => {
            return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
            // ||((removeAccents(elem[0].tag)).toLowerCase()).includes(searchString)||((removeAccents(elem[0]["source"])).toLowerCase()).includes(searchString)
        })
        if (filtro.length == 0){
            document.getElementById("canela").classList.remove("displaynone")
        }else{
            document.getElementById("canela").classList.add("displaynone")

        }
        Display(filtro,fetchAsyncId,xPag,estaPag)
        Paginacion(filtro, paginacionId, xPag)
    })
})();



