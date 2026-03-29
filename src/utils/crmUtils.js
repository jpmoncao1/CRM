export function hashColor(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = text.charCodeAt(i) + ((hash << 5) - hash);
  const palette = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4"];
  return palette[Math.abs(hash) % palette.length];
}

export function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function statusBadge(status) {
  const map = {
    Novo: { color: "#3B82F6", bg: "rgba(59,130,246,0.16)" },
    Contatado: { color: "#F59E0B", bg: "rgba(245,158,11,0.16)" },
    Qualificado: { color: "#10B981", bg: "rgba(16,185,129,0.16)" },
    Desqualificado: { color: "#EF4444", bg: "rgba(239,68,68,0.16)" },
    Pendente: { color: "#F59E0B", bg: "rgba(245,158,11,0.16)" },
    Concluída: { color: "#10B981", bg: "rgba(16,185,129,0.16)" },
    Atrasada: { color: "#EF4444", bg: "rgba(239,68,68,0.16)" },
  };
  return map[status] || { color: "#95A0B5", bg: "rgba(149,160,181,0.16)" };
}
