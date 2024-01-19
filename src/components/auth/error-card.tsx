import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "./card-wrapper";

function ErrorCard() {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!" backButtonHref="/auth/login" backButtonLabel="Go back to login">
      <div className="w-full center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
}

export default ErrorCard;
