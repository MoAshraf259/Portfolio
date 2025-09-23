import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/admin';
import { useAuth } from '../contexts/AuthContext';
import type { PortfolioData, ContactMessage } from '../types/portfolio';

const TAB_OPTIONS = [
  { id: 'content', label: 'Content' },
  { id: 'contacts', label: 'Contacts' },
] as const;

export function AdminDashboardPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<(typeof TAB_OPTIONS)[number]['id']>('content');
  const [contentDraft, setContentDraft] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true });
    }
  }, [token, navigate]);

  const portfolioQuery = useQuery({
    queryKey: ['admin', 'portfolio'],
    queryFn: () => adminApi.getPortfolio(token!),
    enabled: Boolean(token),
  });

  const contactsQuery = useQuery({
    queryKey: ['admin', 'contacts'],
    queryFn: () => adminApi.getContacts(token!),
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (portfolioQuery.data) {
      setContentDraft(JSON.stringify(portfolioQuery.data, null, 2));
    }
  }, [portfolioQuery.data]);

  const updateMutation = useMutation({
    mutationFn: (payload: PortfolioData) => adminApi.updatePortfolio(token!, payload),
    onSuccess: (updated) => {
      setSaveError(null);
      queryClient.setQueryData(['admin', 'portfolio'], updated);
      setContentDraft(JSON.stringify(updated, null, 2));
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Unable to update content';
      setSaveError(message);
    },
  });

  const handleSave = () => {
    try {
      const parsed = JSON.parse(contentDraft) as PortfolioData;
      setSaveError(null);
      updateMutation.mutate(parsed);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON payload';
      setSaveError(message);
    }
  };

  const contacts = useMemo<ContactMessage[]>(() => contactsQuery.data ?? [], [contactsQuery.data]);
  const isLoading = portfolioQuery.isLoading || contactsQuery.isLoading;

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div>
          <h1>Portfolio Admin</h1>
          <p>Manage CV content and review inbound messages.</p>
        </div>
        <div className="admin-dashboard__actions">
          <button className="button button--ghost" onClick={() => navigate('/')}>View site</button>
          <button
            className="button button--primary"
            onClick={() => {
              logout();
              navigate('/admin/login', { replace: true });
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="admin-tabs">
        {TAB_OPTIONS.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? 'admin-tab admin-tab--active' : 'admin-tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && <div className="admin-panel">Loading admin data...</div>}

      {!isLoading && activeTab === 'content' && (
        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <h2>Portfolio JSON</h2>
              <p>Edit the structured resume data and save to update the public site.</p>
            </div>
            <div className="admin-panel__buttons">
              <button
                className="button button--ghost"
                onClick={() => portfolioQuery.refetch()}
                disabled={portfolioQuery.isRefetching}
              >
                Refresh
              </button>
              <button
                className="button button--primary"
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
          <textarea
            className="admin-textarea"
            value={contentDraft}
            onChange={(event) => setContentDraft(event.target.value)}
            spellCheck={false}
          />
          {saveError && <p className="form-error">{saveError}</p>}
          {updateMutation.isSuccess && !saveError && <p className="form-success">Content updated successfully.</p>}
        </section>
      )}

      {!isLoading && activeTab === 'contacts' && (
        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <h2>Contact Messages</h2>
              <p>All submissions from the public contact form.</p>
            </div>
            <button
              className="button button--ghost"
              onClick={() => contactsQuery.refetch()}
              disabled={contactsQuery.isRefetching}
            >
              Refresh
            </button>
          </div>
          {contacts.length === 0 ? (
            <p className="admin-empty">No contact requests yet.</p>
          ) : (
            <div className="admin-table">
              <div className="admin-table__header">
                <span>Name</span>
                <span>Email</span>
                <span>Subject</span>
                <span>Date</span>
              </div>
              {contacts.map((message) => (
                <button
                  key={message.id}
                  className="admin-table__row"
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(message.email).catch(() => undefined);
                    }
                  }}
                  title="Click to copy email"
                >
                  <span>{message.fullName}</span>
                  <span>{message.email}</span>
                  <span>{message.subject ?? '-'}</span>
                  <span>{new Date(message.createdAt).toLocaleString()}</span>
                  <p className="admin-table__message">{message.message}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
