"use client"
// import { useRouter } from "next/navigation";
// import React from "react";
// import { success, error } from "../Toast/Toast"
// import ControleInput from "../ControleInput.jsx/ControleInput";
// import { signIn } from "next-auth/react"

// export default function SignIn() {
//     const router = useRouter();
//     const [name, setName] = React.useState();
//     const [email, setEmail] = React.useState();
//     const [password, setPassword] = React.useState();

//     let details = {
//         name: name,
//         email: email,
//         password: password,
//     };

//     const signInUser = async () => {
//         console.log(details, "details");
//         await fetch('http://localhost:8000/APIROUTES/user/login', {
//             method: "POST",
//             credentials: "include",
//             headers: { "Content-Type": "application/json;charset=utf-8" },
//             body: JSON.stringify(details),
//         }).then((res) => {
//             success("Vous êtes connecté")
//             router.refresh();
//             router.push('/');
//         }).catch((err) => {
//             console.log(err);
//             error("Erreur lors de la connexion. Veuillez rééssayer ultérieurement");
//         });
//     };

//     const dataInputs = [
//         {
//             nameType: "input",
//             type: "text",
//             label: "Nom :",
//             placeholder: "Nom",
//             value: name,
//             setValue: setName,
//             className: "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
//             labelClassName: "block text-sm font-medium leading-6 text-gray-800",
//         },
//         {
//             nameType: "input",
//             type: "email",
//             label: "Adresse mail :",
//             placeholder: "john.doe@exemple.fr",
//             value: email,
//             setValue: setEmail,
//             className: "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
//             labelClassName: "block text-sm font-medium leading-6 text-gray-800 mt-4",
//         },
//         {
//             nameType: "input",
//             type: "password",
//             label: "Mot de passe :",
//             placeholder: "Mot de passe",
//             value: password,
//             setValue: setPassword,
//             className: "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
//             labelClassName: "block text-sm font-medium leading-6 text-gray-800 mt-4",
//         }
//     ]

//     return (
//         <>
//             <form className="space-y-6" action="#" method="POST">
//                 <ControleInput allInputs={dataInputs} />


//                 <div className="text-sm">
//                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                         Mot de passe oublié ?
//                     </a>
//                 </div>
//                 <div>
//                     <button
//                         onClick={signInUser}
//                         type="button"
//                         className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                         Connexion
//                     </button>
//                 </div>
//                 <button type="button" onClick={() => signIn('google')} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full">
//                     <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
//                         <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
//                     </svg>
//                     Sign in with Google
//                 </button>
//             </form>
//         </>
//     )
// }

import { useRouter } from "next/navigation";
import React from "react";
import { success, error } from "../Toast/Toast";
import ControleInput from "../ControleInput.jsx/ControleInput";
import { signIn } from "next-auth/react";

export default function SignIn() {
    const router = useRouter();
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const details = {
        name: name,
        email: email,
        password: password,
    };

    const signInUser = async () => {
        console.log(details, "details");
        try {
            const res = await fetch("http://localhost:8000/APIROUTES/user/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify(details),
            });

            if (res.ok) {
                success("Vous êtes connecté");
                router.refresh();
                router.push("/");
            } else {
                throw new Error("Erreur lors de la connexion");
            }
        } catch (err) {
            console.error(err);
            error("Erreur lors de la connexion. Veuillez réessayer ultérieurement");
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signIn("google", { callbackUrl: "/" });
        } catch (error) {
            console.error(error);
            
        }
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
    ];

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
                <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-full"
                >
                    <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                    >
                        <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                    </svg>
                    Sign in with Google
                </button>
            </form>
        </>
    );
}
