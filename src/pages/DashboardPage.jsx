import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import { jwtDecode } from "jwt-decode";

export default function Dashboard({ id }) {
  /*const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;*/

  // The JWT string you want to decodeconst token = 'your.jwt.token.here';
  // Decode the token without verifying the signatureconst decoded = jwt.decode(token);
  // Output the decoded tokenconsole.log(decoded);
  return (
    <div className="">
      <Link to=""></Link>

      <div className="App">
        <Calendar element={(id = { id })} />
      </div>
    </div>
  );
}
