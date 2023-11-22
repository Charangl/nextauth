"use client"

import TextInput from "./TextInput"

export default function ControleInput({allInputs}) {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            {allInputs.map((input, index) => {
                switch (input.nameType) {
                    case "input" : {
                        return <TextInput input={input} key={index}/>
                    }
                }
            })}
        </div>
    )
}