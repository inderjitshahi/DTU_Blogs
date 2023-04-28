import express from 'express'

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import bodyParser from 'body-parser';
import dir_name from './dirname.js';
import morgan from 'morgan';
import path from 'path'
import sequelize from './config/db.js';

const PORT = process.env.PORT || 3000;

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js';
import postRoute from './routes/post.js';
import categoryRoute from './routes/category.js';
import likeRoute from './routes/like.js';
import commentRoute from './routes/comment.js';
import imageRoute from './routes/image.js';
import errorHandler from './middleware/errorhandler.js';
import Post from './model/Post.js';
import User from './model/User.js';
import Category from './model/Category.js';
import Like from './model/Like.js';
import Comment from './model/Comment.js';
import Image from './model/Image.js';
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
//Middlewares---------------------
//a function that has access to req, res life-cycle

//Body Parser Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Morgan Middleware,Logger
app.use(morgan('dev'));


// Set static folder
app.use(express.static(path.join(dir_name, 'public')));


app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoute);
app.use('/likes', likeRoute);
app.use('/comments', commentRoute);
app.use('/categories', categoryRoute);
app.use('/images', imageRoute);
app.get('/', (req, res, next) => {
    res.render('index', { title: 'DTU_Blog' });
})

app.use((req, res, next) => {
    res.status(404).render('404', { title: 404 });
})

app.use(errorHandler);

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }


//Associations
//https://sequelize.org/docs/v6/core-concepts/assocs/#creating-the-standard-relationships
//https://sequelize.org/docs/v6/core-concepts/assocs/#fetching-associations---eager-loading-vs-lazy-loading
Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Post);

Category.belongsToMany(Post,{through:'Post_Category'});
Post.belongsToMany(Category,{through:'Post_Category'});

Comment.belongsTo(Post,{ constraints: true, onDelete: 'CASCADE' })
Post.hasMany(Comment)

Comment.belongsTo(User,{ constraints: true, onDelete: 'CASCADE' })
User.hasMany(Comment)

Like.belongsTo(Post,{ constraints: true, onDelete: 'CASCADE' })
Post.hasMany(Like)

Like.belongsTo(User,{ constraints: true, onDelete: 'CASCADE' })
User.hasMany(Like)

Image.belongsTo(Post,{ constraints: true, onDelete: 'CASCADE' })
Post.hasOne(Image);


await sequelize.sync();
const server = app.listen(PORT, console.log(`Server is running at port ${PORT}`));


//Globally Handle unhandled promise rejection
process.on('unhandledRejection', (err, req, res, promise) => {
    console.log(`Error: ${err.message}`);
    //close the server and exit process
    // server.close(() => process.exit(1));
    process.exit(1);
})