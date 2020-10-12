import getData from "./fetch.js"
import Ordenare from "./order2.js"
import {DisplayLocal} from "./display_clothes.js"

let fetchAsyncId = document.getElementById("lositemsropa"),
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

Translate(dress,dress_tr,dress_var,"USes")
Translate(cltop,cltop_tr,cltop_var,"USes")
Translate(clbottom,clbottom_tr,clbottom_var,"USes")

Translate(head,head_tr,head_var,"USes")
Translate(accessories,accessories_tr,accessories_var,"USes")
Translate(shoes,shoes_tr,shoes_var,"USes")
Translate(socks,socks_tr,socks_var,"USes")
Translate(bags,bags_tr,bags_var,"USes")
// console.log(bags)




let dressup = dress.concat(cltop,clbottom,head,accessories,shoes,socks,bags);
let shoes_socks = shoes.concat(socks);
let access_bags = accessories.concat(bags)

// console.log(dressup)
let itemsRes=dressup;
let itemsC =[];

Ordenare(dressup)

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

    clo.variants.forEach((va)=>{
        // console.log(clo.variants)
    })

})




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
                dressup=itemsRes
                console.log("itemsRes")
                DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)
                Paginacion(dressup, paginacionId, xPag)
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
        console.log(dressup)
        dressup=itemsRes
        console.log(dressup)

        console.log("itemsRes")

        DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)
        Paginacion(dressup, paginacionId, xPag)
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
            dressup = dressup.concat(item)
            Ordenare(dressup)

            const filtro = dressup.filter(elem => {
                return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
            })
            DisplayLocal(filtro,fetchAsyncId,xPag,estaPag)
            Paginacion(filtro, paginacionId, xPag )
            if(filtro.length==0){
                document.getElementById("canela").classList.remove("displaynone")
            }else{
                document.getElementById("canela").classList.add("displaynone")
            }

        }else{
            dressup =  RestarArray(dressup,item)
            Ordenare(dressup)

            if (dressup.length==0){

                document.getElementById("canela").classList.remove("displaynone")
        }else{
            console.log("else")

            document.getElementById("canela").classList.add("displaynone")
            }
            const filtro = dressup.filter(elem => {
                return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
            })
            DisplayLocal(filtro,fetchAsyncId,xPag,estaPag)
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

    Check("tops",cltop)
    Check("dress",dress)
    Check("bottoms", clbottom)
    Check("head",head)
    Check("accessories",access_bags)
    Check("shoes_socks", shoes_socks)

    ////-----------------MOSTRAR ITEMS
    document.getElementById("canela").classList.add("displaynone");
    // DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)
    DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)


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
                DisplayLocal(items,fetchAsyncId,xPag,estaPag)
                Paginacion(items, paginacionId, xPag )

                esteBtn.classList.remove("active");
                button.classList.add("active");
            });

            if(estaPag > totalPag){
                estaPag=totalPag
                DisplayLocal(items,fetchAsyncId,xPag,estaPag)
            }

            return button
    }

        Paginacion(dressup, paginacionId, xPag )


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
                dressup=itemsRes
                DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)
                Paginacion(dressup, paginacionId, xPag)
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
            dressup=itemsRes
            DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)
            Paginacion(dressup, paginacionId, xPag)
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

                    dressup=itemsRes
                    console.log(dressup, itemsC)

                    const filtro = dressup.filter(elem => {
                    // console.log(elem.name)

                        return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
                    })
                    // console.log("filtro")
                    if(filtro.length==0){
                        document.getElementById("canela").classList.remove("displaynone")
                    }else{
                        document.getElementById("canela").classList.add("displaynone")
                    }
                    DisplayLocal(filtro,fetchAsyncId,xPag,estaPag)
                    Paginacion(filtro, paginacionId, xPag)


                }if(colorButtonActive.length=2){
                    colorButtonActive = [...document.getElementsByClassName("buttonClicked")];
                    if(colorButtonActive.length!=0){
                        let color=(colorButtonActive[0].id)
                        col.classList.remove("buttonClicked")
                        dressup=itemsRes

                        itemsC = dressup
                        .filter((el)=>
                            el.variants.some((subel)=>subel.colors.some((co)=> co == color)))
                        .map(el =>{
                            let n = Object.assign({},el, {variants : el.variants.filter(subel => subel.colors[0] == color||subel.colors[1] == color)})
                            return n
                        });
                        console.log(dressup, itemsC,"=2")
                        dressup=itemsC
                        const filtro = dressup.filter(elem => {
                            // console.log(elem.name)
                            return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
                        })
                            DisplayLocal(filtro,fetchAsyncId,xPag,estaPag)
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

                    itemsC = dressup
                    .filter((el)=>
                        el.variants.some((subel)=>subel.colors.some((co)=> co == col.id)))
                    .map(el =>{
                        let n = Object.assign({},el, {variants : el.variants.filter(subel => subel.colors[0] == col.id||subel.colors[1] == col.id)})
                        return n
                    });
                    console.log(dressup, itemsC,"<2")

                    dressup=itemsC

                    const filtro = dressup.filter(elem => {
                        // console.log(elem.name)
                        return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
                    })
                    DisplayLocal(filtro,fetchAsyncId,xPag,estaPag)
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
    DisplayLocal(dressup,fetchAsyncId,xPag,estaPag)
    Paginacion(dressup, paginacionId, xPag )

    });

    searchBar.addEventListener("keyup", (e)=>{
        // console.log(e)

        const searchString = (removeAccents(e.target.value)).toLowerCase().trim();
        const filtro = dressup.filter(elem => {
            // console.log(elem.name)

            return ((removeAccents(elem.name)).toLowerCase()).includes(searchString)
            // ||((removeAccents(elem[0].tag)).toLowerCase()).includes(searchString)||((removeAccents(elem[0]["source"])).toLowerCase()).includes(searchString)
        })
        if (filtro.length == 0){
            document.getElementById("canela").classList.remove("displaynone")
        }else{
            document.getElementById("canela").classList.add("displaynone")

        }
        DisplayLocal(filtro,fetchAsyncId,xPag,estaPag)
        Paginacion(filtro, paginacionId, xPag)
    })
})();



