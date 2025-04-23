const atributosCampeonesFacil = [
  "nombre",
  "genero",
  "posiciones",
  "especies",
  "recurso",
  "rango",
  "regiones",
  "lanzamiento",
  "rol",
];

const atributosCampeonesMedio = [
  //{1,2,3}
  "dureza",
  "cantidad_dano",
  "movilidad",
  "utilidad",
  "control_masas",
  //{fisico , magico}
  "tipo_dano",
  //{autoataque, habilidades}
  "estilo_dano",
  "dificultad",
  "precio",
];

const atributosCampeonesDificil = [
  "porcentaje_fisico",
  "porcentaje_magico",
  "porcentaje_verdadero",
  "pickrate",
  "winrate",
  "banrate",
  "kda",
];

const campeonesData = {
  // caracCampeones,
  atributosCampeonesFacil,
  atributosCampeonesMedio,
  atributosCampeonesDificil,
};

export default campeonesData;
/*
  const puppeteer = require("puppeteer");
  
  async function fetchChampionStats(champion) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // URL de la página específica del campeón
    const url = `https://www.leagueofgraphs.com/es/champions/stats/${champion.nombre.toLowerCase()}`;
    await page.goto(url, { waitUntil: "networkidle2" });
  
    // Extraer el pick rate (popularidad) usando selectores
    try {
      const pickRate = await page.evaluate(() => {
        const element = document.querySelector("#graphDD1 .pie-chart"); // Selector del dato
        return element ? element.innerText.trim() : null;
      });
  
      if (pickRate) {
        champion.pickrate = pickRate;
        console.log(`Pick rate de ${champion.nombre} actualizado a: ${pickRate}`);
      } else {
        console.log(`No se encontró el pick rate para ${champion.nombre}`);
      }
    } catch (error) {
      console.error(`Error al obtener datos de ${champion.nombre}:`, error);
    }
  
    await browser.close();
  }
  
  // Función principal para iterar sobre los campeones
  async function updateChampionStats() {
    for (let i = 0; i < lolChampions.length; i++) {
      await fetchChampionStats(lolChampions[i]);
  
      // Espera un tiempo antes de hacer la siguiente consulta
      // Para evitar ser bloqueado, puedes aumentar el tiempo según sea necesario
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Espera 1 minuto entre campeones
    }
  }
  
  // Llamar a la función para actualizar estadísticas
  updateChampionStats().then(() => {
    console.log("Datos actualizados para todos los campeones.");
  });
  
  // const aatrox = {
  //   _id: "6293f3354fccc7941b03a333",
  //   championId: "628141c33a4f16643c39d042",
  //   nombre: "Aatrox",
  //   genero: "Masculino",
  //   posiciones: ["Top"],
  //   especies: ["Darkin"],
  //   recurso: "Sin mana",
  //   rango: ["Cuerpo a cuerpo"],
  //   regiones: ["Runeterra", "Shurima"],
  //   lanzamiento: "2013-06-13",
  //   pickrate: " ",
  // };
  
  // Función para hacer scraping y actualizar el dato de Aatrox
  async function fetchChampionStats(champion) {
    const browser = await puppeteer.launch(); // Modo headless (sin UI)
    const page = await browser.newPage();
  
    const url = `https://www.leagueofgraphs.com/es/champions/stats/${champion.nombre.toLowerCase()}`;
  
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      await page.waitForSelector("#graphDD1", { timeout: 60000 });
  
      const pickRate = await page.evaluate(() => {
        const element = document.querySelector("#graphDD1");
        return element ? element.childNodes[0].nodeValue.trim() : null;
      });
  
      if (pickRate) {
        champion.pickrate = pickRate;
        console.log(`Pick rate de ${champion.nombre} actualizado a: ${pickRate}`);
      } else {
        console.log(`No se encontró el pick rate para ${champion.nombre}`);
      }
    } catch (error) {
      console.error(`Error en la función fetchChampionStats:`, error);
    } finally {
      await browser.close();
    }
  }
  
  // Llamar a la función para obtener estadísticas de Aatrox
  fetchChampionStats(aatrox).then(() => {
    console.log("Datos actualizados:", aatrox);
  });
  
  */
// async function fetchChampionStats(champion) {
//   const browser = await puppeteer.launch(); // Modo headless (sin UI)
//   const page = await browser.newPage();

//   const url = `https://www.leagueofgraphs.com/es/champions/stats/${champion.nombre.toLowerCase()}`;

//   try {
//     await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
//     await page.waitForSelector("#graphDD1", { timeout: 60000 });

