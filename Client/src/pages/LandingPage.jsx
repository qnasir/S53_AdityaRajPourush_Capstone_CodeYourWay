import Navbar_1 from "@/components/Navbar_1";
import { AuthContext } from "@/components/context/authContext";
import { useSnippet } from "@/components/context/snippetContext";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react"

const LandingPage = () => {
  const { username, isLoggedIn } = useContext(AuthContext);
  const { snippets, fetchSnippets, deleteSnippet } = useSnippet();

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        await fetchSnippets();
      }
    };
  
    fetchData();
  }, [isLoggedIn, fetchSnippets]);

  const handleDelete = async (id) => {
    try {
      await deleteSnippet(id);
      await fetchSnippets(); // Refresh the snippets list
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  }
  

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
        <div key={snippet._id} className="p-2 border rounded mb-2 flex justify-between items-center">
          <Link to={`/playground?id=${snippet._id}`}>
            <div>
              <h3>{snippet.title}</h3>
              <p>Language: {snippet.language}</p>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(snippet._id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default LandingPage;