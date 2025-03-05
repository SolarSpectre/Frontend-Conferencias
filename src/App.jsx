import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import { NotFound } from "./paginas/NotFound";
import Dashboard from "./layout/Dashboard";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./components/useAuthStore";
import Auth from "./layout/Auth";
import Ponentes from "./paginas/Ponentes";
import Auditorios from "./paginas/Auditorios";
import VerAuditorio from "./paginas/VerAuditorio";
import EditarAuditorio from "./paginas/EditarAuditorio";
import Ponente from "./paginas/Ponente";
import EditarPonente from "./paginas/EditarPonente";
import AuditorioForm from "./paginas/AuditorioForm";
import SpeakerForm from "./paginas/SpeakerForm";

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<Auth />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route
          path="dashboard/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  {/* Rutas de Ponentes */}
                  <Route index element={<Ponentes />} />
                  <Route path="speakers/:cedula" element={<Ponente />} />
                  <Route path="add-speaker/" element={<SpeakerForm />} />
                  <Route path="edit-speaker/:cedula" element={<EditarPonente />} />

                  {/* Rutas de Auditorios */}
                  <Route path="auditoriums" element={<Auditorios />} />
                  <Route path="add/auditorium" element={<AuditorioForm />} />
                  <Route path="auditoriums/:codigo" element={<VerAuditorio />} />
                  <Route path="edit-auditorium/:id" element={<EditarAuditorio />} />

                  {/* Ruta de NotFound */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
