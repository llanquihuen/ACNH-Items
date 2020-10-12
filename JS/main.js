import getData from "./fetch.js"
import Display from "./display_items.js"
import Ordenar from "./order.js"

let fetchAsyncId = document.getElementById("lositems"),
paginacionId = document.getElementById("paginacion"),
fragmentDom = document.createDocumentFragment();

let estaPag=1,
xPag=24;


// const titleCase = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)};
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};



(async ()=>{

////-----------------OBTENER ITEMS
let item1 =  await getData("https://acnhapi.com/v1a/houseware");
let item2 = await getData("https://acnhapi.com/v1a/misc");
let item3 = await getData("https://acnhapi.com/v1a/wallmounted");
let items = item1.concat(item2,item3);
let all =  await getData("./assets/items.json");

//-----------VESTIDOS
let dressup=[];
all.forEach((clo)=>{
    if(clo.sourceSheet == "Dress-Up"){
        dressup.push(clo)
    }
    // console.log("nop")
    // console.log(clo.sourceSheet);
})

//------------NOMBRE
let dress_tr = await getData("./assets/dresses.json")
let dress_var = await getData("./assets/dressesvariants.json")

function Translate (array,tr,varia){
    array.forEach((clo)=>{
        // console.log(dress_tr.includes(clo.clothGroupId));
        let index = tr.findIndex(x => x.id === clo.clothGroupId);
        console.log(tr[index].locale["USes"]);
        // console.log(clo.variants)
        clo.variants.forEach((vari)=>{
            // console.log(vari.internalId)
            let index2 = varia.findIndex(x => x.id === vari.internalId)
            try {
                console.log(varia[index2].locale["USes"])
            }catch{
                console.log(vari.variation)
            }
        })
        console.log("*********************")
    //console.log(dress_var[index2].locale["USes"]);
    })
}
// Translate(dressup,dress_tr,dress_var)

function Contar (array){
    let i = 0;
    for (i = 0; i < items.length; i++){

    let contarArray = Object.keys(array).length;
    return contarArray
    }
}
dressup.forEach((clo)=>{
    // console.log(clo.variants[0].buy)
    // console.log(clo["size".trim()])
    // console.log(clo.variants[0]["source"])
    // console.log(clo.style1)
    // console.log(Contar(clo.variants))
    // if (Contar(clo.variants)<=4){
    //     let i2= 0;
    //     for (i2 = 0;i2 < Contar(clo.variants); i2++){
    //         if(i2==0){
    //             console.log(i2)
    //             try{console.log(clo.variants[i2].closetImage);
    //             }catch{console.log("no1");
    //             }
    //         }else{
    //             console.log(i2)

    //             try{console.log(clo.variants[i2].closetImage);
    //             }catch{console.log("no2");
    //             }
    //         }
    //     }
    // }
    // console.log(clo.variants[0].closetImage)
})


let itemsC =[];

Ordenar(items)
let itemsRes =items

function RestarArray (total, restar){
    let cosa = total.filter(a => !restar.map(b=>b[0]).includes(a[0]));
    return cosa
}

////-----------------CHECKBOX
let tipoButton = document.getElementById("tipo"),
filtroTipo = document.getElementById("filtro_tipo")


tipoButton.addEventListener ("click", (e)=>{
    tipoButton.classList.toggle("boton_activo")
    filtroTipo.classList.toggle("nodisplay")


    if (colorGrande.classList.contains('disabled')){
        colorGrande.classList.remove('disabled')
        let identCheck = [...document.getElementsByClassName("boton_check")]
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

            let colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
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
            if(filtro.length==0){
                document.getElementById("canela").classList.remove("displaynone")
            }else{
                document.getElementById("canela").classList.add("displaynone")
            }

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
            if(filtro.length==0){
                document.getElementById("canela").classList.remove("displaynone")
            }else{
                document.getElementById("canela").classList.add("displaynone")
            }
        }
    })
    ;
}

    Check("misc",item2)
    Check("house",item1)
    Check("wall", item3)

    ////-----------------MOSTRAR ITEMS
    document.getElementById("canela").classList.add("displaynone");
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
                let i = 0;
                for(i = estaPag-(estaPag-1);i<=(estaPag+3);i++){
                    let btn = PaginationButton(i, items);
                    fragmentDom.appendChild(btn);
                }
                let fin = PaginationButton(totalPag,items)
                fragmentDom.appendChild(fin);

            }else if (estaPag >= totalPag-3){
                let ini = PaginationButton(1,items)
                fragmentDom.appendChild(ini);
                let i=0
                for(i=estaPag-2;i<=totalPag;i++){
                    let btn = PaginationButton(i, items);
                    fragmentDom.appendChild(btn);
                }

            }else{
                let ini = PaginationButton(1,items)
                fragmentDom.appendChild(ini);
                let i =0;
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
    let colorGrande= document.getElementById("colores"),
    coloresSelect = document.getElementById("coloresSelect");


    colorGrande.addEventListener ("click", (e)=>{
        colores.classList.toggle("boton_activo")
        coloresSelect.classList.toggle("nodisplay")
        if (tipoButton.classList.contains('disabled')){
            tipoButton.classList.remove('disabled')
            let colorButtonActive = [...document.getElementsByClassName("buttonClicked")];

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
            let identCheck = [...document.getElementsByClassName("boton_check")]
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

    let colorButton=[...document.getElementsByClassName("colores_btn")];
    colorButton.forEach((imag) => {
        colorGrande.addEventListener ("click", (e)=>{
            imag.classList.toggle("nodisplay")
        })

    })



    colorButton.forEach((col) => {
        col.addEventListener ("click", (e)=>{
            const searchBar = document.getElementById("searchBar");
            const searchString = (removeAccents(searchBar.value)).toLowerCase().trim();
            let colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
            if (col.classList.contains("buttonClicked")){
                if(colorButtonActive.length=1){
                    colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
                    col.classList.remove("buttonClicked")

                    items=itemsRes
                    const filtro = items.filter(elem => {
                        return ((removeAccents(elem[0]["name"]["name-USes"])).toLowerCase()).includes(searchString)
                    })
                    // console.log("filtro")
                    if(filtro.length==0){
                        document.getElementById("canela").classList.remove("displaynone")
                    }else{
                        document.getElementById("canela").classList.add("displaynone")
                    }
                    Display(filtro,fetchAsyncId,xPag,estaPag)
                    Paginacion(filtro, paginacionId, xPag)


                }if(colorButtonActive.length=2){
                    colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
                    if(colorButtonActive.length!=0){
                        let color=(colorButtonActive[0].id)
                        col.classList.remove("buttonClicked")

                        itemsC=[]
                        let i=0;

                        for (i = 0; i < items.length; i++){
                            let unItemAll=(items[i])

                            let newArray = unItemAll.filter(function (el) {
                                // console.log(el["color-1"])
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

                            if(filtro.length==0){
                                document.getElementById("canela").classList.remove("displaynone")
                            }else{
                                document.getElementById("canela").classList.add("displaynone")
                            }

                    }

                }


            }else{
                if(colorButtonActive.length<2){
                col.classList.add("buttonClicked")

                    itemsC=[]
                    let i=0;
                    for (i = 0; i < items.length; i++){
                        // console.log(items)
                        let unItemAll=(items[i])
                        // console.log(unItemAll)

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
                    if(filtro.length==0){
                        document.getElementById("canela").classList.remove("displaynone")
                    }
                }else{
                    let color = document.getElementById("maxcol");
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



