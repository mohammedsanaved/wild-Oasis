import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
// import { ca } from "date-fns/locale";
import FormRow from "../../ui/FormRow";
const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm() {
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors} = formState
  console.log(errors)
  const queryClient = useQueryClient();
  const {mutate, isLoading:isCreating} = useMutation({
    mutationFn: createCabin, 
    onSuccess: ()=> {
      toast.success("New Cabin Data created")
      queryClient.invalidateQueries({queryKey: ["cabin"]})
      reset()
    },
    onError: (err)=> toast.error(err.message) 
  });
  
  // ---------------------------submitHandler---------------------------------
  function submitHandler (data) {
    console.log(data)
    mutate({...data, image: data.image[0]})
  }
  function onError(error) {
    console.warn(error)

  }
  return (
    <Form onSubmit={handleSubmit(submitHandler, onError)}>
      {/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />
      </FormRow2> */}
      <FormRow label={'Cabin Name'} error={errors?.name?.message}>
      <Input disabled={isCreating} type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>
      {/* <FormRow label={'Cabin Name'} error={errors?.name?.message}>
      <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />
      </FormRow> */}


      <FormRow label={'Maximum Capacity'} error={errors?.maxCapacity?.message}>
        <Input disabled={isCreating} type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Minimum capacity of Cabin should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label={'Regular Price'} error={errors?.regularPrice?.message}>
        <Input disabled={isCreating} type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Minimum capacity of Cabin should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label={'Discount Price'} error={errors?.discountPrice?.message}>
        <Input disabled={isCreating} type="number" id="discountPrice" defaultValue={0} {...register("discountPrice", {
          required: "This field is required",
          validate: (value)=> 
            value <= getValues().regularPrice || "Discount should be less than regularPrice"
          
        })} />
      </FormRow>

      <FormRow label={'Description'} error={errors?.description?.message}>
        <Textarea disabled={isCreating} type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label={'Cabin Photo'}>
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput type="file" id="image" accept="image/*" {...register("image", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create cabin</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
