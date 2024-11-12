"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Box, Typography, Card, CardContent, Divider, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import Image from 'next/image';
import Header from '@/components/Header';
import { bookingPayment } from '@/apiFunctions/paymentServices';

const Payment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationParam = searchParams.get('reservation');
  const [reservation, setReservation] = useState(reservationParam ? JSON.parse(reservationParam) : null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reservation && reservationParam) {
      setReservation(JSON.parse(reservationParam));
    }
  }, [reservationParam]);

  const handlePayment = async () => {
    const paymentDate = dayjs().format('YYYY-MM-DD'); // Formato de fecha requerido
    const transactionId = Math.floor(10000000 + Math.random() * 90000000).toString(); // ID único de 8 dígitos
    const paymentData = {
      reserva: reservation.id,
      monto: reservation.room.precio_por_noche * reservation.dias_reservados,
      id_transaccion: transactionId,
      fecha: paymentDate,
      metodo_pago: paymentMethod,
    };

    try {
      const response = await bookingPayment(paymentData);
      console.log("Respuesta del backend:", response);
      router.push('/booking');
    } catch (error) {
      setError(error)
    }
  };

  if (!reservation) {
    return <Typography variant="h6">No hay reservas disponibles</Typography>;
  }

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4, background: "#070F1B" }}>
        <Box sx={{ width: '40%', paddingRight: 4 }}>
          <Card>
            <CardContent >
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, height: '58vh' }}>
                <Image
                  src="/banner.png"
                  alt="Logo"
                  layout="responsive"
                  width={500}
                  height={500}
                 
                />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {reservation.room.nombre}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold" sx={{ marginY: 2 }}>
                ${reservation.room.precio_por_noche * reservation.dias_reservados}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Numero de dias: {reservation.dias_reservados}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Precio por noche: ${reservation.room.precio_por_noche}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Número de habitaciones: {reservation.room.numero_de_camas}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: '60%' }}>
          <Typography variant="h6" gutterBottom>
            Escoge un método de pago
          </Typography>
          <Card sx={{ marginTop: '30px' }}>
            <CardContent>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  value="Davivienda"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '11vh' }}>
                      <Image src="/davivi.jpg" alt="Tarjeta" width={40} height={40} />
                      <Typography sx={{ marginLeft: 2 }}>Desde tu cuenta Davivienda</Typography>
                    </Box>
                  }
                />
                <Divider />
                <FormControlLabel
                  value="Daviplata"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '11vh' }}>
                      <Image src="/Icono_daviplata.png" alt="Tarjeta" width={40} height={40} />
                      <Typography sx={{ marginLeft: 2 }}>Desde tu billetera Daviplata</Typography>
                    </Box>
                  }
                />
                <Divider />
                <FormControlLabel
                  value="PSE"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '11vh' }}>
                      <Image src="/PSE_.png" alt="Tarjeta" width={40} height={40} border={1} />
                      <Typography sx={{ marginLeft: 2 }}>Desde la pasarela 3</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="3banco"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '11vh' }}>
                      <Image src="/favicon.ico" alt="Tarjeta" width={40} height={40} />
                      <Typography sx={{ marginLeft: 2 }}>Desde tu cuenta de Banco 3</Typography>
                    </Box>
                  }
                />
                <Divider />
                <FormControlLabel
                  value="Bancolombia"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '11vh' }}>
                      <Image src="/favicon.ico" alt="Tarjeta" width={40} height={40} />
                      <Typography sx={{ marginLeft: 2 }}>Desde tu billetera uno</Typography>
                    </Box>
                  }
                />
                <Divider />
              </RadioGroup>
              <Button variant="contained" color="primary" onClick={handlePayment} disabled={!paymentMethod} sx={{ mt: 2, width: '100%' }}>
                Pagar
              </Button>

              {error && <Typography color="error" sx={{ marginTop: '1rem' }}>{error}</Typography>}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

const PaymentWithSuspense = () => (
  <Suspense fallback={<Typography variant="h6">Cargando...</Typography>}>
    <Payment />
  </Suspense>
);

export default PaymentWithSuspense;
