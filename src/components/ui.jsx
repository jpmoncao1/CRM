import React, { useState } from "react";
import { Check, ChevronRight, ChevronUp, ChevronsUpDown, X } from "lucide-react";

export function Sparkline({ data, stroke }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 160;
      const y = 42 - ((value - min) / (max - min || 1)) * 30;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width="160" height="42" viewBox="0 0 160 42" fill="none" style={{ marginTop: 12 }}>
      <path d={`M0 42 L${points} L160 42`} fill={`${stroke}18`} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToastStack({ toasts, dismissToast }) {
  return (
    <div className="toast-stack">
      {toasts.map((toast) => {
        const tone = { success: "#10B981", error: "#EF4444", info: "#3B82F6", warning: "#F59E0B" }[toast.type];
        return (
          <div key={toast.id} className="toast" style={{ color: tone }}>
            <div className="toast-head">
              <div className="toast-copy">
                <div className="kpi-icon" style={{ width: 40, height: 40, background: `${tone}20`, color: tone }}>
                  <Check size={18} />
                </div>
                <div>
                  <div style={{ color: "#F4F7FB", fontWeight: 700 }}>{toast.title}</div>
                  <div className="muted" style={{ marginTop: 4 }}>{toast.message}</div>
                </div>
              </div>
              <button className="ghost-icon" onClick={() => dismissToast(toast.id)} type="button">
                <X size={16} />
              </button>
            </div>
            <div className="toast-progress" style={{ animationDuration: "4000ms" }} />
          </div>
        );
      })}
    </div>
  );
}

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div style={{ color: "#F4F7FB", fontWeight: 700 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="muted" style={{ marginTop: 6 }}>
          <span style={{ color: entry.color }}>{entry.name}: </span>
          {entry.value}
        </div>
      ))}
    </div>
  );
}

export function SortableHead({ label, field, sortConfig, onSort }) {
  const active = sortConfig.key === field;
  return (
    <th>
      <button type="button" onClick={() => onSort(field)} style={{ all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, color: "inherit" }}>
        {label}
        {active ? (sortConfig.dir === "asc" ? <ChevronUp size={14} /> : <ChevronRight size={14} style={{ transform: "rotate(90deg)" }} />) : <ChevronsUpDown size={14} />}
      </button>
    </th>
  );
}

export function PipelineOverviewChart({ data }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(...data.map((item) => item.value));
  const barWidth = 64;
  const gap = 26;
  const chartHeight = 240;
  return (
    <div className="pipeline-svg-wrap">
      <svg width="100%" height="320" viewBox="0 0 560 320">
        {data.map((item, index) => {
          const x = 28 + index * (barWidth + gap);
          const height = (item.value / max) * chartHeight;
          const y = 260 - height;
          return (
            <g key={item.stage} onMouseEnter={() => setHovered({ ...item, x: x + barWidth / 2, y })} onMouseLeave={() => setHovered(null)}>
              <rect x={x} y={36} width={barWidth} height={224} rx={20} fill="rgba(255,255,255,0.035)" />
              <rect x={x} y={y} width={barWidth} height={height} rx={20} fill={item.color} opacity="0.92" />
              <text x={x + barWidth / 2} y={286} textAnchor="middle" fill="#95A0B5" fontSize="12">{item.stage}</text>
              <text x={x + barWidth / 2} y={y - 10} textAnchor="middle" fill="#F4F7FB" fontSize="14">{item.value}</text>
            </g>
          );
        })}
      </svg>
      {hovered ? (
        <div className="pipeline-tooltip" style={{ left: hovered.x, top: hovered.y }}>
          <div style={{ color: "#F4F7FB", fontWeight: 700 }}>{hovered.stage}</div>
          <div className="muted" style={{ marginTop: 4 }}>{hovered.value} oportunidades</div>
          <div className="muted">{hovered.pct}% do topo do funil</div>
        </div>
      ) : null}
      <div className="legend">
        {data.map((item) => <span key={item.stage}><i style={{ background: item.color }} />{item.stage}</span>)}
      </div>
    </div>
  );
}

export function ModalShell({ title, subtitle, children, onClose, onConfirm, confirmLabel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h3>{title}</h3>
            <div className="muted" style={{ marginTop: 6 }}>{subtitle}</div>
          </div>
          <button className="ghost-icon" type="button" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="ghost-btn" type="button" onClick={onClose}>Cancelar</button>
          <button className="primary-btn" type="button" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, value, onChange, error }) {
  return (
    <div className="field-wrap">
      <div className="label">{label}</div>
      <input className={`field ${error ? "error" : ""}`} value={value} onChange={(event) => onChange(event.target.value)} />
      {error ? <div className="error-msg">{error}</div> : null}
    </div>
  );
}

export function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="field-wrap">
      <div className="label">{label}</div>
      <select className={`select ${error ? "error" : ""}`} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      {error ? <div className="error-msg">{error}</div> : null}
    </div>
  );
}

export function TextAreaField({ label, value, onChange, className = "" }) {
  return (
    <div className={`field-wrap ${className}`}>
      <div className="label">{label}</div>
      <textarea className="textarea" rows={5} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
