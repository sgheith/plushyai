Installing the SDK
The Inngest SDK allows you to write reliable, durable functions in your existing projects incrementally. Functions can be automatically triggered by events or run on a schedule without infrastructure, and can be fully serverless or added to your existing HTTP server.

It works with any framework and platform by using HTTP to call your functions
It supports serverless providers, without any additional infrastructure
It fully supports TypeScript out of the box
You can locally test your code without any extra setup
Getting started
TypeScript
Go
Python
Installation
To get started, install the SDK via your favorite package manager:

npm
yarn
pnpm
bun

Copy
Copied
npm install inngest
Setup
Once Inngest is installed, create an Inngest client, later used to define your functions and trigger events:

Copy
Copied
import { Inngest } from "inngest";

export const inngest = new Inngest({
id: "my-app",
});
Your project is now ready to start writing Inngest functions:

Define and write your functions
Trigger functions with events
Set up and serve the Inngest API for your framework
