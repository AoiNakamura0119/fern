import express from 'express'
import { userHandler } from './gateway/rest/user/handler'
import { feedbackHandler } from './gateway/rest/feedback/handler';
import { auth } from './lib/jwt';

const app = express()
app.use(express.json());
const port = 5555


app.get('/users', userHandler.gets);
app.post('/users', userHandler.post);
app.put('/users/:id', userHandler.update);
app.delete('/users/:id', userHandler.delete);

app.get('/feedbacks', auth, feedbackHandler.gets);
app.post('/feedbacks', auth, feedbackHandler.post);
app.put('/feedbacks/:id', feedbackHandler.update);
app.delete('/feedbacks/:id', feedbackHandler.delete);

app.listen(port, () => {
    console.log(`🚀 サーバ起動中: http://localhost:${port}`)
})
