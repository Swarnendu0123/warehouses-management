import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from "../config/firebase.config";
import { RecoilState, useRecoilState } from "recoil";
import { userState } from "../store/atoms";
import { useEffect } from "react";

const Navigation = () => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useRecoilState<User | null>(
    userState as unknown as RecoilState<User | null>
  );

  useEffect(() => {
    if (!user) {
      auth.onAuthStateChanged((user) => {
        setUser(user);
        console.log(user);
      });
    }
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        result.user;
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hidden sm:block">
        <div className="">
          <nav className="flex gap-6  justify-between">
            <div className=" text-indigo-700 font-bold text-2xl">
              Warehouse Management System
            </div>
            <div className="flex">
              {!user ? (
                <NavLink
                  to="#"
                  className="rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 flex items-center"
                  onClick={handleLogin}
                >
                  Sign In
                </NavLink>
              ) : (
                <div className="flex items-center">
                  <div className="flex items-center border rounded-xl px-3 py-1">
                    <div className="pr-3">{user.displayName}</div>
                    <img
                      src={user.photoURL ?? ""}
                      alt=""
                      className="rounded-full h-10"
                    />
                    <button
                      className="rounded bg-red-600 m-1 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                      onClick={logOut}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
