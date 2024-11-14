const DocumentTable = () => {
  return (
    <>
      <div className="grid grid-cols-3 m-4 w-full max-w-xs ">
        <select id="month" className="border px-4 py-2 rounded-lg">
          <option value="Enero">Enero</option>
          <option value="Febrero">Febrero</option>
          <option value="Marzo">Marzo</option>
          <option value="Abril">Abril</option>
          <option value="Mayo">Mayo</option>
          <option value="Junio">Junio</option>
          <option value="Julio">Julio</option>
          <option value="Agosto">Agosto</option>
          <option value="Septiembre" selected>
            Septiembre
          </option>
          <option value="Octubre">Octubre</option>
          <option value="Noviembre">Noviembre</option>
          <option value="Diciembre">Diciembre</option>
        </select>

        <select id="name" className="border px-4 py-2 rounded-lg">
          <option value="Juan" selected>
            Juan
          </option>
          <option value="Camila">Camila</option>
          <option value="Carlos">Carlos</option>
          <option value="Andrea">Andrea</option>
          <option value="María">María</option>
          <option value="Pedro">Pedro</option>
        </select>

        <button className="border px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
          Nuevo
        </button>
      </div>
      <div className="p-4 flex flex-col items-center">
        <table className="min-w-full border-t border-b border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Tipo Documento</th>
              <th className="px-4 py-2 border-b">Solicitud</th>
              <th className="px-4 py-2 border-b">Certificado</th>
              <th className="px-4 py-2 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="px-4 py-2 border-b">
                <p>Juan Camilo</p>
                <p className="text-sm text-gray-500">1065484574</p>
              </td>
              <td className="px-4 py-2 border-b">Certificado Laboral</td>
              <td className="px-4 py-2 border-b">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5 5 5M7 13h10v6H7v-6z"
                    />
                  </svg>
                  <span className="text-sm text-gray-500">10/12/2024</span>
                </div>
              </td>
              <td className="px-4 py-2 border-b">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 17l4-4 4 4M8 7h8"
                    />
                  </svg>
                  <span className="text-sm text-gray-500">10/12/2024</span>
                </div>
              </td>
              <td className="px-4 py-2 border-b text-yellow-500">Pendiente</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentTable;
