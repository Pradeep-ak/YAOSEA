import axios from "axios";
import LocalStorageService from "./localStorageService";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
   config => {
    //    console.log('In the request Interceptors = '+config.url)
       const token = localStorageService.getAccessToken();
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       } 
       return config;
   },
   error => {
       console.log(error)
       Promise.reject(error)
   });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    // console.log('In the response Interceptors' + response)
   return response
}, function (error) {    
   const originalRequest = error.config;
   if (error.response.status === 401 && !originalRequest._retry) {
       console.log('Please login')
       alert('Please Login.');
       localStorageService.clearToken();
       window.location.href ='/admin/';
   }
   return Promise.reject(error);  
});