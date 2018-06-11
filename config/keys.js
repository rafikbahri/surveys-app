//Return Prod Keys if we are in production mode, otherwise return Deb Keys

if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod');
}else{
    module.exports=require('./dev');
}