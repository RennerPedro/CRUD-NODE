const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Lista de clientes (apenas um exemplo, você pode substituí-la por uma base de dados)
const customers = [];


// Rota para obter todos os clientes
app.get('/customers', (req, res) => {
    res.json(customers);
});


// Rota para obter um cliente por ID
app.get('/customers/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const customer = customers.find(customer => customer.id === idUsuario);


    if (!customer) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }


    res.json(customer);
});


// Rota para adicionar um novo cliente
app.post('/customers', (req, res) => {
    const { id, name } = req.body;


    if (!id || !name) {
        return res.status(400).json({ message: 'ID e nome são obrigatórios' });
    }


    const clienteExistente = customers.find(customer => customer.id === id);


    if (clienteExistente) {
        return res.status(409).json({ message: 'Cliente já existe' });
    }


    const novoCliente = { id, name };
    customers.push(novoCliente);


    res.status(201).json(novoCliente);
});


// Rota para atualizar os dados de um cliente por ID
app.put('/customers/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const customer = customers.find(customer => customer.id === idUsuario);


    if (!customer) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }


    const { name } = req.body;
    if (name) {
        customer.name = name;
    }


    res.json(customer);
});


// Rota para excluir um cliente por ID
app.delete('/customers/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const index = customers.findIndex(customer => customer.id === idUsuario);


    if (index === -1) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }


    customers.splice(index, 1);


    res.json({ message: 'Cliente excluído com sucesso' });
});


// Inicie o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});



