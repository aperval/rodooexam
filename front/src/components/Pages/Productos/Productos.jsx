import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'

const Productos = () => {
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png',
		nombre: "",
		planeta: ""
	}
	const [productosList, setProductosList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/productos')
		setProductosList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 120 },
		{ field: 'description', headerName: 'Descripción', width: 220 },
		{ field: 'field', headerName: 'Field', width: 220 },
		{ field: 'construction', headerName: 'Construcción', width: 220 },
		{ field: 'address', headerName: 'Dirección', width: 220 },
		{ field: 'contactphone', headerName: 'Teléfono', width: 220 },
		{ field: 'contactemail', headerName: 'Email', width: 220 },
		{ field: 'bathrooms', headerName: 'Baños', width: 120 },
		{ field: 'bedrooms', headerName: 'Recamaras', width: 120 },
		{ field: 'parkinglots', headerName: 'Estacionamientos', width: 220 },
		{ field: 'createdate', headerName: 'Fecha creción', width: 220 },
		{ field: 'deletedate', headerName: 'Fecha eliminación', width: 220 },
		{
			field: '',
			headerName: 'Acciones',
			width: 200,
			renderCell: (params) => (
				<Stack divider direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
					<IconButton size='small' onClick={() => {
						setIsEdit(true)
						setBody(params.row)
						handleDialog()
					}}>
						<EditOutlined />
					</IconButton>
					<IconButton size='small' onClick={() => onDelete(params.id)}>
						<DeleteOutline />
					</IconButton>
				</Stack>
			)
		}
	]

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/eliminar', { id: id })
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	const onChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/guardar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
			setIsEdit(false)
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/editar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	useEffect(init, [])

	return (
		<>
			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
				<DialogTitle>
					{isEdit ? 'Editar Producto' : 'Nuevo Producto'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={6} sm={6}>
							<TextField
								margin='normal'
								name='description'
								value={body.description}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Descripción'
							/>
							<TextField
								margin='normal'
								name='field'
								value={body.field}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Field'
							/>
						</Grid>
						<Grid item xs={6} sm={6}>
							<TextField
								margin='normal'
								name='construction'
								value={body.construction}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Construcción'
							/>
							<TextField
								margin='normal'
								name='address'
								value={body.address}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Dirección'
							/>
						</Grid>
						<Grid item xs={6} sm={6}>
							<TextField
								margin='normal'
								name='contactphone'
								value={body.contactphone}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Teléfono'
							/>
							<TextField
								margin='normal'
								name='contactemail'
								value={body.contactemail}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Email'
							/>
						</Grid>
						<Grid item xs={6} sm={6}>
							<TextField
								margin='normal'
								name='bathrooms'
								value={body.bathrooms}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Baños'
							/>
							<TextField
								margin='normal'
								name='bedrooms'
								value={body.bedrooms}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Recamaras'
							/>
						</Grid>
						<Grid item xs={6} sm={6}>
							<TextField
								margin='normal'
								name='parkinglots'
								value={body.parkinglots}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Estacionamientos'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Exam | Productos">
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='lg'>
					<Box sx={{ pb: 5 }}>
						<Typography variant="h5">Lista de Productos</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='primary'>Nuevo</Button>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={productosList} columns={columns} />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Productos

