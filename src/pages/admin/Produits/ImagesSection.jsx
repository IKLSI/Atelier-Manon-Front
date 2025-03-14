import React from 'react';
import {Box, Button, IconButton, Stack, Typography} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
//TODO bug quand je crée et supprime une image avant de l'enregistrer
const ImagesSection = ({ images = [], setImages , imagesAUpload, setImagesAUpload, setImageADelete, setDisplaySn, setMessage}) => {
const [selectedImg, setSelectedImg] = React.useState(null);

  const handleDeleteImage = (index) => {

      setImageADelete(prev => [...prev, images[index]]);
      setImages(images.filter((_, i) => i !== index));



      setImagesAUpload(prev => prev.filter((img) => img.libImage !== images[index].libImage));


  };

    const handleUpload = async (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) return;
        for (const file of files) {
          const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']; // Ajoute d'autres types si nécessaire
          if (!validImageTypes.includes(file.type)) {
              
              setMessage('Format du fichier incorrect !')
              setDisplaySn(true)
              return; // Sort de la fonction si un fichier n'est pas une image
          }
      }

        try {
            // Convertir les fichiers en base64
            const base64Files = await Promise.all(
                Array.from(files).map((file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = (error) => reject(error);
                        reader.readAsDataURL(file);
                    });
                })
            );

            // Transformer en objets avec name et file
            const filesWithDetails = Array.from(files).map((file, i) => ({
                libImage: file.name.split('.')[0] + '.webp',
                file: base64Files[i],
            }));

            // Mettre à jour les états
            setImages([...images, ...filesWithDetails]); // Ajouter les base64 au tableau d'images
            setImagesAUpload([...imagesAUpload, ...filesWithDetails]); // Ajouter les objets au tableau de fichiers à uploader


        } catch (error) {
            console.error(error);
        }
    };
    function arraymove(arr, fromIndex, toIndex) {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
  const reorderImages = (type) => {
    if (selectedImg === null) return;
    const tmpImages = [...images];
    if (type === 'left') {
        if (selectedImg === 0) return;
        const to = selectedImg - 1;
        arraymove(tmpImages, selectedImg, to);
        setSelectedImg(to);
    }
    if (type === 'right') {
        if (selectedImg === images.length - 1) return;
        const to = selectedImg + 1;
       arraymove(tmpImages, selectedImg, to)
        setSelectedImg(to);

    }
    setImages(tmpImages)
  }


  return (
      <Box>
          <Stack spacing={2} sx={{ marginBottom: 2 }} direction={'row'}>
              <Typography variant="h6">Images</Typography>
              <Button component="label">
                  <AddCircleOutlineIcon />
                  <input type="file" multiple hidden accept=".jpg,.jpeg,.webp, .png" onChange={(e) => handleUpload(e)} />
              </Button>
              <Stack direction={'row'} spacing={1}>
                  <IconButton disabled={images.length < 2} onClick={() => reorderImages('left')} ><ChevronLeft/></IconButton>
                  <IconButton disabled={images.length < 2} onClick={()=> reorderImages('right')}><ChevronRight/></IconButton>
              </Stack>
          </Stack>


        <Box
            sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: 2 }}
        >
          {images.map((src, index) => (
              <Box
                  key={`image-${index}`}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                      border: selectedImg === index ? '2px solid black' : '',
                  }}
                onClick={() => setSelectedImg(index)}
                  component={Button}
              >
                <img
                    src={src.file}
                    alt={`image-${index}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                />
                <IconButton
                    onClick={() => handleDeleteImage(index)}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      background: 'white',
                      boxShadow: 1,
                    }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
          ))}
        </Box>


      </Box>
  );
};

export default ImagesSection;
