import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminApi, type AdminCredentials } from "../api/admin";
import { useAuth } from "../contexts/AuthContext";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [formValues, setFormValues] = useState<AdminCredentials>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const mutation = useMutation({
    mutationFn: adminApi.login,
    onSuccess: () => {
      login();
      const redirectPath = (location.state as LocationState | null)?.from?.pathname ?? "/admin/dashboard";
      navigate(redirectPath, { replace: true });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Login failed";
      setErrorMessage(message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    mutation.mutate(formValues);
  };

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <h1 className="admin-title">Admin Login</h1>
        <p className="admin-subtitle">Sign in to edit portfolio content and review contact requests.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={formValues.email}
              onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={formValues.password}
              onChange={(event) => setFormValues((prev) => ({ ...prev, password: event.target.value }))}
              required
              autoComplete="current-password"
            />
          </label>
          {errorMessage && <p className="form-error">{errorMessage}</p>}
          <button className="button button--primary" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <Link to="/" className="admin-link">
          &larr; Back to portfolio
        </Link>
      </div>
    </div>
  );
}
