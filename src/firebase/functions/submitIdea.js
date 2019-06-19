// submitIdea.js

const {
  database,
} = require('./admin');

// Submits a new idea to the database.
const submitIdea = (data, context) => {
  const idea = data.idea;
  const uid = context.auth.uid;
};

module.exports = submitIdea;
