import fs from 'node:fs';
const data=[];
for(const [folder,label] of [['exemple-fictif-association','Exemple fictif · Association'],['modele-a-completer','Modèle candidat · À compléter']]){
 const documents=[];
 for(const sub of ['02-prompts','07-portfolio'])for(const name of fs.readdirSync('livrables-module-02/'+folder+'/'+sub).sort())if(name.endsWith('.md'))documents.push({name,sub,text:fs.readFileSync('livrables-module-02/'+folder+'/'+sub+'/'+name,'utf8')});
 data.push({label,documents});
}
const file=fs.readFileSync('main.js','utf8');
const start=file.indexOf('const portfolioFiles = ');
const end=file.indexOf('\nconst portfolioRoot = ',start);
if(start<0||end<0)throw Error('Bloc portfolio introuvable');
fs.writeFileSync('main.js',file.slice(0,start)+'const portfolioFiles = '+JSON.stringify(data,null,2)+';\n'+file.slice(end));
console.log('Aperçus portfolio synchronisés.');
