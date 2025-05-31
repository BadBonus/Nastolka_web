// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: {
//       name: '',
//       email: ''
//     },
//     isAuthenticated: false,
//     token: null,
//   }),
//   actions: {
//     async login(email: string, pass: string): Promise<boolean> {
//       const data = await $fetch('/api/login', {
//         method: 'POST',
//         body: {email, pass}
//       });
//       console.log(data);

//       if (data) {
//         const fakeToken = `Bearer fake-jwt-token-${Date.now()}`;
//         this.isAuthenticated = true;
//         this.user = data;

//         if (import.meta.client) {
//           localStorage.setItem('auth-token', fakeToken);
//         }

//         return true;
//       }

//       return false;
//     },

//     // fetchUser() {
//     //   if (this.token) {
//     //     this.user = {
//     //       name: 'john doe',
//     //       email: 'user@example.com',
//     //     };
//     //     this.isAuthenticated = true;
//     //   }
//     // },


//     logout() {
//       this.user = null;
//       this.isAuthenticated = false;
//       this.token = null;

//       if (import.meta.client) {
//         localStorage.removeItem('auth-token');
//         localStorage.removeItem('auth-user');
//       }
//     },

//     initialize() {
//       // if (import.meta.client) {
//       //   const storedToken = localStorage.getItem('auth-token');
//       //   if (storedToken) {
//       //     this.token = storedToken;
//       //     this.fetchUser();
//       //   }
//       // }
//     },
//   },
// });