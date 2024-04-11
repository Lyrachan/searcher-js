// Variables 
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Results container
const resultado = document.querySelector('#resultado');

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;


// Generating an object with the search
const datosBusqueda = {
    marca: '', 
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Events
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Displays cars when loading

    // Fills the 'years' option list
    llenarSelect();
});

// Event listener for search select
// #################################################
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

// #################################################

// Functions

// Displays cars info
function mostrarAutos(autos) {

    limpiarHTML();  // Removes previous HTML
    // This function is called before, so the info displayed can be updated

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} - ${transmision} - ${precio}, ${color}
            
        `;

        // Inserting in HTML
        resultado.appendChild(autoHTML);

    })

    // Inserts a paragraph is the results list is empty
    if (!resultado.firstChild) {
        const noResults = document.createElement('P');
            noResults.textContent = 'No se encontraron resultados';
            resultado.appendChild(noResults);
    }
};

// Cleaning HTML when filtering results
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
        // This function simply removes all the HTML 'p' elements when displaying results
        // (according to 'mostrarAutos' function)
    }
};

// Generates years for the Select in descending order
function llenarSelect() {
    
    for( let i = maxYear; i >= minYear; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Adds year option to select
    }

};

// Function that filters according to searching
// High-level functions below this line
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo )
.filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    console.log(resultado)
    // Sends the filtered result (resultado) as a parameter for the mostrarAutos function
    mostrarAutos(resultado);
};

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto; // for keeping references values if none is selected
};
// These two last functions are an automatized version of:
// const prueba = autos.filter(autos => autos.marca === 'Chevrolet')
// datosBusqueda.marca stands in 'Chevrolet' place for every selected car brand
// console.log(prueba)  

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if( year ) {
        return auto.year === parseInt(year);   // different datatypes here (can be done in event)
    }
    return auto; // for keeping references values if none is selected
};

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if( minimo ) {
        return auto.precio >= minimo; // For getting plus or equal values than the min
    }
    return auto;
};

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if( maximo ) {
        return auto.precio < maximo;   // For getting lesser values than the max
    }
    return auto;
};

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
};

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
};

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if( color ) {
        return auto.color === color;
    }
    return auto;
};