let mongoose = require("mongoose");
const { Books } = require('./models/index.js')

mongoose.connect("mongodb://localhost/books", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let booksSeed = [
    {
        title: "Harry Potter",
        authors: [
            {name: "Jeey Louis"},
            {name: "Harley Quin"},
            {name: "Hose jeru"}
        ],
        description: "You're a wizard Harry",
        image: "https://i.guim.co.uk/img/media/1d4b16d4c6703e9bec9174f1cadc278026de0647/0_75_1280_768/master/1280.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0979f004450fe8f211282ae551a33a36",
        link: "https://harrypotter.bloomsbury.com/uk/jkrowling/links/"
    }
]

Books.deleteMany({})
  .then(() => Books.collection.insertMany(booksSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
