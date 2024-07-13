# GameScript: Game livbrary for javascript !

Game library with phisics and graphics engine that helps you to create your own games in javascript very quickly.



> This repo will be updated when i will have time to do it!

## How to use the demo
clone this repo locally

An example is present at the branch rt-add-example-server

run it by:
```
npm install
npm run build
npm run start
```
it will run by default on port 3000

## How to use it in your project
Clone this repo in your project folder and import it in your javascript file using the main branch.

### Game:

Gamescript provides a Game class from which you will be able to create your own game by adding the scenes to it. It is a singleton class so you will only have one instance of it. get it with GetInstance method.

create an instance of the game, add the scene and start it.

### Scene:

Extends your scene class from the  gamescript.Scene class and override the methods you want to use.

### GameObject:

Extends your gameObject and add existing component or create your own component. overrides the methods to create your own gameobject.

### Component:

Extends your component and override the methods you want to use. Gamescript provides some components that you can use like colliders or renderers.
