import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../src/models/user";

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID || '',
    //   clientSecret: process.env.GITHUB_SECRET || '',
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ||'',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ||''
    }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "text"  },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.PATH_LOCALHOST}/api/admin/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
       
        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, account, user  }) {
      // Persist the OAuth access_token to the token right after signin
      
      if (account) {
        token.accessToken = account.access_token
          if ((account?.provider==='credentials') && !!user)
        {
          token.user = user
        }
        else if ((account?.provider!=='credentials') && !!user)
        {
          token.user = { email: user.email, name: user.name }
        } 
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user = token.user;
      return session
    },
    async signIn(
      { user, account, profile, email, credentials }
        ) {
       const emailToCheck = user.email;
       const userAllowed  = await User.findOne({
        email: emailToCheck, role: 'admin'
      })
       

      if (!!userAllowed) {
        
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  },


  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  },
  
}
export default NextAuth(authOptions)