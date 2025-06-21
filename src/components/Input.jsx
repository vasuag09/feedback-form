export default function Input({name, label,reset, ...props}){
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input name = {name} id={name} {...props} />
        </>
    )
}