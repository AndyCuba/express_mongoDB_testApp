const { Router, request, response } = require('express');
const Todo = require('../modules/Todo');
const router = Router();

router.get('/', async (request, response) => {
    const todos = await Todo.find({}).lean();

    response.render('index', {
        title: 'List',
        isIndex: true,
        todos
    });
});

router.get('/create', (request, response) => {
    response.render('create', {
        title: 'Create',
        isCreate: true
    });
});

router.post('/create', async (request, response) => {
    const todo = new Todo({
        title: request.body.title,

    });
    await todo.save();
    response.redirect('/');
});

router.post('/complete', async (request, response) => {
    const todo = await Todo.findById(request.body.id);

    todo.completed = !!request.body.completed;
    await todo.save();

    response.redirect('/');
});

router.post('/delete', async (request, response) => {
    await Todo.findByIdAndDelete(request.body.id).catch(console.log());
    response.redirect('/');   
});


module.exports = router;
