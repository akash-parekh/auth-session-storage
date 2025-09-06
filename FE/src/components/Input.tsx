type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => (
    <input
        {...props}
        className="border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);
export default Input;
