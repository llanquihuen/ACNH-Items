export default async function getData (direccion) {
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
