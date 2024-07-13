const Home = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <h1 className=" text-3xl font-bold">Home</h1>
      <button
        onClick={logoutHandler}
        className=" p-2 bg-green-500 text-white font-bold"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Home;
