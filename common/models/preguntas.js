'use strict';

module.exports = function(Preguntas) {

	Preguntas.search = function (query, cb) {
		console.log(query);
		var ds = Preguntas.dataSource;
		query = query.replace(/[\s]/g, "");
		var sql = "SELECT * FROM preguntas WHERE pregunta2 like '%" + query.toUpperCase() + "%' LIMIT 10";
		ds.connector.query(sql, null, function (err, preguntas) {

            if (err) console.error(err);

            console.log("Preguntas: " + preguntas.length);	
            
            var response = {
				success: true,
				preguntas: preguntas
			}
            cb(err, response);
        });
	};
	Preguntas.updatePregunta = function (id, pregunta2, cb) {
		var ds = Preguntas.dataSource;
		var sql = "UPDATE preguntas SET pregunta2 = '" + pregunta2 + "' WHERE id = " + id;
		console.log(sql);
		ds.connector.query(sql, null, function (err, preguntas) {

            if (err) console.error(err);

            console.log("Preguntas: " + preguntas);	
            
            var response = {
				success: true,
			}
            cb(err, response);
        });
	}

	Preguntas.remoteMethod(
		'search',
		{
			description: 'Buscar...',
			accepts: [
				//{ arg: 'id', type: 'number', required: true, description: 'User id'},
				{ arg: 'query', type: 'string', required: true, description: 'Query' }
			],
			http: { verb: 'get', path: '/search'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
	Preguntas.remoteMethod(
		'updatePregunta',
		{
			description: 'Buscar...',
			accepts: [
				//{ arg: 'id', type: 'number', required: true, description: 'User id'},
				{ arg: 'id', type: 'number', required: true, description: 'ID' },
				{ arg: 'pregunta2', type: 'string', required: true, description: 'Pregunta2' }
			],
			http: { verb: 'post', path: '/updatePregunta'},
			isStatic: true,
			returns: { arg: 'data', type: 'object'}
		}
	);
};
