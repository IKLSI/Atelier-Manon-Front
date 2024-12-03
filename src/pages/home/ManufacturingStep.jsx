import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const ManufacturingStep = () => {
  return (
    <Box sx={{ width: '100%', padding: '80px 0' }}>
      <Grid container alignItems="flex-start">
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="./src/assets/img/step.jpg"
            alt="Étape de la fabrication"
            style={{ width: '70%' }}
          />
        </Grid>

        <Grid 
          item xs={12} sm={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            marginTop: '2rem',
            marginLeft: '-75px',
          }}
        >
      <Typography
        variant="h4"
        sx={{
          fontSize: '2.5rem',
          color: '#F3A800',
          marginBottom: '20px',
          letterSpacing: '2px' // Espacement entre les lettres
        }}
      >
        L'étape de la fabrication
      </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: '#333',
              maxWidth: '700px',
              lineHeight: '1.5',
            }}
          >
            Parce qu'une vidéo vaut mieux que 1000 mots ! Voici comment se passe la confection d'un bracelet !
            Découvrez les différentes étapes de la création et plongez au cœur de mon quotidien !
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManufacturingStep;
