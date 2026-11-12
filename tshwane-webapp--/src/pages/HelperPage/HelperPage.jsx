import { useState } from "react";
import { api } from "../../api/client";
import RouteForm from "../../components/RouteForm/RouteForm";
import RouteList from "../../components/RouteList/RouteList";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import { useAuth } from "../../context/AuthContext";
import useRoutes from "../../hooks/useRoutes";
import "./HelperPage.css";

export default function HelperPage() {
  const { user } = useAuth();
  const { routes, error, reload } = useRoutes();
  const [editing, setEditing] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [notice, setNotice] = useState(null);

  async function handleSaved(route, wasEdit) {
    setEditing(null);
    setFormKey((k) => k + 1); // remounts the form so it's empty again
    setNotice({ kind: "success", text: `${route.name} ${wasEdit ? "updated" : "added"}.` });
    reload();
  }

  async function handleDelete(route) {
    if (!window.confirm(`Delete ${route.name}? This can't be undone.`)) return;
    try {
      await api.deleteRoute(route.id);
      if (editing?.id === route.id) setEditing(null);
      setNotice({ kind: "success", text: `${route.name} deleted.` });
      reload();
    } catch (e) {
      setNotice({ kind: "error", text: e.message });
    }
  }

  return (
    <div className="helper-page">
      {(notice || error) && <StatusMessage kind={error ? "error" : notice.kind}>{error ?? notice.text}</StatusMessage>}
      <div className="helper-page__grid">
        <RouteForm
          key={editing ? `edit-${editing.id}` : `new-${formKey}`}
          initial={editing}
          onSaved={handleSaved}
          onCancel={() => setEditing(null)}
        />
        <RouteList
          routes={routes}
          user={user}
          editingId={editing?.id}
          onEdit={(r) => { setNotice(null); setEditing(r); window.scrollTo({ top: 0 }); }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
