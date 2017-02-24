let str = "#ifdef BUILD_RELEASE\n\
import {\n\
    Unpack\n\
} from '../external/Unpack.js';\n\
#endif";


var tmp = str.match(/#ifdef (.*)\n([\s\S]*?)\n#endif/i);
console.log(tmp);

