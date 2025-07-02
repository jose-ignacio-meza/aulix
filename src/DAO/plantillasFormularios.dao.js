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
        return await PlantillaFormulario.find({ eliminado: false }).lean();
    } catch (error) {
        throw error;
    }
}

const obtenerPlantillaPorId = async (id) => {
    try {
        return await PlantillaFormulario.findOne({ _id: id }).lean();
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
    const preguntasArray = datosActualizados.preguntas || [];

    // Convertimos el array a objeto, usando el "name" o "id" como clave
    const preguntasObj = {};
    preguntasArray.forEach(p => {
      const clave = p.name || p.id || p.label || Math.random().toString(36).slice(2);
      preguntasObj[clave] = p;
    });

    const datosFinales = {
      Preguntas: preguntasObj,
      ...(datosActualizados.tipo && { tipo: datosActualizados.tipo })
    };

    console.log('🟡 Datos listos para guardar:\n', JSON.stringify(datosFinales, null, 2));

    const result = await PlantillaFormulario.findByIdAndUpdate(id, datosFinales, { new: true }).lean();
    console.log('✅ Resultado guardado:\n', JSON.stringify(result, null, 2));
    return result;

  } catch (error) {
    console.error('❌ Error en actualización:', error);
    throw error;
  }
};

const eliminar = async (id) => {
    try {
        return await PlantillaFormulario.findByIdAndUpdate(id, { eliminado: true });
    } catch (error) {
        throw error;
    }
}

const findEliminadas = async () => {
  return await PlantillaFormulario.find({ eliminado: true }).lean();
};

const restaurar = async(id) =>{
    try {
        const result = await PlantillaFormulario.findByIdAndUpdate(id, { eliminado: false });
        return result
    } catch (error) {
        throw error;
    }
}

export {
    crear,
    obtenerTodos,
    obtenerPlantillaPorId,
    obtenerPlantillaPorTipo,
    actualizar,
    eliminar,
    findEliminadas,
    restaurar
};