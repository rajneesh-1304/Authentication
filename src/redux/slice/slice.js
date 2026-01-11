import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        users:[{username:'kumar', email: 'kumar@gmail.com', password: '12345678'}],
        currUser:null,
        isAuthenticated: false,
    },
    reducers: {
        register : (state, action) => {
            const currentUser = action.payload;
            const found = state.users.find(user => user.email === currentUser.email || user.username === currentUser.username)
            if(!found){
                state.users.push(currentUser);
            }else{
                console.log("User already exists");
            }
    },
    login : (state, action)=>{
        const { identifier, password } = action.payload;
        const found = state.users.find(user => (user.email === identifier || user.username === identifier) && user.password ===password)
        if(found){
            state.currUser=found;
            state.isAuthenticated=true;
            console.log('User Logged In successfully');
        }else{
            state.currUser = null;
            state.isAuthenticated=false;
            console.log('Invalid Credentials')
        }
    },
    logout:(state)=>{
        state.isAuthenticated=false;
        state.currUser=null;
    }
    }
})

export const {
    register, login, logout
} = userSlice.actions;

export default userSlice.reducer