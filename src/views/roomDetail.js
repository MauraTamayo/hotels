"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Grid2, Divider } from '@mui/material';
import { detailReserver } from '@/apiFunctions/roomServices';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos CSS del carrusel

import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BedIcon from '@mui/icons-material/Bed';
import SeaIcon from '@mui/icons-material/Waves';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import BathtubIcon from '@mui/icons-material/Bathtub';
import TvIcon from '@mui/icons-material/Tv';
import HotTubIcon from '@mui/icons-material/HotTub';
import MiniBarIcon from '@mui/icons-material/LocalBar';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LockIcon from '@mui/icons-material/Lock';
import PetsIcon from '@mui/icons-material/Pets';
import AccessibleIcon from '@mui/icons-material/Accessible';
import WorkIcon from '@mui/icons-material/Work';
import SpeakerIcon from '@mui/icons-material/Speaker';
import SmartScreenIcon from '@mui/icons-material/SmartScreen';
import SecurityIcon from '@mui/icons-material/Security';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import Header from '@/components/Header';

const RoomDetail = ({ id }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      const data = await detailReserver(id);
      setRoom(data);
    };

    fetchRoomDetail();
  }, [id]);

  if (!room) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <>
    <Header/>
    <Box sx={{ padding: 4, backgroundColor: '#070F1B' }}>
      <Card sx={{ backgroundColor: '#070F1B' }} >
        <Carousel>
          <div>
            <img src={room.imagen} alt={room.nombre} />
          </div>
          <div>
            <img src={room.imagen_2} alt={room.nombre} />
          </div>
        </Carousel>
        <Divider sx={{ my: 2, background: "#B3B3B3" }} />
        <Box p={2} sx={{ color: "#fff", backgroundColor: '#070F1B' }}>
          <Typography variant="h5" gutterBottom>{room.nombre}</Typography>
          <Typography variant="body1" paragraph>{room.descripcion}</Typography>
        </Box>
        <Divider sx={{ my: 2, background: "#B3B3B3" }} />

        <Box p={2} sx={{ color: "#929292", backgroundColor: '#070F1B', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box id="primer-columna" sx={{ flex: 1, marginRight: 2 }}>
            <Typography variant="h6"><PeopleIcon /> Capacidad: {room.capacidad} personas</Typography>
            <Typography variant="h6"><AttachMoneyIcon /> Precio por noche: {room.precio_por_noche} COP</Typography>
            <Typography variant="h6"><SquareFootIcon /> Metros cuadrados: {room.metros_cuadrados} m²</Typography>
            <Typography variant="h6"><BedIcon /> Tipo de cama: {room.tipo_cama}</Typography>
            <Typography variant="h6"><BedIcon /> Número de camas: {room.numero_de_camas}</Typography>
            <Typography variant="h6"><SeaIcon /> Vista al mar: {room.tiene_vista_al_mar ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><AcUnitIcon /> Aire acondicionado: {room.tiene_aire_acondicionado ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><WifiIcon /> WiFi: {room.tiene_wifi ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><FreeBreakfastIcon /> Desayuno incluido: {room.tiene_desayuno_incluido ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><BathtubIcon /> Baño privado: {room.tiene_bano_privado ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><TvIcon /> Televisión: {room.tiene_television ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><HotTubIcon /> Jacuzzi: {room.tiene_jacuzzi ? 'Sí' : 'No'}</Typography>
          </Box>

          <Box id="segunda-columna" sx={{ flex: 1, marginLeft: 2 }}>
            <Typography variant="h6"><MiniBarIcon /> Minibar: {room.tiene_minibar ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><RoomServiceIcon /> Servicio a habitación: {room.tiene_servicio_a_habitacion ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><LockIcon /> Caja fuerte: {room.tiene_caja_fuerte ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><PetsIcon /> Admite mascotas: {room.admite_mascotas ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><AccessibleIcon /> Acceso para discapacitados: {room.tiene_acceso_para_discapacitados ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><WorkIcon /> Zona de trabajo: {room.tiene_zona_de_trabajo ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><SpeakerIcon /> Sistema de sonido: {room.tiene_sistema_sonido ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><SmartScreenIcon /> Smart TV: {room.tiene_smart_tv ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><SecurityIcon /> Sistema de seguridad: {room.tiene_sistema_de_seguridad ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><SmokeFreeIcon /> Detector de humo: {room.tiene_detector_humo ? 'Sí' : 'No'}</Typography>
            <Typography variant="h6"><SeaIcon /> Rociadores: {room.tiene_rociadores ? 'Sí' : 'No'}</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
    </>
    
  );
};

export default RoomDetail;
