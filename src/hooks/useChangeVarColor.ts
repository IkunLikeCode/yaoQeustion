export default function useChangeVarColor(varName: string, color: string) {
  document.documentElement.style.setProperty(varName, color);
}
