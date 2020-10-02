
export default function Ordenar(it){
    const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};

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
