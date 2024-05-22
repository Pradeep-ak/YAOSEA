
class Utils{

    isSearchEnabled(path){
        return !(
            path.pathname.startsWith('/checkout') || 
            path.pathname.startsWith('/review'));
    }

    isCartEnabled(path){
        return !(
            path.pathname.startsWith('/checkout') || 
            path.pathname.startsWith('/review'));
    }

    isMenuBarEnabled(path){
        return !(
            path.pathname.startsWith('/checkout') || 
            path.pathname.startsWith('/review'));
    }

    roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    convertToSlug(Text){
        return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    }

    getDimension(productJson){
        // console.log(productJson.skus)
        var dimMap = {}
        var swatchImg = {}
        productJson.skus.forEach(e => {
            if(e.option){
                e.option.forEach(y=>{
                    if(y.name === 'color'){
                        if(dimMap[y.name] == null){
                            dimMap[y.name] = [y.value]
                        } else {
                            if (dimMap[y.name].indexOf(y.value) === -1) {
                                dimMap[y.name].push(y.value)
                                //Add the Swatch Image info.
                            }
                        }
                    } else{
                        if(dimMap[y.name] == null){
                            dimMap[y.name] = [y.value]
                        } else {
                            if (dimMap[y.name].indexOf(y.value) === -1) {
                                dimMap[y.name].push(y.value)
                            }
                        }
                    }
                });
            }
        });
        // console.log(dimMap)
        return dimMap;
    }

    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj(val) {
        return typeof val === 'object'
    }

    stringifyValue(val) {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        // form.setAttribute('target', target)
        console.log(params)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post(details) {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

}

export default Utils;