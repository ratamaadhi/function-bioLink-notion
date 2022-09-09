const functions = require("firebase-functions");
const app = require('express')();

const { biolink } = require('./APIs')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.get('/', biolink)

exports.api = functions.https.onRequest(app)
