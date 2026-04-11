type Props = {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

export default function Input({
                                  type = "text",
                                  placeholder,
                                  value,
                                  onChange,
                                  error,
                              }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border p-2 rounded-lg outline-none focus:ring-2 ${
                    error ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
                }`}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}