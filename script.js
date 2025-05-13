document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('gasto-form');
    const listaGastos = document.getElementById('lista-gastos');


    form.addEventListener('submit', agregarGasto);

    function agregarGasto(event){
        event.preventDefault();

        const cantidad = parseFloat(document.getElementById('cantidad').value);
        const categoria = document.getElementById('categoria').value;
        const descripcion = document.getElementById('descripcion').value;

        if(isNaN(cantidad) || cantidad <= 0 || !categoria.trim() || !descripcion.trim()){
            alert('Por favor, complete todos los campos con valores validos');
            return;
        }
        const gasto = {
            cantidad,
            categoria,
            descripcion
        };
        mostrarGasto(gasto);
        guardarGastoEnLocalStorage(gasto);
        
        form.reset();
    }

    function mostrarGasto(gasto){
        const li =document.createElement('li');
        li.innerHTML = `
        <strong>Cantidad:</strong> $${gasto.cantidad.toFixed(2)} - 
        <strong>Categoria:</strong> ${gasto.categoria} - 
        <strong>Descripcion:</strong> ${gasto.descripcion}
        <button class="delete-button" onclick="eliminarGasto('${gasto.descripcion}')">Eliminar</button>
        <button class="edit-button" onclick="editarGasto('${gasto.descripcion}')">Editar</button>
        `;
        listaGastos.appendChild(li);
    }
    function guardarGastoEnLocalStorage(gasto){
        let gastos;
        if(localStorage.getItem('gastos')=== null){
            gastos = [];
        }else{
            gastos = JSON.parse(localStorage.getItem('gastos'));
        }
        gastos.push(gasto);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }
function obtenerGastosLocalStorage(){
    let gastos;
    if(localStorage.getItem('gastos')=== null){
        gastos = [];

    }else{
        gastos = JSON.parse(localStorage.getItem('gastos'));
    }
    gastos.forEach(gasto => mostrarGasto(gasto));
}
obtenerGastosLocalStorage();

});

function eliminarGasto(descripcion){
    if(confirm('¿Estas seguro de que deseas eliminar este gasto?')){
        const lista = document.getElementById('lista-gastos');
        lista.childNodes.forEach(node =>{
            if(node.innerHTML.includes(descripcion)){
                node.remove()
            }
        });
        let gastos = JSON.parse(localStorage.getItem('gastos'));
        gastos = gastos.filter(gasto => gasto.descripcion !== descripcion);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }
}

function editarGasto(descripcion){
    const nuevoDescripcion = prompt('Editar descripcion', descripcion);
    if(nuevoDescripcion){
        const lista = document.getElementById('lista-gastos');
        lista.childNodes.forEach(node=>{
            if(node.innerHTML.includes(descripcion)){
                node.innerHTML = node.innerHTML.replace(descripcion, nuevoDescripcion);
            }
        });
        let gastos = JSON.parse(localStorage.getItem('gastos'));
        const indice = gastos.findIndex(gasto => gasto.descripcion === descripcion);
        if(indice !== -1){
            gastos[indice].descripcion = nuevoDescripcion;
            localStorage.setItem('gastos', JSON.stringify(gastos));
        }
    }
}