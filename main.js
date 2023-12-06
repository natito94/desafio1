//Primer desafio Backend

class ProductManager{
    static ultId = 0;
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, image, code, stock){
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

    }
    getProducts(){
        console.log(this.products)
    }
    getProductByid(id){
        const product = this.products.find(item => item.id === id);
        if(!product){
            console.log("Not found")
        }
    }
}

const manager = new ProductManager();

manager.getProducts();

manager.addProduct( "producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)

manager.addProduct( "Tunica", "slytherin", 15000, "sin imagen", "abc124", 10)

manager.addProduct( "Tunica", "ravenclaw", 15000, "sin imagen", "abc125", 10)

manager.addProduct( "Tunica", "gryffindor", 15000, "sin imagen", "abc126", 10)

manager.addProduct( "Tunica", "hufflepuf", 15000, "sin imagen", "abc127", 10)

manager.addProduct( "Tunica", "ravenclaw", 15000, "sin imagen", "abc125", 10)

manager. getProducts();

manager.getProductByid(10);

manager.getProductByid(3);

