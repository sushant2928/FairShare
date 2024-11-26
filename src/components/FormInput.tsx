interface formInputProps {
  label: string;
  name: string;
  isRequired: boolean;
  type?: string;
}
export function FormInput({
  label,
  name,
  isRequired,
  type = "text",
}: formInputProps) {
  return (
    <div className="flex flex-col gap-1 ">
      <label>{label}</label>
      <input
        name={name}
        required={isRequired}
        type={type}
        className="w-full p-2 border border-black rounded"
      />
    </div>
  );
}
