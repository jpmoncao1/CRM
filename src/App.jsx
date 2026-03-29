import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import {
  Bell,
  CircleHelp,
  Eye,
  GripVertical,
  Pencil,
  Plus,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import {
  activityStatusOptions,
  activityTypeOptions,
  appointmentsSeed,
  calendarDays,
  funnelData,
  kpiData,
  leadSeed,
  owners,
  pipelineColumns,
  pipelineSeed,
  recentActivities,
  reportDataByPeriod,
  sectionMeta,
  sourceOptions,
  statusOptions,
  themeCss,
} from "./data/crmData.js";
import { formatBRL, hashColor, initials, statusBadge } from "./utils/crmUtils.js";
import {
  Field,
  ModalShell,
  PipelineOverviewChart,
  SelectField,
  SortableHead,
  Sparkline,
  TextAreaField,
  ToastStack,
} from "./components/ui.jsx";

const ReportsSection = lazy(() => import("./components/ReportsSection.jsx"));

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [globalSearch, setGlobalSearch] = useState("");
  const [toasts, setToasts] = useState([]);
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatus, setLeadStatus] = useState("Todos");
  const [leadSource, setLeadSource] = useState("Todos");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", dir: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [leadErrors, setLeadErrors] = useState({});
  const [activityErrors, setActivityErrors] = useState({});
  const [period, setPeriod] = useState("30d");
  const [activityTypeFilter, setActivityTypeFilter] = useState("Todos");
  const [activityStatusFilter, setActivityStatusFilter] = useState("Todos");
  const [activityOwnerFilter, setActivityOwnerFilter] = useState("Todos");
  const [pipelineDeals, setPipelineDeals] = useState(() => pipelineSeed.map((deal) => ({ ...deal })));
  const [draggingDealId, setDraggingDealId] = useState(null);
  const [activities, setActivities] = useState(appointmentsSeed);
  const [leadForm, setLeadForm] = useState({ name: "", company: "", email: "", phone: "", role: "", source: "Orgânico", status: "Novo", notes: "" });
  const [activityForm, setActivityForm] = useState({ type: "Ligação", title: "", lead: "", owner: "Ana Souza", date: "", status: "Pendente" });

  const allLeads = useMemo(
    () =>
      leadSeed.map(([name, company, role, email, phone, status, source, createdAt, score], index) => ({
        id: `l${index + 1}`,
        name,
        company,
        role,
        email,
        phone,
        status,
        source,
        createdAt,
        score,
      })),
    []
  );
  const [leads, setLeads] = useState(allLeads);

  const breadcrumb = useMemo(() => ["NexCRM", sectionMeta[activeSection]?.label || "Dashboard"], [activeSection]);
  const searchPlaceholders = useMemo(() => ["Buscar lead, empresa ou contato", "Pesquisar pipeline e atividades", "Encontrar relatórios e métricas"], []);

  useEffect(() => {
    const timer = setInterval(() => setPlaceholderIndex((current) => (current + 1) % searchPlaceholders.length), 2500);
    return () => clearInterval(timer);
  }, [searchPlaceholders.length]);

  const pushToast = useCallback((type, title, message) => {
    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, type, title, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4000);
  }, []);

  const dismissToast = useCallback((id) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);

  const filteredLeads = useMemo(() => {
    const query = leadSearch.trim().toLowerCase();
    const sorted = [...leads].filter((lead) => {
      const matchSearch = !query || lead.name.toLowerCase().includes(query) || lead.company.toLowerCase().includes(query);
      const matchStatus = leadStatus === "Todos" || lead.status === leadStatus;
      const matchSource = leadSource === "Todos" || lead.source === leadSource;
      return matchSearch && matchStatus && matchSource;
    });
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const compare = typeof aValue === "number" ? aValue - bValue : String(aValue).localeCompare(String(bValue), "pt-BR");
      return sortConfig.dir === "asc" ? compare : -compare;
    });
    return sorted;
  }, [leadSearch, leadSource, leadStatus, leads, sortConfig]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const paginatedLeads = useMemo(() => filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize), [currentPage, filteredLeads]);

  useEffect(() => setCurrentPage(1), [leadSearch, leadSource, leadStatus]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const leadsRange = useMemo(() => {
    if (!filteredLeads.length) return "0–0 de 0";
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, filteredLeads.length);
    return `${start}–${end} de ${filteredLeads.length}`;
  }, [currentPage, filteredLeads.length]);

  const filteredActivities = useMemo(
    () =>
      activities.filter((item) => {
        const matchType = activityTypeFilter === "Todos" || item.type === activityTypeFilter;
        const matchStatus = activityStatusFilter === "Todos" || item.status === activityStatusFilter;
        const matchOwner = activityOwnerFilter === "Todos" || item.owner === activityOwnerFilter;
        return matchType && matchStatus && matchOwner;
      }),
    [activities, activityOwnerFilter, activityStatusFilter, activityTypeFilter]
  );

  const reportData = useMemo(() => reportDataByPeriod[period], [period]);
  const columnStats = useMemo(
    () =>
      pipelineColumns.reduce((acc, column) => {
        const items = pipelineDeals.filter((deal) => deal.stage === column.id);
        acc[column.id] = { count: items.length, total: items.reduce((sum, deal) => sum + deal.value, 0) };
        return acc;
      }, {}),
    [pipelineDeals]
  );

  const updateLeadForm = useCallback((field, value) => {
    setLeadForm((current) => ({ ...current, [field]: value }));
    setLeadErrors((current) => ({ ...current, [field]: undefined }));
  }, []);

  const updateActivityForm = useCallback((field, value) => {
    setActivityForm((current) => ({ ...current, [field]: value }));
    setActivityErrors((current) => ({ ...current, [field]: undefined }));
  }, []);

  const toggleLeadSelection = useCallback((leadId) => {
    setSelectedLeads((current) => (current.includes(leadId) ? current.filter((id) => id !== leadId) : [...current, leadId]));
  }, []);

  const toggleSelectPage = useCallback(() => {
    const pageIds = paginatedLeads.map((lead) => lead.id);
    const allSelected = pageIds.every((id) => selectedLeads.includes(id));
    setSelectedLeads((current) => (allSelected ? current.filter((id) => !pageIds.includes(id)) : [...new Set([...current, ...pageIds])]));
  }, [paginatedLeads, selectedLeads]);

  const handleSort = useCallback((key) => setSortConfig((current) => ({ key, dir: current.key === key && current.dir === "asc" ? "desc" : "asc" })), []);

  const deleteSelectedLeads = useCallback(() => {
    setLeads((current) => current.filter((lead) => !selectedLeads.includes(lead.id)));
    pushToast("warning", "Leads removidos", `${selectedLeads.length} lead(s) excluído(s) da lista.`);
    setSelectedLeads([]);
  }, [pushToast, selectedLeads]);

  const bulkQualify = useCallback(() => {
    setLeads((current) => current.map((lead) => (selectedLeads.includes(lead.id) ? { ...lead, status: "Qualificado" } : lead)));
    pushToast("info", "Status atualizado", "Os leads selecionados foram movidos para Qualificado.");
    setSelectedLeads([]);
  }, [pushToast, selectedLeads]);

  const saveLead = useCallback(() => {
    const nextErrors = {};
    ["name", "company", "email", "phone"].forEach((field) => {
      if (!leadForm[field].trim()) nextErrors[field] = "Campo obrigatório.";
    });
    if (Object.keys(nextErrors).length) {
      setLeadErrors(nextErrors);
      pushToast("error", "Validação incompleta", "Revise os campos obrigatórios antes de salvar.");
      return;
    }
    const newLead = { id: `l${Date.now()}`, name: leadForm.name, company: leadForm.company, role: leadForm.role || "Contato comercial", email: leadForm.email, phone: leadForm.phone, status: leadForm.status, source: leadForm.source, createdAt: "2026-03-28", score: 72 };
    setLeads((current) => [newLead, ...current]);
    setShowLeadModal(false);
    setLeadForm({ name: "", company: "", email: "", phone: "", role: "", source: "Orgânico", status: "Novo", notes: "" });
    pushToast("success", "Lead salvo", `${newLead.name} foi adicionado com sucesso.`);
  }, [leadForm, pushToast]);

  const saveActivity = useCallback(() => {
    const nextErrors = {};
    ["title", "lead", "date"].forEach((field) => {
      if (!activityForm[field].trim()) nextErrors[field] = "Campo obrigatório.";
    });
    if (Object.keys(nextErrors).length) {
      setActivityErrors(nextErrors);
      pushToast("error", "Atividade incompleta", "Preencha os campos obrigatórios para continuar.");
      return;
    }
    const iconMap = { Ligação: appointmentsSeed[0].icon, "E-mail": appointmentsSeed[1].icon, Reunião: appointmentsSeed[2].icon, Tarefa: appointmentsSeed[3].icon };
    setActivities((current) => [{ id: `a${Date.now()}`, type: activityForm.type, icon: iconMap[activityForm.type], title: activityForm.title, lead: activityForm.lead, owner: activityForm.owner, date: activityForm.date, status: activityForm.status }, ...current]);
    setShowActivityModal(false);
    setActivityForm({ type: "Ligação", title: "", lead: "", owner: "Ana Souza", date: "", status: "Pendente" });
    pushToast("success", "Atividade criada", "A nova atividade já está visível no calendário operacional.");
  }, [activityForm, pushToast]);

  const handleDropDeal = useCallback((targetStage) => {
    if (!draggingDealId) return;
    setPipelineDeals((current) => current.map((deal) => (deal.id === draggingDealId ? { ...deal, stage: targetStage } : deal)));
    const column = pipelineColumns.find((item) => item.id === targetStage);
    pushToast("success", "Pipeline atualizado", `Lead movido para ${column?.label} com sucesso.`);
    setDraggingDealId(null);
  }, [draggingDealId, pushToast]);

  return (
    <>
      <style>{themeCss}</style>
      <div className="app">
        <aside className="sidebar glass" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="brand">
            <div className="brand-mark">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M10 32.5V15.5L24 7.5L38 15.5V32.5L24 40.5L10 32.5Z" stroke="#60A5FA" strokeWidth="2.2" />
                <path d="M24 7.5V40.5" stroke="#60A5FA" strokeWidth="2.2" />
                <path d="M10 15.5L24 24L38 15.5" stroke="#93C5FD" strokeWidth="2.2" />
              </svg>
            </div>
            <div><div className="eyebrow">Revenue OS</div><h1>NexCRM</h1></div>
          </div>

          <div className="nav">
            {Object.entries(sectionMeta).map(([key, item]) => {
              const Icon = item.icon;
              return (
                <button key={key} className={`nav-item ${activeSection === key ? "active" : ""}`} onClick={() => setActiveSection(key)} type="button">
                  <div className="nav-left"><Icon size={18} /><span>{item.label}</span></div>
                  {item.count ? <span className="badge-dot">{item.count}</span> : null}
                </button>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <div className="avatar" style={{ background: `linear-gradient(135deg, ${hashColor("Ana Souza")} 0%, #111827 140%)` }}>AS</div>
            <div><div style={{ fontWeight: 700 }}>Ana Souza</div><div className="muted" style={{ fontSize: 13 }}>Admin</div></div>
          </div>
        </aside>

        <main className="main">
          <header className="topbar glass">
            <div className="topbar-meta">
              <div className="breadcrumb">{breadcrumb.map((item, index) => <React.Fragment key={item}><span>{item}</span>{index < breadcrumb.length - 1 ? <span className="muted">/</span> : null}</React.Fragment>)}</div>
              <h3>{sectionMeta[activeSection]?.label}</h3>
            </div>
            <div className="topbar-actions">
              <div className="searchbar"><Search size={16} className="search-icon" /><input value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder={searchPlaceholders[placeholderIndex]} /></div>
              <div className="pulse" />
              <button className="icon-btn" type="button"><Bell size={18} /><span className="badge-dot" style={{ position: "absolute", top: -4, right: -4 }}>4</span></button>
              <button className="icon-btn" type="button"><CircleHelp size={18} /></button>
              <button className="icon-btn" type="button"><Users size={18} /></button>
            </div>
          </header>

          {activeSection === "dashboard" && (
            <section>
              <div className="section-title"><div><p className="eyebrow">Visão executiva</p><h2>Performance comercial em tempo real</h2></div><div className="muted">Atualizado hoje às 08:42</div></div>
              <div className="grid-4">
                {kpiData.map((card) => {
                  const Icon = card.icon;
                  return <div key={card.key} className="kpi-card glass"><div className="kpi-head"><div><div className="muted">{card.label}</div><div className="kpi-value">{card.value}</div></div><div className="kpi-icon" style={{ background: card.color, color: card.stroke }}><Icon size={20} /></div></div><div className={`delta ${card.positive ? "positive" : "negative"}`}><ChevronUp size={14} style={{ transform: card.positive ? "none" : "rotate(180deg)" }} />{card.delta} vs mês anterior</div><Sparkline data={card.spark} stroke={card.stroke} /></div>;
                })}
              </div>
              <div className="dashboard-bottom" style={{ marginTop: 18 }}>
                <div className="panel"><div className="panel-inner"><div className="section-title" style={{ marginBottom: 0 }}><div><p className="eyebrow">Funil</p><h2>Pipeline por estágio</h2></div><div className="muted">Conversão acumulada do mês</div></div><PipelineOverviewChart data={funnelData} /></div></div>
                <div className="panel"><div className="panel-inner"><div className="section-title" style={{ marginBottom: 0 }}><div><p className="eyebrow">Operação</p><h2>Atividades recentes</h2></div></div><div className="activity-list" style={{ marginTop: 18 }}>{recentActivities.map((item) => <div key={`${item.lead}-${item.time}`} className="activity-row"><div className="activity-copy"><div className="avatar" style={{ background: `linear-gradient(135deg, ${hashColor(item.lead)} 0%, rgba(17,24,39,0.9) 150%)` }}>{initials(item.lead)}</div><div><div style={{ fontWeight: 700 }}>{item.lead}</div><div className="muted">{item.action} • {item.company}</div></div></div><div style={{ textAlign: "right" }}><div style={{ fontWeight: 700 }}>{item.owner}</div><div className="muted">{item.time}</div></div></div>)}</div></div></div>
              </div>
            </section>
          )}

          {activeSection === "leads" && (
            <section>
              <div className="section-title"><div><p className="eyebrow">Gestão comercial</p><h2>Leads qualificados com visão operacional</h2></div><button className="primary-btn" type="button" onClick={() => setShowLeadModal(true)}><Plus size={16} style={{ marginRight: 8 }} />Novo Lead</button></div>
              <div className="panel panel-inner">
                <div className="lead-filters"><div className="searchbar" style={{ width: "100%" }}><Search size={16} className="search-icon" /><input value={leadSearch} onChange={(event) => setLeadSearch(event.target.value)} placeholder="Buscar por nome ou empresa" /></div><select className="select" value={leadStatus} onChange={(event) => setLeadStatus(event.target.value)}>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select><select className="select" value={leadSource} onChange={(event) => setLeadSource(event.target.value)}>{sourceOptions.map((option) => <option key={option}>{option}</option>)}</select><div className="muted" style={{ textAlign: "right" }}>{filteredLeads.length} resultados</div></div>
                {selectedLeads.length > 0 && <div className="bulk-toolbar"><div style={{ fontWeight: 700 }}>{selectedLeads.length} selecionado(s)</div><div className="toolbar-actions"><button className="toolbar-btn" type="button" onClick={bulkQualify}>Alterar status</button><button className="toolbar-btn" type="button" onClick={deleteSelectedLeads}>Excluir selecionados</button></div></div>}
                <div className="table-wrap"><table><thead><tr><th><input className="checkbox" type="checkbox" onChange={toggleSelectPage} checked={paginatedLeads.length > 0 && paginatedLeads.every((lead) => selectedLeads.includes(lead.id))} /></th><SortableHead label="Nome" field="name" sortConfig={sortConfig} onSort={handleSort} /><SortableHead label="Empresa" field="company" sortConfig={sortConfig} onSort={handleSort} /><SortableHead label="E-mail" field="email" sortConfig={sortConfig} onSort={handleSort} /><th>Telefone</th><SortableHead label="Status" field="status" sortConfig={sortConfig} onSort={handleSort} /><SortableHead label="Fonte" field="source" sortConfig={sortConfig} onSort={handleSort} /><SortableHead label="Data" field="createdAt" sortConfig={sortConfig} onSort={handleSort} /><SortableHead label="Score" field="score" sortConfig={sortConfig} onSort={handleSort} /><th>Ações</th></tr></thead><tbody>
                  {paginatedLeads.map((lead) => {
                    const badgeStyle = statusBadge(lead.status);
                    return <tr key={lead.id}><td><input className="checkbox" type="checkbox" checked={selectedLeads.includes(lead.id)} onChange={() => toggleLeadSelection(lead.id)} /></td><td><div className="lead-name"><div className="avatar" style={{ background: `linear-gradient(135deg, ${hashColor(lead.name)} 0%, rgba(17,24,39,0.9) 140%)` }}>{initials(lead.name)}</div><div><div style={{ fontWeight: 700 }}>{lead.name}</div><div className="muted">{lead.role}</div></div></div></td><td>{lead.company}</td><td className="muted">{lead.email}</td><td className="muted">{lead.phone}</td><td><span className="badge" style={{ background: badgeStyle.bg, color: badgeStyle.color }}>{lead.status}</span></td><td className="muted">{lead.source}</td><td className="muted">{lead.createdAt.split("-").reverse().join("/")}</td><td style={{ minWidth: 160 }}><div style={{ display: "grid", gap: 8 }}><div className="progress"><span style={{ width: `${lead.score}%` }} /></div><div className="muted">{lead.score}/100</div></div></td><td><div className="table-actions"><button className="ghost-icon" type="button" onClick={() => pushToast("info", "Edição rápida", `Abrir edição de ${lead.name}.`)}><Pencil size={16} /></button><button className="ghost-icon" type="button" onClick={() => pushToast("info", "Detalhes do lead", `${lead.name} • ${lead.company}`)}><Eye size={16} /></button></div></td></tr>;
                  })}
                </tbody></table></div>
                <div className="table-footer"><div className="muted">{leadsRange}</div><div className="pagination"><button className="ghost-icon" type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}><ChevronLeft size={16} /></button><div className="muted">Página {currentPage} de {totalPages}</div><button className="ghost-icon" type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}><ChevronRight size={16} /></button></div></div>
              </div>
            </section>
          )}

          {activeSection === "clientes" && <section><div className="section-title"><div><p className="eyebrow">Relacionamento</p><h2>Carteira ativa com visão de expansão</h2></div></div><div className="grid-4" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>{[{ name: "Orizon Health", plan: "Enterprise", mrr: "R$ 24.000", owner: "Ana Souza", health: "Saudável" }, { name: "Bluenet Logística", plan: "Growth", mrr: "R$ 11.800", owner: "Larissa Rocha", health: "Atenção" }, { name: "Studio Movo", plan: "Premium", mrr: "R$ 18.200", owner: "Victor Santos", health: "Saudável" }].map((client) => <div key={client.name} className="kpi-card"><div className="kpi-head"><div><div style={{ fontWeight: 700, fontSize: 18 }}>{client.name}</div><div className="muted">{client.plan} • responsável {client.owner}</div></div><span className={`badge ${client.health === "Saudável" ? "positive" : "warning"}`}>{client.health}</span></div><div className="kpi-value" style={{ fontSize: 24 }}>{client.mrr}</div><div className="muted">Receita mensal recorrente</div></div>)}</div></section>}

          {activeSection === "pipeline" && (
            <section>
              <div className="section-title"><div><p className="eyebrow">Kanban comercial</p><h2>Negócios em movimento por estágio</h2></div><div className="muted">Arraste os cards entre as colunas para atualizar o board</div></div>
              <div className="lead-grid">
                {pipelineColumns.map((column) => (
                  <div key={column.id} className="pipeline-column" onDragOver={(event) => event.preventDefault()} onDrop={() => handleDropDeal(column.id)}>
                    <div className="pipeline-column-header"><div><div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: column.color, display: "inline-block" }} /><strong>{column.label}</strong><span className="badge" style={{ background: `${column.color}22`, color: column.color }}>{columnStats[column.id].count}</span></div><div className="muted" style={{ marginTop: 6 }}>{formatBRL(columnStats[column.id].total)}</div></div><button className="ghost-icon" type="button" onClick={() => pushToast("info", "Ação rápida", `Adicionar card em ${column.label}.`)}><Plus size={16} /></button></div>
                    <div className="pipeline-column-body">{pipelineDeals.filter((deal) => deal.stage === column.id).map((deal) => <div key={deal.id} className={`deal-card ${draggingDealId === deal.id ? "dragging" : ""}`} draggable onDragStart={() => setDraggingDealId(deal.id)} onDragEnd={() => setDraggingDealId(null)}><div className="deal-title"><div><div style={{ fontWeight: 700 }}>{deal.company}</div><div className="muted" style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}><GripVertical size={14} />{deal.contact}</div></div><div className="avatar" style={{ width: 34, height: 34, borderRadius: 12, background: `linear-gradient(135deg, ${hashColor(deal.owner)} 0%, rgba(17,24,39,0.9) 150%)` }}>{deal.owner}</div></div><div className="deal-value">{formatBRL(deal.value)}</div><div className="progress" style={{ marginTop: 12 }}><span style={{ width: `${deal.probability}%`, background: `linear-gradient(90deg, ${column.color}, #10B981)` }} /></div><div className="deal-meta" style={{ marginTop: 12 }}><span className="muted">{deal.probability}% de chance</span><span className="muted">{deal.closeDate}</span></div><div className="deal-tags">{deal.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div></div>)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === "atividades" && (
            <section>
              <div className="section-title"><div><p className="eyebrow">Agenda operacional</p><h2>Compromissos e cadência do time</h2></div><button className="primary-btn" type="button" onClick={() => setShowActivityModal(true)}><Plus size={16} style={{ marginRight: 8 }} />Nova Atividade</button></div>
              <div className="activity-layout">
                <div className="panel calendar-panel"><div className="calendar-header"><div><div className="eyebrow">Calendário</div><h2 style={{ margin: 0 }}>Março 2026</h2></div><div className="muted">28 mar selecionado</div></div><div className="calendar-grid">{["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => <div key={day} className="calendar-weekday">{day}</div>)}{calendarDays.map((entry, index) => entry ? <div key={`${entry.day}-${index}`} className={`calendar-day ${entry.active ? "active" : ""}`}><div style={{ fontWeight: 700 }}>{entry.day}</div><div className="calendar-markers">{entry.marks?.map((color, markerIndex) => <span key={`${entry.day}-${markerIndex}`} className="calendar-marker" style={{ background: color }} />)}</div></div> : <div key={`empty-${index}`} />)}</div></div>
                <div className="panel appointment-list"><div className="section-title"><div><p className="eyebrow">Compromissos</p><h2>Lista de atividades</h2></div></div><div className="lead-filters" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginBottom: 16 }}><select className="select" value={activityTypeFilter} onChange={(event) => setActivityTypeFilter(event.target.value)}>{activityTypeOptions.map((option) => <option key={option}>{option}</option>)}</select><select className="select" value={activityStatusFilter} onChange={(event) => setActivityStatusFilter(event.target.value)}>{activityStatusOptions.map((option) => <option key={option}>{option}</option>)}</select><select className="select" value={activityOwnerFilter} onChange={(event) => setActivityOwnerFilter(event.target.value)}>{owners.map((option) => <option key={option}>{option}</option>)}</select></div><div className="activity-list">{filteredActivities.map((item) => { const Icon = item.icon; const badgeStyle = statusBadge(item.status); return <div key={item.id} className={`appointment-card ${item.status === "Atrasada" ? "overdue" : ""}`}><div className="appointment-top"><div className="activity-copy"><div className="kpi-icon" style={{ width: 42, height: 42, borderRadius: 14, background: `${badgeStyle.color}20`, color: badgeStyle.color }}><Icon size={18} /></div><div><div style={{ fontWeight: 700 }}>{item.title}</div><div className="muted">Lead: <span style={{ color: "#8AB4FF", cursor: "pointer" }}>{item.lead}</span></div></div></div><span className="badge" style={{ background: badgeStyle.bg, color: badgeStyle.color }}>{item.status}</span></div><div className="appointment-meta"><span>{item.type}</span><span>{item.owner}</span><span>{item.date}</span></div></div>; })}</div></div>
              </div>
            </section>
          )}

          {activeSection === "relatorios" && <Suspense fallback={<div className="panel panel-inner"><div className="eyebrow">Relatórios</div><h2 style={{ marginTop: 8 }}>Carregando inteligência comercial...</h2></div>}><ReportsSection period={period} setPeriod={setPeriod} reportData={reportData} /></Suspense>}

          {activeSection === "configuracoes" && <section><div className="section-title"><div><p className="eyebrow">Workspace</p><h2>Configurações da operação</h2></div></div><div className="report-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}><div className="panel panel-inner"><div className="card-title">Preferências gerais</div><div className="muted" style={{ marginTop: 8 }}>Tema escuro premium, notificações em tempo real e permissões por perfil já configuradas.</div></div><div className="panel panel-inner"><div className="card-title">Integrações</div><div className="muted" style={{ marginTop: 8 }}>E-mail, calendário, automação de vendas e dashboard executivo preparados para expansão futura.</div></div></div></section>}
        </main>
      </div>

      {showLeadModal && <ModalShell title="Novo Lead" subtitle="Adicione um novo contato à operação comercial" onClose={() => setShowLeadModal(false)} onConfirm={saveLead} confirmLabel="Salvar Lead"><div className="form-grid"><Field label="Nome" value={leadForm.name} onChange={(value) => updateLeadForm("name", value)} error={leadErrors.name} /><Field label="Empresa" value={leadForm.company} onChange={(value) => updateLeadForm("company", value)} error={leadErrors.company} /><Field label="E-mail" value={leadForm.email} onChange={(value) => updateLeadForm("email", value)} error={leadErrors.email} /><Field label="Telefone" value={leadForm.phone} onChange={(value) => updateLeadForm("phone", value)} error={leadErrors.phone} /><Field label="Cargo" value={leadForm.role} onChange={(value) => updateLeadForm("role", value)} /><SelectField label="Fonte" value={leadForm.source} onChange={(value) => updateLeadForm("source", value)} options={sourceOptions.filter((option) => option !== "Todos")} /><SelectField label="Status" value={leadForm.status} onChange={(value) => updateLeadForm("status", value)} options={statusOptions.filter((option) => option !== "Todos")} /><div /><TextAreaField className="full" label="Observações" value={leadForm.notes} onChange={(value) => updateLeadForm("notes", value)} /></div></ModalShell>}

      {showActivityModal && <ModalShell title="Nova Atividade" subtitle="Planeje o próximo passo do relacionamento comercial" onClose={() => setShowActivityModal(false)} onConfirm={saveActivity} confirmLabel="Salvar Atividade"><div className="form-grid"><SelectField label="Tipo" value={activityForm.type} onChange={(value) => updateActivityForm("type", value)} options={activityTypeOptions.filter((option) => option !== "Todos")} /><SelectField label="Status" value={activityForm.status} onChange={(value) => updateActivityForm("status", value)} options={activityStatusOptions.filter((option) => option !== "Todos")} /><Field label="Título" value={activityForm.title} onChange={(value) => updateActivityForm("title", value)} error={activityErrors.title} /><Field label="Lead associado" value={activityForm.lead} onChange={(value) => updateActivityForm("lead", value)} error={activityErrors.lead} /><SelectField label="Responsável" value={activityForm.owner} onChange={(value) => updateActivityForm("owner", value)} options={owners.filter((option) => option !== "Todos")} /><Field label="Data / Hora" value={activityForm.date} onChange={(value) => updateActivityForm("date", value)} error={activityErrors.date} /></div></ModalShell>}

      <ToastStack toasts={toasts} dismissToast={dismissToast} />
    </>
  );
}

export default App;
