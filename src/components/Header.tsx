import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import * as React from "react";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const { data: sessionData } = useSession();
  return (
    <nav className="navbar bg-primary text-primary-content">
      <aside className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ""}
      </aside>
      <aside className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  alt={sessionData?.user?.name ?? ""}
                  width="100"
                  height="100"
                />
              </div>
            </label>
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </aside>
    </nav>
  );
};

export default Header;