//     /*
//     // Obtener la dureza
//     const dureza = await page.evaluate(() => {
//       const element = document.querySelector("#dureza"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (dureza) {
//       champion.dureza = dureza;
//       console.log(`Dureza de ${champion.nombre} actualizada a: ${dureza}`);
//     }

//     // Obtener el rol
//     const rol = await page.evaluate(() => {
//       const element = document.querySelector("#rol"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (rol) {
//       champion.rol = rol;
//       console.log(`Rol de ${champion.nombre} actualizado a: ${rol}`);
//     }

//     // Obtener la cantidad de daño
//     const cantidad_dano = await page.evaluate(() => {
//       const element = document.querySelector("#cantidad_dano"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (cantidad_dano) {
//       champion.cantidad_dano = cantidad_dano;
//       console.log(
//         `Cantidad de daño de ${champion.nombre} actualizada a: ${cantidad_dano}`
//       );
//     }

//     // Obtener la movilidad
//     const movilidad = await page.evaluate(() => {
//       const element = document.querySelector("#movilidad"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (movilidad) {
//       champion.movilidad = movilidad;
//       console.log(
//         `Movilidad de ${champion.nombre} actualizada a: ${movilidad}`
//       );
//     }

//     // Obtener la utilidad
//     const utilidad = await page.evaluate(() => {
//       const element = document.querySelector("#utilidad"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (utilidad) {
//       champion.utilidad = utilidad;
//       console.log(`Utilidad de ${champion.nombre} actualizada a: ${utilidad}`);
//     }

//     // Obtener control de masas
//     const control_masas = await page.evaluate(() => {
//       const element = document.querySelector("#control_masas"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (control_masas) {
//       champion.control_masas = control_masas;
//       console.log(
//         `Control de masas de ${champion.nombre} actualizado a: ${control_masas}`
//       );
//     }

//     // Obtener el tipo de daño
//     const tipo_dano = await page.evaluate(() => {
//       const element = document.querySelector("#tipo_dano"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (tipo_dano) {
//       champion.tipo_dano = tipo_dano;
//       console.log(
//         `Tipo de daño de ${champion.nombre} actualizado a: ${tipo_dano}`
//       );
//     }

//     // Obtener el estilo de daño
//     const estilo_dano = await page.evaluate(() => {
//       const element = document.querySelector("#estilo_dano"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (estilo_dano) {
//       champion.estilo_dano = estilo_dano;
//       console.log(
//         `Estilo de daño de ${champion.nombre} actualizado a: ${estilo_dano}`
//       );
//     }

//     // Obtener la dificultad
//     const dificultad = await page.evaluate(() => {
//       const element = document.querySelector("#dificultad"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (dificultad) {
//       champion.dificultad = dificultad;
//       console.log(
//         `Dificultad de ${champion.nombre} actualizada a: ${dificultad}`
//       );
//     }
// */
//     // Obtener el porcentaje físico desde el tooltip
//     const porcentaje_fisico = await page.evaluate(() => {
//       const element = document.querySelector(
//         ".stacked_bar_area.physical_damage_area"
//       ); // Selector para daño físico
//       const tooltip = element ? element.getAttribute("tooltip") : null;
//       if (tooltip) {
//         const match = tooltip.match(/(\d+\.\d+)% Daño físico/);
//         return match ? `${match[1]}%` : null;
//       }
//       return null;
//     });
//     if (porcentaje_fisico) {
//       champion.porcentaje_fisico = porcentaje_fisico;
//       console.log(
//         `Porcentaje físico de ${champion.nombre} actualizado a: ${porcentaje_fisico}`
//       );
//     }

//     // Obtener el porcentaje mágico desde el tooltip
//     const porcentaje_magico = await page.evaluate(() => {
//       const element = document.querySelector(
//         ".stacked_bar_area.magic_damage_area"
//       ); // Selector para daño mágico
//       const tooltip = element ? element.getAttribute("tooltip") : null;
//       if (tooltip) {
//         const match = tooltip.match(/(\d+\.\d+)% Daño mágico/);
//         return match ? `${match[1]}%` : null;
//       }
//       return null;
//     });
//     if (porcentaje_magico) {
//       champion.porcentaje_magico = porcentaje_magico;
//       console.log(
//         `Porcentaje mágico de ${champion.nombre} actualizado a: ${porcentaje_magico}`
//       );
//     }

