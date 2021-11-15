// import { MongoClient } from "mongodb"

// async function handler(req, res) {
//     if (req.method === 'POST') {
//         const data = req.body

//         const client = await MongoClient.connect('mongodb+srv://harelk1015:H16734901015k@cluster0.1szjm.mongodb.net/shopProject?retryWrites=true&w=majority')
//         const db = client.db()

//         const cartCollection = db.collection('cart')

//         const result = await cartCollection.insertOne(data)

//         console.log(result)

//         client.close()

//         res.status(201).json( {message: 'cart updated'})
//     }
// }

// export default handler
