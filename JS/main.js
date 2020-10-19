import getData from "./fetch.js"
import Display from "./display_items.js"
import Ordenare from "./order2.js";

let fetchAsyncId = document.getElementById("lositems"),
paginacionId = document.getElementById("paginacion"),
fragmentDom = document.createDocumentFragment();

let estaPag=1,
xPag=24;


// const titleCase = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)};
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};


(async ()=>{
let fetchAsyncId = document.getElementById("lositems");

////-----------------OBTENER ITEMS

let all =  await getData("./assets/itemsMuebles.json");

let item1=[];all.forEach((clo)=>{if(clo.sourceSheet == "Housewares"){item1.push(clo)}})
let item2=[];all.forEach((clo)=>{if(clo.sourceSheet == "Miscellaneous"){item2.push(clo)}})
let item3=[];all.forEach((clo)=>{if(clo.sourceSheet == "Wall-mounted"){item3.push(clo)}})
let items= item1.concat(item2,item3)


//------------NOMBRE
let furniture_tr = await getData("./assets/translation/furniture2.json")
let furniture_var = await getData("./assets/translation/variants.json")
let furniture_hha = await getData("./assets/translation/hhasituation.json")


function Translate (array,tr,hha,idioma){
    array.forEach((clo)=>{
        let index = tr.findIndex(x => +x.id.match(/\d+/g)[0] === clo.variants[0].internalId);
        try {
            clo.name=tr[index].locale[idioma]
            // let nume = (varia[1].variant_id.match(/\d+/g)[0])
            // console.log(varia[1].variant_id.match(/\d+/g)[1])

        }catch{
            // console.log(clo.name)
            // console.log(index)
            // console.log("*********************")
        }

        // console.log(clo.variants[0].internalId)
        
            let index1 = hha.findIndex(x => x.locale["USen"] === clo.variants[0].themes[0])
            let index2 = hha.findIndex(x => x.locale["USen"] === clo.variants[0].themes[1])

            if(clo.variants[0].themes[1]){
                clo.variants[0].themes[1]=hha[index2].locale[idioma]
            }
            if(clo.variants[0].themes[0]){
                clo.variants[0].themes[0]=hha[index1].locale[idioma]
            }




    //     clo.variants.forEach((vari)=>{
    //         let index2 = varia.findIndex(x => +x.locale."USen" === vari.internalId)
    //         try {
    //             clo.name=tr[index].locale[idioma]
    //         }catch{
    //             console.log(clo.name)
    //             console.log("*********************")
    //         }
    //     })
    // //console.log(dress_var[index2].locale["USes"]);
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

Translate(items,furniture_tr,furniture_hha,idioma)

let otro = [...document.getElementById("translate").getElementsByClassName("select-items")]
let indexidio = otro.findIndex(x => x.value === idioma);
let esteidioma = (otro[indexidio].innerHTML)

document.getElementById("idiomaMostrar").innerHTML=(esteidioma)
let tempDiv = document.createElement("div");
tempDiv.classList.add("banderas")
tempDiv.innerHTML=`<img id="itemtra" src="assets/flags/${idioma}.png" alt="bandera" ></img>`

document.getElementById("translate").insertAdjacentElement("afterend", tempDiv)
let queIdioma = document.getElementById("translate");
let queIdioma2 = document.getElementById("translate2");

// console.log(queIdioma)

queIdioma.addEventListener("change", (e)=>{
    idioma = queIdioma.value
    localStorage.setItem("idioma", idioma);
    location.reload();
    return false;
    // Translate(items,furniture_tr,furniture_hha,idioma)
    // Display(items,fetchAsyncId,xPag,estaPag)
})
queIdioma2.addEventListener("change", (e)=>{
    idioma = queIdioma.value
    localStorage.setItem("idioma", idioma);
    location.reload();
    return false;
    // Translate(items,furniture_tr,furniture_hha,idioma)
    // Display(items,fetchAsyncId,xPag,estaPag)
})

function Contar (array){
    let i = 0;
    for (i = 0; i < items.length; i++){

    let contarArray = Object.keys(array).length;
    return contarArray
    }
}

items.forEach((clo)=>{

    // console.log(clo.versionAdded)
    // console.log(clo.unlocked)
    // console.log(clo.unlockNotes)
    // console.log(clo.set)
    // console.log(clo.series)
    // console.log(clo.customizationKitCost)


//     console.log(Contar(clo.variants))
//     if (Contar(clo.variants)<=4){
//         let i2= 0;
//         for (i2 = 0;i2 < Contar(clo.variants); i2++){
//             if(i2==0){
//                 console.log(i2)
//                 try{console.log(clo.variants[i2].closetImage);
//                 }catch{console.log("no1");
//                 }
//             }else{
//                 console.log(i2)
//              try{console.log(clo.variants[i2].closetImage);
//             }catch{console.log("no2");
//             }
//         }
//     }
// }
//  console.log(clo.variants[0].closetImage)
})


let itemsC =[];

Ordenare(items)
let itemsRes =items

function RestarArray (total, restar){
    let cosa = total.filter(a => !restar.map(b=>b).includes(a));
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
                console.log("itemsRes")
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
        console.log(items)
        items=itemsRes
        console.log(items)

        console.log("itemsRes")

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
           console.log("if")
            items = items.concat(item)
            Ordenare(items)

            const filtro = items.filter(elem => {
                return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
            })
            Display(filtro,fetchAsyncId,xPag,estaPag)
            Paginacion(filtro, paginacionId, xPag )
            if(filtro.length==0){
                document.getElementById("canela").classList.remove("displaynone")
            }else{
                document.getElementById("canela").classList.add("displaynone")
            }

        }else{
            console.log(items)

            items =  RestarArray(items,item)
            console.log(items)
            Ordenare(items)
            console.log("else1")


            if (items.length==0){

                document.getElementById("canela").classList.remove("displaynone")
        }else{
            console.log("else2")

            document.getElementById("canela").classList.add("displaynone")
            }
            const filtro = items.filter(elem => {
                return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
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
Check("wall", item3)
Check("house",item1)

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
                console.log(items, itemsC)

                const filtro = items.filter(elem => {
                // console.log(elem.name)

                    return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
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
                    items=itemsRes

                    itemsC = items
                    .filter((el)=>
                        el.variants.some((subel)=>subel.colors.some((co)=> co == color)))
                    .map(el =>{
                        let n = Object.assign({},el, {variants : el.variants.filter(subel => subel.colors[0] == color||subel.colors[1] == color)})
                        return n
                    });
                    console.log(items, itemsC,"=2")
                    items=itemsC
                    const filtro = items.filter(elem => {
                        // console.log(elem.name)
                        return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
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
            let itemsC=[]

                itemsC = items
                .filter((el)=>
                    el.variants.some((subel)=>subel.colors.some((co)=> co == col.id)))
                .map(el =>{
                    let n = Object.assign({},el, {variants : el.variants.filter(subel => subel.colors[0] == col.id||subel.colors[1] == col.id)})
                    return n
                });
                console.log(items, itemsC,"<2")

                items=itemsC

                const filtro = items.filter(elem => {
                    // console.log(elem.name)
                    return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
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
            return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
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


        
        // for (let i = 0; i < recetas.length; i++){
        //         }



})();



