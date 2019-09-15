
let parse = (text) => {
    let result = []
    let block = {};
    text.split('\n').map(e => {
        if (e === '') {
            result.push(block);
            block = {};

        }
        else {
            let keyValue = e.replace(' ', '').replace(' :',':').replace(': ',':').split(':');
            block[keyValue[0]] = keyValue[1];
        }

    })
    result = result.filter(x => Object.keys(x).length)
    result = result.map(e=>{
        e['Stars'] = e['Stars']?e['Stars'].split(', '):[];
        return e;
    })

    return result;
}

module.exports = {
    parse
}
