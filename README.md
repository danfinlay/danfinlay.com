# Danfinlay.com
## Version 3.1

## To Use:

You must have Node.js installed.

```
git clone https://github.com/flyswatter/danfinlay.com.git
cd danfinlay.com
npm install
npm start
```

## Backed by Node.js
It's my back-end platform of choice, and it's great at serving lots of users at once.

*Responsive Interface using Bootstrap
Modified enough a web developer probably didn't assume I did.  These days I probably would've done it all in flex-box.
Most connections these days are from a phone, so a modern web site should tailor to one.

*Previously was entirely streaming interface
Reverted to much simpler delivery methods since then, but the original version boasted this:

```
You probably won't notice on my site, since it's a low-traffic example, but the server never waits for a file to load to start delivering it.  That means when viewing one of my many list-style pages, it is sending each entry off to the client as it's loaded, keeping the server using little memory, able to handle many connections, and more responsive for the user.
```

### Architecture

`index.js` is a routing script, that starts a server, and passes its connections to the appropriate processes.

There is a landing page, a variety of "life update" type pages (which share a handler, which seems to have been my cute name for controller when I wrote this).

Those pages are handled by the files `landingPageHandler.js`, and `lifeUpdateHandler.js`, each of which exports a function that receives the request and response arguments from the main `http` server when it is needed.

### Organization
Excuse me while I keep myself organized.  I have a pretty multi-faceted life, and I don't know what the average visitor of my site is looking for, so I've opted for an almost operating-system-like interface, providing a collapsing menu system for users to find the aspects of me that interests them.

#### Doings
*Technology
*Comedy
*Art
*Screen Printing

####Teachings
*Current Classes
*Online Lessons
*Past Classes
