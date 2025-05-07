export default class DataManager {
    constructor(keySession) {
        this.keySession = keySession;
        let storedData = sessionStorage.getItem(this.keySession);

        try {
            this.dbSession = JSON.parse(storedData) || [];
        } catch (error) {
            console.error("Error al parsear los datos de sessionStorage:", error);
            this.dbSession = [];
        }
    }

    // CRUD

    // CREATE
    createData(objArticulo) {
        if (!objArticulo) {
            console.error("Se requiere un objeto artículo válido.");
            return;
        }
        this.dbSession.push(objArticulo);
        this.saveToSession();
    }

    // READ
    readData() {
        return this.dbSession;
    }

    // UPDATE
    updateData(id, newArticulo) {
        if (!id || !newArticulo) {
            console.error("Se requieren un id y un nuevo artículo para la actualización.");
            return;
        }

        this.dbSession = this.dbSession.map((articulo) => {
            if (articulo.id === id) {
                return { ...articulo, ...newArticulo };
            }
            return articulo;
        });

        this.saveToSession();
    }

    // DELETE
    deleteData(idArticulo) {
        if (!idArticulo) {
            console.error("Se requiere un id de artículo válido para eliminar.");
            return;
        }

        this.dbSession = this.dbSession.filter((articulo) => articulo.id !== idArticulo);
        this.saveToSession();
    }

    // CLEAR
    clearDB() {
        sessionStorage.removeItem(this.keySession);
        this.dbSession = [];
    }

    // Helper function to save data to sessionStorage
    saveToSession() {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
        } else {
            console.error("sessionStorage no está disponible");
        }
    }
}
