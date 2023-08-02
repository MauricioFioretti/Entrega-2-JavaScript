/*Una empresa necesita un programa para procesar todas las ventas que se realizan. De cada Venta se conocen los siguientes datos: número de ticket, nombre del cliente, importe total, un código del vendedor (la empresa posee vendedores identificados con un número entero entre 1 y 13, ambos incluidos), y un código de producto (identificados con un número entero entre 0 y 7, ambos incluidos). Se desea almacenar la información de n ventas en un arreglo de registros de tipo Venta (definir el tipo Venta y cargar n por teclado).

Se pide desarrollar un programa en JavaScript controlado por un menú de opciones que permita gestionar las siguientes tareas:

1- Cargar el arreglo con los datos de las n ventas. Validar que el importe sea mayor a 0 y que el código de vendedor y el del producto estén en el rango indicado. Puede hacer la carga en forma manual, o puede generar los datos en forma automática (con valores aleatorios) o puede disponer de ambas técnicas si lo desea. Pero al menos una debe programar.

2- Mostrar el nombre del cliente, el importe y el código del producto de todas las ventas con un importe total entre x e y (con x e y ingresados por teclado). Este listado debe mostrar una línea por cada venta y debe estar presentado en orden de mayor a menor según el importe de la venta.

3- Determinar cuántas ventas de cada código de producto se realizaron (8 contadores). Indicar si la empresa vendió más productos con código de producto par o con código de producto impar e informar por pantalla estos valores.

4- Determinar y mostrar el número de ticket, el nombre del cliente y el código de producto de la venta que tenga el menor importe de venta realizada. Mostrar estos datos en una sola línea.

5- Determinar si existe alguna venta cuyo número de ticket sea igual a t, pero que también tengo un código de vendedor entre 1 y 5. Si existe, mostrar todos los datos de ese registro. Si no existe, informar con un mensaje*/


"use strict"

//FUNCIONES PARA ORDENAR INFORMACION
function unRenglonRegistro(registro) {
    let unRenglon = `\n||Cliente: ${registro.nombre}. ||Importe: ${registro.importe}. ||Codigo de producto: ${registro.producto}`
    return unRenglon
}

function unRenglon(registro) {
    let unRenglonRegistro = `\n||Cliente: ${registro.nombre}. ||Importe: ${registro.importe}. ||Codigo de producto: ${registro.producto}. ||Numero de Ticket: ${registro.ticket}.`
    return unRenglonRegistro
}

function unRenglonTicket(registro) {
    let unRenglonTiket = `\n||Numero de Ticket: ${registro.ticket}. ||Cliente: ${registro.nombre}. ||Codigo de producto: ${registro.producto}`
    return unRenglonTiket
}

function imprimir(registro) {
    console.log("----------------------------------------------------------------------------------")
    console.log(`El numero de ticket es: ${registro.ticket}`)
    console.log(`El nombre del cliente es: ${registro.nombre}`)
    console.log(`El importe de la venta es: ${registro.importe}`)
    console.log(`El codigo del vendedor es: ${registro.vendedor}`)
    console.log(`El codigo del producto es: ${registro.producto}`)
}


//FUNCIONES GENERADORAS
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min
    return num
}

function randomPalabra(array) {
    let palabra = array[Math.floor(Math.random() * array.length)]
    return palabra
}

function generarVentas() {
    let n = parseInt(prompt("Ingrese la cantidad de ventas que desea generar (un numero positivo): "))
    while (n <= 0 || isNaN(n)) {
        n = parseInt(prompt("Se pidió un número positivo, ingrese nuevamente: "))
    }

    let arregloVentas = []

    let nombre = ["Alejandra ", "Sandra ", "Oliveca ", "Rosa ", "Guada ", "Matias ", "Roberto ", "Agustin ", "Gonzalo "]
    let apellido = ["Ramirez", "Sanchez", "Palacio", "Bertorello"]

    for (let i = 0; i < n; i++) {
        let ticket = random(1, 500)
        let cliente = randomPalabra(nombre) + randomPalabra(apellido)
        let importe = random(200, 50000)
        let vendedor = random(1, 13)
        let producto = random(0, 7)
        arregloVentas.push(new Ventas(ticket, cliente, importe, vendedor, producto))
    }

    return arregloVentas
}


