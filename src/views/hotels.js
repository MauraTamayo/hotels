"use client"

// pages/hotels/CatalogueHotels.js
import React, { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Typography, TextField, CardMedia, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation'
import { listHotels } from '@/apiFunctions/hotels';
import Header from '@/components/Header';
// export async function Hotels() {


//     const result = await listHotels()
const TextFieldBoxStyled = styled(TextField)(() => ({
  margin: "3% 0",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "& .MuiOutlinedInput-root": {
      color: "#f5f5f5", // Color del texto en el campo
      "& fieldset": {
          borderColor: "#b3b3b3", // Color del borde en estado desenfocado
      },
      "&:hover fieldset": {
          borderColor: "#80d8ff", // Color del borde al pasar el cursor
      },
      "&.Mui-focused fieldset": {
          borderColor: "#40c4ff", // Color del borde cuando está seleccionado
      },
  },
  "& .MuiInputLabel-root": {
      color: "#b3b3b3", // Color del label en estado desenfocado
  },
  "& .MuiInputLabel-root.Mui-focused": {
      color: "#40c4ff", // Color del label cuando el campo está enfocado
  },
  "& .MuiOutlinedInput-root input": {
      color: "#f5f5f5", // Color del texto del placeholder y el input
  },
}));

const Hotels = () => {
  const [filterHotel, setFilter] = useState('');
  const router = useRouter();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await listHotels();
        console.log('response: ',response)
        setHotels(response);
      } catch (error) {
        console.error("Error al obtener los hoteles:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleHotelClick = (hotelId) => {
    router.push(`/hotels/${hotelId}`);
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(filterHotel.toLowerCase()) ||
    hotel.short_description.toLowerCase().includes(filterHotel.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4, background: "#070F1B" }}>
      <Header/>
      <TextFieldBoxStyled
        label="Busqueda de Hoteles"
        variant="outlined"
        fullWidth
        value={filterHotel}
        onChange={handleFilterChange}
        sx={{ marginBottom: 3}}
      />
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {filteredHotels.map((hotel) => (
          <Grid size={4} key={hotel.id}>
            <Card onClick={() => handleHotelClick(hotel.id)} sx={{ cursor: 'pointer', background: "#1E1E1E", color: "#fff" }}>
              <CardMedia
                component="img"
                height="194"
                image={hotel.image}
                alt={hotel.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">{hotel.name}</Typography>
                <Divider sx={{ margin:'6px 0', background: "#B3B3B3"}}></Divider >
                <Typography variant="h7">Cuidad: {hotel.city}</Typography>
                <Divider/>
                <Typography variant="h7">Dirección: {hotel.address}</Typography>
                <Divider sx={{ margin:'6px 0'}}/>
                <Typography variant="body2" sx={{color: "#BCBCBC"}}>
                  {hotel.short_description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Hotels;
