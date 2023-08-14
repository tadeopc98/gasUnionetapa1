//Invocamos a la conexion de la DB

const createConnection = require('../database');
const connection = createConnection();
const toastr = require('toastr');



const fechaActual = new Date(); //Fecha actual
const horaActual = fechaActual.getHours();
const minActual = fechaActual.getMinutes();
const segActual = fechaActual.getSeconds()
const horaCompleta = horaActual + ':' + minActual + ':' + segActual;
const diaActual = fechaActual.getDate();
const mesActual = fechaActual.getMonth()+1;
const anioActual = fechaActual.getFullYear();
const fechaCompleta = anioActual + '-' + mesActual + '-' + diaActual;

//GUARDAR un REGISTRO
exports.saveUser = (req, res)=>{
    const nombre = req.body.nombre.toUpperCase();
    const num = req.body.num;
    const user = req.body.username;
    const pass = req.body.pass;
    const rol = req.body.rol.toUpperCase();
    const st = req.body.st.toUpperCase();
    
    connection.query('SELECT COUNT(*) AS count FROM usuarios WHERE noEmpleado = ?',[num], (error, countResult)=>{
        if(error){
            console.log(error);
        }else{
            const existingCount = countResult[0].count;
            if (existingCount === 0)
            {
                connection.query('INSERT INTO usuarios SET ?',{nombre:nombre,noEmpleado:num,username:user,password:pass,rol:rol,status:st}, (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{
                        
                        res.redirect('/dashboard/UsersControlAdmin');
                               
                    }
            });   
            }
            else{
                
                res.redirect('/dashboard/UsersControlAdmin');
            
            }
               
        }
});
};

exports.saveClientSuministro = (req, res)=>{
    const noCliente = req.body.id;
    const razonSocial = req.body.rs;
    const nombre = req.body.nombre;
    const calle = req.body.calle;
    const noExt = req.body.noExt;
    const noInt = req.body.noInt;
    const cp = req.body.cp;
    const colonia = req.body.colonia;
    const municipio = req.body.municipio;
    const estado = req.body.estado;
    const direccion = calle+' #'+noExt+', '+noInt+', '+colonia+', '+municipio+', C.P. '+cp+', '+estado;
    const frecCarga = req.body.frecCarga;
    const diaCarga = req.body.dayCarga;
    const pagoPref = req.body.tipPago;
    const obser = req.body.obser;
    const status = req.body.st;
    const telefono = req.body.tel;
    const telefonoCasa = req.body.telcasa;
    const telefonoOficina = req.body.telof;
    const correo = req.body.mail;
    const correo2 = req.body.mail2;
    const fechaRegistro = fechaCompleta;
    const usuarioRegistra = req.body.userRe;
    const tipCliente = req.body.tipCliente;

    connection.query('INSERT INTO clientes SET ?',{noCliente:noCliente,nombreCliente:nombre,razonSocial:razonSocial,calle:calle,noExterior:noExt,noInterior:noInt,cp:cp,colonia:colonia,municipio:municipio,estado:estado,direccion:direccion,frecuenciaCarga:frecCarga,diaCarga:diaCarga,pagoPreferente:pagoPref,observaciones:obser,statusCliente:status,telefonoCliente:telefono,telefonoCasa:telefonoCasa,telefonoOf:telefonoOficina,correoCliente:correo,correo2:correo2,fechaRegistro:fechaRegistro,usuarioRegistro:usuarioRegistra,tipoCliente:tipCliente}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            connection.query('INSERT INTO folios SET ?',{consec:noCliente}, (error, results)=>{
                if(error){
                    console.log(error);
                }else{
                    //console.log(results);   
                    res.redirect('/carteraClientes');         
                }
        });         
        }
});
};

