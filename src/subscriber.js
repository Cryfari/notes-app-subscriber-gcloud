require('dotenv').config();
const {PubSub} = require('@google-cloud/pubsub');
const NotesService = require('./NotesService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const pubSubClient = new PubSub();

const init = async () => {
  const notesService = new NotesService();
  const mailSender = new MailSender();
  const listener = new Listener(notesService, mailSender);

  const subscription = pubSubClient.subscription(process.env.SUBSCRIPTION_NAME);
  subscription.on('message', listener.listen);
};

init();
