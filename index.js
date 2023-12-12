import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Harry Potter",
    content:
      "Harry Potter is the protagonist of J.K. Rowling's series. An orphaned wizard, he attends Hogwarts, where he forms close friendships. Known for his lightning-shaped scar, Harry faces challenges, including the dark wizard Voldemort's threat. His journey involves courage, loyalty, and the struggle between good and evil, ultimately emphasizing the power of love.",
    author: "J.K. Rowling",
    date: "2023-08-01T10:00:00Z",
    image:"https://images.ctfassets.net/usf1vwtuqyxm/3SQ3X2km8wkQIsQWa02yOY/8801d7055a3e99dae8e60f54bb4b1db8/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=914&q=70&fm=jpg"
  },
  {
    id: 2,
    title: "Hermione Granger ",
    content:
      "Hermione Granger is a brilliant and resourceful witch in J.K. Rowling's Harry Potter series. Known for her intelligence, loyalty, and dedication to her friends, Hermione plays a crucial role in the trio with Harry and Ron. She is a determined and skilled witch, often using her knowledge to overcome challenges.",
    author: "J.K. Rowling",
    date: "2023-08-05T14:30:00Z",
    image:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Hermione_Granger_poster.jpg/220px-Hermione_Granger_poster.jpg"
  },
  {
    id: 3,
    title: "Ron Weasley",
    content:
      "Ron Weasley is a loyal and good-natured wizard in J.K. Rowling's Harry Potter series. He is one of Harry's closest friends and a key member of the trio, along with Hermione. Ron is known for his humor, bravery, and loyalty, despite facing challenges and insecurities.",
    author: "J.K Rowling",
    date: "2023-08-10T09:15:00Z",
    image:"https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg"
  },
];

let lastId = 4;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts",(req,res)=>
{
  console.log(posts);
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id

app.get("/posts/:id",(req,res)=>
{
  const concerned_id = parseInt(req.params.id);
  const concerned_blog = posts.find((p)=> p.id === concerned_id);
  if(!concerned_id)
  {
    res.status(404).json({message:"Not found"});
  }
  else{
    res.json(concerned_blog);
  }


});

//CHALLENGE 3: POST a new post

app.post("/posts",(req,res)=>
{
  const new_post={
    id:lastId++,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    image: req.body.image,
  }
  res.json(new_post).status(201);

posts.push(new_post);
})


//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts",(req,res)=>
{
  const concerned_id = parseInt(req.params.id);
  const concerned_blog = posts.find((p)=> p.id === concerned_id);
  if(!concerned_id)
  {
    res.status(404).json({message:"Not found"});
  }
  else{
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;
  if (req.body.image) post.image = req.body.image;

  res.json(post);
  }

})

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts",(req,res)=>
{
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