exports.saveClientAdministration = (req, res)=>{
    const noCliente = req.body.id;
    const razonSocial = req.body.rs;
    const nombre = req.body.nombre;
    const calle = req.body.calle;
    const noExt = req.body.noExt;
    const noInt = req.body.noInt;
    const cp = req.body.cp;
    const colonia = req.body.colonia;
    const municipio = req.body.municipio;
    const estado = req.body.estado;
    const direccion = calle+' #'+noExt+', '+noInt+', '+colonia+', '+municipio+', C.P. '+cp+', '+estado;
    const frecCarga = req.body.frecCarga;
    const diaCarga = req.body.dayCarga;
    const pagoPref = req.body.tipPago;
    const bloque = req.body.bloque;
    const obser = req.body.obser;
    const status = req.body.st;
    const telefono = req.body.tel;
    const telefonoCasa = req.body.telcasa;
    const telefonoOficina = req.body.telof;
    const correo = req.body.mail;
    const correo2 = req.body.mail2;
    const fechaRegistro = fechaCompleta;
    const usuarioRegistra = req.body.userRe;
    const tipCliente = req.body.tipCliente;
    const admin = req.body.admin;

    connection.query('INSERT INTO clientes SET ?',{noCliente:noCliente,nombreCliente:nombre,razonSocial:razonSocial,calle:calle,noExterior:noExt,noInterior:noInt,cp:cp,colonia:colonia,municipio:municipio,estado:estado,direccion:direccion,frecuenciaCarga:frecCarga,diaCarga:diaCarga,pagoPreferente:pagoPref,bloqueSeccion:bloque,observaciones:obser,statusCliente:status,telefonoCliente:telefono,telefonoCasa:telefonoCasa,telefonoOf:telefonoOficina,correoCliente:correo,correo2:correo2,fechaRegistro:fechaRegistro,usuarioRegistro:usuarioRegistra,tipoCliente:tipCliente,admin:admin}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            connection.query('INSERT INTO folios SET ?',{consec:noCliente}, (error, results)=>{
                if(error){
                    console.log(error);
                }else{
                    //console.log(results);   
                    res.redirect('/carteraClientes');         
                }
        });         
        }
});
};


//ACTUALIZAR un REGISTRO
exports.updateUser = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre.toUpperCase();
    const num = req.body.num;
    const user = req.body.user;
    const pass = req.body.pass;
    const rol = req.body.rol;
    const st = req.body.st.toUpperCase();

    connection.query('UPDATE usuarios SET ? WHERE noEmpleado = ?',[{nombre:nombre,username:user,status:req.body.st}, num], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/dashboard/UsersControlAdmin');         
        }
});
};

exports.updateClient = (req, res)=>{
    const noCliente = req.body.id;
    const nombre = req.body.nombre;
    const calle = req.body.calle;
    const noExt = req.body.noExt;
    const noInt = req.body.noInt;
    const cp = req.body.cp;
    const colonia = req.body.colonia;
    const municipio = req.body.municipio;
    const estado = req.body.estado;
    const frecCarga = req.body.frecCarga;
    const diaCarga = req.body.dayCarga;
    const pagoPref = req.body.tipPago;
    const bloque = req.body.bloque;
    const obser = req.body.obser;
    const status = req.body.st;
    const telefono = req.body.tel;
    const correo = req.body.mail;
    const fechaRegistro = fechaCompleta;
    const usuarioRegistra = req.body.userRe;
    const tipCliente = req.body.tipCliente;

    connection.query('UPDATE clientes SET ? WHERE noCliente = ?',[{nombreCliente:nombre,calle:calle,noExterior:noExt,noInterior:noInt,cp:cp,colonia:colonia,municipio:municipio,estado:estado,frecuenciaCarga:frecCarga,diaCarga:diaCarga,pagoPreferente:pagoPref,bloqueSeccion:bloque,observaciones:obser,statusCliente:status,telefonoCliente:telefono,correoCliente:correo},noCliente], (error, results)=>{
        if(error){
            console.log(error);
        }else{
           
                    //console.log(results);   
                    res.redirect('/carteraClientes');                
        }
});
};

exports.saveAdmin = (req, res)=>{
    const nombre = req.body.nombre.toUpperCase();
    const residente = req.body.res.toUpperCase();
    const telefono1 = req.body.tel1;
    const telefono2 = req.body.tel2;
    const correo1 = req.body.mail1.toUpperCase();
    const correo2 = req.body.mail2.toUpperCase();


    connection.query('INSERT INTO administradores SET ?',{nombre:nombre,residente:residente,telefono1:telefono1,telefono2:telefono2,correo1:correo1,correo2:correo2}, (error, results)=>{
        if(error){
            console.log(error);
            res.redirect('/gruposAdministradores');
            }else{
                res.redirect('/gruposAdministradores');
                }
           
});
};


