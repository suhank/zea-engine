---
sidebar_position: 3
title: Setting up a layout component in React
---

In this tutorial we will use the React component Re-flex to manage our layout.
For this tutorial, we'll be using the layout component [Re-Flex](https://github.com/leefsmp/Re-Flex)


### React Dependencies

```bash
yarn add react-reflex
```

## Integrating the Layout Component

### Main.tsx

In App.tsx import the following.

```tsx
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
```

In the render() method of Main.tsx, use the new Reflex component. 

the flex property in the ReflexElement element determines how much of the screen the element takes. 
In this case, the Viewport3D should take 85% of the screen.

```tsx
render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <label>Side bar</label>
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement className="right-pane" flex={0.85}>
          <Viewport3D/>
        </ReflexElement>
      </ReflexContainer>
    )
  }
```
## Result
![layout](../../../static/img/react/layout.png)
## Conclusion
You should now be able to arrange various components together to create your UI.

