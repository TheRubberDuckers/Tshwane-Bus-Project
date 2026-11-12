import "./StatusMessage.css";

export default function StatusMessage({ kind = "info", children }) {
  return <p className={`status status--${kind}`} role={kind === "error" ? "alert" : "status"}>{children}</p>;
}
