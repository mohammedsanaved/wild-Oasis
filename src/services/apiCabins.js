import supabase from "./supabase"
import {supabaseUrl} from "./supabase"

export const getCabins = async ()=> {

let { data, error } = await supabase
.from('cabins')
.select('*')

if(error) {
    console.warn(error);
    throw new Error("Cabin data not found")
}
return data;
}
export const createCabin = async(newCabin)=> {
    // https://qvwufnxwuwwvovaxiawy.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

const { data, error } = await supabase
.from('cabins')
.insert([{...newCabin, image: imagePath}])
.select()
if(error) {
    console.warn(error);
    throw new Error("Cabin could not be created")
}
//upload Image from selected
const { error:storageError } = await supabase
  .storage
  .from('cabins-images')
  .upload(imageName, newCabin.image, {
    cacheControl: '3600',
    upsert: false
  })
//   delete the cabin if there is any error while uploading image
if(storageError) {
    await supabase
.from('cabins')
.delete()
.eq('id', data.id)
console.log(storageError)
throw new Error('Cabin image could not be uploaded & the cabin is not Created')

}
return data
} 
export const deleteCabin = async (id)=> {

const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)
if(error) {
    throw new Error("Cabin could not be deleted")
}
return data;
}