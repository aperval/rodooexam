import React from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import Page from '../../common/Page'

// ----------------------------------------------------------------------


const Dashboard = () => {

	return (
		<Page title="Exam | Dashboard">
			<Container maxWidth="xl">
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h5'>Bienvenido:</Typography>
					<Typography sx={{ mt: 3, fontWeight: 'bold' }} variant='h2'>Exam App</Typography>
				</Box>
				<Grid container spacing={2}>
				</Grid>
			</Container>
		</Page>
	)
}

export default Dashboard