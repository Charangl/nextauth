"use client"
import React from "react";
import { useRouter } from "next/navigation";
import ControleInput from "../ControleInput.jsx/ControleInput";
import { success, error } from "../Toast/Toast";

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    let details = {
        name: name,
        email: email,
        password: password,
    };

    const signUpUser = () => {
        fetch("http://localhost:8000/APIROUTES/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        })
            .then(async (res) => {
                if (res.status >= 200 && res.status < 300) {
                    const response = await res.json()
                    success(response.message)
                    router.push('/');
                } else {
                    throw await res.json()
                }
            })
            .catch((err) => {
                error("Erreur lors de la création de votre compte")
                console.log(err)
            });
    };

    const dataInputs = [
        {
            nameType: "input",
            type: "text",
            label: "Nom :",
            placeholder: "Nom",
            value: name,
            setValue: setName,
            className: "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            labelClassName: "block text-sm font-medium leading-6 text-gray-900 mt-4",
        },
        {
            nameType: "input",
            type: "email",
            label: "Adresse mail :",
            placeholder: "john.doe@exemple.fr",
            value: email,
            setValue: setEmail,
            className: "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            labelClassName: "block text-sm font-medium leading-6 text-gray-900 mt-4",
        },
        {
            nameType: "input",
            type: "password",
            label: "Mot de passe :",
            placeholder: "Mot de passe",
            value: password,
            setValue: setPassword,
            className: "block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            labelClassName: "block text-sm font-medium leading-6 text-gray-900 mt-4",
        },
    ];

    return (
        <>
            <form>
                <ControleInput allInputs={dataInputs} />
                <button onClick={signUpUser} type="button" className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    S&apos;enregistrer
                </button>
                </form>
                </>
    )
}