import { atom } from "jotai";
import { Account, Client } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67174863000775f8f2b8") // Your Project ID
  .setPlatform("com.dev.rajdeep.gluestackdemo");

const account = new Account(client);

export const clientAtom = atom(client);
export const accountAtom = atom(account);
