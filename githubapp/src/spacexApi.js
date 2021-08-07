import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Detail from './detail';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const api = axios.create({
    baseURL: "https://api.spacex.land/"
});
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
const SpacexApi = () => {

    const [response, setresponse] = useState(null);
    const [detail, setDetail] = useState(null);
    const SpacexQuery = async () => {
        const SPACEX_QUERY = `query {
            launches(limit: 15) {
                id
                launch_success
                links {
                  flickr_images
                }
                mission_name
                details
              }
          }`

        const { data: { data: { launches } } } = await api.post('/graphql', { query: SPACEX_QUERY });
        setresponse(launches);
        console.log("result of spacex ", launches);
    }
    useEffect(() => {
        SpacexQuery();
    }, []);
    console.log((response) ? response.map((r,) => r.id) : "LOADING");

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    {(!response) ? <img src="loader.gif" /> :
                        response.map((r, ind) => {
                            return (
                                <div key={ind} className="detail-div">
                                    <button className="detail-btn" value={r.id} onClick={(e) => setDetail(e.target.value)}>{r.mission_name}</button>
                                </div>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={9} sm={8}>
                    <Detail data={(detail) ? detail : null} />
                </Grid>
            </Grid>

        </div>
    );
}

export default SpacexApi;