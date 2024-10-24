
//=========STORE======

import { setproductoActivo } from "../../main.js";
import { handleGetProductLocalStorage } from "../persistence/localstorage.js";
import { openModal } from "./modal.js";

//funcion que se encarga de traer elementos y llamar al render
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};
//se encarga de filtrar y de renderizar la seccion con todos sus respectivos elementos
export const handleRenderList = (productosIn) =>{
    //filtrado de arrays por categoria 
    const burgers = productosIn.filter((el) => el.categories == "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories == "Papas");
    const gaseosas = productosIn.filter((el) => el.categories == "Gaseosas");
    //reenderiza los elementos de la seccion
    const rederProductGroup = (productos, title) =>{
        if(productos.length > 0) {
            const productosHTML = productos.map((producto, index) => {
                return `<div class='containerTargetItem' id='product-${producto.categories}-${index}'>
                <div>
                <img src='${producto.imagen}'/>
                <div>
                <h2>${producto.nombre}</h2>
                </div>
                <div class='targetProps'>
                <p><b>Precio:</b> $ ${producto.precio}</p>
                </div>

                </div>
                </div>`;
            });
            //retorna la seccion con todos los elementos dentro
            return `
            <section class='sectionStore'>
            <div class='containerTitleSection'>
            <h3>${title}</h3>
            </div>
            <div class='containerProductStore'>
            ${productosHTML.join("")}
            </div>

            </section>
            `;
        }else{
            return "";
        }
    };
    // renderizar cada uno de los productos dentro de su categoria 
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${rederProductGroup(burgers, "Hamburguesas")}
    ${rederProductGroup(papas, "Papas")}
    ${rederProductGroup(gaseosas, "Gaseosas")}
    `;
    //añaden los eventos de manera dinamica
    const addEvents = (productsIn)=>{
        if(productosIn){
            productsIn.forEach((element, index) => {
                const productContainer= document.getElementById(
                    `product-${element.categories}-${index}`
                );
                productContainer.addEventListener("click",() => {
                    setproductoActivo(element);
                    openModal();
                });
            });
        }
    };
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};