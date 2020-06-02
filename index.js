const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

const sh_endpoint = "/api/superheroes";

let DB = [
  { id: 1, name: "Superman" },
  { id: 2, name: "Catwoman" },
  { id: 3, name: "Spiderman" },
  { id: 4, name: "Batman" },
];

app.use(express.json());

app.get(sh_endpoint, (req, res) => {
  res.status(200).send(DB);
});

app.get(sh_endpoint + "/:id", (req, res) => {
  const { id } = req.params;

  const superhero = DB.find((sh) => sh.id === parseInt(id));

  res.status(200).send(superhero);
});

app.post(sh_endpoint, (req, res) => {
  const { name } = req.body;
  if (name) {
    const newSH = {
      id: DB[DB.length - 1].id + 1,
      name,
    };

    DB.push(newSH);

    res.status(201).send(newSH);
  } else {
    res.status(422).json({
      status: "error",
      message: "'name' key was not provided",
    });
  }
});

app.put(sh_endpoint + "/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let hero = DB.find((sh) => sh.id === parseInt(id));

  hero.name = name;

  res.status(204).end();
});

app.delete(sh_endpoint + "/:id", (req, res) => {
  const { id } = req.params;

  DB = DB.filter((sh) => sh.id !== parseInt(id));

  res.status(204).end();
});

app.listen(PORT, (err) => {
  if (err) throw new Error(err.message);
  console.log(`Server listening on port ${PORT}`);
});
