import React,{useEffect, useState} from 'react';
import axios from 'axios';

const dotenv = require('dotenv');

console.log(process.env);

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
    }
});

const GraphqlApi = () => {
    const [user, setuser] = useState(null);
    const [id, setid] = useState(null);
    // const fetchData_ql = async (username) => {
    //     console.log(" Organization Name ", username);
    //     const QUERY_ORGANIZATION = `query queryOrganization($username: String!){
    //         user(login: $username) {
    //             name
    //             bio
    //         }
    //     }`;

    //     const {data:{data:{user}}} = await api.post('/graphql', { query: QUERY_ORGANIZATION, variables: { username } })
    //     setuser(user);
    // }
    const fetchRepoStar = async(repoId) => {
        const MUTATION_REPO = `mutation addStar($id: ID!){
            addStar(input: {starrableId: $id}) {
              starrable {
                id
                stargazerCount
              }
            }
          }`
          const res = await api.post('/graphql', {query: MUTATION_REPO, variables: { id: repoId }});
          console.log("res ", res);
    };
    const handleSubmit = ( e )=> {
        e.praventDefault();
        console.log("is in sumit", id);
    }
    useEffect(() => {
        //fetchData_ql("aizazdev")
        fetchRepoStar("MDEwOlJlcG9zaXRvcnkzNzgwMzAyMjc=");
    }, [])
console.log("id is ", id);
    return(
        <div>
            <h2>GraphqlApi</h2>
            {(user !== null) ?
            <>
                <p>Name : {user.name}</p>
                <p>Bio : {user.bio}</p>
            </>
            :
            <>
                <p>Loading</p>
            </>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setid(e.target.value)} />
                <button type="submit">Set Id</button>
            </form>
        </div>
    );
}

export default GraphqlApi;




