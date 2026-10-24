import { createServer } from 'node:http';
import entry from './dist/server/server.js';
const server=createServer(async(req,res)=>{
  try {
    const request=new Request(`http://${req.headers.host||'localhost'}${req.url||'/'}`,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method||'GET')?undefined:req,duplex:'half'});
    const response=await entry.fetch(request);
    res.writeHead(response.status,Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch(error) { console.error(error);res.writeHead(500);res.end('Internal Server Error'); }
});
server.listen(Number(process.env.PORT||3000),'0.0.0.0');
