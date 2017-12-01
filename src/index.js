/* eslint-disable no-console */
import express from 'express';
import {createServer} from 'http'
import './config/db' // to connect and run mongodb 
import mocks from './mocks'
import constants from './config/constants'
import middleware from './config/middleware'

const app = express(); // create an instance of express


// we put everything in config/middleware
middleware(app)

const graphQlServer = createServer(app)

// we get the mocks first then run the server 
mocks().then(() => {

	graphQlServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen on port: ${constants.PORT}`);
  }
});
	
})

