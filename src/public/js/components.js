let components = COMPONENTS;

//console.log(typeof(COMPONENTS));
module.exports = function(tplRaw) {
    let needComponents = [];
    for (let c in components) {
        var regex = new RegExp('<%=(\\s*?)' + components[c] + '(\\s*?)%>');
        if (tplRaw.match(regex) != null) {
            needComponents.push(components[c]);
            //console.log(components[c]);
            //console.log(tplRaw);
            //require('../../components/' + components[c] + '/script.js');
        }
    }
    return needComponents;
};