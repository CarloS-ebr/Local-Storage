export default class Articulo {
    constructor(id, marca, precio, color, talla, stock, deportivo, disponible, casual, fechaLanzamiento) {
        this["ID Artículo"] = id;
        this["Marca"] = marca;
        this["Precio"] = precio;
        this["Color"] = color;
        this["Talla"] = talla;
        this["Stock"] = stock;
        this["Disponible"] = disponible;
        this["Tipo de Producto"] = this.definirTipo(deportivo, casual);
        this["Fecha de Llegada"] = fechaLanzamiento;
    }

    definirTipo(deportivo, casual) {
        if (deportivo && casual) return "Mixto";
        if (deportivo) return "Deportivo";
        if (casual) return "Casual";
        return "Sin tipo";
    }
}
/*
export default class persona {

    constructor() {

        this.idArticulo = 0;
        this.marca = null;
        this.precio = null;
        this.color = 0;
        this.talla = null;
        this.stock = null;
        this.disponible = null;
        this.tipoProducto = null;
        this.fechaLlegada = null;

    }

    set setIdArticulo(idPersona) {
        this.idPersona = idPersona;
    }
    set setNombre(nombre) {
        this.nombre = nombre;
    }
    set setApellidos(apellido) {
        this.apellido = apellido;
    }
    set setEdad(edad) {
        this.edad = edad;
    }
    get getIdPersona() {
        return this.idPersona;
    }
    get getNombre() {
        return this.nombre;
    }
    get getApellidos() {
        return this.apellido;
    }
    get getEdad() {
        return this.edad;
    }

} 
*/