import React, { useState, useEffect, useRef } from 'react'

const PhoneNumberInput = ({ maxLength = 10 }) => {
    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const carretPosition = useRef<number>(0);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const currentValue = target.value;
        const selectionStart = target.selectionStart;
        const numbers = currentValue.replace(/[^0-9]/g, "");
        const size = numbers.length;

        if (size > maxLength) return;

        const formattedValue = []
        for (let i = 0; i < size; i++) {
            if ( size > 3 && i === 0) {
                formattedValue.push("(");
            }
            formattedValue.push(numbers[i]);
            if ( size > 6  && i === 5) {
                formattedValue.push("-");
            }
            if ( size > 3 && i === 2) {
                formattedValue.push(")");
            }
        }
        const diff = formattedValue.length - currentValue.length;
        if (selectionStart) {
            carretPosition.current = selectionStart + diff
        }
        setInput(formattedValue.join(""));
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(carretPosition.current, carretPosition.current);
        }
    })
  return (
    <div><input value={input} ref={inputRef} data-testId="phone-number-input" onChange={inputChange}/></div>
  )
}

export default PhoneNumberInput

export const PhoneNumber = () => {
    return (
        <div>
            <PhoneNumberInput maxLength={10}/>
        </div>
    )
}