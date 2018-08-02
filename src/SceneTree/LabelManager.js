import {
    Signal
} from '../Utilities';
import {
    MaterialLibrary
} from './MaterialLibrary.js';
import {
    resourceLoader
} from './ResourceLoader.js';
import {
    loadTextfile
} from './Utils.js';

var getFirstBrowserLanguage = function() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};


class LabelManager {
    constructor() {
        this.__labelLibraries = {};
        this.labelLibraryLoaded = new Signal();

        const language = getFirstBrowserLanguage();
        if (language.startsWith('en'))
            this.__language = 'En';
        else if (language.startsWith('es'))
            this.__language = 'Es';
        else if (language.startsWith('fr'))
            this.__language = 'Fr';
        else if (language.startsWith('gb'))
            this.__language = 'Gb';

        this.__foundLabelLibraries = [];

        resourceLoader.registerResourceCallback('.labels', (filename, file) => {
            this.__foundLabelLibraries.push(filename);
            loadTextfile(file.url,
                (text) => {
                    const stem = filename.split('.')[0]; // trim off the extension
                    this.__labelLibraries[stem] = JSON.parse(text);
                    this.labelLibraryLoaded.emit(stem)
                }
            );
        })
    }

    getFoundLibaries() {
        return this.__foundLabelLibraries;
    }


    getLabelText(libraryName, labelName) {
        const library = this.__labelLibraries[libraryName];
        if (!library) {
            throw ("LabelLibrary: '" + libraryName + "' not found in LabelManager. Found: [" + Object.keys(this.__labelLibraries) + "]")
        }
        const label = library[labelName];
        if (!label) {
            throw ("Label: '" + labelName + "' not found in LabelLibrary. Found: [" + Object.keys(library) + "]")
        }
        const labelText = label[this.__language];
        if (!labelText) {
            if (label['En'])
                return label['En'];
            throw ("labelText: '" + language + "' not found in Label. Found: [" + Object.keys(label) + "]")
        }
        return labelText;
    }

    setLabelText(libraryName, labelName, labelText) {
        let library = this.__labelLibraries[libraryName];
        if (!library) {
            library = {};
            this.__labelLibraries[libraryName] = library;
        }
        let label = library[labelName];
        if (!label) {
            label = {};
            library[labelName] = label;
        }
        label[this.__language] = labelText
        // TODO: Push to server.
    }


};

const labelManager = new LabelManager();
export {
    labelManager
};