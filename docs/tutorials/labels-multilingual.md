# Multilingual Labels

ℹ️ Before we begin, please make sure you're already familiar with [labels overview](tutorials/labels).

## How to use multiple languages

Labels can be [loaded](tutorials/labels-library) from external files such as: [TSV](https://en.wikipedia.org/wiki/Tab-separated_values), [JSON](https://en.wikipedia.org/wiki/JSON), or even spreadsheets.

💻 This code can be used to load a labels library:

```javascript
import {
  Vec3,
  Xfo,
  TreeItem,
  BillboardItem,
  Label,
  labelManager,
  Scene,
  GLRenderer,
} from '../libs/zea-engine/dist/index.esm.js'

Label.setDomToImageDep(window.domtoimage)

const urlParams = new URLSearchParams(window.location.search)
const language = urlParams.get('language')
if (language) {
  labelManager.setLanguage(language)
}

labelManager.loadLibrary('LabelPack.tsv', 'data/LabelPack.tsv')
```
