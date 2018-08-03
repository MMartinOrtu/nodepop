<h1 align=center style="color:rgb(5, 141, 112); font-size:80px">NODEPOP</h1>



Nodepop is a web-API made with Nodejs and Express to buy anda sell second-hand items.

This is a project of the Web Development Bootcamp of Keepcoding.

<h2 style="color:lightseagreen">Installation</h2>

___

```shell
npm install
```
Copy .env.example to .env and review values
<br>
<br>



<h2 style="color:lightseagreen">Database</h2>

___

This API has been made using Mongoose and MongoDB.

To initialize the database use:
```shell
npm run install_db
```

By doing this you delete all the items you had in your database (in case you had any) and initialize the database with 5 new items. 

You can check the JSON used to initialize the database in *./data/adds.json*
<br>
<br>

Theres is an schema created for each add:
```js
const addSchema = mongoose.Schema({
    name: String,
    toSell: Boolean,
    price: Number,
    picture: String,
    tags: [String] 
});
```
You must follow this schema to create new adds.

<h2 style="color:lightseagreen">Run</h2>
 
 ___

To start the application in production use:

```shell
npm start
```
<br>



<h2 style="color:lightseagreen">Development</h2>

___

To start the application in development use:

```shell
npm run dev
```
<br>


<h2 style="color:lightseagreen">Guide of use</h2>

___

Nodepop is an API that provides a list of second-hand items. The API supports the following operations:

- Paginated adds list (*skip, limit, sort*) and filter (by *name*, *tags*, *price* and *toSell* ).
- List of existing tags.
- Create new adds

## Applyng filters

To aplly filters by *price range* you need to consider the following rules:
- 10-50 :  Use the "-" to specify a **range** between two values.
- 50 : If you write just a value, it will return all the adds that **matches** that value.
- 50- :Use "-" after the value to look fot the adds that are **equal or greater** than that value.
- -50 : Use "-" after the value to look fot the adds that are **equal or less** than that value.

To get a list of all existing tag you must pass the word "**tags**" as a param in the URL and it will return the current list of tags.

The toSell property is a boolean so you have to write *true* to see the selling items, and *false* to see the buying items.


## Creating new adds

When creating a new add using the *POST* method (in Postman, for instance) you can upload an image which will be saved in the "uploads" folder, inside of ./public/images

## Web Client

There is and index.html view from which you can view the list of adds and apply the same filters and paginated list than in the API. You can also get the list of tags by writing  */tags* in the URL.

This is an example of the index.html view:

![Nodepop index.html view](data/Foto-readme.png)