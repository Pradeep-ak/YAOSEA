const Utils = (function(){

    function isMenuBarEnabled (path) {
        return !(
            path.pathname.startsWith('/login'));
    }

    function roundToTwo(num){    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    function convertToSlug (Text){
        return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    }

    function epochToDate (epochDate){
        return new Date(epochDate)
    }

    function isloginRequried(path){
        return !(
        path.pathname.startsWith('/admin/login') || 
        path.pathname==='/admin' ||
        path.pathname==='/admin/');
    }

   return {
    isMenuBarEnabled : isMenuBarEnabled,
    roundToTwo : roundToTwo,
    convertToSlug : convertToSlug,
    epochToDate : epochToDate,
    isloginRequried:isloginRequried
    }
   })();

export default Utils;