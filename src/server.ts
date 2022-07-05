import mongoose, {startSession} from "mongoose"
import fs from "fs"
import app from "./app/app"
import {Constant, Errors, FoldersAndFiles} from "./app/constants"
import userModel from "./app/modules/user/user.model"
import categoryModel from "./app/modules/category/category.model"
import addressModel from "./app/modules/address/address.model"
import dishesModel from "./app/modules/dishes/dishes.model"


let {PORT, DB_NAME} = Constant
// const argv = process.argv
// if (argv.length > 2) {
//     PORT = argv[argv.length - 1]
//     DB_NAME = argv[argv.length - 2]
// }


app.listen(PORT, () => {
    const {MONGO_URI, MONGO_PORT, DB_NAME} = Constant
       
    mongoose.set('debug', true) 
    mongoose.connect(`${MONGO_URI}:${MONGO_PORT}/${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
         .then(() => {
            console.log('========= ASSESSMENT ============')
            console.log(`CONNECTED DATABASE ${DB_NAME}`)
            console.log(`ASSESSMENT SERVER STARTED ON PORT ${PORT}`)
        })
         .then(async() => {
            await (async function() {    
                const createdir = async (name: string): Promise<void> => { if(!fs.existsSync(name)) {await fs.mkdirSync(name); console.log(`=======${name} folder Created=======`)} }
                await createdir(FoldersAndFiles.PUBLIC_DIR)
                await createdir(FoldersAndFiles.UPLOADS_DIR)
            }())
        })
        .then(async () => {
             await Promise.all([
                 await userModel.createCollection(), await categoryModel.createCollection(),
                 await addressModel.createCollection(), await dishesModel.createCollection()
             ])
        })
         .then(() => {
             console.log('*************************************************************************************************')
             console.log('*************************************************************************************************')
             console.log('*******************************                           ***************************************')
             console.log('*******************************       App started...      ***************************************')
             console.log('*******************************                           ***************************************')
             console.log('*************************************************************************************************')
             console.log('*************************************************************************************************')
         })
         .catch(err => {
            console.log(Errors.SERVER_RUNTIME_ERROR);
            console.log(err);
            console.log(Errors.TERMINATE_SERVER_PROCESS);
            process.exit(1);
        });

    mongoose.connection.on('error', err => {
        console.log(Errors.MONGOOSE_ERROR);
        console.log(err);
        console.log(Errors.TERMINATE_SERVER_PROCESS);
        process.exit(1);
    })
})