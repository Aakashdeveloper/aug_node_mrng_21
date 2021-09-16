var graphql = require('graphql');
var axios = require('axios');

const{
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLNonNull

} = graphql;

const MovieType = new GraphQLObjectType({
    name:'Movies',
    fields:{
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        language: {type: GraphQLString},
        type: {type: GraphQLString},
        rate: {type: GraphQLFloat},
        imageUrl: {type: GraphQLString},
    }
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        Movies:{
            type:MovieType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:9700/movies/${args.id}`)
                .then((res) => res.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addMovies: {
            type:MovieType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLInt)},
                name: {type: GraphQLString},
                language: {type: GraphQLString},
                type: {type: GraphQLString},
                rate: {type: GraphQLFloat},
                imageUrl: {type: GraphQLString}, 
            },
            resolve(parentValue, {id,name,language,type}){
                return axios.post(`http://localhost:9700/movies`,{id,name,language,type})
                .then((res) =>  res.data)
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})