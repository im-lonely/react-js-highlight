# react-js-highlight

#### Zero dependency package for highlighting JavaScript and possibly TypeScript^

### Download the code [here](https://github.com/im-lonely/react-js-highlight) or install the package

```
npm install --save react-js-highlight
```

```
yarn add react-js-highlight
```

### Usage

```js
import React from "react";
import useHighlight from "react-js-highlight";

const App = () => {
  return (
    <div className="App">
      {useHighlight('console.log("hello world")', {
        normalColor: "#idkidk",
        stringColor: "#idkidk",
        classColor: "#idkidk",
        keywordColor: "#idkidk",
        varColor: "#idkidk",
        propertyColor: "#idkidk",
      })}
    </div>
  );
};
```

### Warning! This code is so trash it might not work!

^I did not test TypeScript since I am lazy

```

```
