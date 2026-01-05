import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const loadUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

const initialState = {
  currentUser: loadUserFromStorage(),
  registeredUsers: loadUsersFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { email, password, name } = action.payload;
      const exists = state.registeredUsers.some((u) => u.email === email);
      if (exists) {
        return;
      }
      const newUser = { id: Date.now().toString(), email, password, name };
      state.registeredUsers.push(newUser);
      saveUsersToStorage(state.registeredUsers);
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.registeredUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        state.currentUser = { id: user.id, email: user.email, name: user.name };
        state.isAuthenticated = true;
        saveUserToStorage(state.currentUser);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      saveUserToStorage(null);
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
