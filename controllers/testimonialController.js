import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    // Validar formulario
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre esta vacio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo esta vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje esta vacio'});
    }

    if(errores.length > 0){

        const testimoniales = await Testimonial.findAll();

        // Al menos un error
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else { // Se pasó toda la validación

        try {
            await Testimonial.create({
                nombre, correo, mensaje
            });

            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error);
        }
    }

    console.log(errores);
}

export {
    guardarTestimonial
}