export default class DataManager {
    constructor(keyStorage) {
        this.keyStorage = keyStorage;
        this.db = this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const storedData = localStorage.getItem(this.keyStorage);
            return storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error("Error al cargar datos:", error);
            return [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.keyStorage, JSON.stringify(this.db));
            return true;
        } catch (error) {
            console.error("Error al guardar datos:", error);
            return false;
        }
    }

    // CRUD

    // CREATE
    createData(objArticulo) {
        if (!objArticulo) {
            console.error("Se requiere un objeto artículo válido.");
            return;
        }
        this.db.push(objArticulo);
        this.saveToStorage();
    }

    // READ
    readData() {
        return this.db;
    }

    // UPDATE
    updateData(id, newArticulo) {
        if (!id || !newArticulo) {
            console.error("Se requieren un id y un nuevo artículo para la actualización.");
            return;
        }

        this.db = this.db.map((articulo) => {
            if (articulo.id === id) {
                return { ...articulo, ...newArticulo };
            }
            return articulo;
        });

        this.saveToStorage();
    }

    // DELETE
    deleteData(idArticulo) {
        if (!idArticulo) {
            console.error("Se requiere un id de artículo válido para eliminar.");
            return;
        }

        this.db = this.db.filter((articulo) => articulo.id !== idArticulo);
        this.saveToStorage();
    }

    // CLEAR
    clearDB() {
        localStorage.removeItem(this.keyStorage);
        this.db = [];
    }
}