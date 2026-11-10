// Checkpoint Mongoose — GOMYCODE
// Chargement des variables d'environnement (.env contient MONGO_URI)
require('dotenv').config();
const mongoose = require('mongoose');

// 1) Connexion à la base MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion :', err.message));

// 2) Schéma et modèle Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // nom obligatoire
  age: Number,
  favoriteFoods: [String], // tableau de chaînes
});

const Person = mongoose.model('Person', personSchema);

// 3) Créer et sauvegarder un document avec document.save()
const createAndSavePerson = (done) => {
  const person = new Person({ name: 'Said', age: 28, favoriteFoods: ['couscous', 'tajine'] });
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 4) Créer plusieurs documents avec Model.create()
const arrayOfPeople = [
  { name: 'Mary', age: 25, favoriteFoods: ['pizza', 'burritos'] },
  { name: 'John', age: 31, favoriteFoods: ['burritos', 'salade'] },
  { name: 'Amine', age: 22, favoriteFoods: ['burritos', 'harira'] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

// 5) Model.find() : toutes les personnes ayant un nom donné
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

// 6) Model.findOne() : une personne ayant un aliment dans ses favoris
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

// 7) Model.findById() : recherche par _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

// 8) Mise à jour classique : Find, Edit, puis Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// 9) findOneAndUpdate() : fixer l'âge à 20 ans (on renvoie le document mis à jour)
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return done(err);
    done(null, updatedDoc);
  });
};

// 10) findByIdAndRemove() : supprimer une personne par _id
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    done(null, removedDoc);
  });
};

// 11) Model.remove() : supprimer toutes les personnes nommées "Mary"
const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result); // objet avec le nombre de documents supprimés
  });
};

// 12) Chaîne de helpers : personnes qui aiment les burritos,
//     triées par nom, limitées à 2, sans afficher l'âge
const queryChain = (done) => {
  const foodToSearch = 'burritos';
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

module.exports = {
  Person,
  arrayOfPeople,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
