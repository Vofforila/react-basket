import { useUser } from "../contexts/UserContext";

export default function Basket() {
   const { user } = useUser();
   return <h1>user?.email</h1>;
}
