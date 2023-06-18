const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const stripe = require('./routes/stripe')

dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    // Aquí puedes realizar tus operaciones en la base de datos
  })
  .catch((error) => {
    console.error('Error al conectarse a MongoDB:', error);
});
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

const port = process.env.PORT || 3000;

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/pay',stripe)
app.listen(port, () => console.log(`App listening on port ${port}!`))