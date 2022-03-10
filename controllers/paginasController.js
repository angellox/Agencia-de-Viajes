// Importando models
import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";
import { fechaFormat, dineroFormat } from "../helpers/helpers.js";

// Definición de los controladores
const paginaInicio = async (req, res) => {
    // req: lo que enviamos
    // res: lo que express responde

    // Consultar 3 viajes del modelo Viaje

    const promiseQuery = [];

    promiseQuery.push( Viaje.findAll({ limit: 3 }) );
    promiseQuery.push( Testimonial.findAll({ limit: 3 }) );

    try {
        const resultado = await Promise.all(promiseQuery);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

   
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    const viajes = await Viaje.findAll();

    viajes.forEach( viaje => {
        viaje.fechaFormatIda = fechaFormat(viaje.fecha_ida);
        viaje.fechaFormatVuelta = fechaFormat(viaje.fecha_vuelta);
    });

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}
 
// Muestra un viaje por su slug

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    
    try {
        const viaje = await Viaje.findOne({ where: { slug }});
        
        viaje.fechaFormatIda = fechaFormat(viaje.fecha_ida);
        viaje.fechaFormatVuelta = fechaFormat(viaje.fecha_vuelta);
        viaje.precioFormat = dineroFormat(parseInt(viaje.precio));

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje 
         }); 

    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}