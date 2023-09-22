const { Pool } = require('pg');



async function obtenerCompraDet(req, res) {

  const { compraId } = req.body;


  const {dbConfig } = req;
  
  //console.log(dbConfig)

  const pool = new Pool(dbConfig)

    try {
        const result = await pool.query(

          `SELECT e.codigo_compra, d.id_producto, p.descripcion, e.id_empleado, em.nombres, d.cantidad, d.precio, d.cantidad * d.precio AS subtotal
          FROM compra_empleado_enc e
          INNER JOIN compra_empleado_det d ON e.codigo_compra = d.codigo_compra
          INNER JOIN productos p ON p.id_producto = d.id_producto
          INNER JOIN empleados em ON em.id = e.id_empleado
          WHERE e.codigo_compra = $1
          `, 
          [compraId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de la compra' });
    }
}

// Endpoint para agregar todos los usuarios
async function agregarCompraDet(req, res) {

    const { compraId, productoId, cantidad, precioUnitario} = req.body;

    //console.log(compraId, productoId, cantidad, precioUnitario);
    

    const {dbConfig } = req;

    const pool = new Pool(dbConfig)
    
    try {
      const result = await pool.query('CALL insertar_compra_detalle2($1, $2, $3, $4)', [compraId, productoId, parseInt(cantidad) , precioUnitario]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el detalle de la compra' });
    }
}



module.exports = {
  obtenerCompraDet,
  agregarCompraDet,
};
