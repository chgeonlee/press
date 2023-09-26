import { useParams } from "react-router-dom";
import Masonry from "../components/Masonry";

export default function Room(props) {
  const { id } = useParams();

  return (
    <div>
      item { id }
      {/* <Masonry columns={4} rowGap={12} columnGap={12}>
        <div>개발 진행중</div>
        <div>개발 진행중</div>
      </Masonry> */}
    </div>
  );
}
