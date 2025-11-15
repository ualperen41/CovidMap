import Item from "../home/item";

const TestPage = () => {
  return (
    <div>
      <div className="h-full grid place-items-center">
        <Item color="text-blue-500" text="Toplam Test" value="890M" />
      </div>
    </div>
  );
};

export default TestPage;
