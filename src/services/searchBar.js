import { handleGetProductLocalStorage } from "../persistence/localstorage.js";
import { handleRenderList } from "../views/store.js";

export const handleSearchProductByName = () =>{
    const inputHeader = document.getElementById('inputHeader');
    const products = handleGetProductLocalStorage();
    console.log(products);
    const result =products.filter((el) => 
        el.nombre.toLowerCase().includes(inputHeader.value)
    );
    handleRenderList(result);
};
