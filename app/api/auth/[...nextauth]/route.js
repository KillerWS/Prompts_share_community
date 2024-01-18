import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import User from '@models/user'


// console.log({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET      
// })

import { connectToDB } from '@utils/database';
import Github from 'next-auth/providers/github';

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET           
        }),
        
        //  Github配置
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET
        //   })

        

    ],
    callbacks: {
        async session({ session }){
            console.log("Session 被call了")
            
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
            session.check ="yanzheng"
            console.log(session)
            return session;
        },
        async signIn({ profile }){
            try {
                // serverless -> lambda -> dynamodb
                await connectToDB();
                // check if a user already exists
                const userExists = await User.findOne({
                    email:profile.email
                });
                
                //没用户就注册
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").
                        toLowerCase(),
                        image:profile.picture
                    })
                }
                //if not, create a new user
    
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
          }
        
    },

    

})

export {handler as GET,handler as POST }