export const storeToken=(data)=>{
    localStorage.setItem('key',data)
}
export const isAuthenticated=()=>{
    
    if(localStorage.getItem('key')!=null){
       
        return true
    }
}
export const logout=()=>{
    localStorage.removeItem('key')
    localStorage.removeItem('role')

}