//     // Obtener el porcentaje verdadero desde el tooltip
//     const porcentaje_verdadero = await page.evaluate(() => {
//       const element = document.querySelector(
//         ".stacked_bar_area.true_damage_area"
//       ); // Selector para daño verdadero
//       const tooltip = element ? element.getAttribute("tooltip") : null;
//       if (tooltip) {
//         const match = tooltip.match(/(\d+\.\d+)% Daño verdadero/);
//         return match ? `${match[1]}%` : null;
//       }
//       return null;
//     });
//     if (porcentaje_verdadero) {
//       champion.porcentaje_verdadero = porcentaje_verdadero;
//       console.log(
//         `Porcentaje verdadero de ${champion.nombre} actualizado a: ${porcentaje_verdadero}`
//       );
//     }

//     // Obtener el precio
//     // const precio = await page.evaluate(() => {
//     //   const element = document.querySelector("#precio"); // Cambia este selector
//     //   return element ? element.innerText.trim() : null;
//     // });
//     // if (precio) {
//     //   champion.precio = precio;
//     //   console.log(`Precio de ${champion.nombre} actualizado a: ${precio}`);
//     // }

//     // Obtener el pick rate
//     const pickRate = await page.evaluate(() => {
//       const element = document.querySelector("#graphDD1"); // Selector para pick rate
//       return element ? element.childNodes[0].nodeValue.trim() : null;
//     });
//     if (pickRate) {
//       champion.pickrate = pickRate;
//       console.log(`Pick rate de ${champion.nombre} actualizado a: ${pickRate}`);
//     } else {
//       console.log(`No se encontró el pick rate para ${champion.nombre}`);
//     }

//     // Obtener el winrate
//     const winRate = await page.evaluate(() => {
//       const element = document.querySelector("#graphDD2"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (winRate) {
//       champion.winrate = winRate;
//       console.log(`Winrate de ${champion.nombre} actualizado a: ${winRate}`);
//     }

//     // Obtener el banrate
//     const banRate = await page.evaluate(() => {
//       const element = document.querySelector("#graphDD3"); // Cambia este selector
//       return element ? element.innerText.trim() : null;
//     });
//     if (banRate) {
//       champion.banrate = banRate;
//       console.log(`Banrate de ${champion.nombre} actualizado a: ${banRate}`);
//     }

//     // Obtener el KDA (Kills, Deaths, Assists)
//     const kda = await page.evaluate(() => {
//       const killsElement = document.querySelector(".number .kills");
//       const deathsElement = document.querySelector(".number .deaths");
//       const assistsElement = document.querySelector(".number .assists");

//       const kills = killsElement
//         ? parseFloat(killsElement.innerText.trim())
//         : null;
//       const deaths = deathsElement
//         ? parseFloat(deathsElement.innerText.trim())
//         : null;
//       const assists = assistsElement
//         ? parseFloat(assistsElement.innerText.trim())
//         : null;

//       if (kills !== null && deaths !== null && assists !== null) {
//         const kdaString = `${kills}/${deaths}/${assists}`;
//         const kdapromedio = deaths !== 0 ? (kills + assists) / deaths : 0; // Evitar división por cero
//         return { kdaString, kdapromedio };
//       }

//       return null; // Si no encontramos los datos
//     });

//     if (kda) {
//       champion.kda = kda.kdaString; // Guarda el string del KDA
//       champion.kdapromedio = kda.kdapromedio.toFixed(2); // Guarda el KDA promedio con 2 decimales
//       console.log(`KDA de ${champion.nombre} actualizado a: ${kda.kdaString}`);
//       console.log(
//         `KDA promedio de ${champion.nombre} calculado a: ${champion.kdapromedio}`
//       );
//     }
//   } catch (error) {
//     console.error(`Error al obtener datos de ${champion.nombre}:`, error);
//   } finally {
//     await browser.close();
//   }
// }

// // Función principal para iterar sobre los campeones
// async function updateChampionStats() {
//   for (let i = 0; i < caracCampeones.length; i++) {
//     await fetchChampionStats(caracCampeones[i]);

//     // Espera un tiempo antes de hacer la siguiente consulta
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1 minuto entre campeones
//   }
// }

// // Llamar a la función para actualizar estadísticas
// updateChampionStats().then(() => {
//   console.log("Datos actualizados para todos los campeones.");
// });

// async function fetchChampionStats(champion) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const url = `https://www.leagueofgraphs.com/es/champions/stats/${formatChampionName(
//     champion.nombre
//   )}`;

//   try {
//     await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
//     await page.waitForSelector("#graphDD1", { timeout: 20000 });

//     // Porcentaje físico
//     const porcentaje_fisico = await page.evaluate(() => {
//       const element = document.querySelector(
//         ".stacked_bar_area.physical_damage_area"
//       );
//       const tooltip = element ? element.getAttribute("tooltip") : null;
//       const match = tooltip?.match(/(\d+\.\d+)% Daño físico/);
//       return match ? `${match[1]}%` : null;
//     });
//     if (porcentaje_fisico) {
//       champion.porcentaje_fisico = porcentaje_fisico;
//     }

