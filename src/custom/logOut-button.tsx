
import { LogOut } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth.tsx"; 
import { useNavigate } from "react-router-dom"; 

export const LogoutButton = () => {
	const { logout } = useAuth(); 
  const navigate = useNavigate();


  const handleLogout = () => {
	  logout();
	  navigate("/", { replace: true });

    // window.location.href = "/";
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tizimdan chiqmoqchimisiz?</AlertDialogTitle>
          <AlertDialogDescription>
            Siz tizimdan chiqish arafasidasiz. Qayta kirish uchun login va
            parolingizni kiritishingizga to'g'ri keladi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Chiqish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
