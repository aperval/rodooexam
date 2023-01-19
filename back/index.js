const express = require('express')
const cors = require('cors')
const { Client } = require('pg')
const bodyParser = require('body-parser')
const { response } = require('express')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const credentials = {
	user: 'postgres',
	host: 'examroddo.c8uyutmcgwqz.us-east-2.rds.amazonaws.com',
	database: 'examroddo',
	password: 'Mexico.2',
	port: 5236,
}

app.get('/', (req, res) => {
	res.send('prueba api - server arriba')
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const databaseclient = new Client(credentials)
	databaseclient.connect()
	databaseclient.query("SELECT id, username FROM roddo.users WHERE status = 1 and username = '" + username + "' AND password = '" + password + "'")
		.then(response => {
			if (response.rowCount > 0) {
				console.log('Usuario existe')
				res.status(200).send({
					"id": response.rows[0].id,
					"user": response.rows[0].username,
					"username": response.rows[0].username
				})
			} else {
				console.log('Usuario no existe')
				res.status(400).send('Usuario no existe')
			}
			databaseclient.end()
		}).catch(err => {
			console.log(err)
			res.status(500).send(err)
			databaseclient.end()
		})
})


app.get('/api/productos', (req, res) => {
	const databaseclient = new Client(credentials)
	databaseclient.connect()
	databaseclient.query("SELECT * FROM roddo.real_state_list")
		.then(response => {
			console.log('Consulta de productos')
			res.status(200).send(response.rows)
			databaseclient.end()
		}).catch(err => {
			console.log(err)
			res.status(500).send(err)
			databaseclient.end()
		})
})


app.post('/api/eliminar', (req, res) => {
	const { id } = req.body
	const databaseclient = new Client(credentials)
	databaseclient.connect()
	databaseclient.query("delete from roddo.real_state_list  WHERE id = " + id + " ")
		.then(response => {
			console.log('Producto Eliminado')
			res.status(200).send({ "status": "success", "message": "Producto Eliminado" })
			databaseclient.end()
		}).catch(err => {
			console.log(err)
			res.status(500).send(err)
			databaseclient.end()
		})
})

app.post('/api/guardar', (req, res) => {
	const { description, field, construction, address, contactphone, contactemail, bathrooms, bedrooms, parkinglots } = req.body
	const databaseclient = new Client(credentials)
	databaseclient.connect()
	databaseclient.query("INSERT INTO roddo.real_state_list(description, field,construction,address,contactphone, contactemail, bathrooms, bedrooms, parkinglots, createdate,deletedate,status) "
		+ "VALUES ('" + description + "', " + field + "," + construction + ",'" + address + "', '" + contactphone + "', '" + contactemail + "'," + bathrooms + "," + bedrooms + "," + parkinglots + ",CURRENT_TIMESTAMP,null,1)")
		.then(response => {
			console.log('Producto Insertado')
			res.status(200).send({ "status": "success", "message": "Producto Insertado" })
			databaseclient.end()
		}).catch(err => {
			console.log(err)
			res.status(500).send(err)
			databaseclient.end()
		})
})

app.post('/api/editar', (req, res) => {
	const { id, description, field, construction, address, contactphone, contactemail, bathrooms, bedrooms, parkinglots, status } = req.body
	const databaseclient = new Client(credentials)
	if (status = 0) {
		databaseclient.connect()
		databaseclient.query("UPDATE roddo.real_state_list "
			+ " SET description='" + description + "', field=" + field + ", construction=" + construction + ", address='" + address + "', contactphone='" + contactphone + "', contactemail='" + contactemail
			+ "', bathrooms=" + bathrooms + ", bedrooms=" + bedrooms + ", parkinglots=" + parkinglots + ", deletedate=CURRENT_TIMESTAMP, status=0 "
			+ " WHERE id = " + id + " ")
			.then(response => {
				console.log('Producto Actualizado')
				res.status(200).send({ "status": "success", "message": "Producto Actualizado" })
				databaseclient.end()
			}).catch(err => {
				console.log(err)
				res.status(500).send(err)
				databaseclient.end()
			})
	} else {
		databaseclient.connect()
		databaseclient.query("UPDATE roddo.real_state_list "
			+ " SET description='" + description + "', field=" + field + ", construction=" + construction + ", address='" + address + "', contactphone='" + contactphone + "', contactemail='" + contactemail
			+ "', bathrooms=" + bathrooms + ", bedrooms=" + bedrooms + ", parkinglots=" + parkinglots + " "
			+ " WHERE id = " + id + " ")
			.then(response => {
				console.log('Producto Actualizado')
				res.status(200).send({ "status": "success", "message": "Producto Actualizado" })
				databaseclient.end()
			}).catch(err => {
				console.log(err)
				res.status(500).send(err)
				databaseclient.end()
			})
	}
})

app.listen(4000, async () => {
	console.log('servidor api arriba')
	})