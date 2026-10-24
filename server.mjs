import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import entry from './dist/server/server.js';
const server=createServer(async(req,res)=>{
  try {
    const pathname=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`).pathname;
    if(pathname.startsWith('/assets/')) {
      const file=path.resolve('dist/client',`.${pathname}`);
      if(!file.startsWith(path.resolve('dist/client/assets')+path.sep)) { res.writeHead(403);res.end();return; }
      try {
        const body=await readFile(file);
        const type=file.endsWith('.css')?'text/css; charset=utf-8':file.endsWith('.js')?'text/javascript; charset=utf-8':'application/octet-stream';
        res.writeHead(200,{'Content-Type':type,'Cache-Control':'public, max-age=31536000, immutable'});res.end(body);return;
      } catch { res.writeHead(404);res.end('Not Found');return; }
    }
    const request=new Request(`http://${req.headers.host||'localhost'}${req.url||'/'}`,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method||'GET')?undefined:req,duplex:'half'});
    const response=await entry.fetch(request);
    res.writeHead(response.status,Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch(error) { console.error(error);res.writeHead(500);res.end('Internal Server Error'); }
});
server.listen(Number(process.env.PORT||3000),'0.0.0.0');
