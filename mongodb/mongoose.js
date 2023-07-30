import { mongoose } from 'mongoose';

let uri = 
          'mongodb://127.0.0.1:27017/bookstore';
          //'mongodb+srv://jose1useche:sVEjL5FtjthryxZY@cluster0.no7f8lk.mongodb.net/?retryWrites=true&w=majority';

let db = mongoose.connection;

//connect to DB
export const connectToDb = cbf => {
    mongoose.connect(uri)
    .then(() => {
        return cbf();
    })
    .catch(err => {
        return cbf(err);
    });
} 
 
//connection events 
db.on('open', () => {
    console.log('Database is connected to ', uri);
})

db.on('error', err => console.log('Error to connect: ',err));

// Operaciones con Monggose
// find()
export const productList = async function(page, productsPerPage, modelToDeal) {
    return await modelToDeal.find()
                            .skip(page * productsPerPage)
                            .limit(productsPerPage);
}

// findOne()
export const productDocument = async function(id, modelToDeal) {
    return await modelToDeal.findOne({_id: id});
}

// insertOne()
export const newProduct = async function(productParams, modelToDeal) {
    const product = new modelToDeal({
                                        name: productParams.name,
                                        description: productParams.description,
                                        price: productParams.price
                                     });

    return product.save()
                  .then(doc => {
                    return doc;
                  })
                  .catch(err => {
                    return err.message;
                  })
}

// updateOne
export const updateDocument = async function(id, updates, modelToDeal) {
    return await modelToDeal.updateOne({ _id: id }, { $set: updates });
}

// deleteOne()
export const deleteDocument =  async function(id, modelToDeal) {
    return await modelToDeal.deleteOne({_id: id});
}