

const decodeText = (chars) => {
    let result = '';
    for (let i = 0; i < chars.length; i++)
      result += String.fromCharCode(chars[i]);
    return result;
}
export {
    decodeText
};


