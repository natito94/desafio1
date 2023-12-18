//Primer desafio Backend + Segundo desafio

const fs = require("fs").promises;

class ProductManager{
    static ultId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(nuevoObjeto){
        let {title, description, price, image, code, stock} = nuevoObjeto;
        if(!title || !description || !price ||!image || !code || !stock){
            console.log("Completar todos los campos, por favor");
            return;
        }
        if(this.products.some(item => item.code === code)){
            console.log("El codigo no se puede repetir");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            image,
            code,
            stock,
        }
        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }
    getProducts(){
        console.log(this.products)
    }
    async getProductByid(id){
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item=> item.id ===id);
            if (!buscado){
                console.log("Producto no encontrado");
            } else {
                console.log("Producto hallado");
                return buscado; 
            }
        } catch (error){
            console.log("error al leer un archivo", error);
        }
/*         const product = this.products.find(item => item.id === id);
        if(!product){
            console.log("Not found")
        } */
    }
    async leerArchivo(){
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        }catch (error){
            console.log("Error, no se pudo leer el archivo", error);
        }
    }
    async guardarArchivo(arrayProductos){
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null,2));
        } catch (error){
            console.log("Error al guardar el archivo, error");
        }
    }

    async updateProduct(id, productActualizado){
        try {
            const arrayProductos = await this.leerArchivo();
            const index = arrayProductos.findIndex(item=> item.id === id);
            if(index !== -1){
                arrayProductos.splice(index, 1, productActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encontro el producto");
            }

        } catch (error){
            console.log("error al actualizar el producto", error);
        }
    }

     async deleteProduct(id) {
    try {
        const arrayProductos = await this.leerArchivo();
        const index = arrayProductos.findIndex(item => item.id === id);
        if (index !== -1) {
            arrayProductos.splice(index, 1);
            await this.guardarArchivo(arrayProductos);
            console.log("Producto eliminado correctamente");
        } else {
            console.log("No se encontró el producto");
        }
    } catch (error) {
        console.log("Error al eliminar el producto", error);
    }
}
}
const manager = new ProductManager("./productos.json");

//TESTING

manager.getProducts();

const tunica = {
    title: "tunica",
    description:"slytherin",
    price:15000,
    image:"imagen no disponible",
    code:"abc123",
    stock:15,
}

manager.addProduct(tunica);

const varita = {
    title: "varita",
    description:"roble",
    price:22000,
    image:"imagen no disponible",
    code:"abc124",
    stock:5,
}

manager.addProduct(varita);

const cuaderno = {
    title: "cuaderno",
    description:"roble",
    price:22000,
    image:"imagen no disponible",
    code:"abc124",
    stock:5,
}

manager.addProduct(cuaderno);

manager.getProducts();

async function testPorId(){
    const buscado = await manager.getProductByid(1);
    console.log(buscado);
}

testPorId();

const corbata = {
    id:2,
    title: "slytherin",
    description:"corbata de gala",
    price:1200,
    image:"imagen no disponible",
    code:"abc123",
    stock:50
}

async function testActualizar() {
    await manager.updateProduct(2,corbata);
}
testActualizar();

async function testEliminar() {
    await manager.deleteProduct(1);
    manager.getProducts();
}

testEliminar();

/* manager.addProduct( "producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)

manager.addProduct( "Tunica", "slytherin", 15000, "sin imagen", "abc124", 10)

manager.addProduct( "Tunica", "ravenclaw", 15000, "sin imagen", "abc125", 10)

manager.addProduct( "Tunica", "gryffindor", 15000, "sin imagen", "abc126", 10)

manager.addProduct( "Tunica", "hufflepuf", 15000, "sin imagen", "abc127", 10)

manager.addProduct( "Tunica", "ravenclaw", 15000, "sin imagen", "abc125", 10)

manager. getProducts();

manager.getProductByid(10);

manager.getProductByid(3); */

