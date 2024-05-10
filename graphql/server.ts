import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "graphql";


const schema = createSchema({resolvers, validate:false});
const yoga = createYoga({ schema });

const server = createServer(yoga)
 
// Start the server and you're done!
const startGraphQlServer = ()=>{
    server.listen(4000, () => {
        console.info('Server is running on http://localhost:4000/graphql')
      })
}

export default startGraphQlServer;