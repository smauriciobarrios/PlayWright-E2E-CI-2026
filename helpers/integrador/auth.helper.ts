import * as path from "node:path";
import * as fs from "node:fs";
/**
 * * Función que devuelve la ruta absoluta del archivo de auth. Si existe lo elimina y genera
nuevamente.
*
* - Mantiene los tests organizados y reutilizables.
* @param fileName – nombre del archivo donde se guardará el estado deseado.
*/
export function getAuthStatePath(fileName: string): string {
  const stateDir = path.join(process.cwd(), "auth");
  fs.mkdirSync(stateDir, { recursive: true });
  return path.join(stateDir, fileName);
}
