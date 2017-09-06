# [Tovia's Enigma](https://github.com/jaimemendozadev/tovia-enigma)

Tovia's Enigma is a simple Single Page Application that lets users create an encrypted message with an expiration date by using a random generated passphrase. With the magic of cryptography and our random passphrase, we take your message contents and the expiration date for safekeeping, and wait until the right person with the correct passphrase comes along to decrypt your secret message! Our app is so simple to use, members of the clandestine services might even use our app to store sensitive info! 


## Table of contents

- Initial Setup
- Create a `.env` File
- Starting the App
- How it Works
- Created By

## Initial Setup

Open up your terminal and clone the repo locally to your computer by running the following command at the target destination: `$ git clone https://github.com/jaimemendozadev/tovia-enigma.git`

## Create a `.env` File

This step is actually optional since we're not storing any private keys, only the port number. But if you'd like, here's how to crate the `.env`.

Fire up your terminal and in the root of the app directory, create a new `.env` file by simply running `$ touch .env`. 

After creating the `.env` file, use your text editor to enter the following information in the file:

`PORT = 3000`

There should be no line breaks and do not end the line with punctuation or spacing. Please type the port number exactly as it appears in the screenshot. 
  
![.env Screenshot](/img/env-screenshot.png?raw=true ".env Screenshot ")  

After creating the `.env` and you fire up the app, you can use `process.env` in `const` declarations to access the port number 3000 for your Express server.   


## Starting the App

In the root of the app, use your terminal to run `$ npm install` to install all the app dependencies. Wait until everything finishes loading.

Open a second tab in your terminal and run the command `$ npm run build` to build all the React components. Watch the terminal and wait until all the components finish building.

For local development, go to the `/dev/utils.js` and uncomment line 4, comment line 5. Line 5 with the `/api` path should only be uncommented when running the project in production.

Finally in the first terminal tab, or in another opened terminal tab, run the command `$ npm start` to start the app.

Go to `http://localhost:3000` in your favorite browser to start using the app. 


## How it Works

It's actually pretty simple. All you do is enter your `Name`, the `Message` with a 120 character limit, and set the `Expiration Date`.

When you're ready to encrypt your message, click the `Encrypt` button twice. 
 - Once for encrypting the message and saving it to our faux-DB somewhere in the cloud.
 - A second time to reveal a popup Dialog window that will reveal to you your brand new encrypted message in the garbly gook language!

Two things to keep in mind:

1) Once you've encrypted a message, quickly save it somewhere. Otherwise you may not be able to decrypt the message later.

2) Notice at the bottom of the form, it will show the currently used Passphrase for encrypting messages. If you change the passphrase... well... that message you originally encrypted with the old Passphrase... consider it permanetly deleted. Sorry. 


## Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)