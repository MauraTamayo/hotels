"use client"
import { useRouter } from 'next/navigation'
import {
	Box,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Button,
	Divider,
	TextField
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid2';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import { detailHotelRooms } from '@/apiFunctions/hotels';
import { bookingCreate } from '@/apiFunctions/bookingServices';

import Header from '@/components/Header';
import { styled } from '@mui/material/styles';

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

const HotelsDetail = ({id}) => {
	
	const [hotelRooms, setHotelRooms] = useState([]);
	const [roomCounts, setRoomCounts] = useState({});

	useEffect(() => {
		const fetchDetailHotels = async () => {
			try {
				const response = await detailHotelRooms(id);
				console.log('response: ', response);
				setHotelRooms(response);
			} catch (error) {
				console.error("Error al obtener los hoteles:", error);
			}
		};
		fetchDetailHotels();
	}, [id]);

	const handleRoomCountChange = (roomId, value) => {
		setRoomCounts((prevCounts) => ({
			...prevCounts,
			[roomId]: value
		}));
	};

	const handleReserve = async (room) => {
		try {
		  const numberOfRooms = roomCounts[room.id] || 1;
		  const newReservation = {
			habitacion: room.id,
			dias_reservados: numberOfRooms,
			// ******************************************************user**************
			usuario: 18,
			payment: {}, 
		  };
	  
		  const response = await bookingCreate(newReservation);
		  console.log('Reserva creada:', response);
		} catch (error) {
		  console.log('Error al reservar:', error);
		}
	};

	if (!hotelRooms.length) {
		return <Typography variant="h6">Cargando..</Typography>;
	}

	return (
		<>
		<Header />
		<Box sx={{ margin: 'auto', padding: 2 }}>
			
			<Typography variant="h4" gutterBottom>
				Habitaciones disponibles
			</Typography>
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{hotelRooms.map((room) => (
					<Grid size={4} key={room.id}>
						<Card sx={{ display: 'flex', flexDirection: 'column', mb: 4,background:"#1E1E1E", color: "#fff"  }}>
							<CardMedia component="img" height="200" image={room.imagen} alt={room.nombre} />
							<CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, }}>
									<Typography variant="h5" fontWeight="bold">{room.nombre}</Typography>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<Typography variant="h6">9.8</Typography>
										<StarIcon sx={{ color: '#fbc02d', ml: 0.5 }} />
									</Box>
								</Box>
								<Typography variant="body2">Capacidad de personas: {room.capacidad}</Typography>
								<Box sx={{ mt: 2 }}>
									<Typography variant="subtitle1" fontWeight="bold">Numero de habitaciones: {room.numero_habitaciones_disponibles}</Typography>
									<Typography variant="body2" >Descripcion: {room.descripcion}</Typography>
									<Divider sx={{margin: "5px"}}></Divider>
									<Typography variant="body2" >Metro cuadrados: {room.metros_cuadrados}</Typography>
								</Box>
								<Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
									{/* {room.benefits.map((benefit, index) => (
										<Chip key={index} label={benefit} color="success" icon={<CheckCircleIcon />} />
									))} */}
								</Box>
								<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<Box>
										<Typography variant="body2"  sx={{ textDecoration: 'line-through' }}>
												$COP 3.472.360
										</Typography>
										<Typography variant="h5" fontWeight="bold" >{room.precio_por_noche}</Typography>
										<Typography variant="caption" >Tipo de habitación: {room.tipo_habitacion}</Typography>
									</Box>
								</Box>
								<Divider sx={{ my: 2 }} />
								<Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
									<TextFieldBoxStyled
										label="Número de dias"
										type="number"
										value={roomCounts[room.id] || 1}
										onChange={(e) => handleRoomCountChange(room.id, e.target.value)}
										inputProps={{ min: 1 }}
										sx={{ width: '150px' }}
									/>
									<Button color="primary" onClick={() => handleReserve(room)}>
										Reservar
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
		</>
	);
};

export default HotelsDetail;
