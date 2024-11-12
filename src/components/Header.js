// components/Header.js
import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton
} from '@mui/material';
import OutputIcon from '@mui/icons-material/Output';
import {useRouter} from 'next/navigation';

const Header = () => {
    const [activePage, setActivePage] = useState(null);
	const router = useRouter();

	const handleHotelClick = (page) => {
		setActivePage(page);
		router.push(`/${page}`);
	};

	const getActiveStyle = (page) => ({
		cursor: 'pointer',
		color: activePage === page ? '#fff' : '#B0B0B0'
	});

	return (
		<AppBar position="static" color="inherit"
			sx={
				{
					boxShadow: 'none',
					borderBottom: '1px solid #ddd',
					background: "#070F1B"
				}
		}>
			<Toolbar sx={
				{
					display: 'flex',
					justifyContent: 'space-between',
					margin: '0.5rem 0'
				}
			}>
				{/* Logo */}
				<Box sx={
					{
						display: 'flex',
						alignItems: 'center'
					}
				}>
					<Typography variant="h6" noWrap sx={{color:"#FFFFFF"}}>
						HotelAqui
					</Typography>
				</Box>

				{/* Menú */}
				<Box sx={
					{
						display: 'flex',
						gap: 2
					}
				}>
					<Typography onClick={
							() => handleHotelClick("hotels")
						}
						variant="body1"
						color="textSecondary"
						sx={getActiveStyle("hotels")}>
						Hoteles
					</Typography>
					<Typography onClick={
							() => handleHotelClick("booking")
						}
						variant="body1"
						color="textSecondary"
						sx={getActiveStyle("booking")}>
						Reservas
					</Typography>
				</Box>

				{/* Íconos del Perfil y el Menú */}
				<Box sx={
					{
						display: 'flex',
						alignItems: 'center',
						gap: 1
					}
				}>
					<IconButton onClick={() => handleHotelClick("login")}>
						<OutputIcon sx={{color:"#FFF"}} />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
