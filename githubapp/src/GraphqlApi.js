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
    const fetchData_ql = async (username) => {
        console.log(" Organization Name ", username);
        const QUERY_ORGANIZATION = `query queryOrganization($username: String!){
            user(login: $username) {
                name
                bio
            }
        }`;

        const {data:{data:{user}}} = await api.post('/graphql', { query: QUERY_ORGANIZATION, variables: { username } })
        setuser(user);
    }
    useEffect(() => {
        fetchData_ql("aizazdev")
    }, [])

    return(
        <div>
            <h2>GraphqlApi</h2>
            {(user !== null) ?
            <>
                <p>Name : {user.name}</p>
                <p>Bio : {user.bio}</p>
            </>
            :
            <p>Loading</p>
        }
        </div>
    );
}

export default GraphqlApi;




