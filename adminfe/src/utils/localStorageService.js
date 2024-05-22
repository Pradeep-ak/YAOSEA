const LocalStorageService = (function(){

    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    
    function _setToken(tokenObj) {
      localStorage.setItem('admin_access_token', tokenObj.access_token);
      localStorage.setItem('name', tokenObj.name);
    }
    function _getAccessToken() {
      return localStorage.getItem('admin_access_token');
    }
    function _getname() {
      return localStorage.getItem('name');
    }
    function _clearToken() {
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('name');
    }
   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      getName : _getname,
      clearToken : _clearToken
    }
   })();

   export default LocalStorageService;