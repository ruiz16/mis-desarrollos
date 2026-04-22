import { useState, useRef } from "react";

const REDES = [
  { key: "instagram", label: "Instagram", icon: "📸", placeholder: "@usuario" },
  { key: "facebook", label: "Facebook", icon: "👤", placeholder: "facebook.com/pagina" },
  { key: "tiktok", label: "TikTok", icon: "🎵", placeholder: "@usuario" },
  { key: "twitter", label: "X / Twitter", icon: "✖", placeholder: "@usuario" },
  { key: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "linkedin.com/in/..." },
  { key: "youtube", label: "YouTube", icon: "▶", placeholder: "youtube.com/@canal" },
  { key: "whatsapp", label: "WhatsApp Biz", icon: "💬", placeholder: "+549..." },
  { key: "sitio_web", label: "Sitio Web", icon: "🌐", placeholder: "https://..." },
];

const CATEGORIAS = [
  "Gastronomía", "Moda y Accesorios", "Tecnología", "Salud y Bienestar",
  "Arte y Diseño", "Servicios", "Educación", "Comercio", "Turismo", "Otro"
];

const POSICIONAMIENTO = [
  { key: "tiene_gmb", label: "Google Mi Negocio", desc: "Perfil en Google Maps activo" },
  { key: "tiene_seo", label: "SEO / Blog", desc: "Contenido optimizado para buscadores" },
  { key: "tiene_publicidad", label: "Publicidad Paga", desc: "Meta Ads / Google Ads activos" },
  { key: "tiene_email", label: "Email Marketing", desc: "Lista de correos / newsletter" },
  { key: "tiene_ecommerce", label: "E-commerce", desc: "Tienda online propia o terceros" },
];

const EMPTY_FORM = {
  nombre: "", propietario: "", categoria: "", telefono: "", email: "",
  localidad: "", descripcion: "",
  instagram: "", facebook: "", tiktok: "", twitter: "", linkedin: "",
  youtube: "", whatsapp: "", sitio_web: "",
  tiene_gmb: false, tiene_seo: false, tiene_publicidad: false,
  tiene_email: false, tiene_ecommerce: false,
  seguidores_ig: "", seguidores_fb: "", seguidores_tk: "",
  notas: "",
};

function ScoreBar({ value, max = 10, color }) {
  return (
    <div style={{ background: "#1a1a2e", borderRadius: 4, height: 6, overflow: "hidden", width: "100%" }}>
      <div style={{
        width: `${(value / max) * 100}%`, height: "100%",
        background: color, borderRadius: 4,
        transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }} />
    </div>
  );
}

function calcScore(emp) {
  let s = 0;
  REDES.forEach(r => { if (emp[r.key]) s += 1; });
  POSICIONAMIENTO.forEach(p => { if (emp[p.key]) s += 1.5; });
  return Math.min(10, Math.round((s / (REDES.length + POSICIONAMIENTO.length * 1.5)) * 10 * 10) / 10);
}

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + "22", color: color, border: `1px solid ${color}44`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700,
      letterSpacing: 0.5, textTransform: "uppercase"
    }}>{label}</span>
  );
}

