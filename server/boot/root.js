
module.exports = function(server) {
	// Install a `/` route that returns server status
	var router = server.loopback.Router();

	router.get('/', server.loopback.status());


	// generar archivo Tex para comilar en latex
 	router.get('/file', function(req, res) {

 		var idSilabo = req.query.idSilabo;
 		var idDocente = req.query.idDocente;
 		var idCurso = req.query.idCurso;
 		var idDocenteCurso = req.query.idDocenteCurso;

 		var Silabo = server._remotes._classes.Silabo;
 		var Docente = server._remotes._classes.Docente;
 		var Curso = server._remotes._classes.Curso;
 		var DocenteCurso = server._remotes._classes.DocenteCurso;

 		var docente = {};
 		var curso = {};
 		var silabo = {};
 		var contenido = {};
 		var docenteCurso = {};

		function escribirArchivo(file, texto)
		{
		    var path = 'client/app/tmp/'+file,
		    buffer = new Buffer(texto);
		    var fs = require('fs');
		    fs.open(path, 'w', function(err, fd)
		    {
		        if (err) throw 'error opening file: ' + err;
		        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
		            if (err) throw 'error writing file: ' + err;
		            fs.close(fd, function() {
		                console.log('file written');
		            })
		        });
		    });
		};

		Docente.ctor.findOne({where: {idDocente:idDocente}},function (err, data) {
 			if (err) {
 				console.log(err);
 			} else {
 				docente = data;
 				//console.log(docente);
 			}
 		});
 		Curso.ctor.findOne({where: {idCurso:idCurso}},function (err, data) {
 			if (err) {
 				console.log(err);
 			} else {
 				curso = data;
 				//console.log(curso);
 			}
 		});
 		Silabo.ctor.findOne({where: {idSilabo:idSilabo}},function (err, data) {
 			if (err) {
 				console.log(err);
 			} else {
 				silabo = data;
 				//console.log(silabo);
 				contenido = JSON.parse(data.contenido);
 				console.log(contenido.general.aniolectivo);
 			}
 		});
 		DocenteCurso.ctor.findOne({where: {idDocenteCurso:idDocenteCurso}},function (err, data) {
 			if (err) {
 				console.log(err);
 			} else {
 				docenteCurso = data;
 				//console.log(docenteCurso);
 			}
 		});

		console.log(contenido);
		var codigo_silabo = curso.codigo;
		var anio_lectivo = contenido.general.aniolectivo;
		var nombre_asignatura = curso.nombre;
		var semestre = docenteCurso.semestre;
		var creditos = curso.creditos;
		var docente = docente.nombres + " " + docente.apellidos;
		var grado_academico = docente.grado;
		var horas_semanales = "27";
		var hteoria = curso.horasTeria;
		var hteoriapractica = curso.horasTeoriaPractica;
		var hpractica = curso.horasPractica;
		var hseminario = "...";
		var competencias_genericas = contenido.competencias.genericas; // objeto array
		var competencias_especificas = contenido.competencias.especificas; // objeto array
		var sumilla = contenido.competencias.sumilla;
		var contenidos_analiticos = contenido.contenidos;
		var estrategias_pedagogicas = "Dar una guía de como escribir articulos cientificos. Clasificar eventos academicos con herramientas conocidas. Prepar acciones despues de que es enviado el articulo. Presentar la realidad del conocimiento cientifico escrito.";
		var fecha_inicio_asignatura = "23/06/2015";
		var fecha_final_asignatura = "12/09/2015";
		var cronograma = [
						    {"teoria":"12/04/2015", "practica":"14/05/2015"}, 
						    {"teoria":"15/04/2015", "practica":"04/05/2015"}, 
						    {"teoria":"16/04/2015", "practica":"01/07/2015"}, 
						    {"teoria":"17/04/2015", "practica":"04/09/2015"}, 
						];

		var bibliografia = ["item Dar una guía de como escribir articulos cientificos.","item Dar una guía de como escribir articulos cientificos."];
		var evaluacion = ["item Dar una guía de como escribir articulos cientificos.","item Dar una guía de como escribir articulos cientificos."];
		var evaluacion_promedio = "El promedio será en base a los siguientes ítems";
		
		var sl = '\n';
		var string = '\\documentclass[11pt]{article}'+sl+
					'\\usepackage[margin=1in]{geometry}'+sl+
					'\\usepackage[pdftex]{graphicx}'+sl+
					'\\usepackage{multirow}'+sl+
					'\\usepackage{setspace}'+sl+
					'\\usepackage{array}'+sl+
					'\\usepackage[utf8]{inputenc}'+sl+
					'\\pagestyle{plain}'+sl+
					'\\setlength\\parindent{0pt}'+sl+
					'\\begin{document}'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{center}\\textbf{{\\large UNIVERSIDAD NACIONAL DE SAN AGUSTIN DE AREQUIPA FACULTAD DE INGENIERIA DE PRODUCCIÓN Y SERVICIOS UNIDAD DE POST GRADO MAESTRÍA EN INGENIERÍA INFORMÁTICA}}\\end{center}'+sl+
					'\\end{minipage}'+sl+
					'\\newline'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{center}\\textbf{\\large SÍLABO: '+codigo_silabo+'}\\end{center}'+sl+
					'\\end{minipage}'+sl+
					'\\newline'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 1. INFORMACIÓN ACADÉMICA DE LA ASIGNATURA}'+sl+
					'\\newline\\end{minipage}'+sl+sl+
					'\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{itemize}'+sl+
					'\\item[] Año Lectivo: '+anio_lectivo+sl+
					'\\item[] Nombre de la Asignatura: '+nombre_asignatura+sl+
					'\\item[] Semestre Académico: '+semestre+sl+
					'\\item[] Créditos: '+creditos+sl+
					'\\item[] Nombre del docente: '+docente+sl+
					'\\item[] Grado académico: '+grado_academico+sl+
					'\\item[] Horas semanales: '+horas_semanales+'\\newline'+sl+
					'\\end{itemize}'+sl+
					'\\end{minipage}}\\hfill'+sl+
					'\\begin{tabular}{|>{\\raggedright}p{0.23\\textwidth}|>{\\raggedright}p{0.23\\textwidth}|>{\\raggedright}p{0.23\\textwidth}|>{\\raggedright}p{0.23\\textwidth}|}'+sl+
					'\\hline'+sl+
					'Teóricas: \\\\~~~~~~~~~~~~~~~~~~~~~~~~~~~'+hteoria+' & Teóricas-practicas: \\\\~~~~~~~~~~~~~~~~~~~~~~~~~~~'+hteoriapractica+' & Prácticas: \\\\~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'+hpractica+' & Seminario:\\\\~~~~~~~~~~~~~~~~~~~~~~~~~~~'+hseminario+' \\tabularnewline'+sl+
					'\\hline'+sl+ 
					'\\end{tabular}\\newline\\newline'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 2. COMPETENCIAS GENERICAS}\\newline\\end{minipage}'+sl+
					'\\newline'+sl+
					'\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{itemize}'+sl;

				for (x in competencias_genericas) {
					string = string + '\\item '+competencias_genericas[x]+sl;
				}
					// '\\item Dar una guía de como escribir articulos cientificos.'+sl+
					// '\\item Clasificar eventos academicos con herramientas conocidas.'+sl+
					// '\\item Prepar acciones despues de que es enviado el articulo.'+sl+
					// '\\item Presentar la realidad del conocimiento cientifico escrito.'+sl+

				string = string+
					'\\end{itemize}'+sl+
					'\\end{minipage}}\\hfill\\newline'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 3. COMPETENCIAS ESPECIFICAS}\\newline\\end{minipage}'+sl+
					'\\newline'+sl+
					'\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{itemize}'+sl;
				for (x in competencias_especificas) {
					string = string + '\\item '+competencias_especificas[x]+sl;
				}
					// '\\item Dar una guía de como escribir articulos cientificos.'+sl+
					// '\\item Clasificar eventos academicos con herramientas conocidas.'+sl+
					// '\\item Prepar acciones despues de que es enviado el articulo.'+sl+
					// '\\item Presentar la realidad del conocimiento cientifico escrito.'+sl+
				string = string+
					'\\end{itemize}'+sl+
					'\\end{minipage}}\\hfill\\newline'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 4. SUMILLA DE LA ASIGNATURA}\\newline\\end{minipage}'+sl+
					'\\newline'+sl+
					'\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{itemize}'+sl;
				for (x in sumilla) {
					string = string + '\\item '+sumilla[x]+sl;
				}
					// '\\item Dar una guía de como escribir articulos cientificos.'+sl+
					// '\\item Clasificar eventos academicos con herramientas conocidas.'+sl+
					// '\\item Prepar acciones despues de que es enviado el articulo.'+sl+
					// '\\item Presentar la realidad del conocimiento cientifico escrito.'+sl+
				string = string+
					'\\end{itemize}'+sl+
					'\\end{minipage}}\\hfill\\newline'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 5. CONTENIDOS ANALITICOS}]\\end{minipage}'+sl+
					'\\begin{center}'+sl+
					'  \\begin{tabular}{| c | c | p{3.3cm} | p{4cm} | p{4cm} | c |}'+sl+
					'    \\hline'+sl+
					'    Hrs & Fecha & Conceptual & Procedimental & Actitudinal & \\% \\\\ \\hline'+sl;

				for (x in contenidos_analiticos) {
					string = string + '    '+contenidos_analiticos[x].horas+' & '+contenidos_analiticos[x].fecha+' & '+contenidos_analiticos[x].conceptual+' & '+contenidos_analiticos[x].procedimental+' & '+contenidos_analiticos[x].actitudinal+' & '+contenidos_analiticos[x].porcentaje+' \\\\ \\hline'+sl;
				}
					// '    04 & 25/12/2015 & Tipos de redes y de conmutación. & Repasar los conocimientos adquiridos. & Muestra motivación por la especialidad. & 10 \\\\ \\hline'+sl+
					// '    05 & 25/12/2015 & Tipos de redes y de conmutación. & Repasar los conocimientos adquiridos. & Muestra motivación por la especialidad. & 10 \\\\ \\hline'+sl+
				
				string = string+
					'  \\end{tabular}'+sl+
					'\\end{center}'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 6. ESTRATEGIAS PEDAGÓGICAS}\\newline\\end{minipage}'+sl+
					'\\newline'+sl+
					'\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+estrategias_pedagogicas+sl+
					'\\end{minipage}}\\hfill\\newline'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 7. CRONOGRAMA Y CANDELARIZACION}\\end{minipage}'+sl+sl+
					'\\begin{table}[!ht]'+sl+
					'\\centering'+sl+
					'\\begin{tabular}{|c|c|c|c|c|}'+sl+
					'\\hline'+sl+
					'\\multirow{3}{*}{\\textbf{Nro}} & Inicio de la Asignatura & \\textbf{'+fecha_inicio_asignatura+'} & Finalización de la Asignatura & \\textbf{'+fecha_final_asignatura+'} \\\\ \\cline{2-5} '+sl+
					' & \\multicolumn{4}{c|}{\\textbf{Fecha de Examenes}} \\\\ \\cline{2-5}'+sl+
					' & \\multicolumn{2}{c|}{\\textbf{Teoría}} & \\multicolumn{2}{c|}{\\textbf{Práctica}} \\\\ \\hline'+sl;

				for (x in cronograma) {
					string = string + '\\multicolumn{1}{|c|}{1} & \\multicolumn{2}{c|}{'+cronograma[x].teoria+'} & \\multicolumn{2}{c|}{'+cronograma[x].practica+'} \\\\ \\hline'+sl;					
				}
					// '\\multicolumn{1}{|c|}{1} & \\multicolumn{2}{c|}{24/09/2014} & \\multicolumn{2}{c|}{23/11/2015} \\\\ \\hline'+sl+
					// '\\multicolumn{1}{|c|}{2} & \\multicolumn{2}{c|}{24/09/2014} & \\multicolumn{2}{c|}{23/11/2015} \\\\ \\hline'+sl+
				
				string = string+
					'\\end{tabular}'+sl+
					'\\end{table}'+sl+sl+
					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 8. EVALUACIÓN: Requisitos de Aprobación}\\newline\\end{minipage}'+sl+
					'\\newline\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'La evaluación será en base a los siguientes ítems:'+sl+
					'\\begin{itemize}'+sl;

				for (x in evaluacion) {
					string = string + '\\'+evaluacion[x]+sl;					
				}
					// '\\item Dar una guía de como escribir articulos cientificos.'+sl+
					// '\\item Clasificar eventos academicos con herramientas conocidas.'+sl+
					// '\\item Prepar acciones despues de que es enviado el articulo.'+sl+
					// '\\item Presentar la realidad del conocimiento cientifico escrito.'+sl+

				string = string+	
					'\\end{itemize}'+sl+
					evaluacion_promedio+sl+
					'\\end{minipage}}\\hfill\\newline'+sl+sl+

					'\\begin{minipage}[b]{\\textwidth}\\textbf'+sl+
					'{\\large 9. BIBLIOGRAFÍA}\\newline\\end{minipage}'+sl+sl+
					'\\bibliographystyle{amsplain}'+sl+
					'\\renewcommand\\refname{}'+sl+
					'\\bibliography{referenciasRC}'+sl+
					'\\fbox{'+sl+
					'\\begin{minipage}[b]{\\textwidth}'+sl+
					'\\begin{itemize}'+sl;

				for (x in bibliografia) {
					string = string + '\\'+bibliografia[x]+sl;
				}
					// '\\item Dar una guía de como escribir articulos cientificos.'+sl+
					// '\\item Clasificar eventos academicos con herramientas conocidas.'+sl+
					// '\\item Prepar acciones despues de que es enviado el articulo.'+sl+
					// '\\item Presentar la realidad del conocimiento cientifico escrito.'+sl+
				
				string = string+
					'\\end{itemize}'+sl+
					'\\end{minipage}}\\hfill\\newline'+sl+sl+
					'\\end{document}';

		escribirArchivo('test.tex',string);
		res.send('File process');
  });

  server.use(router);

};
