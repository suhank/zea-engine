---
sidebar_position: 5
title: Loading ZCAD files
---

## Setup
In this tutorial we will use the (Zea-React-Template)[https://github.com/ZeaInc/zea-react-template]
Starting from this template, we will add a React component that enables us to drag and drop a file into the scene to then visualize it.

## Adding a Popup for file uploads

In this tutorial we will use the [reactjs-popup](https://github.com/yjose/reactjs-popup) component to present the react-dropzone area.

```bash
yarn add reactjs-popup
```


## Adding file drag and drop functionality

We will use (react-dropzone)[https://github.com/react-dropzone/react-dropzone] to manage this.

```bash
yarn add react-dropzone
```

## App.tsx

Lets first add some state to the App function. We will use this to determine whether or not we show the popup with the drag and drop area.
```tsx
 const [file, setFile] = useState<any>(null)
const [open, setOpen] = useState<boolean>(true)
```

From there all we need to do is to add the component to App.tsx.

Below we have the Popup component that is open when the state variable open is true. 
Nested inside the Popup component, we have the Dropzone component. Here in the OnDrop function, 
we take the file that the user has dropped onto the dropzone and then call setFile, which updates the file variable. 
This in turn makes React re-render the Viewport3D component with the new file as a prop.

```tsx
        <Popup open={open} modal nested>
          {(close: any) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>

              <Dropzone
                onDrop={(acceptedFiles) => {
                  setFile(acceptedFiles)
                  setOpen(false)
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          )}
        </Popup>
```


## Viewport3D
We can add the methods componentDidUpdate(), a lifecycle method, and loadZCADAsset, which will load our model into the scene tree.
the method loadZCADAsset will load 
```tsx
  componentDidUpdate() {
    if (this.props.file) {
      const file = this.props.file[0].path
      const filepath = 'data/' + file
      const extension = file.split('.')[1]
      if (extension === 'zcad') {
        this.loadZCADAsset(filepath)
      } else {
        // TODO: send to zea cloud
      }
    }
  }

  loadZCADAsset(filepath: string) {
    const asset = new CADAsset()
    asset.load(filepath).then(() => {
      this.renderer.frameAll()
    })
    asset.getGeometryLibrary().on('loaded', () => {
      postMessage('done-loading')
    })
    this.scene.getRoot().addChild(asset)
  }
```