import { useParams } from "react-router-dom";
import Masonry from "../components/Masonry";

export default function Room(props) {
  const { id } = useParams();

  return (
    <div>
      <Masonry columns={4} rowGap={12} columnGap={12}></Masonry>
    </div>
  );
}