//     // Porcentaje mágico
//     const porcentaje_magico = await page.evaluate(() => {
//       const element = document.querySelector(
//         ".stacked_bar_area.magic_damage_area"
//       );
//       const tooltip = element ? element.getAttribute("tooltip") : null;
//       const match = tooltip?.match(/(\d+\.\d+)% Daño mágico/);
//       return match ? `${match[1]}%` : null;
//     });
//     if (porcentaje_magico) {
//       champion.porcentaje_magico = porcentaje_magico;
//     }

//     // Porcentaje verdadero
//     const porcentaje_verdadero = await page.evaluate(() => {
//       const element = document.querySelector(
//         ".stacked_bar_area.true_damage_area"
//       );
//       const tooltip = element ? element.getAttribute("tooltip") : null;
//       const match = tooltip?.match(/(\d+\.\d+)% Daño verdadero/);
//       return match ? `${match[1]}%` : null;
//     });
//     if (porcentaje_verdadero) {
//       champion.porcentaje_verdadero = porcentaje_verdadero;
//     }

//     // Pick rate
//     const pickRate = await page.evaluate(() => {
//       const element = document.querySelector("#graphDD1");
//       return element ? element.childNodes[0].nodeValue.trim() : null;
//     });
//     if (pickRate) {
//       champion.pickrate = pickRate;
//     }

//     // Winrate
//     const winRate = await page.evaluate(() => {
//       const element = document.querySelector("#graphDD2");
//       return element ? element.innerText.trim() : null;
//     });
//     if (winRate) {
//       champion.winrate = winRate;
//     }

//     // Banrate
//     const banRate = await page.evaluate(() => {
//       const element = document.querySelector("#graphDD3");
//       return element ? element.innerText.trim() : null;
//     });
//     if (banRate) {
//       champion.banrate = banRate;
//     }

//     // KDA
//     const kda = await page.evaluate(() => {
//       const killsElement = document.querySelector(".number .kills");
//       const deathsElement = document.querySelector(".number .deaths");
//       const assistsElement = document.querySelector(".number .assists");

//       const kills = killsElement
//         ? parseFloat(killsElement.innerText.trim())
//         : null;
//       const deaths = deathsElement
//         ? parseFloat(deathsElement.innerText.trim())
//         : null;
//       const assists = assistsElement
//         ? parseFloat(assistsElement.innerText.trim())
//         : null;

//       if (kills !== null && deaths !== null && assists !== null) {
//         const kdaString = `${kills}/${deaths}/${assists}`;
//         const kdapromedio = deaths !== 0 ? (kills + assists) / deaths : 0;
//         return { kdaString, kdapromedio };
//       }

//       return null;
//     });

//     if (kda) {
//       champion.kda = kda.kdaString;
//       champion.kdapromedio = kda.kdapromedio.toFixed(2);
//     }
//   } catch (error) {
//     console.error(`Error al obtener datos de ${champion.nombre}:`, error);
//   } finally {
//     await browser.close();
//   }
// }

// const caracCampeones2 = [];

// async function updateChampionStats() {
//   const campeonesAProcesar = caracCampeones.slice(129, 145); // Solo los primeros 7
//   for (const champion of campeonesAProcesar) {
//     await fetchChampionStats(champion);

//     // Eliminar campos _id y championId
//     const { _id, championId, ...cleanChampion } = champion;

//     caracCampeones2.push(cleanChampion); // Agregás el objeto limpio
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }

//   console.log("====== Campeones actualizados ======");
//   console.log(JSON.stringify(caracCampeones2, null, 40)); // para copiar/pegar
// }

// updateChampionStats().then(() => {
//   console.log("Datos actualizados para los primeros 25 campeones.");
// });

// function formatChampionName(nombre) {
//   return nombre.toLowerCase().replace(/[^a-z0-9]/gi, ""); // elimina espacios, comillas, apóstrofes, etc.
// }

