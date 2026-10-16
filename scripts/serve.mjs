import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'../dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost');const p=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!p.startsWith(root+path.sep))throw Error('Invalid path');const content=await fs.readFile(p);res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream','Cache-Control':'no-store'});res.end(content)}catch{res.writeHead(404);res.end('Not found')}});
server.on('error',e=>{console.error(e.message);process.exitCode=1});server.listen(4174,'127.0.0.1',()=>{console.log('Local: http://127.0.0.1:4174\nPress Ctrl+C to stop.');if(process.argv.includes('--open')&&process.platform==='win32')spawn('powershell.exe',['-NoProfile','-Command',"Start-Process 'http://127.0.0.1:4174/'"],{windowsHide:true,stdio:'ignore'})});
