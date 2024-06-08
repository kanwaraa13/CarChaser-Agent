import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AgentNav } from "./AgentNav";
import api from "../api";

export const AgentViewinspection = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const storedUserId = sessionStorage.getItem("user_id");
  const storedAgentId = sessionStorage.getItem("agentId");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const storedAgentId = sessionStorage.getItem("agentId"); // Retrieve agent ID from session storage
    if (!storedAgentId) {
      // If agent ID is not found in session storage, handle accordingly (e.g., redirect to login)
      navigate("/");
      return;
    }
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `/vehiclelisting/${storedAgentId}/Agent/ViewPostedInspection`
        );
        const { message, Vehicle } = response.data;

        // Check if message is true and Vehicle is an array
        if (message && Array.isArray(Vehicle)) {
          // Log the entire response data

          // Set the Vehicle data in state
          setPosts(Vehicle);
          setLoading(false);
        } else {
          throw new Error("Invalid data format: Vehicle array not found");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate, storedUserId]);

  const fetchSerchdata = async () => {
    try {
      const response = await api.post(
        `/vehiclesearch/${storedAgentId}/Agent/ViewPostedInspection`,
        {
          search: searchQuery,
        }
      );
      // Extract the array of vehicles from the "Vehicle" property
      const vehicles = response.data.Vehicle;
      // Set the state with the array of vehicles
      setPosts(vehicles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchSerchdata();
  };

  return (
    <section className="car-details">
      <AgentNav />
      <div className="container">
        <div className="view-post-panel mid-table mt-4">
          <h3 className="main-heading py-3">View Posted Inspection Reports</h3>
          <div className="car-bid-gallary">
            <form onSubmit={(e) => e.preventDefault()} className="input-group">
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search Cars"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
            <div className="carbid-gallery-panel py-4">
              <div className="row">
                {loading ? (
                  <p>Loading...</p> // Render loading state while fetching data
                ) : posts.length === 0 ? (
                  <div className="col-md-12">
                    <p className="text-center text-danger">
                      No Posted Inspection Reports
                    </p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="col-lg-4 col-12">
                      <a
                        href={`/agent-view-posted-inspection/${post.Vehicle_Id}`}
                      >
                        <div className="carbid-image-panel">
                          {/* Replace 'your_static_id' with your desired static ID */}
                          {post.Exterior_Image && (
                            <img
                              src={`https://topdevit.com/clients/carchaser/public/uploads/${post.Vehicle_Id}/${post.Exterior_Image}`}
                              alt="Car"
                            />
                          )}
                          {post.Exterior_Image2 && !post.Exterior_Image && (
                            <img
                              src={`https://topdevit.com/clients/carchaser/public/uploads/${post.Vehicle_Id}/${post.Exterior_Image2}`}
                              alt="Car"
                            />
                          )}
                          {post.Exterior_Image3 &&
                            !post.Exterior_Image2 &&
                            !post.Exterior_Image && (
                              <img
                                src={`https://topdevit.com/clients/carchaser/public/uploads/${post.Vehicle_Id}/${post.Exterior_Image3}`}
                                alt="Car"
                              />
                            )}
                          {post.Exterior_Image4 &&
                            !post.Exterior_Image3 &&
                            !post.Exterior_Image2 &&
                            !post.Exterior_Image && (
                              <img
                                src={`https://topdevit.com/clients/carchaser/public/uploads/${post.Vehicle_Id}/${post.Exterior_Image4}`}
                                alt="Car"
                              />
                            )}

                          <div className="bidpanel-innercont">
                            <h6 className="pt-2">
                              {post.Year} {post.Make} {post.Model}{" "}
                            </h6>
                            <span>
                              <small>Vin #{post.VIN}</small>
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
