import * as plantillaService from "../services/plantillaFormulario.service.js";

const mostrarCrearPlantilla = (req, res) => {
    res.render('admin/crearPlantillas', { title: 'Crear Plantilla' });
}

const guardarPlantilla = async (req, res) => {
    try {
        const { tipoPlantilla, preguntas } = req.body;
        const preguntasArray = JSON.parse(preguntas);

        // Convierte el array en un objeto tipo mapa
        const preguntasMap = {};
        preguntasArray.forEach(p => {
            preguntasMap[p.id] = p; // Usa el id como clave
        });

        const plantilla = {
            tipo: tipoPlantilla,
            Preguntas: preguntasMap
        };

        // Aquí podrías implementar la lógica para guardar la plantilla
        let plantillaGuardada = await plantillaService.crearPlantilla(plantilla);
        console.log('despues de guardar', plantillaGuardada)
        if (!plantillaGuardada) {
            return res.status(400).json({ message: 'Error al guardar plantilla' });
        }
        res.redirect('/admin/plantillas');
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar plantilla' });
    }
}

const obtenerPlantilla = async (req, res) => {
    try {
        const { tipo } = req.params;
        const plantilla = await plantillaService.obtenerPlantilla(tipo);
        if (!plantilla) {
            return res.status(404).json({ message: 'Plantilla no encontrada' });
        }
        res.json(plantilla);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener plantilla' });
    }
};

const obtenerTodasLasPlantillas = async (req, res) => {
    try {
        const plantillas = await plantillaService.obtenerTodasLasPlantillas();
        console.log(plantillas);
        res.render('admin/listadoPlantillas', {'plantillas':plantillas});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener plantillas' });
    }
};

const actualizarPlantilla = async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        const plantillaActualizada = await plantillaService.actualizarPlantilla(id, nuevosDatos);
        if (!plantillaActualizada) {
            return res.status(404).json({ message: 'Plantilla no encontrada' });
        }
        res.json(plantillaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar plantilla' });
    }
};

const eliminarPlantilla = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await plantillaService.eliminarPlantilla(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Plantilla no encontrada' });
        }
        res.json({ message: 'Plantilla eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar plantilla' });
    }
};

export {
    mostrarCrearPlantilla,
    guardarPlantilla,
    obtenerPlantilla,
    obtenerTodasLasPlantillas,
    actualizarPlantilla,
    eliminarPlantilla
};