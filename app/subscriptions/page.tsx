import { headers } from "next/headers";
import NavBar from "../_components/nav-bar";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

const Subscriptions = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <NavBar user={session.user} />
    </>
  );
};

export default Subscriptions;
