// import { ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type AlertProps = {
  actionName: string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: any;
  destructive: boolean;
  onConfirm: () => void;
};

function Alert({
  actionName,
  title,
  description,
  trigger,
  destructive,
  onConfirm,
}: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {destructive ? (
            <AlertDialogAction onClick={onConfirm} className="bg-red-600">
              {actionName}
            </AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={onConfirm}>
              {actionName}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
