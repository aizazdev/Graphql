import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: "100%",
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


const ImagesList = ({imageData})=> {
  const classes = useStyles();
  console.log("image data ", imageData);
  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        {imageData.map((item, ind) => (
          <ImageListItem key={ind}>
            <img src={item} alt={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
export default ImagesList;