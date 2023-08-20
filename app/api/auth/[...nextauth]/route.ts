import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    callbacks: {
        async session({ session  }) {
            if (session.user) {
              const sessionUser = await User.findOne({
                  email: session.user.email
              });
      
              session.user.id = sessionUser._id.toString();
            }
            return session;
        },
        async signIn({ profile }) {
            try {
              if (profile) {
                await connectToDB();
    
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        name: profile.name || "",
                        email: profile.email,
                        username: profile.name?.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
              } else {
                return false;
              }
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
})

export { handler as GET, handler as POST};