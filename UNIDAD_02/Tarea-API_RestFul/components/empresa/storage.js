const Model = require('./model')

async function agregarEmpresa( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}

async function obtenerEmpresa( filtro ) {
    console.log(filtro)
    let mi_filtro = {}

    if (filtro.codigo != null) {
        mi_filtro = { codigo: filtro.codigo }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}


async function actualizarEmpresa(dato) {
    const nuevo_objeto = await Model.findOne( { codigo: dato.codigo } )

    nuevo_objeto.codigo = dato.codigo
    nuevo_objeto.nombre = dato.nombre
    
    const resultado = await nuevo_objeto.save()
    return resultado
}

async function eliminarEmpresa(dato) {
    const resultado = await Model.deleteOne( {codigo: dato.codigo} )
    return resultado
}

module.exports = {
    agregar:agregarEmpresa,
    obtener:obtenerEmpresa,
    actualizar:actualizarEmpresa,
    eliminar:eliminarEmpresa
}