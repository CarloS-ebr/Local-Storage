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
