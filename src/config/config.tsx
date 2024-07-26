const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8080/animals"
    : "http://localhost:8080/animals";


    const Config = async () => {
        return (
          <>
          </>
        );
      };
export default Config;
export { baseURL };