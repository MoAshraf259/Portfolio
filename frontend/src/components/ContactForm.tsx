import { useMemo, useState } from 'react';
import { contactSchema, type ContactFormValues } from '../api/portfolio';
import { useContactMutation } from '../hooks/usePortfolio';

const initialValues: ContactFormValues = {
  fullName: '',
  email: '',
  subject: undefined,
  message: '',
};

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

type FormStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const mutation = useContactMutation();

  const buttonLabel = useMemo(() => (mutation.isPending ? 'Sending…' : 'Send Message'), [mutation.isPending]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === 'subject' ? (value.trim() === '' ? undefined : value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name as keyof ContactFormValues]: undefined }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setStatus(null);

    const parsed = contactSchema.safeParse({
      ...values,
      subject: values.subject?.toString().trim() ? values.subject : undefined,
    });

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        if (issue.path.length) {
          fieldErrors[issue.path[0] as keyof ContactFormValues] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await mutation.mutateAsync(parsed.data);
      setValues({ ...initialValues });
      setStatus({ type: 'success', message: 'Thanks for reaching out! I will respond shortly.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send your message right now.';
      setStatus({ type: 'error', message });
    }
  };

  return (
    <div className="contact-card">
      <div>
        <h3>Let&apos;s collaborate</h3>
        <p className="section__description">
          Share a few details about your project or opportunity and I&apos;ll follow up within 24 hours.
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__grid">
          <label>
            Full name
            <input
              required
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
          </label>
          <label>
            Email
            <input
              required
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </label>
          <label>
            Subject
            <input
              name="subject"
              value={values.subject ?? ''}
              onChange={handleChange}
              placeholder="Let&apos;s build something great"
              aria-invalid={Boolean(errors.subject)}
            />
            {errors.subject && <span className="form-error">{errors.subject}</span>}
          </label>
        </div>
        <label>
          Message
          <textarea
            required
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Tell me about your challenge, goals, and timelines."
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </label>
        <div>
          <button className="button button--primary" type="submit" disabled={mutation.isPending}>
            {buttonLabel}
          </button>
        </div>
        {status && (
          <p className={status.type === 'success' ? 'form-success' : 'form-error'}>{status.message}</p>
        )}
      </form>
    </div>
  );
}

