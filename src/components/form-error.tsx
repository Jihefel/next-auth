import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
    message?: string;
}

export default function FormError({ message }: FormErrorProps) {
    if (!message) return null

    return (
        <div className="flex items-center p-3 text-sm rounded-md bg-destructive/15 gap-x-2 text-destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}