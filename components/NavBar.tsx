"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export function NavBar() {
  const router = useRouter();
  const handlesignin = () => {
    router.push("/signin");
    console.log("redirecting to signin");
  };
  const handleregister = () => {
    router.push("/signup");
    console.log("redirecting to register");
  };
  return (
    <div className="flex border-black border-r-2 border-l-4 border-t-2 border-b-4 justify-between m-10 rounded-sm p-3 items-center">
      <div className="p-2">
        <h1 className="font-bold text-xl">Voluntr</h1>
        <p className="text-sm">Connecting Volunteers and NGOs</p>
      </div>
      <div className="flex ">
        <div className="p-2">
          <Button onClick={handlesignin}>Sign In</Button>
        </div>
        <div className="p-2">
          <Button onClick={handleregister}>register</Button>
        </div>
      </div>
    </div>
  );
}
