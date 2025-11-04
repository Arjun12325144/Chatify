import {create} from 'zustand';
export const useAuthStore = create((set)=>({
    authUser:{name:"john",_id:123, age:23},
    isLoading:false,
    login: ()=>{
        console.log("we just logged")
    }
}))