import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImagesList from './imagesList';

const api = axios.create({
    baseURL: "https://api.spacex.land/"
});

const Detail = ({ data }) => {

    const [detail, setDetail] = useState(null);
    const SpacexQuery = async (id) => {
        const SPACEX_MUTATION = `query spaceXDetailId($id: ID!){
            launch(id: $id) {
                id
                details
                mission_name
                links {
                  flickr_images
                }
              }
          }`

        const { data: { data: { launch } } } = await api.post('/graphql', { query: SPACEX_MUTATION, variables: { id } });
        setDetail(launch);
    }
    useEffect(() => {
        SpacexQuery((!data) ? "1" : data);
    }, [data]);
    return (
        <>
            {(!detail) ? <img src="loader.gif" /> :
                <>
                    <h1>{detail.mission_name}</h1>
                    <p>{detail.details}</p>
                    <div>
                        <ImagesList imageData={detail.links.flickr_images} />
                    </div>
                </>
            }
        </>
    );
}

export default Detail;