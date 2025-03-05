import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                mobile: {
                    label: "Mobile",
                    type: "text",
                    placeholder: "Enter mobile number",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter password",
                },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(
                        "http://192.168.30.86:80/santusht/authenticate",
                        {
                            mobile: credentials?.mobile,
                            password: credentials?.password,
                        }
                    );

                    const user = response.data;

                    if (user && user.token) {
                        return user; // User contains { token, username, role }
                    }

                    return null;
                } catch (error) {
                    console.error("Login failed:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
};
export default NextAuth(authOptions);
