# ToDo-List

## Inspiration

After learning

- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Webpack](https://frontendmasters.com/courses/webpack-fundamentals/) and
- [Object Oriented Javascript](https://frontendmasters.com/courses/object-oriented-js/)

wanted to get my hands _dirty_ with a simple yet challenging project.

Hence chose ToDo-List to be made with class-based Typescript and Sass without the use of any frameworks.

Made from **Scratch™**

<br>

## Design

The App was self designed using Figma.

The Draft file can be found [here](https://www.figma.com/file/LYQJ9chQrQSKmlHfSt3l06/ToDo-List?node-id=0%3A1)

<br>

## Points learned

- [Type Assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) is the first thing to know before starting a project. The keyword **as** is used to tell the compiler that a particular element's type is not what typescript believes it to be. Especially useful when using Query Selectors to get a particular Image or Button or a specific element
- **Asset Importing** through Webpack is not understood by TypeScript. Therefore a specific file **\*.d.ts** has to be created to specify what value the import really gives. In case of assets, _import_ really just imports `<file-location>:string`. The folder containg the _.d.ts_ file has to be added to 'include' array in [tsconfig.json](./tsconfig.json)
- `event.keyCode` is deprecated. Gotta use `event.key` instead. But it returns a string character like _'Enter'_ instead. Documentation can be referred [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
- In order to create `SVG` elements inside Javascript, `createElementNS` has to be used instead of `createElement`

  > `const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");`

<br>

## Known Bugs

- The _`label`_ element inside `div.task` has a left-down offset causing a click to the left or a little down of the checkbox activate the transition. On the other hand, clicking anywhere inside the checkbox works fine.
  
  > **Update**: The left offset was due to a _left-margin_ given to the svg element inside it. Removing the margin neutralized the left offset but the down offset still remains

<br>

## Stuffs to Refer later

- [ ] [Shadow-DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
