//this is a node.js tutorial.it is a platform that enables you to run javascript 
//in the backend.

// const world= require('./test');
// console.log(world);
// const os= require('os');
// console.log(os.platform(),os.homedir());
const fs = require('fs');
// fs.readFile('./blog1.txt',(err,data)=>
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     console.log(data.toString());
// });
// console.log('last line');
// fs.writeFile('./blog2.txt','hello,world',() =>
// {
//     console.log('file was written');
// });
// if(!fs.existsSync('./assets')){
// fs.mkdir('./assets',(err)=>
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     console.log('folder created');
// }
// )
// }
// else{
//     fs.rmdir('./assets',(err)=>
//     {
// if(err)
// {
//     console.log(err);
// }
// console.log('folder deleted');
//     });
// }
if (fs.existsSync('/deleteme.txt')) {
    fs.unlink('./deleteme.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    });
}
