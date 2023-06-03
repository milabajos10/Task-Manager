//variables
const formulario = document.getElementById("form");
const textField = document.getElementById("textInput");
const tareas = document.getElementById("tareas");
const deleteButton=document.createElement("button");
const listaTareas=[];
const Tarea={id: Date.now(), nombre: "Nombre de la tarea"};
const sinTareas= document.getElementById("sinTareas");
let contadorPendientes=0;
let contadorCompletadas=0;

//eventos
function eventos(){
    formulario.addEventListener("submit", validarFormulario);
    textField.addEventListener("focus", function(){
        textField.style.backgroundColor="";
    });
}
eventos();


//funciones
function validarFormulario(e){
    e.preventDefault();
    const tarea=textField.value;
    if (!tarea.trim()) {
        textField.style.backgroundColor="rgb(248, 212, 212)"
        return;
    }
    agregarTarea(tarea);
    textField.value="";
}

function agregarTarea(tarea){
    const nuevoDiv = document.createElement("div");
    const objetoTarea = {
        id: Date.now(),
        nombre: tarea,
        completada: false
    };

    const textoTarea = document.createElement("span");
    textoTarea.textContent = tarea;
    textoTarea.classList.add("textoTarea");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    const deleteLogo = document.createElement("i");
    deleteLogo.classList.add("fa-solid", "fa-trash", "delete-logo");
    deleteButton.appendChild(deleteLogo);

    deleteButton.addEventListener("click", function(){
        eliminarTarea(objetoTarea.id);
        tareas.removeChild(nuevoDiv);
    });

    const tareaCompleta= document.createElement("button");
    tareaCompleta.classList.add("tareaCompleta");
    const completeLogo=document.createElement("i");
    completeLogo.classList.add("fa-solid", "fa-check", "complete-logo");
    tareaCompleta.appendChild(completeLogo);

    tareaCompleta.addEventListener("click", function(){
        if (!objetoTarea.completada) {
            tareaCompleta.style.backgroundColor="#c90c0c";
            completeLogo.classList.remove("fa-solid", "fa-check");
            completeLogo.classList.add("fa-solid", "fa-xmark");
            textoTarea.style.textDecoration="line-through";
            objetoTarea.completada=true;
            console.log(objetoTarea.completada);
            contadorCompletadas++;
            contadorPendientes--;
        }else{
            tareaCompleta.style.backgroundColor="#1bb807";
            completeLogo.classList.remove("fa-solid", "fa-xmark");
            completeLogo.classList.add("fa-solid", "fa-check");
            textoTarea.style.textDecoration="";
            objetoTarea.completada=false;
            console.log(objetoTarea.completada);
            contadorPendientes++;
            contadorCompletadas--;
        }

        actualizarMarcador();
    });

    const botones = document.createElement("div"); // Crear nuevo elemento botones para cada tarea
    botones.classList.add("botones");
    botones.appendChild(tareaCompleta);
    botones.appendChild(deleteButton);

    nuevoDiv.appendChild(textoTarea);
    nuevoDiv.appendChild(botones);
    nuevoDiv.classList.add("tarea");
    
    tareas.appendChild(nuevoDiv);
    
    listaTareas.push(objetoTarea);

    console.log(listaTareas);
    sinTareas.style.display = listaTareas.length < 1 ? "block" : "none";
    contadorPendientes++;
    actualizarMarcador();
}

function eliminarTarea(id){
    const indice = listaTareas.findIndex(tarea => tarea.id===id);
    if (indice.length!==-1) {
       const tareaEliminada= listaTareas.splice(indice,1)[0];
       if (tareaEliminada.completada) {
        contadorCompletadas--;
        }else{
        contadorPendientes--;
        }
    }
    
    sinTareas.style.display=listaTareas.length<1 ? "block" : "none";
    actualizarMarcador();
}

function actualizarMarcador(){
    let tareasPendientes=document.getElementById("pendientes");
    let tareasCompletadas=document.getElementById("completadas");

    tareasPendientes.textContent=`Tareas pendientes: ${contadorPendientes}`;
    tareasCompletadas.textContent=`Tareas completadas: ${contadorCompletadas}`;
}




