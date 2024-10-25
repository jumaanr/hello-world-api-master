import express from 'express';

interface AppResponse {
  code: number,
  message: string
}
let ready = false;

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  console.log(`${new Date().toISOString()}: do not hit me too often please`);
  res.json({
    code: 0,
    message: 'do not hit me too often',
  } as AppResponse);
});

app.get('/health', (req, res) => {
  const h = Math.random();

  console.log(`${new Date().toISOString()}: health - h = ${h}`);
  if (h < 0.1) {
    res.status(500).json({
      code: -1,
      message: 'unhealthy',
    } as AppResponse);
    return;
  }

  res.json({
    code: 0,
    message: 'healthy',
  } as AppResponse);
});

app.get('/readiness', (req, res) => {
  console.log(`${new Date().toISOString()}: readiness ${ready}`);
  if (!ready) {
    res.status(500).json({
      code: -1,
      message: 'not ready yet',
    } as AppResponse);
    return;
  }
  res.json({
    code: 0,
    message: 'ready',
  } as AppResponse);
});

app.listen(port);

setTimeout(() => {
  ready = true;
}, 30000);

console.log(`${new Date().toISOString()}: service started`);