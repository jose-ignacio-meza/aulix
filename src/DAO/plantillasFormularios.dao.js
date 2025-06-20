import PlantillaFormulario from "./models/plantillasFormularios.model.js";

const crear = async (plantillaData) => {
    try {
        const plantilla = new PlantillaFormulario(plantillaData);
        console.log('nueva plantilla creada', JSON.stringify(plantilla,null,2))
        const resultado = await plantilla.save();
        console.log('Resultado de guardar la plantilla:', resultado);
        return resultado;
    } catch (error) {
        throw error;
    }
}

const obtenerTodos = async () => {
    try {
        return await PlantillaFormulario.find().lean();
    } catch (error) {
        throw error;
    }
}

const obtenerPlantillaPorTipo = async (tipo) => {
    try {
        return await PlantillaFormulario.findOne({ tipo: tipo }).lean();
    } catch (error) {
        throw error;
    }
}

const actualizar = async (id, datosActualizados) => {
    try {
        return await PlantillaFormulario.findByIdAndUpdate(id, datosActualizados, { new: true }).lean();
    } catch (error) {
        throw error;
    }
}

const eliminar = async (id) => {
    try {
        return await PlantillaFormulario.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

export {
    crear,
    obtenerTodos,
    obtenerPlantillaPorTipo,
    actualizar,
    eliminar
};