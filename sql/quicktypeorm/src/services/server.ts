import app from './app';
import 'reflect-metadata';
import '../database';


app.listen(3333, () => {
  try {
    if (!app.listen){
      throw new Error("");
    } else {
      console.log('🏃 Running Server');
    }
  } catch (error) {
    
    return error.mensage({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
  }
  
});