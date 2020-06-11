import basededatos from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {string} nombreAlumno el id del alumno
 */

export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  //console.log(basededatos.alumnos);

  let salida = undefined;
  let idEncontrado = -1;
  for (let i = 0; i < basededatos.alumnos.length; i++) {
    if (basededatos.alumnos[i].nombre === nombreAlumno) {
      idEncontrado = i + 1;
      i = basededatos.alumnos.length;
    }
  }
  if (idEncontrado >= 0) {
    let arregloMaterias = [];
    for (let j = 0; j < basededatos.calificaciones.length; j++) {
      if (
        basededatos.calificaciones[j].alumno === idEncontrado &&
        basededatos.calificaciones[j].nota >= 4
      ) {
        let idMateria = basededatos.calificaciones[j].materia - 1;
        arregloMaterias.push(basededatos.materias[idMateria]);
      }
    }
    salida = arregloMaterias;
  }

  return salida;
};

/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  let salida = undefined;
  let idUniversidad = undefined;
  for (let i = 0; i < basededatos.universidades.length; i++) {
    if (basededatos.universidades[i].nombre === nombreUniversidad) {
      salida = [];
      idUniversidad = basededatos.universidades[i].id;
      salida.push(basededatos.universidades[i]);
      i = basededatos.universidades.length;
    }
  }
  if (salida) {
    //si encontró la universidad
    let profesores = []; //creo un arreglo de profesores que luego concatenare con salida
    let alumnos = []; //creo un arreglo de alumnos que luego concatenare con salida
    for (let j = 0; j < basededatos.materias.length; j++) {
      //Recorre las materias para encontrar la que corresponde a esta universidad

      if (basededatos.materias[j].universidad === idUniversidad) {
        //compara id y la agrega al arreglo de salida
        salida.push(basededatos.materias[j]);

        //Parte profesores
        let idProfesor = undefined; //creo variable temporal

        for (let k = 0; k < basededatos.materias[j].profesores.length; k++) {
          //recorro profesores de la materia
          idProfesor = basededatos.materias[j].profesores[k]; //almaceno temporalmente idProfesor

          let l = 0;
          for (l = 0; l < profesores.length; l++) {
            //recorro arreglo de profesores

            if (profesores[l] === basededatos.profesores[idProfesor - 1]) {
              //compruebo si este profesor ya esta en el arreglo
              l = profesores.length + 1; //paso de rango a l, luego me sirve que sea +1
            }
          }

          if (l === profesores.length) {
            //si no lo encontro, lo agrega
            profesores.push(basededatos.profesores[idProfesor - 1]);
          }
        } //Fin parte Profesores

        //Parte Alumnos
        let idMateria = basededatos.materias[j].id;
        
       
        //recorro calificaciones para encontrar alumnos que cursaron esta materia
        //cuando lo encuentro, lo agrego al alumno al arreglo sin duplicar
        for (let m = 0; m < basededatos.calificaciones.length; m++) {
          if (basededatos.calificaciones[m].materia === idMateria) {//Si es la materia que estoy buscando
            let idAlumno = basededatos.calificaciones[m].alumno;//Encontré un alumno de esta universidad
            
            
            let n = 0;
            for (n = 0; n < alumnos.length; n++) {
              //recorro arreglo de alumnos
              
              if (alumnos[n] === basededatos.alumnos[idAlumno - 1]) {
                //compruebo si este profesor ya esta en el arreglo
                n = alumnos.length + 1; //paso de rango a n, luego me sirve que sea +1
              }
            }
            if (n === alumnos.length) {
              //si no lo encontro, lo agrega
              
              alumnos.push(basededatos.alumnos[idAlumno - 1]);
              
            }
          }
        }//Fin parte Alumnos
      }
    }
    salida = salida.concat(profesores); //concateno el arreglo de profesores sin duplicados a la salida
    salida = salida.concat(alumnos); //concateno el arreglo de alumnos sin duplicados a la salida
  }

  return salida;
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
// export const promedioDeEdad = () => {
//   return [];
// };

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
// export const alumnosConPromedioMayorA = (promedio) => {
//   return [];
// };

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
// export const materiasSinAlumnosAnotados = () => {
//   return [];
// };

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
// export const promedioDeEdadByUniversidadId = (universidadId) => {
//   return [];
// };
