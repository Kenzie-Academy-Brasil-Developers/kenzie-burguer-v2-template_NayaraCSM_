import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues } from "../components/Form/LoginForm/validator";
import { TRegisterFormValues } from "../components/Form/RegisterForm/validator";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
  userLogin: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userRegister: (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  logout: () => void;
}

interface IUser {
  email: string;
  name: string;
  job: string;
  id: number;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        toast.success("Login feito com sucesso!", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        navigate("/shop");
      } catch (error) {
        toast.error(
          "Algo deu errado, confira as informações e tente novamente.",
          {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      }
    };

    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const navigate = useNavigate();

  const userLogin = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    console.log("chegou");
    try {
      setLoading(true);
      const { data } = await api.post<IUserLoginResponse>("/login", formData);
      localStorage.setItem("@TOKEN", data.accessToken);
      localStorage.setItem("@USERID", JSON.stringify(data.user.id));
      setUser(data.user);
      toast.success("Login feito com sucesso!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/shop");
    } catch (error) {
      toast.error(
        "Algo deu errado, confira as informações e tente novamente.",
        {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post<IUserRegisterResponse>("/users", formData);
      toast.success("Cadastro feito com sucesso!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/");
    } catch (error) {
      toast.error(
        "Algo deu errado, confira as informações e tente novamente.",
        {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userRegister, logout }}>
      {children}
    </UserContext.Provider>
  );
};
