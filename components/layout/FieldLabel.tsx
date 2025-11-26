interface FieldProps {
    label: string;
    htmlFor: string;
}

export default function FieldLabel({ label, htmlFor }: FieldProps) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-700"
        >
            {label}
        </label>
    );
};