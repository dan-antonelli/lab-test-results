# Lab results

A small web app using Node.js and React/TS/Vite.

### Note on project structure

The client code is in the root folder, the server code is in the `server` folder.

### Local project setup:

1. Install client dependencies:
   `npm install`

2. Install server dependencies:
   `cd server`
   `npm install`

3. Move back to root:
   `cd ..`

4. Start server:
   `npm run start:server`

(The server will set up the mock database from an init file on start. All further changes will be saved to the mock database.)

5. (In a separate terminal) Run `npm run dev` to start the client.

6. Press `o` + `Return` to open client in the browser.
