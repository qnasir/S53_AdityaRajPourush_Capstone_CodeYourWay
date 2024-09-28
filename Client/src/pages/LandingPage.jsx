import Navbar_1 from "@/components/Navbar_1";
import { AuthContext } from "@/components/context/authContext";
import { useSnippet } from "@/components/context/snippetContext";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { username, isLoggedIn } = useContext(AuthContext);
  const { snippets, fetchSnippets } = useSnippet();

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        await fetchSnippets();
      }
    };
  
    fetchData();
  }, [isLoggedIn, fetchSnippets]);
  

  return (
    <div>
      <Navbar_1 />
      <div className="w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Hi {isLoggedIn ? username : "User"}
          </h1>
          <h1 className="text-3xl font-bold">
            Let's Code Your Way to Success!
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between">
          <div className="w-full sm:w-[48%] border my-4 rounded px-4 py-6">
            <Link to="/playground">
              <Button variant="outline">Online Compiler</Button>
            </Link>
          </div>
          <div className="w-full sm:w-[48%] border my-4 rounded px-4 py-6">
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            {/* Add profile content here */}
          </div>
        </div>
        <div className="w-full sm:w-[48%] border my-4 rounded px-4 py-6">
            <h2 className="text-xl font-bold mb-2">Your Snippets</h2>
            {snippets.map(snippet => (
              <Link key={snippet._id} to={`/playground?id=${snippet._id}`}>
                <div className="p-2 border rounded mb-2">
                  <h3>{snippet.title}</h3>
                  <p>Language: {snippet.language}</p>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
