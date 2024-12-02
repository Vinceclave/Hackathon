import React from 'react';
import InputField from '../../../common/InputField';
import Button from '../../../common/Button';

const Step1 = ({
  userCredentials,
  formErrors,
  errorMessage,
  handleChange,
  handleStep1Submit,
  setStep,
}) => {
  return (
    <form onSubmit={handleStep1Submit} className="space-y-6">
      {/* Input Fields */}
      <InputField
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={userCredentials.username}
        onChange={handleChange}
        error={formErrors.username}
        ariaDescription="username-error"
        ariaInvalid={formErrors.username ? 'true' : 'false'}
      />

      <InputField
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={userCredentials.password}
        onChange={handleChange}
        error={formErrors.password}
        ariaDescription="password-error"
        ariaInvalid={formErrors.password ? 'true' : 'false'}
      />

      {/* Display error message if exists */}
      {errorMessage && <p className="text-accent text-sm">{errorMessage}</p>}

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 mt-6">
        <Button type="button" onClick={() => setStep(0)}>
          Back
        </Button>
        <Button type="submit">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step1;
