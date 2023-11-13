import Spinner from "../../ui/Spinner";
// import { useSettings } from 'features/settings/useSettings';
import { useSettings } from './useSettings';
// import { useUpdateSetting } from 'features/settings/useUpdateSetting';

import Form from '../../ui/Form';
import FormRow from "../../ui/FormRow"
import Input from '../../ui/Input';
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  // const {settings, isLoading} = useSettings();
  const {
    setting: {
      minBookingLength,
      maxBookingLength,
      // maxGuestsPerBooking,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  const { updateSetting, isLoading: isUpdating } = useUpdateSettings();

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleBlur(e, field) {
    const { value } = e.target;
    console.log(value)
    if (!value) return;
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, 'minBookingLength')}
          disabled={isUpdating}
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, 'maxBookingLength')}
          disabled={isUpdating}
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          defaultValue={maxGuestPerBooking
          }
          onBlur={(e) => handleBlur(e, 'maxGuestPerBooking')}
          disabled={isUpdating}
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, 'breakfastPrice')}
          disabled={isUpdating}
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

