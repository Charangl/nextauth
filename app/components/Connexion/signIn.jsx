"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { success, error } from "../Toast/Toast"
import ControleInput from "../ControleInput.jsx/ControleInput";

export default function SignIn() {
    const router = useRouter();
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    let details = {
        name: name,
        email: email,
        password: password,
    };

    const signInUser = async () => {
        console.log(details, "details");
        await fetch('http://localhost:8000/APIROUTES/user/login', {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type" : "application/json;charset=utf-8"},
            body: JSON.stringify(details),
        }).then((res) => {
            success("Vous êtes connecté")
            router.refresh();
            router.push('/');
        }).catch((err) => {
            console.log(err);
            error("Erreur lors de la connexion. Veuillez rééssayer ultérieurement");
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
            className: "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            labelClassName: "block text-sm font-medium leading-6 text-gray-800",
        },
        {
            nameType: "input",
            type: "email",
            label: "Adresse mail :",
            placeholder: "john.doe@exemple.fr",
            value: email,
            setValue: setEmail,
            className: "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            labelClassName: "block text-sm font-medium leading-6 text-gray-800 mt-4",
        },
        {
            nameType: "input",
            type: "password",
            label: "Mot de passe :",
            placeholder: "Mot de passe",
            value: password,
            setValue: setPassword,
            className: "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            labelClassName: "block text-sm font-medium leading-6 text-gray-800 mt-4",
        }
    ]

    return (
         <>
            <form className="space-y-6" action="#" method="POST">
                <ControleInput allInputs={dataInputs} />


                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Mot de passe oublié ?
                    </a>
                </div>
                <div>
                    <button
                    onClick={signInUser}
                        type="button"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Connexion
                    </button>
                </div>
            </form>
        </>
    )
}