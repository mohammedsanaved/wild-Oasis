// import { useState } from 'react'
import Button from '../../ui/Button';
import Model from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabin =()=> {
    return (
        <div>
            <Model>
            <Model.Open opens='cabin-form'>
                <Button>Add to Cabin</Button>
            </Model.Open>
            <Model.Window name='cabin-form'>
                <CreateCabinForm />
            </Model.Window>
            </Model>
        </div>
            )
        }



// const AddCabin = () => {
//     const [openModel, setOpenModel] = useState(false);
//   return (
//     <div>
//         <Button onClick={()=> setOpenModel(openModel=> !openModel)}>
//         Add New Cabin
//       </Button>
//       {openModel && <Modal onClose={()=> setOpenModel(false)}>
//         <CreateCabinForm onCloseModel={()=> setOpenModel(false)} />
//       </Modal> }
//     </div>
//   )
// }

export default AddCabin