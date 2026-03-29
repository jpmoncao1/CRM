import {
  Activity,
  BarChart3,
  Briefcase,
  CalendarClock,
  CalendarDays,
  Check,
  KanbanSquare,
  LayoutDashboard,
  Mail,
  Phone,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

export const themeCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap');
  :root { --bg:#0A0B0F; --surface:#12141A; --surface-2:#1C1F28; --surface-3:rgba(255,255,255,0.03); --border:rgba(255,255,255,0.06); --text:#F4F7FB; --muted:#95A0B5; --blue:#3B82F6; --green:#10B981; --warning:#F59E0B; --danger:#EF4444; --purple:#8B5CF6; --shadow:0 28px 65px rgba(3,7,18,0.45); --shadow-blue:0 24px 60px rgba(59,130,246,0.18); --radius-xl:28px; --radius-lg:22px; --radius-md:16px; --ease:200ms ease; }
  * { box-sizing:border-box; } html, body, #root { margin:0; min-height:100%; background:var(--bg); }
  body { color:var(--text); font-family:"DM Sans",sans-serif; background:radial-gradient(circle at top right, rgba(59,130,246,0.16), transparent 20%), radial-gradient(circle at bottom left, rgba(16,185,129,0.10), transparent 24%), linear-gradient(180deg, #090A0E 0%, #0A0B0F 100%); }
  .app { display:grid; grid-template-columns:240px 1fr; min-height:100vh; } .glass,.panel,.sidebar,.topbar,.modal-card,.toast { backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
  .sidebar { position:sticky; top:0; height:100vh; padding:24px 18px; border-right:1px solid var(--border); background:linear-gradient(180deg, rgba(18,20,26,0.92), rgba(10,11,15,0.94)); }
  .brand { display:flex; align-items:center; gap:14px; margin-bottom:28px; padding:12px; border-radius:18px; background:rgba(255,255,255,0.02); border:1px solid var(--border); }
  .brand h1,.brand p,.section-title h2,.section-title p,.card-title,.kpi-value,.topbar h3,.modal-header h3 { margin:0; }
  .brand h1,.kpi-value,.section-title h2,.topbar h3 { font-family:"Space Grotesk",sans-serif; letter-spacing:-0.03em; }
  .brand-mark { width:46px; height:46px; border-radius:14px; display:grid; place-items:center; background:linear-gradient(135deg, rgba(59,130,246,0.28), rgba(59,130,246,0.04)), rgba(255,255,255,0.02); border:1px solid rgba(59,130,246,0.28); box-shadow:inset 0 1px 0 rgba(255,255,255,0.08), 0 0 34px rgba(59,130,246,0.18); }
  .brand-mark svg { width:28px; height:28px; } .eyebrow { color:var(--muted); text-transform:uppercase; letter-spacing:0.14em; font-size:11px; } .nav { display:grid; gap:8px; }
  .nav-item { position:relative; display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%; padding:12px 14px; border-radius:16px; border:1px solid transparent; background:transparent; color:var(--muted); cursor:pointer; transition:transform var(--ease), background var(--ease), border-color var(--ease), color var(--ease), box-shadow var(--ease); }
  .nav-item:hover,.nav-item.active { color:var(--text); transform:translateX(4px); background:linear-gradient(90deg, rgba(59,130,246,0.15), rgba(59,130,246,0.04)); border-color:rgba(59,130,246,0.22); box-shadow:inset 3px 0 0 var(--blue), 0 10px 30px rgba(59,130,246,0.16); }
  .nav-left { display:flex; align-items:center; gap:12px; } .badge-dot,.pulse { border-radius:999px; display:inline-flex; align-items:center; justify-content:center; }
  .badge-dot { min-width:18px; height:18px; padding:0 6px; font-size:11px; font-weight:700; color:white; background:var(--blue); box-shadow:0 0 16px rgba(59,130,246,0.4); }
  .sidebar-footer { margin-top:auto; padding:14px; display:flex; align-items:center; gap:12px; border-radius:18px; background:rgba(255,255,255,0.025); border:1px solid var(--border); }
  .avatar { width:38px; height:38px; border-radius:14px; display:grid; place-items:center; font-weight:700; color:white; box-shadow:inset 0 1px 0 rgba(255,255,255,0.16); }
  .main { padding:22px; } .topbar { display:flex; align-items:center; justify-content:space-between; gap:18px; padding:18px 22px; margin-bottom:20px; border-radius:24px; border:1px solid var(--border); background:rgba(18,20,26,0.7); box-shadow:var(--shadow); }
  .topbar-meta { display:flex; flex-direction:column; gap:6px; } .breadcrumb { display:flex; align-items:center; gap:8px; color:var(--muted); font-size:13px; } .searchbar { position:relative; width:420px; }
  .searchbar input,.field,.textarea,.select,.toolbar-btn,.primary-btn,.ghost-btn { font:inherit; }
  .searchbar input,.field,.textarea,.select { width:100%; padding:13px 14px 13px 44px; border-radius:16px; border:1px solid var(--border); background:rgba(255,255,255,0.035); color:var(--text); outline:none; transition:border-color var(--ease), box-shadow var(--ease), background var(--ease); }
  .field,.textarea,.select { padding-left:14px; } .searchbar input:focus,.field:focus,.textarea:focus,.select:focus { border-color:rgba(59,130,246,0.46); box-shadow:0 0 0 4px rgba(59,130,246,0.12); background:rgba(255,255,255,0.05); }
  .search-icon { position:absolute; top:50%; left:16px; transform:translateY(-50%); color:var(--muted); } .topbar-actions { display:flex; align-items:center; gap:12px; }
  .icon-btn { position:relative; width:42px; height:42px; border-radius:14px; display:grid; place-items:center; border:1px solid var(--border); background:rgba(255,255,255,0.03); color:var(--muted); cursor:pointer; transition:transform var(--ease), color var(--ease), border-color var(--ease), background var(--ease); }
  .icon-btn:hover { transform:translateY(-2px); color:var(--text); border-color:rgba(59,130,246,0.25); background:rgba(59,130,246,0.1); }
  .pulse { width:10px; height:10px; background:var(--green); box-shadow:0 0 0 0 rgba(16,185,129,0.5); animation:pulse 1.8s infinite; }
  .section-title { display:flex; align-items:end; justify-content:space-between; gap:16px; margin-bottom:18px; } .muted { color:var(--muted); }
  .grid-4,.dashboard-bottom,.report-grid,.activity-layout,.lead-filters { display:grid; gap:18px; } .grid-4 { grid-template-columns:repeat(4, minmax(0, 1fr)); } .dashboard-bottom { grid-template-columns:1.6fr 1fr; } .report-grid { grid-template-columns:repeat(3, minmax(0, 1fr)); } .activity-layout { grid-template-columns:1fr 1.2fr; } .lead-filters { grid-template-columns:1.3fr 180px 180px auto; align-items:center; }
  .panel { border:1px solid var(--border); border-radius:var(--radius-xl); background:linear-gradient(180deg, rgba(28,31,40,0.8), rgba(18,20,26,0.88)); box-shadow:var(--shadow); } .kpi-card { padding:18px; border-radius:24px; border:1px solid var(--border); background:linear-gradient(180deg, rgba(28,31,40,0.76), rgba(18,20,26,0.9)); transition:transform var(--ease), border-color var(--ease), box-shadow var(--ease); } .kpi-card:hover { transform:translateY(-3px); border-color:rgba(59,130,246,0.24); box-shadow:var(--shadow-blue); }
  .kpi-head,.activity-row,.bulk-toolbar,.pipeline-column-header,.deal-meta,.calendar-header,.report-header { display:flex; align-items:center; justify-content:space-between; gap:12px; } .kpi-icon { width:48px; height:48px; border-radius:16px; display:grid; place-items:center; } .kpi-value { font-size:30px; line-height:1; margin:12px 0 8px; } .delta { display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px; font-size:12px; font-weight:700; }
  .positive { color:var(--green); background:rgba(16,185,129,0.16); } .negative { color:var(--danger); background:rgba(239,68,68,0.16); } .warning { color:var(--warning); background:rgba(245,158,11,0.16); } .panel-inner { padding:20px; }
  .pipeline-svg-wrap { position:relative; margin-top:18px; } .pipeline-tooltip { position:absolute; pointer-events:none; min-width:140px; padding:12px; border-radius:16px; background:rgba(15,17,22,0.95); border:1px solid var(--border); box-shadow:var(--shadow); transform:translate(-50%, calc(-100% - 12px)); }
  .legend { display:flex; gap:16px; margin-top:14px; flex-wrap:wrap; color:var(--muted); font-size:13px; } .legend span { display:inline-flex; align-items:center; gap:8px; } .legend i { width:10px; height:10px; border-radius:999px; display:inline-block; }
  .activity-list { display:grid; gap:12px; } .activity-row { padding:14px; border-radius:18px; border:1px solid transparent; background:rgba(255,255,255,0.03); transition:transform var(--ease), border-color var(--ease), background var(--ease); } .activity-row:hover { transform:translateX(4px); border-color:rgba(59,130,246,0.18); background:rgba(59,130,246,0.06); } .activity-copy { display:flex; align-items:center; gap:12px; }
  .table-wrap { overflow:hidden; border-radius:24px; border:1px solid var(--border); background:rgba(18,20,26,0.9); } table { width:100%; border-collapse:collapse; font-size:14px; } thead th { padding:14px 16px; text-align:left; color:var(--muted); font-weight:500; background:rgba(255,255,255,0.025); border-bottom:1px solid var(--border); white-space:nowrap; } tbody td { padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; } tbody tr { transition:background var(--ease); } tbody tr:hover { background:rgba(255,255,255,0.02); }
  .checkbox { width:16px; height:16px; accent-color:var(--blue); } .lead-name { display:flex; align-items:center; gap:10px; } .badge { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:6px 10px; border-radius:999px; font-size:12px; font-weight:700; } .progress { width:100%; height:8px; border-radius:999px; background:rgba(255,255,255,0.06); overflow:hidden; } .progress span { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg, var(--blue), var(--green)); }
  .table-actions { display:flex; gap:8px; } .ghost-icon { width:34px; height:34px; border-radius:12px; display:grid; place-items:center; border:1px solid var(--border); color:var(--muted); background:rgba(255,255,255,0.025); cursor:pointer; transition:transform var(--ease), color var(--ease), border-color var(--ease), background var(--ease); } .ghost-icon:hover { color:var(--text); transform:translateY(-2px); border-color:rgba(59,130,246,0.24); background:rgba(59,130,246,0.08); }
  .bulk-toolbar,.table-footer,.period-switch { margin-top:16px; display:flex; align-items:center; justify-content:space-between; gap:12px; } .toolbar-actions,.period-switch,.pagination { display:flex; align-items:center; gap:10px; }
  .toolbar-btn,.primary-btn,.ghost-btn,.period-btn { padding:12px 14px; border-radius:14px; border:1px solid var(--border); cursor:pointer; color:var(--text); transition:transform var(--ease), border-color var(--ease), background var(--ease), box-shadow var(--ease); } .toolbar-btn:hover,.ghost-btn:hover,.period-btn:hover,.primary-btn:hover { transform:translateY(-2px); } .toolbar-btn,.ghost-btn,.period-btn { background:rgba(255,255,255,0.04); } .period-btn.active,.primary-btn { background:linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9)); border-color:rgba(59,130,246,0.38); box-shadow:0 18px 38px rgba(59,130,246,0.24); }
  .lead-grid { display:grid; grid-template-columns:repeat(5, minmax(240px, 1fr)); gap:16px; align-items:start; } .pipeline-column { min-height:640px; max-height:700px; padding:16px; border-radius:24px; border:1px solid var(--border); background:rgba(18,20,26,0.92); } .pipeline-column-body { display:grid; gap:12px; margin-top:16px; max-height:590px; overflow:auto; padding-right:4px; } .deal-card { padding:14px; border-radius:18px; border:1px solid var(--border); background:rgba(255,255,255,0.03); cursor:grab; transition:transform var(--ease), box-shadow var(--ease), border-color var(--ease), background var(--ease); } .deal-card:hover { transform:translateY(-2px); border-color:rgba(59,130,246,0.22); box-shadow:var(--shadow-blue); background:rgba(59,130,246,0.08); } .deal-card.dragging { opacity:0.55; }
  .deal-title { display:flex; align-items:start; justify-content:space-between; gap:10px; margin-bottom:10px; } .deal-value { font-family:"Space Grotesk",sans-serif; font-size:22px; } .deal-tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; } .tag { padding:5px 10px; border-radius:999px; font-size:11px; font-weight:700; background:rgba(255,255,255,0.05); color:var(--muted); }
  .calendar-panel { padding:20px; } .calendar-grid { display:grid; grid-template-columns:repeat(7, minmax(0, 1fr)); gap:10px; margin-top:18px; } .calendar-weekday,.calendar-day { min-height:74px; padding:12px; border-radius:16px; border:1px solid var(--border); background:rgba(255,255,255,0.025); } .calendar-weekday { min-height:auto; padding:10px; text-align:center; color:var(--muted); } .calendar-day.active { border-color:rgba(59,130,246,0.3); background:rgba(59,130,246,0.12); box-shadow:inset 0 0 0 1px rgba(59,130,246,0.18); } .calendar-markers { display:flex; gap:6px; margin-top:12px; flex-wrap:wrap; } .calendar-marker { width:8px; height:8px; border-radius:999px; }
  .appointment-list { padding:20px; } .appointment-card { padding:16px; border-radius:18px; border:1px solid var(--border); background:rgba(255,255,255,0.03); display:grid; gap:10px; transition:transform var(--ease), border-color var(--ease), background var(--ease); } .appointment-card:hover { transform:translateX(4px); border-color:rgba(59,130,246,0.18); background:rgba(59,130,246,0.06); } .appointment-card.overdue { border-color:rgba(239,68,68,0.24); background:rgba(239,68,68,0.08); } .appointment-top { display:flex; align-items:start; justify-content:space-between; gap:12px; } .appointment-meta { display:flex; align-items:center; gap:14px; color:var(--muted); font-size:13px; flex-wrap:wrap; }
  .report-card { padding:20px; min-height:340px; } .recharts-tooltip-wrapper .custom-tooltip { padding:12px; border-radius:16px; border:1px solid var(--border); background:rgba(15,17,22,0.96); box-shadow:var(--shadow); }
  .modal-overlay { position:fixed; inset:0; z-index:50; display:grid; place-items:center; padding:24px; background:rgba(4,6,11,0.72); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); } .modal-card { width:min(860px, 100%); border-radius:28px; border:1px solid var(--border); background:linear-gradient(180deg, rgba(28,31,40,0.95), rgba(18,20,26,0.98)); box-shadow:var(--shadow); animation:modalIn 220ms ease; } .modal-header,.modal-footer { padding:20px 22px; display:flex; align-items:center; justify-content:space-between; gap:14px; border-bottom:1px solid var(--border); } .modal-footer { border-bottom:none; border-top:1px solid var(--border); } .modal-body { padding:20px 22px; }
  .form-grid { display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:16px; } .field-wrap { display:grid; gap:8px; } .field-wrap.full { grid-column:1 / -1; } .label { font-size:13px; color:var(--muted); } .field.error,.textarea.error,.select.error { border-color:rgba(239,68,68,0.5); box-shadow:0 0 0 4px rgba(239,68,68,0.12); } .error-msg { color:#FCA5A5; font-size:12px; }
  .toast-stack { position:fixed; right:24px; bottom:24px; z-index:60; display:grid; gap:12px; width:360px; } .toast { position:relative; overflow:hidden; padding:16px; border-radius:18px; border:1px solid var(--border); background:rgba(18,20,26,0.94); box-shadow:var(--shadow); animation:toastIn 240ms ease; } .toast-head { display:flex; align-items:start; justify-content:space-between; gap:12px; } .toast-copy { display:flex; align-items:start; gap:12px; } .toast-progress { position:absolute; left:0; bottom:0; height:4px; background:currentColor; animation:toastTimer linear forwards; }
  @keyframes pulse { 0% { box-shadow:0 0 0 0 rgba(16,185,129,0.45); } 70% { box-shadow:0 0 0 12px rgba(16,185,129,0); } 100% { box-shadow:0 0 0 0; } } @keyframes modalIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } } @keyframes toastIn { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } } @keyframes toastTimer { from { width:100%; } to { width:0; } }
