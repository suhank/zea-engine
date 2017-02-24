## Macro Loader

> A C-style macro pre-processor for webpack

### Install

```
$ npm i macro-loader --save-dev
```

### Usage

In the service layer files, you can easily use C-style macro like following:

```jsx
// ChoiceItem.jsx
#ifdef REACT_NATIVE
import React, { Component, PropTypes } from 'react-native'
#else
import React, { Component, PropTypes } from 'react'
#endif

class ChoiceItem extends Component {
}
...
```

In the configuration for webpack, add this module to `preloaders` or `loaders`:


```
...
preLoaders: [
  {
    test: /\.(js|jsx)$/,
    include: srcPath,
    loader: 'eslint-loader!macro-loader?config=' + path.join(__dirname,'macros.json')
  }
]
...
```

And add a configuration json file:

```json
//macros.json
[]
// or ["REACT_NATIVE"] for react-native proj conf
```


### LICENCE

MIT

