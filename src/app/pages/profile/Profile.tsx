import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, CardContent, CardHeader, CardMedia,Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { red } from '@mui/material/colors';
import { AnimalProps } from "../../../types/animal";
import { baseURL } from "../../../config/config";
import { Theme } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/header/Header";
import { Footer } from "../../shared/footer/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 350,
      marginTop: 15
    },
    media: {
      height: 300,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export const Profile = () => {
  const { idPet } = useParams<{ idPet: string }>();
  const [animal, setAnimal] = useState<AnimalProps | null>(null);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const home = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    axios.get(`${baseURL}/${idPet}`)
      .then(response => {
        setAnimal(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the animal data!", error);
      });
  }, [idPet]);

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <><Header /><div style={{ display: "flex", textAlign: "center", justifyContent: "center", margin: "auto" }}>
      <Card className={classes.root} style={{ minWidth: "20rem" }}>
        <CardHeader
          title={animal.name}
          subheader={`Age: ${animal.age}`} />
        <CardMedia
          className={classes.media}
          image={animal.imgUrl || '/static/images/cards/paella.jpg'}
          title={animal.name} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {animal.description}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography paragraph>Category: {animal.category}</Typography>
          <Typography paragraph>Status: {animal.status}</Typography>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  );
};
