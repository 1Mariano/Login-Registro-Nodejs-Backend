import express from 'express';
import cors from 'cors';
import routesProducts from '../routes/product';
import routesUser from '../routes/user';
import {Product} from "./product";
import {User} from "./user";
class Server{
    private app: express.Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }
    routes(){
        this.app.use('/api/products', routesProducts)
        this.app.use('/api/users', routesUser)
    }
    midlewares(){
        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await Product.sync()
            await User.sync()
        }
        catch (error){
            console.error('No se pudo conectar a la Base de Datos:', error)
        }
    }
}

export default Server;