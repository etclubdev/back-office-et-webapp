import { getDepartmentShortName } from "./getDepartmentNameUtil";

export function dataForPieChart(id, value, label, data) {
  return Array.isArray(data) ? data.map((item, index) => ({
    id: `${id}-${index}`,
    value: Number(item[value]),
    label: item[label],
  })) : [];
}
export function dataForBarChart(value, label, data) {
  return Array.isArray(data) ? data.map(item => ({
    x: getDepartmentShortName(item[label]),
    y: item[value] != null ? Number(item[value]) : 0, // fallback to 0
  })) : [];
}
