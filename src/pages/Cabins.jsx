import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button"
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm"

function Cabins() {
  const [showTable, setShowTable] = useState(false);

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
    </Row>
    <Row>
      <CabinTable />
      <Button onClick={()=> setShowTable(showTable=> !showTable)}>
        Add New Cabin
      </Button>
      {showTable && <CreateCabinForm />}
    </Row>
    </>
  );
}

export default Cabins;
