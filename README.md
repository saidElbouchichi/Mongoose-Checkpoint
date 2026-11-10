# Checkpoint Mongoose & NodeJS vs MongoDB — GOMYCODE

Manipulation d'une base MongoDB Atlas avec **Mongoose** (code commenté dans `myApp.js`).

1. Connexion avec `mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })`.
2. Schéma `Person` : `name` (String, requis), `age` (Number), `favoriteFoods` ([String]).
3. `createAndSavePerson` — `document.save()`.
4. `createManyPeople` — `Model.create(arrayOfPeople)`.
5. `findPeopleByName` — `Model.find()`.
6. `findOneByFood` — `Model.findOne()`.
7. `findPersonById` — `Model.findById()`.
8. `findEditThenSave` — find, ajout de « hamburger », puis `save()`.
9. `findAndUpdate` — `findOneAndUpdate()` avec `{ new: true }` (âge = 20).
10. `removeById` — `findByIdAndRemove()`.
11. `removeManyPeople` — `Model.remove({ name: 'Mary' })`.
12. `queryChain` — `.find().sort().limit().select().exec()` (amateurs de burritos).

Les fonctions utilisent la convention de callback Node `done(err, data)`.
Mongoose 6 est utilisé car il accepte encore les callbacks et les méthodes `remove` / `findByIdAndRemove` demandées.

## Configuration

Copier `.env.example` en `.env` et y mettre l'URI MongoDB Atlas (le fichier `.env` n'est pas versionné).

```bash
npm install
npm start
```
