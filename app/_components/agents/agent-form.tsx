"use client";

interface AgentFormProps {
  onSuccess?: () => void;
  oncancel?: () => void;
  initialValues?: any;
}

export default function AgentForm({
  onSuccess,
  oncancel,
  initialValues,
}: AgentFormProps) {
  return <div>agent-form</div>;
}