`;

export const sectionMeta = {
  dashboard: { label: "Dashboard", icon: LayoutDashboard, count: null },
  leads: { label: "Leads", icon: Users, count: 7 },
  clientes: { label: "Clientes", icon: Briefcase, count: null },
  pipeline: { label: "Pipeline", icon: KanbanSquare, count: 3 },
  atividades: { label: "Atividades", icon: CalendarDays, count: 5 },
  relatorios: { label: "Relatórios", icon: BarChart3, count: null },
  configuracoes: { label: "Configurações", icon: Settings, count: null },
};

export const kpiData = [
  { key: "leads", label: "Total de Leads", value: "1.284", delta: "+12%", positive: true, icon: Users, color: "rgba(59,130,246,0.18)", stroke: "#3B82F6", spark: [42, 48, 46, 53, 59, 57, 63] },
  { key: "clients", label: "Clientes Ativos", value: "347", delta: "+5%", positive: true, icon: Briefcase, color: "rgba(16,185,129,0.18)", stroke: "#10B981", spark: [24, 27, 28, 31, 33, 34, 35] },
  { key: "revenue", label: "Receita do Mês", value: "R$ 128.400", delta: "+8,3%", positive: true, icon: Sparkles, color: "rgba(139,92,246,0.18)", stroke: "#8B5CF6", spark: [80, 86, 84, 91, 95, 102, 108] },
  { key: "conversion", label: "Taxa de Conversão", value: "27,1%", delta: "-1,2%", positive: false, icon: Activity, color: "rgba(239,68,68,0.16)", stroke: "#EF4444", spark: [28, 29, 28.7, 28.2, 27.9, 27.5, 27.1] },
];

export const funnelData = [
  { stage: "Prospecção", value: 128, pct: 100, color: "#667085" },
  { stage: "Qualificação", value: 92, pct: 71.9, color: "#3B82F6" },
  { stage: "Proposta", value: 67, pct: 52.3, color: "#8B5CF6" },
  { stage: "Negociação", value: 41, pct: 32.0, color: "#F59E0B" },
  { stage: "Fechado-Ganho", value: 29, pct: 22.6, color: "#10B981" },
  { stage: "Fechado-Perdido", value: 12, pct: 9.4, color: "#EF4444" },
];

export const recentActivities = [
  { lead: "Mariana Freitas", action: "Ligação realizada", time: "há 12 min", owner: "VS", company: "Aurora Saúde" },
  { lead: "Caio Nogueira", action: "E-mail enviado", time: "há 27 min", owner: "LR", company: "Nexa Jurídico" },
  { lead: "Fernanda Lima", action: "Reunião agendada", time: "há 54 min", owner: "AS", company: "Studio Movo" },
  { lead: "Ricardo Bastos", action: "Proposta enviada", time: "há 1h", owner: "FS", company: "Bluenet Logística" },
  { lead: "Paula Mendes", action: "Ligação realizada", time: "há 2h", owner: "MC", company: "Vitta Prime" },
  { lead: "Gustavo Leal", action: "E-mail enviado", time: "há 3h", owner: "LR", company: "Terral Agro" },
];

export const leadSeed = [
  ["Mariana Freitas", "Aurora Saúde", "CEO", "mariana@aurorasaude.com.br", "(11) 99821-2041", "Novo", "Orgânico", "2026-03-03", 82],
  ["Caio Nogueira", "Nexa Jurídico", "Diretor Comercial", "caio@nexajuridico.com.br", "(21) 99711-8832", "Contatado", "LinkedIn", "2026-03-04", 64],
  ["Fernanda Lima", "Studio Movo", "Head de Marketing", "fernanda@studiomovo.com.br", "(31) 99312-1108", "Qualificado", "Indicação", "2026-03-05", 91],
  ["Ricardo Bastos", "Bluenet Logística", "COO", "ricardo@bluenetlog.com.br", "(41) 98872-0021", "Qualificado", "Google Ads", "2026-03-06", 78],
  ["Paula Mendes", "Vitta Prime", "Diretora", "paula@vittaprime.com.br", "(11) 98923-5524", "Novo", "Orgânico", "2026-03-07", 58],
  ["Gustavo Leal", "Terral Agro", "Gerente de Expansão", "gustavo@terralagro.com.br", "(62) 99211-3501", "Contatado", "LinkedIn", "2026-03-07", 69],
  ["Aline Costa", "Nexo Educação", "Coordenadora", "aline@nexoeducacao.com.br", "(19) 99723-7742", "Desqualificado", "Orgânico", "2026-03-08", 31],
  ["Diego Ramos", "Construtora Verona", "Sócio", "diego@veronaobra.com.br", "(47) 99618-4409", "Qualificado", "Indicação", "2026-03-08", 87],
  ["Juliana Prado", "Mercato Foods", "CMO", "juliana@mercatofoods.com.br", "(51) 99134-7204", "Contatado", "Google Ads", "2026-03-09", 73],
  ["Bruno Teles", "Orbe Tech", "Founder", "bruno@orbetech.com.br", "(11) 99411-3417", "Novo", "LinkedIn", "2026-03-10", 62],
  ["Tatiane Rocha", "Lumen Clinic", "Gestora", "tatiane@lumenclinic.com.br", "(85) 99811-5510", "Qualificado", "Indicação", "2026-03-11", 84],
  ["Pedro Alencar", "Sabiá Finance", "Head de Operações", "pedro@sabiafinance.com.br", "(61) 99270-2218", "Contatado", "Orgânico", "2026-03-12", 66],
  ["Isabela Moura", "Urban Co", "Diretora de Growth", "isabela@urbanco.com.br", "(48) 99911-6432", "Novo", "Google Ads", "2026-03-12", 55],
  ["Vinicius Arantes", "Selva Energia", "Executivo de Conta", "vinicius@selvaenergia.com.br", "(31) 99882-7765", "Contatado", "LinkedIn", "2026-03-13", 75],
  ["Renata Farias", "Clínica Alume", "Sócia", "renata@alume.med.br", "(27) 99771-6623", "Qualificado", "Indicação", "2026-03-14", 88],
  ["Lucas Peixoto", "Grupo Trino", "Diretor Financeiro", "lucas@grupotrino.com.br", "(71) 99920-5538", "Desqualificado", "Google Ads", "2026-03-14", 24],
  ["Camila Xavier", "Bossa Retail", "Head Comercial", "camila@bossaretail.com.br", "(21) 99810-4421", "Qualificado", "LinkedIn", "2026-03-15", 92],
  ["Eduardo Rezende", "Matriz Seguros", "Gerente", "eduardo@matrizseguros.com.br", "(41) 99118-1991", "Contatado", "Orgânico", "2026-03-16", 63],
  ["Natália Ribeiro", "Vero Dental", "CEO", "natalia@verodental.com.br", "(11) 99209-8455", "Novo", "Indicação", "2026-03-17", 74],
  ["Rafael Mota", "Porto Verde", "Diretor de Vendas", "rafael@portoverde.com.br", "(51) 99731-1184", "Qualificado", "Google Ads", "2026-03-17", 81],
  ["Beatriz Salles", "Tacto Design", "Product Lead", "beatriz@tactodesign.com.br", "(31) 99387-3329", "Contatado", "LinkedIn", "2026-03-18", 67],
  ["Henrique Duarte", "Atlas Pharma", "COO", "henrique@atlaspharma.com.br", "(11) 99012-6331", "Novo", "Orgânico", "2026-03-19", 59],
  ["Larissa Queiroz", "Prisma Engenharia", "Diretora", "larissa@prismaeng.com.br", "(85) 99730-5104", "Qualificado", "Indicação", "2026-03-19", 90],
  ["Murilo Braga", "Cora Imóveis", "Gerente de Produto", "murilo@coraimoveis.com.br", "(62) 99944-8821", "Contatado", "Google Ads", "2026-03-20", 61],
];

export const pipelineColumns = [
  { id: "prospeccao", label: "Prospecção", color: "#667085" },
  { id: "qualificacao", label: "Qualificação", color: "#3B82F6" },
  { id: "proposta", label: "Proposta", color: "#8B5CF6" },
  { id: "negociacao", label: "Negociação", color: "#F59E0B" },
  { id: "fechado", label: "Fechado", color: "#10B981" },
];

export const pipelineSeed = [
  { id: "d1", stage: "prospeccao", company: "Orizon Health", contact: "Marília Torres", value: 24000, probability: 25, owner: "AS", closeDate: "04 abr", tags: ["Enterprise"] },
  { id: "d2", stage: "prospeccao", company: "Grupo Brava", contact: "Henrique Porto", value: 18000, probability: 20, owner: "LR", closeDate: "09 abr", tags: ["Novo"] },
  { id: "d3", stage: "qualificacao", company: "Mova Capital", contact: "Alice Nunes", value: 36000, probability: 45, owner: "VS", closeDate: "12 abr", tags: ["Renovação"] },
  { id: "d4", stage: "qualificacao", company: "Lume Odonto", contact: "Patrícia Rosa", value: 14200, probability: 40, owner: "MC", closeDate: "15 abr", tags: ["Mid-market"] },
  { id: "d5", stage: "proposta", company: "Quanta Legal", contact: "Diego Cruz", value: 54000, probability: 65, owner: "AS", closeDate: "18 abr", tags: ["Enterprise", "Consultoria"] },
  { id: "d6", stage: "proposta", company: "Nativa Farma", contact: "Juliana Reis", value: 22800, probability: 58, owner: "LR", closeDate: "21 abr", tags: ["Expansão"] },
  { id: "d7", stage: "negociacao", company: "Verve Clínica", contact: "Carla Teixeira", value: 31000, probability: 78, owner: "FS", closeDate: "26 abr", tags: ["Urgente"] },
  { id: "d8", stage: "negociacao", company: "Sfera Log", contact: "Bruno Lapa", value: 42000, probability: 83, owner: "VS", closeDate: "30 abr", tags: ["Enterprise"] },
  { id: "d9", stage: "fechado", company: "Prisma Saúde", contact: "Ana Valença", value: 27000, probability: 100, owner: "AS", closeDate: "Concluído", tags: ["Ganho"] },
  { id: "d10", stage: "fechado", company: "Cortez Engenharia", contact: "Eduardo Castro", value: 19400, probability: 100, owner: "MC", closeDate: "Concluído", tags: ["Ganho"] },
  { id: "d11", stage: "prospeccao", company: "Urban Pulse", contact: "Rodrigo Mello", value: 16700, probability: 18, owner: "LR", closeDate: "06 abr", tags: ["SMB"] },
  { id: "d12", stage: "proposta", company: "Kora Medical", contact: "Tatiana Luz", value: 47000, probability: 61, owner: "FS", closeDate: "20 abr", tags: ["Enterprise"] },
];

export const appointmentsSeed = [
  { id: "a1", type: "Ligação", icon: Phone, title: "Follow-up com Aurora Saúde", lead: "Mariana Freitas", owner: "Ana Souza", date: "28 mar · 09:30", status: "Pendente" },
  { id: "a2", type: "E-mail", icon: Mail, title: "Enviar proposta para Quanta Legal", lead: "Diego Cruz", owner: "Larissa Rocha", date: "28 mar · 11:00", status: "Concluída" },
  { id: "a3", type: "Reunião", icon: CalendarClock, title: "Discovery com Grupo Brava", lead: "Henrique Porto", owner: "Victor Santos", date: "28 mar · 14:00", status: "Pendente" },
  { id: "a4", type: "Tarefa", icon: Check, title: "Atualizar CRM da conta Vero Dental", lead: "Natália Ribeiro", owner: "Marina Costa", date: "27 mar · 17:00", status: "Atrasada" },
  { id: "a5", type: "Ligação", icon: Phone, title: "Reativação de lead da Mercato Foods", lead: "Juliana Prado", owner: "Felipe Silva", date: "29 mar · 10:15", status: "Pendente" },
  { id: "a6", type: "Reunião", icon: CalendarClock, title: "Apresentação executiva com Sfera Log", lead: "Bruno Lapa", owner: "Ana Souza", date: "30 mar · 16:00", status: "Pendente" },
  { id: "a7", type: "E-mail", icon: Mail, title: "Resumo pós-call para Cora Imóveis", lead: "Murilo Braga", owner: "Larissa Rocha", date: "26 mar · 18:30", status: "Atrasada" },
];

export const reportDataByPeriod = {
  "7d": {
    source: [
      { name: "Orgânico", value: 28, color: "#3B82F6" },
      { name: "Indicação", value: 18, color: "#10B981" },
      { name: "LinkedIn", value: 14, color: "#8B5CF6" },
      { name: "Google Ads", value: 22, color: "#F59E0B" },
    ],
    conversion: [
      { month: "Out", leads: 44, converted: 11 },
      { month: "Nov", leads: 48, converted: 14 },
      { month: "Dez", leads: 52, converted: 17 },
      { month: "Jan", leads: 50, converted: 18 },
      { month: "Fev", leads: 56, converted: 20 },
      { month: "Mar", leads: 61, converted: 21 },
    ],
    sellers: [
      { name: "Ana Souza", value: 18 },
      { name: "Larissa Rocha", value: 15 },
      { name: "Victor Santos", value: 13 },
      { name: "Marina Costa", value: 10 },
    ],
  },
  "30d": {
    source: [
      { name: "Orgânico", value: 88, color: "#3B82F6" },
      { name: "Indicação", value: 54, color: "#10B981" },
      { name: "LinkedIn", value: 46, color: "#8B5CF6" },
      { name: "Google Ads", value: 69, color: "#F59E0B" },
    ],
    conversion: [
      { month: "Out", leads: 120, converted: 28 },
      { month: "Nov", leads: 133, converted: 32 },
      { month: "Dez", leads: 138, converted: 36 },
      { month: "Jan", leads: 142, converted: 39 },
      { month: "Fev", leads: 149, converted: 41 },
      { month: "Mar", leads: 158, converted: 43 },
    ],
    sellers: [
      { name: "Ana Souza", value: 46 },
      { name: "Larissa Rocha", value: 38 },
      { name: "Victor Santos", value: 34 },
      { name: "Marina Costa", value: 28 },
    ],
  },
  "3m": {
    source: [
      { name: "Orgânico", value: 202, color: "#3B82F6" },
      { name: "Indicação", value: 118, color: "#10B981" },
      { name: "LinkedIn", value: 96, color: "#8B5CF6" },
      { name: "Google Ads", value: 161, color: "#F59E0B" },
    ],
    conversion: [
      { month: "Out", leads: 312, converted: 74 },
      { month: "Nov", leads: 328, converted: 82 },
      { month: "Dez", leads: 340, converted: 88 },
      { month: "Jan", leads: 356, converted: 97 },
      { month: "Fev", leads: 369, converted: 102 },
      { month: "Mar", leads: 381, converted: 108 },
    ],
    sellers: [
      { name: "Ana Souza", value: 112 },
      { name: "Larissa Rocha", value: 98 },
      { name: "Victor Santos", value: 87 },
      { name: "Marina Costa", value: 74 },
    ],
  },
  "12m": {
    source: [
      { name: "Orgânico", value: 654, color: "#3B82F6" },
      { name: "Indicação", value: 390, color: "#10B981" },
      { name: "LinkedIn", value: 318, color: "#8B5CF6" },
      { name: "Google Ads", value: 522, color: "#F59E0B" },
    ],
    conversion: [
      { month: "Out", leads: 1080, converted: 282 },
      { month: "Nov", leads: 1136, converted: 296 },
      { month: "Dez", leads: 1182, converted: 308 },
      { month: "Jan", leads: 1218, converted: 320 },
      { month: "Fev", leads: 1260, converted: 334 },
      { month: "Mar", leads: 1284, converted: 347 },
    ],
    sellers: [
      { name: "Ana Souza", value: 382 },
      { name: "Larissa Rocha", value: 344 },
      { name: "Victor Santos", value: 316 },
      { name: "Marina Costa", value: 270 },
    ],
  },
};

export const calendarDays = [
  null, null, null, null, null, { day: 1 }, { day: 2 },
  { day: 3, marks: ["#3B82F6"] }, { day: 4 }, { day: 5 }, { day: 6, marks: ["#F59E0B"] }, { day: 7 }, { day: 8 }, { day: 9 },
  { day: 10 }, { day: 11 }, { day: 12, marks: ["#10B981", "#3B82F6"] }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 },
  { day: 17 }, { day: 18 }, { day: 19 }, { day: 20, marks: ["#3B82F6"] }, { day: 21 }, { day: 22 }, { day: 23 },
  { day: 24 }, { day: 25 }, { day: 26, marks: ["#EF4444"] }, { day: 27, marks: ["#EF4444", "#10B981"] }, { day: 28, active: true, marks: ["#3B82F6", "#10B981"] }, { day: 29 }, { day: 30 },
];

export const sourceOptions = ["Todos", "Orgânico", "Indicação", "LinkedIn", "Google Ads"];
export const statusOptions = ["Todos", "Novo", "Contatado", "Qualificado", "Desqualificado"];
export const activityTypeOptions = ["Todos", "Ligação", "E-mail", "Reunião", "Tarefa"];
export const activityStatusOptions = ["Todos", "Pendente", "Concluída", "Atrasada"];
export const owners = ["Todos", "Ana Souza", "Larissa Rocha", "Victor Santos", "Marina Costa", "Felipe Silva"];
