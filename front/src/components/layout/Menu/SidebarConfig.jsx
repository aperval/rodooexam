import React from 'react'
import { PersonOutlined, HomeOutlined } from '@mui/icons-material'

const sidebarConfig = [
	{
		title: 'inicio',
		path: '/app',
		icon: <HomeOutlined />
	},
	{
		title: 'productos',
		path: '/app/productos',
		icon: <PersonOutlined />
	}
]

export default sidebarConfig