
export default function Ordenare(it){
    const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")};

    it = it.sort(function(a,b){
        // console.log(a,b)
        let nombre1=(removeAccents(a.name.toLowerCase()));
        let nombre2=(removeAccents(b.name.toLowerCase()));
        if(nombre1>nombre2){
           return 1;
        } else if(nombre1<nombre2){
           return -1;
        }
    });
}