/*
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import caracCampeones from "./LolChampionsComplete copy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatChampionName(nombre) {
  return nombre
    .trim()
    .replace(/ /g, "_") // reemplaza espacios por _
    .replace(/'/g, "%27") // reemplaza comillas simples por %27
    .replace(/’/g, "%27"); // por si aparece una comilla tipográfica
}

async function fetchChampionStats(champion) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const url = `https://leagueoflegends.fandom.com/wiki/${champion.nombre}/LoL`;
  const url = `https://leagueoflegends.fandom.com/wiki/${formatChampionName(
    champion.nombre
  )}/LoL`;
  console.log(url);
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

    // Precio
    const precio = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        '[data-source="cost"] .pi-data-value.pi-font a'
      );
      return elements.length > 1
        ? elements[1].innerText.trim()
        : elements[0]?.innerText.trim() || " ";
    });

    if (precio) {
      champion.precio = precio;
    }

    // Rol
    const role = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('[data-source="role"] .pi-data-value a')
      )
        .map((a) => a.textContent.trim())
        .filter(Boolean);
    });
    if (role.length > 0) champion.rol = role;

    const legacy = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('[data-source="legacy"] .pi-data-value a')
      )
        .map((a) => a.textContent.trim())
        .filter(Boolean);
    });
    if (legacy.length > 0) champion.clase = legacy;

    // Dureza
    const dureza = await page.evaluate(() => {
      const barrasIluminadas = document.querySelectorAll(
        ".stat-wheel-section.stat-wheel-toughness .stat-wheel-bar-lit"
      );
      return barrasIluminadas.length.toString(); // Devuelve "1", "2" o "3"
    });
    if (dureza) champion.dureza = dureza;

    // Cantidad de daño
    const cantidad_dano = await page.evaluate(() => {
      const barrasIluminadas = document.querySelectorAll(
        ".stat-wheel-section.stat-wheel-damage .stat-wheel-bar-lit"
      );
      return barrasIluminadas.length.toString(); // Devuelve "1", "2" o "3"
    });
    if (cantidad_dano) champion.cantidad_dano = cantidad_dano;

    // Movilidad
    const movilidad = await page.evaluate(() => {
      const barrasIluminadas = document.querySelectorAll(
        ".stat-wheel-section.stat-wheel-mobility .stat-wheel-bar-lit"
      );
      return barrasIluminadas.length.toString();
    });
    if (movilidad) champion.movilidad = movilidad;

    // Utilidad
    const utilidad = await page.evaluate(() => {
      const barrasIluminadas = document.querySelectorAll(
        ".stat-wheel-section.stat-wheel-utility .stat-wheel-bar-lit"
      );
      return barrasIluminadas.length.toString();
    });
    if (utilidad) champion.utilidad = utilidad;

    // Control de masas
    const control_masas = await page.evaluate(() => {
      const barrasIluminadas = document.querySelectorAll(
        ".stat-wheel-section.stat-wheel-control .stat-wheel-bar-lit"
      );
      return barrasIluminadas.length.toString(); // Devuelve "1", "2" o "3"
    });
    if (control_masas) champion.control_masas = control_masas;

    const dificultad = await page.evaluate(() => {
      const titleAttr = document.querySelector(
        '[data-source="difficulty"] [title]'
      );
      if (!titleAttr) return null;

      const match = titleAttr
        .getAttribute("title")
        .match(/difficulty rating of (\d)/);
      return match ? match[1] : null;
    });
    if (dificultad) champion.dificultad = dificultad;
  } catch (error) {
    console.error(`Error al obtener datos de ${champion.nombre}:`, error);
  } finally {
    await browser.close();
  }
}

async function updateChampionStats() {
  const caracCampeones2 = [];
  const campeonesAProcesar = caracCampeones.slice(0, 170); // Ajusta cantidad aquí
  console.log(campeonesAProcesar.length);

  for (const champion of campeonesAProcesar) {
    try {
      console.log("CAMPEON ANTES ");
      await fetchChampionStats(champion);
      console.log("CAMPEON despues ");
      caracCampeones2.push(champion);
    } catch (error) {
      console.error(`Error al procesar ${champion.nombre}, se saltará:`, error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera entre requests
  }

  console.log("====== Campeones actualizados ======");
  console.log(JSON.stringify(caracCampeones2, null, 10));

  sobrescribirArchivoConDatos(caracCampeones2);
  console.log("Datos actualizados para los primeros 10 campeones.");
}

function sobrescribirArchivoConDatos(arrayActualizado) {
  const rutaArchivo = path.join(__dirname, "LolChampionsComplete.js");

  const contenido = `const caracCampeones = ${JSON.stringify(
    arrayActualizado,
    null,
    2
  )};\n\nexport default caracCampeones;\n`;

  //fs.writeFileSync(rutaArchivo, contenido, "utf-8");
  fs.writeFileSync(rutaArchivo, "", "utf-8"); // Borra el contenido anterior
  fs.writeFileSync(rutaArchivo, contenido, "utf-8");
  console.log(
    "✅ Archivo 'LolChampionsComplete.js' actualizado correctamente."
  );
}

updateChampionStats();
*/