function EmpCard({ emp, onEdit, onDelete }) {
  const score = calcScore(emp);
  const color = score >= 7 ? "#00f5a0" : score >= 4 ? "#f5c400" : "#ff6b6b";
  const redes_activas = REDES.filter(r => emp[r.key]);
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f0f1a 0%, #141428 100%)",
      border: "1px solid #252540", borderRadius: 16, padding: "20px 22px",
      transition: "transform 0.2s, box-shadow 0.2s", cursor: "default",
      boxShadow: "0 4px 24px #00000060",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px #00000080"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px #00000060"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ color: "#f0f0ff", fontWeight: 800, fontSize: 15, fontFamily: "'DM Serif Display', serif" }}>{emp.nombre}</div>
          <div style={{ color: "#8888aa", fontSize: 12, marginTop: 2 }}>{emp.propietario} · {emp.localidad}</div>
        </div>
        <Badge label={emp.categoria || "Sin categoría"} color="#a78bfa" />
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ color: "#8888aa", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>PRESENCIA DIGITAL</span>
          <span style={{ color, fontSize: 13, fontWeight: 800 }}>{score}/10</span>
        </div>
        <ScoreBar value={score} color={color} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {redes_activas.map(r => (
          <span key={r.key} title={emp[r.key]} style={{
            background: "#252540", borderRadius: 8, padding: "3px 8px",
            fontSize: 13, color: "#c0c0e0", display: "flex", alignItems: "center", gap: 4
          }}>
            {r.icon}
          </span>
        ))}
        {POSICIONAMIENTO.filter(p => emp[p.key]).map(p => (
          <span key={p.key} style={{
            background: "#1a2a1a", borderRadius: 8, padding: "3px 8px",
            fontSize: 11, color: "#00f5a0", border: "1px solid #00f5a022"
          }}>✓ {p.label}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(emp)} style={{
          flex: 1, background: "#252540", border: "none", color: "#a78bfa",
          borderRadius: 8, padding: "7px 0", cursor: "pointer", fontSize: 12, fontWeight: 700
        }}>✏ Editar</button>
        <button onClick={() => onDelete(emp.id)} style={{
          background: "#2a1a1a", border: "none", color: "#ff6b6b",
          borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700
        }}>✕</button>
      </div>
    </div>
  );
}

function Modal({ form, setForm, onSave, onClose, editId }) {
  const [tab, setTab] = useState(0);
  const tabs = ["Datos", "Redes", "Posicionamiento", "Notas"];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#00000090", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16
    }}>
      <div style={{
        background: "#0f0f1a", border: "1px solid #252540", borderRadius: 20,
        width: "100%", maxWidth: 620, maxHeight: "90vh", overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "0 24px 80px #000000b0"
      }}>
        {/* Header */}
        <div style={{ padding: "22px 28px 0", borderBottom: "1px solid #1a1a30" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ color: "#f0f0ff", fontFamily: "'DM Serif Display', serif", fontSize: 20, margin: 0 }}>
              {editId ? "✏ Editar emprendimiento" : "＋ Nuevo emprendimiento"}
            </h2>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#8888aa", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {tabs.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} style={{
                padding: "8px 16px", borderRadius: "10px 10px 0 0", border: "none", cursor: "pointer",
                background: tab === i ? "#1a1a2e" : "transparent",
                color: tab === i ? "#a78bfa" : "#8888aa", fontWeight: 700, fontSize: 12,
                borderBottom: tab === i ? "2px solid #a78bfa" : "2px solid transparent",
                transition: "all 0.2s"
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
          {tab === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { k: "nombre", l: "Nombre del emprendimiento *", full: true },
                { k: "propietario", l: "Propietario / Responsable" },
                { k: "telefono", l: "Teléfono" },
                { k: "email", l: "Email" },
                { k: "localidad", l: "Localidad / Ciudad" },
              ].map(({ k, l, full }) => (
                <div key={k} style={{ gridColumn: full ? "1/-1" : undefined }}>
                  <label style={{ color: "#8888aa", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 6 }}>{l.toUpperCase()}</label>
                  <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                    style={{ width: "100%", background: "#141428", border: "1px solid #252540", borderRadius: 10, padding: "10px 14px", color: "#f0f0ff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ color: "#8888aa", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 6 }}>CATEGORÍA</label>
                <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}
                  style={{ width: "100%", background: "#141428", border: "1px solid #252540", borderRadius: 10, padding: "10px 14px", color: "#f0f0ff", fontSize: 14, outline: "none" }}>
                  <option value="">— Seleccionar —</option>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ color: "#8888aa", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 6 }}>DESCRIPCIÓN BREVE</label>
                <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} rows={3}
                  style={{ width: "100%", background: "#141428", border: "1px solid #252540", borderRadius: 10, padding: "10px 14px", color: "#f0f0ff", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
            </div>
          )}

          {tab === 1 && (
            <div style={{ display: "grid", gap: 12 }}>
              {REDES.map(r => (
                <div key={r.key}>
                  <label style={{ color: "#8888aa", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 6 }}>
                    {r.icon} {r.label.toUpperCase()}
                  </label>
                  <input value={form[r.key]} onChange={e => setForm({ ...form, [r.key]: e.target.value })}
                    placeholder={r.placeholder}
                    style={{ width: "100%", background: "#141428", border: "1px solid #252540", borderRadius: 10, padding: "10px 14px", color: "#f0f0ff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ borderTop: "1px solid #252540", paddingTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[["seguidores_ig", "📸 Seguidores IG"], ["seguidores_fb", "👤 Likes FB"], ["seguidores_tk", "🎵 Seguidores TK"]].map(([k, l]) => (
                  <div key={k}>
                    <label style={{ color: "#8888aa", fontSize: 10, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 6 }}>{l.toUpperCase()}</label>
                    <input type="number" value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })}
                      placeholder="0"
                      style={{ width: "100%", background: "#141428", border: "1px solid #252540", borderRadius: 10, padding: "10px 14px", color: "#f0f0ff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 2 && (
            <div style={{ display: "grid", gap: 12 }}>
              {POSICIONAMIENTO.map(p => (
                <div key={p.key} onClick={() => setForm({ ...form, [p.key]: !form[p.key] })}
                  style={{
                    background: form[p.key] ? "#0a1f14" : "#141428",
                    border: `1px solid ${form[p.key] ? "#00f5a044" : "#252540"}`,
                    borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s"
                  }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: form[p.key] ? "#00f5a0" : "#252540",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, flexShrink: 0, transition: "all 0.2s"
                  }}>{form[p.key] ? "✓" : ""}</div>
                  <div>
                    <div style={{ color: "#f0f0ff", fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                    <div style={{ color: "#8888aa", fontSize: 12, marginTop: 2 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 3 && (
            <div>
              <label style={{ color: "#8888aa", fontSize: 11, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 10 }}>NOTAS INTERNAS</label>
              <textarea value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} rows={8}
                placeholder="Observaciones, pendientes, oportunidades detectadas..."
                style={{ width: "100%", background: "#141428", border: "1px solid #252540", borderRadius: 12, padding: "14px", color: "#f0f0ff", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: "1px solid #1a1a30", display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            background: "#1a1a2e", border: "1px solid #252540", color: "#8888aa",
            borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontWeight: 700
          }}>Cancelar</button>
          <button onClick={onSave} style={{
            flex: 1, background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            border: "none", color: "white", borderRadius: 10, padding: "10px",
            cursor: "pointer", fontWeight: 800, fontSize: 14, letterSpacing: 0.5
          }}>
            {editId ? "Guardar cambios" : "Registrar emprendimiento"}
          </button>
        </div>
      </div>
    </div>
  );
}

function exportCSV(data) {
  const headers = [
    "ID", "Nombre", "Propietario", "Categoría", "Teléfono", "Email", "Localidad", "Descripción",
    ...REDES.map(r => r.label),
    "Seguidores IG", "Likes FB", "Seguidores TK",
    ...POSICIONAMIENTO.map(p => p.label),
    "Score Digital", "Notas", "Fecha Registro"
  ];
  const rows = data.map(e => [
    e.id, e.nombre, e.propietario, e.categoria, e.telefono, e.email, e.localidad, e.descripcion,
    ...REDES.map(r => e[r.key] || ""),
    e.seguidores_ig, e.seguidores_fb, e.seguidores_tk,
    ...POSICIONAMIENTO.map(p => e[p.key] ? "Sí" : "No"),
    calcScore(e), e.notas, e.fecha
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = `emprendimientos_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
}

const DEMO = [
  {
    id: 1, nombre: "La Empanada Dorada", propietario: "María Gómez", categoria: "Gastronomía",
    telefono: "+5493415551234", email: "maria@ejemplo.com", localidad: "Rosario",
    descripcion: "Empanadas artesanales con recetas familiares", instagram: "@empanadadorada",
    facebook: "EmpandadaDorada", tiktok: "", twitter: "", linkedin: "", youtube: "", whatsapp: "+5493415551234",
    sitio_web: "", seguidores_ig: "4200", seguidores_fb: "1800", seguidores_tk: "",
    tiene_gmb: true, tiene_seo: false, tiene_publicidad: true, tiene_email: false, tiene_ecommerce: false,
    notas: "Interesada en publicidad en Instagram", fecha: "2025-01-10"
  },
  {
    id: 2, nombre: "TechSol Arg", propietario: "Carlos Ríos", categoria: "Tecnología",
    telefono: "+5491122334455", email: "carlos@techsol.ar", localidad: "Buenos Aires",
    descripcion: "Soluciones de software a medida para pymes", instagram: "@techsolar",
    facebook: "TechSolAr", tiktok: "@techsolar", twitter: "@techsolar", linkedin: "techsol-ar",
    youtube: "@techsolar", whatsapp: "+5491122334455", sitio_web: "https://techsol.ar",
    seguidores_ig: "12000", seguidores_fb: "5300", seguidores_tk: "8900",
    tiene_gmb: true, tiene_seo: true, tiene_publicidad: true, tiene_email: true, tiene_ecommerce: false,
    notas: "Empresa sólida, ya tiene equipo de marketing", fecha: "2025-01-15"
  },
];

export default function App() {
  const [emprendimientos, setEmprendimientos] = useState(DEMO);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCateg, setFiltroCateg] = useState("");
  const [vista, setVista] = useState("grid");

  const abrirNuevo = () => { setForm(EMPTY_FORM); setEditId(null); setModal(true); };
  const abrirEditar = (emp) => { setForm({ ...emp }); setEditId(emp.id); setModal(true); };
  const cerrarModal = () => setModal(false);

  const guardar = () => {
    if (!form.nombre.trim()) return;
    if (editId) {
      setEmprendimientos(prev => prev.map(e => e.id === editId ? { ...form, id: editId } : e));
    } else {
      setEmprendimientos(prev => [...prev, { ...form, id: Date.now(), fecha: new Date().toISOString().slice(0, 10) }]);
    }
    setModal(false);
  };

  const eliminar = (id) => setEmprendimientos(prev => prev.filter(e => e.id !== id));

  const filtrados = emprendimientos.filter(e => {
    const q = busqueda.toLowerCase();
    const matchQ = !q || e.nombre.toLowerCase().includes(q) || e.propietario?.toLowerCase().includes(q) || e.localidad?.toLowerCase().includes(q);
    const matchC = !filtroCateg || e.categoria === filtroCateg;
    return matchQ && matchC;
  });

  const totalRedes = emprendimientos.reduce((a, e) => a + REDES.filter(r => e[r.key]).length, 0);
  const avgScore = emprendimientos.length ? (emprendimientos.reduce((a, e) => a + calcScore(e), 0) / emprendimientos.length).toFixed(1) : 0;

  return (
    <div style={{
      minHeight: "100vh", background: "#080810", fontFamily: "'DM Sans', sans-serif",
      color: "#f0f0ff"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; background: #0f0f1a; }
        ::-webkit-scrollbar-thumb { background: #252540; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #44445a; }
        select option { background: #141428; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0f0f1a 0%, #080810 100%)",
        borderBottom: "1px solid #1a1a30", padding: "0 32px"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
            }}>🚀</div>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#f0f0ff", lineHeight: 1 }}>
                Directorio Digital
              </div>
              <div style={{ color: "#8888aa", fontSize: 11, letterSpacing: 1, marginTop: 3 }}>GESTIÓN DE EMPRENDIMIENTOS</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => exportCSV(emprendimientos)} style={{
              background: "#1a1a2e", border: "1px solid #252540", color: "#00f5a0",
              borderRadius: 10, padding: "9px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13,
              display: "flex", alignItems: "center", gap: 6
            }}>⬇ Exportar CSV</button>
            <button onClick={abrirNuevo} style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)", border: "none", color: "white",
              borderRadius: 10, padding: "9px 20px", cursor: "pointer", fontWeight: 800, fontSize: 13
            }}>＋ Agregar</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { v: emprendimientos.length, l: "Emprendimientos", icon: "🏪", color: "#a78bfa" },
            { v: avgScore, l: "Score Promedio", icon: "📊", color: "#00f5a0" },
            { v: totalRedes, l: "Perfiles Cargados", icon: "🔗", color: "#f5c400" },
            { v: emprendimientos.filter(e => calcScore(e) >= 7).length, l: "Alta Presencia", icon: "⭐", color: "#ff6b6b" },
          ].map(({ v, l, icon, color }) => (
            <div key={l} style={{
              background: "linear-gradient(135deg, #0f0f1a, #141428)",
              border: "1px solid #252540", borderRadius: 16, padding: "18px 22px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: "#8888aa", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{l.toUpperCase()}</span>
              </div>
              <div style={{ color, fontSize: 32, fontWeight: 800, fontFamily: "'DM Serif Display', serif" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="🔍  Buscar por nombre, propietario o localidad..."
            style={{
              flex: 1, minWidth: 240, background: "#0f0f1a", border: "1px solid #252540",
              borderRadius: 10, padding: "10px 16px", color: "#f0f0ff", fontSize: 14, outline: "none"
            }} />
          <select value={filtroCateg} onChange={e => setFiltroCateg(e.target.value)} style={{
            background: "#0f0f1a", border: "1px solid #252540", borderRadius: 10,
            padding: "10px 14px", color: "#f0f0ff", fontSize: 14, outline: "none"
          }}>
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ display: "flex", background: "#0f0f1a", border: "1px solid #252540", borderRadius: 10, overflow: "hidden" }}>
            {[["grid", "⊞"], ["list", "☰"]].map(([v, i]) => (
              <button key={v} onClick={() => setVista(v)} style={{
                padding: "10px 14px", border: "none", cursor: "pointer",
                background: vista === v ? "#252540" : "transparent",
                color: vista === v ? "#a78bfa" : "#8888aa", fontSize: 15
              }}>{i}</button>
            ))}
          </div>
        </div>

        {/* Grid / List */}
        {filtrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#44445a" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔭</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Sin resultados</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Ajustá los filtros o agregá un nuevo emprendimiento</div>
          </div>
        ) : vista === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {filtrados.map(e => <EmpCard key={e.id} emp={e} onEdit={abrirEditar} onDelete={eliminar} />)}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtrados.map(e => {
              const score = calcScore(e);
              const color = score >= 7 ? "#00f5a0" : score >= 4 ? "#f5c400" : "#ff6b6b";
              return (
                <div key={e.id} style={{
                  background: "#0f0f1a", border: "1px solid #252540", borderRadius: 12,
                  padding: "14px 20px", display: "flex", alignItems: "center", gap: 16
                }}>
                  <div style={{ flex: "0 0 200px" }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{e.nombre}</div>
                    <div style={{ color: "#8888aa", fontSize: 12 }}>{e.localidad}</div>
                  </div>
                  <Badge label={e.categoria || "—"} color="#a78bfa" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {REDES.filter(r => e[r.key]).map(r => <span key={r.key} style={{ fontSize: 14 }}>{r.icon}</span>)}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
                    <ScoreBar value={score} color={color} />
                    <span style={{ color, fontWeight: 800, fontSize: 13, minWidth: 32 }}>{score}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => abrirEditar(e)} style={{ background: "#252540", border: "none", color: "#a78bfa", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>✏</button>
                    <button onClick={() => eliminar(e.id)} style={{ background: "#2a1a1a", border: "none", color: "#ff6b6b", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modal && <Modal form={form} setForm={setForm} onSave={guardar} onClose={cerrarModal} editId={editId} />}
    </div>
  );
}
