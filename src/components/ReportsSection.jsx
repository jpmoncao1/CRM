import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "./ui.jsx";

function ReportsSection({ period, setPeriod, reportData }) {
  return (
    <section>
      <div className="section-title">
        <div>
          <p className="eyebrow">Inteligência comercial</p>
          <h2>Relatórios estratégicos</h2>
        </div>
        <div className="period-switch">
          {[["7d", "Últimos 7 dias"], ["30d", "30 dias"], ["3m", "3 meses"], ["12m", "12 meses"]].map(([value, label]) => (
            <button key={value} className={`period-btn ${period === value ? "active" : ""}`} type="button" onClick={() => setPeriod(value)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="report-grid">
        <div className="panel report-card">
          <div className="report-header">
            <div>
              <div className="eyebrow">Aquisição</div>
              <div className="card-title">Leads por fonte</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", height: 250, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={reportData.source} dataKey="value" nameKey="name" innerRadius={66} outerRadius={92} paddingAngle={3}>
                  {reportData.source.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "grid", alignContent: "center", gap: 12 }}>
              {reportData.source.map((entry) => (
                <div key={entry.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <i style={{ width: 10, height: 10, borderRadius: 999, display: "inline-block", background: entry.color }} />
                    <span className="muted">{entry.name}</span>
                  </span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel report-card">
          <div className="eyebrow">Conversão</div>
          <div className="card-title">Leads criados vs convertidos</div>
          <div style={{ height: 250, marginTop: 22 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportData.conversion}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#95A0B5" tickLine={false} axisLine={false} />
                <YAxis stroke="#95A0B5" tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={3} dot={false} name="Leads criados" />
                <Line type="monotone" dataKey="converted" stroke="#10B981" strokeWidth={3} dot={false} name="Convertidos" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel report-card">
          <div className="eyebrow">Equipe</div>
          <div className="card-title">Desempenho por vendedor</div>
          <div style={{ height: 250, marginTop: 22 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.sellers} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#95A0B5" tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#95A0B5" tickLine={false} axisLine={false} width={90} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 12, 12, 0]} name="Negócios ganhos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportsSection;
