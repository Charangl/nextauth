export default function TextInput({ input }) {
  return (
    <div className="w-full">
      <label className={input.labelClassName}>{input.label}</label>
      <input
        key={input.label}
        type={input.type}
        className={input.className}
        value={input.value}
        placeholder={input.placeholder}
        onChange={(e) => {
          input.setValue(e.target.value);
        }}
      />
    </div>
  );
}
