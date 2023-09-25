import Masonry from "../components/Masonry";

export default function Room() {
  return <div>
    <Masonry columns={4} rowGap={12} columnGap={12}>
      <div style={{ height: 300, border: '1px solid red' }}>11</div>
      <div style={{ height: 200, border: '1px solid red' }}>22</div>
      <div style={{ height: 600, border: '1px solid red' }}>33</div>
      <div style={{ height: 300, border: '1px solid red' }}>11</div>
      <div style={{ height: 200, border: '1px solid red' }}>22</div>
      <div style={{ height: 600, border: '1px solid red' }}>33</div>
      <div style={{ height: 300, border: '1px solid red' }}>11</div>
      <div style={{ height: 200, border: '1px solid red' }}>22</div>
      <div style={{ height: 600, border: '1px solid red' }}>33</div>
    </Masonry>
  </div>;
}
