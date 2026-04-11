import { useState } from "react";
import Input from "../ui/inputs.tsx";

type Errors = {
    email?: string;
    password?: string;
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    const validate = () => {
        const newErrors: Errors = {};

        if (!email.includes("@")) {
            newErrors.email = "Niepoprawny email";
        }

        if (password.length < 6) {
            newErrors.password = "Min. 6 znaków";
        }

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validate();
        setErrors(validation);

        if (Object.keys(validation).length > 0) return;

        console.log("LOGIN", { email, password });

        // 👉 Auth0:
        // loginWithRedirect()
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-4"
            >
                <h2 className="text-xl font-semibold text-center">Logowanie</h2>

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />

                <Input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />

                <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Zaloguj się
                </button>
            </form>
        </div>
    );
}