//FUNCIONES PARA ORDENAR
function ordenar(vector) {
    vector.sort((a, b) => (a.importe > b.importe) ? 1 : (a.importe < b.importe) ? -1 : 0)
    return vector
}


//OTRAS FUNCIONES
function mostrarClienteImporteCodigo(registro, x, y) {
    registro = ordenar(registro)

    //Esto se puede optimizar creando un sub array que contenga el intervalo de precios [x, y] y luego mostrarlos
    for (let i of registro) {
        if (i.importe >= x && i.importe <= y) {
            console.log(unRenglon(i))
        }
    }
}

function tiposProductos(array) {
    let tipos = new Array(8).fill(0)
    let par = 0
    let impar = 0

    for (let i of array) {
        tipos[i.producto] += 1

        if (i.producto % 2 === 0) { par += 1 }
        else { impar += 1 }
    }

    for (let i = 0; i < 10; i++) {
        if (tipos[i] > 0) {
            console.log(`\nSe vendieron ${tipos[i]} productos del tipo ${i}`)
        }
    }

    if (impar > par) {
        console.log(`\nLa empresa vendio mas productos con codigo impar. Vendio ${impar} productos de codigo impar y ${par} con codigo par.`)
    }
    else if (par > impar) {
        console.log(`\nLa empresa vendio mas productos con codigo impar. Vendio ${par} productos de codigo impar y ${impar} con codigo par.`)
    }
    else {
        console.log(`\nLa empresa vendio la misma cantidad de productos de codigo par que impar. Vendio {impar} productos de codigo impar y {par} con codigo par.`)
    }
}

function menorImporte(array) {
    let menorImporte = ordenar(array)
    return console.log(unRenglonTicket(menorImporte[0]))
}

function buscarTicket(registros) {
    let t = parseInt(prompt("Ingrese el numero de ticket que desea buscar: "))

    if (registros.some(reg => reg.ticket == t)) {
        console.log(registros.find(reg => reg.ticket == t))
    }
    else {
        console.log(`\nNo se encontro un registro con ese numero de ticket.`)
    }
}

// CLASS Ventas
class Ventas {
    constructor(numero_ticket, nombre_cliente, importe_total, codigo_vendedor, codigo_producto) {
        this.ticket = numero_ticket
        this.nombre = nombre_cliente
        this.importe = importe_total
        this.vendedor = codigo_vendedor
        this.producto = codigo_producto
    }
}


//==============================================Menu=======================================================
let texto = "1. Cargar los datos de las ventas.\
            \n2. Mostrar todas las ventas en un intervalo.\
            \n3. Mostrar la cantidad de ventas de cada código.\
            \n4. Mostrar el menor importe de venta realizada.\
            \n5. Buscar una venta específica.\
            \n6. Salir."

let opcion = 0
let valor = false
while(opcion != 6){
    do{
        console.log("----------------------------------------------------------------------------------")
        console.log(texto)
        console.log("----------------------------------------------------------------------------------")
        opcion = parseInt(prompt("Ingrese una opción: \n" + texto))
    }while(opcion < 1 || opcion > 6)

    if (opcion === 1) {
        var arregloVentas = generarVentas()
        console.log(arregloVentas)
        valor = true

        for(let venta of arregloVentas){
            console.log(unRenglon(venta))
        }
    }

    else if (opcion === 2 && valor) {
        let x = parseInt(prompt("Ingrese el importe mínimo del rango para mostrar: "))
        let y = parseInt(prompt("Ingrese el importe maximo del rango para mostrar: "))

        mostrarClienteImporteCodigo(arregloVentas, x, y)
    }

    else if (opcion === 3 && valor) { tiposProductos(arregloVentas) }

    else if (opcion === 4 && valor) { menorImporte(arregloVentas) }

    else if (opcion === 5 && valor) { buscarTicket(arregloVentas) }

    else if (opcion != 6) { console.log(`Usted todavía no generó las ventas.`) }

}

alert("\nHasta la próxima!!")