import React, {useState, useEffect} from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com'
});

const GitHubApi = ()=> {
    const [data, setdata] = useState(null);
    const [repos, setrepos] = useState(null);

    useEffect(() => {
        (async() => {
            const {data} = await api.get('/users/aizazdev/repos');
            console.log("repos = > ", data);
            const {data: login} = await api.get('/users/aizazdev');
            console.log("data ", login.name);
    
        })();
    }, []);

    return(
        <div>
            github api
        </div>
    );
}

export default GitHubApi;