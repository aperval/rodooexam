import React, { useState, useEffect } from 'react'
import {  Paper, Table, IconButton, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import axios from 'axios'
import { EditOutlined, DeleteForeverOutlined } from '@material-ui/icons'

const Dashboard = () => {
    const [prodList, setProdList] = useState([])

    const getProductos = async () => {
        const { data } = await axios.get('http://localhost:4000/api/productos')
        setProdList(data)
    }

    useEffect(getProductos, [])

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Field</TableCell>
                        <TableCell>Construcción</TableCell>
                        <TableCell>Dirección</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Baños</TableCell>
                        <TableCell>Recamaras</TableCell>
                        <TableCell>Estacionamientos</TableCell>
                        <TableCell>Fecha creción</TableCell>
                        <TableCell>Fecha eliminación</TableCell>
                        <TableCell>Activo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prodList.map((producto, index) => (
                        <TableRow key={index}>
                            <TableCell>{producto.id}</TableCell>
                            <TableCell>{producto.description}</TableCell>
                            <TableCell>{producto.field}</TableCell>
                            <TableCell>{producto.construction}</TableCell>
                            <TableCell>{producto.address}</TableCell>
                            <TableCell>{producto.contactphone}</TableCell>
                            <TableCell>{producto.contactemail}</TableCell>
                            <TableCell>{producto.bathrooms}</TableCell>
                            <TableCell>{producto.bedrooms}</TableCell>
                            <TableCell>{producto.parkinglots}</TableCell>
                            <TableCell>{producto.createdate}</TableCell>
                            <TableCell>{producto.deletedate}</TableCell>
                            <TableCell>{producto.status}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => alert(`Editar ${producto.id}`)} size='small' color='primary'>
                                    <EditOutlined />
                                </IconButton>
                                <IconButton onClick={() => alert(`Eliminar ${producto.id}`)} size='small' color='secondary'>
                                    <DeleteForeverOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default Dashboard
