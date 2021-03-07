import FS from 'fs';

export default function leerArchivo(){
    
    //Lectura del archivo productos
    return FS.promises.readFile('./productos.txt', 'utf-8')
    
}