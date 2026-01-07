import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        users:[{email: 'kumar@gmail.com', password: '12345678'}],
        currUser:null,
        isAuthenticated: false,
    },
    reducers: {
        register : (state, action) => {
            const currentUser = action.payload;
            const found = state.users.find(user => user.email === currentUser.email)
            if(!found){
                state.users.push(currentUser);
            }else{
                console.log("User already exists");
            }
    },
    login : (state, action)=>{
        const currentUser=action.payload;
        const found = state.users.find(user => user.email === currentUser.email && user.password ===currentUser.password)
        if(found){
            state.isAuthenticated=true;
            state.currUser=found;
            console.log('User Logged In successfully');
        }else{
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