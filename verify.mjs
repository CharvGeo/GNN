import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const failures=[];
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:|#)/.test(url))continue;
  const clean=decodeURIComponent(url.split(/[?#]/)[0]);
  let target=clean.startsWith('/')?path.join(root,clean):path.resolve(root,path.dirname(file),clean);
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  if(!fs.existsSync(target))failures.push(`${file}: ${url}`);
 }
}
const archive=JSON.parse(fs.readFileSync('dist/archive.json','utf8'));
if(archive.posts.length!==10)failures.push('Archive must retain ten recovered posts');
const articles=JSON.parse(fs.readFileSync('dist/articles.json','utf8'));
if(failures.length)throw Error(failures.join('\n'));
console.log(JSON.stringify({htmlPages:files.length,brokenLocalLinks:0,archivePosts:archive.posts.length,articles:Array.isArray(articles)?articles.length:Object.keys(articles)}));
